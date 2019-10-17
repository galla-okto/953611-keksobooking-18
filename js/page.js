'use strict';

(function () {
  window.setActivePage = function () {
    window.util.userDialogMap.classList.remove('map--faded');

    window.util.userDialogAdForm.classList.remove('ad-form--disabled');

    var adFormElements = window.util.userDialogAdForm.querySelectorAll('.ad-form__element');

    adFormElements.forEach(function (element) {
      element.removeAttribute('disabled', '');
    });

    if (!window.util.isActive) {
      window.showRentalAds();
      window.util.isActive = true;
    }

    window.util.userDialogCapacity.addEventListener('change', window.onRoomsGuestsChange);
    window.util.userDialogRooms.addEventListener('change', window.onRoomsGuestsChange);
    window.util.userDialogType.addEventListener('change', window.onTypeMinPriceChange);
    window.util.userDialogTimeIn.addEventListener('change', window.onTimeInTimeOutChange);
    window.util.userDialogTimeOut.addEventListener('change', window.onTimeOutTimeInChange);

    var mapPinList = window.util.similarListElement.querySelectorAll('.map__pin');

    mapPinList.forEach(function (element) {
      element.addEventListener('click', window.showCard);
    });
  };

  var setInActivePage = function () {
    var adFormElements = window.util.userDialogAdForm.querySelectorAll('.ad-form__element');

    window.util.userDialogMap.classList.add('map--faded');

    window.util.userDialogAdForm.classList.add('ad-form--disabled');

    adFormElements.forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  setInActivePage();

})();
