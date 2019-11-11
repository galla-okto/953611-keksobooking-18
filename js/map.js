'use strict';

(function () {
  var userDialogMap = document.querySelector('.map');
  var mapPins = userDialogMap.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  window.mapPinMain = mapPinMain;

  window.showRentalAds = function (arrRentalAds) {
    var fragment = document.createDocumentFragment();

    arrRentalAds.forEach(function (element) {
      fragment.appendChild(window.renderMapIn(element, window.rentalAds.indexOf(element)));
    });

    mapPins.appendChild(fragment);
  };

  window.deleteRentalAds = function () {
    while ((mapPins.lastChild) && (mapPins.children.length > 2)) {
      mapPins.removeChild(mapPins.lastChild);
    }
  };

  var checkCoordsY = function (coordY) {
    if (coordY < window.const.Y_MIN) {
      coordY = window.const.Y_MIN;
    } else if (coordY > window.const.Y_MAX) {
      coordY = window.const.Y_MAX;
    }

    return coordY;
  };

  var checkCoordsX = function (coordX) {
    if (coordX < -window.const.MAPIN_WIDTH / 2 + 1) {
      coordX = -window.const.MAPIN_WIDTH / 2 + 1;
    } else if (coordX > window.const.MAP_WIDTH - window.const.MAPIN_WIDTH / 2 - 1) {
      coordX = window.const.MAP_WIDTH - window.const.MAPIN_WIDTH / 2 - 1;
    }

    return coordX;
  };

  window.setMapPinMainInitialCoords = function () {
    mapPinMain.style.top = window.const.MAP_HEIGHT / 2 + 'px';
    mapPinMain.style.left = window.const.MAP_WIDTH / 2 + 'px';
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

      window.setAddress(moveEvt);
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
