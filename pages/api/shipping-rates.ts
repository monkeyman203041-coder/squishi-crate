import type { NextApiRequest, NextApiResponse } from 'next'
import { getShippingRates } from '../../lib/shopify'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { checkoutId, address } = req.body
  try {
    // Note: address is currently not sent to Shopify in this implementation because storefront's checkoutShippingRates
    // requires an address on the checkout. If you want rates for a different address, you'd need to update the checkout's shippingAddress first.
    const node = await getShippingRates(checkoutId)
    const rates = node?.availableShippingRates?.shippingRates ?? []
    return res.status(200).json({ shippingRates: rates })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'could not fetch shipping rates' })
  }
}
