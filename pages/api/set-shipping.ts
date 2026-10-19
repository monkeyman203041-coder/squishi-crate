import type { NextApiRequest, NextApiResponse } from 'next'
import { updateShippingLine } from '../../lib/shopify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { checkoutId, shippingRateHandle } = req.body
  try {
    const result = await updateShippingLine(checkoutId, shippingRateHandle)
    if (result.userErrors?.length) return res.status(400).json({ errors: result.userErrors })
    return res.status(200).json({ webUrl: result.checkout.webUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'could not set shipping' })
  }
}
