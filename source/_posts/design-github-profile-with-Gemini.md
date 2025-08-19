---
title: The Evolution of My GitHub Profile
author:
  - mako
  - fish
categories:
  - 技术记录与分享
  - AI & LLM
abbrlink: 17888
date: 2025-08-08 18:41:03

---

> 摘要：记录了一次有趣的"人机协作"经历——和Gemini一起从零开始，打造了一个让我非常满意的Github Profile。

<!--more-->
----
## 🎯 先看效果，再聊过程

我的GitHub Profile现在长这样：

- **个人简介**：简洁的自我介绍）
- **技术栈展示**：用图标展示我会的编程语言（虽然有些可能已经忘得差不多了😅）
- **数学卡片**：高斯绝妙定理--数学之美！
- **动态博客列表**：自动更新我最新写的文章
- **贪吃蛇贡献图**：把GitHub的贡献日历变成动画，单纯好玩

一开始我就是想要个好看的Profile

![最终效果预览](https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/year-month/name)

## 🛠️ 技术实现：从简单到复杂

### 1. 基础部分：Markdown + HTML

GitHub Profile本质上就是一个`README.md`文件。Markdown -> HTML 懂了吧。

> 💡 **踩雷记录**：GitHub Profile的README.md文件有特殊的渲染规则，支持HTML但不支持所有CSS属性，比如坑爹的超链接！

#### 个人介绍：简洁清爽

```html
### 👨‍💻 About Me
<div style="text-align: left; display: inline-block;">
 🎓 毕业于 **清华大学 (THU)**
 🌱 目前就读于 **中国科学院大学 (UCAS)**
</div>
```

#### 技术栈：用现成的

用[skillicons.dev](https://skillicons.dev)，一行代码即可。
> 🎯 **为什么选择这个服务？** 完全免费，部署简单，"懒人"福音

```html
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,cpp,java,js,html,css,latex,vscode,git&perline=9" />
  </a>
</p>
```

#### 特色卡片：数学之美

我最喜欢的数学家——高斯和他都觉得妙的——高斯绝妙定理：

> 🧮 **高斯绝妙定理** 这个定理告诉say： 曲面的高斯曲率是内蕴几何量，不依赖于曲面在空间中的嵌入方式。

```html
<div style="border: 1px solid #d0d7de; border-radius: 6px; padding: 16px; margin: 16px 0;">
  <div style="display: flex; align-items: center; gap: 16px;">
    <img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog@main/avatar/Gauss.png" width="120" style="border-radius: 6px;">
    <div>
      <h3>Theorema Egregium</h3>
      <p>高斯绝妙定理：曲面的高斯曲率K是内蕴几何量</p>
      <a href="https://en.wikipedia.org/wiki/Theorema_Egregium">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://latex.codecogs.com/svg.latex?\color{white}\Large&space;K=\kappa_1\kappa_2">
          <source media="(prefers-color-scheme: light)" srcset="https://latex.codecogs.com/svg.latex?\color{black}\Large&space;K=\kappa_1\kappa_2">
          <img src="https://latex.codecogs.com/svg.latex?\color{black}\Large&space;K=\kappa_1\kappa_2">
        </picture>
      </a>
    </div>
  </div>
</div>
```

### 2. 自动化：Profile"活"了

这部分是让Profile真正"活"起来的关键。通过GitHub Actions，实现自动更新，让Profile不再是静态的展示页面。

#### 自动更新博客列表

用`gautamkrishnar/blog-post-workflow`这个Action，配置简单，每次发布新博客，Profile就会自动更新，无需手动维护：

> 🔄 **自动化原理**：这个Action会定期抓取博客RSS Feed，然后自动更新README.md文件中的博客列表。

```yaml
name: Latest blog post workflow
on:
  schedule:
    - cron: '0 * * * *'  # 每小时运行一次
  workflow_dispatch:

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gautamkrishnar/blog-post-workflow@v1
        with:
          disable_cache: true
          feed_list: "https://zhu-jl18.github.io/atom.xml"
          max_post_count: 5
          template: '<p align="center"><a href="\(url" style="text-decoration: none; color: #20B2AA;">\)title</a></p>'
```

在README中设置占位符：

```html
### 📝 Recent Blog Posts
<div style="border: 1px solid #d0d7de; border-radius: 6px; padding: 16px;">
<!-- BLOG-POST-LIST:START --><!-- BLOG-POST-LIST:END -->
</div>
```

#### 贪吃蛇贡献图

用`Platane/snk`这个Action，自动生成动画版的贡献图。这个功能纯粹是为了好玩：

> 🐍 **"贪吃蛇"？！** 因为这个动画看起来就像一条蛇在吃贡献点，从年初吃到年末。虽然没什么实际用途，因为我基本不贡献。

```yaml
name: generate animation
on:
  schedule:
    - cron: "0 0 * * *"  # 每天运行一次
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v3
      - uses: Platane/snk@v3
        id: snake-gif
        with:
          github_user_name: zhu-jl18
          svg_out_path: dist/github-snake.svg
          snake_color: 'blue'
      - uses: crazy-max/ghaction-github-pages@v2.1.3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

然后在README中引用：

```html
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/zhu-jl18/zhu-jl18/output/github-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/zhu-jl18/zhu-jl18/output/github-snake.svg" />
    <img alt="github snake animation" src="https://raw.githubusercontent.com/zhu-jl18/zhu-jl18/output/github-snake.svg" />
  </picture>
</div>
```

## 🤖 人机协作实录

此部分记录了与Gemini共同实现Profile的过程。我负责设计思路与整体规划，Gemini负责具体代码实现。

> 🤖 **协作原则**：大模型不是万能的，它虽然懂得很多，但是你得让他明白你到底要他干什么~

### 协作过程

**我**：我想在GitHub Profile上展示我的博客列表，有什么好办法吗？

**Gemini**：可以用`blog-post-workflow`这个Action，配置很简单...

**结果**：基础功能实现了，但样式很丑。典型的"能用就行"状态。

### 第二轮：样式优化

**我**：这个列表样式不好看，我想要卡片式布局，并且居中显示。

**Gemini**：可以用复杂的HTML+CSS来实现...

**结果**：GitHub不支持复杂的CSS样式，居中效果失效了。这就是典型的"过度设计"问题。

### 第三轮：回归本质

**我**：GitHub不支持这些复杂样式，还是都在左边。我不要日期了，字体大小也改不了，就让它简单的居中就行。

**Gemini**：那就用最简单的`<p align="center">`标签吧。

**结果**：完美！有时候最简单的方案就是最好的方案。这让我想起了KISS原则（Keep It Simple, Stupid）。

## 💡 协作心得

与AI协作编程！！！：

1. **明确目标**：想清楚你要什么，不要模棱两可。AI不是读心术，你得说清楚。
2. **小步快跑**：尝试一个方案，立即测试，然后带着结果进行下一轮沟通。不要一次性要求太多。
3. **提供精确反馈**：不要说"不行"，要说"哪里不行"、"为什么不行"。AI需要具体的错误信息。
4. **回归本质**：当复杂方案失效时，往往最简单的方案最有效。这大概就是所谓的"大道至简"吧。

总的来说， AI极其吃数据，你喂给他是好东西他就也会输出好东西。

## 🎉 总结

Gemini还不错，最后效果超出我预料地好看。





**这是我大模型使用的初期探索，后来我会了很多优化技巧，早期的这些尝试也是很有意思的。**








---

**Ref:**
- [blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow)
- [skillicons.dev](https://skillicons.dev)
- [snk](https://github.com/Platane/snk)
