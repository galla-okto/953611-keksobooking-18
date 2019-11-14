'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewHouse = document.querySelector('.ad-form__photo img');

  var chooseAndReadFile = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarChange = function () {
    chooseAndReadFile(fileChooserAvatar, previewAvatar);
  };

  var onHouseChange = function () {
    chooseAndReadFile(fileChooserHouse, previewHouse);
  };

  fileChooserAvatar.addEventListener('change', onAvatarChange);
  fileChooserHouse.addEventListener('change', onHouseChange);
})();
