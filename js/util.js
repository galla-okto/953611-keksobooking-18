'use strict';

(function () {
  var userDialogAdForm = document.querySelector('.ad-form');
  var userDialogRooms = document.querySelector('fieldset.ad-form__element select[name=rooms]');
  var userDialogCapacity = document.querySelector('fieldset.ad-form__element select[name=capacity]');
  var userDialogType = document.querySelector('fieldset.ad-form__element select[name=type]');
  var userDialogPrice = document.querySelector('fieldset.ad-form__element input[name=price]');
  var userDialogTimeIn = document.querySelector('fieldset.ad-form__element select[name=timein]');
  var userDialogTimeOut = document.querySelector('fieldset.ad-form__element select[name=timeout]');
  var userDialogAddress = document.querySelector('fieldset.ad-form__element input[name=address]');
  var userDialogMap = document.querySelector('.map');
  var similarListElement = userDialogMap.querySelector('.map__pins');
  var mapPinMain = similarListElement.querySelector('.map__pin--main');
  var similarMapInTemplate = document.querySelector('#pin').content.querySelector('button');
  var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardElement = similarMapCardTemplate.cloneNode(true);
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var Type = {
    BUNGALO: 'Bungalo',
    HOUSE: 'House',
    PALACE: 'Palace',
    FLAT: 'Flat'
  };
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var RoomGuestsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var NO_GUESTS_HOUSE = '100';
  var isActive = false;

  window.util = {
    userDialogAdForm: userDialogAdForm,
    userDialogRooms: userDialogRooms,
    userDialogCapacity: userDialogCapacity,
    userDialogType: userDialogType,
    userDialogPrice: userDialogPrice,
    userDialogTimeIn: userDialogTimeIn,
    userDialogTimeOut: userDialogTimeOut,
    userDialogAddress: userDialogAddress,
    userDialogMap: userDialogMap,
    similarListElement: similarListElement,
    mapPinMain: mapPinMain,
    similarMapInTemplate: similarMapInTemplate,
    similarMapCardTemplate: similarMapCardTemplate,
    mapCardElement: mapCardElement,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    Type: Type,
    MinPrice: MinPrice,
    RoomGuestsMap: RoomGuestsMap,
    NO_GUESTS_HOUSE: NO_GUESTS_HOUSE,
    isActive: isActive,
    getRandom: function (max, including, min) {
      return Math.round(Math.random() * (max - min - (including ? 1 : 0))) + min;
    }
  };
})();
