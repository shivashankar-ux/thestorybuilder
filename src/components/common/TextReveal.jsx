import { motion, useReducedMotion } from "framer-motion";

export default function TextReveal({
  text,
  children,
  className = "",
  as = "div",
  delay = 0,
  stagger = 0.04,
  once = true,
  type = "words",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return <Component className={className} {...props}>{text || children}</Component>;
  }

  const content = text || (typeof children === "string" ? children : null);

  if (!content) {
    return (
      <Component
        className={className}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  const items = type === "chars" ? content.split("") : content.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Component
      className={`text-reveal-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
      {...props}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {item}{type === "words" && i < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Component>
  );
}
