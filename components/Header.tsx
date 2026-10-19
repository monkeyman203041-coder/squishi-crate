import Link from 'next/link'
export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3">
            <img src="/logo.svg" alt="Squishis" className="h-12 w-12" />
            <span className="font-semibold text-xl">Squishis</span>
          </a>
        </Link>
        <nav>
          <Link href="/"><a className="mr-6">Home</a></Link>
          <Link href="/about"><a className="mr-6">About</a></Link>
          <Link href="/cart"><a>Cart</a></Link>
        </nav>
      </div>
    </header>
  )
}
