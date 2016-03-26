var ch1 = require('./ch1');

var IN1 = '1c0111001f010100061a024b53535009181c';
var IN2 = '686974207468652062756c6c277320657965';

var OUT = '746865206b696420646f6e277420706c6179';

function xor_bytes(bytes1, bytes2) {
    console.assert(bytes1.length === bytes2.length, 'byte arrays being XOR-ed must be of same length');

    var xorArray = new Uint8Array(bytes1.length);
    for (var i = 0; i < bytes1.length; i++) {
        xorArray[i] = bytes1[i] ^ bytes2[i];
    }

    return xorArray;
}

if (require.main === module) {
    console.log(
        ch1.bytes_to_hex(
            xor_bytes(
                ch1.hex_to_bytes(IN1),
                ch1.hex_to_bytes(IN2)
            )
        ) === OUT
    );    
}

module.exports = {
  xor_bytes: xor_bytes
};