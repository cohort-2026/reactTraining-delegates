
import Card from './ui/Card'

function TaskCard({ task }) {
  return (
    <Card title={task.title}>
      <p>{task.description}</p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
    </Card>
  )
}

export default TaskCard
