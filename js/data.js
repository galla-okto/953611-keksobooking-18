'use strict';

(function () {
  var MAPIN_WIDTH = 62;
  var MAPIN_HEIGHT = 84;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 750;
  var Y_MIN = 130 - MAPIN_HEIGHT;
  var Y_MAX = 630 - MAPIN_HEIGHT;
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

  var onSuccess = function (rentalAds) {
    window.rentalAds = rentalAds;
  };

  var onError = function (errorMessage) {
    var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error__message');
    var errMessage = similarErrorTemplate.cloneNode(true);

    errMessage.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errMessage);
  };

  window.load(onSuccess, onError);

})();
