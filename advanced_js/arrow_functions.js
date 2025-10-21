let add = (x, y) => x + y   
// block syntax: use {}, if more than one line
//               {return x + y} since doesn't return automatically

console.log(add(5,6))


// return true/green if even, false/red if not
let isEven = (x) => x % 2 == 0
let colourEven = (x) => x % 2 == 0 ? 'green' : 'red'

console.log(isEven(2))
console.log(colourEven(1))


// squares of array
const arr = [1,-2,3,4,-5,6,7,8,-9]

let sqrArr = (arr) => {
    let tempArr = []
    for (let x of arr) {
        tempArr.push(x*x)
    }
    return tempArr
}
console.log(sqrArr(arr))


// when no parameters
let printLine = () => (console.log("-----------------------------"))


// return only positive numbers
let onlyPositive = (arr) => {
    let tempArr = []
    for (let x of arr) {
        if (x > 0) {
            tempArr.push(x)
        }
    }
    return tempArr
}
console.log(onlyPositive(arr))


// calculate factorial
let factorial = (n) => {
    let ans = 1
    for (let i = 2; i <= n; i++) {
        ans *= i
    }
    return ans
}
console.log(factorial(5))


// sort an array
let sortArr = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr
}
console.log(sortArr(arr))


// check if palindrome
let isPalindrome = (x) => {
    //??
}


// find max value in array
let maxArr = (arr) => {
    let max = arr[0]
    for (let x of arr) {
        if (x > max) {
            max = x
        }
    }
    return max
}
console.log(maxArr(arr))


// convert farenheit to celsius
let findCelsius = (f) => (f - 32) * 5 / 9
console.log(findCelsius(20))


// array of string lengths
const arr2 = ['stuff', 'and', 'things', 'and', 'other', 'random', 'words'] 

let strlenArr = (arr) => {
    let tempArr = []
    for (let s of arr) {
        tempArr.push(s.length)
    }
    return tempArr
}
console.log(strlenArr(arr2))