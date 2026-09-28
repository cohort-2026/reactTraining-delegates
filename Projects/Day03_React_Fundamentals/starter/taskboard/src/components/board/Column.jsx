import TaskCard from './TaskCard'

function Column({ title, tasks }) {
  return (
    <section style={{ flex: 1, minWidth: '220px' }}>
      <h2>{title}</h2>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} title={task.title} />)
      )}
    </section>
  )
}

export default Column