"use client";

import { signup } from "@/app/actions/userActions";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const data = useSession();

  useEffect(() => {
    if (data.status === "authenticated") {
      router.push("/");
    }
  }, [data]);
  
  const initialState = {
    message: "",
  };

  const [formState, formAction] = useFormState(signup, initialState);
  
  useEffect(() => {
    if (formState?.message === "Signup successful!") {
      router.push("/api/auth/signin?callbackUrl=/");
    }
  }, [formState?.message]);

  return (
    data.status === "unauthenticated" && (
      <main className="min-h-screen flex items-center justify-center  ">
        <div className="w-1/2 py-10 px-8 bg-white rounded-xl">
          <form
            action={formAction}
            className="p-6 flex flex-col justify-center  w-full mb-20"
          >
            <h1 className="text-4xl font-bold  mb-32 text-gray-700 ">
              Join our community
            </h1>
            <p className="text-gray-600  font-medium mb-20 mr-40 leading-relaxed text-2xl">
              Create an account to start sell and buy products
            </p>
            {formState?.message && (
              <div className="  border-2 border-red-500 text-red-500 p-2 mb-3 text-2xl font-semibold w-full">
                {formState.message}
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-4 p-2 border border-gray-300 rounded-md w-full text-gray-700"
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="mb-4 p-2 border border-gray-300 rounded-md w-full text-gray-700"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-4 p-2 border border-gray-300 rounded-md w-full text-gray-700"
              required
            />

            <button
              type="submit"
              className="p-2 bg-red-500 text-white rounded-md w-full"
            >
              Signup
            </button>
          </form>
        </div>
      </main>
    )
  );
}

export default Signup;
