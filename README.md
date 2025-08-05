# Hexo博客源码

这个仓库包含了我Hexo博客的源代码。其中包括所有生成和部署博客所需的markdown文件、模板和配置。

## 关于Hexo

[Hexo](https://hexo.io/) 是一个快速、简单且功能强大的博客框架，基于Node.js构建。它允许您使用Markdown（或其他标记语言）编写文章，并生成可以部署到任何Web服务器或静态站点托管服务的静态HTML文件。

Hexo的主要特性：
- 生成速度极快
- 支持GitHub Flavored Markdown和大多数Octopress插件
- 一键部署到GitHub Pages、Heroku等平台
- 强大的API插件系统

## 仓库结构

这个仓库包含了生成博客所需的所有源文件：

```
.
├── _config.yml          # 站点配置
├── package.json         # Node.js依赖
├── source/              # 源文件（markdown文章、页面）
├── scaffolds/           # 新文章的模板文件
├── themes/              # 主题文件
└── scripts/             # 自定义脚本
```
注意到本地文件中，还存在：
```
.
├── .gitignore           # hexo初始化项目所创建的（里边内容即为下列）
├── .DS_Store
├── Thumbs.db
├── db.json
├── *.log
├── node_modules/        # npm install自动生成
├── public/              # hexo g 自动生成
└── .deploy*/            # hexo d 自动生成
```

## Git仓库机制

### 嵌套Git结构

这个仓库使用嵌套Git方法将源代码与部署分离：

1. **主仓库**：这个仓库包含博客的所有源代码
2. **部署仓库**：一个单独的仓库（通常是`username.github.io`），只包含生成的静态文件

### .gitignore配置

`.gitignore`文件配置为排除不需要进行版本控制的文件和目录：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

这些排除是有意为之的：
- `node_modules/`：可以通过`npm install`重新生成
- `public/`：通过`hexo generate`生成的文件
- `.deploy*/`：通过`hexo deploy`创建的临时部署文件
- `db.json`：Hexo数据库文件
- `*.log`：日志文件
- `.DS_Store` & `Thumbs.db`：系统生成的文件

## 工作流程

### 开发

1. 在`source/_posts/`中编写或编辑文章
2. 根据需要修改主题或配置
3. 本地预览更改：
   ```bash
   hexo server
   ```

### 部署

将博客部署到GitHub Pages：

1. 生成静态文件：
   ```bash
   hexo generate
   ```
2. 部署到GitHub Pages：
   ```bash
   hexo deploy
   ```

或者合并两个步骤：
```bash
hexo clean && hexo g -d
```

### 备份

这个仓库作为所有博客源代码的备份。更新备份：

```bash
git add .
git commit -m "更新博客源码"
git push origin main
```

## 设置说明

在本地设置这个博客：

1. 安装Node.js和npm
2. 全局安装Hexo CLI：
   ```bash
   npm install -g hexo-cli
   ```
3. 克隆这个仓库：
   ```bash
   git clone https://github.com/yourusername/hexo-blog-source.git
   cd hexo-blog-source
   ```
4. 安装依赖：
   ```bash
   npm install
   ```
5. 生成并在本地运行站点：
   ```bash
   hexo generate
   hexo server
   ```

## 许可证

该项目基于MIT许可证 - 详情请见LICENSE文件。