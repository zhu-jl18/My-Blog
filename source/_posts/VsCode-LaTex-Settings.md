---
title: VsCode-LaTeX-Settings
date: 2025-06-19 21:45:23
tags:
categories:
    - [VsCode]
    - [LaTeX]
---

VsCode 配置 LaTeX 完整版
> * * 

<!--more-->
----
实现功能：
1. 能在vscode里使用Latex
2. Sumatra PDF能正反向搜索


主要问题： 新版vscode Sumatra PDF反向搜索会出现问题 1. cls 2. 没反应

解决：真正的原因是vscode设置了环境变量`ELECTRON_RUN_AS_NODE`，由vscode启动的sumatrapdf进程也继承了这个变量，如果是外部启动的sumatra反向搜索就会打开cli.js文件而不是执行它。
一个办法是用`code.cmd`但会弹出控制台，另一个是`explorer vscode://file/%f:%l`，也会有一个安全提示。

那我直接在里边加`--ms-enable-electron-run-as-node`即可，可以手动在Sumatra PDF里加，也可以写到`settings.json`让vscode给它加。

```json
    /*"latex-workshop.view.pdf.viewer": "tab"*/
    /*latex-workshop配置*/
    "latex-workshop.showContextMenu": true, //右键菜单
    "latex-workshop.intellisense.package.enabled": true, //根据加载的包，自动完成命令或包  
    "latex-workshop.latex.autoBuild.run": "onSave", //保存文件时自动build  
    "latex-workshop.latex.autoClean.run": "onFailed",
    "latex-workshop.latex.recipes": [
        {
            "name": "xelatex",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "latexmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "PDFlatex",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
            ]
        }
    ],
    "latex-workshop.latex.tools": [
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ],
            "env": {}
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ],
            "env": {}
        },
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ],
            "env": {}
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ],
            "env": {}
        }
    ],
    "latex-workshop.latex.clean.fileTypes": [ //设定清理文件的类型  
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk",
        "*.nav",
        "*.snm",
        "*.synctex.gz"
    ],
    "latex-workshop.view.pdf.viewer": "external", //pdf文件的预览方式
    "latex-workshop.view.pdf.external.viewer.command": "E:/tools/pdf/SumatraPDF.exe",
    "latex-workshop.view.pdf.external.viewer.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "\"E:/Coding/VsCode/Microsoft VS Code/Code.exe\" \"E:/Coding/VsCode/Microsoft VS Code/resources/app/out/cli.js\" --ms-enable-electron-run-as-node -gr \"%f\":\"%l\"",
        "%PDF%"
    ],
    "latex-workshop.view.pdf.external.synctex.command": "E:/tools/pdf/SumatraPDF.exe",
    "latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "\"E:/Coding/VsCode/Microsoft VS Code/Code.exe\" \"E:/Coding/VsCode/Microsoft VS Code/resources/app/out/cli.js\" --ms-enable-electron-run-as-node -gr \"%f\":\"%l\"",
        "%PDF%",
    ],

```


