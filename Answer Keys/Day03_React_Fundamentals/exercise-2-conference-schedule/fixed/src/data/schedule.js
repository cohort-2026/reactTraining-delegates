export const rooms = ["Hall A", "Room 1", "Room 2"];

export const tracks = [
  { id: "morning", heading: "Morning" },
  { id: "afternoon", heading: "Afternoon" },
  { id: "evening", heading: "Evening" },
];

export const sessions = [
  {
    id: "s1",
    title: "Welcome and coffee",
    track: "morning",
    startTime: "09:00",
    room: "Hall A",
    speaker: "Naledi Khumalo",
    seatsLeft: 40,
  },
  {
    id: "s2",
    title: "JSX in 30 minutes",
    track: "morning",
    startTime: "09:30",
    room: "Room 2",
    speaker: "Sipho Nkosi",
    seatsLeft: 0,
  },
  {
    id: "s3",
    title: "Props and children",
    track: "morning",
    startTime: "10:30",
    room: "Room 2",
    seatsLeft: 12,
  },
  {
    id: "s4",
    title: "Lists and keys",
    track: "afternoon",
    startTime: "13:00",
    room: "Room 1",
    speaker: "Lerato Mokoena",
    seatsLeft: 5,
  },
  {
    id: "s5",
    title: "Thinking in React",
    track: "afternoon",
    startTime: "14:30",
    room: "Hall A",
    speaker: "Thabo Molefe",
    seatsLeft: 25,
  },
];
