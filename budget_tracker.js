const prompt = require('prompt-sync')();

let budget = parseFloat(prompt('Enter your budget: '));
let array = [];
let total = 0;
let option = 0;
let isRunning = true;

function addExpense(amount, category) {
    let expense = {
        amt: amount,
        cat: category
    };
    array.push(expense);
    total += expense.amt;
    console.log('an expense was added \n');
}

function calculateTotal() {
    console.log('your total expense is ', total, '\n');
}

function checkBudget() {
    if (total > budget) {
        console.log('your expenses have exceed your budget, you should spend less >:( \n');
    } else if (total < budget) {
        console.log('your expenses are less than your budget, ur doing good right now :D \n');
    } else {
        console.log('your expenses and your budget are equal :) \n');
    }
}

function removeExpense(category) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].cat == category) {
            array.splice(i,1);
            total -= array[i].amt;
            console.log('an expense has been removed \n');
            break;
        }
    }
}


while (isRunning) {
    option = parseFloat(prompt('Enter 1 to add expense, 2 to view total expenses, 3 to check budget, 4 to remove expense, 5 to exit program: '));

    switch (option) {
        case 1:
            let amount = parseFloat(prompt('Enter the amount: '));
            let category1 = prompt('Enter the category: ');
            addExpense(amount, category1);
            break;
        case 2:
            calculateTotal();
            break;
        case 3:
            checkBudget();
            break;
        case 4:
            let category2 = prompt('Enter the category: ');
            removeExpense(category2);
            break;
        case 5:
            console.log('bye bye ;)');
            isRunning = false;
            break;
        default:
            console.log('Invalid option, try again please :( \n');
            break;
    }
}   

