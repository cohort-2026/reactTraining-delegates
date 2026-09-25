import { SignJWT } from 'jose'
import { describe, expect, it } from 'vitest'
import { signToken, verifyToken } from './auth'

const SECRET = 'test-secret-that-is-at-least-32-characters-long'
const alice = { id: 'u-alice', name: 'Alice Ng' }

describe('verifyToken', () => {
  it('accepts a token made by signToken and returns the claims', async () => {
    const token = await signToken(alice, SECRET, '1h')
    const claims = await verifyToken(token, SECRET)
    expect(claims).toMatchObject({ userId: 'u-alice', name: 'Alice Ng' })
    expect(claims!.expiresAt).toBeGreaterThan(Date.now())
  })

  it('rejects a token signed with a different secret', async () => {
    const token = await signToken(alice, 'another-secret-that-is-also-32-characters', '1h')
    expect(await verifyToken(token, SECRET)).toBeNull()
  })

  it('rejects an expired token', async () => {
    const token = await signToken(alice, SECRET, '-10s')
    expect(await verifyToken(token, SECRET)).toBeNull()
  })

  it('rejects a token that was tampered with', async () => {
    const token = await signToken(alice, SECRET, '1h')
    const [header, , signature] = token.split('.')
    const forged = Buffer.from(JSON.stringify({ sub: 'u-bob', exp: 9999999999 })).toString('base64url')
    expect(await verifyToken(`${header}.${forged}.${signature}`, SECRET)).toBeNull()
  })

  it('rejects a correctly signed token meant for a different audience', async () => {
    const token = await new SignJWT({ name: 'Alice Ng' })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject('u-alice')
      .setIssuer('taskboard')
      .setAudience('some-other-app')
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(SECRET))
    expect(await verifyToken(token, SECRET)).toBeNull()
  })

  it('rejects garbage without throwing', async () => {
    await expect(verifyToken('not-a-token', SECRET)).resolves.toBeNull()
  })
})
