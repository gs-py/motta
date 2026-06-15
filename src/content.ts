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
      { label: "Messages sent", value: 82675, suffix: "" },
      { label: "Memories made", value: 15, suffix: "+" },
    ],
    missAboutHer: "Your calls during my morning walks — and waiting for the day I get to see you again.",
    missAboutBangalore: "Our metro journeys, especially the mornings.",
    specialPlace: "Cubbon Park",
  },

  // ---- Us, in numbers (from our real chat) ---------------------
  // Auto-computed from the WhatsApp export — every figure is real.
  numbers: {
    eyebrow: "Eight months, counted",
    headline: [
      { label: "Messages", value: 82675, suffix: "" },
      { label: "Days of us", value: 252, suffix: "" },
      { label: "Days we both showed up", value: 237, suffix: "" },
      { label: "Longest daily streak", value: 121, suffix: " days" },
      { label: "Messages a day", value: 349, suffix: "" },
    ],
    // Who sent what (51 / 49) — me = Gladwin, you = Divs
    split: {
      me: { label: "Me", count: 42508, pct: 51.4 },
      you: { label: "You", count: 40167, pct: 48.6 },
    },
    // Things we said out loud (real counts)
    phrases: [
      { label: "“Good night”", value: 146 },
      { label: "“I love you” moments", value: 114 },
      { label: "“Baby”", value: 70 },
      { label: "“Miss you”", value: 66 },
      { label: "“Good morning”", value: 61 },
      { label: "“Babe”", value: 32 },
      { label: "“Amoor”", value: 4 },
    ],
    // What we call each other (distinct messages; me = Gladwin, you = Divs)
    nicknames: [
      { name: "muthe", note: "pearl · what you call me", total: 328, me: 109, you: 219 },
      { name: "kunju", note: "little one · what I call you", total: 232, me: 209, you: 23 },
      { name: "da", note: "your little tag for me", total: 129, me: 23, you: 106 },
      { name: "motta kunju", note: "us, in one word", total: 109, me: 107, you: 2 },
      { name: "baby", note: "both of us", total: 70, me: 29, you: 41 },
      { name: "mone", note: "dear · mostly you", total: 51, me: 7, you: 44 },
      { name: "mole", note: "dear · mostly me", total: 49, me: 45, you: 4 },
      { name: "babe", note: "both of us", total: 32, me: 18, you: 14 },
      { name: "cutie", note: "mostly me", total: 21, me: 18, you: 3 },
    ],
    // The emotional colours of us (% of all emotion-tagged messages)
    emotions: [
      { label: "Love", pct: 18.5 },
      { label: "Care", pct: 12.1 },
      { label: "Happiness", pct: 11.8 },
      { label: "Sadness", pct: 10.9 },
      { label: "Affection", pct: 9.1 },
      { label: "Appreciation", pct: 7.8 },
      { label: "Excitement", pct: 6.7 },
      { label: "Anxiety", pct: 6.8 },
      { label: "Reconciliation", pct: 3.1 },
      { label: "Support", pct: 2.4 },
    ],
    emotionsNote:
      "Mostly love, care and happiness — with all the real, human colours in between.",
    // Messages by hour, 0–23 (we are night people)
    hours: [
      11219, 4419, 1456, 513, 28, 104, 462, 1799, 2103, 2061, 2795, 2746,
      1514, 2866, 2997, 3996, 2413, 2123, 3048, 3651, 3904, 5021, 7112, 14325,
    ],
    peakHour: "11 PM",
    busiest: { day: "5 May 2026", count: 1848 },
    closing: "82,675 messages — and every single one led me back to you.",

    // How we grew — milestones pulled from the chat itself
    milestones: [
      { date: "07 Oct 2025", title: "The first “Hi”", quote: "Two strangers swapping event photos." },
      { date: "27 Oct 2025", title: "First time it got real", quote: "“if you have the heart to love so much, wouldn’t God prepare someone who can love you equally.”" },
      { date: "07 Nov 2025", title: "The first compliment", quote: "“you have silky hair… I really like it.”" },
      { date: "14 Dec 2025", title: "The first “ily”", quote: "said quietly, almost by accident." },
      { date: "04 Jan 2026", title: "The 3 a.m. promise", quote: "“I’ll love you for as long as life has us — that’s for sure.”" },
      { date: "17 Jan 2026", title: "“I love you” made ours", quote: "“love you and I love you are different — from now, say ‘I love you’ to me.”" },
      { date: "14 Feb 2026", title: "Our first Valentine’s", quote: "“happy valentine’s to my forever valentine.”" },
      { date: "Feb–Apr 2026", title: "I started building for you", quote: "little apps, and a whole study guide for your exam." },
      { date: "05 May 2026", title: "We drew our family trees", quote: "and wrote each other into them." },
      { date: "16 May 2026", title: "Dream-comes-true day", quote: "“you held my hand, leaned on my shoulder…”" },
    ],
    // Words we actually said (real lines from the chat)
    wordsHe: [
      "I found the one I love.",
      "I’m so lucky to have you — it means the world to me.",
      "I never been loved like this before.",
      "More than you, I’m gonna miss you badly.",
      "I want to feel loved by you with the same depth even as time passes.",
    ],
    wordsShe: [
      "I will love you for as long as life has us.",
      "I want to continue loving you forever.",
      "You’re one of the best things that happened to me.",
      "No one can ever be more perfect in my eyes than you already are.",
      "I’ll be the cool aunt for your kids. 🤭",
    ],
    // Our inside jokes
    jokes: [
      { emoji: "🥚", text: "“Motta Kunju” — our egg-baby name (a.k.a. hybrid motta, motta shaming)" },
      { emoji: "👩", text: "The “BAD MOMMY” running gag" },
      { emoji: "💬", text: "“Motta Kunju se mera pyar hogaya” ×300 — the great love-flood of 28 May" },
      { emoji: "🗣️", text: "“da” vs “muthe” — the two words that are just ours" },
    ],

    // ---- Our year, month by month ----
    months: [
      { label: "Oct", value: 6905 },
      { label: "Nov", value: 11124 },
      { label: "Dec", value: 16242 },
      { label: "Jan", value: 9656 },
      { label: "Feb", value: 7317 },
      { label: "Mar", value: 7372 },
      { label: "Apr", value: 9040 },
      { label: "May", value: 11188 },
      { label: "Jun", value: 3831 },
    ],
    monthsNote: "December was our loudest month — the month we fell.",
    // Which day is most ours (Mon → Sun)
    weekdays: [
      { label: "Mon", value: 12391 },
      { label: "Tue", value: 11878 },
      { label: "Wed", value: 8665 },
      { label: "Thu", value: 10937 },
      { label: "Fri", value: 12332 },
      { label: "Sat", value: 12119 },
      { label: "Sun", value: 14353 },
    ],
    topDays: [
      { date: "5 May 2026", count: 1848 },
      { date: "27 Jan 2026", count: 1560 },
      { date: "4 Dec 2025", count: 1546 },
      { date: "27 Oct 2025", count: 1446 },
      { date: "10 Feb 2026", count: 1290 },
    ],

    // ---- Me vs You — playful head to head (me = Gladwin, you = Divs) ----
    versus: [
      { label: "Words written", me: 157906, you: 118897, unit: "", decimals: 0, lowerWins: false },
      { label: "Conversations started", me: 155, you: 82, unit: "", decimals: 0, lowerWins: false },
      { label: "Questions asked", me: 159, you: 574, unit: "", decimals: 0, lowerWins: false },
      { label: "Photos & videos sent", me: 630, you: 1211, unit: "", decimals: 0, lowerWins: false },
      { label: "Emojis per message", me: 0.13, you: 0.23, unit: "", decimals: 2, lowerWins: false },
      { label: "Faster to reply", me: 5.2, you: 3.7, unit: " min", decimals: 1, lowerWins: true },
    ],
    versusNote: "Different strengths, same effort — that's the whole secret.",

    // ---- NLP emotional fingerprint — who feels what (me = Gladwin, you = Divs) ----
    // Tagged by running each message through a multilingual emotion lexicon.
    emotionByPerson: [
      { emotion: "Love", me: 510, you: 891 },
      { emotion: "Care", me: 496, you: 418 },
      { emotion: "Happiness", me: 406, you: 489 },
      { emotion: "Affection", me: 380, you: 312 },
      { emotion: "Appreciation", me: 239, you: 351 },
      { emotion: "Excitement", me: 348, you: 157 },
      { emotion: "Sadness", me: 201, you: 622 },
      { emotion: "Anxiety", me: 241, you: 272 },
      { emotion: "Frustration", me: 373, you: 196 },
      { emotion: "Making peace", me: 47, you: 185 },
    ],
    persona: {
      me: {
        name: "Me",
        emojis: ["😂", "😌", "🤭", "🙂"],
        title: "The steady one",
        line: "More care, more excitement, the first to crack a joke — the calm that holds us together.",
      },
      you: {
        name: "You",
        emojis: ["🤭", "😌", "🥲", "🔪"],
        title: "The heart",
        line: "You feel everything fully — the most love, the deepest feeling, and always the quickest to make peace.",
      },
    },
    personaNote:
      "Read from how we write — every message tagged for emotion. Two very different hearts, beating in time.",

    // ---- Our relationship report card (scored from the chat) ----
    overallScore: { label: "Overall", value: 88, blurb: "Thriving — and still growing gentler." },
    scores: [
      { label: "Communication", value: 93, blurb: "94% of days active, replies under six minutes." },
      { label: "Emotional Connection", value: 91, blurb: "114 love-messages and deepening tenderness." },
      { label: "Stability", value: 82, blurb: "Conflict is rare, and we always find our way back." },
      { label: "Mutual Effort", value: 86, blurb: "Almost 50 / 50 — both of us, every single day." },
    ],
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
