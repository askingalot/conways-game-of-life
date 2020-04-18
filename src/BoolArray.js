class BoolArray {
  constructor(lengthOrSource, fill) {
    if (typeof lengthOrSource === 'number') {
      this._length = lengthOrSource;
      this._byteArray = new Uint8Array(this._length / 8);
      if (typeof fill === 'function') {
        this.fill(fill);
      }
    } else {
      this._length = lengthOrSource._length;
      this._byteArray = new Uint8Array(lengthOrSource._byteArray);
    }
  }

  get length() {
    return this._length;
  }

  * map(mapFn) {
    for (let i=0; i<this._length; i++) {
       yield mapFn(this.get(i), i);
    }
  }

  fill(fillFn) {
    for (let i=0; i<this._length; i++) {
      this.set(i, fillFn(i))
    }
    return this;
  }

  get(index) {
    const byteIndex = Math.floor(index / 8);
    const bitIndex = Math.floor(index % 8);

    const byte = this._byteArray[byteIndex];
    return !!(1 & (byte >> bitIndex));
  }

  set(index, value) {
    const byteIndex = Math.floor(index / 8);
    const bitIndex = Math.floor(index % 8);

    const byte = this._byteArray[byteIndex];
    this._byteArray[byteIndex] = value 
      ? byte ^ (1 << bitIndex)
      : byte & (255 - (1 << bitIndex));
  }
}

export default BoolArray;