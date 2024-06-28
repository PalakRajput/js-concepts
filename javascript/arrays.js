const arr = [5, 4, 3, 2, 1];

console.log("Array length is ", arr.length);

console.log("Initial array is ", arr);

const filteredArr = arr.filter((num) => num % 2 == 0);
console.log("Filtered array is ", filteredArr);

const mappedArray = arr.map((num) => num * 2);
console.log("Multiplied array is ", mappedArray);

const reducedVal = arr.reduce((previous, current) => previous + current, 0);
console.log("Reduced value of arr is ", reducedVal);

arr.push(6);
const newArrayLength = arr.push(7);
console.log("New array length after pushing 2 elements is ", newArrayLength);

let joinedArrayString = arr.join("-");
console.log("Joined array string: ", joinedArrayString);

const combinedArrays = arr.concat([8, 9, 10]);
console.log("Combined array with concat: ", combinedArrays);

//Sorts array in place and return reference to the original array, default order is ascending order.
arr.sort();
console.log("Sorted array: ", arr);

let removedElement = arr.pop();

console.log("Array after removing element: ", arr);

//This returns first value where predicate is true or else undefined
let numGreaterThanFour = arr.find((x) => x > 4);

const arrWithTwoElements = arr.slice(0, 2);
console.log("Array with two elements using slice: ", arrWithTwoElements);

const arrWithAllElementExcepLastTwo = arr.slice(0, -2);
console.log(
  "Array with all elements from start before last second element(-2): ",
  arrWithAllElementExcepLastTwo
);

//It changes original array
const splicedArray = arr.splice(3);
console.log(
  "Spliced array(returns array from specified position): ",
  splicedArray
);
console.log("Original array: ", arr);
//First param is index, second param is the delete count which means starting index 2 1 element will be deleted
arr.splice(2, 1);

//It returns -1 if element is not found else returns first index
const indexOfOne = arr.indexOf(1);

const lastIndexOfOne = arr.lastIndexOf(1);

//Checks if any element in the input array satisfies the given predicate.
const isConditionSatisfied = arr.some((x) => x > 10);
