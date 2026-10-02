// TODO (Lab 5.1): render ProductSearch here while you work on the lab.
// TODO (Lab 5.2): render WeatherDashboard here while you work on the lab.
// TODO (Lab 5.3 steps 2-5): replace useState with useLocalStorage("tasks", null), seed the board from
//   JSONPlaceholder when tasks is null, and show a loading message while seeding.
// TODO (Lab 5.3 step 8): add a Reset board button.
import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header.jsx"
import AddTaskForm from "./components/AddTaskForm.jsx"
import Board from "./components/Board.jsx"
import { useLocalStorage } from "./hooks/useLocalStorage.js"
import { tasks as initialTasks } from "./data/tasks.js"
import ProductSearch from "./components/ProductSearch.jsx"
import Counter from "./components/Counter.jsx"
import Shop from "./components/catalogue/Shop.jsx"
import WeatherDashboard from "./components/WeatherDashboard.jsx"

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (tasks !== null) return
    async function seed() {
      setIsLoading(true)
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        const data = await res.json()
        setTasks(data.map(t => ({ id: t.id.toString(), title: t.title, status: t.completed ? "done" : "todo" })))
      } catch {
        setTasks(initialTasks)
      } finally {
        setIsLoading(false)
      }
    }
    seed()
  }, [])

  const handleAdd = (newTask) => setTasks(prev => [...prev, { ...newTask, id: crypto.randomUUID(), status: "todo" }])
  const handleStatusChange = (id, status) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  const handleDelete = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const handleReset = () => { localStorage.removeItem("tasks"); setTasks(null) }

  if (isLoading || tasks === null) return <main><p>Loading...</p></main>

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "1rem" }}>
      <Header />
      <h1>Day05 - All Components Demo</h1>
      
      <section style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
        <ProductSearch />
      </section>

      <section style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
       <WeatherDashboard />
      </section>

      <section style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
        <h2>Counter</h2>
        <Counter />
      </section>

      <section style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
        <h2>Shop</h2>
        <Shop />
      </section>

      <section style={{ border: "2px solid black", padding: "1rem", margin: "1rem 0" }}>
        <h2>TaskBoard (Lab 5.3)</h2>
        <button onClick={handleReset}>Reset board</button>
        <AddTaskForm onAdd={handleAdd} />
        <Board tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      </section>
    </main>
  )
}

export default App