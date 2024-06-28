const cart = ["shoes", "socks", "shirts"];

//If one of our function depends on other function, then we can make use of callbacks
//but it can easily turn in to callback hell(see below). It is also known as pyramid of doom.
//
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet();
    });
  });
});

//Promises -> to handle asynchronous tasks in JS.
const promiseRef = createOrder(cart);
// this promiseRef has access to `then`

// {data: undefined}
// Initially it will be undefined so below code won't trigger
// After some time, when execution has finished and promiseRef has the data
// then automatically the below line will get triggered.

promiseRef.then(function () {
  proceedToPayment(orderId);
});

//Promises have 3 state: 1. Pending  2. Fulfilled  3. Rejected
//Promise is an object representing the eventual completion or failure of an asynchronous operation.

//Promise chaining to avoid callback hell
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInf) {
    return showOrderSummary(paymentInf);
  })
  .then(function (balance) {
    return updateWalletBalance(balance);
  })
  .catch(function (error) {
    console.log(error);
  });

// Producer part of Promise
function createOrder(cart) {
  // JS provides a Promise constructor through which we can create promise
  // It accepts a callback function with two parameter `resolve` & `reject`
  const promise = new Promise(function (resolve, reject) {
    // What is this `resolve` and `reject`?
    // These are function which are passed by javascript to us in order to handle success and failure of function call.
    // Now we will write logic to `createOrder`
    /** Mock logic steps
     * 1. validateCart
     * 2. Insert in DB and get an orderId
     */
    // We are assuming in real world scenario, validateCart would be defined
    if (!validateCart(cart)) {
      // If cart not valid, reject the promise
      const err = new Error("Cart is not Valid");
      reject(err);
    }
    const orderId = "12345"; // We got this id by calling to db (Assumption)
    if (orderId) {
      // Success scenario
      resolve(orderId);
    }
  });
  return promise;
}

createOrder(cart)
  .then(function (orderId) {
    // ✅ success aka resolved promise handling
    // 💡 we have return data or promise so that we can keep chaining the promises, here we are returning data
    console.log(orderId);
    return orderId;
  })
  .catch(function (err) {
    // ⚠️ Whatever fails below it, catch wont care
    // this block is responsible for code block above it.
    console.log(err);
  })
  .then(function (orderId) {
    // Promise chaining
    // 💡 we will make sure that `proceedToPayment` returns a promise too
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    // from above, `proceedToPayment` is returning a promise so we can consume using `.then`
    console.log(paymentInfo);
  });

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value!!");
  }, 3000);
});

// Let's now compare with some modification:

// 📌 Promise.then/.catch way
function getData() {
  // JS engine will not wait for promise to be resolved
  p.then((res) => console.log(res));
  console.log("Hello There!");
}

getData(); // First `Hello There!` would be printed and then after 3 secs 'Promise resolved value!!' will be printed.
// Above happened as Javascript wait for none, so it will register this promise and take this callback function and register separately then js will move on and execute the following console and later once promise is resolved, following console will be printed.

//❓ Problem: Normally one used to get confused that JS will wait for promise to be resolved before executing following lines.

// 📌 async-wait way:
async function handlePromise() {
  // JS Engine will waiting for promise to resolve.
  const val = await p;
  console.log("Hello There!");
  console.log(val);
}
handlePromise(); // This time `Hello There!` won't be printed immediately instead after 3 secs `Hello There!` will be printed followed by 'Promise resolved value!!'
// 💡 So basically code was waiting at `await` line to get the promise resolve before moving on to next line.

// Above is the major difference between Promise.then/.catch vs async-await

//🤓 Let's brainstorm more around async-await
async function handlePromise() {
  console.log("Hi");
  const val = await p;
  console.log("Hello There!");
  console.log(val);

  const val2 = await p;
  console.log("Hello There! 2");
  console.log(val2);
}
handlePromise();
// In above code example, will our program wait for 2 time or will it execute parallely.
//📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise resolved value!!') will get printed immediately.

// Let's create one promise and then resolve two different promise.
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value by p2!!");
  }, 2000);
});

async function handlePromise() {
  console.log("Hi");
  const val = await p;
  console.log("Hello There!");
  console.log(val);

  const val2 = await p2;
  console.log("Hello There! 2");
  console.log(val2);
}
handlePromise();
// 📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise resolved value by p2!!') will get printed immediately. So even though `p2` was resolved after 2 secs it had to wait for `p` to get resolved

// Now let's reverse the order execution of promise and observe response.
async function handlePromise() {
  console.log("Hi");
  const val = await p2;
  console.log("Hello There!");
  console.log(val);

  const val2 = await p;
  console.log("Hello There! 2");
  console.log(val2);
}
handlePromise();
// 📌 `Hi` printed instantly -> now code will wait for 2 secs -> After 2 secs ('Hello There!' 'Promise resolved value by p2!!') will get printed and in the subsequent second i.e. after 3 secs ('Hello There! 2' 'Promise resolved value!!') will get printed


async function handlePromise() {
    // fetch() => Response Object which as body as Readable stream => Response.json() is also a promise which when resolved => value
    const data = await fetch('https://api.github.com/users/');
    const res = await data.json();
    console.log(res);
  };
  handlePromise()


//In async await, errors can be handled using try-catch

Promise.all([p1, p2, p3]) // -> returns aggregate of all values if all promises are fulfilled, if any of the promise is rejected then the error will be returned and Promise.all() won't wait for other promises
Promise.allSettled([p1, p2, p3]) // -> returns aggregate of all values even if any promise is rejected.
Promise.race([p1, p2, p3]) // -> the promise is rejected or resolved when any one of the promises is rejected or resolved.
Promise.any([p1, p2, p3]) // -> returns success when any of the promise is successful if all promises fail then the result will be aggregated error for all the promises.

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('P1 Success');
    }, 3000);
  });
  const p11 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('P2 Success');
    }, 1000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('P3 Success');
    }, 2000);
  });

  Promise.all([p1, p11, p3]).then((results) => {
    console.log(results); // ['P1 Success', 'P2 Success', 'P3 Success'] -> took 3 secs
  });

  const p111 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('P1 Success');
    }, 3000);
  });
  const p21 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('P2 Fail');
    }, 1000);
  });
  const p31 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('P3 Success');
    }, 2000);
  });
  
  Promise.all([p111, p21, p31])
    .then(results => console.log(results))
    .catch(err => console.error(err)); // throws error after 1 sec i.e. 'P2 Fails'

  

  Promise.allSettled([p1, p2, p3])
  .then((results) => console.log(results))
  .catch(err => console.error(err));

// Over here, it will wait for all promises to be either settled or rejected and then return,
  /*
    [
      {status: 'fulfilled', value: 'P1 Success'},
      {status: 'fulfilled', value: 'P2 Success'},
      {status: 'rejected', reason: 'P3 Fail'}
    ]
  */