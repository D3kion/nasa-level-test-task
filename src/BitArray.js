/**
 * > Хранение закодированной последовательности должно быть эффективным;
 * иными словами, значения 0 и 1 в результирующей последовательности
 * должны занимать ровно один бит.
 *
 * (с) Не представляю как это можно сделать в js, была идея хранить это дело
 * как число и для изменения значения использовать операторы сдвига,
 * в теории это закрыло бы этот пункт, но так же есть вероятнось потерять данные,
 * поэтому решил оставить в таком виде.
 *
 * PS: Не нужно было делать (в случае node.js), как оказалось
 */
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

  toString() {
    return this._bits.join('');
  }
}

module.exports = BitArray;
