var c = document.getElementById('world');
var ctx = c.getContext('2d');
ctx.translate(160, 240)

var node0 = [-80, -80, -80];
var node1 = [-80, -80,  80];
var node2 = [-80,  80, -80];
var node3 = [-80,  80,  80];
var node4 = [ 80, -80, -80];
var node5 = [ 80, -80,  80];
var node6 = [ 80,  80, -80];
var node7 = [ 80,  80,  80];
var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

var zeroNode = [0, 0, 0]
var xNode = [50, 0, 0]
var yNode = [0, 50, 0]
var zNode = [0, 0, 50]

var coordinateNodes = [zeroNode, xNode, yNode, zNode];
var coordinateX = [0, 1];
var coordinateY = [0, 2];
var coordinateZ = [0, 3];
var coordinateEdges = [coordinateX, coordinateY, coordinateZ];

var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];
var edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];

var rotateZ3D = function(theta, nodes) {
    var sin_t = Math.sin(theta);
    var cos_t = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
}

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

rotateZ3D(30*Math.PI/180, nodes);
rotateY3D(30*Math.PI/180, nodes);
rotateY3D(30*Math.PI/180, nodes);

rotateZ3D(30*Math.PI/180, coordinateNodes);
rotateY3D(30*Math.PI/180, coordinateNodes);
rotateY3D(30*Math.PI/180, coordinateNodes);

var draw = function(edges, nodes, texts) {

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(34, 68, 204)";
    ctx.save(); 
    ctx.translate(0.5,0.5); 
    for (var e = 0; e < edges.length; e++) {
        var n0 = edges[e][0];
        var n1 = edges[e][1];
        var node0 = nodes[n0];
        var node1 = nodes[n1];
        ctx.moveTo(node0[0], node0[1]);
        ctx.lineTo(node1[0], node1[1]);
     }
    ctx.stroke();
    ctx.restore();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(40, 168, 107)";
    ctx.save(); 
    ctx.translate(0.5,0.5); 
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        ctx.arc(node[0], node[1], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    drawText(nodes,texts);
    ctx.restore()
}

var drawText = function(nodes,texts){
      for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        ctx.fillText(texts[n],node[0],node[1]-10);
      }
}

draw(edges, nodes, [0,1,2,3,4,5,6,7,8]);
draw(coordinateEdges, coordinateNodes, ['O','X','Y','Z']);

var prevX,prevY;
var isMouseDown = false;
document.getElementById('world').addEventListener('mousedown',function(e){
  prevX = e.pageX;
  prevY = e.pageY;
  isMouseDown = true;
})

document.getElementById('world').addEventListener('mousemove',function(e){
  if(isMouseDown){
        e.preventDefault();
        ctx.clearRect(-160, -240, 320, 480);

        var nowX = e.pageX;
        var nowY = e.pageY;

        gX = nowX - prevX;
        gY = nowY - prevY;
        
        rotateY3D(-(nowX - prevX)*Math.PI/180*0.8,nodes);
        rotateX3D(-(nowY - prevY)*Math.PI/180*0.8,nodes);
        rotateY3D(-(nowX - prevX)*Math.PI/180*0.8,coordinateNodes);
        rotateX3D(-(nowY - prevY)*Math.PI/180*0.8,coordinateNodes);
        draw(edges, nodes, [0,1,2,3,4,5,6,7,8]);
        draw(coordinateEdges, coordinateNodes, ['O','X','Y','Z']);

        prevX = e.pageX;
        prevY = e.pageY;
  }
});

document.getElementById('world').addEventListener('mouseup',function(e){
  isMouseDown = false;
});

document.getElementById('world').addEventListener('mousewheel',function(e){
  e.preventDefault();
  ctx.clearRect(-160, -240, 320, 480);

  rotateZ3D(e.deltaY*Math.PI/180*0.05,nodes);
  rotateZ3D(e.deltaY*Math.PI/180*0.05,coordinateNodes);
  draw(edges, nodes, [0,1,2,3,4,5,6,7,8]);
  draw(coordinateEdges, coordinateNodes, ['O','X','Y','Z']);
})