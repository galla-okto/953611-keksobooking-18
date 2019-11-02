'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var RESPONSE_TYPE = 'json';
  var RESPONSE_TIME = 10000;

  window.getErrorMessageStatus = function (xhr) {
    return 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
  };

  var getErrorMessageTimeout = function (xhr) {
    return 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(getErrorMessageStatus(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(getErrorMessageTimeout(xhr));
    });

    xhr.timeout = RESPONSE_TIME;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
