'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NUMBER_MAP_PINS = 5;
  var ANY = 'any';
  var Type = {
    ANY: 'any',
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
  var TypePriceMap = {
    ANY: {min: 'any'},
    LOW: {min: 0, max: 10000},
    MIDDLE: {min: 10001, max: 50000},
    HIGH: {min: 50001, max: 9999999}
  };
  var NO_GUESTS_HOUSE = '100';
  var STATUS_SUCCESS = 200;

  window.util = {
    ANY: ANY,
    NUMBER_MAP_PINS: NUMBER_MAP_PINS,
    STATUS_SUCCESS: STATUS_SUCCESS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    Type: Type,
    MinPrice: MinPrice,
    RoomGuestsMap: RoomGuestsMap,
    NO_GUESTS_HOUSE: NO_GUESTS_HOUSE,
    TypePriceMap: TypePriceMap
  };
})();
