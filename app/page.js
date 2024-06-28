import { getAllProducts, getTotalProductsPage } from "@/data-access";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
export default async function Home({ searchParams }) {
  const query = searchParams.query || "";
  const page = searchParams.page || 1;
  const products = await getAllProducts(page, query);
  const totalPages = await getTotalProductsPage(query);
  const session = await auth();
  const user = session?.user;
  return (
    <main className="min-h-[90vh]  flex flex-col justify-between bg-[#93C86D]">
      <div className="relative top-0 -translate-y-14">
        <img
          src="/background2.jpg"
          alt="landing image"
          className="h-[900px] w-full"
        />
        <div className="absolute top-1/2 left-36 text-white">
          <h1 className="text-6xl font-bold">Get Rid Of</h1>
          <p className="text-2xl">
            Get Rid Of Your Old Stuff And Make Some Money
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="px-6 py-3 text-xl bg-black text-white rounded-full"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h1 className="text-4xl font-semibold text-center mb-10 text-gray-800">
          Start Sell And Buy Product Now
        </h1>
        <div className="text-center mb-10">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-20 ">
          {products
            ?.filter((product) => !user || product.seller !== user.id)
            .map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-6 break-all flex flex-col justify-between items-center"
              >
                <div className="text-gray-700">
                  <Image
                    src={product.image}
                    width={200}
                    height={200}
                    className="w-[240px] h-[200px] mb-3"
                  />
                  <h2 className="text-xl font-semibold mb-2 ">
                    Seller: {product.seller.name}
                  </h2>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="mb-4">{product.description}</p>
                  <p className="text-gray-900 font-bold mb-9">
                    ${product.price}
                  </p>
                </div>
                {session?.user ? (
                  <Link
                    href={`/products/${product.id}`}
                    className="border border-black px-3 py-1  hover:text-white hover:bg-black transtion"
                  >
                    {" "}
                    Buy{" "}
                  </Link>
                ) : (
                  <Link
                    href="/api/auth/signin"
                    className="border border-black px-3 py-1  hover:text-white hover:bg-black transtion"
                  >
                    {" "}
                    Buy{" "}
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}