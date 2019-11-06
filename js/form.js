'use strict';

(function () {
  var TEXT_NO_GUESTS_HOUSE = 'Допустимое значение - не для гостей';
  var formAdForm = document.querySelector('.ad-form');
  var userDialogRooms = document.querySelector('fieldset.ad-form__element select[name=rooms]');
  var userDialogCapacity = document.querySelector('fieldset.ad-form__element select[name=capacity]');
  var userDialogType = document.querySelector('fieldset.ad-form__element select[name=type]');
  var userDialogPrice = document.querySelector('fieldset.ad-form__element input[name=price]');
  var userDialogTimeIn = document.querySelector('fieldset.ad-form__element select[name=timein]');
  var userDialogTimeOut = document.querySelector('fieldset.ad-form__element select[name=timeout]');
  var userDialogAddress = document.querySelector('fieldset.ad-form__element input[name=address]');
  var filterDialogType = document.querySelector('.map__filters select[name=housing-type]');

  var textGuestsHouse = function (roomNumber) {
    return 'Допустимое количество гостей - не более ' + Math.max.apply(Math, window.util.RoomGuestsMap[roomNumber.value]) + ', но больше 0';
  };

  window.onRoomsGuestsChange = function () {
    var roomNumber = userDialogRooms.options[userDialogRooms.selectedIndex];
    var capacity = userDialogCapacity.options[userDialogCapacity.selectedIndex];

    var isCapacityEnough = window.util.RoomGuestsMap[roomNumber.value].some(function (elem) {
      return elem === Number(capacity.value);
    });
    var message = '';

    if (isCapacityEnough === false && roomNumber.value === window.util.NO_GUESTS_HOUSE) {
      message = TEXT_NO_GUESTS_HOUSE;
    } else if (isCapacityEnough === false) {
      message = textGuestsHouse(roomNumber);
    }
    userDialogCapacity.setCustomValidity(message);
  };

  window.onTypeMinPriceChange = function () {
    var type = userDialogType.options[userDialogType.selectedIndex];
    userDialogPrice.placeholder = window.util.MinPrice[type.value.toUpperCase()];
    userDialogPrice.min = window.util.MinPrice[type.value.toUpperCase()];
  };

  window.onTimeInTimeOutChange = function () {
    userDialogTimeOut.selectedIndex = userDialogTimeIn.selectedIndex;
  };

  window.onTimeOutTimeInChange = function () {
    userDialogTimeIn.selectedIndex = userDialogTimeOut.selectedIndex;
  };

  window.onFilterDialogTypeChange = function () {
    var housingType = filterDialogType.value;

    var sameTypeRentalAds = window.rentalAds.filter(function (it) {
      return it.offer.type === housingType;
    });

    window.deleteRentalAds();
    window.showRentalAds(sameTypeRentalAds.slice(0, window.util.NUMBER_MAP_PINS));
  };

  var setAddressInitial = function () {
    userDialogAddress.value = window.const.MAP_WIDTH / 2 + ' ' + window.const.MAP_HEIGHT / 2;
  };

  window.setAddress = function () {
    var y = window.mapPinMain.offsetTop;
    var x = window.mapPinMain.offsetLeft;
    userDialogAddress.value = window.getMapinX(x + pageXOffset) + ' ' + window.getMapinY(y);
  };

  var setInputToNull = function () {
    formAdForm.reset();
  };

  var setPageInitial = function () {
    setInputToNull();
    window.changeDiasbledOnPageElements(false);
    window.deleteRentalAds();
    window.closePopup();
    window.setMapPinMainInitialCoords();
    setAddressInitial();
  };

  var onSubmitSuccess = function () {
    setPageInitial();
    window.isActive = false;
    formAdForm.classList.add('ad-form--disabled');
    window.onSuccess();
  };

  var onSubmitError = function (responseMessage) {
    setPageInitial();
    window.isActive = false;
    formAdForm.classList.add('ad-form--disabled');
    window.onError(responseMessage);
  };

  var onSubmitClick = function (evt) {
    window.upload(new FormData(formAdForm), onSubmitSuccess, onSubmitError);
    evt.preventDefault();
  };

  setAddressInitial();

  formAdForm.addEventListener('submit', onSubmitClick);
})();
