const prompt = require('prompt-sync')();

function checkTemperature(temp) {
    if (temp > 30) {
        console.log('HOT outside!');
    } else if (temp > 20) {
        console.log('warm outside :)');
    } else {
        console.log('cooold outside')
    }
}

let t = parseFloat(prompt('Enter the temperature: '));
checkTemperature(t);