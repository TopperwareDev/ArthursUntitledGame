export function addPhaserStylesheet() {
    const oldStylesheet = document.getElementById('phaserstylesheet');
    if (oldStylesheet) {
      document.head.removeChild(oldStylesheet);
    }
  
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'clientGame/window/src/style/phaserwindow.css';
    stylesheet.id = 'phaserstylesheet';
    document.head.appendChild(stylesheet);
  }