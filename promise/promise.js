console.log('start here');

const foo = () => {
  new Promise((resolve, reject) => {
    console.log('first promise');

    let promise1 = new Promise((resolve, reject) => {
      console.log('second promise');
      setTimeout(() => {
        console.log('settimeout');
      }, 0);
      resolve('promise1');
    });

    resolve('promise0');

    promise1.then(arg => {
      console.log(arg);
    });
  });
};

foo().then(arg => {
  console.log(arg);
});

console.log('end here');
