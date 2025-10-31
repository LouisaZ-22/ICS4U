// console.log(1);
// console.log(2);

// setTimeout(() => {
//     console.log('callback function fired')
// }, 2000)

// console.log(3);
// console.log(4);


const getTodos = (callback) => {
    const request = new XMLHttpRequest()    //readystate 0

    request.addEventListener('readystatechange', () => {    //listen for events
        console.log(request, request.readyState)

        if (request.readyState === 4 && request.status === 200) {    //check for state + errors
            // console.log(request.responseText)
            callback(undefined, request.responseText)
        } 
        else if (request.readyState === 4) {
            // console.log('could not fetch data')
            callback('could not fetch data', undefined)
        }
    })

    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/')    //set up (request type, endpoint), 1
    request.send()    //readystate 2
                      //3-- loading + response text, 4 -- done
}

getTodos((err, data) => {
    console.log('callback fired')    // callback => called in another function, whenever (condition) happens
});
