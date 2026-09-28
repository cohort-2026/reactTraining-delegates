function Header({ title, taskCount }) {
  return (
    <header style={{ marginBottom: '24px' }}>
      <h1 style={{ marginBottom: '4px' }}>{title}</h1>
      <p style={{ margin: 0 }}>{taskCount} tasks</p>
    </header>
  )
}

export default Header