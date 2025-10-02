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

manageFruits();