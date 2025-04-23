// 🌟 Creating an array of student objects
const students = [
    { name: "Alice", age: 22, grades: [85, 90, 88] },
    { name: "Bob", age: 19, grades: [78, 82, 80] },
    { name: "Charlie", age: 21, grades: [92, 95, 91] },
    { name: "David", age: 18, grades: [70, 75, 72] },
    { name: "Eve", age: 23, grades: [88, 90, 85] }
];

// 🌟 Using map() to create an array of student names
const studentNames = students.map(student => student.name);
console.log("Student Names:", studentNames);

// 🌟 Using filter() to find students older than 20
const studentsOlderThan20 = students.filter(student => student.age > 20);
console.log("Students Older Than 20:", studentsOlderThan20);

// 🌟 Using reduce() to find the average grade for all students
const totalGrades = students.reduce((sum, student) => {
    const studentAverage = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
    return sum + studentAverage;
}, 0);
const averageGradeAll = totalGrades / students.length;
console.log("Average Grade of All Students:", averageGradeAll.toFixed(2));

// 🌟 Chaining methods: Find the average grade of students older than 20
const avgGradeOlderThan20 = students
    .filter(student => student.age > 20)
    .map(student => student.grades.reduce((a, b) => a + b, 0) / student.grades.length)
    .reduce((sum, avg) => sum + avg, 0) / studentsOlderThan20.length;

console.log("Average Grade of Students Older Than 20:", avgGradeOlderThan20.toFixed(2));
