import TaskCard from './TaskCard'

export default function Column({ title, tasks }) {
  return (
    <div style={{ flex: 1, margin: '8px', background: '#f0f0f0', padding: '8px' }}>
      <h2>{title} ({tasks.length})</h2>
      
      {tasks.length === 0 ? (
        <p>Nothing here yet</p>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  )
}