'use strict';

(function () {
  window.onRoomsGuestsChange = function () {
    var roomNumber = window.util.userDialogRooms.options[window.util.userDialogRooms.selectedIndex];
    var capacity = window.util.userDialogCapacity.options[window.util.userDialogCapacity.selectedIndex];

    var isCapacityEnough = window.util.RoomGuestsMap[roomNumber.value].some(function (elem) {
      return elem === Number(capacity.value);
    });
    var message = '';

    if (isCapacityEnough === false && roomNumber.value === window.util.NO_GUESTS_HOUSE) {
      message = 'Допустимое значение - не для гостей';
    } else if (isCapacityEnough === false) {
      message = 'Допустимое количество гостей - не более ' + Math.max.apply(Math, window.util.RoomGuestsMap[roomNumber.value]) + ', но больше 0';
    }
    window.util.userDialogCapacity.setCustomValidity(message);
  };

  window.onTypeMinPriceChange = function () {
    var type = window.util.userDialogType.options[window.util.userDialogType.selectedIndex];
    window.util.userDialogPrice.placeholder = window.util.MinPrice[type.value.toUpperCase()];
    window.util.userDialogPrice.min = window.util.MinPrice[type.value.toUpperCase()];
  };

  window.onTimeInTimeOutChange = function () {
    window.util.userDialogTimeOut.selectedIndex = window.util.userDialogTimeIn.selectedIndex;
  };

  window.onTimeOutTimeInChange = function () {
    window.util.userDialogTimeIn.selectedIndex = window.util.userDialogTimeOut.selectedIndex;
  };

  var setAddressInitial = function () {
    window.util.userDialogAddress.value = window.MAP_WIDTH / 2 + ' ' + window.MAP_HEIGHT / 2;
  };

  window.setAddress = function (evt) {
    var y = evt.currentTarget.getBoundingClientRect().y;
    var x = evt.currentTarget.getBoundingClientRect().x;
    window.util.userDialogAddress.value = window.getMapinX(x + pageXOffset) + ' ' + window.getMapinY(y + pageYOffset);
  };

  setAddressInitial();
})();
