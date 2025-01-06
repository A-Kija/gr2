/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/back.app.js ***!
  \*************************/
if (document.querySelector('[data-msg]')) {
  var msg = document.querySelector('[data-msg]');
  setTimeout(function (_) {
    msg.remove();
  }, 3000);
}
/******/ })()
;