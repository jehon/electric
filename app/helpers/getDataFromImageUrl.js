
// http://stackoverflow.com/a/16566198/1954789
export default function getDataFromImageUrl(url) {
  var img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  return new Promise(function(iresolve) {
    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width =this.width;
      canvas.height =this.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0);

      var dataURL = canvas.toDataURL('image/png');

      // let b64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
      iresolve({
        b64: dataURL,
        width: this.width,
        height: this.height
      });
    };
    img.src = url;
  });
}
