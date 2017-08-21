importScripts('utils.js');

onmessage = function(task) {
  let workResult = computeRow(task.data);
  postMessage(workResult);
}
