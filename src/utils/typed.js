/* Lightweight in-house replacement for Typed.js — same API surface
   used by Hero.jsx: `new Typed(el, { strings, typeSpeed, backSpeed,
   backDelay, startDelay, loop, smartBackspace })` and `.destroy()`. */
export function createTyped(el, opts) {
  const {
    strings = [],
    typeSpeed = 60,
    backSpeed = 35,
    backDelay = 1500,
    startDelay = 400,
    loop = true,
    smartBackspace = true,
  } = opts || {};

  let strIdx = 0;
  let charIdx = 0;
  let mode = "typing"; // typing | pausing | deleting | done
  let timer = null;
  let cursor = null;
  let destroyed = false;

  if (!el) return { destroy() {} };

  el.textContent = "";
  cursor = document.createElement("span");
  cursor.className = "typed-cursor";
  cursor.textContent = "|";
  cursor.setAttribute("aria-hidden", "true");
  el.parentNode && el.parentNode.insertBefore(cursor, el.nextSibling);

  const sharedPrefixLen = (a, b) => {
    let i = 0;
    const max = Math.min(a.length, b.length);
    while (i < max && a[i] === b[i]) i++;
    return i;
  };

  const tick = () => {
    if (destroyed) return;
    const cur = strings[strIdx] || "";
    const next = strings[(strIdx + 1) % strings.length] || "";

    if (mode === "typing") {
      if (charIdx < cur.length) {
        el.textContent = cur.slice(0, ++charIdx);
        timer = setTimeout(tick, typeSpeed);
      } else {
        if (!loop && strIdx === strings.length - 1) { mode = "done"; return; }
        mode = "pausing";
        timer = setTimeout(tick, backDelay);
      }
    } else if (mode === "pausing") {
      mode = "deleting";
      timer = setTimeout(tick, backSpeed);
    } else if (mode === "deleting") {
      const stop = smartBackspace ? sharedPrefixLen(cur, next) : 0;
      if (charIdx > stop) {
        el.textContent = cur.slice(0, --charIdx);
        timer = setTimeout(tick, backSpeed);
      } else {
        strIdx = (strIdx + 1) % strings.length;
        mode = "typing";
        timer = setTimeout(tick, typeSpeed);
      }
    }
  };

  timer = setTimeout(tick, startDelay);

  return {
    destroy() {
      destroyed = true;
      if (timer) clearTimeout(timer);
      if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (el) el.textContent = "";
    },
  };
}
