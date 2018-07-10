import base from './base';
import datas from './datas';
import boom from './animate';

let level = 0;

const { ctx, draw, clear, canvas, drawWin, setStars } = base;

let prevX,prevY;
let isMouseDown = false;

var rotateY3D = function(theta, nodes) {

    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
  }
}

var rotateX3D = function(theta, nodes) {

    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
}

const checkWin = (nodes) => {
  const baseData = datas[level];
  const length = baseData.length;
  const newData = nodes.slice(-length / 2);
  const limit = 10;
  let result = true;
  let dx, dy;
  let j = 0;

  for (let item of newData) {
    const i = newData.indexOf(item);

    dx = Math.abs(item[0] - baseData[j]);
    dy = Math.abs(item[1] - baseData[j + 1]);

    if (dx > limit || dy > limit) {
      result = false;
      break;
    }

    j += 2;
  }

  if (result) {
    setTimeout(() => {
      level ++;
      if (level === datas.length) {
        level = 0;
      }

      let nodes = setStars([], level);
      rotateY3D(0.5 * Math.random() * Math.PI , nodes);
      rotateX3D(0.5 * Math.random() * Math.PI , nodes);

      boom(nodes);
      attachRotate(nodes, level);
    }, length / 2 * 1000 + 500);
  }

  return result;
}

const attachRotate = (nodes, level = 0) => {

  canvas.onmousedown = function(e){
    prevX = e.pageX;
    prevY = e.pageY;
    isMouseDown = true;
  };

  canvas.onmousemove = function(e){
    if(isMouseDown){
      e.preventDefault();
      clear();

      var nowX = e.pageX;
      var nowY = e.pageY;
      
      rotateY3D(-(nowX - prevX)* Math.PI / 180*0.8, nodes);
      rotateX3D(-(nowY - prevY) *Math.PI / 180*0.8, nodes);

      draw(nodes);

      prevX = e.pageX;
      prevY = e.pageY;
    }
  };

  canvas.onmouseleave = canvas.onmouseup = function(e){
    isMouseDown = false;

    // win
    if (checkWin(nodes, level)) {
      // console.log('win');
      drawWin(nodes, level);

      canvas.onmousedown = null;
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
    };
  };
}

export default attachRotate;


