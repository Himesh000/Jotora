import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./footer-anim.css";

function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`footer-anim-root ${
        visible ? "visible" : "translate-hidden"
      } bg-black border-t border-slate-800 text-slate-300 relative overflow-hidden`}>
      <div className="footer-sweep" />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[220px]">
            <div className="mb-4 inline-flex items-center">
              <Logo width="96px" />
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Jotora. All rights reserved.
            </p>
            <div className="mt-6 footer-gradient-anim" />
          </div>

          <div className="flex gap-8 flex-wrap flex-1 justify-end min-w-[300px]">
            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-500 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-500 mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-slate-300 hover:text-white"
                    to="/">
                    Docs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
