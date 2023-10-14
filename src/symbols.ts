function randomHex() {
  return Math.random().toString(16).slice(2);
}

export const kCreator = Symbol(`kCreator_${randomHex()}`);

export const kProps = Symbol(`kProps_${randomHex()}`);

export const kKey = Symbol(`kKey_${randomHex()}`);

export const kInsertRef = Symbol(`kInsertRef_${randomHex()}`);

export const kExtend = Symbol(`kExtend_${randomHex()}`);

export const kWebeg = Symbol(`kWebeg_${randomHex()}`);
