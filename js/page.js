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
  var filterDialogType = document.querySelector('.map__filters select[name=housing-type]');
  var filterDialogPrice = document.querySelector('.map__filters select[name=housing-price]');
  var filterDialogRooms = document.querySelector('.map__filters select[name=housing-rooms]');
  var filterDialogGuests = document.querySelector('.map__filters select[name=housing-guests]');
  var filterDialogWifi = document.querySelector('fieldset.map__features input[id=filter-wifi]');
  var filterDialogDishwasher = document.querySelector('fieldset.map__features input[id=filter-dishwasher]');
  var filterDialogParking = document.querySelector('fieldset.map__features input[id=filter-parking]');
  var filterDialogWasher = document.querySelector('fieldset.map__features input[id=filter-washer]');
  var filterDialogElevator = document.querySelector('fieldset.map__features input[id=filter-elevator]');
  var filterDialogConditioner = document.querySelector('fieldset.map__features input[id=filter-conditioner]');

  window.isActive = isActive;

  var setHadlerOnPageElements = function () {
    userDialogCapacity.addEventListener('change', window.onRoomsGuestsChange);
    userDialogRooms.addEventListener('change', window.onRoomsGuestsChange);
    userDialogType.addEventListener('change', window.onTypeMinPriceChange);
    userDialogTimeIn.addEventListener('change', window.onTimeInTimeOutChange);
    userDialogTimeOut.addEventListener('change', window.onTimeOutTimeInChange);
    filterDialogType.addEventListener('change', window.onFilterDialogTypeChange);
    filterDialogPrice.addEventListener('change', window.onFilterDialogPriceChange);
    filterDialogRooms.addEventListener('change', window.onFilterDialogRoomsChange);
    filterDialogGuests.addEventListener('change', window.onFilterDialogGuestsChange);
    filterDialogWifi.addEventListener('click', window.onFilterDialogWifiClick);
    filterDialogDishwasher.addEventListener('click', window.onFilterDialogDishwasherClick);
    filterDialogParking.addEventListener('click', window.onFilterDialogParkingClick);
    filterDialogWasher.addEventListener('click', window.onFilterDialogWasherClick);
    filterDialogElevator.addEventListener('click', window.onFilterDialogElevatorClick);
    filterDialogConditioner.addEventListener('click', window.onFilterDialogConditionerClick);
  };

  window.changeDiasbledOnPageElements = function (show) {
    var adFormElements = userDialogAdForm.querySelectorAll('.ad-form__element');

    if (show) {
      userDialogMap.classList.remove('map--faded');
      userDialogAdForm.classList.remove('ad-form--disabled');

      adFormElements.forEach(function (element) {
        element.removeAttribute('disabled', '');
      });
    } else {
      userDialogMap.classList.add('map--faded');
      userDialogAdForm.classList.add('ad-form--disabled');

      adFormElements.forEach(function (element) {
        element.setAttribute('disabled', '');
      });
    }
  };

  window.setActivePage = function () {
    if (window.isActive) {
      return;
    }

    window.isActive = true;

    window.changeDiasbledOnPageElements(true);

    window.showRentalAds(window.rentalAds.slice(0, window.util.NUMBER_MAP_PINS));

    setHadlerOnPageElements();
  };

  var setInActivePage = function () {
    window.changeDiasbledOnPageElements(false);
  };

  setInActivePage();

})();
