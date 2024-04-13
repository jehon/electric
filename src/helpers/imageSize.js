// Thanks to https://stackoverflow.com/a/26339560/1954789
export default function imageSize(url) {
  let img = new Image();
  img.src = url;

  return new Promise((iresolve) => {
    img.onload = function () {
      iresolve({ width: this.width, height: this.height });
    };
  });
}
