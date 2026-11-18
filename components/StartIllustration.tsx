// Small looping pictures for the "Start here" cards, one per offer (160 x 110
// view box, decorative): a scorecard, a carousel and a slide. The motion lives
// in globals.css (.start-art__*) and is switched off for people who prefer
// reduced motion.
const art = {
  // A scorecard whose score bars shift
  audit: (
    <>
      <rect x="24" y="12" width="112" height="86" rx="8" fill="#fff" stroke="#431043" strokeOpacity=".25" />
      <g fill="#FFB59A" opacity=".45">
        <rect x="36" y="24" width="88" height="8" rx="4" />
        <rect x="36" y="40" width="88" height="8" rx="4" />
        <rect x="36" y="56" width="88" height="8" rx="4" />
        <rect x="36" y="72" width="88" height="8" rx="4" />
      </g>
      <g fill="#A63A68">
        <rect className="start-art__bar" x="36" y="24" width="70" height="8" rx="4" />
        <rect className="start-art__bar start-art__bar--2" x="36" y="40" width="50" height="8" rx="4" />
        <rect className="start-art__bar start-art__bar--3" x="36" y="56" width="80" height="8" rx="4" />
        <rect className="start-art__bar start-art__bar--4" x="36" y="72" width="38" height="8" rx="4" />
      </g>
    </>
  ),
  // Overlapping carousel slides sliding gently
  carousel: (
    <>
      <rect className="start-art__slide" x="22" y="22" width="50" height="66" rx="6" fill="#FFB59A" />
      <rect className="start-art__slide start-art__slide--2" x="46" y="18" width="50" height="66" rx="6" fill="#F4849A" />
      <rect className="start-art__slide start-art__slide--3" x="70" y="14" width="56" height="74" rx="6" fill="#431043" />
      <g className="start-art__slide start-art__slide--3">
        <rect x="78" y="26" width="34" height="6" rx="3" fill="#FFE9E0" />
        <rect x="78" y="38" width="40" height="4" rx="2" fill="#FFB59A" />
        <rect x="78" y="47" width="30" height="4" rx="2" fill="#FFB59A" />
        <circle cx="98" cy="72" r="8" fill="#A63A68" />
      </g>
    </>
  ),
  // A presentation slide with a title and a turning chart
  deck: (
    <>
      <rect x="20" y="14" width="120" height="82" rx="6" fill="#fff" stroke="#431043" strokeOpacity=".25" />
      <rect className="start-art__bar" x="30" y="24" width="56" height="8" rx="4" fill="#431043" />
      <rect x="30" y="38" width="44" height="4" rx="2" fill="#A63A68" />
      <rect x="30" y="47" width="50" height="4" rx="2" fill="#A63A68" opacity=".6" />
      <circle cx="112" cy="62" r="18" fill="#FFB59A" />
      <path className="start-art__pie" d="M112 62 L112 44 A18 18 0 0 1 128 70 Z" fill="#A63A68" />
      <rect x="30" y="76" width="40" height="8" rx="4" fill="#F4849A" />
    </>
  ),
};

export type StartArtName = keyof typeof art;

export default function StartIllustration({ name }: { name: StartArtName }) {
  return (
    <svg viewBox="0 0 160 110" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {art[name]}
    </svg>
  );
}
