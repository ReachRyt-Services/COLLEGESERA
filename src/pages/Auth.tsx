
import { useState, useEffect } from "react";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            College<span className="text-orange-500">Sera</span>
          </span>
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn ? "Sign in to access your personalized college recommendations" : "Join thousands of students finding their perfect college"}
          </p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Toggle buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${isSignIn
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${!isSignIn
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Clerk Components */}
          <div className="clerk-auth-container">
            {isSignIn ? (
              <SignIn
                fallbackRedirectUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                    footerActionLink: "text-orange-500 hover:text-orange-600",
                  },
                }}
              />
            ) : (
              <SignUp
                fallbackRedirectUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                    footerActionLink: "text-orange-500 hover:text-orange-600",
                  },
                }}
              />
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
