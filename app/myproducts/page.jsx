import React from "react";
import { getMyProcuts, getTotalMyProductsPage } from "@/data-access";
import Link from "next/link";
import Pagination from "../components/Pagination";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
async function page({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const page = searchParams.page || 1;
  const products = await getMyProcuts(page);
  const totalPages = await getTotalMyProductsPage();

  return (
    <main className="min-h-[90vh] p-8 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-center mb-10">My Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-6 break-all flex flex-col justify-between items-center"
            >
              <div>
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  className="w-[240px] h-[200px] mb-3"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-gray-900 font-bold mb-9">${product.price}</p>
              </div>
              <Link
                href={`/myproducts/${product.id}/edit`}
                className="border border-black px-3 py-1  hover:text-white hover:bg-black transtion"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}

export default page;
