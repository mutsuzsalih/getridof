import DeleteAccount from "../components/DeleteAccount";
import PasswordForm from "../components/PasswordForm";
import { auth } from "@/auth";

async function profile() {
  const session = await auth();

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-1/2 bg-white py-10 px-6 rounded-xl ">
        <h1 className="text-2xl forn-semibold mx-auto ">
          Welcome {session.user.name.toUpperCase()}
        </h1>
        <PasswordForm />
        <hr className="border border-gray-700" />
        <DeleteAccount />
      </div>
    </main>
  );
}

export default profile;
