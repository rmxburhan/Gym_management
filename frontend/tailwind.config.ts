import type { Config } from 'tailwindcss';
const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',

        // Path to Tremor module
        './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
