
// Thanks to https://stackoverflow.com/a/26339560/1954789
function imageSize(url) {
  let img = new Image();
  img.src = url;

  return new Promise((iresolve) => {
    img.onload = function() { 
      iresolve({ width: this.width, height: this.height});
    }
  });
}
