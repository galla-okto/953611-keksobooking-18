'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var RESPONSE_TIME = 10000;

  window.getErrorMessageStatus = function (xhr) {
    return 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
  };

  window.getErrorMessageTimeout = function (xhr) {
    return 'Запрос не успел выполниться за ' + xhr.timeout + 'мс';
  };

  window.load = function (onSuccess, onError) {
    var xhr = window.request(onSuccess, onError);

    xhr.addEventListener('timeout', function () {
      onError(window.getErrorMessageTimeout(xhr));
    });

    xhr.timeout = RESPONSE_TIME;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
