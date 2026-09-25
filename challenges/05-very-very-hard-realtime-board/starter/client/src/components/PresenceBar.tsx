import type { PresenceUser } from '@taskboard/shared'

interface Props {
  users: PresenceUser[]
  meId: string | undefined
}

const PALETTE = ['#2f5bea', '#d9480f', '#2b8a3e', '#9c36b5', '#c2255c', '#0b7285']

function colourFor(userId: string) {
  let hash = 0
  for (const char of userId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return PALETTE[hash % PALETTE.length]
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function PresenceBar({ users, meId }: Props) {
  return (
    <div className="presence" aria-label="People on this board">
      <ul>
        {users.map((user) => {
          const label = `${user.name}${user.userId === meId ? ' (you)' : ''}, ${user.role}`
          return (
            <li key={user.userId} className="avatar" style={{ background: colourFor(user.userId) }} title={label}>
              <span aria-hidden="true">{initials(user.name)}</span>
              <span className="visually-hidden">{label}</span>
            </li>
          )
        })}
      </ul>
      <span className="presence-count">{users.length} online</span>
    </div>
  )
}
