'use strict';

(function () {
  var userDialogMap = document.querySelector('.map');
  var mapPins = userDialogMap.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  window.showRentalAds = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.rentalAds.length; i++) {
      fragment.appendChild(window.renderMapIn(window.rentalAds[i], i));
    }

    mapPins.appendChild(fragment);
  };

  var checkCoordsY = function (coordY) {
    coordY = (coordY < window.Y_MIN) ? window.Y_MIN : coordY;
    coordY = (coordY > window.Y_MAX + window.MAPIN_HEIGHT) ? window.Y_MAX + window.MAPIN_HEIGHT : coordY;

    return coordY;
  };

  var checkCoordsX = function (coordX) {
    coordX = coordX < 0 ? 1 : coordX;
    coordX = coordX > window.MAP_WIDTH ? window.MAP_WIDTH : coordX;

    return coordX;
  };

  var onMapInMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = checkCoordsY(mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = checkCoordsX(mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      window.setAddress(upEvt);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (!dragged) {
      window.setActivePage();
      window.setAddress(evt);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapInMouseDown);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.setActivePage();
      window.setAddress(evt);
    }
  });
})();
