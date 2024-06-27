"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber) => {
    router.push(createPageURL(pageNumber));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1  mr-4 text-white bg-black hover:bg-gray-800 rounded-md text-2xl transition"
        >
          Previous
        </button>
      )}
      <span className="text-2xl mx-4">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-1 text-white bg-black hover:bg-gray-800 rounded-md text-2xl transition"
        >
          Next
        </button>
      )}
    </div>
  );
}
