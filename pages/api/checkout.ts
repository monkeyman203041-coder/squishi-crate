import type { NextApiRequest, NextApiResponse } from 'next'
import { createCheckout } from '../../lib/shopify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { variantId, quantity } = req.body
  try {
    const result = await createCheckout(variantId, quantity)
    if (result.userErrors?.length) return res.status(400).json({ errors: result.userErrors })
    const checkout = result.checkout
    return res.status(200).json({ checkoutId: checkout.id, webUrl: checkout.webUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'checkout failed' })
  }
}
