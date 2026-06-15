/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        pink: {
          soft: "#ffd6e7",
          DEFAULT: "#ff9ec4",
          deep: "#ff6fa5",
        },
        lavender: {
          soft: "#e7deff",
          DEFAULT: "#b69dff",
          deep: "#9b7fff",
        },
        rosegold: {
          soft: "#f7d9c4",
          DEFAULT: "#e8b08e",
          deep: "#c98a63",
        },
        purple: {
          deep: "#2a1840",
          night: "#1a1025",
          ink: "#0e0816",
        },
        cream: "#fff8f3",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        script: ['"Dancing Script"', "cursive"],
      },
      letterSpacing: {
        widest2: "0.4em",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(at 20% 20%, rgba(182,157,255,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255,158,196,0.30) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(232,176,142,0.25) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(155,127,255,0.25) 0px, transparent 50%)",
        // richer multi-stop mesh for depth
        mesh: "radial-gradient(at 0% 0%, rgba(155,127,255,0.22) 0px, transparent 45%), radial-gradient(at 100% 10%, rgba(255,111,165,0.18) 0px, transparent 45%), radial-gradient(at 50% 100%, rgba(232,176,142,0.14) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(182,157,255,0.16) 0px, transparent 45%)",
        "glass-edge":
          "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.02))",
        "shine":
          "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.45) 50%, transparent 75%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(255,158,196,0.45)",
        "glow-lav": "0 0 60px -15px rgba(182,157,255,0.5)",
        soft: "0 20px 50px -20px rgba(0,0,0,0.5)",
        card: "0 24px 70px -28px rgba(155,127,255,0.45), 0 2px 8px -2px rgba(0,0,0,0.4)",
        "card-hover":
          "0 40px 110px -30px rgba(255,158,196,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "aurora-shift": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(2%, -2%, 0) rotate(2deg)" },
          "66%": { transform: "translate3d(-2%, 1%, 0) rotate(-2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "aurora-shift": "aurora-shift 18s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "gradient-pan": "gradient-pan 6s ease infinite",
        "glow-pulse": "glow-pulse 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
