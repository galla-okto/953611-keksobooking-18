'use strict';

(function () {
  var EXT_RESPONSE_TYPE = 'json';

  window.request = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = EXT_RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(window.getErrorMessageStatus(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  }
})();
