# ip-01-p5-works · 作业一：创意代码的基本原理（p5.js）

朱栩汕 · 数字媒体艺术 · 大二 · 《互动编程》

两个 p5.js 作品，根目录 `index.html` 是索引页：

| 作品 | 入口 | 说明 |
| --- | --- | --- |
| 静态构成 | [static.html](static.html) | 只用形状 / 颜色 / 位置，无 `draw()` 循环；双层 `for` 循环生成网格，5 色轮换 |
| 运动轨迹 | [dynamic.html](dynamic.html) | `draw()` 每帧运行；鼠标移动激起涟漪（交互一），按住拖动波纹更密（交互二） |

在线浏览（GitHub Pages）：https://sleepy677.github.io/ip-01-p5-works/

## 技术要点

- p5.js 本地引入（不依赖 CDN，离线可运行）
- 静态作品：`setup()` 一次性绘制，双层嵌套 `for` 循环，固定 5 色调色板
- 交互作品：数组 + `for` 循环管理波纹生命周期，`if` 条件删除消失波纹，`random()` 控制波纹大小与速度
- 代码内有编号注释说明
