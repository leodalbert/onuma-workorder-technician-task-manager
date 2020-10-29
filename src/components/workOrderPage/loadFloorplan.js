const loadFloorplan = (callback) => {
  const existingScript = document.getElementById('onuma-app');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://system.onuma.com/static/ng-elem/onuma/onuma-app.js';
    script.id = 'onuma-app';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadFloorplan;
