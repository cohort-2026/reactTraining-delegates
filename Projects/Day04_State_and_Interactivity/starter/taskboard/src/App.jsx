// TODO (Lab 4.1): render Counter, ThemeToggle and Accordion here while you work on the lab.
// TODO (Lab 4.2): render <Shop /> here while you work on the lab.
// TODO (Lab 4.3 step 1): move tasks into useState, importing the data as { tasks as initialTasks }.
// TODO (Lab 4.3 steps 2-6): add the add, status change, rename and delete handlers, render AddTaskForm,
//   and pass the handlers down to Board.
import { useState, useEffect } from 'react'
import { tasks as initialTasks } from './data/tasks.js'

function AddTaskForm({ onAdd }){
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [points, setPoints] = useState(3)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!title.trim()){
      alert('Title is required')
      return
    }
    onAdd({
      title: title.trim(),
      assignee: assignee || 'Unassigned',
      points: Number(points),
      status: 'todo'
    })
    setTitle('')
    setAssignee('')
    setPoints(3)
  }

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
      <input placeholder="title*" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="assignee" value={assignee} onChange={e=>setAssignee(e.target.value)} />
      <input type="number" min="1" value={points} onChange={e=>setPoints(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  )
}

function TaskItem({ task, onChangeStatus, onDelete }){
  return (
    <div style={{border:'1px solid #ccc', padding:'10px', margin:'8px 0'}}>
      <strong>{task.title}</strong> ({task.points} pts) - {task.assignee}
      <br/>
      <select value={task.status} onChange={e=>onChangeStatus(task.id, e.target.value)}>
        <option value="todo">todo</option>
        <option value="inProgress">inProgress</option>
        <option value="done">done</option>
      </select>
      <button onClick={()=>{
        if(window.confirm(`Delete "${task.title}"?`)){
          onDelete(task.id)
        }
      }} style={{marginLeft:'10px', color:'red'}}>
        Delete
      </button>
    </div>
  )
}

export default function App(){
  // STEP 8: Load from localStorage first, else use initialTasks
  const [tasks, setTasks] = useState(()=>{
    const saved = localStorage.getItem('tasks')
    return saved? JSON.parse(saved) : initialTasks
  })

  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')

  // STEP 8: Save to localStorage whenever tasks change
  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, {...newTask, id: Date.now() }])
  }

  const handleChangeStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id? {...t, status: newStatus} : t))
  }

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id!== id))
  }

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.assignee.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // STEP 7: Stats
  const total = tasks.length
  const doneCount = tasks.filter(t=>t.status==='done').length
  const progressCount = tasks.filter(t=>t.status==='inProgress').length
  const totalPoints = tasks.reduce((sum, t)=> sum + Number(t.points), 0)

  return (
    <div style={{padding:'20px'}}>
      <h1>TaskBoard - Lab 4.3</h1>

      {/* STEP 7: Stats */}
      <div style={{background:'#f0f0f0', padding:'10px', marginBottom:'15px'}}>
        <strong>Stats:</strong> Total: {total} | Done: {doneCount} | In Progress: {progressCount} | Points: {totalPoints}
      </div>

      <AddTaskForm onAdd={handleAddTask} />

      <div style={{margin:'15px 0'}}>
        <button onClick={()=>setFilterStatus('all')}>All</button>
        <button onClick={()=>setFilterStatus('todo')}>todo</button>
        <button onClick={()=>setFilterStatus('inProgress')}>inProgress</button>
        <button onClick={()=>setFilterStatus('done')}>done</button>
      </div>

      <div style={{margin:'15px 0'}}>
        <input placeholder="search title or assignee" value={search} onChange={e=>setSearch(e.target.value)} />
        <button onClick={()=>{
          setFilterStatus('all')
          setSearch('')
        }} style={{marginLeft:'10px'}}>Clear Filters</button>
      </div>

      <p>Showing: {filteredTasks.length} / {tasks.length}</p>

      {filteredTasks.map(t => (
        <TaskItem key={t.id} task={t} onChangeStatus={handleChangeStatus} onDelete={handleDelete} />
      ))}
    </div>
  )
}