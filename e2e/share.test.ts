import { test } from '@playwright/test'

test.describe('Share', () => {
  // share
  test.fixme('keep a place private by default', async () => {})
  // sharing places has two parts
  // 1. set acl for sharing
  // 2. send a notification to a person or to a public index
  test.fixme('share places with specific people', async () => {})
  test.fixme('share places publicly', async () => {})
  test.fixme('change sharing', async () => {})

  // read
  test.fixme('see places shared with me', async () => {})
  test.fixme('see places shared publicly', async () => {})
  test.fixme('keep places in my local index', async () => {})
  test.fixme('clone places to my pod', async () => {})
})
