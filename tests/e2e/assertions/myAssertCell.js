// http://nightwatchjs.org/guide#writing-custom-commands
// https://github.com/beatfactor/nightwatch/blob/master/lib/api/assertions/containsText.js
var util = require("util");

exports.assertion = (function() {
  var storedRow = 1;
  var storedColumn = 1;
  var storedSelector;
    /**
     * selector: table selector
     * row / column: number of row / column - number / -1/-2/+1/+2... / = / last / h1..
     */
  return function(selector, row, column, expectedText, msg) {
	      if (typeof(row) == "undefined") {
	      expectedText = selector;
	      column = "+1";
	      row = "=";
	      selector = "=";
	}

	      function parseParam(param, ref) {
   if (typeof(param) != "string") return param;
   if (param === "last") {
   	        return "last";
     	}
   if (param === "=") {
        	 return ref;
    }
   if (param[0] === "+" || param[0] === "-") {
        	      return ref + parseInt(param);
        	}
   return param;
}
      row = parseParam(row, storedRow);
      column = parseParam(column, storedColumn);
      if (selector === "=") {
          selector = storedSelector;
        }
      storedRow = row;
      storedColumn = column;
      storedSelector = selector;

      var MSG = util.format("Testing if table <%s>@row=%s&col=%s contains text: \"%s\".", selector, row, column, expectedText);
        /**
          * The message which will be used in the test output and
          * inside the XML reports
          * @type {string}
          */
      this.message = msg || MSG;

        /**
          * A value to perform the assertion on. If a function is
          * defined, its result will be used.
          * @type {function|*}
          */
      this.expected = function() {
    	      return expectedText;
        };

        /**
         * The method which performs the actual assertion. It is
         * called with the result of the value method as the argument.
         * @type {function}
         */
      this.pass = function(value) {
        	  if (typeof(value) == "string") {
        	      return value.indexOf(expectedText) > -1;
        	}
        	  return value;
        };

      this.fail = function(value) {
        	      var failed = result === false || result && result.status === -1;
        	      if (failed) {
        	      this.message = this.message + util.format(": Found <%s>", value);
        	}
        	      return failed;
            };

        /**
         * The method which returns the value to be used on the
         * assertion. It is called with the result of the command's
         * callback as argument.
         * @type {function}
         */
      this.value = function(result) {
    		      return result.value;
        };

        /**
         * Performs a protocol command/action and its result is
         * passed to the value method via the callback argument.
         * @type {function}
         */
      this.command = function(callback) {
      var sel = selector;
      if (row === "last") {
        	      sel += " tr:last-child";
            } else {
        	      sel += " tr:nth-child(" + row + ")";
            }
      if (column === "last") {
        	      sel += " td:last-child";
            } else {
        	      sel += " td:nth-child(" + column + ")";
            }
      return this.api.getText(sel, callback);
    };
    };
})();
