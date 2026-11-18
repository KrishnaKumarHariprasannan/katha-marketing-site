import MissionArt from "@/components/MissionArt";

// Small looping illustrations for the "What changes" cards (400 x 200 view
// box, decorative). The motion lives in globals.css (.change-art__*) and is
// switched off for people who prefer reduced motion. Palette and panel match
// the Services page illustrations (plum, raspberry, pink and peach on peach).
const art = {
  // One circle stands out from the rest
  "stand-out": (
    <>
      {[80, 140, 260, 320].map((x) => (
        <circle key={x} cx={x} cy="100" r="24" fill="#F4849A" opacity=".6" />
      ))}
      <circle className="change-art__halo" cx="200" cy="100" r="46" fill="#A63A68" />
      <circle className="change-art__pop" cx="200" cy="100" r="27" fill="#A63A68" />
    </>
  ),
  // A ball rolls down a slope that sits on solid ground, growing like an
  // avalanche
  asset: (
    <>
      <path d="M80 70 L320 140 V200 H80 Z" fill="#F4849A" opacity=".35" />
      <path
        d="M80 70 L320 140"
        fill="none"
        stroke="#431043"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        className="change-art__ball"
        cx="80"
        cy="60"
        r="10"
        fill="#fff"
        stroke="#A63A68"
        strokeWidth="3.5"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  // Dots orbiting a fixed centre
  audience: (
    <>
      <circle cx="200" cy="100" r="88" fill="none" stroke="#F4849A" strokeWidth="2" />
      <circle cx="200" cy="100" r="56" fill="none" stroke="#A63A68" strokeWidth="2.5" />
      <circle cx="200" cy="100" r="28" fill="none" stroke="#431043" strokeWidth="3" />
      <circle cx="200" cy="100" r="16" fill="#431043" />
      <g className="change-art__orbit change-art__orbit--outer">
        <circle cx="138" cy="38" r="10" fill="#A63A68" />
        <circle cx="262" cy="38" r="7" fill="#F4849A" />
        <circle cx="120" cy="162" r="7" fill="#F4849A" />
      </g>
      <g className="change-art__orbit change-art__orbit--inner">
        <circle cx="240" cy="140" r="10" fill="#A63A68" />
      </g>
    </>
  ),
  // A tangled line straightens out and heads for the target
  mission: <MissionArt />,
};

export type ChangeIllustrationName = keyof typeof art;

export default function ChangeIllustration({
  name,
}: {
  name: ChangeIllustrationName;
}) {
  return (
    <svg
      className="change-art"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {art[name]}
    </svg>
  );
}
