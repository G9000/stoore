// eslint-disable-next-line @typescript-eslint/no-var-requires
let plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
        "./primitives/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryWhite: "var(--primaryWhite)",
                primaryBlack: "var(--primaryBlack)",
                primaryBrandRed: "var(--primaryBrandRed)",
                primaryGreen800: "var(--primaryGreen800)",
                primaryGreen400: "var(--primaryGreen400)",
                primaryGreen200: "var(--primaryGreen200)",
            },
        },
    },
    plugins: [
        plugin(function (helpers) {
            // variants that help styling Radix-UI components
            dataStateVariant("open", helpers);
            dataStateVariant("closed", helpers);
            dataStateVariant("on", helpers);
            dataStateVariant("checked", helpers);
            dataStateVariant("unchecked", helpers);
        }),
    ],
};

function dataStateVariant(
    state,
    {
        addVariant, // for registering custom variants
        e, // for manually escaping strings meant to be used in class names
    }
) {
    addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(
                `data-state-${state}${separator}${className}`
            )}[data-state='${state}']`;
        });
    });

    addVariant(
        `group-data-state-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `.group[data-state='${state}'] .${e(
                    `group-data-state-${state}${separator}${className}`
                )}`;
            });
        }
    );

    addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.peer[data-state='${state}'] ~ .${e(
                `peer-data-state-${state}${separator}${className}`
            )}`;
        });
    });
}
