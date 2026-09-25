// TODO (milestone 1): you will need `jwtVerify` from jose as well.
import { SignJWT } from 'jose'
import type { PublicUser } from '@taskboard/shared'

export interface TokenClaims {
  userId: string
  name: string
  /** Expiry as a Unix timestamp in milliseconds. */
  expiresAt: number
}

const ISSUER = 'taskboard'
const AUDIENCE = 'taskboard-realtime'

// Shared by signToken and (once you write it) verifyToken.
const key = (secret: string) => new TextEncoder().encode(secret)

/** Create a signed HS256 token for a user. `ttl` uses jose's format, e.g. '1h'. */
export async function signToken(user: PublicUser, secret: string, ttl: string): Promise<string> {
  return new SignJWT({ name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(ttl)
    .sign(key(secret))
}

/**
 * Verify a token's signature, algorithm, issuer, audience and expiry.
 * Returns the claims, or null for ANY problem: the caller should not need to
 * know why a token was rejected, and neither should an attacker.
 *
 * TODO (milestone 1):
 *  - use jose's `jwtVerify(token, key(secret), { ... })`
 *  - pin the algorithm to HS256, and check ISSUER and AUDIENCE
 *  - require the `sub` and `exp` claims
 *  - map the payload to TokenClaims (note: `exp` is in SECONDS, expiresAt is in ms)
 *  - never throw: a bad token returns null
 */
export async function verifyToken(_token: string, _secret: string): Promise<TokenClaims | null> {
  throw new Error('TODO: verifyToken (milestone 1)')
}
