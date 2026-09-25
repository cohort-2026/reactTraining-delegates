import type { ConnectionStatus } from '../board/boardReducer'

interface Props {
  status: ConnectionStatus
  /** How many changes are waiting for the server. */
  queued: number
}

export function ConnectionBanner({ status, queued }: Props) {
  if (status === 'online') return null

  const text: Record<Exclude<ConnectionStatus, 'online'>, string> = {
    connecting: 'Connecting…',
    reconnecting: `Connection lost. Reconnecting…${queued ? ` ${queued} change${queued === 1 ? '' : 's'} will be sent when you are back online.` : ''}`,
    unauthorised: 'Your session has expired.',
    forbidden: 'You do not have access to this board.',
  }

  return (
    <p className={`banner banner-${status}`} role="status">
      {text[status]}
    </p>
  )
}
