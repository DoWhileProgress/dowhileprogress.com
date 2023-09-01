(() => {
  'use strict';

  console.log('do { } while (progress);');

  const documentElement = document.documentElement;
  const guiWindowElement = document.querySelector('.gui-window');
  const guiWindowTitleBarElement = document.querySelector('.gui-title-bar');
  const guiWindowIconElement = document.querySelector('.gui-window-icon');
  const guiWindowControlsElement = document.querySelector('.gui-window-controls');
  const guiWindowMinimizeElement = document.querySelector('.gui-window-control-minimize');
  const guiWindowMaximizeElement = document.querySelector('.gui-window-control-maximize');
  const guiWindowCloseElement = document.querySelector('.gui-window-control-close');
  const copyrightYearElement = document.querySelector('#copyright-year');

  const debounce = (func, time) => {
    time ??= 100;
    let timer;

    return (event) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(func, time, event);
    };
  };

  const markCriticalDimensions = () => {
    documentElement.style.setProperty('--document-height', documentElement.clientHeight + 'px');
    guiWindowElement.style.setProperty('--gui-window-top', guiWindowElement.offsetTop + 'px');
    guiWindowElement.style.setProperty('--gui-window-height', guiWindowElement.offsetHeight + 'px');
  };

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

  // Mark critical dimensions as CSS vars, and continue to do so on resize
  markCriticalDimensions();
  window.addEventListener('resize', debounce(markCriticalDimensions));

  guiWindowIconElement.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    recursivelyRestartAnimations(guiWindowElement);
  });

  guiWindowTitleBarElement.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    guiWindowElement.classList.toggle('maximized');
  });

  guiWindowControlsElement.addEventListener('dblclick', (e) =>
    e.stopPropagation()
  );

  guiWindowMinimizeElement.addEventListener('click', (e) => {
    e.stopPropagation();
    guiWindowElement.classList.add('minimized');
    guiWindowElement.addEventListener('transitionend', () => {
      guiWindowElement.classList.remove('minimized');
    }, { once: true });
  });

  guiWindowMaximizeElement.addEventListener('click', (e) => {
    e.stopPropagation();
    guiWindowElement.classList.toggle('maximized');
  });

  guiWindowCloseElement.addEventListener('click', (e) => {
    e.stopPropagation();
    recursivelyRestartAnimations(guiWindowElement);
  });

  // Replace the copyright year with the current year
  const currentYear = new Date().getFullYear();
  if (Number(copyrightYearElement.innerText) < currentYear) {
    copyrightYearElement.innerText = currentYear.toString();
  }
})();
