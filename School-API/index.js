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
  db = client.db(process.env.MONGO_DB_NAME);
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

app.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(req.params.id) });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(teacher);
  } catch {
    res.status(400).json({ error: "Invalid teacher id" });
  }
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


app.put("/teachers/:id", async (req, res) => {
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }
  try {
    const result = await db.collection("teachers").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updates },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid teacher id" });
  }
});


app.delete("/teachers/:id", async (req, res) => {
  try {
    const teacherId = new ObjectId(req.params.id);

    const assignedCourse = await db.collection("courses")
      .findOne({ teacherId });

    if (assignedCourse) {
      return res.status(400).json({
        error: "Cannot delete a teacher that is still assigned to a course"
      });
    }

    const result = await db.collection("teachers")
      .findOneAndDelete({ _id: teacherId });

    if (!result.value) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid teacher id" });
  }
});



app.get("/teachers/:id/summary", async (req, res) => {
  try {
    const teacherId = new ObjectId(req.params.id);

    const teacher = await db.collection("teachers")
      .findOne({ _id: teacherId });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const teacherCourses = await db.collection("courses")
      .find({ teacherId })
      .toArray();

    const testCounts = await Promise.all(
      teacherCourses.map(async c => {
        const count = await db.collection("tests")
          .countDocuments({ courseId: c._id });

        return {
          courseId: c._id,
          code: c.code,
          testCount: count
        };
      })
    );

    res.json({
      teacherId: teacher._id,
      teacherName: `${teacher.firstName} ${teacher.lastName}`,
      testCounts
    });
  } catch {
    res.status(400).json({ error: "Invalid teacher id" });
  }
});




// courses routes
app.get("/courses", async (req, res) => {
  const courses = await db.collection("courses").find().toArray()
  res.json(courses)
});

app.get("/courses/:id", async (req, res) => {
  try {
    const course = await db.collection("courses")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
});



app.post("/courses", async (req, res) => {
  const { code, name, teacherId, semester, room, schedule } = req.body;

  if (!code || !name || !teacherId || !semester || !room) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const teacher = await db.collection("teachers")
    .findOne({ _id: new ObjectId(teacherId) });

  if (!teacher) {
    return res.status(400).json({ error: "Invalid teacherId" });
  }

  const newCourse = {
    code,
    name,
    teacherId: teacher._id,
    semester,
    room,
    schedule: schedule || "to be decided"
  };

  const result = await db.collection("courses").insertOne(newCourse);
  res.status(201).json({ _id: result.insertedId, ...newCourse });
});



aapp.put("/courses/:id", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    if (req.body.teacherId) {
      const teacherExists = await db.collection("teachers")
        .findOne({ _id: new ObjectId(req.body.teacherId) });
      if (!teacherExists) {
        return res.status(400).json({ error: "Invalid teacherId" });
      }
      req.body.teacherId = new ObjectId(req.body.teacherId);
    }

    const result = await db.collection("courses").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
});



app.delete("/courses/:id", async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const hasTests = await db.collection("tests")
      .findOne({ courseId });

    if (hasTests) {
      return res.status(400).json({
        error: "Cannot delete a course when tests from course exist"
      });
    }

    const result = await db.collection("courses")
      .findOneAndDelete({ _id: courseId });

    if (!result.value) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
});



app.get("/courses/:id/tests", async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const course = await db.collection("courses").findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const tests = await db.collection("tests")
      .find({ courseId })
      .toArray();

    res.json(tests);
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
});



app.get("/courses/:id/average", async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);

    const course = await db.collection("courses").findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const tests = await db.collection("tests")
      .find({ courseId })
      .toArray();

    if (tests.length === 0) {
      return res.json({ courseId, testCount: 0, averagePercent: 0 });
    }

    const averagePercent =
      tests.reduce((sum, t) => sum + (t.mark / t.outOf) * 100, 0) / tests.length;

    res.json({
      courseId,
      testCount: tests.length,
      averagePercent
    });
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
});




// students routes
app.get("/students", async (req, res) => {
  const students = await db.collection("students").find().toArray()
  res.json(students)
})

app.get("/students/:id", async (req, res) => {
  try {
    const student = await db.collection("students")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch {
    res.status(400).json({ error: "Invalid student id" });
  }
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


app.put("/students/:id", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    const result = await db.collection("students").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid student id" });
  }
});



app.delete("/students/:id", async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const hasTests = await db.collection("tests")
      .findOne({ studentId });

    if (hasTests) {
      return res.status(400).json({
        error: "Cannot delete a student when test records exist"
      });
    }

    const result = await db.collection("students")
      .findOneAndDelete({ _id: studentId });

    if (!result.value) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid student id" });
  }
});



app.get("/students/:id/tests", async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const student = await db.collection("students").findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const tests = await db.collection("tests")
      .find({ studentId })
      .toArray();

    res.json(tests);
  } catch {
    res.status(400).json({ error: "Invalid student id" });
  }
});



app.get("/students/:id/average", async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);

    const student = await db.collection("students").findOne({ _id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const tests = await db.collection("tests")
      .find({ studentId })
      .toArray();

    if (tests.length === 0) {
      return res.json({ studentId, testCount: 0, averagePercent: 0 });
    }

    const averagePercent =
      tests.reduce((sum, t) => sum + (t.mark / t.outOf) * 100, 0) / tests.length;

    res.json({
      studentId,
      testCount: tests.length,
      averagePercent
    });
  } catch {
    res.status(400).json({ error: "Invalid student id" });
  }
});




// tests routes
app.get("/tests", async (req, res) => {
  const tests = await db.collection("tests").find().toArray()
  res.json(tests);
});

app.get("/tests/:id", async (req, res) => {
  try {
    const test = await db.collection("tests")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(test);
  } catch {
    res.status(400).json({ error: "Invalid test id" });
  }
});



app.post("/tests", async (req, res) => {
  const { studentId, courseId, testName, date, mark, outOf, weight } = req.body;

  if (!studentId || !courseId || !testName || !date || !mark || !outOf) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const student = await db.collection("students")
    .findOne({ _id: new ObjectId(studentId) });
  const course = await db.collection("courses")
    .findOne({ _id: new ObjectId(courseId) });

  if (!student || !course) {
    return res.status(400).json({ error: "Invalid studentId or courseId" });
  }

  const newTest = {
    studentId: student._id,
    courseId: course._id,
    testName,
    date,
    mark: Number(mark),
    outOf: Number(outOf),
    weight: weight || "to be decided"
  };

  const result = await db.collection("tests").insertOne(newTest);
  res.status(201).json({ _id: result.insertedId, ...newTest });
});



app.put("/tests/:id", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    if (req.body.studentId) {
      const s = await db.collection("students")
        .findOne({ _id: new ObjectId(req.body.studentId) });
      if (!s) return res.status(400).json({ error: "Invalid studentId" });
      req.body.studentId = new ObjectId(req.body.studentId);
    }

    if (req.body.courseId) {
      const c = await db.collection("courses")
        .findOne({ _id: new ObjectId(req.body.courseId) });
      if (!c) return res.status(400).json({ error: "Invalid courseId" });
      req.body.courseId = new ObjectId(req.body.courseId);
    }

    const result = await db.collection("tests").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid test id" });
  }
});


app.delete("/tests/:id", async (req, res) => {
  try {
    const result = await db.collection("tests")
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });

    if (!result.value) {
      return res.status(404).json({ error: "Test not found" });
    }

    res.json(result.value);
  } catch {
    res.status(400).json({ error: "Invalid test id" });
  }
});
