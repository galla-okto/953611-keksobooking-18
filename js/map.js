'use strict';

(function () {
  window.showRentalAds = function () {
    var fragment = document.createDocumentFragment();

    window.rentalAds.forEach(function (element) {
      fragment.appendChild(window.renderMapIn(element));
    });

    window.util.similarListElement.appendChild(fragment);
  };

  var onMapInMouseDown = function (evt) {
    window.setActivePage();
    window.setAddress(evt);
  };

  window.util.mapPinMain.addEventListener('mousedown', onMapInMouseDown);

  window.util.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.setActivePage();
      window.setAddress(evt);
    }
  });
})();
