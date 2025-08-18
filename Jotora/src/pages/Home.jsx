import React from "react";
import SplineComponent from "../components/SplineComponent";
import { Header } from "../components";

function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center -mt-16 overflow-hidden bg-black">
      {/* Header (over hero) */}
      <Header />

      {/* Spline canvas background */}
      <div className="absolute inset-0 z-10">
        <SplineComponent />
      </div>

      {/* Content: centered card */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <h1
          className="text-6xl md:text-8xl font-light tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-sky-300 to-pink-400 drop-shadow-[0_12px_40px_rgba(99,102,241,0.12)]"
          style={{ fontFamily: "'Montserrat', 'Playfair Display', serif" }}>
          Jotora
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-slate-200/90 max-w-xl font-medium">
          Discover. Create. Connect.
        </p>
        <div className="mt-8 w-36 h-1 rounded-full bg-gradient-to-r from-purple-400 via-sky-400 to-pink-400 shadow-lg opacity-90" />
      </div>

      {/* Watermark cover */}
      <div
        className="absolute right-4 bottom-4 w-36 h-11 rounded-full bg-black shadow-2xl z-30"
        aria-hidden="true"
      />
    </div>
  );
}

export default Home;
