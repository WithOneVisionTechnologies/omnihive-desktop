module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                omnihiveBackgroundColor: "#212121",
                omnihiveDarkGrey: "#969696",
                omnihiveLightGrey: "#ababab",
                omnihiveOrange: "#d38d15",
                omnihiveSidebar: "#373737",
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
        extend: {},
    },
    plugins: [],
};
