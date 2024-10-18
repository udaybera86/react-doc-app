import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You're logged in! You now have access to all our features.", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <h3 className="text-[28px] mb-8 font-bold text-center">Login</h3>
      <div className="mb-4">
        <input
          type="email"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="Enter email*"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-9">
        <input
          type="password"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="Enter password*"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full bg-[#16A34A] text-white p-3 text-lg text-white font-bold leading-tight">
        Login
      </button>
      <p className="mt-6 text-center">
        New user?{" "}
        <button type="button" onClick={toggleForm} className="text-[#16A34A] underline underline-offset-2">
          Register Here
        </button>
      </p>
    </form>
  );
}

export default Login;