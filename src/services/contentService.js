/**
 * contentService.js
 * Central source of truth for all static landing-page content.
 * In a real app these would be fetched from a CMS or API.
 */

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Clients",  href: "#clients"  },
  { label: "Contact",  href: "#contact"  },
];

export const SERVICES = [
  {
    id: 1,
    title: "Brand Strategy",
    description:
      "We craft comprehensive brand identities that resonate with your audience and stand apart from the noise — from positioning to visual language.",
    icon: "◈",
    image: "https://picsum.photos/seed/brand/600/400",
  },
  {
    id: 2,
    title: "Digital Experience",
    description:
      "From pixel-perfect interfaces to seamless interactions, we design and build digital products that users genuinely love.",
    icon: "◉",
    image: "https://picsum.photos/seed/digital/600/400",
  },
  {
    id: 3,
    title: "Motion & Film",
    description:
      "Compelling visual storytelling through animation, video production, and cinematic brand films that move people — literally.",
    icon: "◎",
    image: "https://picsum.photos/seed/motion/600/400",
  },
  {
    id: 4,
    title: "Growth Marketing",
    description:
      "Data-driven campaigns grounded in creative thinking. We scale what works and test what doesn't — relentlessly.",
    icon: "◍",
    image: "https://picsum.photos/seed/growth/600/400",
  },
  {
    id: 5,
    title: "Systems & Tech",
    description:
      "Architecture that scales. We engineer robust platforms, APIs, and infrastructure that keep your business moving forward.",
    icon: "◐",
    image: "https://picsum.photos/seed/tech/600/400",
  },
  {
    id: 6,
    title: "Editorial Content",
    description:
      "Words that work. Strategy-led copywriting, thought leadership, and content programs that build trust over time.",
    icon: "◑",
    image: "https://picsum.photos/seed/editorial/600/400",
  },
];

export const CLIENTS = [
  { id: 1, name: "Apex Industries", logo: "https://picsum.photos/seed/apex/200/80"   },
  { id: 2, name: "Nomad Studio",    logo: "https://picsum.photos/seed/nomad/200/80"  },
  { id: 3, name: "Verto Capital",   logo: "https://picsum.photos/seed/verto/200/80"  },
  { id: 4, name: "Solaris Health",  logo: "https://picsum.photos/seed/solaris/200/80"},
  { id: 5, name: "Rift Media",      logo: "https://picsum.photos/seed/rift/200/80"   },
  { id: 6, name: "Basalt Group",    logo: "https://picsum.photos/seed/basalt/200/80" },
  { id: 7, name: "Fennec Labs",     logo: "https://picsum.photos/seed/fennec/200/80" },
  { id: 8, name: "Crest Ventures",  logo: "https://picsum.photos/seed/crest/200/80"  },
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
