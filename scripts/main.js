(() => {
  'use strict';

  console.log('do { } while (progress);');

  const guiWindowElement = document.querySelector('.gui-window');
  const guiWindowMinimizeElement = document.querySelector('.gui-window-control-minimize');
  const guiWindowMaximizeElement = document.querySelector('.gui-window-control-maximize');
  const guiWindowCloseElement = document.querySelector('.gui-window-control-close');
  const copyrightYearElement = document.querySelector('#copyright-year');

  const recursivelyRestartAnimations = (element) => {
    const animationName = window.getComputedStyle(element).animationName;

    if (animationName !== 'none') {
      element.style.animationName = 'none';
      element.getClientRects(); // Trigger a reflow
      element.style.animationName = animationName;
    }

    for (const child of element.children) {
      recursivelyRestartAnimations(child);
    }
  };

  guiWindowMinimizeElement.addEventListener('click', () => {
    console.log('minimize window');
  });

  guiWindowMaximizeElement.addEventListener('click', () => {
    console.log('maximize window');
  });

  guiWindowCloseElement.addEventListener('click', () => {
    recursivelyRestartAnimations(guiWindowElement);
  });

  // Replace the copyright year with the current year
  const currentYear = new Date().getFullYear();
  if (Number(copyrightYearElement.innerText) < currentYear) {
    copyrightYearElement.innerText = currentYear.toString();
  }
})();
