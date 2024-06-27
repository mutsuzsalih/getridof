"use client";
import { useFormState } from "react-dom";
import { editProduct } from "@/app/actions/productActions";
const initialState = {
  message: "",
};
function EditProductForm({ product }) {
  const editProductWithId = editProduct.bind(null, product.id);
  const [formState, formAction] = useFormState(editProductWithId, initialState);

  return (
    <main className=" container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form action={formAction}>
        {formState?.message && (
          <p className="text-red-500 mb-4">{formState.message}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1"
            defaultValue={product.name}
            maxLength={30}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1"
            defaultValue={product.description}
            maxLength={191}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1"
            defaultValue={product.price}
            maxLength={10}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
        >
          Edit Product
        </button>
      </form>
      <hr className="my-8 border border-gray-700" />
    </main>
  );
}

export default EditProductForm;
