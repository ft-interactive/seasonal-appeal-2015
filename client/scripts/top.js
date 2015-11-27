/* eslint-disable */

// global addScript function
function addScript(src, async, defer) {
  if (!async && !defer) {
    document.write('<script src="' + src + '">\x3c/script>');
  }
  else {
    var script = document.createElement('script');
    script.src = src;
    script.async = !!async;
    if (defer) script.defer = !!defer;
    var oldScript = document.getElementsByTagName('script')[0];
    oldScript.parentNode.appendChild(script);
    return script;
  }
}

// product-specific cuts-the-mustard test (customise for your needs)
var cutsTheMustard = (
  'querySelector' in document &&
  'addEventListener' in window &&
  'requestAnimationFrame' in window
);

// set the root element to .core or .enhanced as appropriate
if (cutsTheMustard) {
  document.documentElement.className = (
    document.documentElement.className.replace(/\bcore\b/g, 'enhanced')
  );

  addScript('https://cdn.polyfill.io/v1/polyfill.min.js');
} else {
  addScript('https://cdn.polyfill.io/v1/polyfill.min.js?features=~html5-elements');
}
