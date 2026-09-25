// Lab 1.3: Tip Calculator and Grade Checker
// Run with: node lab1-3.js
// Run the file after every step, not just at the end.

// TODO (step 2): return the tip for a bill.
// Example: calculateTip(450, 15) should return 67.5
function calculateTip(bill, percent) {
  // your code here
  const tip = bill * (percent / 100);
  return tip;
}

// TODO (step 3): return the bill plus the tip. Reuse calculateTip; do not repeat the maths.
// Example: totalWithTip(450, 15) should return 517.5
function totalWithTip(bill, percent) {
  // your code here
  return bill + calculateTip(bill, percent);
}

console.log("Tip: R" + calculateTip(450, 15));
console.log("Total with tip: R" + totalWithTip(450, 15));

// TODO (step 4): return "Distinction" for 80 or more, "Pass" for 50 or more,
// and "Try again" for anything lower.
function getGrade(score) {
  // your code here
  if (score >= 80) {
    return "Distinction";
  } else if (score >= 50) {
    return "Pass";
  } else {
    return "Try again";
  }
}

// TODO (step 5): create an array called students with 4 objects,
// each with a name and a score. Include at least one score below 50.
const students = [
  { name: "Ayanda", score: 82 },
  { name: "Sipho", score: 64 },
  { name: "Lerato", score: 47 },
  { name: "Kagiso", score: 50 } 
];

// TODO (step 6): loop through the students and log each name with their grade,
// for example: Ayanda: Distinction
for (const student of students) {
  const grade = getGrade(student.score);
  console.log(`${student.name}: ${grade}`);
}

// TODO (step 7): count how many students passed (any grade except "Try again")
// and log the total, for example: Passed: 3 of 4
let passedCount = 0;
for (const student of students) {
  if (getGrade(student.score) !== "Try again") {
    passedCount++;
  }
}
console.log(`Passed: ${passedCount} of ${students.length}`);
  