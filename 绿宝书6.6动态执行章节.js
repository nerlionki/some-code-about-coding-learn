'use strict';
try {
  y = 100;
} catch (error) {
  console.log('in strict', error.message); //in strict y is not defined
} finally {
  console.log('now y is', typeof y); //now y is undefined
}

function foo() {
  var obj = { eval };
  obj.eval(`
try {
  y=100
} finally{
  console.log('in obj.eval',y); //in obj.eval 100
}

`);
}
foo();
console.log('in global,y', y); //in global,y 100
