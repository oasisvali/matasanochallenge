var IN = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';

var OUT = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';

function hex_to_bytes(hex) {
    console.assert((hex.length %2) == 0, "Only even-length hex string can be converted to binary");

    var byteArray = new Uint8Array(hex.length/2);
    for (var i = 0; i < hex.length; i+=2) {
        byteArray[i/2] = parseInt(hex.substring(i, i+2), 16);
    }
    return byteArray;
}

function bytes_to_hex(bytes) {
    var hexArray = new Array(bytes.length);

    for (var i = 0; i < bytes.length; i++) {
        hexArray[i] = bytes[i].toString(16);
        if (hexArray[i].length === 1) {
            hexArray[i] = '0' + hexArray[i];
        }
    }

    return hexArray.join('');
}

function bytes_to_string(bytes) {
    var charArray = new Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        charArray[i] = String.fromCharCode(bytes[i]);
    }

    return charArray.join('');
}

function string_to_bytes(string) {
    var byteArray = new Uint8Array(string.length);
    for (var i = 0; i < string.length; i+=1) {
        byteArray[i] = string[i].charCodeAt(0);
    }
    return byteArray;
}

function encode_base64(string) {

    return new Buffer(string).toString('base64');
}

if (require.main === module) {
    console.log(encode_base64(bytes_to_string(hex_to_bytes(IN))) === OUT);console.log();
}


module.exports = {
  hex_to_bytes: hex_to_bytes,
  string_to_bytes: string_to_bytes,
  bytes_to_string: bytes_to_string,
  bytes_to_hex: bytes_to_hex,
  encode_base64: encode_base64 
};