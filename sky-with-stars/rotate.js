import base from './base';
import datas from './datas';

const { ctx, nodes, draw, clear, canvas, drawWin, level } = base;

let prevX,prevY;
let isMouseDown = false;

var rotateY3D = function(theta) {

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

var rotateX3D = function(theta) {

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

const checkWin = () => {
  const baseData = datas[level];
  const length = baseData.length;
  const newData = nodes.slice(-length / 2);

  return newData.every((item, i) => (
    Math.abs(Math.abs(item[0]) - Math.abs(baseData[i])) < 5 &&
      Math.abs(Math.abs(item[1]) - Math.abs(baseData[i + 1])) < 5));
}

const attachRotate = () => {
    canvas.addEventListener('mousedown',function(e){
    prevX = e.pageX;
    prevY = e.pageY;
    isMouseDown = true;
  })

  canvas.addEventListener('mousemove',function(e){
    if(isMouseDown){
      e.preventDefault();
      clear();

      var nowX = e.pageX;
      var nowY = e.pageY;
      
      rotateY3D(-(nowX - prevX)* Math.PI / 180*0.8);
      rotateX3D(-(nowY - prevY) *Math.PI / 180*0.8);

      draw(nodes);

      prevX = e.pageX;
      prevY = e.pageY;
    }
  });

  canvas.addEventListener('mouseup',function(e){
    isMouseDown = false;

    // win
    if (checkWin()) {
      console.log('win');
      drawWin();
    };
  });
}

export default attachRotate;


