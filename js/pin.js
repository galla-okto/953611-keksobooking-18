'use strict';

(function () {
  var similarMapInTemplate = document.querySelector('#pin').content.querySelector('button');

  var getCoordinates = function (pin) {
    return 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  };

  window.renderMapIn = function (pin, index) {
    var rentalAdsElement = similarMapInTemplate.cloneNode(true);

    var imgAds = rentalAdsElement.querySelector('img');

    rentalAdsElement.data_index = index;
    rentalAdsElement.style = getCoordinates(pin);
    imgAds.src = pin.author.avatar;
    imgAds.alt = pin.offer.title;

    rentalAdsElement.addEventListener('click', window.fillCard);

    return rentalAdsElement;
  };
})();
