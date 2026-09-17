// Sprint report
// Prints the progress of each sprint, looks up tasks by id and totals the points.

const sprints = [
  {
    name: "Sprint 11",
    tasks: [
      { id: 1, title: "Add search box", assignee: "Lerato", points: 8, done: false },
      { id: 2, title: "Set up project", assignee: "Zanele", points: 2, done: true },
      { id: 3, title: "Design login page", assignee: "Naledi", points: 3, done: true },
      { id: 4, title: "Write README", assignee: "Thabo", points: 1, done: true },
      { id: 5, title: "Build task list", assignee: "Sipho", points: 5, done: true },
    ],
  },
  {
    name: "Sprint 12",
    tasks: [
      { id: 6, title: "Fix typo in footer", assignee: "Naledi", points: 1, done: true },
      { id: 7, title: "Add dark mode", assignee: "Zanele", points: 5, done: false },
      { id: 8, title: "Deploy to production", assignee: "Sipho", points: 3, done: true },
      { id: 9, title: "Write tests", assignee: "Lerato", points: 8, done: false },
    ],
  },
];

function countDone(tasks) {
  let doneCount = 0;
  for (let i = 0; i < tasks.length; i++) { // tricky bug, had to start the array from 0 instead of 1
    if (tasks[i].done) {
      doneCount++;
    }
  }
  return doneCount;
}

function getStatus(percent) {
  if (percent >= 80) { // fixed order of priority for if statement
    return "Ahead";
  } else if (percent >= 50) { // this was never reached because of line 37
    return "On track";
  } else {
    return "Behind";
  }
}

function findTask(tasks, id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
    // else {
    //   return null;
    // }
    // this else statement was causing the first iteration of the loop to return null and break the code
  }
  return null;
}

function describeTask(task) {
  return task.title + " (" + task.assignee + ")"; // typo on assigne to be assignee
}

function printLookup(tasks, id) {
  const task = findTask(tasks, id);
  if (task === null) {
    console.log("Task " + id + ": not found");
  } else {
    console.log("Task " + id + ": " + describeTask(task));
  }
}

function totalPoints(tasks) {
  let total = 0; // let over const for a mutable variable
  for (let i = 0; i < tasks.length; i++) {
    total = total + tasks[i].points;
  }
  return total;
}

console.log("Sprint report");
console.log("=============");

for (let s = 0; s < sprints.length; s++) {
  const sprint = sprints[s];
  const done = countDone(sprint.tasks);
  const percent = (done / sprint.tasks.length) * 100;
  console.log(
    sprint.name + ": " + done + " of " + sprint.tasks.length +
      " tasks done (" + percent + "%) - " + getStatus(percent)
  );
}

printLookup(sprints[0].tasks, 3);
printLookup(sprints[1].tasks, 6);

let grandTotal = 0;
for (let s = 0; s < sprints.length; s++) {
  grandTotal = grandTotal + totalPoints(sprints[s].tasks);
}
console.log("Total points across all sprints: " + grandTotal);
