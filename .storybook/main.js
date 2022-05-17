module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    webpackFinal: (config) => {
        config.resolve.alias = {
            ...config.resolve?.alias,
            "@": [
                path.resolve(__dirname, "../src/"),
                path.resolve(__dirname, "../"),
            ],
        };
        config.resolve.roots = [
            path.resolve(__dirname, "../public"),
            "node_modules",
        ];

        return config;
    },
};
