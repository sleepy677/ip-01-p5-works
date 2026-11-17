/* =============================================================
 * 作业一 · 交互动态 dynamic-sketch.js
 * 朱栩汕 · 《互动编程》
 * 说明（按要求编号）：
 *   1. 这是动态交互作品：draw() 每帧运行，画面持续变化；
 *   2. 交互一：移动鼠标（mouseX / mouseY 变化）在海面激起涟漪；
 *   3. 交互二：按住鼠标（mouseIsPressed）拖动时波纹成倍增加；
 *   4. 用 for 循环遍历并更新所有波纹，用 if 条件删除消失的波纹；
 *   5. random() 给每个波纹随机的最大半径与扩散速度。
 * ============================================================= */

let ripples = [];  // 存放画面上所有波纹的数组

function setup() {
  createCanvas(380, 570);
  frameRate(24);
  noStroke();
}

function draw() {
  // 清澈海面渐变背景（深海蓝到浅青蓝，模拟通透海水）
  for (let rowY = 0; rowY < height; rowY++) {
    const blend = map(rowY, 0, height, 0, 1);
    const seaRed = lerp(30, 70, blend);
    const seaGreen = lerp(90, 160, blend);
    const seaBlue = lerp(150, 200, blend);
    fill(seaRed, seaGreen, seaBlue);
    rect(0, rowY, width, 1);
  }

  // 交互一：鼠标移动时生成新水波纹
  // 交互二：按住鼠标拖动时，一次生成三个波纹（涟漪更密）
  const isMoving = abs(mouseX - pmouseX) > 2 || abs(mouseY - pmouseY) > 2;
  if (isMoving) {
    const rippleCount = mouseIsPressed ? 3 : 1;
    for (let n = 0; n < rippleCount; n++) {
      ripples.push({
        x: mouseX + random(-6, 6),
        y: mouseY + random(-6, 6),
        radius: 0,
        maxRadius: random(45, 90),   // random：波纹大小随机
        alpha: 160,
        speed: random(1.6, 2.8)      // random：扩散速度随机
      });
    }
  }

  // for 循环更新并绘制所有波纹
  for (let index = ripples.length - 1; index >= 0; index--) {
    const ripple = ripples[index];
    ripple.radius += ripple.speed;
    ripple.alpha -= 2.2;

    // if 条件判断：波纹超出最大半径或完全透明时，从数组中删除
    if (ripple.radius > ripple.maxRadius || ripple.alpha <= 0) {
      ripples.splice(index, 1);
      continue;
    }

    // 绘制多层同心椭圆波纹，模拟真实水面涟漪
    noFill();
    stroke(220, 245, 255, ripple.alpha);
    strokeWeight(1.3);
    ellipse(ripple.x, ripple.y, ripple.radius * 2, ripple.radius * 0.75);
    stroke(220, 245, 255, ripple.alpha * 0.5);
    ellipse(ripple.x, ripple.y, ripple.radius * 1.4, ripple.radius * 0.55);
  }

  // 微弱环境细波纹，让海面不是死板静止
  stroke(200, 235, 250, 35);
  for (let waveIndex = 0; waveIndex < 12; waveIndex++) {
    const waveX = (waveIndex * 47 + frameCount * 0.4) % width;
    const waveY = 120 + waveIndex * 38;
    ellipse(waveX, waveY, 26, 8);
  }
}
