
export default function away(d, angle) {
  return {
    x: function() {
      return -d * Math.sin(angle / 180 * Math.PI);
    },
    y: function() {
      return d * Math.cos(angle / 180 * Math.PI);
    }
  };
}
