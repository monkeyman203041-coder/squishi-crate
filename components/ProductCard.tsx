import Link from 'next/link'

type Props = { title: string, handle: string, image: string, price: string }
export default function ProductCard({ title, handle, image, price }: Props) {
  return (
    <Link href={`/products/${handle}`}>
      <a className="block border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="font-medium">{title}</h3>
          <div className="text-sm text-gray-600 mt-1">{price}</div>
        </div>
      </a>
    </Link>
  )
}
