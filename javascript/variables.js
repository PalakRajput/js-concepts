var x = 10;
let y = 10;
const z = 30;

x = 35;
y = 15;
// z = 30; error initializing value to a const again

console.log("In global scpoe: ", x, y, z)

function fun1(){
    var x = 50;
    let y = 40;
    const z = 90;
    console.log("Inside function fun1()", x, y, z)
}

fun1();

function func2() {
    var y = 22;
    let x = 33;
    console.log("Inside function fun2()", x, y)
}

func2();

console.log("In global scope", x, y, z)

//var y = 20; Cannot redeclare block-scoped variable 'y'

{
    //var y = 20; Cannot redeclare block-scoped variable 'y' because y is already declared in global scpe with let.
    let x = 40;
    console.log("Inside a block", x, y, z)
}

