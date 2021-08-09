const Encoder = require('./Encoder');
const Decoder = require('./Decoder');

const input = [3, -15, 123, -31, 0, 42];
const expectedGamma =
  '00111000001001000000000010001010100000000100110100000001111110000001010101';
const expectedDelta =
  '011110011000100000100100010101000100100110100001101111100111010101';

const encoder = new Encoder();
const actualGamma = encoder.Gamma(input);
const actualDelta = encoder.Delta(input);

console.log(actualGamma, expectedGamma);
console.log(`Gamma encode: ${actualGamma === expectedGamma ? 'OK' : 'ERROR'}`);

console.log(actualDelta, expectedDelta);
console.log(`Delta encode: ${actualDelta === expectedDelta ? 'OK' : 'ERROR'}`);

const decoder = new Decoder();
const decodedGamma = decoder.Gamma(actualGamma);
const decodedDelta = decoder.Delta(actualDelta);

console.log(input, decodedGamma);
console.log(`Gamma decode: ${input === decodedGamma ? 'OK' : 'ERROR'}`);

console.log(input, decodedDelta);
console.log(`Delta decode: ${input === decodedDelta ? 'OK' : 'ERROR'}`);
