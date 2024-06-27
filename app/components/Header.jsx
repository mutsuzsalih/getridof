"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Image from "next/image";
function Header() {
  const session = useSession();
  const pathname = usePathname();

  return session?.status === "loading" ? (
    <header
      className={
        pathname === "/"
          ? "font-semibold text-gray-700 flex justify-center w-full absolute z-10"
          : "font-semibold text-gray-700 flex justify-center w-full   bg-[#93C86D]"
      }
    >
      <div className="w-[85%] flex  justify-around items-center text-xl bg-white py-[52px] rounded-full shadow-xl"></div>
    </header>
  ) : (
    <header
      className={
        pathname === "/"
          ? "font-semibold text-gray-700 flex justify-center w-full absolute z-10"
          : "font-semibold text-gray-700 flex justify-center w-full   bg-[#93C86D]"
      }
    >
      <div className="w-[85%] flex  justify-around items-center text-xl bg-white py-1 rounded-full shadow-xl">
        <Link href="/" className="hover:text-black">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
        </Link>

        {session?.status === "authenticated" ? (
          <nav className="flex items-center gap-x-6 ">
            <Link href="/myproducts" className="hover:text-black">
              My Products
            </Link>
            <Link href="/sell" className="hover:text-black">
              Sell
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-1 border-2 border-black hover:bg-black hover:text-white duration-300 ea "
            >
              Sign Out
            </button>
            <Link href="/profile" className="hover:text-black">
              <FaRegUserCircle className="text-3xl hover:text-black" />
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-x-4">
            <Link href="/signup" className="hover:text-black">
              Sign Up
            </Link>
            <button onClick={() => signIn()} className="hover:text-black">
              Log In
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
