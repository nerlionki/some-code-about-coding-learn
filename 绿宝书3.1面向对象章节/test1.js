const a = Symbol('a');
const b = Symbol.for('b');
const porpName = 'myProp';
export const SymbolObject = {
  [a]: 100,
  [b]: 200,
  [porpName]: 300
};
