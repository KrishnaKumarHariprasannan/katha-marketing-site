import type { OfferIconName } from "@/components/OfferIcon";
import type { StartArtName } from "@/components/StartIllustration";

// Small, fixed-scope ways to start working with Katha. Each entry becomes a
// card in the landing page's "Start here" section (linking to the service it
// belongs to) and a "quick way to start" link on the Services page, which
// jumps to the contact form with the message pre-filled (see
// requestOfferPrefill and ContactSection). `art` picks the card's animated
// picture (and the one in the offer page's header). `page` is the content of
// the offer's own page, /starts/<slug>.
export type Offer = {
  slug: string;
  title: string;
  description: string;
  art: StartArtName;
  page: OfferPage;
};

type IconItem = { icon: OfferIconName; title?: string; text: string };

// One offer's page: a header, what you get, a second section that differs by
// offer (what we need from you / what we look at / what can be used), the
// steps, and the price.
export type OfferPage = {
  headline: string;
  intro: string;
  walkAway: IconItem[];
  walkAwayNote: string;
  detail:
    | { kind: "cards"; label: string; items: IconItem[] }
    | { kind: "chips"; label: string; lead: string; intro: string; chips: string[] };
  steps: string[];
  // Replace the placeholder with the real price (e.g. "£450").
  price: string;
  priceNote: string;
};

// Event fired when an offer is picked; ContactSection listens for it.
export const OFFER_PREFILL_EVENT = "katha:offer-prefill";

export const offers: Offer[] = [
  {
    slug: "clarity-audit",
    title: "Clarity Audit",
    description:
      "We review how clear and consistent your communications are, and show you exactly what to fix.",
    art: "audit",
    page: {
      headline: "See your organisation the way your audience does.",
      intro:
        "A clear outside review of your website, social media and brand, with a scorecard and a game plan.",
      walkAway: [
        {
          icon: "report",
          text: "An in-depth two-page analysis report with clear next steps.",
        },
        {
          icon: "checklist",
          text: "A scorecard that rates your communications across five areas.",
        },
        { icon: "phone", text: "A 30-minute walkthrough call." },
      ],
      walkAwayNote:
        "Fixed price, no surprises. Your report is yours to use, with or without us.",
      detail: {
        kind: "cards",
        label: "What we look at",
        items: [
          {
            icon: "globe",
            title: "Your website",
            text: "Your homepage and up to 2 key pages.",
          },
          {
            icon: "instagram",
            title: "Your social media",
            text: "Up to 2 channels, looking at your last 6 posts on each.",
          },
          {
            icon: "palette",
            title: "Your brand in action",
            text: "How your logo, colours and fonts actually show up across all of the above.",
          },
        ],
      },
      steps: [
        "Fill in a short form (10 minutes)",
        "Quick 15-minute call",
        "Your report arrives in 5 working days",
        "We talk it through",
      ],
      price: "£400",
      priceNote: "50% upfront and 50% on delivery.",
    },
  },
  {
    slug: "scroll-stopper",
    title: "Scroll Stopper",
    description:
      "One piece of your work, turned into a five-slide carousel people will want to read.",
    art: "carousel",
    page: {
      headline: "From a long report to five slides.",
      intro:
        "We turn your work into a five-slide carousel people will stop for, with the caption ready to go.",
      walkAway: [
        {
          icon: "carousel",
          text: "A 5-slide carousel sized for your LinkedIn and Instagram feed (PNG).",
        },
        {
          icon: "target",
          text: "We find the one key takeaway and build the story around it, so people remember your point, not just your topic.",
        },
        {
          icon: "post",
          text: "A ready-to-publish carousel set and a caption to go with it (150 words + hashtag suggestions).",
        },
        {
          icon: "linkedin",
          text: "Formatted for both LinkedIn and Instagram, so one piece of work goes further.",
        },
        {
          icon: "palette",
          text: "A credible, professional look, designed according to your brand guidelines.",
        },
      ],
      walkAwayNote:
        "Fixed price, fixed scope. You know exactly what you’re getting.",
      detail: {
        kind: "chips",
        label: "What can be turned into a post",
        lead: "Almost anything you’ve worked hard on, up to 10 pages (maximum).",
        intro: "Some examples:",
        chips: [
          "Research papers and reports",
          "Policy briefs",
          "Blog posts and articles",
        ],
      },
      steps: [
        "Share your document and your one key takeaway",
        "Quick 15-minute call",
        "Your carousel arrives in 5 working days",
        "One round of feedback where we adjust minor kinks",
        "The post is ready for publishing",
      ],
      price: "£400",
      priceNote: "50% upfront and 50% on delivery.",
    },
  },
  {
    slug: "spotlight-deck",
    title: "Spotlight Deck",
    description:
      "A five-slide deck that tells the story of one project, ready to use again and again.",
    art: "deck",
    page: {
      headline: "Your best work, ready to present.",
      intro:
        "We turn one project into a polished five-slide deck you can use again and again.",
      walkAway: [
        {
          icon: "presentation",
          text: "A repurposable 5-slide presentation in PowerPoint, fully editable, so you can tailor it for different audiences.",
        },
        { icon: "pdf", text: "A PDF version ready to be shared." },
        {
          icon: "palette",
          text: "Your branding: your logo, colours and fonts. No brand guidelines yet? We’ll use a clean, professional Katha template.",
        },
        {
          icon: "clock",
          text: "You get the final product in 7 days with one round of feedback where we adjust the minor kinks.",
        },
      ],
      walkAwayNote:
        "Fixed price, fixed scope. You know exactly what you’re getting.",
      detail: {
        kind: "cards",
        label: "What we need from you",
        items: [
          {
            icon: "rocket",
            text: "One project or product, completed or well underway.",
          },
          {
            icon: "chat",
            text: "One 20-minute call with the person who knows it best.",
          },
          {
            icon: "files",
            text: "Your existing materials: reports, data, photos or updates, up to 30 pages in total.",
          },
        ],
      },
      steps: [
        "Fill in a short form and share your materials",
        "We get on a 20-minute call with your project lead",
        "Your deck arrives within 10 working days",
        "One round of feedback to make sure every fact, figure and quote is exactly right",
        "You put it to work. Pitch it, present it, share it.",
      ],
      price: "£500",
      priceNote: "50% upfront and 50% on delivery.",
    },
  },
];

export function offerPath(offer: Offer) {
  return `/starts/${offer.slug}`;
}

export function offerPrefill(offer: Offer) {
  return `Hi Katha, I’d like to know more about the ${offer.title}.`;
}

// Asks the contact form to pre-fill its message. On the home page the form is
// already mounted and handles the event (it cancels it to say so). From
// another page it is not, so the message is parked in sessionStorage and the
// form picks it up when it mounts.
const PENDING_KEY = "katha:offer-prefill";
const PENDING_MAX_AGE_MS = 60_000;

export function requestOfferPrefill(offer: Offer) {
  const message = offerPrefill(offer);
  const handled = !window.dispatchEvent(
    new CustomEvent(OFFER_PREFILL_EVENT, { detail: { message }, cancelable: true }),
  );
  if (handled) return;
  try {
    sessionStorage.setItem(
      PENDING_KEY,
      JSON.stringify({ message, at: Date.now() }),
    );
  } catch {
    // Storage blocked: the form just opens empty.
  }
}

// The message parked by requestOfferPrefill, if it is still fresh.
export function takePendingPrefill(): string | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_KEY);
    const { message, at } = JSON.parse(raw) as { message: string; at: number };
    return Date.now() - at < PENDING_MAX_AGE_MS ? message : null;
  } catch {
    return null;
  }
}
