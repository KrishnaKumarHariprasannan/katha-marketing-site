// Small looping illustrations for the Services page, one per service (240 x
// 150 view box, decorative). The motion lives in globals.css
// (.service-art__*) and is switched off for people who prefer reduced motion.
const DOT_COLUMNS = [40, 72, 104, 136, 168, 200];
const DOT_ROWS = [45, 75, 105];

const art = {
  // A magnifying glass sweeps across a grid of data points
  research: (
    <>
      <g fill="#F4849A" opacity=".75">
        {DOT_ROWS.flatMap((y) =>
          DOT_COLUMNS.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />),
        )}
      </g>
      <g className="service-art__sweep">
        <circle
          cx="50"
          cy="72"
          r="26"
          fill="#fff"
          fillOpacity=".55"
          stroke="#431043"
          strokeWidth="5"
        />
        <line
          x1="69"
          y1="92"
          x2="88"
          y2="114"
          stroke="#431043"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
    </>
  ),
  // A megaphone sends waves out to an audience
  marketing: (
    <>
      <path d="M44 62 L92 62 L132 36 L132 114 L92 88 L44 88 Z" fill="#A63A68" />
      <rect x="56" y="88" width="18" height="30" rx="5" fill="#431043" />
      <rect x="128" y="34" width="8" height="82" rx="4" fill="#431043" />
      <g fill="none" stroke="#431043" strokeWidth="5" strokeLinecap="round">
        <path className="service-art__wave" d="M150 56 Q166 75 150 94" />
        <path
          className="service-art__wave service-art__wave--2"
          d="M166 46 Q190 75 166 104"
        />
        <path
          className="service-art__wave service-art__wave--3"
          d="M182 36 Q214 75 182 114"
        />
      </g>
      <g fill="#F4849A">
        <circle cx="222" cy="40" r="5" />
        <circle cx="224" cy="75" r="5" />
        <circle cx="222" cy="110" r="5" />
      </g>
    </>
  ),
  // A web page wireframe assembles block by block, ending on the button
  design: (
    <>
      <rect x="40" y="18" width="160" height="114" rx="8" fill="#fff" stroke="#431043" strokeWidth="3" />
      <line x1="40" y1="40" x2="200" y2="40" stroke="#431043" strokeWidth="3" />
      <circle cx="54" cy="29" r="3.5" fill="#A63A68" />
      <circle cx="66" cy="29" r="3.5" fill="#F4849A" />
      <circle cx="78" cy="29" r="3.5" fill="#FFB59A" />
      <rect
        className="service-art__build"
        x="52"
        y="50"
        width="136"
        height="32"
        rx="5"
        fill="#F4849A"
      />
      <rect
        className="service-art__build service-art__build--2"
        x="52"
        y="92"
        width="70"
        height="7"
        rx="3.5"
        fill="#431043"
      />
      <rect
        className="service-art__build service-art__build--3"
        x="52"
        y="106"
        width="84"
        height="7"
        rx="3.5"
        fill="#431043"
        opacity=".35"
      />
      <rect
        className="service-art__build service-art__build--button"
        x="150"
        y="94"
        width="38"
        height="20"
        rx="10"
        fill="#A63A68"
      />
    </>
  ),
};

export type ServiceArtName = keyof typeof art;

export default function ServiceIllustration({ name }: { name: ServiceArtName }) {
  return (
    <div className="service-art">
      <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {art[name]}
      </svg>
    </div>
  );
}
