import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    // Navbar Scroll Effect
    const navbar = document.querySelector("#navbar");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add("shadow-lg", "py-2", "bg-white", "text-black");
        navbar.classList.remove("py-4", "bg-transparent", "text-white");
      } else {
        navbar.classList.remove("shadow-lg", "py-2", "bg-white", "text-black");
        navbar.classList.add("py-4", "bg-transparent", "text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const user = {
          id: userInfo.data.sub,
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setShowLoginDialog(false);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: () => console.error("Login Failed"),
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutDialog(false);
  };

  // Trimmed name with ellipsis
  const getTrimmedName = (name) => {
    if (name.length > 12) {
      return `${name.slice(0, 12)}...`;
    }
    return name;
  };

  return (
    <div id="navbar" className="fixed top-0 w-full z-20 transition-all duration-300 py-4">
      <div className="max-w-[85%] mx-auto flex justify-between items-center px-6">

        {/* Logo & Title */}
        <div className="flex items-center space-x-4 w-[30%]">
          <img src="/logo.png" alt="Logo" className="w-20 h-15 rounded-full" />
          <a href="/" className="text-2xl font-semibold">Trip Planner</a>
        </div>

        {/* Navigation */}
        <nav className="w-[40%]  ">
          <ul className="flex items-center justify-center space-x-18 text-lg">
            <li>
              <a href="/" className="hover:text-blue-500 transition">Home</a>
            </li>
            <li>
              <a href="/create-trip" className="hover:text-blue-500 transition">Create Trip</a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-500 transition">About Us</a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex justify-end space-x-4 w-[30%]">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.picture}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setShowLogoutDialog(true)}
                title="Click to Logout"
              />
              <span className="text-lg font-medium">{getTrimmedName(user.name)}</span>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 text-lg px-7 py-2 rounded-3xl bg-white text-black hover:bg-blue-700 transition"
              onClick={() => setShowLoginDialog(true)}
            >
              <FaUser /> Login
            </button>
          )}
        </div>
      </div>

      {/* Login Dialog */}
      {showLoginDialog && (
        <div className="fixed inset-0 bg-black/70 text-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sign in with Google</h2>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={login}
            >
              Login with Google
            </button>
            <button
              className="mt-4 w-full bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowLoginDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/70 text-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={logout}
              >
                Yes, Logout
              </button>
              <button
                className="ml-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
