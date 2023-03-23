Function.prototype.unCurry = function () {
  return this.call.bind(this);
};

function add() {
  return this.a + this.b;
}
console.log(add.unCurry());
console.log(add.unCurry()({ a: 1, b: 2 }));
