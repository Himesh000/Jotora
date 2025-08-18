import React from "react";
import { Container, Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-slate-900 text-slate-100 flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.08),transparent_8%),radial-gradient(circle_at_90%_80%,rgba(255,106,136,0.06),transparent_8%)] pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16">
          <div className="px-6">
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
              Welcome back — resume creating your stories, exploring ideas, and
              connecting with readers.
            </p>
            <div className="mt-8 flex gap-4 items-center">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 via-sky-400 to-pink-400 shadow-lg" />
              <div className="text-sm text-slate-500">
                Secure sign-in · Fast publishing
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="mx-auto max-w-md bg-slate-900/50 backdrop-blur rounded-3xl p-8 shadow-2xl transform transition-transform duration-700 hover:scale-[1.01]">
              <LoginComponent />

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="col-span-1 py-2 rounded-lg bg-white/6 text-xs">
                  Google
                </button>
                <button className="col-span-1 py-2 rounded-lg bg-white/6 text-xs">
                  GitHub
                </button>
                <button className="col-span-1 py-2 rounded-lg bg-white/6 text-xs">
                  Twitter
                </button>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-slate-200 hover:text-white">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
