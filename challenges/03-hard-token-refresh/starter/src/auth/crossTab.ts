// TODO: logging out in every tab at once, with BroadcastChannel.
//
// When the user signs out in one tab, every other open tab should drop its
// access token and show the login page too.

/** The channel name. The tests open their own channel with this name. */
export const AUTH_CHANNEL_NAME = "taskboard-auth";

/** The one message this channel carries. */
export type AuthMessage = { type: "logout" };

/**
 * Open the channel and call `onRemoteLogout` whenever ANOTHER tab posts
 * { type: "logout" }. Returns a cleanup function that closes the channel.
 * AuthProvider calls this from an effect.
 */
export function startCrossTabSync(onRemoteLogout: () => void): () => void {
  // TODO
  void onRemoteLogout;
  return () => {};
}

/** Tell the other tabs that this tab has signed out. */
export function broadcastLogout(): void {
  // TODO
}
