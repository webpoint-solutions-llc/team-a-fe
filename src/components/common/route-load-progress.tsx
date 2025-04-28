import { useRouter } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";

const RouteLoadProgress = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [progress, setProgress] = useState(0);

  router.subscribe("onBeforeNavigate", () => setIsAnimating(true));
  router.subscribe("onResolved", () => setIsAnimating(false));

  useEffect(() => {
    let timer: any;

    if (isAnimating) {
      setShow(true);
      // Simulate the progress bar loading
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            return 90;
          }
          return Math.min(oldProgress + Math.random() * 10, 100); // Random increase in progress
        });
      }, 200);
    } else if (!isAnimating) {
      // Reset after load finishes
      //   const resetTimer = setTimeout(() => {
      setProgress(100);
      return () => clearInterval(timer);
      //   }, 500);

      //   return () => clearTimeout(resetTimer);
    }

    return () => clearInterval(timer);
  }, [isAnimating, progress]);

  React.useEffect(() => {
    let t2: any;

    if (progress >= 100) {
      t2 = setTimeout(() => {
        setShow(false);
        setProgress(0);
      }, 100);
    }

    return () => clearTimeout(t2);
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 z-50 h-2 w-full bg-transparent">
      {show && progress > 0 && (
        <div
          style={{
            height: "8px",
            width: `${progress}%`,
            backgroundColor: "#29d",
            transition: "width 0.2s ease",
          }}
        />
      )}
    </div>
  );
};

export { RouteLoadProgress };
