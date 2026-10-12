
import tasks from '../data/tasks'
import Column from './Column'

function Board() {
  const todoTasks = tasks.filter(
    (task) => task.status === 'todo'
  )

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress'
  )

  const doneTasks = tasks.filter(
    (task) => task.status === 'done'
  )

  return (
    <div className="board">
      <Column title="To Do" tasks={todoTasks} />

      <Column
        title="In Progress"
        tasks={inProgressTasks}
      />

      <Column title="Done" tasks={doneTasks} />
    </div>
  )
}

export default Board
