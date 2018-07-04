// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var datas = [[40, 40, -40, 40, -40, -40, 40, -40]];

exports.default = datas;
},{}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datas = require('./datas');

var _datas2 = _interopRequireDefault(_datas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById('world');
var ctx = canvas.getContext('2d');
ctx.translate(160, 240);

var nodes = [];
var level = 0;

var draw = function draw(nodes) {
  ctx.fillStyle = '#fff';

  for (var i = nodes.length - 1; i >= 0; i--) {
    ctx.beginPath();
    var tmp = nodes[i];
    ctx.arc(tmp[0], tmp[1], tmp[3] || 1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.closePath();
  }
};

var drawTitle = function drawTitle() {

  ctx.font = "50px SimHei";

  ctx.fillStyle = "#fff";
  ctx.fillText('Sky', -58, -70);

  ctx.font = "30px SimHei";
  ctx.fillText('with', -8, -20);

  ctx.font = "50px SimHei";
  ctx.fillText('Stars', -58, 30);

  ctx.font = "20px Microsoft YaHei";
  ctx.fillText('Click to start', -60, 150);
};

var drawBG = function drawBG() {
  var gradient = ctx.createLinearGradient(-160, -240, -160, 240);
  gradient.addColorStop(0.7, '#000');
  gradient.addColorStop(1, '#0f60a5');

  ctx.fillStyle = gradient;
  ctx.fillRect(-160, -240, 320, 480);
};

var genStars = function genStars(range) {
  return Math.random() > 0.5 ? parseInt(Math.random() * range) : parseInt(Math.random() * -range);
};

var loadDatas = function loadDatas() {
  var datasJSON = JSON.stringify(_datas2.default);
  var data = JSON.parse(datasJSON);

  var tmp = [];
  var currentData = data[level];
  for (var i = 0; i < currentData.length; i += 2) {
    tmp.push([currentData[i], currentData[i + 1], genStars(240), 2]);
  }

  return tmp;
};

var drawStars = function drawStars() {
  var stars = 150;
  for (var i = stars - 1; i >= 0; i--) {
    nodes[i] = [genStars(240), genStars(240), genStars(240)];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = loadDatas()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var data = _step.value;

      nodes.push(data);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  draw(nodes);
};

var drawWin = function drawWin() {
  var tmp = nodes.slice(-_datas2.default[level].length / 2);
  console.log(tmp);

  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.moveTo(tmp[0][0], tmp[0][1]);

  for (var i = 1; i <= tmp.length; i++) {
    if (!tmp[i]) {
      ctx.lineTo(tmp[0][0], tmp[0][1]);
    } else {
      ctx.lineTo(tmp[i][0], tmp[i][1]);
    }
  }

  ctx.stroke();
};

var clear = function clear() {
  canvas.with = 320;
  canvas.height = 480;

  ctx.translate(160, 240);
  drawBG();
};

var Loop = function () {
  //game loop
  function Loop(limit) {
    _classCallCheck(this, Loop);

    this.lastTime = this.timer = 0;
    this.limit = limit;
    this.callback();
  }

  _createClass(Loop, [{
    key: 'callback',
    value: function callback(millis) {

      if (this.lastTime) {
        var dt = (millis - this.lastTime) / 1000;
        this.timer += dt;
        this.update(dt);
      }

      this.lastTime = millis;

      if (this.timer < this.limit) {
        requestAnimationFrame(this.callback.bind(this));
      }
    }
  }]);

  return Loop;
}();

exports.default = {
  drawTitle: drawTitle,
  drawBG: drawBG,
  canvas: canvas,
  ctx: ctx,
  clear: clear,
  nodes: nodes,
  Loop: Loop,
  draw: draw,
  drawStars: drawStars,
  drawWin: drawWin,
  level: level
};
},{"./datas":17}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _datas = require('./datas');

var _datas2 = _interopRequireDefault(_datas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = _base2.default.ctx,
    nodes = _base2.default.nodes,
    draw = _base2.default.draw,
    clear = _base2.default.clear,
    canvas = _base2.default.canvas,
    drawWin = _base2.default.drawWin,
    level = _base2.default.level;


var prevX = void 0,
    prevY = void 0;
var isMouseDown = false;

var rotateY3D = function rotateY3D(theta) {

  var sin_t = Math.sin(theta);
  var cos_t = Math.cos(theta);

  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cos_t - z * sin_t;
    node[2] = z * cos_t + x * sin_t;
  }
};

var rotateX3D = function rotateX3D(theta) {

  var sin_t = Math.sin(theta);
  var cos_t = Math.cos(theta);

  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cos_t - z * sin_t;
    node[2] = z * cos_t + y * sin_t;
  }
};

var checkWin = function checkWin() {
  var baseData = _datas2.default[level];
  var length = baseData.length;
  var newData = nodes.slice(-length / 2);

  return newData.every(function (item, i) {
    return Math.abs(Math.abs(item[0]) - Math.abs(baseData[i])) < 5 && Math.abs(Math.abs(item[1]) - Math.abs(baseData[i + 1])) < 5;
  });
};

var attachRotate = function attachRotate() {
  canvas.addEventListener('mousedown', function (e) {
    prevX = e.pageX;
    prevY = e.pageY;
    isMouseDown = true;
  });

  canvas.addEventListener('mousemove', function (e) {
    if (isMouseDown) {
      e.preventDefault();
      clear();

      var nowX = e.pageX;
      var nowY = e.pageY;

      rotateY3D(-(nowX - prevX) * Math.PI / 180 * 0.8);
      rotateX3D(-(nowY - prevY) * Math.PI / 180 * 0.8);

      draw(nodes);

      prevX = e.pageX;
      prevY = e.pageY;
    }
  });

  canvas.addEventListener('mouseup', function (e) {
    isMouseDown = false;

    // win
    if (checkWin()) {
      console.log('win');
      drawWin();
    };
  });
};

exports.default = attachRotate;
},{"./base":3,"./datas":17}],4:[function(require,module,exports) {
'use strict';

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _rotate = require('./rotate');

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = _base2.default.canvas,
    clear = _base2.default.clear,
    drawBG = _base2.default.drawBG,
    Loop = _base2.default.Loop,
    nodes = _base2.default.nodes,
    draw = _base2.default.draw;


var startGame = function startGame() {
  var datas = nodes.map(function (item) {
    var x = item[0];
    var y = item[1];

    var s = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return [s, Math.abs(Math.asin(y / s)), x > 0, y > 0];
  });

  var timer = 0;
  var loop = new Loop(1);
  loop.update = function (dt) {
    clear();
    drawBG();

    timer += dt;

    for (var i = nodes.length - 1; i >= 0; i--) {
      var data = datas[i];

      var v = data[0] / 1;
      var s = v * timer;

      nodes[i][0] = s * Math.cos(data[1]) * (data[2] ? 1 : -1);
      nodes[i][1] = s * Math.sin(data[1]) * (data[3] ? 1 : -1);
    }

    draw(nodes, 1);
  };

  canvas.removeEventListener('click', startGame);
  (0, _rotate2.default)();
};

canvas.addEventListener('click', startGame);
},{"./base":3,"./rotate":5}],2:[function(require,module,exports) {
'use strict';

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawBG = _base2.default.drawBG,
    drawStars = _base2.default.drawStars,
    drawTitle = _base2.default.drawTitle;


drawBG();
drawStars();
drawTitle();
},{"./base":3,"./events":4}],16:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '7646' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[16,2], null)
//# sourceMappingURL=/sky-with-stars.15665de6.map