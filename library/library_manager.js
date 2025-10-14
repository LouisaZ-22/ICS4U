import books from './books.js'
import promptSync from 'prompt-sync'

const prompt = promptSync()
let isRunning = true


while (isRunning) {
    displayMenu()
    let option = prompt('What would you like to do today? Enter an option: ')

    switch (option) {
        case '1':
            addBook()
            break
        case '2':
            availableBooks()
            break
        case '3':
            borrowBook()
            break
        case '4':
            returnBook()
            break
        case '5':
            searchByAuthor()
            break
        case '6':
            searchByYear()
            break
        case '7':
            removeBook()
            break
        case '8':
            isRunning = false
            console.log('bye bye ;)')
            break
        default:
            console.log('Invalid option, try again :( \n')
    }
}

function addBook() {
    let t = prompt('Enter the title: ');
    let a = prompt('Enter the author: ');
    let yr = prompt('Enter the year: ');

    let book = {
        title: t,
        author: a,
        year: yr,
        isAvailable: true
    };
    books.push(book);
    console.log(`the book ${t} has been added :) \n`)
}

function availableBooks() {
    for (let b of books) {
        if (b.isAvailable) {
            console.log(b.title);
        }
    }
    console.log('\n')
}

function borrowBook() {
    let t = prompt('Enter the title: ')
    let book;
    for (let b of books) {
        if (b.title === t) {
            book = b;
            break;
        }
    }
    if (book === undefined) {
        console.log('Invalid title :( \n');
    } else if (!book.isAvailable) {
        console.log('That book is currently not avaiable :( \n');
    } else {
        book.isAvailable = false;
        console.log(`the book "${t}" has been taken out :D \n`)
    }
}

function returnBook() {
    let t = prompt('Enter the title: ')
    let book;
    for (let b of books) {
        if (b.title === t) {
            book = b;
            break;
        }
    }
    if (book === undefined) {
        console.log('Invalid title :( \n');
    } else if (book.isAvailable) {
        console.log('Umm excuse me? You cant return that book because you dont have it lol XD \n');
    } else {
        book.isAvailable = true;
        console.log(`the book "${t}" has been returned :D \n`);
    }
}

function searchByAuthor() {
    let a = prompt('Enter an author: ')
    for (let b of books) {
        if (b.author === a) {
            console.log(b.title)
        }
    }
    console.log('\n')
}

function searchByYear() {
    let yr = prompt('Enter a year: ');
    for (let b of books) {
        if (b.year < yr) {
            console.log(b.title);
        }
    }
    console.log('\n')
}

function removeBook() {
    let t = prompt('Enter the title: ')
    for (let i in books) {
        if (books[i].title === t) {
            books.splice(i, 1);
            console.log(`the book "${t}" has been removed :) \n`);
            return;
        }
    }
    console.log('Invalid title :( \n');
}

function displayMenu() {
    console.log('MENU')
    console.log('1: add a book to the library')
    console.log('2: list available books')
    console.log('3: borrow a book')
    console.log('4: return a book')
    console.log('5: list books by a certain author')
    console.log('6: list books before a certain year')
    console.log('7: remove a book')
    console.log('8: exit program')
    console.log('-------------------')
}