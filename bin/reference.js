
var xls2json = require('xls-to-json');
var fs = require('fs');

xls2json({
  'input': __dirname + '/../references.xls',
  'output': null,
  'sheet': 'elements'
}, function(err, result) {
  if (err) {
    console.error(err);
  } else {
    var data = {};
    for(var i in result) {
      data[result[i].code] = result[i];
    }
    console.log(data);
    fs.writeFileSync(__dirname + '/www/build/references.js', 'export default ' + JSON.stringify(data));
  }
});
