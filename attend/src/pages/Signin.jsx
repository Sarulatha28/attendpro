import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const submit = (e) => {
    e.preventDefault();
    // TODO: call backend auth -> get token
    localStorage.setItem("token", "demo-token");
    nav("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl mb-4">Sign in</h2>
        <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email" className="border p-2 rounded w-full mb-2" />
        <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} type="password" placeholder="Password" className="border p-2 rounded w-full mb-4" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Sign in</button>
      </form>
    </div>
  );
}
