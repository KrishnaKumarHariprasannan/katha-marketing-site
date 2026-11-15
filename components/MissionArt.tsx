"use client";

import { useSyncExternalStore } from "react";

// Illustration 04 of "What changes": a curvy, tangled line straightens out and
// heads for the target. The morph is SMIL (<animate>) so it works in every
// browser; with reduced motion the end state is drawn instead, still.
const BROWN = "#8a4e0a";
const TARGET_X = 340;
const TIMES = "0;0.35;0.65;0.8;1";
const EASE = ".4 0 .2 1;".repeat(4).slice(0, -1);

// A line of five half-waves of height `a`, ending at x = `end`
function line(a: number, end: number, lastCtrl: number) {
  return (
    `M40 100 C55 ${100 - a} 75 ${100 - a} 90 100 ` +
    `S125 ${100 + a} 140 100 S175 ${100 - a} 190 100 ` +
    `S225 ${100 + a} 240 100 S${lastCtrl} ${100 - a} ${end} 100`
  );
}

const WAVY = line(44, 290, 275);
const STRAIGHT = line(0, 290, 275);
const TO_TARGET = line(0, 322, 300);
const PATH_VALUES = [WAVY, WAVY, STRAIGHT, TO_TARGET, TO_TARGET].join(";");
const DOT_VALUES = "290;290;290;322;322";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MissionArt() {
  const still = useSyncExternalStore(subscribe, reduced, () => false);

  return (
    <g>
      <circle cx={TARGET_X} cy="100" r="24" fill="none" stroke="#e3c79d" strokeWidth="2.5" />
      <circle cx={TARGET_X} cy="100" r="13" fill="none" stroke="#d2a363" strokeWidth="2.5" />
      <circle cx={TARGET_X} cy="100" r="4" fill={BROWN} />
      <g>
        <path
          d={still ? TO_TARGET : WAVY}
          fill="none"
          stroke={BROWN}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {!still && (
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes={TIMES}
              keySplines={EASE}
              values={PATH_VALUES}
            />
          )}
        </path>
        <circle cx={still ? 322 : 290} cy="100" r="11" fill="#b8731c">
          {!still && (
            <animate
              attributeName="cx"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes={TIMES}
              keySplines={EASE}
              values={DOT_VALUES}
            />
          )}
        </circle>
        {!still && (
          <animate
            attributeName="opacity"
            dur="6s"
            repeatCount="indefinite"
            keyTimes="0;0.04;0.9;0.97;1"
            values="0;1;1;0;0"
          />
        )}
      </g>
    </g>
  );
}
