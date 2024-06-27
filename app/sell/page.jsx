"use client";
import { createProduct } from "@/app/actions/productActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import { UploadButton } from "../utils/uploadthings";

const initialState = {
  message: "",
};
function CreateProductPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const createProductWithImage = createProduct.bind(null, imageUrl);
  const [formState, formAction] = useFormState(
    createProductWithImage,
    initialState
  );

  useEffect(() => {
    if (formState?.message === "Product created!") {
      router.push(`/myproducts`);
    }
  }, [formState?.message]);

  return (
    <main className="container mt-32 mx-auto p-4 flex justify-center flex-col items-center">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          setImageUrl(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <form
        action={formAction}
        className="w-1/2 bg-white shadow-lg rounded-xl py-20 px-8 "
      >
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>
        {formState?.message && (
          <p className="text-red-500 mb-4">{formState.message}</p>
        )}
        <div className="mb-4 flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            maxLength={30}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            maxLength={191}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="price" className="text-sm font-semibold mb-2">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            maxLength={10}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}

export default CreateProductPage;
