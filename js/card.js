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

  var fillMapCardSimpleText = function (author, offer) {
    mapCardElement.querySelector('.popup__title').textContent = offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    mapCardElement.querySelector('.popup__text--price').innerHTML = offer.price + '&#8381/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getTypeHouse(offer.type);

    mapCardElement.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(offer.rooms, offer.guests);
    mapCardElement.querySelector('.popup__text--time').textContent = getCheckInAndOut(offer.checkin, offer.checkout);
    mapCardElement.querySelector('.popup__description').textContent = getDescription(offer.description);

    mapCardElement.querySelector('.popup__avatar').src = author.avatar;
  };

  var fillMapCardFeatures = function (offer) {
    var mapCardElement2 = similarMapCardTemplate.cloneNode(true);
    var featureList = mapCardElement.querySelector('.popup__features');
    var feature = null;

    featureList.innerHTML = '';

    offer.features.forEach(function (element) {
      feature = mapCardElement2.querySelector('.popup__feature--' + element);

      featureList.appendChild(feature);
    });
  };

  var fillMapCardPhotos = function (offer) {
    var photos = mapCardElement.querySelector('.popup__photos');
    var photo = mapCardElement.querySelector('.popup__photo');

    offer.photos.forEach(function (element) {
      photo.src = element;
      photos.appendChild(photo);
    });
  };

  window.fillCard = function (evt) {
    var currentOffer = window.rentalAds[evt.currentTarget.dataIndex].offer;
    var currentAuthor = window.rentalAds[evt.currentTarget.dataIndex].author;

    if (currentOffer !== undefined) {
      fillMapCardSimpleText(currentAuthor, currentOffer);

      fillMapCardFeatures(currentOffer);

      fillMapCardPhotos(currentOffer);

      mapPins.insertAdjacentElement('afterend', mapCardElement);

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
    mapCardElement.classList.add('hidden');
  };

})();
