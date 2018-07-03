const canvas = document.getElementById('world');
const ctx = canvas.getContext('2d');
ctx.translate(160, 240);

const nodes = [];

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

const drawStars = () => {
  const stars = 150;
  for (let i = stars - 1; i >= 0; i--) {
      nodes[i] = [
        genStars(240),
        genStars(240),
        genStars(240),
      ]
  }

  draw(nodes);
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
  drawStars
};