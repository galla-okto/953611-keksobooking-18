'use strict';

(function () {
  var isActive = false;
  var userDialogAdForm = document.querySelector('.ad-form');
  var userDialogMap = document.querySelector('.map');
  var userDialogCapacity = document.querySelector('fieldset.ad-form__element select[name=capacity]');
  var userDialogRooms = document.querySelector('fieldset.ad-form__element select[name=rooms]');
  var userDialogType = document.querySelector('fieldset.ad-form__element select[name=type]');
  var userDialogTimeIn = document.querySelector('fieldset.ad-form__element select[name=timein]');
  var userDialogTimeOut = document.querySelector('fieldset.ad-form__element select[name=timeout]');

  var setHadlerOnPageElements = function () {
    userDialogCapacity.addEventListener('change', window.onRoomsGuestsChange);
    userDialogRooms.addEventListener('change', window.onRoomsGuestsChange);
    userDialogType.addEventListener('change', window.onTypeMinPriceChange);
    userDialogTimeIn.addEventListener('change', window.onTimeInTimeOutChange);
    userDialogTimeOut.addEventListener('change', window.onTimeOutTimeInChange);
  };

  var changeDiasbledOnPageElements = function (show) {
    if (show) {
      userDialogMap.classList.remove('map--faded');
      userDialogAdForm.classList.remove('ad-form--disabled');

      var adFormElements = userDialogAdForm.querySelectorAll('.ad-form__element');
      adFormElements.forEach(function (element) {
        element.removeAttribute('disabled', '');
      });
    } else {
      userDialogMap.classList.add('map--faded');
      userDialogAdForm.classList.add('ad-form--disabled');

      var adFormElements = userDialogAdForm.querySelectorAll('.ad-form__element');
      adFormElements.forEach(function (element) {
        element.setAttribute('disabled', '');
      });
    }
  };

  window.setActivePage = function () {
    if (isActive) {
      return;
    }

    isActive = true;

    changeDiasbledOnPageElements(true);

    window.showRentalAds();

    setHadlerOnPageElements();
  };

  var setInActivePage = function () {
    changeDiasbledOnPageElements(false);
  };

  setInActivePage();

})();
