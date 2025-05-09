module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Spoqa Han Sans Neo", "Pretendard", "sans-serif"],
            },
            colors: {
                black: "#111322",
                gray: {
                    50: "#7D7986",
                    40: "#A4A1AA",
                    30: "#CBC9CF",
                    20: "#E5E4E7",
                    10: "#F2F2F3",
                    5: "#FAFAFA",
                },
                white: "#FFFFFF",
                red: {
                    50: "#EA3C12",
                    40: "#FF4040",
                    30: "#FF8D72",
                    20: "#FFAF9B",
                    10: "#FFEBE7",
                },
                blue: {
                    20: "#0080FF",
                    10: "#CCE6FF",
                },
                green: {
                    20: "#20A81E",
                    10: "#D4F7D4",
                },
                kakao: "#FEE500",
            },
            boxShadow: {
                input: "0px 4px 25px 0px #0000001A",
                notification: "0px 2px 8px 0px #78748640",
            },
            screens: {
                xs: "375px",
                sm: "768px",
                md: "1024px",
            },
        },
    },
    plugins: [],
};
