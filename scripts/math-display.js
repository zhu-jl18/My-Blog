// 方法 3：修改原始 Markdown
hexo.extend.filter.register('before_post_render', function (data) {
    data.content = data.content.replace(/\$([^\$]+)\$/g, function (match, formula) {
        if (!formula.trim().startsWith('\\displaystyle')) {
            return '$\\displaystyle ' + formula.trim() + '$';
        }
        return match;
    });

    data.content = data.content.replace(/\$\$([\s\S]+?)\$\$/g, function (match, formula) {
        if (!formula.trim().startsWith('\\displaystyle')) {
            return '$$\\displaystyle ' + formula.trim() + '$$';
        }
        return match;
    });

    return data;
});

// // 方法 2：修改生成的 HTML
// hexo.extend.filter.register('after_render:html', function (str) {
//     return str.replace(
//         /<mjx-container[^>]*>[\s\S]*?<\/mjx-container>/g,
//         function (match) {
//             if (match.includes('displaystyle="true"')) return match;
//             return match.replace(/<math[^>]*>/, '$& displaystyle="true"');
//         }
//     );
// });




