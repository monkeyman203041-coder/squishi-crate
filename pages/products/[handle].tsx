import Header from '../../components/Header'
import { getProductByHandle } from '../../lib/shopify'
import { useState } from 'react'

export default function ProductPage({ product }: any) {
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [rates, setRates] = useState<any[]>([])
  const [address, setAddress] = useState({ country: 'US', postalCode: '' })

  if (!product) return <div>Not found</div>
  const variant = product.variants.edges[0].node

  async function createAndEstimate() {
    // create checkout
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ variantId: variant.id, quantity: 1 }) })
    const data = await res.json()
    if (!data.checkoutId) return alert('Could not create checkout')
    setCheckoutId(data.checkoutId)
    // get rates
    const r = await fetch('/api/shipping-rates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ checkoutId: data.checkoutId, address }) })
    const rr = await r.json()
    if (rr?.shippingRates) setRates(rr.shippingRates)
  }

  async function selectRate(handle: string) {
    if (!checkoutId) return
    const res = await fetch('/api/set-shipping', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ checkoutId, shippingRateHandle: handle }) })
    const data = await res.json()
    if (data.webUrl) window.location.href = data.webUrl
  }

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <img src={product.images.edges[0]?.node?.url ?? '/placeholder.jpg'} alt={product.title} className="product-img" />
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            <div className="text-xl font-semibold mb-6">${product.variants.edges[0].node.price}</div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Country</label>
              <select value={address.country} onChange={e => setAddress({...address, country: e.target.value})} className="border rounded px-3 py-2">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Postal code</label>
              <input value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} className="border rounded px-3 py-2" />
            </div>

            <button onClick={createAndEstimate} className="bg-brand-pink text-brand-text px-6 py-3 rounded mr-3">Estimate shipping & Buy</button>

            <div className="mt-6">
              {rates.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Available shipping options</h3>
                  <ul>
                    {rates.map((r: any) => (
                      <li key={r.handle} className="mb-2 flex items-center justify-between bg-white p-3 rounded">
                        <div>
                          <div className="font-medium">{r.title}</div>
                          <div className="text-sm text-gray-600">{r.price}</div>
                        </div>
                        <button onClick={() => selectRate(r.handle)} className="bg-brand-blue px-4 py-2 rounded">Select</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }: any) {
  const product = await getProductByHandle(params.handle).catch(() => null)
  if (!product) return { notFound: true }
  return { props: { product }, revalidate: 60 }
}
