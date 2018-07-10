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
})({6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var datas = [[40, 40, -40, 40, -40, -40, 40, -40], // square
[0, -80, -80, 40, 0, 0, 80, 40], // arrow
[-120, -40, 120, -40, -80, 120, 0, -120, 80, 120]];

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

var loadDatas = function loadDatas(level) {
  var datasJSON = JSON.stringify(_datas2.default);
  var data = JSON.parse(datasJSON);

  var tmp = [];
  var currentData = data[level];

  for (var i = 0; i < currentData.length; i += 2) {
    tmp.push([currentData[i], currentData[i + 1], genStars(240), 2]);
  }

  return tmp;
};

var setStars = function setStars(nodes, level) {
  var stars = 150;
  for (var i = stars - 1; i >= 0; i--) {
    nodes[i] = [genStars(240), genStars(240), genStars(240)];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = loadDatas(level)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

  return nodes;
};

var drawWin = function drawWin(nodes, level) {
  var tmp = nodes.slice(-_datas2.default[level].length / 2);
  var myDatas = [];
  var item = void 0;

  for (var i = 1; i <= tmp.length; i++) {
    var prev = tmp[i - 1];

    if (!tmp[i]) {
      item = tmp[0];
    } else {
      item = tmp[i];
    }

    var x = item[0];
    var y = item[1];

    var s = Math.sqrt(Math.pow(x - prev[0], 2) + Math.pow(y - prev[1], 2));

    myDatas.push([s, Math.abs(Math.asin((y - prev[1]) / s)), x - prev[0] >= 0, y - prev[1] >= 0, prev]);
  }

  ctx.strokeStyle = '#fff';
  ctx.beginPath();

  var _loop = function _loop(_i) {
    setTimeout(function () {
      drawLine(myDatas[_i], _i);
    }, _i * 1000);
  };

  for (var _i = 0; _i < myDatas.length; _i++) {
    _loop(_i);
  }
};

var drawLine = function drawLine(data, i) {
  ctx.lineWidth = 1;

  var timer = 0;
  var loop = new Loop(1);
  loop.update = function (dt) {

    timer += dt;

    var v = data[0] / 1;
    var s = v * timer;

    var x = data[4][0] + s * Math.cos(data[1]) * (data[2] ? 1 : -1);
    var y = data[4][1] + s * Math.sin(data[1]) * (data[3] ? 1 : -1);

    ctx.lineTo(x, y);
    ctx.stroke();
  };
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
  setStars: setStars,
  drawWin: drawWin,
  level: level
};
},{"./datas":6}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clear = _base2.default.clear,
    drawBG = _base2.default.drawBG,
    Loop = _base2.default.Loop,
    draw = _base2.default.draw;


var boom = function boom(nodes) {
  var datas = nodes.map(function (item) {
    var x = item[0];
    var y = item[1];

    var s = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return [s, s === 0 ? 0 : Math.abs(Math.asin(y / s)), Math.round(x) >= 0, Math.round(y) > 0];
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

    draw(nodes);
  };
};

exports.default = boom;
},{"./base":3}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _datas = require('./datas');

var _datas2 = _interopRequireDefault(_datas);

var _animate = require('./animate');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var level = 0;

var ctx = _base2.default.ctx,
    draw = _base2.default.draw,
    clear = _base2.default.clear,
    canvas = _base2.default.canvas,
    drawWin = _base2.default.drawWin,
    setStars = _base2.default.setStars;


var prevX = void 0,
    prevY = void 0;
var isMouseDown = false;

var rotateY3D = function rotateY3D(theta, nodes) {

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

var rotateX3D = function rotateX3D(theta, nodes) {

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

var checkWin = function checkWin(nodes) {
  var baseData = _datas2.default[level];
  var length = baseData.length;
  var newData = nodes.slice(-length / 2);
  var limit = 10;
  var result = true;
  var dx = void 0,
      dy = void 0;
  var j = 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = newData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      var i = newData.indexOf(item);

      dx = Math.abs(item[0] - baseData[j]);
      dy = Math.abs(item[1] - baseData[j + 1]);

      if (dx > limit || dy > limit) {
        result = false;
        break;
      }

      j += 2;
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

  if (result) {
    setTimeout(function () {
      level++;
      if (level === _datas2.default.length) {
        level = 0;
      }

      var nodes = setStars([], level);
      rotateY3D(0.5 * Math.random() * Math.PI, nodes);
      rotateX3D(0.5 * Math.random() * Math.PI, nodes);

      (0, _animate2.default)(nodes);
      attachRotate(nodes, level);
    }, length / 2 * 1000 + 500);
  }

  return result;
};

var attachRotate = function attachRotate(nodes) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


  canvas.onmousedown = function (e) {
    prevX = e.pageX;
    prevY = e.pageY;
    isMouseDown = true;
  };

  canvas.onmousemove = function (e) {
    if (isMouseDown) {
      e.preventDefault();
      clear();

      var nowX = e.pageX;
      var nowY = e.pageY;

      rotateY3D(-(nowX - prevX) * Math.PI / 180 * 0.8, nodes);
      rotateX3D(-(nowY - prevY) * Math.PI / 180 * 0.8, nodes);

      draw(nodes);

      prevX = e.pageX;
      prevY = e.pageY;
    }
  };

  canvas.onmouseleave = canvas.onmouseup = function (e) {
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
};

exports.default = attachRotate;
},{"./base":3,"./datas":6,"./animate":15}],2:[function(require,module,exports) {
'use strict';

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _rotate = require('./rotate');

var _rotate2 = _interopRequireDefault(_rotate);

var _animate = require('/animate');

var _animate2 = _interopRequireDefault(_animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawBG = _base2.default.drawBG,
    setStars = _base2.default.setStars,
    drawTitle = _base2.default.drawTitle,
    canvas = _base2.default.canvas;


drawBG();
var nodes = setStars([], 0);
drawTitle();

var startGame = function startGame() {
  (0, _animate2.default)(nodes);
  canvas.removeEventListener('click', startGame);
  (0, _rotate2.default)(nodes);
};

canvas.addEventListener('click', startGame);
},{"./base":3,"./rotate":16,"/animate":15}],21:[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '6653' + '/');
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
},{}]},{},[21,2], null)
//# sourceMappingURL=/sky-with-stars.15665de6.map