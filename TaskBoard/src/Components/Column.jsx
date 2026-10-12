
import TaskCard from './TaskCard'

function Column({ title, tasks }) {
  return (
    <section className="board-column">
      <h2>{title}</h2>

      <div className="column-tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </section>
  )
}

export default Column
