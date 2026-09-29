export default function Header({ tasks }) {
  return (
    <div style={{ padding: '10px', borderBottom: '2px solid black' }}>
      <h1>TaskBoard</h1>
      <p>{tasks.length} tasks</p>
    </div>
  )
}