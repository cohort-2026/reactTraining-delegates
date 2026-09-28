import Card from '../ui/Card'

function TaskCard({ title }) {
  return (
    <Card>
      <p style={{ margin: 0 }}>{title}</p>
    </Card>
  )
}

export default TaskCard