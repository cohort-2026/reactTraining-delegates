export default function TaskCard({ task }) {
  return (
    <div style={{ border: '1px solid gray', padding: '8px', margin: '8px', background: 'white' }}>
      <h4>{task.title}</h4>
      <p>{task.assignee ? task.assignee : ''} - {task.points} pts</p>
    </div>
  )
}