/**
 * ============================================================
 *  💜  THE ONLY FILE YOU NEED TO EDIT  💜
 * ============================================================
 *  Anything still wrapped in [[ ... ]] is a placeholder.
 *  Those bits AUTO-HIDE on the site until you fill them in,
 *  so nothing ever looks broken. Replace the text and save.
 *  Photos live in /public/photos  (photo-01.jpg ... photo-15.jpg)
 * ============================================================
 */

export const PHOTOS = [
  "/photos/photo-01.jpg",
  "/photos/photo-02.jpg",
  "/photos/photo-03.jpg",
  "/photos/photo-04.jpg",
  "/photos/photo-05.jpg",
  "/photos/photo-06.jpg",
  "/photos/photo-07.jpg",
  "/photos/photo-08.jpg",
  "/photos/photo-09.jpg",
  "/photos/photo-10.jpg",
  "/photos/photo-11.jpg",
  "/photos/photo-12.jpg",
  "/photos/photo-13.jpg",
  "/photos/photo-14.jpg",
  "/photos/photo-15.jpg",
] as const;

/** A string is "filled" when it has no [[placeholder]] marker. */
export const filled = (s: string) => !!s && !s.includes("[[");

export const content = {
  // ---- Identity -------------------------------------------------
  her: {
    fullName: "Divyna Francis",
    nick: "Divs",
    pet: "Mi Amore",
    ageTomorrow: "18",
  },

  // ---- Loader ---------------------------------------------------
  loader: {
    line1: "For Divs…",
    line2: "Happy Birthday Mi Amore",
  },

  // ---- Hero -----------------------------------------------------
  hero: {
    title: "Happy Birthday Divs",
    subtitle:
      "Every kilometer between Kerala and Bangalore only reminds me how lucky I am to have you.",
    cta: "Begin Our Story",
  },

  // ---- Relationship intro --------------------------------------
  intro: {
    together: "About 6 months",
    firstMetWhen: "10th January 2026",
    firstMetHow: "At Cubbon Park metro station",
    yourImpression: "She's so cute, and so genuine.",
    herImpression: "[[she never told me — but I hope it made her smile]]",
    favoriteMemory:
      "So many of them — but the little moments in the lift are the ones I keep.",
  },

  // ---- Our story so far (real moments) -------------------------
  // memory containing [[ ]] is hidden automatically. Add as many as you want.
  meetings: [
    {
      date: "10 Jan 2026",
      place: "Cubbon Park Metro Station",
      memory: "The day our two timelines finally crossed.",
      photo: "/photos/photo-01.jpg",
    },
    {
      date: "Our mornings",
      place: "Naught mommy",
      memory: "Our morning metro journeys — my favourite part of the day.",
      photo: "/photos/photo-02.jpg",
    },
    {
      date: "Our place",
      place: "Kozhi koodu",
      memory: "Endless video calls that go on till neither of us wants to say goodnight.",

      photo: "/photos/photo-03.jpg",
    },
    {
      date: "Every night",
      place: "Kerala ↔ Bangalore",
       memory: "Cubbon Park — the place that's just ours now.",
                 
      photo: "/photos/photo-04.jpg",
    },
    {
      date: "Before your exams",
      place: "On call",
      memory:
        "“We can't see each other for some time” — the hardest little goodbye.",
      photo: "/photos/photo-05.jpg",
    },
    {
      date: "",
      place: "Papa's Office",
      memory: "pappa ko metting hena ",
      photo: "/photos/photo-08.jpg",
    },
    // Add more real meetings here whenever you like:
    { date: "[[date]]", place: "[[place]]", memory: "[[add this memory]]", photo: "/photos/photo-06.jpg" },
    { date: "[[date]]", place: "[[place]]", memory: "[[add this memory]]", photo: "/photos/photo-07.jpg" },
  ],

  // ---- Distance section ----------------------------------------
  distance: {
    from: "Kerala",
    to: "Bangalore",
    km: 480,
    stats: [
      { label: "Kilometers apart", value: 480, suffix: " km" },
      { label: "Calls shared", value: 500, suffix: "+" },
      { label: "Messages sent", value: 25000, suffix: "+" },
      { label: "Memories made", value: 15, suffix: "+" },
    ],
    missAboutHer: "Your calls during my morning walks — and waiting for the day I get to see you again.",
    missAboutBangalore: "Our metro journeys, especially the mornings.",
    specialPlace: "Cubbon Park",
  },

  // ---- Why I Love You (flip cards) -----------------------------
  whyILoveYou: [
    "Your smile.",
    "Your genuine, pure heart.",
    "How caring and loving you are with everything.",
    "How mature you are, even at 18.",
    "The way you keep everything — and everyone — so organised.",
    "That you love your ukulele, and the world goes quiet when you play.",
  ],

  // ---- Things she does that melt my heart ----------------------
  meltMyHeart: [
    "The way you say “see… listen…” before you tell me something.",
    "Your morning calls while I'm on my walk.",
    "How effortlessly organised you are about everything.",
    "Your smile that fixes whatever kind of day I'm having.",
    "How pure and caring your heart is, always.",
  ],

  // ---- About Divs (favorites) — cards auto-hide if unknown -----
  favorites: {
    color: "Black",
    flower: "[[favorite flower]]",
    food: "Biriyani",
    dessert: "[[favorite dessert]]",
    movie: "Off Campus",
    song: "Maname · Kadhal Aasai · Be My Baby",
    destination: "Switzerland",
    hobbies: "Ukulele",
  },

  // ---- Future dreams roadmap -----------------------------------
  future: [
    {
      tag: "Today",
      title: "480 km apart, closer than ever",
      note: "Kerala ↔ Bangalore, every single day.",
    },
    {
      tag: "Next Meeting",
      title: "Seeing you again after your exams",
      note: "The day I'm waiting for.",
    },
    {
      tag: "This Year",
      title: "Cheering you to your goal — reaching 50kg 💪",
      note: "Every single step, I'm right there.",
    },
    {
      tag: "Forever",
      title: "A life with no more “see you later”",
      note: "[[the dream future you want for us — edit me]]",
    },
  ],

  // ---- The Letter ----------------------------------------------
  // ⚠️  This is a DRAFT built from what you told me. Rewrite it in
  //     YOUR words — it's the heart of the whole site.
  letter: {
    greeting: "My dearest Divs,",
    body: [
      "It started at a metro station. 10th of January, Cubbon Park — and somehow two completely different timelines, one in Kerala and one in Bangalore, decided to cross right there. I didn't know it yet, but that was the day everything changed.",
      "Now there are 480 kilometers between us, and they only make me sure of one thing: I'd close every one of them for you. Your calls on my morning walks, our metro mornings, the video calls that go on till neither of us wants to hang up — that's my favourite life.",
      "You can create anything you set your heart to — I've seen it. And whatever you build, whatever you become, through every exam and every goal, I'll always be there for you. Happy birthday, Mi Amore.",
    ],
    signoff: "Forever yours,",
    signature: "Your Motta Kunje 💜",
  },

  // ---- Surprise gift reveal ------------------------------------
  surprise: {
    teaser: "I made you something.",
    button: "Open your gift",
    revealTitle: "Happy Birthday, Mi Amore 🎂",
    revealMessage:
      "No matter the distance, no matter what — I'll always be there for you.",
  },

  // ---- Finale --------------------------------------------------
  finale: {
    title: "To My Divs",
    line: "Thank you for every memory, every smile, every call, every moment.",
    sign: "Happy Birthday Mi Amore",
    replay: "Replay Our Story",
  },

  // ---- Audio ---------------------------------------------------
  // Drop an mp3 into /public/audio/ and set the path here.
  audio: {
    src: "",
    title: "[[favorite song]]",
  },
} as const;

export type Meeting = (typeof content.meetings)[number];
export type Stat = (typeof content.distance.stats)[number];
