module.exports = {
    mode: "jit",
    purge: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                omnihiveBackgroundColor: "#212121",
                omnihiveDarkGrey: "#969696",
                omnihiveLightGrey: "#ababab",
                omnihiveOrange: "#d38d15",
                omnihiveOrangeHover: "#eca62d",
                omnihiveSidebar: "#373737",
                omnihiveModal: "#595959",
                omnihiveStatusGreen: "#08bb1d",
                omnihiveStatusYellow: "#ffd200",
                omnihiveStatusOrange: "#ff7200",
                omnihiveStatusRed: "#cd0808",
                omnihiveStatusGrey: "#acacac",
            },
            maxWidth: {
                omnihiveSidebar: "4rem",
                omnihiveServerManagerTree: "500px",
            },
            minWidth: {
                omnihiveSidebar: "4rem",
                omnihiveServerManagerTree: "250px",
            },
            width: {
                omnihiveServerManagerTree: "250px",
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
        fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
    },
    plugins: [],
};
