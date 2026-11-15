import MissionArt from "@/components/MissionArt";

// Small looping illustrations for the "What changes" cards (400 x 200 view
// box, decorative). The motion lives in globals.css (.change-art__*) and is
// switched off for people who prefer reduced motion.
const art = {
  // One circle stands out from the rest
  "stand-out": (
    <>
      {[80, 140, 260, 320].map((x) => (
        <circle key={x} cx={x} cy="100" r="24" fill="#b9b4aa" />
      ))}
      <circle className="change-art__halo" cx="200" cy="100" r="46" fill="#d95b34" />
      <circle className="change-art__pop" cx="200" cy="100" r="27" fill="#d95b34" />
    </>
  ),
  // A ball rolls down a slope that sits on solid ground, growing like an
  // avalanche
  asset: (
    <>
      <path d="M80 70 L320 140 V200 H80 Z" fill="#c1ebdc" />
      <path
        d="M80 70 L320 140"
        fill="none"
        stroke="#17694f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        className="change-art__ball"
        cx="80"
        cy="60"
        r="10"
        fill="#fff"
        stroke="#17694f"
        strokeWidth="3.5"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  // Dots orbiting a fixed centre
  audience: (
    <>
      <circle cx="200" cy="100" r="88" fill="none" stroke="#b9b1e6" strokeWidth="2" />
      <circle cx="200" cy="100" r="56" fill="none" stroke="#7d6fd0" strokeWidth="2.5" />
      <circle cx="200" cy="100" r="28" fill="none" stroke="#5b4bc4" strokeWidth="3" />
      <circle cx="200" cy="100" r="16" fill="#5b4bc4" />
      <g className="change-art__orbit change-art__orbit--outer">
        <circle cx="138" cy="38" r="10" fill="#7d6fd0" />
        <circle cx="262" cy="38" r="7" fill="#b9b4aa" />
        <circle cx="120" cy="162" r="7" fill="#b9b4aa" />
      </g>
      <g className="change-art__orbit change-art__orbit--inner">
        <circle cx="240" cy="140" r="10" fill="#7d6fd0" />
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
