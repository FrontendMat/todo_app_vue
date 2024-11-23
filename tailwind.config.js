/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: ["./html", "./src/**/*.vue"],
    theme: {
        extend: {
            colors: {
                primary: colors.orange,
                secondary: colors.gray,
                danger: colors.red,
                success: colors.green,
            },
            fontFamily: {
                sans: ["Inter", "Arial", "sans-serif"],
                heading: ["Poppins", "Arial", "sans-serif"],
            },
            boxShadow: {
                card: "0 4px 6px rgba(0, 0, 0, 0.1)",
                button: "0 2px 4px rgba(0, 0, 0, 0.1)",
            },
            borderRadius: {
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
            },
            spacing: {
                1: "4px",
                2: "8px",
                3: "12px",
                4: "16px",
                5: "20px",
                6: "24px",
                8: "32px",
                10: "40px",
                12: "48px",
                16: "64px",
            },
        },
    },
    plugins: [],
};
