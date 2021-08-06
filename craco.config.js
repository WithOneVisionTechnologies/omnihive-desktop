module.exports = {
    devServer: {
        hot: true,
        inline: true,
    },
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
};
