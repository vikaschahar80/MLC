"use client"

import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    let result;
    if (isRegister) {
      result = await register(formData.username, formData.password);
      if (result.success) {
        setSuccess("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        setError(result.error);
      }
    } else {
      result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error);
      }
      // On success, the context will redirect automatically.
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-green-500 text-center">{success}</p>}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text" name="username" required
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password" name="password" required
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin" /> : (isRegister ? "Register" : "Login")}
          </button>
        </form>
        <p className="text-sm text-center">
          {isRegister ? "Already have an account?" : "Need an account?"}{' '}
          <button onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }} className="text-blue-600 hover:underline">
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}