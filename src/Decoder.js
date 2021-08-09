const BitArray = require('./BitArray');

class Decoder {
  /**
   * @param {BitArray} bitArray
   * @returns {number[]}
   */
  Gamma(bitArray) {
    let bitsStr = bitArray.toString();
    let splitted = [];

    while (bitsStr.length) {
      const l = bitsStr.split('1')[0].length;
      const substringLength = 2 * l + 1;

      splitted.push(bitsStr.slice(0, substringLength));
      bitsStr = bitsStr.slice(substringLength);
    }

    const decoded = splitted.map(this._decodeGamma);
    const unbijected = this._unbiject(decoded);

    return this._fromDeltas(unbijected);
  }

  /**
   * @param {BitArray} bitArray
   * @returns {number[]}
   */
  Delta(bitArray) {
    let bitsStr = bitArray.toString();
    let splitted = [];

    while (bitsStr.length) {
      const m = bitsStr.split('1')[0].length;
      const l = 2 ** m + parseInt(bitsStr.slice(m + 1, 2 * m + 1), 2);
      const substringLength = 2 * m + l;

      splitted.push(bitsStr.slice(0, substringLength));
      bitsStr = bitsStr.slice(substringLength);
    }

    const decoded = splitted.map(this._decodeDelta);
    const unbijected = this._unbiject(decoded);

    return this._fromDeltas(unbijected);
  }

  /**
   * @param {string} num
   * @returns {number}
   */
  _decodeGamma(num) {
    const l = num.split('1')[0].length;

    return parseInt(num.slice(l), 2);
  }

  /**
   * @param {string} num
   * @returns {number}
   */
  _decodeDelta(num) {
    const m = num.split('1')[0].length;
    const l = 2 ** m + parseInt(num.slice(m + 1, 2 * m + 1), 2);

    return 2 ** (l - 1) + parseInt(num.slice(2 * m + 1), 2);
  }

  /**
   * @param {number[]} numbers
   * @returns {number[]}
   */
  _unbiject(numbers) {
    return numbers.map((num) => {
      return num % 2 ? (num - 1) / 2 : -(num / 2);
    });
  }

  /**
   * @param {number[]} numbers
   * @returns {number[]}
   */
  _fromDeltas(numbers) {
    return numbers.reduce((prev, num, idx) => {
      const restored = idx === 0 ? num : num + prev[idx - 1];
      return [...prev, restored];
    }, []);
  }
}

module.exports = Decoder;
