// TODO (Lab 7.2 step 6): select the tasks with useTaskStore((s) => s.tasks) and filter them here, outside the selector.
// TODO (Lab 7.3 step 5): read the tasks with useQuery({ queryKey: ["tasks"], queryFn: fetchTasks }).
import { useTaskStore } from '../store/useTaskStore'
import type { Task } from '../store/useTaskStore'
import TaskCard from './TaskCard'

function Column(props: { columnId: string, title: string }){
  const tasks = useTaskStore((state) => state.tasks)
  const addTask = useTaskStore((state) => state.addTask)

  const myTasks = tasks.filter((t: Task) => t.columnId === props.columnId)

  function handleAdd(){
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'new task',
      columnId: props.columnId
    }
    addTask(newTask)
  }

  return(
    <div>
      <h3>{props.title}</h3>
      <button onClick={handleAdd}>+ Add</button>
      {myTasks.map((task: Task) => (
        <TaskCard key={task.id} id={task.id} title={task.title} columnId={task.columnId} />
      ))}
    </div>
  )
}

export default Column