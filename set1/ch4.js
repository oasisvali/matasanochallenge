var request = require('request');
var ch1 = require('./ch1');
var ch2 = require('./ch2');
var ch3 = require('./ch3');

function load_data_url(url, success) {
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = body.split('\n');
      success(data);
    }
  });
}

function process_data(data) {
  var decodedData = new Array(data.length * 256);
  for (var i = 0; i < data.length; i += 1) {
    var originalBytes = ch1.hex_to_bytes(data[i]);
    for (var j = 0; j < 256; j += 1) {
      var decoded = ch1.bytes_to_string(ch3.xor_single_byte(originalBytes, j));
      var score = ch3.score_string(decoded);
      var key = String.fromCharCode(j);

      decodedData[i * 256 + j] = {
        'original': data[i],
        'decoded': decoded,
        'score': score,
        'key': key
      }
    }
  }
  decodedData.sort(function(a, b) {
    return b.score - a.score;
  });

  console.log(decodedData.slice(0, 5));
}

if (require.main === module) {
  load_data_url('http://cryptopals.com/static/challenge-data/4.txt', process_data);
}

module.exports = {
  load_data_url: load_data_url
};
