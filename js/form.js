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
  var filterDialogPrice = document.querySelector('.map__filters select[name=housing-price]');
  var filterDialogRooms = document.querySelector('.map__filters select[name=housing-rooms]');
  var filterDialogGuests = document.querySelector('.map__filters select[name=housing-guests]');
  var filterDialogWifi = document.querySelector('fieldset.map__features input[id=filter-wifi]');
  var filterDialogDishwasher = document.querySelector('fieldset.map__features input[id=filter-dishwasher]');
  var filterDialogParking = document.querySelector('fieldset.map__features input[id=filter-parking]');
  var filterDialogWasher = document.querySelector('fieldset.map__features input[id=filter-washer]');
  var filterDialogElevator = document.querySelector('fieldset.map__features input[id=filter-elevator]');
  var filterDialogConditioner = document.querySelector('fieldset.map__features input[id=filter-conditioner]');

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

  var getFilterType = function (element, housingType) {
    return element.offer.type === ((housingType === window.util.ANY) ? element.offer.type : housingType);
  };

  var getFilterPrice = function (element, housingPrice) {
    if (housingPrice === window.util.ANY) {
      return element.offer.price === element.offer.price;
    } else if (housingPrice === window.util.TypePriceMap['middle'][0]) {
      return ((element.offer.price >= window.util.TypePriceMap['middle'][1]) && (element.offer.price <= window.util.TypePriceMap['middle'][2]));
    } else if (housingPrice === window.util.TypePriceMap['low'][0]) {
      return ((element.offer.price >= window.util.TypePriceMap['low'][1]) && (element.offer.price <= window.util.TypePriceMap['low'][2]));
    } else if (housingPrice === window.util.TypePriceMap['high'][0]) {
      return ((element.offer.price >= window.util.TypePriceMap['high'][1]) && (element.offer.price <= window.util.TypePriceMap['high'][2]));
    }
    return true;
  };

  var getFilterRooms = function (element, housingRooms) {
    return element.offer.rooms === ((housingRooms === window.util.ANY) ? element.offer.rooms : parseInt(housingRooms, 10));
  };

  var getFilterGuests = function (element, housingGuests) {
    return element.offer.guests === ((housingGuests === window.util.ANY) ? element.offer.guests : parseInt(housingGuests, 10));
  };

  var getFilterWifi = function (element, housingWifi) {
    if (housingWifi) {
      return element.offer.features.indexOf('wifi') !== -1;
    }
    return true;
  };

  var getFilterDishwasher = function (element, housingDishwasher) {
    if (housingDishwasher) {
      return element.offer.features.indexOf('dishwasher') !== -1;
    }
    return true;
  };

  var getFilterParking = function (element, housingParking) {
    if (housingParking) {
      return element.offer.features.indexOf('parking') !== -1;
    }
    return true;
  };

  var getFilterWasher = function (element, housingWasher) {
    if (housingWasher) {
      return element.offer.features.indexOf('washer') !== -1;
    }
    return true;
  };

  var getFilterElevator = function (element, housingElevator) {
    if (housingElevator) {
      return element.offer.features.indexOf('elevator') !== -1;
    }
    return true;
  };

  var getFilterConditioner = function (element, housingConditioner) {
    if (housingConditioner) {
      return element.offer.features.indexOf('conditioner') !== -1;
    }
    return true;
  };

  var filterRentalAds = function () {
    var housingType = filterDialogType.value;
    var housingPrice = filterDialogPrice.value;
    var housingRooms = filterDialogRooms.value;
    var housingGuests = filterDialogGuests.value;
    var housingWifi = filterDialogWifi.checked;
    var housingDishwasher = filterDialogDishwasher.checked;
    var housingParking = filterDialogParking.checked;
    var housingWasher = filterDialogWasher.checked;
    var housingElevator = filterDialogElevator.checked;
    var housingConditioner = filterDialogConditioner.checked;

    var sameTypeRentalAds = window.rentalAds.filter(function (it) {
      return (getFilterType(it, housingType)) &&
        (getFilterPrice(it, housingPrice)) &&
        (getFilterRooms(it, housingRooms)) &&
        (getFilterGuests(it, housingGuests)) &&
        (getFilterWifi(it, housingWifi)) &&
        (getFilterDishwasher(it, housingDishwasher)) &&
        (getFilterParking(it, housingParking)) &&
        (getFilterWasher(it, housingWasher)) &&
        (getFilterElevator(it, housingElevator)) &&
        (getFilterConditioner(it, housingConditioner));
    });

    return sameTypeRentalAds;
  };

  var showRentalAdsWithFilters = function () {
    var sameTypeRentalAds = filterRentalAds();

    window.deleteRentalAds();
    window.showRentalAds(sameTypeRentalAds.slice(0, window.util.NUMBER_MAP_PINS));
  };

  window.onFilterDialogTypeChange = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogPriceChange = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogRoomsChange = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogGuestsChange = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogWifiClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogDishwasherClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogParkingClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogWasherClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogElevatorClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

  window.onFilterDialogConditionerClick = window.debounce(function () {
    showRentalAdsWithFilters();
  });

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
