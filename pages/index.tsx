import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/shopify'

export default function Home({ products }: any) {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4" style={{fontFamily:'Playfair Display, serif'}}>Official Squishis</h1>
            <p className="text-gray-700 mb-6">Premium soft collectible friends — squeezable joy for little hands.</p>
            <a href="#products" className="inline-block bg-brand-pink text-brand-text px-6 py-3 rounded">Shop Squishis</a>
          </div>
          <div>
            <img src="/hero.jpg" alt="Squishis hero" className="rounded shadow" />
          </div>
        </section>

        <h2 id="products" className="text-2xl font-semibold mb-6">Featured Squishis</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p.id} title={p.title} handle={p.handle} image={p.image} price={`$${p.price}`} />
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts().catch(() => [])
  return { props: { products }, revalidate: 60 }
}
