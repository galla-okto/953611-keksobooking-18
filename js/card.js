'use strict';

(function () {
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
    window.util.mapCardElement.querySelector('.popup__title').textContent = offer.title;
    window.util.mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
    window.util.mapCardElement.querySelector('.popup__text--price').innerHTML = offer.price + '&#8381/ночь';
    window.util.mapCardElement.querySelector('.popup__type').textContent = getTypeHouse(offer.type);

    window.util.mapCardElement.querySelector('.popup__text--capacity').textContent = getRoomsAndGuests(offer.rooms, offer.guests);
    window.util.mapCardElement.querySelector('.popup__text--time').textContent = getCheckInAndOut(offer.checkin, offer.checkout);
    window.util.mapCardElement.querySelector('.popup__description').textContent = getDescription(offer.description);

    window.util.mapCardElement.querySelector('.popup__avatar').src = author.avatar;
  };

  var fillMapCardFeatures = function (offer) {
    var feature = window.util.mapCardElement.querySelector('.popup__features');
    var features = window.util.mapCardElement.querySelectorAll('.popup__feature');
    var children = feature.children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var str = child.className.substr(child.className.lastIndexOf('-') + 1);

      if (offer.features.indexOf(str) === -1) {
        feature.removeChild(features[i]);
      }
    }
  };

  var fillMapCardPhotos = function (offer) {
    var photos = window.util.mapCardElement.querySelector('.popup__photos');
    var photo = window.util.mapCardElement.querySelector('.popup__photo');

    offer.photos.forEach(function (element) {
      photo.src = element;
      photos.appendChild(photo);
    });
  };

  window.showCard = function (evt) {
    var currentOffer;
    var currentAuthor;

    window.rentalAds.forEach(function (element) {
      if (element.location.x === evt.currentTarget.offsetLeft &&
        element.location.y === evt.currentTarget.offsetTop) {
        currentOffer = element.offer;
        currentAuthor = element.author;
      }
    });

    if (currentOffer !== undefined) {
      fillMapCardSimpleText(currentAuthor, currentOffer);

      fillMapCardFeatures(currentOffer);

      fillMapCardPhotos(currentOffer);

      window.util.similarListElement.insertAdjacentElement('afterend', window.util.mapCardElement);

      openCard();
    }
  };

  var openCard = function () {
    window.util.mapCardElement.classList.remove('hidden');

    var popupClose = window.util.userDialogMap.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupCloseClick);

    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    window.util.mapCardElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupCloseClick = function () {
    window.util.mapCardElement.classList.add('hidden');
  };

})();
