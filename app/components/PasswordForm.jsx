"use client";
import { useFormState } from "react-dom";
import { changePassword } from "../actions/userActions";

function PasswordForm() {
  const initialState = {
    message: "",
  };
  const [formState, formAction] = useFormState(changePassword, initialState);

  return (
    <form className="mb-6 py-8 px-16" action={formAction}>
      <div className="flex flex-col space-y-4">
        {formState?.message && (
          <div className="text-center text-red-500">{formState?.message}</div>
        )}
        <div className="flex flex-col">
          <label
            htmlFor="currentPassword"
            className="text-sm font-semibold mb-2"
          >
            Current Password:
          </label>
          <input
            type="password"
            name="currentPassword"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold mb-2">
            New Password:
          </label>
          <input
            type="password"
            name="password"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold mb-2"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="border py-3 px-4 border-gray-300 focus:outline-orange-500 rounded-xl"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white py-2 px-8 rounded-xl"
          >
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}

export default PasswordForm;
