const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
if (!domain || !token) {
  console.warn('Missing Shopify env variables: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN')
}

async function storefront(query: string, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token!
    },
    body: JSON.stringify({ query, variables })
  })
  const json = await res.json()
  if (json.errors) {
    console.error('Shopify GraphQL Errors:', json.errors)
    throw new Error('Shopify GraphQL Error')
  }
  return json.data
}

export async function getProducts() {
  const query = `
    query { products(first: 12) {
      edges { node { id title handle images(first:1){ edges{ node{ url } } } variants(first:1){ edges{ node{ id price } } } } }
    } }
  `
  const data = await storefront(query)
  return data.products.edges.map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    handle: e.node.handle,
    image: e.node.images.edges[0]?.node?.url ?? '/placeholder.jpg',
    price: e.node.variants.edges[0]?.node?.price ?? '0.00'
  }))
}

export async function getProductByHandle(handle: string) {
  const query = `
    query productByHandle($handle: String!){
      productByHandle(handle: $handle) {
        id title descriptionHtml handle images(first:4){ edges{ node{ url altText } } }
        variants(first:10){ edges{ node{ id price title } } }
      }
    }
  `
  const data = await storefront(query, { handle })
  return data.productByHandle
}

export async function createCheckout(variantId: string, quantity = 1) {
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { id webUrl }
        userErrors { field message }
      }
    }
  `
  const variables = { input: { lineItems: [{ variantId, quantity }] } }
  const data = await storefront(mutation, variables)
  return data.checkoutCreate
}

export async function getShippingRates(checkoutId: string) {
  const query = `
    query checkoutShippingRates($checkoutId: ID!) {
      node(id: $checkoutId) { ... on Checkout { id shippingAddress { country code province } availableShippingRates { ready shippingRates { handle price title } } }
    }
  `
  const data = await storefront(query, { checkoutId })
  // node may be null
  return data.node
}

export async function updateShippingLine(checkoutId: string, shippingRateHandle: string) {
  const mutation = `
    mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
      checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
        checkout { id webUrl subtotalPrice totalTax totalPrice }
        userErrors { field message }
      }
    }
  `
  const variables = { checkoutId, shippingRateHandle }
  const data = await storefront(mutation, variables)
  return data.checkoutShippingLineUpdate
}
