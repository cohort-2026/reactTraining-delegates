import { expect, test, type Browser, type BrowserContext, type Page } from '@playwright/test'

/**
 * Two users, two browser contexts (like two separate browsers: no shared
 * storage). Stretch goal: not part of `npm test`. Run with `npm run test:e2e`
 * after `npx playwright install chromium`.
 */

const contexts: BrowserContext[] = []

test.afterEach(async () => {
  await Promise.all(contexts.splice(0).map((c) => c.close()))
})

async function logIn(browser: Browser, username: string): Promise<Page> {
  const context = await browser.newContext()
  contexts.push(context)
  const page = await context.newPage()
  await page.goto('/')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByRole('heading', { name: 'Product launch' })).toBeVisible()
  return page
}

test('a task Alice adds appears on Bob\'s screen, and presence updates when Bob leaves', async ({ browser }) => {
  const alice = await logIn(browser, 'alice')
  const bob = await logIn(browser, 'bob')

  const bobsAvatar = alice.getByLabel('People on this board').getByText('Bob Ortiz, member')
  await expect(bobsAvatar).toBeAttached()

  const title = `Hire a DJ ${Date.now()}`
  await alice.getByLabel('Add a task to To do').fill(title)
  await alice.getByLabel('Add a task to To do').press('Enter')
  await expect(bob.getByText(title)).toBeVisible()

  // Closing Bob's browser is a tab close: the socket closes, the server announces presence.leave.
  await bob.context().close()
  await expect(bobsAvatar).not.toBeAttached()
})

test('a viewer sees the board but no editing controls', async ({ browser }) => {
  const carol = await logIn(browser, 'carol')
  await expect(carol.getByText('viewer', { exact: true })).toBeVisible()
  await expect(carol.getByRole('button', { name: /^Delete/ })).toHaveCount(0)
  await expect(carol.getByLabel('Add a task to To do')).toHaveCount(0)
})
