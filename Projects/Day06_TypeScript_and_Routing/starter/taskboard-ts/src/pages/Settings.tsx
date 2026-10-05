import { useAuth } from '../hooks/useAuth'

export default function Settings() {
  const { user } = useAuth()
  return (
    <section className="settings-page">
      <h2>Settings</h2>
      <p>Signed in as {user?.name ?? 'Demo user'}.</p>
      <p>Your TaskBoard data is stored in this browser.</p>
    </section>
  )
}