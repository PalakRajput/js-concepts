console.log(fun1);
//console.log(fun2); ReferenceError: Cannot access 'fun2' before initialization
//console.log(fun);  ReferenceError: Cannot access 'fun' before initialization

setTimeout(() => {
  console.log("Inside callback function");
  console.log("I am callback function");
}, 1000);

function fun1() {
  console.log("Inside function 1");
  console.log("This is called as function declaration, hoisted on top");
}

let fun2 = function () {
  console.log("Inside function 2");
  console.log(
    "This is called as function expression or anonymous, not hoisted"
  );
};

let fun = function fun3() {
  console.log("Inside function 3");
  console.log("This is called as named function expression, not hoisted");
};

fun1();
fun2();
fun();

function fun4(fun) {
  console.log(
    "I am fun4 and returning an anonymous function which will have access to: ",
    fun
  );
  return function () {
    console.log("I am nested in fun4 and I have access to my parent scope");

    fun();
  };
}

let fun5 = fun4(() => console.log("I am arrow function"));

fun5();

function fun6(x, y) {
  let z = x + y;
  let a = function (b) {
    console.log("Summation of x & y is: ", z);
    console.log(`Multiplied by ${b} gives: `, z * b);
  };
  return a;
}

let fun7 = fun6(3, 4);
fun7(3);
fun7(4);

function fun8() {
  for (var i = 1; i < 6; i++) {
    setTimeout(() => {
      console.log("Value of i from setTimeout(() => {}, timer)fun8 is ", i); //prints 6 because this remembers reference to i and not the value itself
    }, i * 10);
  }
  console.log("Inside function 8");
}

fun8();

function fun9() {
  for (let i = 1; i < 6; i++) {
    setTimeout(() => {
      console.log("Value of i from setTimeout(() => {}, timer)fun9 is ", i);
    }, i * 100);
  }
  console.log("Inside function 9");
}

fun9();

function fun10() {
  for (var i = 1; i <= 5; i++) {
    function close(i) {
      setTimeout(function () {
        console.log("Value of i from setTimeout(() => {}, timer)fun10 is ", i);
      }, i * 1000);
      // put the setT function inside new function close()
    }
    close(i); // everytime you call close(i) it creates new copy of i. Only this time, it is with var itself!
  }
  console.log("Inside fun10");
}

fun10();
