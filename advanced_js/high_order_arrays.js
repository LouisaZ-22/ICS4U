const nums = [1,2,3,4,5,6,7,8,9,0]

// square array
const sqrArr = nums.map(n => n * n)
console.log(sqrArr)


// students with > 80 grades
const students = [{name: 'Elliot', grade: '94'}, {name: 'Benjamin', grade: 80}, {name: 'Keianna', grade: 71}]
const eighties = students.filter(s => s.grade > 80)
console.log(eighty)


// sum array
const sumArr = nums.reduce((acc, num) => acc + num, 0)
console.log(sumArr)


// greet each person
const names = ["Eleanor", "Amber", "Oliver", "Jace"]
const greetings = names.forEach(name => console.log(`Hello, ${name}!`))


// 1st product > 50
const products = [{name: 'deskmat', price: 25}, {name: 'cheeses', price: 51}, {name: 'n dog', price: 10000}]
const firstFifty = products.find(p => p.price > 50)
console.log(firstFifty)


// if any negative numbers
const hasNegative = nums.some(num => num < 0)
console.log(hasNegative)


// if all books available
const books = [{title: 'The Lightning Thief', isAvailable: true}, {title: 'The Last Olympian', isAvailable: true}]
const allAvailable = books.every(b => b.isAvailable)
console.log(allAvailable)


// index of 1st employee > 5
const employees = [{name: 'N', years: 4}, {name: 'V', years: 5}, {name: 'J', years: 6}]
const index = employees.findIndex(e => e.years > 5)
console.log(index)


// flatten and multiply by 3
const nums2D = [[1,2], [3,4,5], [6,8]]
const flatArr = nums2D.flatMap(nums => nums.map(n => n * 3))
console.log(flatArr)


// sort movies by release year
const movies = [{title: '1', year: 2022}, {title: '2', year: 1993}, {title: '3', year: 2000}]
const sortArr = movies.sort((m1, m2) => m1.year - m2.year)
console.log(sortArr)