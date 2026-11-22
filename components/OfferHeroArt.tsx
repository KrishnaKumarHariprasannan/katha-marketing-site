import type { StartArtName } from "@/components/StartIllustration";

// The animated picture in an offer page's header: a larger version of the
// card picture on the home page (a scorecard, a carousel and a slide). The
// motion lives in globals.css (.offer-art__*) and is switched off for people
// who prefer reduced motion.
const art = {
  audit: {
    viewBox: "0 0 200 150",
    label: "A scorecard with five score bars that gently shift",
    shapes: (
      <>
        <rect x="20" y="10" width="160" height="130" rx="12" fill="#fff" />
        <rect x="36" y="24" width="60" height="8" rx="4" fill="#431043" />
        <g fill="#FFB59A" opacity=".45">
          <rect x="36" y="46" width="128" height="9" rx="4.5" />
          <rect x="36" y="64" width="128" height="9" rx="4.5" />
          <rect x="36" y="82" width="128" height="9" rx="4.5" />
          <rect x="36" y="100" width="128" height="9" rx="4.5" />
          <rect x="36" y="118" width="128" height="9" rx="4.5" />
        </g>
        <g fill="#A63A68">
          <rect className="offer-art__bar" x="36" y="46" width="100" height="9" rx="4.5" />
          <rect className="offer-art__bar offer-art__bar--2" x="36" y="64" width="72" height="9" rx="4.5" />
          <rect className="offer-art__bar offer-art__bar--3" x="36" y="82" width="116" height="9" rx="4.5" />
          <rect className="offer-art__bar offer-art__bar--4" x="36" y="100" width="56" height="9" rx="4.5" />
          <rect className="offer-art__bar offer-art__bar--5" x="36" y="118" width="88" height="9" rx="4.5" />
        </g>
      </>
    ),
  },
  carousel: {
    viewBox: "0 0 220 150",
    label: "Five carousel slides gently sliding",
    shapes: (
      <>
        <rect className="offer-art__slide" x="14" y="38" width="52" height="86" rx="8" fill="#FFB59A" />
        <rect className="offer-art__slide offer-art__slide--2" x="42" y="30" width="52" height="92" rx="8" fill="#F4849A" />
        <rect className="offer-art__slide offer-art__slide--3" x="70" y="22" width="52" height="98" rx="8" fill="#FFE9E0" />
        <rect className="offer-art__slide" x="98" y="14" width="60" height="106" rx="8" fill="#fff" />
        <g className="offer-art__slide offer-art__slide--2">
          <rect x="108" y="28" width="38" height="7" rx="3.5" fill="#431043" />
          <rect x="108" y="42" width="40" height="4" rx="2" fill="#A63A68" />
          <rect x="108" y="51" width="32" height="4" rx="2" fill="#A63A68" opacity=".6" />
          <circle cx="128" cy="84" r="14" fill="#FFB59A" />
          <path d="M128 84 L128 70 A14 14 0 0 1 140 91 Z" fill="#A63A68" />
        </g>
        <g fill="#FFB59A">
          <circle cx="86" cy="140" r="3.5" />
          <circle cx="100" cy="140" r="3.5" opacity=".6" />
          <circle cx="114" cy="140" r="3.5" opacity=".4" />
          <circle cx="128" cy="140" r="3.5" opacity=".3" />
          <circle cx="142" cy="140" r="3.5" opacity=".2" />
        </g>
      </>
    ),
  },
  deck: {
    viewBox: "0 0 200 150",
    label: "A presentation slide with a title and a turning chart",
    shapes: (
      <>
        <rect x="14" y="14" width="172" height="112" rx="12" fill="#fff" />
        <rect className="offer-art__bar" x="30" y="30" width="80" height="10" rx="5" fill="#431043" />
        <rect x="30" y="48" width="62" height="5" rx="2.5" fill="#A63A68" />
        <rect x="30" y="58" width="72" height="5" rx="2.5" fill="#A63A68" opacity=".6" />
        <circle cx="138" cy="82" r="26" fill="#FFB59A" />
        <path className="offer-art__pie" d="M138 82 L138 56 A26 26 0 0 1 161 94 Z" fill="#A63A68" />
        <rect x="30" y="100" width="56" height="10" rx="5" fill="#F4849A" />
        <g fill="#FFB59A">
          <circle cx="82" cy="140" r="3.5" />
          <circle cx="96" cy="140" r="3.5" opacity=".6" />
          <circle cx="110" cy="140" r="3.5" opacity=".4" />
          <circle cx="124" cy="140" r="3.5" opacity=".3" />
          <circle cx="138" cy="140" r="3.5" opacity=".2" />
        </g>
      </>
    ),
  },
} satisfies Record<StartArtName, { viewBox: string; label: string; shapes: React.ReactNode }>;

export default function OfferHeroArt({ name }: { name: StartArtName }) {
  const { viewBox, label, shapes } = art[name];
  return (
    <svg
      className="offer-art"
      viewBox={viewBox}
      role="img"
      aria-label={label}
    >
      {shapes}
    </svg>
  );
}
