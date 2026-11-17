/* =============================================================
 * 作业一 · 静态构成 static-sketch.js
 * 朱栩汕 · 《互动编程》
 * 说明（按要求编号）：
 *   1. 这是静态作品：只在 setup() 里画一次，全文没有 draw() 循环；
 *   2. 用双层 for 循环生成整个网格的重复元素（圆与方块交替）；
 *   3. 只使用 5 种固定颜色（见下方 PALETTE 常量），不随机取色；
 *   4. 图形大小与颜色的排列由坐标规律决定，位置整齐但有节奏变化；
 *   5. 变量命名使用完整单词（column / row / cellSize 等）。
 * ============================================================= */

// 1. 固定的 5 色调色板：米白底、深灰、朱红、青蓝、明黄
const PALETTE = {
  background: [244, 241, 234], // 米白
  dark: [43, 43, 43],          // 深灰
  red: [228, 87, 46],          // 朱红
  teal: [23, 190, 187],        // 青蓝
  yellow: [255, 201, 20]       // 明黄
};

function setup() {
  createCanvas(380, 570);
  noStroke();
  background(...PALETTE.background);

  const cellSize = 62;   // 网格间距（像素）
  const margin = 30;     // 页边距（像素）

  // 2. 双层 for 循环：遍历行与列，生成整个画面的重复元素
  for (let row = 0; row * cellSize + margin < height + cellSize; row++) {
    for (let column = 0; column * cellSize + margin < width + cellSize; column++) {

      const x = margin + column * cellSize;
      const y = margin + row * cellSize;

      // 3. 颜色按行列规律轮换：每 3 列换一组配色，画面整齐有节奏
      const group = (column + row) % 6;
      let shapeColor;
      if (group === 0 || group === 3) {
        shapeColor = PALETTE.dark;
      } else if (group === 1) {
        shapeColor = PALETTE.red;
      } else if (group === 2 || group === 5) {
        shapeColor = PALETTE.teal;
      } else {
        shapeColor = PALETTE.yellow;
      }

      // 4. 大小随行号缓慢变化：越往下图形越大，形成纵向渐变
      const shapeSize = cellSize * 0.5 + row * 1.8;

      // 5. 圆与方块按 (row + column) 的奇偶交替排布
      const isEvenCell = (row + column) % 2 === 0;
      fill(shapeColor);
      if (isEvenCell) {
        ellipse(x, y, shapeSize, shapeSize);
      } else {
        rectMode(CENTER);
        rect(x, y, shapeSize, shapeSize);
      }
    }
  }

  // 静态作品到此完成，不需要 draw() 循环
}
