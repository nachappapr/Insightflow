import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["var(--font-jost)"],
      },
      colors: {
        brand: {
          primary: "#4661E6", // indigo-1000
          secondary: "#AD1FEA", // purple-1000
          light: "#7C91F9", // indigo-1001
        },
        feedback: {
          purple: "#AD1FEA",
          blue: "#4661E6",
          hover: {
            purple: "#C75AF6",
            blue: "#7C91F9",
          },
        },
        background: {
          primary: "#F7F8FD", // ghost-white
          secondary: "#F2F4FF", // alice-blue
        },
        text: {
          primary: "#3A4374", // american-blue-100
          secondary: "#647196", // dark-blue-gray
          light: "#8C92B3", // cool-grey
        },
        status: {
          planned: "#F49F85", // vivid-tangerine
          inProgress: "#AD1FEA", // purple-1000
          live: "#62BCFA", // maya-blue
        },
        accent: {
          blue: "#CFD7FF", // lavender-blue
          purple: "#C75AF6", // purple-light
          indigo: "#7C91F9", // indigo-light
        },
        error: {
          DEFAULT: "#D73737", // jasper
          light: "#E98888", // jasper-light
        },
        navy: {
          DEFAULT: "#373F68", // american-blue-200
          light: "#656EA3", // american-blue-light
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    transitionProperty: {
      hover:
        "transform, background-color, border-color, color, fill, stroke, opacity, box-shadow, filter, backdrop-filter",
    },
    transitionDuration: {
      "250": "250ms",
      "300": "300ms",
    },
    transitionTimingFunction: {
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      slideDownAndFade: {
        from: { opacity: "0", transform: "translateY(-10px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideUpAndFade: {
        from: { opacity: "0", transform: "translateY(10px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      slideDownAndFade: "slideDownAndFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
