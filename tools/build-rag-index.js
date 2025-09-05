#!/usr/bin/env node
/*
 Build a lightweight RAG index from Hexo posts.
 - Scans source/_posts/*.md
 - Cleans markdown, chunks into ~600 chars (overlap 120)
 - Calls an OpenAI-compatible embeddings API in batches
 - Outputs JSON index to source/rag/index.json

 Usage:
   EMBEDDING_API_KEY=... node tools/build-rag-index.js \
     --model text-embedding-3-small \
     --base https://api.openai.com \
     --chunk 600 --overlap 120

 Notes:
 - Keys are read from env EMBEDDING_API_KEY; NEVER commit keys.
 - For providers with OpenAI-compatible embeddings (DeepSeek, Groq, GLM, OpenRouter), set --base accordingly.
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const POSTS_DIR = path.join(process.cwd(), 'source', '_posts');
const OUT_DIR = path.join(process.cwd(), 'source', 'rag');
const OUT_FILE = path.join(OUT_DIR, 'index.json');

const args = process.argv.slice(2);
function getArg(name, def) {
  const i = args.indexOf(`--${name}`);
  if (i !== -1 && i + 1 < args.length) return args[i + 1];
  return def;
}

let MODEL = getArg('model', 'text-embedding-3-small');
const API_BASE = getArg('base', process.env.EMBEDDING_API_BASE || 'https://api.openai.com');
const API_KEY = process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY;
// Allow direct full embedding endpoint override for non-openai-compatible paths
const DIRECT_EMBEDDING_ENDPOINT = process.env.EMBEDDING_ENDPOINT || getArg('endpoint');
const CHUNK = parseInt(getArg('chunk', '600'), 10);
const OVERLAP = parseInt(getArg('overlap', '120'), 10);
const BATCH = parseInt(getArg('batch', '64'), 10);

if (!API_KEY) {
  console.error('❌ EMBEDDING_API_KEY is required');
  process.exit(1);
}

function listMarkdownFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
}

function parseFrontMatter(md) {
  if (md.startsWith('---')) {
    const end = md.indexOf('\n---', 3);
    if (end !== -1) {
      const fm = md.slice(3, end).trim();
      const body = md.slice(end + 4).trim();
      const map = {};
      fm.split(/\r?\n/).forEach(line => {
        const m = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);
        if (m) map[m[1].trim()] = m[2].trim();
      });
      return { data: map, content: body };
    }
  }
  return { data: {}, content: md };
}

function stripMarkdown(md) {
  // remove code fences
  let t = md.replace(/```[\s\S]*?```/g, ' ');
  // remove images ![alt](url) and links [text](url)
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  t = t.replace(/\[[^\]]*\]\([^)]*\)/g, (m) => m.replace(/\[[^\]]*\]\(([^)]*)\)/, ''));
  // inline code
  t = t.replace(/`[^`]*`/g, ' ');
  // headings/markers
  t = t.replace(/^>\s?/gm, '');
  t = t.replace(/^#{1,6}\s+/gm, '');
  // html tags
  t = t.replace(/<[^>]+>/g, ' ');
  // collapse spaces
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function chunkText(txt, size = CHUNK, overlap = OVERLAP) {
  const chunks = [];
  if (!txt) return chunks;
  let i = 0;
  while (i < txt.length) {
    const end = Math.min(txt.length, i + size);
    const piece = txt.slice(i, end);
    chunks.push(piece);
    if (end === txt.length) break;
    i = end - overlap;
    if (i < 0) i = 0;
  }
  return chunks;
}

async function embedBatch(inputs) {
  const payload = JSON.stringify({ model: MODEL, input: inputs });
  const url = DIRECT_EMBEDDING_ENDPOINT ? new URL(DIRECT_EMBEDDING_ENDPOINT) : new URL('/v1/embeddings', API_BASE);
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(url, opts, (res) => {
      let data = '';
      res.on('data', (d) => (data += d));
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(data);
            // support both OpenAI-like {data:[{embedding:[]}, ...]} and direct {data:{embedding:[]}} or {embeddings:[[...]]}
            let vectors;
            if (Array.isArray(json.data)) {
              vectors = json.data.map(d => d.embedding);
            } else if (Array.isArray(json.embeddings)) {
              vectors = json.embeddings;
            } else if (json.data && Array.isArray(json.data.embedding)) {
              vectors = json.data.embedding;
            } else {
              throw new Error('Unrecognized embeddings response format');
            }
            resolve(vectors);
          } catch (e) { reject(e); }
        } else {
          reject(new Error(`Embeddings HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const files = listMarkdownFiles(POSTS_DIR);
  console.log(`🧾 Posts detected: ${files.length}`);

  const items = [];
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = parseFrontMatter(raw);
    const title = data.title || path.basename(file).replace(/\.md$/, '');
    const urlAbbr = (data.abbrlink || title).toString();
    const url = `/posts/${urlAbbr}/`;
    const text = stripMarkdown(content);
    const pieces = chunkText(text);
    pieces.forEach((p, idx) => {
      items.push({ id: `${path.basename(file)}::${idx}`, postId: path.basename(file), url, title, section: '', text: p });
    });
  }

  console.log(`✂️  Total chunks: ${items.length}`);

  // Embed in batches
  const vectors = [];
  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    console.log(`🧠 Embedding ${i}..${i + batch.length - 1}`);
    const vecs = await embedBatch(batch.map(b => b.text));
    vectors.push(...vecs);
  }

  // Attach vectors
  items.forEach((it, i) => { it.vector = vectors[i]; });

  const dim = vectors[0]?.length || 0;
  const out = { version: 'v1', model: MODEL, dim, count: items.length, items };
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(out));
  console.log(`✅ Wrote ${OUT_FILE} (${out.count} chunks, dim=${dim})`);
}

main().catch(err => {
  console.error('❌ Build index failed:', err);
  process.exit(1);
});

