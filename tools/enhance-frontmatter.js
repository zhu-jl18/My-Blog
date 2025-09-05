#!/usr/bin/env node

/**
 * Front-matter Enhancement Script
 * 
 * Features:
 * - Auto-generate tags based on title and content keywords
 * - Add missing 'updated' field with current timestamp
 * - Preserve existing multi-category system
 * - Dry-run preview before applying changes
 * 
 * Usage:
 *   node tools/enhance-frontmatter.js --dry-run    # Preview changes
 *   node tools/enhance-frontmatter.js --apply      # Apply changes
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const POSTS_DIR = path.join(__dirname, '../source/_posts');
const DRY_RUN = process.argv.includes('--dry-run');
const APPLY = process.argv.includes('--apply');

// Keywords for tag generation (can be expanded)
const KEYWORD_MAPPING = {
  // Technology
  'hexo': ['Hexo', 'hexo'],
  'next': ['NexT', 'next', '主题'],
  'git': ['Git', 'git', 'github', 'GitHub'],
  'api': ['API', 'api'],
  'gemini': ['Gemini', 'gemini'],
  'ai': ['AI', 'ai', '人工智能', 'LLM', 'llm'],
  'blog': ['博客', 'blog', '博客优化'],
  'css': ['CSS', 'css', '样式', 'stylus'],
  'javascript': ['JavaScript', 'js', 'node'],
  'proxy': ['代理', 'proxy', '网络'],
  'cloudflare': ['Cloudflare', 'cloudflare', 'R2'],
  
  // Math & Learning
  'math': ['数学', 'Math', 'math', 'LaTeX', 'latex'],
  'english': ['English', 'english', '英语', '语言学习'],
  'grammar': ['语法', 'grammar'],
  
  // Tools & Workflow
  'workflow': ['工作流', 'workflow', '流程'],
  'automation': ['自动化', 'automation'],
  'deployment': ['部署', 'deployment'],
  'optimization': ['优化', 'optimization'],
  'performance': ['性能', 'performance'],
  
  // Fun & Misc
  'interesting': ['有趣', 'interesting', '趣味'],
  'experience': ['体验', 'experience', '经验'],
  'guide': ['指南', 'guide', '教程']
};

class FrontMatterEnhancer {
  constructor() {
    this.stats = {
      processed: 0,
      tagsAdded: 0,
      updatedAdded: 0,
      errors: 0
    };
  }

  // Extract front-matter and content from markdown file
  parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    
    if (!frontMatterMatch) {
      throw new Error('No front-matter found');
    }

    const frontMatterYaml = frontMatterMatch[1];
    const markdownContent = frontMatterMatch[2];
    
    try {
      const frontMatter = yaml.load(frontMatterYaml);
      return { frontMatter, markdownContent, originalContent: content };
    } catch (yamlError) {
      throw new Error(`Invalid YAML in front-matter: ${yamlError.message}`);
    }
  }

  // Generate tags based on title and content
  generateTags(title, content, existingCategories = []) {
    const tags = new Set();
    const textToAnalyze = `${title} ${content}`.toLowerCase();

    // Normalize categories to array
    const categories = Array.isArray(existingCategories) ? existingCategories : 
                      typeof existingCategories === 'string' ? [existingCategories] : [];

    // Add category-based tags
    categories.forEach(category => {
      if (category.includes('技术')) tags.add('技术分享');
      if (category.includes('AI') || category.includes('LLM')) tags.add('AI-LLM');
      if (category.includes('Math')) tags.add('数学');
      if (category.includes('语言')) tags.add('语言学习');
      if (category.includes('Interesting')) tags.add('有趣的东西');
    });

    // Keyword-based tag generation
    Object.entries(KEYWORD_MAPPING).forEach(([tag, keywords]) => {
      if (keywords.some(keyword => textToAnalyze.includes(keyword.toLowerCase()))) {
        tags.add(tag);
      }
    });

    // Extract technical terms (simple heuristic)
    const techTerms = textToAnalyze.match(/\b(github|docker|nginx|cloudflare|r2|pjax|css|html|javascript|python|node\.js)\b/gi);
    if (techTerms) {
      techTerms.forEach(term => tags.add(term.toLowerCase()));
    }

    return Array.from(tags).slice(0, 8); // Limit to 8 tags
  }

  // Process a single markdown file
  processFile(filePath) {
    try {
      const { frontMatter, markdownContent, originalContent } = this.parseMarkdownFile(filePath);
      const fileName = path.basename(filePath);
      let modified = false;
      const changes = [];

      // Generate tags if missing
      if (!frontMatter.tags || frontMatter.tags.length === 0) {
        const generatedTags = this.generateTags(
          frontMatter.title || '',
          markdownContent.substring(0, 1000), // First 1000 chars for analysis
          frontMatter.categories || []
        );
        
        if (generatedTags.length > 0) {
          frontMatter.tags = generatedTags;
          modified = true;
          changes.push(`+ tags: [${generatedTags.join(', ')}]`);
          this.stats.tagsAdded++;
        }
      }

      // Add updated field if missing
      if (!frontMatter.updated) {
        frontMatter.updated = new Date().toISOString().replace('T', ' ').substring(0, 19);
        modified = true;
        changes.push(`+ updated: ${frontMatter.updated}`);
        this.stats.updatedAdded++;
      }

      if (modified) {
        const newFrontMatter = yaml.dump(frontMatter, { 
          indent: 2,
          lineWidth: -1,
          noRefs: true
        });
        const newContent = `---\n${newFrontMatter}---\n${markdownContent}`;

        if (DRY_RUN) {
          console.log(`\n📝 ${fileName}:`);
          changes.forEach(change => console.log(`  ${change}`));
        } else if (APPLY) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`✅ Enhanced: ${fileName}`);
        }
      }

      this.stats.processed++;
      return modified;

    } catch (error) {
      console.error(`❌ Error processing ${path.basename(filePath)}: ${error.message}`);
      this.stats.errors++;
      return false;
    }
  }

  // Process all markdown files in posts directory
  run() {
    if (!DRY_RUN && !APPLY) {
      console.log('❓ Usage:');
      console.log('  node tools/enhance-frontmatter.js --dry-run    # Preview changes');
      console.log('  node tools/enhance-frontmatter.js --apply      # Apply changes');
      return;
    }

    console.log(`🚀 ${DRY_RUN ? 'DRY-RUN' : 'APPLYING'} Front-matter Enhancement...\n`);
    
    // Debug: Check if posts directory exists
    if (!fs.existsSync(POSTS_DIR)) {
      console.error(`❌ Posts directory not found: ${POSTS_DIR}`);
      return;
    }

    const files = fs.readdirSync(POSTS_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(POSTS_DIR, file));

    files.forEach(file => this.processFile(file));

    // Print summary
    console.log('\n📊 Summary:');
    console.log(`  Files processed: ${this.stats.processed}`);
    console.log(`  Tags added: ${this.stats.tagsAdded}`);
    console.log(`  Updated fields added: ${this.stats.updatedAdded}`);
    console.log(`  Errors: ${this.stats.errors}`);

    if (DRY_RUN) {
      console.log('\n💡 Run with --apply to make these changes permanent.');
    }
  }
}

// Check if js-yaml is available
try {
  require('js-yaml');
} catch (e) {
  console.error('❌ js-yaml not found. Please run: npm install js-yaml');
  process.exit(1);
}

// Run the enhancer
const enhancer = new FrontMatterEnhancer();
enhancer.run();
