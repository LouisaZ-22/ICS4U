import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express();
const PORT = 3000;

app.use(express.json());

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Error parsing", filePath, err);
    return [];
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const TEACHERS_FILE = path.join("", "teachers.json");
const COURSES_FILE = path.join("", "courses.json");
const STUDENTS_FILE = path.join("", "students.json");
const TESTS_FILE = path.join("", "tests.json");

let teachers = loadJson(TEAMS_FILE);
let courses = loadJson(TEAMS_FILE);
let students = loadJson(TEAMS_FILE);
let tests = loadJson(TEAMS_FILE);

let nextTeacherId = teachers.reduce((max, t) => Math.max(max, t.id), 0) + 1;
let nextCourseId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
let nextStudentId = studnets.reduce((max, s) => Math.max(max, s.id), 0) + 1;
let nextTestId = teams.reduce((max, t) => Math.max(max, t.id), 0) + 1;