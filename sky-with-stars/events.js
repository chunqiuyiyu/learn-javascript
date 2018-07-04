import base from './base';
import attachRotate from './rotate';

const { canvas, clear, drawBG, Loop, nodes, draw } = base;

const startGame = () => {
  const datas = nodes.map(item => {
    const x = item[0];
    const y = item[1];

    const s = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return [s, Math.abs(Math.asin(y / s)), x > 0, y > 0 ];
  });

  let timer = 0;
  const loop = new Loop(1);
  loop.update = dt => {
    clear()
    drawBG()

    timer += dt;

    for (var i = nodes.length - 1; i >= 0; i--) {
      const data = datas[i]

      const v = data[0] / 1;
      let s = v * timer;

      nodes[i][0] = s * Math.cos(data[1]) * (data[2] ? 1 : -1);
      nodes[i][1] = s * Math.sin(data[1]) * (data[3] ? 1 : -1);
    }

    draw(nodes, 1);
  };

  canvas.removeEventListener('click', startGame);
  attachRotate();
};

canvas.addEventListener('click', startGame);