var ch1 = require('./ch1');
var ch2 = require('./ch2');

var IN = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';

function make_array(length, value) {
    return Array.apply(null, Array(length)).map(function(){
        return value;
    });
}

function score_string(decodedString) {
    try {
        return decodedString.match(/[etaoinshrdlu]/igm).length;
    }
    catch (e) {
        return 0;
    }
}

function xor_single_byte(bytes, byte) {
    return ch2.xor_bytes(bytes, make_array(bytes.length, byte));
}

function try_decode(bytes) {
    var decodedData = new Array(256);
    for (var i = 0; i < 256; i++) {
        var decoded = ch1.bytes_to_string(xor_single_byte(bytes, i));
        var score = score_string(decoded);
        var key = String.fromCharCode(i);
        decodedData[i] = {
            'decoded': decoded,
            'score': score,
            'key': key
        }
    }

    decodedData.sort(function (a, b) {
        return b.score - a.score;
    });

    console.log(decodedData.slice(0,5));
    
}
 
if (require.main === module) {
    var bytesIn = ch1.hex_to_bytes(IN);
    try_decode(bytesIn);
}

module.exports = {
  xor_single_byte: xor_single_byte,
  score_string: score_string
};