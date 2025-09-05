const fs = require('fs');
const path = require('path');

// 从配置文件读取映射
const config = {
    customDomain: 'https://media.makomako.dpdns.org',
    imageMapping: {
        'avatar/avatar.jpg': 'avatar/avatar.jpg',
        'avatar/Gauss.png': 'avatar/Gauss.png', 
        'logo/evolution.png': 'logo/evolution.png',
        '2021-3/latex-draw-a-tree-01.png': '2021/3/latex-draw-a-tree-01.png',
        '2021-3/latex-draw-a-tree-02.png': '2021/3/latex-draw-a-tree-02.png',
        '2021-3/latex-draw-a-tree-03.png': '2021/3/latex-draw-a-tree-03.png',
        '2021-4/English-Grammar-Overview-01.PNG': '2021/4/English-Grammar-Overview-01.PNG',
        '2021-4/English-Grammar-Overview-02.PNG': '2021/4/English-Grammar-Overview-02.PNG',
        '2021-4/English-Grammar-Overview-03.PNG': '2021/4/English-Grammar-Overview-03.PNG',
        '2025-8/dual-1.png': '2025/8/dual-1.png',
        '2025-8/pascal.png': '2025/8/pascal.png',
        '2025-8/Brianchon.png': '2025/8/Brianchon.png',
        '2025-8/Duals_graphs.png': '2025/8/Duals_graphs.png',
    }
};

// 生成替换映射
const REPLACE_MAP = {};
for (const [oldPath, newPath] of Object.entries(config.imageMapping)) {
    const oldUrlWithMain = `https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog@main/${oldPath}`;
    const oldUrlWithoutMain = `https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/${oldPath}`;
    const newUrl = `${config.customDomain}/${newPath}`;
    
    REPLACE_MAP[oldUrlWithMain] = newUrl;
    REPLACE_MAP[oldUrlWithoutMain] = newUrl;
}

// 需要处理的文件列表
const FILES_TO_PROCESS = [
    'source/_posts/duality-and-isomorphism-1.md',
    'source/_posts/design-github-profile-with-Gemini.md',
    'source/_posts/duality-and-isomorphism-4.md',
    'source/_posts/English-Grammar-Overview.md',
    'source/_posts/Latex-Draw-a-Tree.md',
    'source/_posts/Records-for-my-Proxy.md',
    'source/_posts/Simulated-Vagina-Usage-Experience.md',
    'source/_posts/What-can-a-Free-Domain-Do.md',
    'source/_posts/潇洒美少年.md',
    '_config.next.yml',
    'scaffolds/post.md'
];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&');
}

function backupFile(filePath) {
    const backupPath = filePath + '.backup';
    if (fs.existsSync(filePath) && !fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📂 Backup created: ${backupPath}`);
    }
}

function batchReplace() {
    console.log('🚀 Starting URL replacement...');
    console.log(`📊 Custom domain: ${config.customDomain}`);
    console.log('='.repeat(60));
    
    let totalReplacements = 0;
    const processedFiles = [];
    
    FILES_TO_PROCESS.forEach(filePath => {
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return;
        }
        
        // 创建备份
        backupFile(filePath);
        
        let content = fs.readFileSync(filePath, 'utf8');
        let fileReplacements = 0;
        const replacements = [];
        
        // 执行替换
        Object.entries(REPLACE_MAP).forEach(([oldUrl, newUrl]) => {
            const regex = new RegExp(escapeRegExp(oldUrl), 'g');
            const matches = content.match(regex);
            
            if (matches) {
                content = content.replace(regex, newUrl);
                fileReplacements += matches.length;
                replacements.push({
                    oldUrl: oldUrl,
                    newUrl: newUrl,
                    count: matches.length
                });
            }
        });
        
        if (fileReplacements > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${filePath}: ${fileReplacements} replacement(s)`);
            
            replacements.forEach(replacement => {
                console.log(`   • ${replacement.count}x: ${replacement.oldUrl.substring(0, 50)}...`);
            });
            
            totalReplacements += fileReplacements;
            processedFiles.push({
                file: filePath,
                replacements: fileReplacements,
                details: replacements
            });
        } else {
            console.log(`✅ No changes needed for ${filePath}`);
        }
    });
    
    // 生成报告
    console.log('='.repeat(60));
    console.log(`🎉 Migration completed! Total replacements: ${totalReplacements}`);
    console.log(`📝 Files processed: ${processedFiles.length}`);
    
    // 保存详细报告
    const report = {
        timestamp: new Date().toISOString(),
        customDomain: config.customDomain,
        totalReplacements: totalReplacements,
        processedFiles: processedFiles,
        replaceMap: REPLACE_MAP
    };
    
    fs.writeFileSync('replacement_report.json', JSON.stringify(report, null, 2), 'utf8');
    console.log('📋 Detailed report saved to replacement_report.json');
    
    // 警告信息
    if (totalReplacements === 0) {
        console.log('\n⚠️  Warning: No replacements were made.');
        console.log('   Please check if the old URLs match your actual content.');
    }
}

// 执行替换
batchReplace();