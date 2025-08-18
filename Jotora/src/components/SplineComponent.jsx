import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const SCENE_URL =
  "https://prod.spline.design/X1yIKe869vRK4GpY/scene.splinecode";

export default function SplineComponent() {
  const [ok, setOk] = useState(null); // null = unknown, true = ok, false = fallback

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    // Probe the resource with a short timeout so errors are detected early
    const timeout = setTimeout(() => controller.abort(), 2500);

    fetch(SCENE_URL, { method: "GET", mode: "cors", signal: controller.signal })
      .then((res) => {
        if (!mounted) return;
        if (res.ok) setOk(true);
        else setOk(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn(
          "Spline scene unreachable, falling back:",
          err.message || err
        );
        setOk(false);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  // while probing, render nothing (keeps layout stable)
  if (ok === null) return null;

  if (ok === true) {
    return <Spline scene={SCENE_URL} />;
  }

  // fallback: a subtle animated gradient background that matches the theme
  return (
    <div
      aria-hidden="true"
      className="w-full h-full bg-gradient-to-r from-black via-slate-900 to-black">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-purple-700 via-sky-700 to-pink-700 animate-[gradientShift_8s_linear_infinite]" />
    </div>
  );
}

/* Tailwind-style animation utility (kept inline for compatibility in case no global CSS) */
