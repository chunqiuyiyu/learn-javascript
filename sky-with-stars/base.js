import datas from './datas';

const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');
ctx.translate(160, 240);

let nodes = [];
let level = 0;

const draw = (nodes) => {
  ctx.fillStyle = '#fff';

  for (var i = nodes.length - 1; i >= 0; i--) {
    ctx.beginPath();
    const tmp = nodes[i]
    ctx.arc(tmp[0], tmp[1], tmp[3] || 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};

const drawTitle = () => {

  ctx.font = "50px SimHei";

  ctx.fillStyle = "#fff";
  ctx.fillText('Sky', -58, -70);

  ctx.font = "30px SimHei";
  ctx.fillText('with', -8, -20);

  ctx.font = "50px SimHei";
  ctx.fillText('Stars', -58, 30);

  ctx.font = "20px Microsoft YaHei";
  ctx.fillText('Click to start', -60, 150);
}

const drawBG = () => {
  var gradient = ctx.createLinearGradient(-160, -240, -160, 240); 
  gradient.addColorStop(0.7, '#000'); 
  gradient.addColorStop(1, '#0f60a5'); 
  
  ctx.fillStyle = gradient; 
  ctx.fillRect(-160, -240, 320, 480);
}

const genStars = range => {
  return Math.random() > 0.5 ? parseInt(Math.random() * range) : 
    parseInt(Math.random() * -range);
}

const loadDatas = (level) => {
  const datasJSON = JSON.stringify(datas);
  const data = JSON.parse(datasJSON);

  const tmp = [];
  const currentData = data[level];

  for (let i = 0; i < currentData.length; i += 2 ) {
    tmp.push([
               currentData[i],
               currentData[i + 1], 
               genStars(240), 
               2
             ]);
  }

  return tmp;
}

const setStars = (nodes, level) => {
  const stars = 150;
  for (let i = stars - 1; i >= 0; i--) {
      nodes[i] = [
        genStars(240),
        genStars(240),
        genStars(240),
      ]
  }

  for (let data of loadDatas(level)) {
    nodes.push(data);
  }

  return nodes;
}

const drawWin = (nodes, level) => {
  const tmp = nodes.slice(-(datas[level].length) / 2);
  let myDatas = [];
  let item;

  for (let i = 1; i <= tmp.length; i ++) {
    let prev = tmp[i - 1];

    if (!tmp[i]) {
      item = tmp[0];
    } else {
      item = tmp[i];
    }

    const x = item[0];
    const y = item[1];

    const s = Math.sqrt(Math.pow(x - prev[0], 2) + Math.pow(y - prev[1], 2));

    myDatas.push([s, Math.abs(Math.asin((y - prev[1]) / s)),
      x - prev[0] >= 0, y - prev[1] >= 0, prev]);
  }

  ctx.strokeStyle = '#fff';
  ctx.beginPath();

  for (let i = 0; i < myDatas.length; i++) {
    setTimeout(() => {
      drawLine(myDatas[i], i);
    }, i * 1000)
  }
}

const drawLine = (data, i) => {
  ctx.lineWidth = 1;

  let timer = 0;
  const loop = new Loop(1);
  loop.update = dt => {

    timer += dt;

    const v = data[0] / 1;
    let s = v * timer;

    const x = data[4][0] + s * Math.cos(data[1]) * (data[2] ? 1 : -1);
    const y = data[4][1] + s * Math.sin(data[1]) * (data[3] ? 1 : -1);

    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const clear = () => {
  canvas.with = 320;
  canvas.height = 480;

  ctx.translate(160, 240);
  drawBG();
}

class Loop  {
  //game loop
  constructor (limit) {
    this.lastTime = this.timer = 0;
    this.limit = limit;
    this.callback();
  }

  callback (millis) {

    if (this.lastTime) {
      const dt = (millis - this.lastTime) / 1000;
      this.timer += dt;
      this.update(dt)
    }

    this.lastTime = millis;

    if (this.timer < this.limit) {
      requestAnimationFrame(this.callback.bind(this));
    }
  }
}

export default {
  drawTitle,
  drawBG,
  canvas,
  ctx,
  clear,
  nodes,
  Loop,
  draw,
  setStars,
  drawWin,
  level
};
