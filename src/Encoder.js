const BitArray = require('./BitArray');

class Encoder {
  /**
   * @param {number[]} numbers
   * @returns {BitArray}
   */
  Gamma(numbers) {
    const deltas = this._toDeltas(numbers);
    const bijected = this._biject(deltas);
    const bitArrayStr = bijected.map(this._encodeGamma).join('');

    return new BitArray(bitArrayStr);
  }

  /**
   * @param {number[]} numbers
   * @returns {BitArray}
   */
  Delta(numbers) {
    const deltas = this._toDeltas(numbers);
    const bijected = this._biject(deltas);
    const bitArrayStr = bijected.map(this._encodeDelta, this).join('');

    return new BitArray(bitArrayStr);
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  _encodeGamma(num) {
    const l = ~~Math.log2(num);
    let bitsStr = `${'0'.repeat(l)}1`;

    for (let i = l - 1; i >= 0; i--) {
      bitsStr += num & (1 << i) ? 1 : 0;
    }

    return bitsStr;
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  _encodeDelta(num) {
    const l = ~~Math.log2(num) + 1;
    let bitsStr = this._encodeGamma(l);

    for (let i = l - 2; i >= 0; i--) {
      bitsStr += num & (1 << i) ? 1 : 0;
    }

    return bitsStr;
  }

  /**
   * @param {number[]} numbers
   * @returns {number[]}
   */
  _toDeltas(numbers) {
    return numbers.map((num, idx, arr) => {
      return idx === 0 ? num : num - arr[idx - 1];
    });
  }

  /**
   *
   * @param {number[]} numbers
   * @returns {number[]}
   */
  _biject(numbers) {
    return numbers.map((num) => {
      return num >= 0 ? num * 2 + 1 : -(2 * num);
    });
  }
}

module.exports = Encoder;
