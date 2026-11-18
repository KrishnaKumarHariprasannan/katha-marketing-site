import type { ServiceArtName } from "@/components/ServiceIllustration";

// Content for the Services page. Each entry becomes:
//  - a jump link in the header at the top of /services, and
//  - a section with the matching id (/services#<slug>), and
//  - a link in the navbar's Services dropdown.
// Add an entry here to add a service. `offer` is the slug of the starter
// offer (lib/offers.ts) offered as the quick way to start; `art` picks the
// animated illustration.
export type Service = {
  slug: string;
  title: string;
  art: ServiceArtName;
  offer: string;
  tagline: string;
  summary: string;
  practice: string[];
  outcome: string;
};

export const services: Service[] = [
  {
    slug: "strategy-and-research",
    title: "Strategy and Research",
    art: "research",
    offer: "comms-audit",
    tagline: "The homework nobody sees, but everyone feels.",
    summary:
      "Great communication starts with knowing exactly who you’re talking to, why they should care, and how to say it better than anyone else in the room.",
    practice: [
      "Content Marketing Strategy",
      "Go-To-Market Strategy",
      "Market Research",
      "Media Monitoring",
      "SEO Audits & Keyword Research",
      "Content Calendars",
    ],
    outcome:
      "A clear, evidence-backed direction so every piece of content, campaign, and creative decision that follows already knows exactly where it’s headed.",
  },
  {
    slug: "branding-and-marketing",
    title: "Branding and Marketing",
    art: "marketing",
    offer: "paper-to-post",
    tagline: "Your story, but louder, sharper, and impossible to ignore.",
    summary:
      "This is the part where strategy gets a voice. We build brands that feel unmistakably you, and campaigns that carry your message.",
    practice: [
      "Brand & Narrative Strategy",
      "Campaign Creation",
      "Paid Marketing",
      "Newsletters & Email Marketing",
      "Case Studies & Website Copy",
      "Community Management",
    ],
    outcome:
      "A brand and message that’s consistent, magnetic, and built to actually reach and move your audience.",
  },
  {
    slug: "creative-digital-design",
    title: "Creative Digital Design",
    art: "design",
    offer: "highlights",
    tagline: "Because even the best ideas deserve a great outfit.",
    summary:
      "We give your narrative a face, across every touchpoint your audience will actually encounter: web, social, decks, print.",
    practice: [
      "Brand Kits & Logo Design",
      "Visual Identity Systems",
      "Web Design",
      "Presentation Decks & Reports",
      "Social Media Assets",
      "Flyers, Brochures & Package Design",
      "Video Editing & Scripting",
    ],
    outcome:
      "Design that doesn’t just look good, it works, consistently, everywhere your story shows up.",
  },
];

// The call to action closing the Services page.
export const servicesCta = {
  heading: "Let’s chat about what you’ve got and what’s missing.",
  body: "Not sure where to start? Tell us what you’re working on.",
};
