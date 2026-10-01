// TODO (Lab 5.1): render ProductSearch here while you work on the lab.
// TODO (Lab 5.2): render WeatherDashboard here while you work on the lab.
// TODO (Lab 5.3 steps 2-5): replace useState with useLocalStorage("tasks", null), seed the board from
//   JSONPlaceholder when tasks is null, and show a loading message while seeding.
// TODO (Lab 5.3 step 8): add a Reset board button.
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Board from "./components/Board.jsx";
import WeatherDashboard from "./components/weather/WeatherDashboard.jsx";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null);

  useEffect(() => {
    if (tasks === null) {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(function(res) {
          return res.json();
        })
      .then(function(data) {
          const newTasks = [];
          for (let i = 0; i < data.length; i++) {
            newTasks.push({
              id: data[i].id,
              title: data[i].title,
              status: "todo",
              points: 1,
              assignee: ""
            });
          }
          setTasks(newTasks);
        });
    }
  }, []);

  useEffect(function() {
    if (tasks!== null) {
      const openCount = tasks.filter(function(t) {
        return t.status!== "done";
      }).length;
      document.title = "(" + openCount + ") TaskBoard";
    }
  }, [tasks]);

  if (tasks === null) {
    return <p>Loading tasks...</p>;
  }

  function handleReset() {
    localStorage.removeItem("tasks");
    window.location.reload();
  }

  function handleAdd(newTask) {
    const id = crypto.randomUUID();
    setTasks(function(prev) {
      return [...prev, {...newTask, id, status: "todo"}];
    });
  }

  function handleStatusChange(id, status) {
    setTasks(function(prev) {
      return prev.map(function(t) {
        if (t.id === id) {
          return {...t, status: status};
        }
        return t;
      });
    });
  }

  function handleRename(id, title) {
    setTasks(function(prev) {
      return prev.map(function(t) {
        if (t.id === id) {
          return {...t, title: title};
        }
        return t;
      });
    });
  }

  function handleDelete(id) {
    setTasks(function(prev) {
      return prev.filter(function(t) {
        return t.id!== id;
      });
    });
  }

  return (
    <div>
      <WeatherDashboard />
      <Header tasks={tasks} />
      <button onClick={handleReset}>Reset board</button>
      <AddTaskForm onAdd={handleAdd} />
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
