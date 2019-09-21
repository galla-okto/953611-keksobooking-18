'use strict';

var RENTAL_ADS_QUANTITY = 8;
var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['in the city center, near the metro, on the ground floor of the cafe',
  'near the park, there is where to walk the dogs, near a supermarket',
  'sleeping area of the city, next to a cinema, overlooking the courtyard'];
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 535;
var MAPIN_WIDTH = 50;
var MAPIN_HEIGHT = 70;
var SKY_WIDTH = 170;
var PRICE_MAX = 2000;
var ROOMS_MAX = 5;
var GUESTS_MAX = 8;

var getRandom = function (max) {
  return Math.round(Math.random() * max);
};

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

var similarListElement = userDialog.querySelector('.map__pins');

var similarMapInTemplate = document.querySelector('#pin').content.querySelector('button');

var rentalAds = [];

var getRentalAds = function () {
  for (var i = 0; i < RENTAL_ADS_QUANTITY; i++) {
    rentalAds.push({
      'author': {
        'avatar': 'img/avatars/user' + (i + 1 > 9 ? '' : '0') + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Apartment Nr ' + i + 1,
        'address': getRandom(MAP_WIDTH) + ', ' + getRandom(MAP_HEIGHT),
        'price': getRandom(PRICE_MAX),
        'type': TYPE_APARTMENTS[getRandom(TYPE_APARTMENTS.length - 1)],
        'rooms': getRandom(ROOMS_MAX),
        'guests': getRandom(GUESTS_MAX),
        'chekin': CHECK_IN[getRandom(CHECK_IN.length - 1)],
        'chekout': CHECK_OUT[getRandom(CHECK_OUT.length - 1)],
        'features': FEATURES[getRandom(FEATURES.length - 1)],
        'description': DESCRIPTION[getRandom(DESCRIPTION.length - 1)],
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      'location': {
        'x': getRandom(MAP_WIDTH) - MAPIN_WIDTH / 2,
        'y': getRandom(MAP_HEIGHT) - MAPIN_HEIGHT + SKY_WIDTH
      }
    });
  }
};

var renderMapIn = function (pin) {
  var rentalAdsElement = similarMapInTemplate.cloneNode(true);

  rentalAdsElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  rentalAdsElement.querySelector('img').src = pin.author.avatar;
  rentalAdsElement.querySelector('img').alt = pin.offer.title;

  return rentalAdsElement;
};

getRentalAds();

var fragment = document.createDocumentFragment();

rentalAds.forEach(function (element) {
  fragment.appendChild(renderMapIn(element));
});

similarListElement.appendChild(fragment);
