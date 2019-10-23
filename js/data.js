'use strict';

(function () {
  var RENTAL_ADS_QUANTITY = 8;
  var MAPIN_WIDTH = 50;
  var MAPIN_HEIGHT = 70;
  var NUMBER_MAX = 9;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 750;
  var PRICE_MAX = 2000;
  var ROOMS_MAX = 5;
  var GUESTS_MAX = 8;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['in the city center, near the metro, on the ground floor of the cafe',
    'near the park, there is where to walk the dogs, near a supermarket',
    'sleeping area of the city, next to a cinema, overlooking the courtyard'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PATH_AVATAR = 'img/avatars/user';

  window.MAP_WIDTH = MAP_WIDTH;
  window.MAP_HEIGHT = MAP_HEIGHT;
  window.Y_MIN = Y_MIN;
  window.Y_MAX = Y_MAX;
  window.MAPIN_HEIGHT = MAPIN_HEIGHT;
  window.MAPIN_WIDTH = MAPIN_WIDTH;

  var getAvatar = function (index) {
    return PATH_AVATAR + (index > NUMBER_MAX ? '' : '0') + index + '.png';
  };

  var getArrayFeatures = function (quantity) {
    var features = [];

    for (var i = 0; i < quantity; i++) {
      features.push(FEATURES[i]);
    }

    return features;
  };

  var getArrayPhotos = function (quantity) {
    var photos = [];

    for (var i = 0; i < quantity; i++) {
      photos.push(PHOTOS[i]);
    }

    return photos;
  };

  window.getMapinX = function (initialX) {
    return initialX + MAPIN_WIDTH / 2;
  };

  window.getMapinY = function (initialY) {
    return initialY + MAPIN_HEIGHT;
  };

  var createRentalAd = function (index) {
    return {
      'author': {
        'avatar': getAvatar(index)
      },
      'offer': {
        'title': 'Apartment Nr ' + index,
        'address': window.util.getRandom(MAP_WIDTH) + ', ' + window.util.getRandom(MAP_HEIGHT),
        'price': window.util.getRandom(PRICE_MAX),
        'type': TYPE_APARTMENTS[window.util.getRandom(TYPE_APARTMENTS.length, 0, 1)],
        'rooms': window.util.getRandom(ROOMS_MAX),
        'guests': window.util.getRandom(GUESTS_MAX),
        'checkin': CHECK_IN[window.util.getRandom(CHECK_IN.length, 0, 1)],
        'checkout': CHECK_OUT[window.util.getRandom(CHECK_OUT.length, 0, 1)],
        'features': getArrayFeatures(window.util.getRandom(FEATURES.length, 0, 1)),
        'description': DESCRIPTION[window.util.getRandom(DESCRIPTION.length, 0, 1)],
        'photos': getArrayPhotos(window.util.getRandom(PHOTOS.length, 0, 1))
      },
      'location': {
        'x': window.getMapinX(window.util.getRandom(MAP_WIDTH - MAPIN_WIDTH / 2 - 1, 1 - MAPIN_WIDTH / 2)),
        'y': window.getMapinY(window.util.getRandom(Y_MAX, Y_MIN))
      }
    };
  };

  var getRentalAds = function () {
    var rentalAds = [];

    for (var i = 1; i <= RENTAL_ADS_QUANTITY; i++) {
      rentalAds.push(createRentalAd(i));
    }

    return rentalAds;
  };

  var rentalAds = getRentalAds();

  window.rentalAds = rentalAds;

})();
