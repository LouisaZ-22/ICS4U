let person = {
    age: 15,
    name: "LynZie",
    isStudent: true,
    print(){
        console.log(`My name is ${this.name}`);
    }
};

// const age = 'age';
// console.log(person.age);
// console.log(person['age']);
// console.log(person[age]);

// for (let key in person) {
//     console.log(`${key} stores ${person[key]}`);
// }

// console.log(person.print());


let calculator = {
    add: function(x,y) {
        return x + y;
    },
    subtract(x,y) {
        return x - y;
    }
}

// console.log(calculator.add(4,5));
// console.log(JSON.stringify(calculator));
// console.log('-------------------')
// console.log(calculator);