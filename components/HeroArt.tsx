"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef } from "react";

// The stream artwork in the bottom-right of the hero. When the page loads the
// water rushes up the stream and the three fish swim up it into their places;
// then everything calms and the page settles on the original artwork exactly
// as it was drawn.
//
// The artwork was cut into pieces for this (public/hero-fish/): stream-v4.png
// is the picture with the fish removed, and each fish-*.png is one fish laid
// out straight (head on the left, tail on the right).
//
// - The water is drawn with a small WebGL shader (WATER_FRAG): a wavy front of
//   water sweeps up the stream from the lower right with a bright crest riding
//   its edge; behind it the stream's edges ripple and bright glints slide up
//   it, all calming to nothing as it settles.
// - Each fish is drawn on a 2D canvas in thin vertical strips, each shifted
//   sideways by a wave running from head to tail (so the body bends and the tail
//   sweeps the widest, like a real fish), on an S-shaped path that eases to a
//   stop.
// - When they are done the original image fades in on top. Without JavaScript,
//   or with reduced motion, the original image is simply shown (see
//   .hero__art-still in globals.css). If WebGL is missing the stream is just
//   drawn still under the swimming fish.
//
// All sizes below are in pixels of the 2160px artwork.
const SHEET = 2160;

type Fish = {
  src: string;
  // where the fish rests: its centre, and the angle of its tail direction
  cx: number;
  cy: number;
  angle: number; // degrees; the straight fish's +x (towards the tail) maps to this
  // the straight sprite
  width: number;
  height: number;
  xs0: number; // sprite x of the rest centre
  ys0: number; // sprite y of the spine
  headX: number;
  length: number; // body length used for the wave; may exceed what is visible
  // how it swims
  delay: number; // s
  duration: number; // s
  bend: number; // tail sweep as a fraction of length
  beat: number; // tail beats per second
  meander: number; // sideways drift of the path, fraction of length
  phase: number;
};

const FISH: Fish[] = [
  {
    src: "/hero-fish/fish-big.png",
    cx: 566.7, cy: 834.9, angle: 21.85,
    width: 786, height: 409, xs0: 392.6, ys0: 204.5, headX: 16, length: 754,
    delay: 0, duration: 4.4, bend: 0.12, beat: 1.55, meander: 0.13, phase: 0.6,
  },
  {
    src: "/hero-fish/fish-middle.png",
    cx: 1524.6, cy: 1486.9, angle: 33.29,
    width: 659, height: 273, xs0: 329.5, ys0: 136.5, headX: 16, length: 626,
    delay: 0, duration: 3.2, bend: 0.125, beat: 1.8, meander: 0.12, phase: 2.1,
  },
  {
    // cut off by the picture's edge, so only its front is known: a gentle
    // swim, and a wave sized for a longer fish than is visible
    src: "/hero-fish/fish-edge.png",
    cx: 2078.9, cy: 1301.1, angle: 27.57,
    width: 412, height: 294, xs0: 138.9, ys0: 147, headX: 16, length: 420,
    delay: 0, duration: 2.6, bend: 0.1, beat: 2.0, meander: 0.2, phase: 4.0,
  },
];

const STREAM_SRC = "/hero-fish/stream-v4.png";

// Water: the front is tied to the first (biggest) fish. It leads the school, and
// the water's leading edge sits WATER_LEAD pixels ahead of its nose, along the
// direction it swims, so the water arrives where the fish is heading and moves
// at exactly the fish's speed. The ripples and glints are carried along at that
// speed too (uCarry), so they slow as it slows and are still when it stops.
const WATER_LEAD = 220;

const WATER_VERT = `#version 300 es
out vec2 vUv;
void main() {
  vec2 pos = vec2(float((gl_VertexID & 1) << 2) - 1.0, float((gl_VertexID & 2) << 1) - 1.0);
  vUv = vec2((pos.x + 1.0) * 0.5, 1.0 - (pos.y + 1.0) * 0.5);
  gl_Position = vec4(pos, 0.0, 1.0);
}`;

const WATER_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uT;       // seconds since the start
uniform float uSettle;  // 0 = lively, 1 = calm
uniform float uFront;   // position of the water's leading edge along the stream
uniform float uCrest;   // how bright the crest on the front is
uniform vec2 uDir;      // the way the first fish faces its tail: along the flow, towards the lower right
uniform float uCarry;   // how far the first fish still has to go: the water's pattern travels with it
const float S = 2160.0;
void main() {
  vec2 DOWN = uDir;
  vec2 ACROSS = vec2(-uDir.y, uDir.x);
  vec2 p = vUv * S;
  float a = dot(p, DOWN);
  float b = dot(p, ACROSS);
  float k = pow(1.0 - uSettle, 1.6);
  float q = a - uCarry; // position along the flow, in the frame that moves with the fish
  // ripples rushing up the stream with the fish, pushing the edges about
  float r1 = sin(q * 0.0105 + uT * 1.3 + b * 0.0016);
  float r2 = sin(q * 0.0245 + uT * 2.1 - b * 0.0052);
  float r3 = sin(b * 0.014 - uT * 1.0 + q * 0.002);
  vec2 d = ACROSS * (r1 * 34.0 + r2 * 13.0) * k + DOWN * (r3 * 11.0) * k;
  vec4 c = texture(uTex, (p + d) / S);
  // the front: wavy, sweeping up the stream
  float edge = uFront + sin(b * 0.0105 + uT * 2.3) * 70.0 + sin(b * 0.0261 - uT * 4.1) * 28.0;
  float vis = smoothstep(-30.0, 55.0, a - edge);
  float crest = exp(-pow((a - edge - 10.0) / 34.0, 2.0)) * uCrest;
  // glints sliding up the water
  float g = pow(0.5 + 0.5 * sin(q * 0.019 - uT * 1.6 + sin(b * 0.009) * 2.4), 9.0);
  float glow = crest * 0.55 + g * 0.28 * k;
  vec3 tint = vec3(0.96, 0.78, 1.0);
  float al = c.a * vis;
  vec3 rgb = min(c.rgb * vis + tint * glow * al, vec3(al));
  outColor = vec4(rgb, al);
}`;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

function makeWater(canvas: HTMLCanvasElement, stream: HTMLImageElement) {
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, WATER_VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, WATER_FRAG);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, stream);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uT = u("uT"), uSettle = u("uSettle"), uFront = u("uFront"), uCrest = u("uCrest"), uDir = u("uDir"), uCarry = u("uCarry");
  gl.uniform1i(u("uTex"), 0);
  return {
    draw(t: number, front: number, settle: number, crest: number, carry: number, dx: number, dy: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, t);
      gl.uniform1f(uSettle, settle);
      gl.uniform1f(uFront, front);
      gl.uniform1f(uCrest, crest);
      gl.uniform1f(uCarry, carry);
      gl.uniform2f(uDir, dx, dy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    clear() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
  };
}

const POWER = 2.3; // how sharply they ease to a stop
// All the fish ride the same current: they start out at this speed (px/s) and
// ease to a stop, each over its own time, so each starts as far away as that
// speed and time need (always beyond the picture's right edge).
const START_SPEED = 1450;
const SETTLED_AT = 0.94; // a fish is "in place" this far through its swim
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// remaining distance to the rest position: fast at first, easing to nothing
const remaining = (s0: number, tau: number) => s0 * Math.pow(1 - tau, POWER);

export default function HeroArt() {
  // start fetching everything the swim needs as early as possible
  preload(STREAM_SRC, { as: "image" });
  FISH.forEach((f) => preload(f.src, { as: "image" }));

  const boxRef = useRef<HTMLDivElement | null>(null);
  const waterRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    const water = waterRef.current;
    const canvas = canvasRef.current;
    if (!box || !water || !canvas) return;
    // reduced motion: CSS shows the original picture straight away
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      box.classList.add("hero__art--settled");
      return;
    }

    let raf = 0;
    let cancelled = false;
    let k = 1; // device pixels per picture pixel

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(box.clientWidth * dpr));
      canvas.width = w;
      canvas.height = w;
      water.width = w;
      water.height = w;
      k = w / SHEET;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    Promise.all([load(STREAM_SRC), ...FISH.map((f) => load(f.src))])
      .then(([stream, ...imgs]) => {
        if (cancelled) return;
        const waterGL = makeWater(water, stream);
        const tails = FISH.map((f) => {
          const rad = (f.angle * Math.PI) / 180;
          return { tx: Math.cos(rad), ty: Math.sin(rad), rad };
        });
        const s0 = FISH.map((f) => (START_SPEED * f.duration) / POWER);
        const phi = FISH.map((f) => f.phase); // wave phase, advanced by the beat
        const endTime = Math.max(...FISH.map((f) => f.delay + SETTLED_AT * f.duration));
        let t = 0;
        let last = performance.now();

        // position of fish i at time tt, and how fast it is going (px/s)
        const pose = (i: number, tt: number) => {
          const f = FISH[i];
          const tau = clamp01((tt - f.delay) / f.duration);
          const rem = remaining(s0[i], tau);
          const m =
            f.meander * f.length * Math.pow(1 - tau, 1.3) *
            Math.sin(2 * Math.PI * 0.34 * (tt - f.delay) + f.phase);
          return { tau, rem, m };
        };

        const draw = (dt: number) => {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          if (waterGL) {
            // the water follows the first fish: its front sits just ahead of the fish's nose
            const lead = pose(0, t);
            const head = FISH[0].headX - FISH[0].xs0; // nose, along the fish, from its centre
            const noseRest = (FISH[0].cx + tails[0].tx * head) * tails[0].tx + (FISH[0].cy + tails[0].ty * head) * tails[0].ty;
            const front = noseRest + lead.rem - WATER_LEAD;
            waterGL.draw(t, front, Math.pow(lead.tau, 1.2), 1 - smooth(0.7, 1, lead.tau), lead.rem, tails[0].tx, tails[0].ty);
          } else {
            ctx.drawImage(stream, 0, 0, canvas.width, canvas.height); // no WebGL: the stream just stays still
          }

          FISH.forEach((f, i) => {
            const img = imgs[i];
            const { tx, ty, rad } = tails[i];
            const { tau, rem, m } = pose(i, t);
            if (tau >= 1) {
              // arrived: hold the rest pose (the original image fades in over it)
            }
            // velocity from a small step back in time: gives the heading
            const prev = pose(i, Math.max(0, t - 0.04));
            const vPar = (prev.rem - rem) / 0.04; // towards the head
            const vPerp = (m - prev.m) / 0.04;
            const speed = Math.hypot(vPar, vPerp);
            const settleFactor = clamp01(speed / (s0[i] / f.duration));
            const heading = Math.atan2(-vPerp, vPar) * settleFactor;

            // the tail beats slower and smaller as the fish slows to a stop
            const sigma = Math.pow(1 - tau, 1.4);
            if (t >= f.delay) phi[i] += 2 * Math.PI * f.beat * (0.4 + 0.6 * sigma) * dt;
            const amp = f.bend * f.length * (0.18 + 0.82 * sigma) * Math.pow(1 - tau, 0.55);

            const px = f.cx + tx * rem + -ty * m;
            const py = f.cy + ty * rem + tx * m;
            const step = Math.max(2, Math.round(2.4 / k)); // sprite px per strip (whole pixels)
            const kappa = 2 * Math.PI * 0.8; // wavelengths along the body

            const lateral = (xs: number) => {
              const u = clamp01((xs - f.headX) / f.length);
              const g = 0.1 + 0.9 * Math.pow(u, 1.8); // head nearly still, tail widest
              return amp * g * Math.sin(phi[i] - kappa * u);
            };

            // each strip is twice as wide as its step, so neighbours overlap by half
            // and no seam shows through
            for (let xs = 0; xs < f.width; xs += step) {
              const d = lateral(xs + step);
              const slope = (lateral(xs + 2 * step) - lateral(xs)) / (2 * step);
              const sw = Math.min(2 * step, f.width - xs);
              ctx.setTransform(k, 0, 0, k, 0, 0);
              ctx.translate(px, py);
              ctx.rotate(rad + heading);
              ctx.translate(xs + step - f.xs0, d);
              ctx.rotate(Math.atan(slope));
              ctx.drawImage(img, xs, 0, sw, f.height, -step, -f.ys0, sw, f.height);
            }
          });
        };

        const frame = (now: number) => {
          if (cancelled) return;
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          t += dt;
          draw(dt);
          if (t >= endTime) {
            box.classList.add("hero__art--settled"); // the original fades in; then the canvas is done
            window.setTimeout(() => {
              if (!cancelled) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                waterGL?.clear();
              }
            }, 700);
            return;
          }
          raf = requestAnimationFrame(frame);
        };
        draw(0);
        raf = requestAnimationFrame(frame);
      })
      .catch(() => box.classList.add("hero__art--settled")); // something failed to load: show the picture

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="hero__art"
      aria-hidden="true"
    >
      <canvas ref={waterRef} className="hero__art-water" />
      <canvas ref={canvasRef} className="hero__art-canvas" />
      <Image
        className="hero__art-still"
        src="/landing_background_2x.png"
        alt=""
        width={SHEET}
        height={SHEET}
        sizes="45vw"
        // it is on screen but invisible until the swim ends: fetch it, but
        // behind everything the animation needs first
        loading="eager"
        fetchPriority="low"
      />
    </div>
  );
}
