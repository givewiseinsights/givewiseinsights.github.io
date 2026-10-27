'use strict';
// Native anchor links and disclosure elements keep the full site usable without JavaScript.
const printButton = document.querySelector('[data-print-sample]');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
