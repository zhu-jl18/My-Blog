---
title: Windows Terminal配置及其美化
date: 2022-06-18 22:47:26
tags:
categories: [Settings of My LapTop]
---

主要是`settings.json`的配置以及`oh my posh`的使用

<!--more-->



最终效果图：
<img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2022-6/Windows-Terminal-Config-00.PNG" style= "width: 75% ">


### Windows Terminal 安装

Windows Terminal 是一个集成的命令行工具，可以在里边使用PowerShell、Cmd、Git Bash、Anaconda等等。我用它的主要目的是不想见到原生Cmd或者PowerShell又黑又丑的终端，并且这个能直接右键在当前目录打开十分方便（默认的配置）。

直接在Windows的应用商店里安装即可。最新版的Windows Terminal配置既可以通过图形界面进行，也可以在`setting.json`里进行。




### oh-my-posh 安装及配置

>A prompt theme engine for any shell


原先的教程里的指南都已经过时了，直接进[oh-my-posh 官方文档](https://ohmyposh.dev/docs/installation/windows)安装教程即可。

管理员模式下一行代码就行：
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://ohmyposh.dev/install.ps1'))
```



装的是啥呢？
- <b>oh-my-posh.exe</b> - Windows executable 
用这个命令能看到位置`(Get-Command oh-my-posh).Source`

- <b>themes</b> - The latest Oh My Posh themes 
用这个命令能看到位置`$env:POSH_THEMES_PATH`，具体的样式去官网看，也可以`Get-PoshThemes`。

再装一个`posh-git`
```powershell
Install-Module posh-git -Scope CurrentUser
```

然后还需要在官网里再下载一个字体，以便支持众多表情符号

配置 PowerShell init profile，用记事本打开`notepad $PROFILE`写入：
```powershell
Import-Module posh-git
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression
```
这个配好就成功一半了
### Windows Terminal美化

**Reference**:
- [简单配置与美化Powershell和Terminal](https://zhuanlan.zhihu.com/p/104720872)

根据自己审美，我的方法是老的settings.json和最近又通过图形界面改了，注意把字体改成`oh-my-posh`官网里下的那个，最终的配置文件如下：

```json
{
    "$help": "https://aka.ms/terminal-documentation",
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": 
    [
        {
            "command": 
            {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": 
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        }
    ],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
    "profiles": 
    {
        "defaults": 
        {
            "backgroundImage": "G:\\\u4e00\u4e9b\u56fe\u7247\u7f62\u4e86\\Nice!!!\\77348134_p0_master1200.jpg",
            "backgroundImageOpacity": 0.53000000000000003,
            "colorScheme": "OneDark",
            "cursorShape": "vintage",
            "experimental.retroTerminalEffect": true,
            "font": 
            {
                "face": "MesloLGL NF",
                "size": 11
            },
            "opacity": 63,
            "useAcrylic": true
        },
        "list": 
        [
            {
                "backgroundImage": "G:\\\u4e00\u4e9b\u56fe\u7247\u7f62\u4e86\\Nice!!!\\77348134_p0_master1200.jpg",
                "backgroundImageAlignment": "center",
                "backgroundImageOpacity": 0.14999999999999999,
                "backgroundImageStretchMode": "uniformToFill",
                "closeOnExit": "graceful",
                "colorScheme": "Campbell Powershell",
                "commandline": "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
                "cursorColor": "#FFFFFF",
                "cursorShape": "underscore",
                "experimental.retroTerminalEffect": false,
                "font": 
                {
                    "face": "MesloLGM NF",
                    "size": 10
                },
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "historySize": 9001,
                "icon": "ms-appx:///ProfileIcons/{61c54bbd-c2c6-5271-96e7-009a87ff44bf}.png",
                "name": "Windows PowerShell",
                "opacity": 70,
                "padding": "10, 10, 10, 2",
                "scrollbarState": "hidden",
                "snapOnInput": true,
                "startingDirectory": "%USERPROFILE%",
                "tabTitle": "Windows PowerShell"
            },
            {
                "backgroundImage": "G:/cdn/banner/\u79cb\u5343.png",
                "backgroundImageAlignment": "center",
                "backgroundImageOpacity": 0.29999999999999999,
                "backgroundImageStretchMode": "uniformToFill",
                "closeOnExit": "graceful",
                "colorScheme": "OneDark",
                "commandline": "%SystemRoot%\\System32\\cmd.exe",
                "cursorColor": "#FFFFFF",
                "cursorShape": "underscore",
                "font": 
                {
                    "face": "MesloLGM NF",
                    "size": 11
                },
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "historySize": 9001,
                "name": "CMD",
                "opacity": 70,
                "padding": "10, 10, 10, 2",
                "scrollbarState": "hidden",
                "snapOnInput": true,
                "startingDirectory": "%USERPROFILE%",
                "useAcrylic": true
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": true,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            },
            {
                "backgroundImage": "G:\\\u4e00\u4e9b\u56fe\u7247\u7f62\u4e86\\wallpaper\\Wallpapers of The Song of Sea and The Secret of Kells\\SOTS14.bmp",
                "backgroundImageAlignment": "center",
                "backgroundImageOpacity": 0.29999999999999999,
                "backgroundImageStretchMode": "uniformToFill",
                "closeOnExit": "graceful",
                "colorScheme": "OneDark",
                "cursorColor": "#FFFFFF",
                "cursorShape": "underscore",
                "experimental.retroTerminalEffect": false,
                "font": 
                {
                    "face": "MesloLGM NF",
                    "size": 10
                },
                "guid": "{2ece5bfe-50ed-5f3a-ab87-5cd4baafed2b}",
                "hidden": false,
                "historySize": 9001,
                "name": "Git Bash",
                "opacity": 70,
                "padding": "10, 10, 10, 2",
                "scrollbarState": "hidden",
                "snapOnInput": true,
                "source": "Git",
                "startingDirectory": "%USERPROFILE%",
                "useAcrylic": true
            }
        ]
    },
    "schemes": 
    [
        {
            "background": "#1E2127",
            "black": "#1E2127",
            "blue": "#61AFEF",
            "brightBlack": "#5C6370",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B6C2",
            "brightGreen": "#98C379",
            "brightPurple": "#C678DD",
            "brightRed": "#E06C75",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#D19A66",
            "cursorColor": "#AAAAAA",
            "cyan": "#56B6C2",
            "foreground": "#ABB2BF",
            "green": "#98C379",
            "name": "OneDark",
            "purple": "#C678DD",
            "red": "#E06C75",
            "selectionBackground": "#FFFFFF",
            "white": "#ABB2BF",
            "yellow": "#D19A66"
        }  
    ]
}

```

