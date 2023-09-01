(() => {
  'use strict';

  console.log('do { } while (progress);');

  const guiWindowElement = document.querySelector('.gui-window');
  const guiWindowIconElement = document.querySelector('.gui-window-icon');
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

  guiWindowIconElement.addEventListener('dblclick', () => {
    recursivelyRestartAnimations(guiWindowElement);
  });

  guiWindowMinimizeElement.addEventListener('click', () => {
    guiWindowElement.classList.add('minimized');
    guiWindowElement.addEventListener('transitionend', () => {
      guiWindowElement.classList.remove('minimized');
    }, { once: true });
  });

  guiWindowMaximizeElement.addEventListener('click', () => {
    guiWindowElement.classList.toggle('maximized');
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
