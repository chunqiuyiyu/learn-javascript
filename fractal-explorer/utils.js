var canvas, ctx;
var nextRow = 0;
var generation = 0;

var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 100;
var palette = [];

function createTask(row) {
  return {
    row,
    width: rowData.width,
    generation,
    r_min,
    r_max,
    i: i_max + (i_min - i_max) * row / canvas.height,
    max_iter,
    escape
  }
}

function makePalette() {
  function wrap(x) {
    x = ((x + 256) & 0x1ff) - 256;
    if (x < 0) x = -x;
    return x;
  }

  for (let i = 0; i <= this.max_iter; i++) {
    palette.push([wrap(7 * i), wrap(5 * i), wrap(11 * i)]);
  }

}

function drawRow(workerResults) {
  var values = workerResults.values;
  var pixelData = rowData.data;

  for (let i = 0; i < rowData.width; i++) {
    let r = i * 4;
    let g = r + 1;
    let b = g + 1;
    let a = b + 1;

    pixelData[a] = 255;
    if (values[i] < 0) {
      pixelData[r] = pixelData[g] = pixelData[b] = 0;
    } else {
      const color =this.palette[values[i]];
      pixelData[r] = color[0];
      pixelData[g] = color[1];
      pixelData[b] = color[2];
    }
  }

  ctx.putImageData(this.rowData, 0, workerResults.row);
}

function setupGraphics() {
  canvas = document.getElementById('fractal');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let width = (i_max - i_min) * canvas.width / canvas.height;
  let r_mid = (r_max + r_min) / 2;
  r_min = r_mid - width / 2;
  r_max = r_mid + width / 2;

  rowData = ctx.createImageData(canvas.width, 1);

  makePalette();
}

function computeRow(task) {
  var iter = 0;
  var c_i = task.i;
  var max_iter = task.max_iter;
  var escape = task.escape * task.escape;
  task.values = [];

  for (let i = 0; i < task.width; i++) {
    var c_r = task.r_min + (task.r_max - task.r_min) * i / task.width;
    var z_r = 0, z_i = 0;

    for (iter = 0; z_r * z_r + z_i * z_i < escape && iter < max_iter; iter++) {
      // z -> z^2 + c
      var tmp = z_r * z_r - z_i * z_i + c_r;
      z_i = 2 * z_r * z_i + c_i;
      z_r = tmp;
    }

    if (iter == max_iter) {
      iter = -1;
    }

    task.values.push(iter);
  }

  return task;
}

function startWorkers() {
  generation++;
  nextRow = 0;

  for (let i = 0; i < workers.length; i++) {
    let worker = workers[i];

    if (worker.idle) {
      let task = createTask(nextRow);

      worker.idle = false;
      worker.postMessage(task);

      nextRow++;
    }
  }
}
