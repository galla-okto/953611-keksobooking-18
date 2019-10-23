'use strict';

(function () {
  var userDialogMap = document.querySelector('.map');
  var mapPins = userDialogMap.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  window.mapPinMain = mapPinMain;

  window.showRentalAds = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.rentalAds.length; i++) {
      fragment.appendChild(window.renderMapIn(window.rentalAds[i], i));
    }

    mapPins.appendChild(fragment);
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
