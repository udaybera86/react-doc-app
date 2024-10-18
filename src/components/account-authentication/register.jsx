import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register({ toggleForm, onSuccessfulSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Then try to save the additional data
      if (user) {
        try {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname || "",  // Provide default empty string if fname is null
            lastName: lname || "",   // Provide default empty string if lname is null
            createdAt: new Date().toISOString()
          });

          toast.success("Account registration successful. Login to view our exciting features.", {
            position: "top-center",
            autoClose: 3000,
          });

          // Clear the form
          setEmail("");
          setPassword("");
          setFname("");
          setLname("");

          // Signal successful signup
          onSuccessfulSignup();
        } catch (firestoreError) {
          toast.warning("Account created but profile data not saved. Please update your profile later.", {
            position: "top-center",
            autoClose: 5000,
          });
          // Still consider this a successful signup
          onSuccessfulSignup();
        }
      }
    } catch (authError) {
      toast.error(authError.message || "Registration failed. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="text-white">
      <h3 className="text-[28px] mb-8 font-bold text-center">Sign Up</h3>
      <div className="mb-4">
        <input
          type="text"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="First Name*"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="Last Name*"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="Email address*"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-9">
        <input
          type="password"
          className="w-full pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
          placeholder="Password*"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-[#16A34A] text-white p-3 text-lg font-bold leading-tight disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      <p className="mt-6 text-center">
        Already registered?{" "}
        <button 
          type="button" 
          onClick={toggleForm} 
          className="text-[#16A34A] underline underline-offset-2"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </form>
  );
}

export default Register;