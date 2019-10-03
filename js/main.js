'use strict';

var RENTAL_ADS_QUANTITY = 8;
var TYPE_APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
/* var Type = {
  BUNGALO: 'Bungalo',
  HOUSE: 'House',
  PALACE: 'Palace',
  FLAT: 'Flat'
};*/
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['in the city center, near the metro, on the ground floor of the cafe',
  'near the park, there is where to walk the dogs, near a supermarket',
  'sleeping area of the city, next to a cinema, overlooking the courtyard'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 535;
var MAPIN_WIDTH = 50;
var MAPIN_HEIGHT = 70;
var SKY_WIDTH = 170;
var PRICE_MAX = 2000;
var ROOMS_MAX = 5;
var GUESTS_MAX = 8;
var NUMBER_MAX = 9;
var ENTER_KEYCODE = 13;

var getRandom = function (max, including, min) {
  return Math.round(Math.random() * (max - min - (including ? 1 : 0))) + min;
};

var userDialogAdForm = document.querySelector('.ad-form');
var userDialogAddress = document.querySelector('fieldset.ad-form__element input[name=address]');
var userDialogRooms = document.querySelector('fieldset.ad-form__element select[name=rooms]');
var userDialogCapacity = document.querySelector('fieldset.ad-form__element select[name=capacity]');

var userDialogMap = document.querySelector('.map');

var similarListElement = userDialogMap.querySelector('.map__pins');
var mapPinMain = similarListElement.querySelector('.map__pin--main');
// var mapFilters = similarListElement.querySelector('.map__filters');

// var similarMapInTemplate = document.querySelector('#pin').content.querySelector('button');
// var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var mapCardElement = similarMapCardTemplate.cloneNode(true);

var getAvatar = function (index) {
  return 'img/avatars/user' + (index > NUMBER_MAX ? '' : '0') + index + '.png';
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

var getMapinX = function (initialX) {
  return initialX - MAPIN_WIDTH / 2;
};

var getMapinY = function (initialY) {
  return initialY - MAPIN_HEIGHT;
};

var createRentalAd = function (index) {
  return {
    'author': {
      'avatar': getAvatar(index)
    },
    'offer': {
      'title': 'Apartment Nr ' + index,
      'address': getRandom(MAP_WIDTH, 0, 0) + ', ' + getRandom(MAP_HEIGHT, 0, 0),
      'price': getRandom(PRICE_MAX, 0, 0),
      'type': TYPE_APARTMENTS[getRandom(TYPE_APARTMENTS.length, 1, 0)],
      'rooms': getRandom(ROOMS_MAX, 0, 0),
      'guests': getRandom(GUESTS_MAX, 0, 0),
      'checkin': CHECK_IN[getRandom(CHECK_IN.length, 1, 0)],
      'checkout': CHECK_OUT[getRandom(CHECK_OUT.length, 1, 0)],
      'features': getArrayFeatures(getRandom(FEATURES.length, 1, 0)),
      'description': DESCRIPTION[getRandom(DESCRIPTION.length, 1, 0)],
      'photos': getArrayPhotos(getRandom(PHOTOS.length, 1, 0))
    },
    'location': {
      'x': getMapinX(getRandom(MAP_WIDTH, 0, 0)),
      'y': getMapinY(getRandom(MAP_HEIGHT, 0, 0)) + SKY_WIDTH
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

/* var getCoordinates = function (pin) {
  return 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
};

var renderMapIn = function (pin) {
  var rentalAdsElement = similarMapInTemplate.cloneNode(true);

  var imgAds = rentalAdsElement.querySelector('img');

  rentalAdsElement.style = getCoordinates(pin);
  imgAds.src = pin.author.avatar;
  imgAds.alt = pin.offer.title;

  return rentalAdsElement;
};

 var showRentalAds = function () {
  var fragment = document.createDocumentFragment();

  rentalAds.forEach(function (element) {
    fragment.appendChild(renderMapIn(element));
  });

  similarListElement.appendChild(fragment);
};

var getTypeHouse = function (typeHouse) {
  return Type[typeHouse.toUpperCase()];
};

var getRoomsAndGuests = function (rooms, guests) {
  return rooms + ' комнаты для ' + guests + ' гостей';
};

var getCheckInAndOut = function (checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до ' + checkout;
};

var getDescription = function (description) {
  return description;
};

var fillMapCardSimpleText = function () {
  mapCardElement.querySelector('.popup__title').textContent = offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
  mapCardElement.querySelector('.popup__text--price').innerHTML = offer.price + '&#8381/ночь';
  mapCardElement.querySelector('.popup__type').textContent = getTypeHouse(offer.type);

  mapCardElement.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(offer.rooms, offer.guests);
  mapCardElement.querySelector('.popup__text--time').textContent = getCheckInAndOut(offer.checkin, offer.checkout);
  mapCardElement.querySelector('.popup__description').textContent = getDescription(offer.description);

  mapCardElement.querySelector('.popup__avatar').src = rentalAds[0].author.avatar;
};

var fillMapCardFeatures = function () {
  var feature = mapCardElement.querySelector('.popup__features');
  var features = mapCardElement.querySelectorAll('.popup__feature');
  var children = feature.children;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var str = child.className.substr(child.className.lastIndexOf('-') + 1);

    if (offer.features.indexOf(str) === -1) {
      feature.removeChild(features[i]);
    }
  }
};

var fillMapCardPhotos = function () {
  var photos = mapCardElement.querySelector('.popup__photos');
  var photo = mapCardElement.querySelector('.popup__photo');

  offer.photos.forEach(function (element) {
    photo.src = element;
    photos.appendChild(photo);
  });
};*/

var setInActivePage = function () {
  var adFormElements = userDialogAdForm.querySelectorAll('.ad-form__element');

  userDialogMap.classList.add('map--faded');

  userDialogAdForm.classList.add('ad-form--disabled');
  // mapFilters.classList.add('map__filters--disabled');

  adFormElements.forEach(function (element) {
    element.setAttribute('disabled', '');
  });
};

var setActivePage = function () {
  userDialogMap.classList.remove('map--faded');

  userDialogAdForm.classList.remove('ad-form--disabled');
  // mapFilters.classList.remove('map__filters--disabled');

  var adFormElements = userDialogAdForm.querySelectorAll('.ad-form__element');

  adFormElements.forEach(function (element) {
    element.removeAttribute('disabled', '');
  });
};

var setAddress = function (evt) {
  userDialogAddress.value = getMapinX(evt.clientX) + ' ' + getMapinY(evt.clientY);
};

var setAddressInitial = function (X, Y) {
  userDialogAddress.value = getMapinX(X) + ' ' + getMapinY(Y);
};

var onMapInMouseDown = function (evt) {
  setActivePage();
  setAddress(evt);
};

// var rentalAds = getRentalAds();
// var offer = rentalAds[0].offer;

// showRentalAds();

// fillMapCardSimpleText();

// fillMapCardFeatures();

// fillMapCardPhotos();

// similarListElement.insertAdjacentElement('afterend', mapCardElement);

setInActivePage();

setAddressInitial(MAP_WIDTH / 2, MAP_HEIGHT / 2);

mapPinMain.addEventListener('mousedown', onMapInMouseDown);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setActivePage();
    setAddress(evt);
  }
});

userDialogCapacity.addEventListener('invalid', function () {
  if ((userDialogRooms.options[userDialogRooms.selectedIndex].value === '1')
  && (userDialogCapacity.options[userDialogCapacity.selectedIndex].value !== '1')) {
    userDialogCapacity.setCustomValidity('1 комната для 1 гостя');
  } else if ((userDialogRooms.options[userDialogRooms.selectedIndex].value === '2')
  && ((userDialogCapacity.options[userDialogCapacity.selectedIndex].value !== '1')
  || (userDialogCapacity.options[userDialogCapacity.selectedIndex].value !== '2'))) {
    userDialogCapacity.setCustomValidity('2 комнаты для 1 или 2 гостей');
  } else {
    userDialogCapacity.setCustomValidity('');
  }
});
