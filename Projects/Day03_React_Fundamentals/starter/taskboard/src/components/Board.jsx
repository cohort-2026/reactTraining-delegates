import Column from './Column'

export default function Board({ tasks }) {
  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done = tasks.filter(t => t.status === 'done')

  return (
    <div style={{ display: 'flex' }}>
      <Column title="To Do" tasks={todo} />
      <Column title="Doing" tasks={doing} />
      <Column title="Done" tasks={done} />
    </div>
  )
}