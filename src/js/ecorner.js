(function () {
  'use strict';

  function hideH1IfEcorner() {
    const h1 = document.querySelector('h1');
    if (h1) {
      h1.classList.add('visually-hidden');
    }
  }

  document.addEventListener('DOMContentLoaded', hideH1IfEcorner);
})();
