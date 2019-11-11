'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var NUMBER_MAP_PINS = 5;
  var ANY = 'any';
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
  var TypePriceMap = {
    low: ['low', 0, 10000],
    middle: ['middle', 10001, 50000],
    high: ['high', 50001, 999999]
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
    TypePriceMap: TypePriceMap,
    getRandom: function (max, min, including) {
      return Math.round(Math.random() * (max - (min ? min : 0) - (including ? 1 : 0))) + (min ? min : 0);
    }
  };
})();
