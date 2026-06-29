"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("rp-loaded")) return;
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rp-loaded", "1");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#f5f5f0",
              letterSpacing: "-0.01em",
            }}
          >
            Ross Patel
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
