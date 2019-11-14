'use strict';

(function () {
  var TEXT_NO_GUESTS_HOUSE = 'Допустимое значение - не для гостей';

  var NAME_FILE_MUFFIN_GREY = "img/muffin-grey.svg";

  var formAdForm = document.querySelector('.ad-form');

  var userDialogRooms = document.querySelector('fieldset.ad-form__element select[name=rooms]');
  var userDialogCapacity = document.querySelector('fieldset.ad-form__element select[name=capacity]');
  var userDialogType = document.querySelector('fieldset.ad-form__element select[name=type]');
  var userDialogPrice = document.querySelector('fieldset.ad-form__element input[name=price]');
  var userDialogTimeIn = document.querySelector('fieldset.ad-form__element select[name=timein]');
  var userDialogTimeOut = document.querySelector('fieldset.ad-form__element select[name=timeout]');
  var userDialogAddress = document.querySelector('fieldset.ad-form__element input[name=address]');
  var userDialogPreviewAvatar = document.querySelector('.ad-form-header__preview img');
  var userDialogPreviewHouse = document.querySelector('.ad-form__photo img');

  var filterDialogType = document.querySelector('.map__filters select[name=housing-type]');
  var filterDialogPrice = document.querySelector('.map__filters select[name=housing-price]');
  var filterDialogRooms = document.querySelector('.map__filters select[name=housing-rooms]');
  var filterDialogGuests = document.querySelector('.map__filters select[name=housing-guests]');
  var filterDialogFeatures = document.querySelectorAll('.map__checkbox');

  var textGuestsHouse = function (roomNumber) {
    return 'Допустимое количество гостей - не более '
    + Math.max.apply(Math, window.util.RoomGuestsMap[roomNumber.value]) + ', но больше 0';
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
    return element.offer.type === ((housingType === window.util.Type['ANY']) ? element.offer.type : housingType);
  };

  var getFilterPrice = function (element, housingPrice) {
    if (housingPrice === window.util.TypePriceMap['ANY'].min) {

      return element.offer.price === element.offer.price;

    } else if (housingPrice.toUpperCase() === Object.keys(window.util.TypePriceMap)[2]) {

      return ((element.offer.price >= window.util.TypePriceMap['MIDDLE'].min)
      && (element.offer.price <= window.util.TypePriceMap['MIDDLE'].max));

    } else if (housingPrice.toUpperCase() === Object.keys(window.util.TypePriceMap)[1]) {

      return ((element.offer.price >= window.util.TypePriceMap['LOW'].min)
      && (element.offer.price <= window.util.TypePriceMap['LOW'].max));

    } else if (housingPrice.toUpperCase() === Object.keys(window.util.TypePriceMap)[3]) {

      return ((element.offer.price >= window.util.TypePriceMap['HIGH'].min)
      && (element.offer.price <= window.util.TypePriceMap['HIGH'].max));

    }
    return true;
  };

  var getFilterRooms = function (element, housingRooms) {
    return element.offer.rooms === ((housingRooms === window.util.ANY) ? element.offer.rooms : Number(housingRooms));
  };

  var getFilterGuests = function (element, housingGuests) {
    return element.offer.guests === ((housingGuests === window.util.ANY) ? element.offer.guests : Number(housingGuests));
  };

  var getFeatures = function () {
    var housingFeatures = [];

    filterDialogFeatures.forEach(function (element) {
      if (element.checked) {
        housingFeatures.push(element.value);
      }
    });

    return housingFeatures;
  };

  var filterRentalAds = function () {
    var housingType = filterDialogType.value;
    var housingPrice = filterDialogPrice.value;
    var housingRooms = filterDialogRooms.value;
    var housingGuests = filterDialogGuests.value;
    var housingFeatures = getFeatures();

    var sameTypeRentalAds = window.rentalAds.filter(function (it) {
      return (getFilterType(it, housingType)) &&
        (getFilterPrice(it, housingPrice)) &&
        (getFilterRooms(it, housingRooms)) &&
        (getFilterGuests(it, housingGuests));
    });

    housingFeatures.forEach(function (key) {
      sameTypeRentalAds = sameTypeRentalAds.filter(function (it) {
        return it.offer.features.includes(key);
      });
    });

    return sameTypeRentalAds;
  };

  var showRentalAdsWithFilters = window.debounce(function () {
    var sameTypeRentalAds = filterRentalAds();

    window.deleteRentalAds();
    window.showRentalAds(sameTypeRentalAds.slice(0, window.util.NUMBER_MAP_PINS));
  });

  window.onFilterDialogTypeChange = function () {
    showRentalAdsWithFilters();
  };

  window.onFilterDialogPriceChange = function () {
    showRentalAdsWithFilters();
  };

  window.onFilterDialogRoomsChange = function () {
    showRentalAdsWithFilters();
  };

  window.onFilterDialogGuestsChange = function () {
    showRentalAdsWithFilters();
  };

  window.onFilterDialogFeaturesClick = function () {
    showRentalAdsWithFilters();
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
    userDialogPreviewAvatar.src = NAME_FILE_MUFFIN_GREY;
    userDialogPreviewHouse.src = "";
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
