export type PersonalityId =
  | "bold-explorer"
  | "smooth-operator"
  | "cozy-classic"
  | "wild-card";

export type Personality = {
  id: PersonalityId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  coffee: string;
  coffeeDescription: string;
  accent: string;
};

export type QuizOption = {
  label: string;
  emoji: string;
  personalityId: PersonalityId;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  helper: string;
  options: QuizOption[];
};

export const personalities: Personality[] = [
  {
    id: "bold-explorer",
    name: "Bold Explorer",
    emoji: "⚡",
    tagline: "Big flavor. Big energy. No apologies.",
    description:
      "You like coffee that shows up with a point of view. Bold Explorer is the person who wants a dark, intense cup that feels decisive, adventurous, and a little dramatic.",
    coffee: "Midnight Summit",
    coffeeDescription:
      "Dark roast, smoky, and bold with Indonesian depth. This is the cup for the person who means it when they order espresso.",
    accent: "#af5f38",
  },
  {
    id: "smooth-operator",
    name: "Smooth Operator",
    emoji: "☕",
    tagline: "Balanced, reliable, and always easy to love.",
    description:
      "You want a cup that is polished and dependable. Smooth Operator is all about balance, comfort, and a flavor profile that feels effortless in the best way.",
    coffee: "Sunrise Blend",
    coffeeDescription:
      "A medium roast with caramel and chocolate notes from Colombia. Classic, crowd-pleasing, and quietly excellent.",
    accent: "#8d654e",
  },
  {
    id: "cozy-classic",
    name: "Cozy Classic",
    emoji: "🧡",
    tagline: "Warm, familiar, and made for slow mornings.",
    description:
      "You like coffee that feels like a ritual worth keeping. Cozy Classic leans comfort-first: familiar flavors, soft edges, and a cup that makes the day feel manageable.",
    coffee: "Sunday Paper",
    coffeeDescription:
      "A medium roast with hazelnut and vanilla notes. This is the coffee equivalent of a favorite sweater and a quiet morning.",
    accent: "#cf7650",
  },
  {
    id: "wild-card",
    name: "Wild Card",
    emoji: "🌈",
    tagline: "Curious, surprising, and always a little unexpected.",
    description:
      "You are here for the adventure. Wild Card wants unusual coffees, experimental processing, and the chance to discover something the rest of the table has not tried yet.",
    coffee: "Off the Map",
    coffeeDescription:
      "An experimental rotating micro-lot with funky fruit notes and a little chaos in the best possible way.",
    accent: "#b35644",
  },
];

export const questions: QuizQuestion[] = [
  {
    id: "weekend",
    prompt: "You finally have a quiet Saturday morning. What are you reaching for?",
    helper: "Pick the answer that feels most like your natural Saturday.",
    options: [
      {
        label: "A strong, no-nonsense cup and a full to-do list.",
        emoji: "🔥",
        personalityId: "bold-explorer",
      },
      {
        label: "A balanced cup and an easy breakfast.",
        emoji: "🌤️",
        personalityId: "smooth-operator",
      },
      {
        label: "Something cozy while you read or relax.",
        emoji: "🕯️",
        personalityId: "cozy-classic",
      },
      {
        label: "A new brew method or a coffee you have never tried before.",
        emoji: "🧪",
        personalityId: "wild-card",
      },
    ],
  },
  {
    id: "travel",
    prompt: "Which travel plan sounds most appealing?",
    helper: "Choose the trip you would book first, not the one that sounds smartest.",
    options: [
      {
        label: "A high-energy trip with packed days and big sights.",
        emoji: "🏔️",
        personalityId: "bold-explorer",
      },
      {
        label: "A well-planned city weekend with great food and coffee stops.",
        emoji: "🗺️",
        personalityId: "smooth-operator",
      },
      {
        label: "A cabin, a book, and a slow morning routine.",
        emoji: "📚",
        personalityId: "cozy-classic",
      },
      {
        label: "A spontaneous destination you picked at the last minute.",
        emoji: "🎒",
        personalityId: "wild-card",
      },
    ],
  },
  {
    id: "coffee-preference",
    prompt: "When you order coffee, what matters most?",
    helper: "Trust your instinct here. The fastest answer is usually the right one.",
    options: [
      {
        label: "It hits hard and tastes intense.",
        emoji: "☕",
        personalityId: "bold-explorer",
      },
      {
        label: "It is smooth and consistently good.",
        emoji: "🫶",
        personalityId: "smooth-operator",
      },
      {
        label: "It feels familiar and comforting.",
        emoji: "🧸",
        personalityId: "cozy-classic",
      },
      {
        label: "It surprises you in a good way.",
        emoji: "✨",
        personalityId: "wild-card",
      },
    ],
  },
  {
    id: "identity",
    prompt: "Pick the sentence that sounds most like you:",
    helper: "Pick the line you would actually say out loud.",
    options: [
      {
        label: "I like coffee with a strong personality.",
        emoji: "⚡",
        personalityId: "bold-explorer",
      },
      {
        label: "I want something balanced that I can count on.",
        emoji: "🧭",
        personalityId: "smooth-operator",
      },
      {
        label: "I just want my coffee to feel comforting.",
        emoji: "🧡",
        personalityId: "cozy-classic",
      },
      {
        label: "I want to keep discovering new favorites.",
        emoji: "🌈",
        personalityId: "wild-card",
      },
    ],
  },
  {
    id: "kitchen",
    prompt: "Which kitchen shelf would you be most proud of?",
    helper: "Choose the setup that feels the most like home.",
    options: [
      {
        label: "One with bold beans and espresso gear.",
        emoji: "🫘",
        personalityId: "bold-explorer",
      },
      {
        label: "One with a clean setup and a reliable grinder.",
        emoji: "⚙️",
        personalityId: "smooth-operator",
      },
      {
        label: "One with mugs, syrups, and cozy essentials.",
        emoji: "🍯",
        personalityId: "cozy-classic",
      },
      {
        label: "One with unusual beans, notes, and a few surprises.",
        emoji: "🧪",
        personalityId: "wild-card",
      },
    ],
  },
  {
    id: "subscription",
    prompt: "Your ideal coffee subscription should feel like:",
    helper: "Final pick. Choose the energy you want to wake up to.",
    options: [
      {
        label: "A bold ritual that wakes you up.",
        emoji: "⚡",
        personalityId: "bold-explorer",
      },
      {
        label: "A dependable favorite that always works.",
        emoji: "✅",
        personalityId: "smooth-operator",
      },
      {
        label: "A comforting habit that makes mornings better.",
        emoji: "🌞",
        personalityId: "cozy-classic",
      },
      {
        label: "A discovery engine that keeps things interesting.",
        emoji: "🌀",
        personalityId: "wild-card",
      },
    ],
  },
];

export const personalityMap = Object.fromEntries(
  personalities.map((personality) => [personality.id, personality]),
) as Record<PersonalityId, Personality>;
