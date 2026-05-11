/**
 * contentService.js
 * Central source of truth for all static landing-page content.
 */

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Clients",  href: "#clients"  },
  { label: "Contact",  href: "#contact"  },
];

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
  { id: 1, name: "Apex Industries", logo: "https://picsum.photos/seed/apex/200/80"    },
  { id: 2, name: "Nomad Studio",    logo: "https://picsum.photos/seed/nomad/200/80"   },
  { id: 3, name: "Verto Capital",   logo: "https://picsum.photos/seed/verto/200/80"   },
  { id: 4, name: "Solaris Health",  logo: "https://picsum.photos/seed/solaris/200/80" },
  { id: 5, name: "Rift Media",      logo: "https://picsum.photos/seed/rift/200/80"    },
  { id: 6, name: "Basalt Group",    logo: "https://picsum.photos/seed/basalt/200/80"  },
  { id: 7, name: "Fennec Labs",     logo: "https://picsum.photos/seed/fennec/200/80"  },
  { id: 8, name: "Crest Ventures",  logo: "https://picsum.photos/seed/crest/200/80"   },
];

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
