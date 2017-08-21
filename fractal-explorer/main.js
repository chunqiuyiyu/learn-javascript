const numberOfWorkers = 8;
const workers = [];

window.onload = function() {
  setupGraphics();

  window.onresize = function() {
    resizeToWindow();
  }

  canvas.onclick = function(e) {
    handleClick(e.clientX, e.clientY);
  }

  for (let i = 0; i < numberOfWorkers; i++) {
    let worker = new Worker('worker.js');

    worker.onmessage = function(e) {
      processWorker(e.target, e.data);
    }

    worker.idle = true;
    workers.push(worker);
  }

  startWorkers();
}

function processWorker(worker, workerResults) {
  if (workerResults.generation == generation) {
    drawRow(workerResults);
  }

  reassignWorker(worker);
}

function reassignWorker(worker) {
  let row = nextRow++;

  if (row >= canvas.height) {
    worker.idle = true;
  } else {
    let task = createTask(row);
    worker.idle = false;
    worker.postMessage(task);
  }
}

function handleClick(x, y) {
  var width = r_max - r_min;
  var height = i_min - i_max;
  var click_r = r_min + width * x / canvas.width;
  var click_i = i_max + height * y / canvas.height;

  var zoom = 8;

  r_min = click_r - width / zoom;
  r_max = click_r + width / zoom;
  i_max = click_i - height / zoom;
  i_min = click_i + height / zoom;

  startWorkers();
}

function resizeToWindow() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let width = (i_max - i_min) * canvas.width / canvas.height;
  let r_mid = (r_max + r_min) / 2;
  r_min = r_mid - width / 2;
  r_max = r_mid + width / 2;

  rowData = ctx.createImageData(canvas.width, 1);
  startWorkers();
}
