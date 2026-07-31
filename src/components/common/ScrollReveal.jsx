import { motion } from "framer-motion";

/**
 * ScrollReveal — Generic scroll-triggered entry animation wrapper.
 *
 * Props:
 *   children    – content to animate
 *   direction   – "up" | "down" | "left" | "right" | "none" (default: "up")
 *   delay       – seconds (default: 0)
 *   duration    – seconds (default: 0.65)
 *   amount      – viewport intersection (default: 0.15)
 *   once        – animate only on first enter (default: true)
 *   distance    – px offset (default: 32)
 *   blur        – add blur entrance (default: false)
 *   className / style – forwarded to wrapper
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.15,
  once = true,
  distance = 32,
  blur = false,
  className = "",
  style = {},
  as: Tag = motion.div,
  ...rest
}) {
  const offsets = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  };

  const initial = {
    opacity: 0,
    ...offsets[direction],
    ...(blur ? { filter: "blur(6px)" } : {}),
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
  };

  return (
    <Tag
      className={className}
      style={style}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
