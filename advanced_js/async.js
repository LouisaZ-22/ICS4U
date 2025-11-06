// console.log(1);
// setTimeout(() => {
//     console.log('callback function fired')
// }, 2000)
// console.log(2);


const getTodos = (resource, callback) => {
    return new Promise((resolve, reject) => {   // different function for 2 outcomes
        const request = new XMLHttpRequest()    // readystate 0

        request.addEventListener('readystatechange', () => {    // listen for events
            console.log(request, request.readyState)

            // check state + errors: 200s ok, 400s client side, 500s server side
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText)    // turn JSON string into object array
                callback(undefined, data)
                resolve(data)
            } 
            else if (request.readyState === 4) {
                callback('could not fetch data', undefined)
                reject('error getting resource')
            }
        })

        request.open('GET', resource) // readystate 1: set up (request type, endpoint)
        request.send()    // readystate 2
        // readystate 3: loading + response text, readystate 4: done
    })
}



// callback hell (without Promise) => nested requests to do one after another
getTodos('todos.json', (err, data) => {    // callback function => specify what to do with data after retrieve
    console.log("callback fired", data)

    getTodos('https://jsonplaceholder.typicode.com/todos/', (err, data) => {
        console.log(err, data)
    });
});

// promise
getTodos('todos.json').then(data => {         // this function fires if resolved
    console.log('promise resolved:', data)
}).catch(err => {                             // this function fires if rejected
    console.log('promise rejected:', err)
})

// promise
const getSomething = () => {
    return new Promise((resolve, reject) => {
        // fetch something
        resolve('some data')
        reject('some error')
    });
}

getSomething().then(data => {    // this function fires if resolved
    console.log(data)
}, err => {                      // this function fires if rejected
    console.log(err)
})
// OR
getSomestuff().then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})