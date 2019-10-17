'use strict';

(function () {
  var getCoordinates = function (pin) {
    return 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  };

  window.renderMapIn = function (pin) {
    var rentalAdsElement = window.util.similarMapInTemplate.cloneNode(true);

    var imgAds = rentalAdsElement.querySelector('img');

    rentalAdsElement.style = getCoordinates(pin);
    imgAds.src = pin.author.avatar;
    imgAds.alt = pin.offer.title;

    return rentalAdsElement;
  };
})();
