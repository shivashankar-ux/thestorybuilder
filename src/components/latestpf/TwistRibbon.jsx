import React, { useEffect, useRef, useState } from "react";

const srcOf = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? v.src || "" : "");

/* ----------------------------------------------------------------------------
 * Math helpers (column-major mat4 like WebGL expects)
 * ------------------------------------------------------------------------- */
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const rotAround = (v, k, ang) => {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const kv = cross(k, v);
  const kd = dot(k, v) * (1 - c);
  return [
    v[0] * c + kv[0] * s + k[0] * kd,
    v[1] * c + kv[1] * s + k[1] * kd,
    v[2] * c + kv[2] * s + k[2] * kd,
  ];
};
function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}
function modelView(ax, ay, az, dist, ty) {
  const cx = Math.cos(ax), sx = Math.sin(ax);
  const cy = Math.cos(ay), sy = Math.sin(ay);
  const cz = Math.cos(az), sz = Math.sin(az);
  const r00 = cy * cz;
  const r01 = -cy * sz;
  const r02 = sy;
  const r10 = sx * sy * cz + cx * sz;
  const r11 = -sx * sy * sz + cx * cz;
  const r12 = -sx * cy;
  const r20 = -cx * sy * cz + sx * sz;
  const r21 = cx * sy * sz + sx * cz;
  const r22 = cx * cy;
  const mv = new Float32Array([
    r00, r10, r20, 0,
    r01, r11, r21, 0,
    r02, r12, r22, 0,
    0, ty, -dist, 1,
  ]);
  const nm = new Float32Array([r00, r10, r20, r01, r11, r21, r02, r12, r22]);
  return { mv, nm };
}

/* ----------------------------------------------------------------------------
 * Ribbon path: a figure-eight with depth
 * ------------------------------------------------------------------------- */
function buildRibbon(A, Bh, depth, vertical, M = 900) {
  const raw = [];
  const RAW = 4000;
  for (let i = 0; i < RAW; i++) {
    const t = (i / RAW) * Math.PI * 2;
    const x = A * Math.sin(t);
    const y = (Bh / 2) * Math.sin(2 * t);
    const z = depth * Math.cos(t);
    raw.push(vertical ? [y, x, z] : [x, y, z]);
  }
  const cum = [0];
  for (let i = 1; i <= RAW; i++) {
    const a = raw[i - 1];
    const b = raw[i % RAW];
    cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
  }
  const L = cum[RAW];
  const P = [];
  let j = 0;
  for (let i = 0; i < M; i++) {
    const target = (i / M) * L;
    while (cum[j + 1] < target) j++;
    const f = (target - cum[j]) / (cum[j + 1] - cum[j] || 1);
    const a = raw[j % RAW];
    const b = raw[(j + 1) % RAW];
    P.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]);
  }
  const T = P.map((_, i) => norm(sub(P[(i + 1) % M], P[(i - 1 + M) % M])));
  const N = [];
  const n0 = norm(cross([0, 0, 1], T[0]));
  N.push(n0);
  for (let i = 1; i < M; i++) {
    const prev = N[i - 1];
    const t = T[i];
    N.push(norm(sub(prev, [t[0] * dot(prev, t), t[1] * dot(prev, t), t[2] * dot(prev, t)])));
  }
  const last = N[M - 1];
  const t0 = T[0];
  const lp = norm(sub(last, [t0[0] * dot(last, t0), t0[1] * dot(last, t0), t0[2] * dot(last, t0)]));
  const mis = Math.atan2(dot(cross(lp, N[0]), t0), dot(lp, N[0]));
  for (let i = 0; i < M; i++) N[i] = norm(rotAround(N[i], T[i], (mis * i) / M));
  const B = T.map((t, i) => norm(cross(t, N[i])));

  const count = (M + 1) * 2;
  const aP = new Float32Array(count * 3);
  const aN = new Float32Array(count * 3);
  const aB = new Float32Array(count * 3);
  const aT = new Float32Array(count * 3);
  const aS = new Float32Array(count);
  const aSide = new Float32Array(count);
  for (let i = 0; i <= M; i++) {
    const k = i % M;
    for (let side = 0; side < 2; side++) {
      const v = i * 2 + side;
      aP.set(P[k], v * 3);
      aN.set(N[k], v * 3);
      aB.set(B[k], v * 3);
      aT.set(T[k], v * 3);
      aS[v] = i / M;
      aSide[v] = side;
    }
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of P) {
    minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
    minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
  }
  return { aP, aN, aB, aT, aS, aSide, count, L, M, P, N, B, T, width: maxX - minX, height: maxY - minY };
}

/* ----------------------------------------------------------------------------
 * Shaders
 * ------------------------------------------------------------------------- */
const RIBBON_VS = `#version 300 es
in vec3 aP; in vec3 aN; in vec3 aB; in vec3 aT; in float aS; in float aSide;
uniform mat4 uProj; uniform mat4 uMV; uniform mat3 uNM;
uniform float uTwists; uniform float uPhase; uniform float uWidth; uniform float uBase;
out vec2 vUv; out vec3 vNormal; out vec3 vView;
void main(){
  float th = uTwists * 6.28318530718 * aS + uPhase + uBase;
  vec3 W = cos(th) * aN + sin(th) * aB;
  vec3 pos = aP + W * (aSide - 0.5) * uWidth;
  vec3 n = cross(aT, W);
  vec4 mv = uMV * vec4(pos, 1.0);
  vView = mv.xyz;
  vNormal = uNM * n;
  vUv = vec2(aS, aSide);
  gl_Position = uProj * mv;
}`;

const RIBBON_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec3 vNormal; in vec3 vView;
uniform sampler2D uAtlas;
uniform float uCount; uniform float uOffset; uniform float uImgCount;
uniform float uCols; uniform float uRows; uniform float uAspect;
uniform float uGap; uniform float uRadius; uniform float uReveal;
uniform vec3 uBg; uniform float uFog; uniform float uNear; uniform float uFar;
uniform float uShade; uniform float uBackMode; uniform vec3 uBack; uniform float uHasImg;
uniform float uFlip[48];
out vec4 outColor;
float sdRound(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
void main(){
  if (vUv.x > uReveal) discard;
  float u = fract(vUv.x - uOffset) * uCount;
  float idx = floor(u);
  vec2 p = vec2(fract(u) * uAspect, vUv.y);
  vec2 halfSize = vec2(uAspect, 1.0) * 0.5;
  vec2 inner = halfSize - vec2(uGap * 0.5);
  float d = sdRound(p - halfSize, inner, uRadius);
  float aa = fwidth(d) * 1.2;
  float alpha = 1.0 - smoothstep(-aa, aa, d);
  vec2 iuvG = (p - (halfSize - inner)) / (inner * 2.0);
  vec2 gx = dFdx(iuvG) / vec2(uCols, uRows);
  vec2 gy = dFdy(iuvG) / vec2(uCols, uRows);
  if (alpha < 0.02) discard;
  vec2 iuv = (p - (halfSize - inner)) / (inner * 2.0);
  bool front = gl_FrontFacing;
  if (front) iuv.y = 1.0 - iuv.y;
  if (uFlip[int(min(idx, 47.0))] > 0.5) iuv = 1.0 - iuv;
  vec3 col;
  if (front && uBackMode > 0.5) {
    col = uBack;
  } else if (uHasImg > 0.5) {
    float img = idx - uImgCount * floor((idx + 0.5) / uImgCount);
    float r = floor((img + 0.5) / uCols);
    float c = img - uCols * r;
    vec2 auv = vec2((c + iuv.x) / uCols, 1.0 - (r + 1.0 - iuv.y) / uRows);
    col = textureGrad(uAtlas, auv, gx, gy).rgb;
  } else {
    float k = mod(idx, 5.0) / 5.0;
    col = mix(vec3(0.96,0.62,0.04), vec3(0.94,0.27,0.1), k);
  }
  vec3 n = normalize(vNormal);
  vec3 v = normalize(-vView);
  float ndv = abs(dot(n, v));
  float light = mix(1.0 - uShade, 1.0, smoothstep(0.0, 0.85, ndv));
  col *= light;
  col += vec3(1.0) * pow(1.0 - ndv, 6.0) * 0.08 * uShade;
  float fz = smoothstep(uNear, uFar, -vView.z) * uFog;
  col = mix(col, uBg, fz);
  outColor = vec4(col * alpha, alpha);
}`;

const TEXT_VS = `#version 300 es
in vec2 aPos;
uniform mat4 uProj; uniform mat4 uMV; uniform vec2 uSize; uniform float uLift;
out vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  vec3 p = vec3(aPos * uSize * 0.5, 0.0);
  p.y += uLift;
  gl_Position = uProj * uMV * vec4(p, 1.0);
}`;

const TEXT_FS = `#version 300 es
precision highp float;
in vec2 vUv; uniform sampler2D uTex; uniform float uOpacity;
out vec4 outColor;
void main(){ vec4 t = texture(uTex, vUv); outColor = t * uOpacity; }`;

function compile(gl, vs, fs) {
  const mk = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error(log || "shader error");
    }
    return s;
  };
  const p = gl.createProgram();
  gl.attachShader(p, mk(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link error");
  return p;
}

function hexToRgb(c) {
  const m = /rgba?\(([^)]+)\)/.exec(c);
  if (m) {
    const [r, g, b] = m[1].split(",").map((x) => parseFloat(x));
    return [r / 255, g / 255, b / 255];
  }
  const hm = /#([0-9a-fA-F]{3,8})/.exec(c);
  let h = hm ? hm[1] : "0B0D12";
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return [0.04, 0.05, 0.07];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const easeOut = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const easeInOut = (x) => {
  x = Math.min(1, Math.max(0, x));
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export default function TwistRibbon({
  images = [],
  wordmark = "kringle",
  fontFamily = "Bricolage Grotesque",
  fontWeight = 700,
  wordmarkColor = "#111111",
  wordmarkSize = 0.62,
  background = "#F3EFEA",
  ribbonWidth = 0.95,
  cardShape = 0.75,
  gap = 0.06,
  corners = 0.08,
  twists = 2,
  depth = 1.15,
  speed = 0.35,
  twistDrift = 0.25,
  backFace = "image",
  backColor = "#111111",
  shading = 0.35,
  fog = 0.3,
  tilt = 1,
  drag = true,
  scrollBoost = 1,
  scrollMotion = 1,
  intro = true,
  orientation = "auto",
  style = {},
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({});
  propsRef.current = {
    images,
    wordmark,
    fontFamily,
    fontWeight,
    wordmarkColor,
    wordmarkSize,
    background,
    ribbonWidth,
    cardShape,
    gap,
    corners,
    twists,
    depth,
    speed,
    twistDrift,
    backFace,
    backColor,
    shading,
    fog,
    tilt,
    drag,
    scrollBoost,
    scrollMotion,
    intro,
    orientation,
  };
  const [failed, setFailed] = useState(false);

  const imgKey = (images || []).join("|");
  const geoKey = [ribbonWidth, cardShape, depth, orientation].join("|");
  const textKey = [wordmark, fontFamily, fontWeight, wordmarkColor, wordmarkSize].join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
    if (!gl) {
      setFailed(true);
      return;
    }
    let disposed = false;
    let raf = 0;
    let ribbonProg;
    let textProg;
    try {
      ribbonProg = compile(gl, RIBBON_VS, RIBBON_FS);
      textProg = compile(gl, TEXT_VS, TEXT_FS);
    } catch (e) {
      console.warn("TwistRibbon compile error:", e);
      setFailed(true);
      return;
    }
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    /* ---- geometry ---- */
    const vao = gl.createVertexArray();
    const buffers = [];
    let geo = null;
    let vertical = false;
    const uploadGeo = () => {
      const p = propsRef.current;
      geo = buildRibbon(2.4, 2.3, p.depth ?? 1.15, vertical);
      gl.bindVertexArray(vao);
      buffers.forEach((b) => gl.deleteBuffer(b));
      buffers.length = 0;
      const attr = (name, data, size) => {
        const loc = gl.getAttribLocation(ribbonProg, name);
        if (loc < 0) return;
        const b = gl.createBuffer();
        buffers.push(b);
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };
      attr("aP", geo.aP, 3);
      attr("aN", geo.aN, 3);
      attr("aB", geo.aB, 3);
      attr("aT", geo.aT, 3);
      attr("aS", geo.aS, 1);
      attr("aSide", geo.aSide, 1);
      gl.bindVertexArray(null);
    };

    /* ---- wordmark quad ---- */
    const textVao = gl.createVertexArray();
    const quad = gl.createBuffer();
    gl.bindVertexArray(textVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const tl = gl.getAttribLocation(textProg, "aPos");
    gl.enableVertexAttribArray(tl);
    gl.vertexAttribPointer(tl, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    const textTex = gl.createTexture();
    let textAspect = 4;
    let textReady = false;
    const drawText = async () => {
      const p = propsRef.current;
      const word = p.wordmark || "kringle";
      const fam = p.fontFamily || "Bricolage Grotesque";
      const w = p.fontWeight || 700;
      try {
        await document.fonts?.load?.(`${w} 200px "${fam}"`);
      } catch (_) {}
      if (disposed) return;
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      const fs = 360;
      ctx.font = `${w} ${fs}px "${fam}", sans-serif`;
      const m = ctx.measureText(word);
      const asc = m.actualBoundingBoxAscent || fs * 0.75;
      const desc = m.actualBoundingBoxDescent || fs * 0.2;
      const left = m.actualBoundingBoxLeft || 0;
      const right = m.actualBoundingBoxRight || m.width;
      const pad = 24;
      c.width = Math.ceil(left + right + pad * 2);
      c.height = Math.ceil(asc + desc + pad * 2);
      ctx.font = `${w} ${fs}px "${fam}", sans-serif`;
      ctx.fillStyle = p.wordmarkColor || "#111111";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(word, pad + left, pad + asc);
      textAspect = c.width / c.height;
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      textReady = true;
    };

    /* ---- image atlas ---- */
    const atlasTex = gl.createTexture();
    let imgCount = 0;
    let cols = 1;
    let rows = 1;
    let loadedAt = 0;
    const aniso =
      gl.getExtension("EXT_texture_filter_anisotropic") ||
      gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    const buildAtlas = async () => {
      const p = propsRef.current;
      const list = (p.images || []).map(srcOf).filter(Boolean).slice(0, 24);
      const aspect = Math.max(0.4, Math.min(2, p.cardShape ?? 0.75));
      const cellH = 640;
      const cellW = Math.round(cellH * aspect);
      const loaded = (await Promise.all(list.map(loadImage))).filter(Boolean);
      if (disposed) return;
      if (!loaded.length) {
        imgCount = 0;
        return;
      }
      cols = Math.max(1, Math.min(loaded.length, Math.floor(4096 / cellW)));
      rows = Math.ceil(loaded.length / cols);
      const c = document.createElement("canvas");
      c.width = cols * cellW;
      c.height = rows * cellH;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      loaded.forEach((img, i) => {
        const cx = (i % cols) * cellW;
        const cy = Math.floor(i / cols) * cellH;
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = cellW / cellH;
        let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
        if (ir > cr) { sw = sh * cr; sx = (img.naturalWidth - sw) / 2; }
        else { sh = sw / cr; sy = (img.naturalHeight - sh) / 2; }
        ctx.drawImage(img, sx, sy, sw, sh, cx, cy, cellW, cellH);
      });
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 8);
      imgCount = loaded.length;
      loadedAt = performance.now();
    };

    /* ---- uniforms ---- */
    const U = (prog, names) => {
      const o = {};
      names.forEach((n) => (o[n] = gl.getUniformLocation(prog, n)));
      return o;
    };
    const ru = U(ribbonProg, [
      "uProj", "uMV", "uNM", "uBase", "uTwists", "uPhase", "uWidth", "uAtlas", "uCount", "uOffset",
      "uImgCount", "uCols", "uRows", "uAspect", "uGap", "uRadius", "uReveal", "uBg", "uFog",
      "uNear", "uFar", "uShade", "uBackMode", "uBack", "uHasImg", "uFlip",
    ]);
    const tu = U(textProg, ["uProj", "uMV", "uSize", "uTex", "uOpacity", "uLift"]);

    /* ---- sizing ---- */
    let W = 1, H = 1, dpr = 1;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const o = propsRef.current.orientation || "auto";
      const wantVertical = o === "vertical" || (o === "auto" && H > W * 1.15);
      if (wantVertical !== vertical || !geo) {
        vertical = wantVertical;
        uploadGeo();
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ---- interaction ---- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let dragging = false;
    let lastX = 0;
    let dragVel = 0;
    let offset = 0;
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    let scrollP = 0;
    let scrollS = 0;
    let prevScrollS = 0;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const v = (dx / Math.max(320, W)) * 0.35;
        offset -= v;
        dragVel = -v / 0.016;
      }
    };
    const onDown = (e) => {
      if (!propsRef.current.drag) return;
      dragging = true;
      lastX = e.clientX;
      dragVel = 0;
      wrap.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragging = false;
      wrap.style.cursor = propsRef.current.drag ? "grab" : "default";
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel += (y - lastScroll) * 0.0009 * (propsRef.current.scrollBoost ?? 1);
      lastScroll = y;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (e) => {
      const dy = Math.max(-120, Math.min(120, e.deltaY));
      scrollVel += dy * 0.0011 * (propsRef.current.scrollBoost ?? 1);
    };
    wrap.addEventListener("wheel", onWheel, { passive: true });
    wrap.style.cursor = drag ? "grab" : "default";

    let visible = true;
    const io = new IntersectionObserver((ents) => {
      visible = ents[0]?.isIntersecting ?? true;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(wrap);

    /* ---- render loop ---- */
    const start = performance.now();
    let last = start;
    let phase = 0;
    const flips = new Float32Array(48);

    const frame = (now) => {
      raf = 0;
      if (disposed) return;
      const p = propsRef.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;
      const introActive = p.intro !== false && !reduce;
      const k = introActive ? t / 3.4 : 1;
      const reveal = introActive ? easeInOut(Math.min(1, k * 1.15)) : 1;
      const dolly = introActive ? 1 + (1 - easeOut(k)) * 0.35 : 1;
      const textIn = introActive ? easeOut((t - 2.0) / 1.4) : 1;
      const imgFade = imgCount ? easeOut((now - loadedAt) / 700) : 0;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      scrollVel *= 0.92;

      const rr = wrap.getBoundingClientRect();
      scrollP = rr.height > 0 ? Math.max(0, Math.min(1, -rr.top / rr.height)) : 0;
      scrollS += (scrollP - scrollS) * (reduce ? 1 : 0.08);

      const sm = reduce ? 0 : p.scrollMotion ?? 1;
      const sE = easeInOut(scrollS) * sm;
      const sD = (scrollS - prevScrollS) * sm;
      prevScrollS = scrollS;

      if (!dragging) {
        dragVel *= 0.94;
        offset += dragVel * dt;
      }
      const spd = reduce ? 0 : p.speed ?? 0.35;
      if (!geo) return;
      const ribbonW = Math.max(0.2, p.ribbonWidth ?? 0.95);
      const aspectWanted = Math.max(0.4, Math.min(2, p.cardShape ?? 0.75));
      const cardCount = Math.min(48, Math.max(4, Math.round(geo.L / (ribbonW * aspectWanted))));
      const aspect = geo.L / (cardCount * ribbonW);
      offset += ((spd + scrollVel * 6) / cardCount) * dt * (introActive ? Math.min(1, k * 1.5) : 1);
      phase += ((reduce ? 0 : p.twistDrift ?? 0.25) + scrollVel * 2) * dt + sD * 3.2;
      offset += sD * 0.9;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const fov = (30 * Math.PI) / 180;
      const aspectV = W / H;
      const margin = 1.06;
      const halfW = (geo.width / 2 + ribbonW * 0.6) * margin;
      const halfH = (geo.height / 2 + ribbonW * 0.6) * margin;
      const distW = halfW / (Math.tan(fov / 2) * aspectV);
      const distH = halfH / Math.tan(fov / 2);
      const dist = Math.max(distW, distH) * dolly * (1 - sE * 0.22);
      const proj = perspective(fov, aspectV, 0.1, 100);
      const tiltAmt = p.tilt ?? 1;
      const breathe = reduce ? 0 : Math.sin(t * 0.35) * 0.06;
      const ax = (-0.12 + pointer.y * 0.16) * tiltAmt + (introActive ? (1 - easeOut(k)) * -0.35 : 0) + sE * 0.42;
      const ay = (pointer.x * 0.28 + breathe) * tiltAmt + (introActive ? (1 - easeOut(k)) * 0.6 : 0) + sE * 0.75;
      const az = vertical ? 0 : introActive ? (1 - easeOut(k)) * -0.08 : 0;
      const { mv, nm } = modelView(ax, ay, az, dist, 0);
      const bg = hexToRgb(p.background || "#0B0D12");

      // Keep photo upright
      const tw = Math.round(p.twists ?? 2);
      const f = 1 / Math.tan(fov / 2);
      const rot = (v) => [
        nm[0] * v[0] + nm[3] * v[1] + nm[6] * v[2],
        nm[1] * v[0] + nm[4] * v[1] + nm[7] * v[2],
        nm[2] * v[0] + nm[5] * v[1] + nm[8] * v[2],
      ];
      for (let c = 0; c < cardCount; c++) {
        const sc = ((((c + 0.5) / cardCount + offset) % 1) + 1) % 1;
        const i = Math.round(sc * geo.M) % geo.M;
        const th = tw * Math.PI * 2 * sc + phase;
        const Pn = geo.P[i], Nn = geo.N[i], Bn = geo.B[i], Tn = geo.T[i];
        const ct = Math.cos(th), st = Math.sin(th);
        const Wd = [ct * Nn[0] + st * Bn[0], ct * Nn[1] + st * Bn[1], ct * Nn[2] + st * Bn[2]];
        const nn = cross(Tn, Wd);
        const pv = rot(Pn);
        pv[2] -= dist;
        const wv = rot(Wd);
        const nv = rot(nn);
        const plusSide = -(nv[0] * pv[0] + nv[1] * pv[1] + nv[2] * pv[2]) > 0;
        const up = plusSide ? wv : [-wv[0], -wv[1], -wv[2]];
        const e = 0.05;
        const y0 = (f * pv[1]) / -pv[2];
        const y1 = (f * (pv[1] + up[1] * e)) / -(pv[2] + up[2] * e);
        const dy = y1 - y0;
        if (dy < -0.004) flips[c] = 1;
        else if (dy > 0.004) flips[c] = 0;
      }

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.depthMask(true);

      gl.useProgram(ribbonProg);
      gl.uniformMatrix4fv(ru.uProj, false, proj);
      gl.uniformMatrix4fv(ru.uMV, false, mv);
      gl.uniformMatrix3fv(ru.uNM, false, nm);
      gl.uniform1f(ru.uTwists, Math.round(p.twists ?? 2));
      gl.uniform1f(ru.uBase, 0);
      gl.uniform1f(ru.uPhase, phase);
      gl.uniform1f(ru.uWidth, ribbonW);
      gl.uniform1f(ru.uCount, cardCount);
      gl.uniform1f(ru.uOffset, offset);
      gl.uniform1f(ru.uImgCount, Math.max(1, imgCount));
      gl.uniform1f(ru.uCols, cols);
      gl.uniform1f(ru.uRows, rows);
      gl.uniform1f(ru.uAspect, aspect);
      gl.uniform1f(ru.uGap, Math.max(0, Math.min(0.4, p.gap ?? 0.06)));
      gl.uniform1f(ru.uRadius, Math.max(0.001, Math.min(0.3, p.corners ?? 0.08)));
      gl.uniform1f(ru.uReveal, reveal);
      gl.uniform3f(ru.uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(ru.uFog, p.fog ?? 0.35);
      gl.uniform1f(ru.uNear, dist - 1.2);
      gl.uniform1f(ru.uFar, dist + 1.6);
      gl.uniform1f(ru.uShade, p.shading ?? 0.45);
      gl.uniform1f(ru.uBackMode, p.backFace === "color" ? 1 : 0);
      const back = hexToRgb(p.backColor || "#111827");
      gl.uniform3f(ru.uBack, back[0], back[1], back[2]);
      gl.uniform1f(ru.uHasImg, imgCount && imgFade > 0.01 ? 1 : 0);
      gl.uniform1fv(ru.uFlip, flips);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlasTex);
      gl.uniform1i(ru.uAtlas, 0);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, geo.count);
      gl.bindVertexArray(null);

      if (textReady && textIn > 0.001) {
        gl.useProgram(textProg);
        gl.depthMask(false);
        const twText = geo.width * (p.wordmarkSize ?? 0.55) * (vertical ? 1.4 : 1);
        gl.uniformMatrix4fv(tu.uProj, false, proj);
        gl.uniformMatrix4fv(tu.uMV, false, mv);
        gl.uniform2f(tu.uSize, twText, twText / textAspect);
        gl.uniform1f(tu.uOpacity, textIn);
        gl.uniform1f(tu.uLift, (1 - textIn) * -0.25);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textTex);
        gl.uniform1i(tu.uTex, 1);
        gl.bindVertexArray(textVao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindVertexArray(null);
        gl.depthMask(true);
      }

      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      if (!document.hidden && visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    buildAtlas();
    drawText();
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onVis);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteBuffer(quad);
      gl.deleteTexture(atlasTex);
      gl.deleteTexture(textTex);
      gl.deleteProgram(ribbonProg);
      gl.deleteProgram(textProg);
    };
  }, [imgKey, geoKey, textKey]);

  const base = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background,
    touchAction: "pan-y",
    userSelect: "none",
    ...style,
  };

  if (failed) {
    const list = (images || []).map(srcOf).filter(Boolean).slice(0, 7);
    return (
      <div style={base}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: 1400,
          }}
        >
          <div style={{ position: "absolute", display: "flex", gap: "1.2%", width: "92%", justifyContent: "center", transform: "rotateX(14deg) rotateZ(-8deg)" }}>
            {(list.length ? list : [0, 1, 2, 3, 4, 5, 6]).map((src, i) => {
              const d = i - 3;
              return (
                <div
                  key={i}
                  style={{
                    flex: "0 0 12%",
                    aspectRatio: "3 / 4",
                    borderRadius: 14,
                    background: typeof src === "string" ? `url(${src}) center/cover` : i % 2 ? "#F59E0B" : "#1E293B",
                    transform: `translateY(${Math.abs(d) * -18}px) rotateY(${d * 9}deg)`,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              position: "relative",
              fontFamily: `"${fontFamily}", sans-serif`,
              fontWeight,
              color: wordmarkColor,
              fontSize: `${wordmarkSize * 18}vw`,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            {wordmark}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={base}>
      <canvas
        ref={canvasRef}
        aria-label={wordmark}
        role="img"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
