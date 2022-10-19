var x = 100;
function foo(cond) {
  console.log(x);
  if (cond) {
    var x = 1000;
  } else {
    function x() {}
  }
  console.log(x);
}
foo(true); // undefined 1000
foo(false); // undefined [Function: x]

var y = (r = { a: 100 });
y.a = y = 1;
console.log(y); // 1 被重写为1
console.log(r.a); // 1
console.log(y.a); // undefined 被重写为1

// 语句中的重写
var obj = (obj1 = {});
var obj2 = { name: 'obj2' };
switch (
  obj // 暂存了obj
) {
  case (obj = obj2):  //执行但是跳过该语句
    console.log('obj2');
    break;
  case obj1:
    console.log('obj1');
    break;
}
// obj1
console.log(obj === obj2); // true

function foo(x) {
  try {
    return x;
  } finally {
    x = x * 2;
  }
}
console.log(foo(100)); // 100

function bar(x) {
  try {
    return x;
  } finally {
    x.push(100);
  }
}
console.log(bar([1, 2, 3])); // [1,2,3,100]
with ({ undefined }) console.log(delete undefined); // true

with ({ null: 1 }) console.log(delete null, null, valueOf().null); // true null 1

var x = 100, y = 200
with ([x, y]) for (value of valueOf()) {
  if (length === 2) {
    push(300)
    console.log("ARRAY:",length," elements,value:",...valueOf());  // ARRAY: 3  elements,value: 100 200 300
  }
  console.log("FOROF:",value); // FOROF: 100 200 300
}

with ({ x: 200 }) {
  valueOf().y = 300
  console.log(x, y); //200 300
  delete y
  console.log(x,y); //200 200
}


// 执行期重写1
function MyObject() {}
var test1 = new MyObject()

MyObject = function() { }
var test2 = new MyObject()
console.log(test1 instanceof MyObject); // false
console.log(test2 instanceof MyObject); // true
console.log(test1 instanceof test1.constructor);// ture

// 语法分析期重写
function MyObject1() { }
var test3 =new MyObject1()
function MyObject1() { }
var test4 =new MyObject1()
console.log('语法分析期重写',test3 instanceof MyObject1); // true
console.log('语法分析期重写',test4 instanceof MyObject1); // true
console.log('语法分析期重写',test3 instanceof test3.constructor);// ture

// 执行期重写2
MyObject2=function() { }
var test5 =new MyObject2()
function MyObject2() { }
var test6 = new MyObject2()
console.log('执行期重写2',test5 instanceof MyObject2); // true
console.log('执行期重写2',test6 instanceof MyObject2); // true
console.log('执行期重写2', test5 instanceof test6.constructor);// ture

// 原型重写
function TestObject() { }
var testObj1 = new TestObject()
TestObject.prototype.type = 'TestObject'
TestObject.prototype.value = 'test'
var testObj2 = new TestObject()

TestObject.prototype = {
  constructor: TestObject,
  type: 'Bird',
  fly() {
    console.log('I can fly');
  }
}
var testObj3 = new TestObject()

console.log(testObj1.type); // TestObject
console.log(testObj2.type); // TestObject
console.log(testObj3.type); // Bird

console.log(testObj1 instanceof TestObject); // false
console.log(testObj2 instanceof TestObject); // false
console.log(testObj3 instanceof TestObject); // true

console.log(testObj1 instanceof testObj1.constructor); // false
console.log(testObj1.constructor===TestObject); // true
