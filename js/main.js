'use strict';

var RENTAL_ADS_QUANTITY = 8;
var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['in the city center, near the metro, on the ground floor of the cafe',
  'near the park, there is where to walk the dogs, near a supermarket',
  'sleeping area of the city, next to a cinema, overlooking the courtyard'];

var getRandom = function (max) {
  return Math.round(Math.random() * max);
};

var similarMapInTemplate = document.querySelector('#pin');

var rentalAds = [];

var getRentalAds = function () {
  for (var i = 0; i < RENTAL_ADS_QUANTITY; i++) {
    rentalAds.push({
      'author': {
        'avatar': 'img/avatars/user' + (i > 9 ? '' : '0') + i + '.png'
      },
      'offer': {
        'title': 'Apartment Nr ' + i,
        'address': getRandom(900) + ', ' + getRandom(600),
        'price': getRandom(2000),
        'type': TYPE_APARTMENTS[getRandom(TYPE_APARTMENTS.length - 1)],
        'rooms': getRandom(5),
        'guests': getRandom(8),
        'chekin': CHECK_IN[getRandom(CHECK_IN.length - 1)],
        'chekout': CHECK_OUT[getRandom(CHECK_OUT.length - 1)],
        'features': FEATURES[getRandom(FEATURES.length - 1)],
        'description': DESCRIPTION[getRandom(DESCRIPTION.length - 1)],
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      'location': {
        'x': getRandom(900),
        'y': getRandom(500) + 130
      }
    });
  }
};

var renderMapIn = function (rentalAds) {
  var rentalAdsElement = similarMapInTemplate.cloneNode(true);

  rentalAdsElement.querySelector('img').style.fill = 'left: ' + rentalAds.location.x + 'px; top: ' + rentalAds.location.y;
  rentalAdsElement.querySelector('img').src = rentalAds.author.avatar;
  rentalAdsElement.querySelector('img').alt = rentalAds.offer.title;

  return rentalAdsElement;
};

var userDialog = document.querySelector('.map');

userDialog.classList.remove('map--faded');

getRentalAds();

var fragment = document.createDocumentFragment();

rentalAds.forEach(function (element) {
  fragment.appendChild(renderWizard(element));
};
