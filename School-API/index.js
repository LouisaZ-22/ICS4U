import express from 'express'
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const PORT = 3000
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI);

let db;
connectDB = async () => {
  await client.connect();
  db = client.db("School-API");
  console.log("MongoDB connected");
};

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
});


// teachers routes
app.get("/teachers", async (req, res) => {
  const teachers = await db.collection("teachers").find().toArray()
  res.json(teachers)
});

app.get("/teachers/:id", (req, res) => {
  const id = Number(req.params.id)
  const teacher = teachers.find(t => t.id === id)
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" })
  }
  res.json(teacher)
});


app.post("/teachers", async (req, res) => {
  const {firstName, lastName, email, department, room} = req.body
  if (!firstName || !lastName || !email || !department) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  const newTeacher = {
    // id: nextTeacherId++, (DELETE?)
    firstName,
    lastName,
    email,
    department,
    room: room || "none"
  };
  await db.collection("teachers").insertOne(newTeacher);
  res.status(201).json(newTeacher);
});


app.put("/teachers/:id", (req, res) => {
  const id = Number(req.params.id)
  const teacher = teachers.find(t => t.id === id)
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" })
  }
  const {firstName, lastName, email, department, room} = req.body
  if (!firstName && !lastName && !email && !department && !room) {
    return res.status(400).json({ error: "No fields provided to update" })
  }
  if (firstName !== undefined) teacher.firstName = firstName
  if (lastName !== undefined) teacher.lastName = lastName
  if (email !== undefined) teacher.email = email
  if (department !== undefined) teacher.department = department
  if (room !== undefined) teacher.room = room
  saveJson(TEACHERS_FILE, teachers)
  res.json(teacher)
});


app.delete("/teachers/:id", (req, res) => {
  const id = Number(req.params.id)
  const assignedCourse = courses.some(t => t.teacherId === id)
  if (assignedCourse) {
    return res.status(400).json({
      error: "Cannot delete a teacher that is still assigned to a course"
    });
  }
  const index = teacher.findIndex(t => t.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Teacher not found" })
  }
  const deleted = teachers.splice(index, 1)[0]
  saveJson(TEACHERS_FILE, teachers)
  res.json(deleted)
});


app.get("/teachers/:id/summary", (req, res) => {
  const id = Number(req.params.id)
  const teacher = teachers.find(t => t.id === id)
  if (!teacher) {
    return res.status(404).json({error: "Teacher not found"})
  }
  const teacherCourses = courses.filter(c => c.teacherId === id)
  const testCounts = []
  for (let c of teacherCourses) {
    const testCount = tests.filter(t => t.courseId === c.id).length
    testCounts.push({
      courseId: c.id,
      code: c.code,
      testCount
    })
  }
  res.json({
    teacherId: id,
    teacherName: teacher.firstName + " " + teacher.lastName,
    testCounts
  })
})



// courses routes
app.get("/courses", async (req, res) => {
  const courses = await db.collection("courses").find().toArray()
  res.json(courses)
});

app.get("/courses/:id", (req, res) => {
  const id = Number(req.params.id)
  const course = courses.find(c => c.id === id)
  if (!course) {
    return res.status(404).json({ error: "Course not found" })
  }
  res.json(course)
});


app.post("/courses", (req, res) => {
  const {code, name, teacherId, semester, room, schedule} = req.body
  if (!code || !name || !teacherId || !semester || !room) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  const newCourse = {
    id: nextCourseId++,
    code,
    name,
    teacherId: Number(teacherId),
    semester,
    room,
    schedule: schedule || "to be decided"
  }
  courses.push(newCourse)
  saveJson(COURSES_FILE, courses)
  res.status(201).json(newCourse)
});


app.put("/courses/:id", (req, res) => {
  const id = Number(req.params.id)
  const course = courses.find(c => c.id === id)
  if (!course) {
    return res.status(404).json({error: "Course not found"})
  }
  const {code, name, teacherId, semester, room, schedule} = req.body
  if (!code && !name && !teacherId && !semester && !room && !schedule) {
    return res.status(400).json({error: "No fields provided to update"})
  }
  if (teacherId !== undefined) {
    let check = teachers.find(t => t.id === Number(teacherId))
    if (!check) 
      return res.status(400).json({error: "Must provide valid teacherId"})
    course.teacherId = Number(teacherId)
  }
  if (code !== undefined) course.code = code
  if (name !== undefined) course.name = name
  if (semester !== undefined) course.semester = semester
  if (room !== undefined) course.room = room
  if (schedule !== undefined) course.schedule = schedule
  saveJson(COURSES_FILE, courses)
  res.json(course)
});


app.delete("/courses/:id", (req, res) => {
  const id = Number(req.params.id)
  const testsGiven = tests.some(t => t.courseId === id)
  if (testsGiven) {
    return res.status(400).json({
      error: "Cannot delete a course when tests from course exist"
    });
  }
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Course not found" })
  }
  const deleted = courses.splice(index, 1)[0]
  saveJson(COURSES_FILE, courses)
  res.json(deleted)
});


app.get("/courses/:id/tests", (req,res) => {
  const id = Number(req.params.id)
  const course = courses.find(c => c.id === id)
  if (!course) {
    return res.status(404).json({error: "Course not found"})
  }
  const courseTests = tests.filter(t => t.courseId === id)
  res.json(courseTests)
})


app.get("/courses/:id/average", (req,res) => {
  const id = Number(req.params.id)
  const course = courses.find(c => c.id === id)
  if (!course) {
    return res.status(404).json({error: "Course not found"})
  }
  const courseTests = tests.filter(t => t.courseId === id)
  const testCount = courseTests.length
  const averagePercent = courseTests.reduce((acc, t) => acc + (t.mark/t.outOf * 100), 0) / testCount
  res.json({
    courseId: id,
    testCount,
    averagePercent
  })
})



// students routes
app.get("/students", async (req, res) => {
  const students = await db.collection("students").find().toArray()
  res.json(students)
})

app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(s => s.id === id)
  if (!student) {
    return res.status(404).json({ error: "Student not found" })
  }
  res.json(student)
});


app.post("/students", async (req, res) => {
  const {firstName, lastName, grade, studentNumber, homeroom} = req.body
  if (!firstName || !lastName || !grade || !studentNumber) {
    return res.status(400).json({error: "Missing required fields"})
  }
  const newStudent = {
    // id: nextStudentId++,
    firstName,
    lastName,
    grade,
    studentNumber,
    homeroom: homeroom || "to be decided"
  }
  await db.collection("students").insertOne(newStudent);
  res.status(201).json(newStudent)
})


app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(s => s.id === id)
  if (!student) {
    return res.status(404).json({error: "Student not found"})
  }
  const {firstName, lastName, grade, studentNumber, homeroom} = req.body
  if (!firstName && !lastName && !grade && !studentNumber && !homeroom) {
    return res.status(400).json({error: "No fields provided to update"})
  }
  if (firstName !== undefined) student.firstName = firstName
  if (lastName !== undefined) student.lastName = lastName
  if (grade !== undefined) student.grade = Number(grade)
  if (studentNumber !== undefined) student.studentNumber = studentNumber
  if (homeroom !== undefined) student.homeroom = homeroom
  saveJson(STUDENTS_FILE, students)
  res.json(student)
});


app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id)
  const testsTaken = tests.some(t => t.studentId === id)
  if (testsTaken) {
    return res.status(400).json({
      error: "Cannot delete a student when test record for student exist"
    });
  }
  const index = students.findIndex(s => s.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" })
  }
  const deleted = students.splice(index, 1)[0]
  saveJson(STUDENTS_FILE, students)
  res.json(deleted)
});


app.get("/students/:id/tests", (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(s => s.id === id)
  if (!student) {
    return res.status(404).json({error: "Student not found"})
  }
  const studentTests = tests.filter(t => t.studentId === id)
  res.json(studentTests)
}) 


app.get("/students/:id/average", (req,res) => {
  const id = Number(req.params.id)
  const student = students.find(s => s.id === id)
  if (!student) {
    return res.status(404).json({error: "Student not found"})
  }
  const studentTests = tests.filter(t => t.studentId === id)
  const testCount = studentTests.length
  const averagePercent = studentTests.reduce((acc, t) => acc + (t.mark/t.outOf * 100), 0) / testCount
  res.json({
    studentId: id,
    testCount,
    averagePercent
  })
})



// tests routes
app.get("/tests", async (req, res) => {
  const tests = await db.collection("tests").find().toArray()
  res.json(tests);
});

app.get("/tests/:id", (req, res) => {
  const id = Number(req.params.id);
  const test = tests.find(t => t.id === id);
  if (!test) {
    return res.status(404).json({ error: "Test not found" });
  }
  res.json(test);
});


app.post("/tests", (req, res) => {
  const {studentId, courseId, testName, date, mark, outOf, weight} = req.body
  if (!studentId || !courseId || !testName || !date || !mark || !outOf) {
    return res.status(400).json({error: "Missing required fields"})
  }
  const newTest = {
    id: nextTestId++,
    studentId: Number(studentId),
    courseId: Number(courseId),
    testName,
    date,
    mark: Number(mark),
    outOf: Number(outOf),
    weight: Number(weight) || "to be decided"
  }
  tests.push(newTest)
  saveJson(TESTS_FILE, tests)
  res.status(201).json(newTest)
})


app.put("/tests/:id", (req, res) => {
  const id = Number(req.params.id)
  const test = tests.find(t => t.id === id)
  if (!test) {
    return res.status(404).json({error: "Course not found"})
  }
  const {studentId, courseId, testName, date, mark, outOf, weight} = req.body
  if (!studentId && !courseId && !testName && !date && !mark && !outOf && !weight) {
    return res.status(400).json({error: "No fields provided to update"})
  }
  if (studentId !== undefined) {
    let check = students.find(s => s.id === Number(studentId))
    if (!check) 
      return res.status(400).json({error: "Must provide valid studentId"})
    test.studentId = Number(studentId)
  }
  if (courseId !== undefined) {
    let check = courses.find(c => c.id === Number(courseId))
    if (!check) 
      return res.status(400).json({error: "Must provide valid courseId"})
    test.courseId = Number(courseId)
  }
  if (testName !== undefined) test.testName = testName
  if (date !== undefined) test.date = date
  if (mark !== undefined) test.mark = mark
  if (outOf !== undefined) test.outOf = outOf
  if (weight !== undefined) test.weight = weight
  saveJson(TESTS_FILE, tests)
  res.json(test)
});


app.delete("/tests/:id", (req, res) => {
  const id = Number(req.params.id)
  const index = tests.findIndex(t => t.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Test not found" })
  }
  const deleted = tests.splice(index, 1)[0]
  saveJson(TESTS_FILE, tests)
  res.json(deleted)
});