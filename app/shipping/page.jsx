import React from "react";

function page() {
  return (
    <div className="mx-auto mt-8 w-11/12 md:w-3/4  xl:w-1/2 bg-white">
      <form className="p-14 border rounded shadow-md">
        <h1 className="text-3xl mb-4">Shipping Address</h1>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="text-2xl font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            required
            className="mt-1 p-2 w-full text-xl border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="text-2xl font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            required
            className="mt-1 p-2 w-full text-xl border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="postalCode"
            className="text-2xl font-medium text-gray-600"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            required
            className="mt-1 p-2 w-full text-xl border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="text-2xl font-medium text-gray-600"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            required
            className="mt-1 p-2 w-full text-xl border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white text-2xl p-2 rounded hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default page;
