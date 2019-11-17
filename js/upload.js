'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = window.request(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
