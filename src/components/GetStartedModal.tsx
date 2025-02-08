import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Reusable Input Component
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
    />
  </div>
);

// Password Input with Toggle Visibility
const PasswordInput = ({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        <button
          type="button"
          aria-label="Toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
    </div>
  );
};

// Reusable Button Component
const SocialButton = ({
  icon,
  label,
  alt,
}: {
  icon: React.ReactNode;
  label: string;
  alt: string;
}) => (
  <button
    type="button"
    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
  >
    <span className="mr-2" aria-hidden="true">
      {icon}
    </span>
    <span className="sr-only">{alt}</span>
    {label}
  </button>
);

function GetStartedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-[#f9f9f690] z-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-[#babf9f]">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Become a seller</h2>
          <button
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Form Section */}
        <form className="mt-6">
          <InputField id="name" label="Name" placeholder="Enter your name" />
          <InputField
            id="email"
            label="Email Address"
            placeholder="Enter your email address"
          />
           <InputField
            id="phone"
            label="Mobile Number"
            placeholder="Enter your mobile address"
          />
          <PasswordInput id="password" label="Password" placeholder="Enter your password" />
          <div className="mb-6 flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree with{" "}
              <a href="#" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Social Sign-Up Section */}
        <div className="mt-6 text-center text-gray-500">or</div>
        <div className="mt-4 space-y-2">
          <SocialButton
            icon={<FcGoogle className="h-5 w-5" />}
            label="Sign Up with Google"
            alt="Sign up with Google"
          />
          <SocialButton
            icon={<BsApple className="h-5 w-5" />}
            label="Sign Up with Apple"
            alt="Sign up with Apple"
          />
          <SocialButton
            icon={<FaFacebook className="h-5 w-5 text-blue-600" />}
            label="Sign Up with Facebook"
            alt="Sign up with Facebook"
          />
        </div>

        {/* Footer Section */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}


export default GetStartedModal;