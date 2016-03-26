var request = require('request');
var ch1 = require('./ch1');
var ch2 = require('./ch2');
var ch3 = require('./ch3');

var DATA = null;

function load_data() {
    request('http://cryptopals.com/static/challenge-data/4.txt', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            DATA = body.split('\n');
            process_data();
        }
    });
}

function process_data() {
    var decodedData = new Array(DATA.length * 256);
    for (var i = 0; i<DATA.length; i+=1) {
        var originalBytes = ch1.hex_to_bytes(DATA[i]);
        for (var j = 0; j<256; j+=1) {
            var decoded = ch1.bytes_to_string(ch3.xor_single_byte(originalBytes, j));
            var score = ch3.score_string(decoded);
            var key = String.fromCharCode(j);

            decodedData[i*256 + j] = {
                'original': DATA[i],
                'decoded': decoded,
                'score': score,
                'key': key
            }
        }
    }
    decodedData.sort(function (a, b) {
        return b.score - a.score;
    });

    console.log(decodedData.slice(0,5));
}

if (require.main === module) {
    load_data();
}