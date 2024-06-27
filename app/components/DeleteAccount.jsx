"use client";
import { deleteAccount } from "@/app/actions/userActions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const initialState = {
  message: "",
};

function DeleteAccount() {
  const router = useRouter();
  const [formState, formAction] = useFormState(deleteAccount, initialState);
  useEffect(() => {
    if (formState?.message === "Account deleted!") {
      signOut();
      router.push("/");
    }
  }, [formState?.message]);
  return (
    <form action={formAction} className="mx-auto mt-10">
      <button className="border-2 border-red-500 px-4 py-2 text-xl hover:text-white hover:bg-red-500  transition-all">
        Delete Account
      </button>
    </form>
  );
}

export default DeleteAccount;
