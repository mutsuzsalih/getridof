import { getProductById } from "@/data-access";
import Image from "next/image";
import Link from "next/link";

async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProductById(id);

  return (
    <main className="min-h-screen flex flex-col items-center p-8 mt-32">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className=" rounded-lg object-cover w-[400px] h-[400px]"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <Link href="/shipping"className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
            Buy Now
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
