var x = 100;
y = '';
eval('var z = 200');
console.log(global);
const canRemoveGlobalName = n => {
  return Object.getOwnPropertyDescriptor(global, n)?.configurable;
};

console.log(canRemoveGlobalName('x')); //undefined
console.log(canRemoveGlobalName('y')); // true
console.log(canRemoveGlobalName('z')); // undefined

console.log(delete x);  //false
console.log(delete y); //true
console.log(delete z); //true

console.log(x); //100
// console.log(y); //y is not defined
// console.log(z); //z is not defined

m = 'global name' //报错
const m = 1000
console.log(m); //1000

console.log(global.hasOwnProperty('m'), global.m);

global.m = m + 1

try {
  m=m+1
} catch(e) {
  console.log(e.message);
}

console.log(delete m);
console.log(delete global.m);
