// TODO (morning recap): add the take-home tasks array above App (Module 3.4 later moves it to src/data/tasks.js).
// TODO (Lab 3.1 steps 5-6): import "./App.css", Button and Card, and render a Card containing two Buttons.
import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/ui/Button';
import Header from './components/Header';
import { tasks } from './data/tasks.js';
import Board from './components/Board.jsx';
// TODO (Lab 3.3): App.jsx ends up rendering only Header and Board, with the tasks from src/data/tasks.js.
const API = "https://jsonplaceholder.typicode.com";

async function loadTodos(limit){
  try {
    const response = await fetch(`${API}/todos?_limit=${limit}`);
    if (!response.ok){
      throw new Error(`There was an error: ${response.status}`);
    }
    return await response.json();
  } catch (err){
    console.log("An error occured: ", err.message);
    return [];
  } finally {
    console.log("fetch is done, todos loaded.");
  }
}

function TodoRow({ todo }){
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? "[Done]" : "[Not Done]"}</td>
    </tr>
  );
}

function TodoTable({ todos }){
  if (todos.length === 0){
    return <p>No tasks to show.</p>;
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  )
}

async function showOutput(){
  console.log("Hello World on console");
  await loadTodos(6);
  console.log(result);
}

function App() {
  // const [todos, setTodos] = useState([]);
  // const [loaded, setLoaded] = useState(false);
  // const [loading, setLoading] = useState(false);
  
  // // TODO (Lab 3.2 step 5): render ProductGrid here for now (remove it again when you start Lab 3.3).
  // async function callLoadTodos(){
  //   setLoading(true);
  //   const data = await loadTodos(3);
  //   setTodos(data);
  //   setLoaded(true);
  //   setLoading(false);
  // }
  
  return (
    // <main>
    //   <h1>TaskBoard</h1>
    //   <p>Welcome to the TaskBoard App</p>
    //   <Button variant="primary" size="md" onClick={callLoadTodos}>
    //     {loading ? "Loading..." : "Refresh Tasks"}
    //   </Button>

    //   {loaded && <TodoTable todos={todos}/>}
    // </main>
    <>
      <Header tasks={tasks}/>
      <Board tasks={tasks}/>
    </>
  );
}

export default App;
