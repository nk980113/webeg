function randomHex() {
  return Math.random().toString(16).slice(2);
}

export const kCreator = Symbol(`kCreator_${randomHex()}`);

export const kProps = Symbol(`kProps_${randomHex()}`);

export const kInsertRef = Symbol(`kInsertRef_${randomHex()}`);

export const kExtend = Symbol(`kExtend_${randomHex()}`);

export const kIdent = Symbol(`kIdent_${randomHex()}`);

export const kWebeg = Symbol(`kWebeg_${randomHex()}`);

export const kNodeData = Symbol(`kNodeData_${randomHex()}`);

export const kRef = Symbol(`kRef_${randomHex()}`);

export const kChildren = Symbol(`kChildren_${randomHex()}`);
