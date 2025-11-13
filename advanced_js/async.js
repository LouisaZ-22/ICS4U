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
                // callback(undefined, data)
                resolve(data)
            } 
            else if (request.readyState === 4) {
                // callback('could not fetch data', undefined)
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
    })
})

// promise (chaining)
getTodos('todos.json').then(data => {         // fires if 1st promise resolved
    console.log('promise 1 resolved:', data)
    return getTodos('https://jsonplaceholder.typicode.com/todos/')
}).then(data => {                             // fires if 1st and 2nd promise resolved
    console.log('promise 2 resolved:', data)
}).catch(err => {                             // fires if any are rejected
    console.log('promise rejected:', err)
})



// fetch API => basically built-in getTodos, 2 asynchronous actions
fetch('todos.json').then(response => {
    console.log('resolved', response)     // returns response, not data, only rejects if network error
    return response.json()
}).then(data => {                         // returns data, check for other errors e.g. status
    console.log(data)
}).catch(err => {
    console.log('rejected', err)
})


const getTodos2 = async() => {
    const response = await fetch('todos.json')
    console.log(response)
}