import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                lumi: {
                    slate: "#5A6A85", // From icon gear
                    sage: "#A5D6A7",  // For success states
                    wood: "#E0C097",  // For 3D blocks
                    grey: "#7A7A7A",  // For text/lines
                    bg: "#FDFDFD",    // Warm off-white
                    primary: "#5A6A85", // Mapping legacy primary to slate
                },
            },
            fontFamily: {
                baloo: ['var(--font-baloo)', 'sans-serif'],
            },
            keyframes: {
                "gentle-float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
                "icon-pop": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.15)" },
                    "100%": { transform: "scale(1.1)" },
                },
                "dash": {
                    "to": { strokeDashoffset: "-100" },
                },
            },
            animation: {
                float: "gentle-float 3s ease-in-out infinite",
                pop: "icon-pop 0.3s ease-out forwards",
                dash: "dash 20s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
