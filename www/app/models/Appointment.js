"use strict";

import File from "models/File";

export default class Appointment extends File {
  getModel() {
    return "Appointment";
  }

  constructor(data, folder = null) {
    super(data, folder);
    if (!data) {
      var now = new Date();
      var year = now.getFullYear();
      var month = "0" + (now.getMonth() + 1);
      month = month.substring(month.length - 2);
      var day = "0" + now.getDate();
      day = day.substring(day.length - 2);

      this.Date = year + "-" + month + "-" + day;
    }
  }

  isLocked() {
    return false;
  }

}
