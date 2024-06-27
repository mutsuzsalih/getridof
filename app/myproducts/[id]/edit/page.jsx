import EditProductForm from "@/app/components/EditProductForm";
import { getProductById } from "@/data-access";
import { deleteProduct } from "@/app/actions/productActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
async function page({ params }) {
  const { id } = params;
  const product = await getProductById(id);
  const deleteProductWithId = deleteProduct.bind(null, id);
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-1/2 py-10 px-8 rounded-xl bg-white">
        <EditProductForm product={product} />
        <form className="ml-4" action={deleteProductWithId}>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Delete Product
          </button>
        </form>
      </div>
    </main>
  );
}

export default page;
