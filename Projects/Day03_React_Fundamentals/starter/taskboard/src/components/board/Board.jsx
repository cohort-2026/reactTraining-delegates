import Column from './Column'

const columns = [
  { title: 'To do', status: 'todo' },
  { title: 'In progress', status: 'in-progress' },
  { title: 'Done', status: 'done' },
]

function Board({ tasks }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  )
}

export default Board