---
title: 我的NexT主题配置
date: 2021-03-21 00:27:45
tags:
categories: Hexo
---

Record my hexo-blog configs.
<!--more-->

----


After a long long time for a minimalist theme, [Theme Next](https://github.com/theme-next/hexo-theme-next/) badly satisfies me. I mainly refer to [Next's offical document](https://theme-next.js.org/docs/) when adjusting the details.And here are my works:

####  Fill in Personal Info

Just follow.

####  Modify Pages

I added a new page `categories`  by using `hexo new categories`, and then make sure `categories/index.md` looks like following:

```yaml
title: Tags
date: 2021-1-1 12:39:04
type: categories
```


Next comes the most important part-- **change my home page to a timeline page**. This have solved the vert problem that annoying me for a rather long time.

Initially, its archive_dir and index_generator looks like this in `myblog/_config.yml`:

```yaml
archive_dir: archives

index_generator:
  path: '/'
```
This means there are a column of blocks which I dislikes, but I change it to this:

```yaml
archive_dir: /

index_generator:
  path: archives
```

It turns my favorite timeline style ~
Then I just modify some icons and names of the menu:

```yaml
menu:
  Timeline: / || fa fa-bookmark #代替了原来的home 路径也改了
  #home: / || fa fa-home
  about: /about/ || fa fa-user
  #tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  index: /archives/ || fa fa-archive
```

Done!

#### Change Code Blocks

Just use Prism and choose a theme.

```yaml
codeblock:
  # Code Highlight theme
  # All available themes: https://theme-next.js.org/highlight/
  theme:
    light: default
    dark: tomorrow-night
  prism:
    light: prism-nord
    dark: prism-nord
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Available values: default | flat | mac
    style: mac
```

#### Edit Body-Text Custom

For me its original settings about font and lineheight makes uncomfortble. So I use <u>Injects</u> to create the desired custom.

Fist add `myblog\themes\next\scripts\filters\myjsstyle.js`:

```javascript
hexo.extend.filter.register('theme_inject', function(injects) {
    injects.style.push('source/_data/mycss.styl');
  });
```

Then add `myblog/source/_data/mycss.styl`:

```css

.menu-item {
  a {
    font-size: 1.1em;
    /* font-family: CMU Classical Serif; */
    font-weight: 600;
  }
}

/* .fa, .far, .fas {
    font-style: italic !important;
} */
body {
  line-height: 1.6;
}

.post-body {
  font-size: 1.0125em !important;
}

.post-title {
  font-size: 1.05em;
}

p {
  line-height: 1.6;
  margin: 7px 0 7px;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.5;
  margin: 1px 0 6px;
}

mjx-c {
  font-size: 85%;
}

.menu .menu-item a {
  font-family: '等距更纱黑体 SC' !important;
} 
/* .post-body {
  font-size: 1em;  
} */
ul {
  margin: 0 0 7px 0;
}

ol {
  margin: 4px 0;
}

img {
  box-shadow: 0rem 0.4rem 0.8rem rgba(116, 95, 181, 0.1);
  border-radius: 5px;
}

.post-body h1::before, .post-body h2::before, .post-body h3::before, .post-body h4::before, .post-body h5::before {
  content: '#'; /*¶*/
  padding-right: 10px;
  color: #a4b0be;
}
```

Otherwise, I change my font:

```yaml
font:
  enable: true

  # Uri of fonts host, e.g. https://fonts.googleapis.com (Default).
  #host: https://fonts.proxy.ustclug.org
  #host: https://fonts.loli.net/
  # host: https://www.cufonfonts.com/
  host: https://fonts.googleapis.com

  # Font options:
  # `external: true` will load this font family from `host` above.
  # `family: Times New Roman`. Without any quotes.
  # `size: x.x`. Use `em` as unit. Default: 1 (16px)

  # Global font settings used for all elements inside <body>.
  global:
    external: false
    family: "Helvetica, '等距更纱黑体 SC'"
    #family: Times New Roman, Merriweather, Josefin Sans, Noto Serif SC
    #family: Comic Sans MS,arial,sans-serif
    # family:  'EB Garamond','Noto Serif SC','等距更纱黑体 SC',serif
    #family:  Monda,Rubik,Titillium Web
    #size:  1
    size: 0.9125
    # 原来的
   


  # Font settings for site title (.site-title).
  title:
    external: true
    family: 
    size:

  # Font settings for headlines (<h1> to <h6>).
  headings:
    external: true
    family: 
    size:

  # Font settings for posts (.post-body).
  posts:
    external: true
    family:

  # Font settings for <code> and code blocks.
  codes:
    external: true
    family:
```

I like `'等距更纱黑体 SC'` very much as Chinese font, but as for English font, finally I choose `Helvetica`. What's more, the fontsize should be smaller to look better.









#### Other Small Tricks

I want to open `vscode` when using `hexo new ~`, then just add one `***.js` in `./script/` which includes codes as follow:
```javascript
let spawn = require('hexo-util/lib/spawn');

hexo.on('new', (data) => {
  spawn('code', [hexo.base_dir, data.path]);
});
```



In the end it all worked out!