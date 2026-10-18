// Content for the Services page. Each entry becomes:
//  - an intro card at the top of /services (the whole card links down), and
//  - a detail section with the matching id (/services#<slug>), and
//  - a link in the navbar's Services dropdown.
// Add an entry here to add a service.
export type Service = {
  slug: string;
  title: string;
  intro: {
    description: string;
    bullets: string[];
  };
  detail: {
    tagline: string;
    paragraphs: string[];
    practice: string[];
    outcome: string;
    cta: { heading: string; body: string };
  };
};

export const services: Service[] = [
  {
    slug: "strategy-and-research",
    title: "Strategy and Research",
    intro: {
      description:
        "Before we write a single word or design a single pixel, we do our homework. We dig into your audience, your competitors, and your goals to build a strategy that actually holds up, not just a mood board and a prayer.",
      bullets: [
        "Content marketing & GTM strategy",
        "Market research & media monitoring",
        "SEO audits & keyword research",
        "Content calendars that keep everyone (including us) accountable",
      ],
    },
    detail: {
      tagline: "The homework nobody sees, but everyone feels.",
      paragraphs: [
        "Great communication doesn’t start with a clever tagline, it starts with knowing exactly who you’re talking to, why they should care, and how to say it better than anyone else in the room. That’s the part most people skip. We don’t.",
        "At Katha, strategy and research is our warm-up act, our detective work, and our reality check, all rolled into one. Before we write a single headline or design a single graphic, we dig into your audience, your landscape, and your goals so everything that comes after is built on facts, not vibes.",
      ],
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
      cta: {
        heading: "Not sure where your strategy stands? Let’s find out together.",
        body: "Whether you’re starting from scratch or sitting on a pile of research nobody’s used, we’ll help you make sense of it. Book a free 20-minute session and let’s talk through what your organisation actually needs.",
      },
    },
  },
  {
    slug: "branding-and-marketing",
    title: "Branding and Marketing",
    intro: {
      description:
        "This is where your story gets a voice, and a megaphone. We help you figure out what to say, how to say it, and where to say it so it actually lands with the people who need to hear it.",
      bullets: [
        "Branding & narrative strategy",
        "Campaign creation & paid marketing",
        "Newsletters, case studies, and website copy that earns the scroll",
        "Community management & email marketing",
      ],
    },
    detail: {
      tagline: "Your story, but louder, sharper, and impossible to ignore.",
      paragraphs: [
        "Having a good story isn’t enough if nobody hears it. Branding and marketing is where we take everything your organisation stands for and turn it into something people actually stop for, remember, and act on.",
        "This is the part where strategy gets a voice. We build brands that feel unmistakably you, and campaigns that carry your message.",
      ],
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
      cta: {
        heading: "Got a brand that needs a bit of a shake-up?",
        body: "Whether you’re rebranding, launching, or just tired of sounding like everyone else, we’re happy to talk it through. Grab a free 20-minute session and let’s see what fits.",
      },
    },
  },
  {
    slug: "creative-digital-design",
    title: "Creative Digital Design",
    intro: {
      description:
        "Great strategy deserves a great outfit. We turn ideas into visuals, clean, consistent, and just a little bit delightful, across every platform your audience actually uses.",
      bullets: [
        "Brand kits, logos & visual identity systems",
        "Web design & presentation decks",
        "Social media posts, brochures & flyers",
        "Video editing and scripting, for when static just won’t cut it",
      ],
    },
    detail: {
      tagline: "Because even the best ideas deserve a great outfit.",
      paragraphs: [
        "Creative Digital Design is where we give your narrative a face, visuals that are as intentional as everything that led up to them.",
        "We design across every touchpoint your audience will actually encounter: web, social, decks, print.",
      ],
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
      cta: {
        heading: "Let’s chat about what you’ve got and what’s missing.",
        body: "Book a free 20-minute session, or drop us a line.",
      },
    },
  },
];
