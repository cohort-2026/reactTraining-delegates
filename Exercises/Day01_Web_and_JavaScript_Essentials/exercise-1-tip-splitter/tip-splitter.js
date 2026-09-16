// Team lunch tip splitter
// Works out the tip and the total for each lunch, and how much each person pays.

function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
}

function totalWithTip(bill, percent) {
  return bill + calculateTip(bill, percent);
}

function describeLunch(lunch) {
  const total = totalWithTip(lunch.bill, lunch.percent);

  if (lunch.people = 1) {
    return lunch.place + ": total R" + total + " (no need to split)";
  }

  const each = total / lunch.people;
  return lunch.place + ": total R" + total + ", each pays R" + each;
}

const lunches = [
  { place: "Corner Café", bill: 450, percent: 10, people: 3 },
  { place: "Pizza Palace", bill: 600, percent: 15, people: 4 },
  { place: "Sushi Bar", bill: 120, percent: 20, people: 1 },
  { place: "Braai Spot", bill: 880, percent: 25, people: 5 },
];

console.log("Team lunch tip splitter");
console.log("-----------------------");

let splitCount = 0;
for (let i = 0; i <= lunches.length; i++) {
  console.log(describeLunch(lunches[i]));
  if (lunches[i].people > 1) {
    splitCount++;
  }
}

console.log("Lunches split between more than one person: " + splitCount);
