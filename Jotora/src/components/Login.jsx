import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900 text-slate-100 flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.08),transparent_8%),radial-gradient(circle_at_90%_80%,rgba(255,106,136,0.06),transparent_8%)] pointer-events-none" />

      <div className="w-full">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 px-6">
          <div>
            <h1
              className="text-6xl md:text-7xl font-extralight mb-2"
              style={{
                fontFamily: "'Edu NSW ACT Hand Cursive', system-ui, sans-serif",
              }}>
              Jotora
            </h1>
            <h2 className="text-2xl font-medium text-slate-200/90 mb-4">
              Sign in to your account
            </h2>
            <p className="text-slate-400 max-w-md">
              Welcome back - resume creating your stories, exploring ideas, and
              connecting with readers.
            </p>
            <div className="mt-8 flex gap-4 items-center">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 via-sky-400 to-pink-400 shadow-lg" />
              <div className="text-sm text-slate-500">
                Secure sign-in · Fast publishing
              </div>
            </div>
          </div>

          <div>
            <div className="mx-auto max-w-md bg-slate-900/50 backdrop-blur rounded-3xl p-8 shadow-2xl transform transition-transform duration-700 hover:scale-[1.01]">
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <form onSubmit={handleSubmit(login)} className="space-y-4">
                <Input
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  {...register("email", { required: true })}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </div>

            <p className="mt-4 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-slate-200 hover:text-white">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
