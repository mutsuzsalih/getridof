"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <input
        type="text"
        name="query"
        onChange={(e) => handleSearch(e.target.value)}
        className="shadow appearance-none border rounded-xl text-lg md:text-xl w-40 md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Search products..."
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

export default SearchBar;
