import { useCallback, useReducer } from 'react'
import type { MutationInput, MutationMessage } from '@taskboard/shared'
import { boardReducer, initialBoardState } from './boardReducer'

interface Options {
  token: string
  boardId: string
  /** Called when the server says the token is bad or expired. */
  onUnauthorised: () => void
}

/**
 * Owns the WebSocket for one board.
 *
 * TODO (milestone 1): in a useEffect keyed on [token, boardId]
 *  - open `new WebSocket(WS_URL)` (see ../config). Do NOT put the token in the URL.
 *  - on open, send `{ type: 'auth', token, boardId }` as the first message
 *  - close the socket in the cleanup function (StrictMode runs effects twice in dev)
 *
 * TODO (milestone 2): on message, JSON.parse it and dispatch `{ type: 'server', message }`.
 *
 * TODO (milestone 3): `mutate` gives each change a clientMutationId
 * (crypto.randomUUID()), dispatches `{ type: 'mutate', mutation }` so the UI
 * updates at once, and sends it if the socket is ready (snapshot received).
 *
 * TODO (milestone 6):
 *  - on close: code CLOSE_UNAUTHENTICATED -> status 'unauthorised' and call onUnauthorised
 *    (useEffectEvent keeps that callback out of the effect's dependencies);
 *    CLOSE_FORBIDDEN -> status 'forbidden'; anything else -> status 'reconnecting'
 *    and try again after backoffDelay(attempt++)
 *  - reset the attempt counter when a snapshot arrives
 *  - keep an outbox (a ref) of every mutation not yet acked or rejected; after each
 *    snapshot, send the whole outbox again (the server ignores duplicates)
 *  - bonus: on the window 'offline' event, drop the socket at once (a dead connection
 *    can take minutes to time out by itself); on 'online', reconnect without waiting
 */
export function useBoardSocket(_options: Options) {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState)

  const mutate = useCallback((input: MutationInput) => {
    const mutation = { ...input, clientMutationId: crypto.randomUUID() } as MutationMessage
    dispatch({ type: 'mutate', mutation })
    // TODO: send it (or queue it until the socket is ready).
  }, [])

  const dismissNotice = useCallback(() => dispatch({ type: 'dismissNotice' }), [])

  return { state, mutate, dismissNotice }
}
