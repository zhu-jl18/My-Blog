/**
 * Inject category post counts into the categories page at build time
 * This ensures counts are accurate and PJAX-safe (no client-side JS needed)
 */

const cheerio = require('cheerio');

hexo.extend.filter.register('after_render:html', function(str, data) {
  // Only process the categories index page
  if (data.path !== 'categories/index.html') {
    return str;
  }

  const $ = cheerio.load(str);
  
  // Get all posts and manually count by top-level category
  const posts = this.locals.get('posts');
  const categoryMap = {};

  // Initialize counts for our 6 target categories
  const targetCategories = ['Math', '技术记录与分享', '语言学习', 'AI & LLM', 'Interesting', '其他'];
  targetCategories.forEach(cat => {
    categoryMap[cat] = 0;
  });

  // Count posts by their first (top-level) category only
  posts.forEach(post => {
    if (post.categories && post.categories.length > 0) {
      const topCategory = post.categories.data[0].name;
      if (categoryMap.hasOwnProperty(topCategory)) {
        categoryMap[topCategory]++;
      }
    }
  });

  // Define mapping from display names to actual category names
  const categoryMapping = {
    '数学探索': 'Math',
    '技术分享': '技术记录与分享',
    '语言学习': '语言学习',
    '人工智能': 'AI & LLM',
    '有趣的东西': 'Interesting',
    '其他模块': '其他'
  };

  // Inject counts into each category card
  $('.category-item').each(function() {
    const $card = $(this);
    const $title = $card.find('.category-title');
    const displayName = $title.text().trim();
    const actualCategoryName = categoryMapping[displayName];
    
    if (actualCategoryName && categoryMap[actualCategoryName] !== undefined) {
      const count = categoryMap[actualCategoryName];
      
      // Check if count span already exists to avoid duplicates
      if ($card.find('.category-count').length === 0) {
        // Insert count span after the title in the header
        $title.after(`<span class="category-count">${count}篇</span>`);
      }
    }
  });

  return $.html();
});
