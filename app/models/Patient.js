"use strict";

import Data from "models/Data";

export default class Patient extends Data {
  getModel() {
    return "Patient";
  }

  sexStr() {
    if (!this.isNotZero("Sex")) {
      return null;
    }
    if (this.Sex == "Male") {
      return "m";
    }
    if (this.Sex == "Female") {
      return "f";
    }
    return null;
  }

  actualAge(reference) {
    if (!this.isSet("Yearofbirth")) {
      return null;
    }
    var birth = this.Yearofbirth;
    var options = Object.assign({}, {
      "reference": reference || new Date(),
      "format": false
    }, options);
    // reference = reference || new Date();
    if (typeof(options.reference) == "number") {
      options.reference = "" + options.reference;
    }
    if (typeof(options.reference) == "string") {
      if (options.reference.length < 4) {
        return options.format ? null : "?";
        // throw new Exception("Invalid reference");
      }
      var ry = parseInt(options.reference.substring(0, 4));
      var rm = parseInt(options.reference.substring(5, 7));
      if (isNaN(rm)) {
        rm = 1; // emulate january
      }
      options.reference = new Date(ry, rm - 1, 1);
    }
    if (typeof(birth) == "number") {
      birth = "" + birth;
    }
    if (typeof(birth) == "string") {
      if (birth.length < 4) {
        return options.format ? null : "?";
        // throw new Exception("Invalid birth");
      }
      var by = parseInt(birth.substring(0, 4));
      var bm = parseInt(birth.substring(5, 7));
      if (isNaN(bm)) {
        bm = 1; // emulate january
      }
      birth = new Date(by, bm - 1 -1, 30);
    }
    var days = new Date(0, 0, 0, 0, 0, 0, options.reference - birth);
    var res = { years: days.getFullYear() - 1900, months: days.getMonth()};
    if (options.format == "object") {
      return res;
    }
    if (options.format == "number") {
      return res.years + (res.months / 12);
    }
    return res.years + "y" + res.months + "m";
  }
}
