/**
 * contentService.js
 * Central source of truth for all static landing-page content.
 */

/**
 * HOME_SECTIONS
 * Controls which sections are rendered on the home page.
 * Set any entry to `false` to hide that section without touching component code.
 */
export const HOME_SECTIONS = {
  hero:     true,
  services: true,
  clients:  true,
  contact:  true,
};

export const NAV_LINKS = [
  { label: "Services", href: "#services", section: "services" },
  { label: "Clients",  href: "#clients",  section: "clients"  },
  { label: "Contact",  href: "#contact",  section: "contact"  },
];

/**
 * Returns only the NAV_LINKS whose corresponding HOME_SECTIONS entry is enabled.
 * Links without a `section` key are always included.
 */
export const getActiveNavLinks = () =>
  NAV_LINKS.filter((link) =>
    link.section === undefined || HOME_SECTIONS[link.section] !== false
  );

/**
 * Route-based navigation links (use <Link to={...}> not <a href={...}>).
 */
export const PAGE_LINKS = [
  { label: "About Us", to: "/about" },
];

export const ABOUT = {
  headline:    "We are Meridian.",
  subheadline: "A creative studio built on craft, curiosity, and conviction.",
  image:       "https://picsum.photos/seed/aboutteam/1200/800",
  imageSplit:  "https://picsum.photos/seed/aboutoffice/800/600",
  story: [
    "Meridian was founded in 2018 by a small team of designers, engineers, and strategists who believed that great work comes from genuine collaboration — not siloed departments handing work over a fence.",
    "We started as a two-person brand consultancy in a shared Manhattan workspace. Today we're a studio of twenty-plus across New York and remote, working with clients from early-stage startups to established global brands.",
    "What hasn't changed is the way we work: closely, honestly, and with a healthy obsession over the details that most agencies rush past.",
  ],
  values: [
    {
      title: "Craft first",
      desc:  "Every pixel, word, and line of code is considered. We don't ship work we're not proud of.",
    },
    {
      title: "Honest partnership",
      desc:  "We tell clients what they need to hear, not what they want to hear. Long relationships are built on trust.",
    },
    {
      title: "Curiosity over comfort",
      desc:  "We ask why before we answer how. Assumptions are the enemy of good design.",
    },
    {
      title: "Outcomes over output",
      desc:  "Deliverables are a means, not an end. We measure success by what changes for our clients.",
    },
  ],
  team: [
    {
      name:  "Adriana Voss",
      role:  "Founder & Creative Director",
      bio:   "Former creative lead at Wolff Olins. Obsessed with typography, systems thinking, and excellent coffee.",
      image: "https://picsum.photos/seed/team-av/400/500",
    },
    {
      name:  "Marcus Tanaka",
      role:  "Head of Technology",
      bio:   "Ex-Stripe engineer. Believes the best code is the code nobody notices.",
      image: "https://picsum.photos/seed/team-mt/400/500",
    },
    {
      name:  "Priya Nair",
      role:  "Strategy Director",
      bio:   "MBA from INSEAD, ten years in brand consulting. Translates business problems into creative briefs.",
      image: "https://picsum.photos/seed/team-pn/400/500",
    },
    {
      name:  "Leo Ferreira",
      role:  "Head of Motion & Film",
      bio:   "Award-winning director. Has shot in 22 countries and counting.",
      image: "https://picsum.photos/seed/team-lf/400/500",
    },
  ],
};

export const SERVICES = [
  {
    id: 1,
    slug: "brand-strategy",
    title: "Brand Strategy",
    tagline: "Identity that outlasts trends.",
    description:
      "We craft comprehensive brand identities that resonate with your audience and stand apart from the noise — from positioning to visual language.",
    longDescription:
      "Great brands aren't built overnight — they're the result of deliberate strategy, honest research, and bold creative choices. Our Brand Strategy practice helps you articulate who you are, who you serve, and why it matters. We work closely with founders, marketing teams, and leadership to define positioning, develop visual identity systems, and create the brand guidelines your team will actually use.",
    highlights: [
      "Brand positioning & messaging architecture",
      "Visual identity design (logo, colour, typography)",
      "Brand guidelines & design system documentation",
      "Naming, taglines, and verbal identity",
      "Competitive landscape analysis",
      "Stakeholder workshops & co-creation sessions",
    ],
    deliverables: [
      { label: "Brand Audit",        desc: "Thorough analysis of your current identity and market position." },
      { label: "Positioning Map",    desc: "Clear articulation of your unique space in the competitive landscape." },
      { label: "Identity System",    desc: "Logo suite, colour palette, typography, and iconography." },
      { label: "Brand Guidelines",   desc: "A living document your team can apply consistently across all touch-points." },
    ],
    icon: "◈",
    image:       "https://picsum.photos/seed/brand/1200/700",
    imageSplit:  "https://picsum.photos/seed/brand2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/brand-g1/600/400",
      "https://picsum.photos/seed/brand-g2/600/400",
      "https://picsum.photos/seed/brand-g3/600/400",
    ],
  },
  {
    id: 2,
    slug: "digital-experience",
    title: "Digital Experience",
    tagline: "Interfaces people love to use.",
    description:
      "From pixel-perfect interfaces to seamless interactions, we design and build digital products that users genuinely love.",
    longDescription:
      "Digital products succeed when they feel effortless. Our Digital Experience team bridges the gap between design and engineering — crafting interfaces grounded in user research and brought to life with clean, maintainable code. From early wireframes to production-ready components, we obsess over the details that make the difference between a product people tolerate and one they recommend.",
    highlights: [
      "UX research, user flows & wireframing",
      "UI design & interactive prototyping",
      "Design systems & component libraries",
      "React / Next.js front-end engineering",
      "Accessibility (WCAG 2.2 AA) compliance",
      "Performance optimisation & Core Web Vitals",
    ],
    deliverables: [
      { label: "UX Research Report", desc: "User interviews, journey maps, and actionable insights."            },
      { label: "Figma Design Files",  desc: "High-fidelity screens, components, and interactive prototypes."     },
      { label: "Design System",       desc: "Shared token library, component documentation, and usage examples." },
      { label: "Production Code",     desc: "Tested, accessible React components ready for deployment."          },
    ],
    icon: "◉",
    image:       "https://picsum.photos/seed/digital/1200/700",
    imageSplit:  "https://picsum.photos/seed/digital2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/digital-g1/600/400",
      "https://picsum.photos/seed/digital-g2/600/400",
      "https://picsum.photos/seed/digital-g3/600/400",
    ],
  },
  {
    id: 3,
    slug: "motion-film",
    title: "Motion & Film",
    tagline: "Stories that move, literally.",
    description:
      "Compelling visual storytelling through animation, video production, and cinematic brand films that move people — literally.",
    longDescription:
      "Motion is the most immediate way to communicate emotion. Our Motion & Film studio produces everything from 15-second social assets to full-length brand films — each piece crafted with the same cinematic attention to light, rhythm, and narrative. We partner with brands at every stage of production: concept, scripting, shoot, post-production, and delivery.",
    highlights: [
      "Brand film & documentary production",
      "Animated explainers & product demos",
      "Social-first video content (Reels, TikTok, YouTube)",
      "Motion graphics & kinetic typography",
      "2D & 3D animation",
      "Post-production, colour grading & sound design",
    ],
    deliverables: [
      { label: "Creative Treatment", desc: "Concept, mood-board, and script before a single frame is shot."  },
      { label: "Production Package", desc: "Crew, locations, and full shoot coordination."                    },
      { label: "Edited Master",      desc: "Colour-graded, sound-designed final cut in broadcast-ready formats."},
      { label: "Cut-downs",          desc: "Platform-optimised versions (16:9, 9:16, 1:1) for every channel."  },
    ],
    icon: "◎",
    image:       "https://picsum.photos/seed/motion/1200/700",
    imageSplit:  "https://picsum.photos/seed/motion2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/motion-g1/600/400",
      "https://picsum.photos/seed/motion-g2/600/400",
      "https://picsum.photos/seed/motion-g3/600/400",
    ],
  },
  {
    id: 4,
    slug: "growth-marketing",
    title: "Growth Marketing",
    tagline: "Scale what works, kill what doesn't.",
    description:
      "Data-driven campaigns grounded in creative thinking. We scale what works and test what doesn't — relentlessly.",
    longDescription:
      "Growth isn't a lucky break — it's a system. Our Growth Marketing practice combines rigorous analytics with sharp creative to build campaigns that acquire, convert, and retain. We work across paid and organic channels, running structured experiments that turn real data into real revenue. Every decision is traceable, every dollar accountable.",
    highlights: [
      "Paid social & search (Meta, Google, LinkedIn)",
      "SEO strategy & technical SEO audits",
      "Email & lifecycle marketing automation",
      "Conversion rate optimisation (CRO)",
      "Analytics setup, dashboards & attribution modelling",
      "A/B & multivariate testing frameworks",
    ],
    deliverables: [
      { label: "Growth Audit",        desc: "Full-funnel analysis of current acquisition, conversion, and retention." },
      { label: "Channel Strategy",    desc: "Prioritised roadmap of channels, budgets, and 90-day milestones."        },
      { label: "Campaign Creative",   desc: "Ad copy, visuals, and landing pages built for performance."               },
      { label: "Monthly Report",      desc: "Plain-English performance review with next-month optimisation plan."      },
    ],
    icon: "◍",
    image:       "https://picsum.photos/seed/growth/1200/700",
    imageSplit:  "https://picsum.photos/seed/growth2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/growth-g1/600/400",
      "https://picsum.photos/seed/growth-g2/600/400",
      "https://picsum.photos/seed/growth-g3/600/400",
    ],
  },
  {
    id: 5,
    slug: "systems-tech",
    title: "Systems & Tech",
    tagline: "Architecture built to last.",
    description:
      "Architecture that scales. We engineer robust platforms, APIs, and infrastructure that keep your business moving forward.",
    longDescription:
      "Technology should enable your business, not constrain it. Our Systems & Tech team designs and builds the back-end infrastructure, APIs, and integrations that power modern products — with scalability, security, and developer experience at the centre. Whether you're migrating a legacy monolith, standing up a new microservices architecture, or integrating a third-party SaaS stack, we've done it before.",
    highlights: [
      "Cloud architecture (AWS, GCP, Azure)",
      "API design & development (REST, GraphQL)",
      "Microservices & serverless patterns",
      "Database design & optimisation (SQL & NoSQL)",
      "CI/CD pipelines & DevOps automation",
      "Security audits & compliance (SOC 2, GDPR)",
    ],
    deliverables: [
      { label: "Architecture Review", desc: "Documented assessment of current systems with risk and opportunity map." },
      { label: "System Design",       desc: "Detailed architecture diagrams, ADRs, and data-flow documentation."      },
      { label: "Working Software",    desc: "Fully tested, reviewed, and deployed code with runbooks."                },
      { label: "Handover Package",    desc: "Documentation, onboarding guide, and knowledge-transfer sessions."       },
    ],
    icon: "◐",
    image:       "https://picsum.photos/seed/tech/1200/700",
    imageSplit:  "https://picsum.photos/seed/tech2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/tech-g1/600/400",
      "https://picsum.photos/seed/tech-g2/600/400",
      "https://picsum.photos/seed/tech-g3/600/400",
    ],
  },
  {
    id: 6,
    slug: "editorial-content",
    title: "Editorial Content",
    tagline: "Words that earn trust over time.",
    description:
      "Words that work. Strategy-led copywriting, thought leadership, and content programs that build trust over time.",
    longDescription:
      "In a world drowning in content, the only way to stand out is to be genuinely useful. Our Editorial Content practice builds content programmes rooted in strategy — audience research, SEO, and editorial planning — then executes them with writers who actually know your industry. From a single landing page to a full-scale content engine, we produce work that reads well and ranks well.",
    highlights: [
      "Content strategy & editorial planning",
      "Long-form articles, white-papers & reports",
      "Website copy & landing page optimisation",
      "Email newsletters & nurture sequences",
      "Thought leadership ghostwriting",
      "SEO content audits & keyword research",
    ],
    deliverables: [
      { label: "Content Audit",     desc: "Review of existing content performance with gap and opportunity analysis." },
      { label: "Editorial Calendar", desc: "12-week content plan with topics, formats, channels, and owners."         },
      { label: "Content Assets",    desc: "Edited, SEO-optimised articles, copy, or reports ready to publish."        },
      { label: "Performance Report", desc: "Monthly traffic, engagement, and conversion metrics with recommendations." },
    ],
    icon: "◑",
    image:       "https://picsum.photos/seed/editorial/1200/700",
    imageSplit:  "https://picsum.photos/seed/editorial2/800/600",
    imageGallery: [
      "https://picsum.photos/seed/editorial-g1/600/400",
      "https://picsum.photos/seed/editorial-g2/600/400",
      "https://picsum.photos/seed/editorial-g3/600/400",
    ],
  },
];

/** Returns a single service by its URL slug, or undefined if not found. */
export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug);

export const CLIENTS = [
  {
    id:       1,
    slug:     "apex-industries",
    name:     "Apex Industries",
    industry: "Manufacturing & Engineering",
    tagline:  "Rebranding a century-old manufacturer for the next hundred years.",
    logo:     "https://picsum.photos/seed/apex/200/80",
    image:    "https://picsum.photos/seed/apex-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/apex-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/apex-g1/600/400",
      "https://picsum.photos/seed/apex-g2/600/400",
      "https://picsum.photos/seed/apex-g3/600/400",
    ],
    overview: "Apex Industries approached us after 102 years in business with a challenge most brands never face: how do you honour a century of heritage while convincing the next generation of engineers that you're the future? We rebuilt their brand from the ground up — keeping the equity, shedding the dust.",
    services: ["Brand Strategy", "Digital Experience", "Editorial Content"],
    stats: [
      { num: "102",  label: "Years in business"       },
      { num: "38%",  label: "Increase in RFQ volume"  },
      { num: "4",    label: "Countries relaunched in"  },
      { num: "6mo",  label: "Project timeline"        },
    ],
    testimonial: {
      quote:  "Meridian didn't just redesign our logo. They helped us understand who we are, and gave us the language and visuals to tell that story with conviction.",
      author: "Sandra Reyes",
      role:   "Chief Marketing Officer, Apex Industries",
    },
    deliverables: ["Brand identity system", "New corporate website", "Sales collateral suite", "Brand guidelines"],
  },
  {
    id:       2,
    slug:     "nomad-studio",
    name:     "Nomad Studio",
    industry: "Architecture & Interior Design",
    tagline:  "A portfolio site as considered as the spaces they design.",
    logo:     "https://picsum.photos/seed/nomad/200/80",
    image:    "https://picsum.photos/seed/nomad-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/nomad-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/nomad-g1/600/400",
      "https://picsum.photos/seed/nomad-g2/600/400",
      "https://picsum.photos/seed/nomad-g3/600/400",
    ],
    overview: "Nomad Studio is a boutique architecture practice known for deeply considered residential and hospitality projects. They needed a digital presence that matched the precision and warmth of their physical work — something that would attract high-value clients without feeling sterile or overly corporate.",
    services: ["Digital Experience", "Motion & Film"],
    stats: [
      { num: "3×",   label: "Increase in inbound enquiries" },
      { num: "180+", label: "Projects showcased"            },
      { num: "12",   label: "Awards featured"               },
      { num: "2mo",  label: "Design to launch"              },
    ],
    testimonial: {
      quote:  "The site feels like walking into one of our projects. That's exactly what we asked for, and somehow they delivered more.",
      author: "James Okafor",
      role:   "Founding Partner, Nomad Studio",
    },
    deliverables: ["Website design & build", "Project photography direction", "Brand film", "CMS integration"],
  },
  {
    id:       3,
    slug:     "verto-capital",
    name:     "Verto Capital",
    industry: "Private Equity & Investment",
    tagline:  "Authority and clarity for a firm that earns its reputation quietly.",
    logo:     "https://picsum.photos/seed/verto/200/80",
    image:    "https://picsum.photos/seed/verto-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/verto-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/verto-g1/600/400",
      "https://picsum.photos/seed/verto-g2/600/400",
      "https://picsum.photos/seed/verto-g3/600/400",
    ],
    overview: "Verto Capital manages over $2B in assets across growth-stage technology companies. For years they relied entirely on word of mouth. When their managing partners decided a refined public presence was necessary, they came to Meridian for a brand that signals substance without shouting.",
    services: ["Brand Strategy", "Editorial Content"],
    stats: [
      { num: "$2B+", label: "Assets under management" },
      { num: "22",   label: "Portfolio companies"     },
      { num: "100%", label: "Referral-based growth"   },
      { num: "3mo",  label: "Engagement length"       },
    ],
    testimonial: {
      quote:  "We didn't want to look like every other PE firm. Meridian understood that restraint is a signal of confidence, not absence.",
      author: "Thomas Vance",
      role:   "Managing Partner, Verto Capital",
    },
    deliverables: ["Brand positioning", "Investor-facing website", "Thought leadership programme", "Pitch materials"],
  },
  {
    id:       4,
    slug:     "solaris-health",
    name:     "Solaris Health",
    industry: "Healthcare & Wellness",
    tagline:  "Making preventive healthcare feel human.",
    logo:     "https://picsum.photos/seed/solaris/200/80",
    image:    "https://picsum.photos/seed/solaris-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/solaris-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/solaris-g1/600/400",
      "https://picsum.photos/seed/solaris-g2/600/400",
      "https://picsum.photos/seed/solaris-g3/600/400",
    ],
    overview: "Solaris Health operates a network of preventive care clinics across the US Southwest. Their existing brand communicated clinical competence but none of the warmth their patient experience was known for. We helped them close that gap — creating a brand that feels as good as their care.",
    services: ["Brand Strategy", "Digital Experience", "Growth Marketing"],
    stats: [
      { num: "47",   label: "Clinic locations"        },
      { num: "61%",  label: "Lift in new patient registrations" },
      { num: "4.9",  label: "App store rating post-redesign"    },
      { num: "8mo",  label: "Full brand rollout"      },
    ],
    testimonial: {
      quote:  "Patients keep telling us the new site made them feel taken care of before they even walked in. That's the whole point.",
      author: "Dr. Amara Osei",
      role:   "CEO, Solaris Health",
    },
    deliverables: ["Patient-facing rebrand", "Clinic app redesign", "Paid acquisition campaigns", "Staff communications kit"],
  },
  {
    id:       5,
    slug:     "rift-media",
    name:     "Rift Media",
    industry: "Digital Publishing & Media",
    tagline:  "Building an editorial brand that readers trust and pay for.",
    logo:     "https://picsum.photos/seed/rift/200/80",
    image:    "https://picsum.photos/seed/rift-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/rift-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/rift-g1/600/400",
      "https://picsum.photos/seed/rift-g2/600/400",
      "https://picsum.photos/seed/rift-g3/600/400",
    ],
    overview: "Rift Media launched as a technology and culture publication in 2021. By 2023 they had an audience, but no clear identity that would justify a paid subscription tier. Meridian helped them define their editorial voice, redesign their reader experience, and launch a subscription product that converted from day one.",
    services: ["Editorial Content", "Digital Experience", "Growth Marketing"],
    stats: [
      { num: "280k", label: "Monthly active readers"     },
      { num: "12k",  label: "Paid subscribers at launch" },
      { num: "34%",  label: "Subscriber retention (yr 1)" },
      { num: "5mo",  label: "From brief to launch"       },
    ],
    testimonial: {
      quote:  "We had readers. Meridian helped us build a publication worth paying for.",
      author: "Kemi Adeyemi",
      role:   "Editor-in-Chief, Rift Media",
    },
    deliverables: ["Editorial brand identity", "Reader experience redesign", "Subscription onboarding flow", "Content strategy"],
  },
  {
    id:       6,
    slug:     "basalt-group",
    name:     "Basalt Group",
    industry: "Real Estate Development",
    tagline:  "Selling vision before the ground is broken.",
    logo:     "https://picsum.photos/seed/basalt/200/80",
    image:    "https://picsum.photos/seed/basalt-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/basalt-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/basalt-g1/600/400",
      "https://picsum.photos/seed/basalt-g2/600/400",
      "https://picsum.photos/seed/basalt-g3/600/400",
    ],
    overview: "Basalt Group develops mixed-use properties in emerging urban markets. Their challenge is one every developer knows: selling something that doesn't exist yet. We created a brand and campaign system that made prospective buyers and investors feel certain about uncertain things.",
    services: ["Brand Strategy", "Motion & Film", "Digital Experience"],
    stats: [
      { num: "9",    label: "Active developments"        },
      { num: "92%",  label: "Pre-sales on latest project" },
      { num: "3",    label: "Cities across 2 countries"  },
      { num: "4mo",  label: "Campaign to pre-sales close" },
    ],
    testimonial: {
      quote:  "We sold 92% of a building before it had walls. The brand Meridian built made people believe in what we were creating.",
      author: "Rafael Montero",
      role:   "Development Director, Basalt Group",
    },
    deliverables: ["Development brand identity", "Sales centre experience", "CGI & brand film", "Digital campaign"],
  },
  {
    id:       7,
    slug:     "fennec-labs",
    name:     "Fennec Labs",
    industry: "B2B SaaS & Developer Tools",
    tagline:  "From stealth to series B — brand that grows with the product.",
    logo:     "https://picsum.photos/seed/fennec/200/80",
    image:    "https://picsum.photos/seed/fennec-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/fennec-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/fennec-g1/600/400",
      "https://picsum.photos/seed/fennec-g2/600/400",
      "https://picsum.photos/seed/fennec-g3/600/400",
    ],
    overview: "Fennec Labs builds infrastructure tooling for platform engineering teams. When they raised their Series A, they needed to evolve from a founder-led, product-first culture into something that could attract enterprise customers and Series B investors. We built a brand that could hold the weight of both ambitions.",
    services: ["Brand Strategy", "Digital Experience", "Systems & Tech"],
    stats: [
      { num: "$24M", label: "Series B raised post-rebrand" },
      { num: "3×",   label: "Enterprise pipeline growth"  },
      { num: "18",   label: "Integration partners signed"  },
      { num: "4mo",  label: "Rebrand timeline"            },
    ],
    testimonial: {
      quote:  "Our product was always strong. After Meridian, our brand finally matched it. The Series B was a lot easier to have.",
      author: "Yuki Tanaka",
      role:   "Co-founder & CEO, Fennec Labs",
    },
    deliverables: ["Positioning & messaging", "Developer-facing website", "Docs site redesign", "Investor deck design"],
  },
  {
    id:       8,
    slug:     "crest-ventures",
    name:     "Crest Ventures",
    industry: "Venture Capital",
    tagline:  "A VC brand that founders actually want to talk to.",
    logo:     "https://picsum.photos/seed/crest/200/80",
    image:    "https://picsum.photos/seed/crest-hero/1200/700",
    imageSplit: "https://picsum.photos/seed/crest-split/800/600",
    imageGallery: [
      "https://picsum.photos/seed/crest-g1/600/400",
      "https://picsum.photos/seed/crest-g2/600/400",
      "https://picsum.photos/seed/crest-g3/600/400",
    ],
    overview: "Crest Ventures is an early-stage fund focused on climate and sustainability technology. In a crowded VC market, standing out to the best founders matters as much as deal flow. We helped Crest build a brand and content programme that positioned their partners as genuine thought leaders — not just capital allocators.",
    services: ["Brand Strategy", "Editorial Content", "Growth Marketing"],
    stats: [
      { num: "3×",   label: "Increase in founder inbound"  },
      { num: "14",   label: "Portfolio companies"          },
      { num: "60k",  label: "Newsletter subscribers"       },
      { num: "6mo",  label: "Content programme duration"   },
    ],
    testimonial: {
      quote:  "We went from cold outbounding to founders reaching out to us. The content programme Meridian built changed how the market sees us.",
      author: "Priya Sharma",
      role:   "General Partner, Crest Ventures",
    },
    deliverables: ["Fund brand identity", "Partner profiles & thought leadership", "Weekly newsletter", "Portfolio showcase site"],
  },
];

/** Returns a single client by its URL slug, or undefined if not found. */
export const getClientBySlug = (slug) =>
  CLIENTS.find((c) => c.slug === slug);

export const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "#", icon: "in" },
  { label: "X",         href: "#", icon: "𝕏"  },
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "Dribbble",  href: "#", icon: "Dr" },
];

export const STATS = [
  { num: "120+", label: "Projects Delivered" },
  { num: "40+",  label: "Global Clients"     },
  { num: "8",    label: "Years in Business"  },
  { num: "97%",  label: "Retention Rate"     },
];
