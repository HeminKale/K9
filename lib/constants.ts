import type { LucideIcon } from "lucide-react";
import {
  Award,
  Baby,
  Dog,
  Footprints,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

export type GalleryItem = {
  id: string;
  caption: string;
  category: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "gallery-1", caption: "Off-leash recall in the park", category: "Obedience" },
  { id: "gallery-2", caption: "Confident greetings, no jumping", category: "Manners" },
  { id: "gallery-3", caption: "Calm settle during dinner", category: "Behavior" },
  { id: "gallery-4", caption: "Loose-leash city walk", category: "Leash Manners" },
  { id: "gallery-5", caption: "Group class social skills", category: "Socialization" },
  { id: "gallery-6", caption: "Puppy crate training win", category: "Puppy Foundations" },
  { id: "gallery-7", caption: "Relaxed vet visit", category: "Behavior" },
  { id: "gallery-8", caption: "Board & train graduation day", category: "Board & Train" },
  { id: "gallery-9", caption: "Nose-to-nose dog introductions", category: "Reactivity" },
];

export const business = {
  name: "Ketan.K9DogTrainer",
  trainerName: "Ketan Mahajan",
  tagline: "Training Today, Better Tomorrow.",
  phone: "+91 84461 29508",
  phoneHref: "tel:+918446129508",
  whatsappNumber: "918446129508",
  email: "hello@example.com",
  address: {
    street: "Punawale",
    city: "Pune",
    state: "Maharashtra",
    zip: "",
  },
  hours: [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/",
  },
};

export type HighlightPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const specializedTraining: HighlightPoint[] = [
  {
    title: "Obedience Training",
    description: "Build a strong foundation. Sit, Stay, Come, Heel & more.",
    icon: PawPrint,
  },
  {
    title: "Puppy Training",
    description: "Early training for good habits & a confident start.",
    icon: Baby,
  },
  {
    title: "Home Visit Training",
    description: "Personalized training sessions for you & your dog's unique needs.",
    icon: Home,
  },
];

export const trainingApproach: HighlightPoint[] = [
  {
    title: "Calm & Positive",
    description: "No fear. No force. Just trust & respect.",
    icon: HeartHandshake,
  },
  {
    title: "Focused on Results",
    description: "Balanced training for obedience, behavior & real-life situations.",
    icon: Target,
  },
  {
    title: "Customized for Every Dog",
    description: "Every dog is different. Every plan is tailored.",
    icon: Sparkles,
  },
];

export const trustStats = [
  { label: "Happy Clients", value: "100+" },
  { label: "Client Rating", value: "5.0" },
];

export type CertificatePlaceholder = {
  id: string;
  title: string;
};

// Placeholder slots for certification/credential images — swap in real
// certificate photos here once available (see PLAN/PENDING_STEPS.md).
export const certificates: CertificatePlaceholder[] = [
  { id: "cert-1", title: "Certification 1" },
  { id: "cert-2", title: "Certification 2" },
  { id: "cert-3", title: "Certification 3" },
  { id: "cert-4", title: "Certification 4" },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "puppy-foundations",
    title: "Puppy Foundations",
    description:
      "Socialization, crate training, and basic manners to start your puppy off on the right paw.",
    icon: Baby,
  },
  {
    id: "obedience-training",
    title: "Obedience Training",
    description:
      "Reliable sit, stay, come, and leash manners built through positive reinforcement.",
    icon: PawPrint,
  },
  {
    id: "behavior-modification",
    title: "Behavior Modification",
    description:
      "Address reactivity, anxiety, and aggression with a customized, humane training plan.",
    icon: ShieldCheck,
  },
  {
    id: "leash-manners",
    title: "Leash Manners",
    description:
      "Turn stressful pulling and lunging into calm, enjoyable walks together.",
    icon: Footprints,
  },
  {
    id: "private-sessions",
    title: "Private 1-on-1 Sessions",
    description:
      "Personalized, in-home training tailored to your dog's specific needs and pace.",
    icon: Home,
  },
  {
    id: "group-classes",
    title: "Group Classes",
    description:
      "Build social skills and confidence alongside other dogs in a structured setting.",
    icon: Users,
  },
  {
    id: "board-and-train",
    title: "Board & Train",
    description:
      "Immersive training program where your dog lives and learns with us for fast results.",
    icon: Dog,
  },
  {
    id: "advanced-obedience",
    title: "Advanced Obedience",
    description:
      "Off-leash reliability and advanced commands for the well-mannered companion.",
    icon: GraduationCap,
  },
  {
    id: "separation-anxiety",
    title: "Separation Anxiety",
    description:
      "Gentle desensitization protocols to help your dog feel calm and secure when alone.",
    icon: Heart,
  },
  {
    id: "virtual-coaching",
    title: "Virtual Coaching",
    description:
      "Live video sessions and support for owners who want expert guidance from anywhere.",
    icon: MessageCircle,
  },
];

export type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyChooseUs: Benefit[] = [
  {
    title: "Certified & Experienced",
    description: "Years of hands-on experience backed by professional certification.",
    icon: Award,
  },
  {
    title: "Positive Reinforcement Only",
    description: "Force-free methods that build trust instead of fear.",
    icon: HeartHandshake,
  },
  {
    title: "Customized Training Plans",
    description: "Every dog is different, so every plan is built around your dog's needs.",
    icon: Sparkles,
  },
  {
    title: "Proven Track Record",
    description: "Hundreds of happy dogs and owners with lasting behavior change.",
    icon: Star,
  },
  {
    title: "Ongoing Support",
    description: "Follow-up guidance so progress sticks long after training ends.",
    icon: MessageCircle,
  },
  {
    title: "Flexible Scheduling",
    description: "In-home, in-person, and virtual sessions that fit your life.",
    icon: Home,
  },
  {
    title: "All Breeds & Ages Welcome",
    description: "From young puppies to senior dogs, every stage of life is welcome.",
    icon: Dog,
  },
  {
    title: "Real Relationship Building",
    description: "Training focused on strengthening the bond between you and your dog.",
    icon: Heart,
  },
];

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Free Consultation",
    description: "We learn about your dog's history, behavior, and your goals.",
  },
  {
    step: 2,
    title: "Assessment",
    description: "A hands-on evaluation to identify strengths and areas to work on.",
  },
  {
    step: 3,
    title: "Custom Training Plan",
    description: "A step-by-step plan tailored to your dog and your household.",
  },
  {
    step: 4,
    title: "Hands-On Training",
    description: "Structured sessions using positive reinforcement techniques.",
  },
  {
    step: 5,
    title: "Owner Coaching",
    description: "You learn the skills to reinforce training in everyday life.",
  },
  {
    step: 6,
    title: "Ongoing Support",
    description: "Check-ins and guidance to make sure progress lasts.",
  },
];

export type BeforeAfter = {
  before: string;
  after: string;
};

export const beforeAfterExamples: BeforeAfter[] = [
  { before: "Pulling hard on the leash", after: "Calm, loose-leash walking" },
  { before: "Barking at every visitor", after: "Relaxed, quiet greetings" },
  { before: "Jumping on guests", after: "Polite four-on-the-floor manners" },
  { before: "Anxious when left alone", after: "Calm and settled home alone" },
  { before: "Reactive toward other dogs", after: "Confident, neutral leash walks" },
  { before: "Ignoring recall outdoors", after: "Reliable off-leash recall" },
];

export type Testimonial = {
  name: string;
  dogName: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    dogName: "Bailey",
    quote:
      "Bailey went from pulling me down the street to walking calmly by my side. I finally enjoy our walks again!",
    rating: 5,
  },
  {
    name: "James T.",
    dogName: "Rex",
    quote:
      "The positive reinforcement approach made all the difference. Rex is calmer, happier, and so much more obedient.",
    rating: 5,
  },
  {
    name: "Priya K.",
    dogName: "Luna",
    quote:
      "We were at our wit's end with Luna's separation anxiety. The training plan genuinely changed our home life.",
    rating: 5,
  },
  {
    name: "Daniel R.",
    dogName: "Max",
    quote:
      "Professional, patient, and clearly loves what they do. Max is a completely different dog now.",
    rating: 5,
  },
  {
    name: "Emily S.",
    dogName: "Coco",
    quote:
      "The board and train program exceeded our expectations. Coco came home so much more confident and well behaved.",
    rating: 5,
  },
];

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "What training methods do you use?",
    answer:
      "We use exclusively positive reinforcement, force-free methods. This builds trust and long-lasting results without fear or intimidation.",
  },
  {
    question: "How long does training take?",
    answer:
      "It depends on your dog's age, temperament, and goals. Most owners see meaningful progress within a few weeks, with programs ranging from a few sessions to several months.",
  },
  {
    question: "Do you work with reactive or aggressive dogs?",
    answer:
      "Yes. Behavior modification for reactivity and aggression is one of our specialties, using a customized, humane approach.",
  },
  {
    question: "What ages and breeds do you work with?",
    answer:
      "All breeds and ages, from young puppies to senior dogs. Training plans are always adapted to your dog's specific stage of life.",
  },
  {
    question: "Do you offer in-home training?",
    answer:
      "Yes, in-home private sessions are available in addition to group classes and virtual coaching.",
  },
  {
    question: "What is Board & Train?",
    answer:
      "Board & Train is an immersive program where your dog stays with us for focused, accelerated training, followed by owner handoff sessions.",
  },
  {
    question: "How much does training cost?",
    answer:
      "Pricing depends on the program and your dog's needs. Request a free consultation and we'll recommend the right package with transparent pricing.",
  },
  {
    question: "Will my dog listen to me, not just the trainer?",
    answer:
      "Every program includes owner coaching, because training only lasts if you know how to reinforce it at home.",
  },
];

export type PricingPlan = {
  name: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Puppy Package",
    description: "Foundational training for puppies under 6 months.",
    features: [
      "Socialization guidance",
      "Crate & potty training",
      "Basic manners",
      "Owner coaching",
    ],
  },
  {
    name: "Behavior Package",
    description: "Focused work on specific behavior challenges.",
    features: [
      "Custom behavior plan",
      "Reactivity or anxiety support",
      "Hands-on sessions",
      "Follow-up check-ins",
    ],
    featured: true,
  },
  {
    name: "Complete Program",
    description: "Comprehensive training from foundations to advanced obedience.",
    features: [
      "Full obedience training",
      "Off-leash reliability",
      "Lifetime owner support",
      "Priority scheduling",
    ],
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "positive-reinforcement-101",
    title: "Positive Reinforcement 101: Why It Works",
    excerpt:
      "A look at the science behind positive reinforcement and why it builds lasting behavior change.",
    date: "2026-05-12",
  },
  {
    slug: "puppy-socialization-window",
    title: "The Critical Puppy Socialization Window",
    excerpt:
      "What the first few months mean for your puppy's long-term confidence and behavior.",
    date: "2026-04-28",
  },
  {
    slug: "stop-leash-pulling",
    title: "5 Steps to Stop Leash Pulling for Good",
    excerpt:
      "A simple, practical framework you can start using on your very next walk.",
    date: "2026-04-10",
  },
  {
    slug: "separation-anxiety-signs",
    title: "Signs of Separation Anxiety (and What to Do)",
    excerpt:
      "How to recognize the early signs of separation anxiety and steps to help your dog cope.",
    date: "2026-03-22",
  },
];
