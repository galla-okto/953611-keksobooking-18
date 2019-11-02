'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var EXT_RESPONSE_TYPE = 'json';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = EXT_RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(window.getErrorMessageStatus(xhr));
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
