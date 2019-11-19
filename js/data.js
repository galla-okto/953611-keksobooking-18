'use strict';

(function () {
  var MAPIN_WIDTH = 62;
  var MAPIN_HEIGHT = 84;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 750;
  var Y_MIN = 130 - MAPIN_HEIGHT;
  var Y_MAX = 630 - MAPIN_HEIGHT;
  var rentalAds = [];

  window.data = {
    rentalAds: rentalAds
  };

  window.const = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGHT: MAP_HEIGHT,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    MAPIN_HEIGHT: MAPIN_HEIGHT,
    MAPIN_WIDTH: MAPIN_WIDTH
  };

  window.getMapinX = function (initialX) {
    return initialX + MAPIN_WIDTH / 2;
  };

  window.getMapinY = function (initialY) {
    return initialY + MAPIN_HEIGHT;
  };

  var onSuccessClick = function () {
    var successMessage = document.querySelector('.success');

    successMessage.parentNode.removeChild(successMessage);

    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      onSuccessClick();
    }
  };

  var onErrorClick = function () {
    var errMessage = document.querySelector('.error');

    errMessage.parentNode.removeChild(errMessage);

    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      onErrorClick();
    }
  };

  window.onSuccess = function () {
    var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
    var sccMessage = similarSuccessTemplate.cloneNode(true);

    document.body.insertAdjacentElement('afterbegin', sccMessage);

    sccMessage.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  window.onError = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errMessage = similarErrorTemplate.cloneNode(true);

    errMessage.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errMessage);

    errMessage.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  window.onSuccessAds = function (arrayAds) {
    window.data.rentalAds = arrayAds;
  };

  window.load(window.onSuccessAds, window.onError);

})();
