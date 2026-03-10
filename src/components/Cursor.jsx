import { useEffect, useRef } from "react";

// 🔑 REACT CONCEPT: A "component" is just a function that returns JSX.
// Your old script.js cursor code lived globally — here it lives
// INSIDE this component, self-contained and reusable.

export default function Cursor() {
  // 🔑 useRef: Like a "pointer" to a real DOM element.
  // We need direct access to move the cursor divs with style.left/top.
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on mouse devices
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    let mx = -200, my = -200, rx = -200, ry = -200;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    // Smooth ring follow loop
    let frame;
    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const HOVER = "a,button,.sk,.card,.reach-card,.photo-wrap";
    const onOver = (e) => { if (e.target.closest(HOVER)) document.body.classList.add("hovering"); };
    const onOut  = (e) => { if (e.target.closest(HOVER)) document.body.classList.remove("hovering"); };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    // 🔑 CLEANUP: When this component unmounts (leaves the screen),
    // we MUST remove event listeners. In plain JS you never did this —
    // in React it prevents memory leaks.
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, []); // [] means: run this effect only ONCE when component first mounts

  return (
    <>
      <div className="cur-dot"  ref={dotRef}  aria-hidden="true" />
      <div className="cur-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
