import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * GlowCard — Interactive card with mouse-tracking spotlight glow,
 * subtle 3D tilt, and animated border gradient.
 *
 * Props:
 *   children        – card content
 *   className       – forwarded to wrapper
 *   style           – forwarded to wrapper
 *   onClick         – click handler
 *   enableTilt      – enable 3D tilt on hover (default: true)
 *   glowColor       – spotlight fill color
 *   borderColor     – border highlight color
 *   glowSize        – radial-gradient size in px (default: 500)
 *   tiltAmount      – max degrees of tilt (default: 6)
 */
export default function GlowCard({
  children,
  className = "",
  style = {},
  onClick,
  enableTilt = true,
  glowColor = "rgba(245, 158, 11, 0.13)",
  borderColor = "rgba(245, 158, 11, 0.28)",
  glowSize = 500,
  tiltAmount = 5,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]);

  const springConfig = { damping: 22, stiffness: 260, mass: 0.4 };
  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    // CSS custom props for the spotlight radial-gradient
    cardRef.current.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const shouldTilt = enableTilt && !shouldReduceMotion;

  return (
    <motion.div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: shouldTilt ? rotateX : 0,
        rotateY: shouldTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        ...style,
      }}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {/* Spotlight fill */}
      <div
        className="glow-spotlight"
        style={{
          opacity: isHovered && !shouldReduceMotion ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      {/* Border highlight ring */}
      <div
        className="glow-border-ring"
        style={{
          opacity: isHovered && !shouldReduceMotion ? 1 : 0,
          background: `radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${borderColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="glow-card-content">{children}</div>
    </motion.div>
  );
}
