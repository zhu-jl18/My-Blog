#!/usr/bin/env node
/**
 * Build a small daily JSON for Ideas page by fetching Wikipedia summaries.
 * Output: source/ideas/ideas_daily.json
 * Trigger: manually via GitHub Actions (workflow_dispatch)
 */

import fs from 'fs';
import path from 'path';

// Small curated pool (50/50 theorem & algorithm)
const THEOREMS = [
  { id: 'pigeonhole-principle', zh: '抽屉原理', en: 'Pigeonhole principle' },
  { id: 'euler-formula-planar-graphs', zh: '平面图', en: 'Euler characteristic' },
  { id: 'fermats-little-theorem', zh: '费马小定理', en: "Fermat's little theorem" },
];

const ALGORITHMS = [
  { id: 'bfs', zh: '广度优先搜索', en: 'Breadth-first search' },
  { id: 'dijkstra', zh: '狄克斯特拉算法', en: "Dijkstra's algorithm" },
  { id: 'kmp', zh: 'KMP算法', en: 'Knuth–Morris–Pratt algorithm' },
];

function dayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d - start) / 86400000) + 1;
}

function pickPool() {
  const now = new Date();
  const doy = dayOfYear(now);
  return (doy % 2 === 0) ? { type: 'theorem', list: THEOREMS } : { type: 'algorithm', list: ALGORITHMS };
}

async function fetchWikipediaSummary(title, lang) {
  const base = lang === 'zh' ? 'https://zh.wikipedia.org' : 'https://en.wikipedia.org';
  const url = `${base}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const j = await res.json();
  // j.content_urls.desktop.page or .mobile.page is full page url
  const pageUrl = j?.content_urls?.desktop?.page || j?.content_urls?.mobile?.page || `${base}/wiki/${encodeURIComponent(title)}`;
  const extract = j.extract || '';
  const normalizedTitle = j.title || title;
  return { title: normalizedTitle, extract, pageUrl };
}

async function build() {
  const { type, list } = pickPool();
  const now = new Date();
  const doy = dayOfYear(now);
  const idx = doy % list.length;
  const item = list[idx];

  // Prefer Chinese; fallback English
  let lang = 'zh';
  let data;
  try {
    data = await fetchWikipediaSummary(item.zh, 'zh');
  } catch (e) {
    lang = 'en';
    data = await fetchWikipediaSummary(item.en, 'en');
  }

  const out = {
    id: item.id,
    type, // theorem | algorithm
    title: data.title,
    summary: data.extract,
    url: data.pageUrl,
    lang,
    date: new Date().toISOString().slice(0, 10),
    source: 'wikipedia'
  };

  const outDir = path.resolve('source', 'ideas');
  const outFile = path.join(outDir, 'ideas_daily.json');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`[ideas] Wrote ${outFile}`);
}

build().catch(err => {
  console.error('Failed to build ideas daily json:', err);
  process.exit(1);
});
