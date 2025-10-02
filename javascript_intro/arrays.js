function manageFruits() {
    let fruits = ['apple', 'banana', 'cherry'];
    console.log('fruits array:', fruits);

    console.log ('lst fruit:', fruits[0]);

    fruits.push('date');
    console.log('fruits array after push:', fruits);

    for (let i = 0; i < fruits.length; i++) {
        console.log('Fruit at index', i, ':', fruits[i])
    }
}

//manageFruits();

let person = {
    age: 15,
    name: "LynZie",
    isStudent: true,
}
let arr = [1, 3, 'stuff', person];
console.log(arr);

// jsonString = JSON.stringify(arr)
// console.log(jsonString);
// console.log(JSON.parse(jsonString));

let test = arr.splice(1,1);
console.log(test);
console.log(arr);