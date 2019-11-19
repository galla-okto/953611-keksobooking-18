'use strict';

(function () {
  var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardElement = similarMapCardTemplate.cloneNode(true);
  var userDialogMap = document.querySelector('.map');
  var mapPins = userDialogMap.querySelector('.map__pins');

  var getTypeHouse = function (typeHouse) {
    return window.util.Type[typeHouse.toUpperCase()];
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

  var checkForEmpty = function (stringForCheck, element) {
    if (stringForCheck !== '') {
      element.classList.remove('visually-hidden');

      element.textContent = stringForCheck;
    } else {

      element.classList.add('visually-hidden');
    }
  };

  var fillMapCardSimpleText = function (author, offer) {
    var title = mapCardElement.querySelector('.popup__title');
    checkForEmpty(offer.title, title);

    var address = mapCardElement.querySelector('.popup__text--address');
    checkForEmpty(offer.address, address);

    var price = mapCardElement.querySelector('.popup__text--price');
    checkForEmpty(offer.price, price);

    mapCardElement.querySelector('.popup__type').textContent = getTypeHouse(offer.type);

    var rooms = mapCardElement.querySelector('.popup__text--capacity');
    if (offer.rooms !== 0) {
      rooms.classList.remove('visually-hidden');

      rooms.textContent = getRoomsAndGuests(offer.rooms, offer.guests);
    } else {

      rooms.classList.add('visually-hidden');
    }

    var time = mapCardElement.querySelector('.popup__text--time');
    if (offer.checkin !== '0:00') {
      time.classList.remove('visually-hidden');

      time.textContent = getCheckInAndOut(offer.checkin, offer.checkout);
    } else {

      time.classList.add('visually-hidden');
    }

    mapCardElement.querySelector('.popup__description').textContent = getDescription(offer.description);

    mapCardElement.querySelector('.popup__avatar').src = author.avatar;
  };

  var fillMapCardFeatures = function (offer) {
    var mapCardElementTemp = similarMapCardTemplate.cloneNode(true);
    var featureList = mapCardElement.querySelector('.popup__features');
    var feature = null;

    featureList.textContent = '';

    if (offer.features.length === 0) {

      featureList.classList.add('visually-hidden');
    } else {

      featureList.classList.remove('visually-hidden');

      offer.features.forEach(function (element) {
        feature = mapCardElementTemp.querySelector('.popup__feature--' + element);

        featureList.appendChild(feature);
      });
    }
  };

  var fillMapCardPhotos = function (offer) {
    var photos = mapCardElement.querySelector('.popup__photos');
    var photo = '';

    photos.textContent = '';

    if (offer.photos.length === 0) {

      photos.classList.add('visually-hidden');
    } else {

      photos.classList.remove('visually-hidden');

      offer.photos.forEach(function (element) {
        var mapCardElementTemp = similarMapCardTemplate.cloneNode(true);
        photo = mapCardElementTemp.querySelector('.popup__photo');
        photo.src = element;

        photos.appendChild(photo);
      });
    }
  };

  window.fillCard = function (evt) {
    var currentOffer = window.data.rentalAds[evt.currentTarget.dataIndex].offer;
    var currentAuthor = window.data.rentalAds[evt.currentTarget.dataIndex].author;

    if (currentOffer !== undefined) {
      fillMapCardSimpleText(currentAuthor, currentOffer);

      fillMapCardFeatures(currentOffer);

      fillMapCardPhotos(currentOffer);

      mapPins.insertAdjacentElement('afterend', mapCardElement);

      evt.target.classList.add('map__pin--active');

      openCard();
    }
  };

  var openCard = function () {
    mapCardElement.classList.remove('hidden');

    var popupClose = mapCardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupCloseClick);

    document.addEventListener('keydown', onPopupEscPress);
  };

  window.closePopup = function () {
    mapCardElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.closePopup();
    }
  };

  var onPopupCloseClick = function () {
    window.closePopup();
  };

})();
