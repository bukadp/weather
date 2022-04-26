// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e5EF9":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "26170a8763aff760";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"adjPd":[function(require,module,exports) {
var _convertersJs = require("./converters.js");
var _cookieJs = require("./cookie.js");
let btn_deletes = document.querySelectorAll(".row__right-close");
//let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
const btn_favorite = document.querySelector(".tabcontent-now-fvorite-btn");
const cityFavorites = document.querySelectorAll(".row__right-city");
let cityFavoriteAdd = document.querySelector(".row__right-locations>ul");
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
const serverIcoUrl = 'https://openweathermap.org/img/wn/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let favoriteCities = localStorage.getItem("favoriteCities") ? new Set(JSON.parse(localStorage.getItem("favoriteCities"))) : new Set();
//onload main page
window.onload = function() {
    let cityName = localStorage.getItem("CurrentCity");
    initialFavoriteCities();
    if (!!cityName) {
        fetchWeather(cityName);
        fetchForecast(cityName);
    } else {
        fetchWeather("Dnipro");
        fetchForecast("Dnipro");
    }
};
let formValue = document.querySelector(".search__city");
formValue.addEventListener("submit", getCityName);
function initialFavoriteCities() {
    let currentFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
    if (!currentFavoriteCities == true) return;
    currentFavoriteCities.forEach(function(el) {
        renderFavoriteCities(el);
    });
}
//addEventListener on cross
for (let btn_delete of btn_deletes)btn_delete.addEventListener("click", DeleteCityFromAddedLocations);
//addEventListener on favorite cities list
for (let cityFavorite of cityFavorites)cityFavorite.addEventListener("click", getCityNameFromFavorite);
//clear box in forecast
function clearCurrentForecast() {
    let forecastsForDelete = document.querySelectorAll(".tabcontent-forecast-info-box");
    for(let i = 0; i < forecastsForDelete.length; i++)forecastsForDelete[i].remove();
}
//get City from UI form & fetch weather
function getCityName(event) {
    event.preventDefault();
    let cityName = document.querySelector(".city").value;
    fetchWeather(cityName);
    clearCurrentForecast();
    fetchForecast(cityName);
}
//get City from favorite cities & fetch weather
function getCityNameFromFavorite() {
    let cityName = document.querySelector(".city").value;
    cityName = this.textContent;
    fetchWeather(cityName);
    clearCurrentForecast();
    fetchForecast(cityName);
    getFavoriteButtonColor(cityName);
}
//favorite btn color 
function getFavoriteButtonColor(cityName) {
    if (!checkOnFavorites(cityName)) btn_favorite.classList.remove("active");
    else btn_favorite.classList.add("active");
}
function checkOnFavorites(city) {
    let parsedFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
    let isExist = parsedFavoriteCities.has(city);
    return isExist;
}
//fetch Forecast
function fetchForecast(cityName) {
    const urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
    fetch(urlForecast).then((response)=>response.json()
    ).then((data)=>{
        let resultForecastCity = document.querySelector(".tabcontent-forecast-city");
        resultForecastCity.innerHTML = `${data.city.name}`;
        handlerRender(data.list, 0);
    });
}
// get ico weather
function handlerRender(forecastList, index) {
    let icoNumber = `${forecastList[index].weather[0].icon}`;
    let ico = document.createElement('img');
    ico.src = `${serverIcoUrl}${icoNumber}.png`;
    renderForecast(forecastList[index], ico.src);
    if (index < forecastList.length) handlerRender(forecastList, index + 1);
}
//render forecast
function renderForecast(forecastList, icoSrc) {
    let today = document.querySelector(".tabcontent-forecast-info");
    today.insertAdjacentHTML('beforeBegin', `
  <div class="tabcontent-forecast-info-box" id="forecastWeather">
  <div class="tabcontent-forecast-info-box-day-time">
      <div class="tabcontent-forecast-info-box-day">${_convertersJs.dateTransform(forecastList.dt)}</div>
      <div class="tabcontent-forecast-info-box-time">${_convertersJs.timeTransform(forecastList.dt) + "0"}</div>
  </div>
  <div class="tabcontent-forecast-info-box-temp-ico">
      <div class="tabcontent-forecast-info-box-temp">
          <div class="tabcontent-forecast-info-box-temperature">Temperature: <span>${Math.round(+forecastList.main.temp - 273)}</span>&#176;</div>
          <div class="tabcontent-forecast-info-box-feels">Feels like: <span>${Math.round(+forecastList.main.feels_like - 273)}</span>&#176;</div>
      </div>
      <div class="tabcontent-forecast-info-box-ico">
          <div class="tabcontent-forecast-info-box-ico-name">${forecastList.weather[0].main[0].toUpperCase()}${forecastList.weather[0].main.slice(1)}</div>
          <div class="tabcontent-forecast-info-box-ico-icon box-ico" id="firstBoxIco"><img src="${icoSrc}" alt="weather"></div>
      </div>
  </div>
</div>
  `);
}
//fetch Weather
function fetchWeather(cityName) {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    fetch(url).then((response)=>response.json()
    ).then((data)=>{
        let resultNowCity = document.querySelector(".tabcontent-now-city, .tabcontent-details-city");
        resultNowCity.innerHTML = `${data.name}`;
        let resultNowTemp = document.querySelector(".tabcontent-now-temp>span");
        let numberTemp = +`${data.main.temp}`;
        resultNowTemp.innerHTML = Math.round(numberTemp - 273);
        let resultNowIco = document.querySelector(".tabcontent-now-ico");
        let icoNumber = `${data.weather[0].icon}`;
        let ico = document.createElement('img');
        ico.src = `${serverIcoUrl}${icoNumber}@4x.png`;
        resultNowIco.append(ico);
        let resultNowIcoFirst = document.querySelector(".tabcontent-now-ico>img");
        resultNowIcoFirst.remove();
        let resultDetailsCity = document.querySelector(".tabcontent-details-city");
        resultDetailsCity.innerHTML = `${data.name}`;
        let resultTemp = document.querySelector(".tabcontent-details-temp>span");
        resultTemp.innerHTML = `${Math.round(data.main.temp - 273)}`;
        let resultSunrise = document.querySelector(".tabcontent-details-sunrise>span");
        resultSunrise.innerHTML = "0" + _convertersJs.timeTransform(data.sys.sunrise);
        let resultSunset = document.querySelector(".tabcontent-details-sunset>span");
        resultSunset.innerHTML = _convertersJs.timeTransform(data.sys.sunset);
        let resultFeelsLike = document.querySelector(".tabcontent-details-feels>span");
        resultFeelsLike.innerHTML = `${Math.round(data.main.feels_like - 273)}`;
        let resultWeatherDescription = document.querySelector(".tabcontent-details-weather>span");
        let resultWeatherDescriptionValue = `${data.weather[0].description}`;
        resultWeatherDescription.innerHTML = `${resultWeatherDescriptionValue[0].toUpperCase()}${resultWeatherDescriptionValue.slice(1)}`;
        HandlerFetch(data.name);
    }).catch((error)=>alert(error.message)
    );
}
//after fetch weather Handler
function HandlerFetch(dataName) {
    getFavoriteButtonColor(dataName);
    AddCurrentCityInLocalStorage(dataName);
    _cookieJs.cookie(dataName);
}
//Add Current City In LocalStorage
function AddCurrentCityInLocalStorage(nameCity) {
    localStorage.setItem("CurrentCity", nameCity);
}
function DeleteCityFromAddedLocations() {
    this.parentElement.remove();
    let delCity = this.parentElement.querySelector(".row__right-city").innerText;
    let parsedFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
    parsedFavoriteCities.delete(delCity);
    localStorage.setItem("favoriteCities", JSON.stringify([
        ...parsedFavoriteCities
    ]));
    favoriteCities = parsedFavoriteCities;
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    if (delCity === resultNowCity) btn_favorite.classList.remove("active");
    else return;
}
btn_favorite.addEventListener("click", isNew);
//toggle favorite btn
function isNew() {
    btn_favorite.classList.toggle('active');
    if (btn_favorite.classList.contains('active')) HandleFavoriteClick();
    else DeleteCity();
}
function DeleteCity() {
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    let arrFavoriteCities = document.getElementsByClassName("row__right-city");
    let deleteFavoriteCities;
    for(let i = 0; i < arrFavoriteCities.length; i++)if (resultNowCity == arrFavoriteCities[i].textContent) deleteFavoriteCities = arrFavoriteCities[i];
    deleteFavoriteCities.parentElement.remove();
    let parsedFavoriteCities = new Set(JSON.parse(localStorage.getItem("favoriteCities")));
    parsedFavoriteCities.delete(resultNowCity);
    localStorage.setItem("favoriteCities", JSON.stringify([
        ...parsedFavoriteCities
    ]));
    favoriteCities = parsedFavoriteCities;
}
function HandleFavoriteClick() {
    AddCity();
    AddFavoriteCities();
}
//Add Favorite Cities in localStorage+
function AddFavoriteCities() {
    let resultNowCity = document.querySelector(".tabcontent-now-city").textContent;
    favoriteCities.add(resultNowCity);
    localStorage.setItem("favoriteCities", JSON.stringify([
        ...favoriteCities
    ]));
}
// check city in localStorage+  
function checkToExistCity(city) {
    return localStorage.getItem(city);
}
//check city in favorite cities list
function checkToExistCityInTheList(cityName) {
    let result = null;
    let cities = document.querySelectorAll(".row__right-citys");
    cities.forEach(function(city) {
        if (city.innerText == cityName) result = city.innerText;
    });
    return result;
}
//add city to favorite cities list & btn active
function AddCity() {
    let nowCity = document.querySelector(".tabcontent-now-city").textContent;
    if (!checkToExistCity(nowCity)) btn_favorite.classList.add("active");
    if (!checkToExistCityInTheList(nowCity)) renderFavoriteCities(nowCity);
}
//render favorite cities list
function renderFavoriteCities(nowCity) {
    let cityFavorite1 = document.createElement('li');
    cityFavorite1.classList.add("row__right-citys");
    cityFavoriteAdd.prepend(cityFavorite1);
    cityFavorite1.innerHTML = `
        <button class="row__right-city">${nowCity}</button>
        <button class="row__right-close" data-close="close"></button>
        `;
    document.querySelector(".row__right-close").addEventListener("click", DeleteCityFromAddedLocations);
    document.querySelector(".row__right-city").addEventListener("click", getCityNameFromFavorite);
}

},{"./converters.js":"zJCJK","./cookie.js":"7KFrp"}],"zJCJK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeTransform", ()=>timeTransform
);
parcelHelpers.export(exports, "dateTransform", ()=>dateTransform
);
const converters = {
    timeTransform: function(timeUnix) {
        let time = timeUnix * 1000;
        const hours = new Date(time).getHours();
        const minutes = new Date(time).getMinutes();
        return `${hours}:${minutes}`;
    },
    dateTransform: function(unixTime) {
        const date = new Date(unixTime * 1000);
        const month = date.toLocaleString('en-US', {
            month: "short"
        });
        const day = new Date(date).getDate();
        return `${day} ${month}`;
    }
};
const timeTransform = converters.timeTransform;
const dateTransform = converters.dateTransform;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4TSZV"}],"4TSZV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7KFrp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cookie", ()=>cookie
);
const cookies = {
    addCurrentCityInCookie: function(nameCity) {
        let dateNow = new Date(Date.now());
        dateNow.setDate(dateNow.getDate() + 1);
        let dateExpiresCookies = dateNow.toUTCString();
        document.cookie = "currentCity=" + nameCity + "; expires=" + dateExpiresCookies;
    }
};
const cookie = cookies.addCurrentCityInCookie;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"4TSZV"}]},["e5EF9","adjPd"], "adjPd", "parcelRequire94c2")

//# sourceMappingURL=index.63aff760.js.map
