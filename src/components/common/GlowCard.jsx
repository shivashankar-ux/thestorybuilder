import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function GlowCard({
  children,
  className = "",
  style = {},
  onClick,
  enableTilt = true,
  glowColor = "rgba(245, 158, 11, 0.15)",
  borderColor = "rgba(245, 158, 11, 0.3)",
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-6, 6]);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current.style.setProperty("--mouse-x", `${(e.clientX - rect.left)}px`);
    cardRef.current.style.setProperty("--mouse-y", `${(e.clientY - rect.top)}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: enableTilt && !shouldReduceMotion ? rotateX : 0,
        rotateY: enableTilt && !shouldReduceMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
        ...style,
      }}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      <div
        className="glow-spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="glow-border"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${borderColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="glow-card-content">{children}</div>
    </motion.div>
  );
}
