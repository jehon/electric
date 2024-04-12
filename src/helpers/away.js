
export default function away(w, h, angle) {
  // Normalize angle in [O, 360[
  while (angle < 0) {
    angle += 360;
  }
  while (angle >= 360) {
    angle -= 360;
  }

  let rad = (angle / 180) * Math.PI;

  return {
    get x() {
      return Math.max(0, w * Math.cos(rad) + Math.abs((h / 2) * Math.sin(rad)));
      // return -d * Math.sin(angle / 180 * Math.PI);
    },
    get y() {
      return Math.max(0, w * Math.sin(rad) + Math.abs((h / 2) * Math.cos(rad)));
      // return d * Math.cos(angle / 180 * Math.PI);
    },

    // alignmentH: function() {
    //   if (angle < 45)  { return 'middle'; }
    //   if (angle < 135) { return 'end'; }
    //   if (angle < 225) { return 'middle'; }
    //   if (angle < 325) { return 'start'; }
    //   return 'middle';
    // },

    // alignementV: function() {
    //   if (angle < 45)  { return '+1em'; }
    //   if (angle < 135) { return '+0.4em'; }
    //   if (angle < 225) { return ''; }
    //   if (angle < 325) { return '+0.4em'; }
    //   return 'middle';
    // }
  };
}
