'use strict';

(function () {
  var userDialogMap = document.querySelector('.map');
  var mapPins = userDialogMap.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  window.showRentalAds = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.rentalAds.length; i++) {
      fragment.appendChild(window.renderMapIn(window.rentalAds[i], i));
    }

    mapPins.appendChild(fragment);
  };

  var onMapInMouseDown = function (evt) {
    window.setActivePage();
    window.setAddress(evt);
  };

  mapPinMain.addEventListener('mousedown', onMapInMouseDown);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.setActivePage();
      window.setAddress(evt);
    }
  });
})();
