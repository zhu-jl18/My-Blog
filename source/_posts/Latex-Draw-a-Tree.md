---
title: latex-draw-a-tree
categories:
  - 其他
abbrlink: 38523
date: 2021-03-12 12:22:09
---
How to draw simple trees in LaTeX without using TikZ.

<!--more-->
**References:**
- [How can I draw simple trees in LaTeX?](https://tex.stackexchange.com/questions/5447/how-can-i-draw-simple-trees-in-latex)

There are ways to get LaTeX to draw it's own trees that doesn't involve learning an entirely new language like TikZ.

### qtree package



Consider the following TeX:

```latex
\Tree[.IP [.NP [.Det \textit{the} ]
               [.N\1 [.N \textit{package} ]]]
          [.I\1 [.I \textsc{3sg.Pres} ]
                [.VP [.V\1 [.V \textit{is} ]
                           [.AP [.Deg \textit{really} ]
                                [.A\1 [.A \textit{simple} ]
                                      \qroof{\textit{to use}}.CP ]]]]]]
```

This produces the following tree:

<img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2021-3/latex-draw-a-tree-01.png">

The basic syntax is simply `[.node-name subtrees... ]`; `\qroof`, which draws the triangle, requires its node name at the end, instead. The `\1` is just a shortcut for a math-mode prime. In addition, qtree will always render `_` and `^` as sub- and super-scripts, too.

### forest package

Here is a forest version of the code for the tree showed above:
```latex
\begin{forest}
  [IP
    [NP
     [Det
       [\textit{the}]
     ]
     [N\('\)
       [N
         [\textit{package}]
       ]
     ]
    ]
    [I\('\)
      [I
        [\textsc{3sg.Pres}
        ]
      ]
      [VP
        [V\('\)
          [V
            [\textit{is}]
          ]
          [AP
            [Deg
              [\textit{extremely}]
            ]
            [A\('\)
              [A
                [\textit{straightforward}]
              ]
              [CP
                [\textit{to wield}, roof]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
\end{forest}
```

Easy to see its syntax~ And we can select some additional features: forest allows you to specify that nodes should be aligned on a common tier. To use this feature, you just write `, tier=<name of tier>` after the content of the node is specified.

Here's an extreme example:

<img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2021-3/latex-draw-a-tree-02.png" style="width:59%">

```latex
\begin{forest}
  for tree={
    fit=band,% spaces the tree out a little to avoid collisions
  }
  [things
    [cabbages, tier=vegetables
      [peaches, tier=fruits]
    ]
    [kings, tier=aristocrats]
    [sealing wax
      [queens, tier=aristocrats
        [carrots, tier=vegetables]
        [pineapple, tier=fruits]
        [aubergine, tier=vegetables]
      ]
    ]
  ]
\end{forest}
```

### ditree package

 For non "graphical" tree, we can use the dirtree package:
 ```latex
\dirtree{%
.1 debug.
.2 filename.
.2 modules.
.3 module.
.3 module.
.3 module.
.2 level.
}
 ```

 It looks like this:
 <img src="https://cdn.jsdelivr.net/gh/zhu-jl18/cdn4blog/2021-3/latex-draw-a-tree-03.png">