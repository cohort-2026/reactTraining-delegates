// Lab 1.3: Tip Calculator and Grade Checker
// Run with: node lab1-3.js

// Step 2: return the tip for a bill
function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
  return tip;
}

// Step 3: reuse calculateTip to get the total
function totalWithTip(bill, percent) {
  return bill + calculateTip(bill, percent);
}

console.log("Tip: R" + calculateTip(450, 15));
console.log("Total with tip: R" + totalWithTip(450, 15));

// Step 4: turn a score into a grade
function getGrade(score) {
  if (score >= 80) {
    return "Distinction";
  } else if (score >= 50) {
    return "Pass";
  } else {
    return "Try again";
  }
}

// Step 5: an array of 4 student objects
const students = [
  { name: "Ayanda", score: 82 },
  { name: "Sipho", score: 64 },
  { name: "Lerato", score: 47 },
  { name: "Kagiso", score: 50 },
];

// Steps 6 and 7: log each student's grade and count the passes
let passed = 0;

for (let i = 0; i < students.length; i++) {
  const grade = getGrade(students[i].score);
  console.log(students[i].name + ": " + grade);
  if (grade !== "Try again") {
    passed++;
  }
}

console.log("Passed: " + passed + " of " + students.length);
