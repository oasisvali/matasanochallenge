var ch1 = require('./ch1');
var ch3 = require('./ch3');
var ch4 = require('./ch4');
var ch5 = require('./ch5');

function hamming_dist(bytes1, bytes2) {
  console.assert(bytes1.length === bytes2.length, "Hamming distance between 2 byte arrays can only be calculated if they are same length");

  var distance = 0;
  for (var i = 0; i < bytes1.length; i+=1) {
    try {
      distance += (bytes1[i] ^ bytes2[i]).toString(2).match(/1/g).length;
    }
    catch (e) {
      continue;
    }
  }

  return distance;
}

if (require.main === module) {
  console.log(
    hamming_dist(
      ch1.string_to_bytes('this is a test'), ch1.string_to_bytes('wokka wokka!!!')
    ) === 37
  );
  
}

module.exports = {
  hamming_dist: hamming_dist
};
