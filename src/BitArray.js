class BitArray {
  _bits = [];

  /**
   * @param {string} bits
   */
  constructor(bits) {
    if (typeof bits !== 'string') {
      console.error('Bits must be "string" type!');
      return;
    }

    this._bits = bits.split('').map((x) => +x);
  }

  /**
   * Bit-length of the underlying array
   *
   * @returns {number}
   */
  getLength() {
    return this._bits.length;
  }

  /**
   * Returns bit value by index
   *
   * @param {number} index
   * @returns {number|null}
   */
  getAt(index) {
    if (index >= this.getLength()) return null;

    return this._bits[index];
  }
}

module.exports = BitArray;
