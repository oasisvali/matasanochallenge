var ch1 = require('./ch1');
var ch2 = require('./ch2');
var ch3 = require('./ch3');

var IN = 'Burning \'em, if you ain\'t quick and nimble\nI go crazy when I hear a cymbal';
var KEY = 'ICE';
var OUT = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';

function xor_repeating_bytes(bytes1, bytes2) {
  if (bytes1.length <= bytes2.length) {
    return ch2.xor_bytes(bytes1, bytes2.slice(0, bytes1.length));
  }
  var newMask = new Uint8Array(bytes1.length);
  for (var i = 0; i < bytes1.length; i += 1) {
    newMask[i] = bytes2[i % bytes2.length];
  }

  return ch2.xor_bytes(bytes1, newMask);
}

if (require.main === module) {
  console.log(
    ch1.bytes_to_hex(xor_repeating_bytes(
      ch1.string_to_bytes(IN), ch1.string_to_bytes(KEY)
    )) === OUT
  );
}

module.exports = {
  xor_repeating_bytes: xor_repeating_bytes
};
