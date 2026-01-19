"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/libs/auth";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Frontend validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await register({ username, password });
    setLoading(false);

    if (result?.success) {
      router.push("/login");
    } else {
      setError(result?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4" style={{ fontFamily: '"Google Sans Flex", sans-serif' }}>
      <div className="w-full max-w-md bg-zinc-900 rounded-lg p-8" style={{ paddingBottom: "30px" }}>
        {/* Header */}
        <div className="flex flex-col items-center gap-2 w-full" style={{ marginTop: "30px", marginBottom: "40px" }}>
          <h2 className="text-white" style={{ fontSize: "48px", fontWeight: "700" }}>REGISTER</h2>
          <div className="rounded-full" style={{ width: "61px", height: "6px", backgroundColor: "#cf8700" }}></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-md" style={{ backgroundColor: "#7f1d1d", color: "#fecaca", fontSize: "14px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-6" style={{ marginTop: "40px" }}>
          {/* Username Input */}
          <div className="flex items-center rounded-md px-3 gap-3" style={{ width: "300px", height: "50px", backgroundColor: "#272729", margin: "auto" }}>
            <CiUser className="text-white" style={{ fontSize: "20px" }} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center rounded-md px-3 gap-3" style={{ width: "300px", height: "50px", backgroundColor: "#272729", margin: "auto" }}>
            <RiLockPasswordLine className="text-white" style={{ fontSize: "20px" }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex items-center rounded-md px-3 gap-3" style={{ width: "300px", height: "50px", backgroundColor: "#272729", margin: "auto" }}>
            <RiLockPasswordLine className="text-white" style={{ fontSize: "20px" }} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Register Button */}
          <div className="flex gap-8 justify-center items-center" style={{ margin: "30px auto 10px auto" }}>
            <button
              type="submit"
              disabled={loading}
              className="text-white flex justify-center items-center cursor-pointer outline-none transition duration-200"
              style={{
                width: "150px",
                height: "50px",
                backgroundColor: loading ? "#7a5200" : "#cf8700",
                borderRadius: "50px",
                fontSize: "19px",
                fontWeight: "700",
                border: "none"
              }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="flex justify-center" style={{ marginTop: "10px" }}>
          <Link
            href="/login"
            className="text-white text-sm hover:text-amber-600 transition duration-200 no-underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
