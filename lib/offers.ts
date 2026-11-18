import type { StartArtName } from "@/components/StartIllustration";

// Small, fixed-scope ways to start working with Katha. Each entry becomes a
// card in the landing page's "Start here" section (linking to the service it
// belongs to) and a "quick way to start" link on the Services page, which
// jumps to the contact form with the message pre-filled (see
// requestOfferPrefill and ContactSection). `art` picks the card's animated
// picture.
export type Offer = {
  slug: string;
  title: string;
  description: string;
  art: StartArtName;
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
  },
  {
    slug: "scroll-stopper",
    title: "Scroll Stopper",
    description:
      "One piece of your work, turned into a five-slide carousel people will want to read.",
    art: "carousel",
  },
  {
    slug: "spotlight-deck",
    title: "Spotlight Deck",
    description:
      "A five-slide deck that tells the story of one project, ready to use again and again.",
    art: "deck",
  },
];

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
