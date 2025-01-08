import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#572AF8',
                    hover: '#572AF8',
                    border: colors.purple[400],
                    text: colors.purple[500],
                    dark: colors.purple[800],
                    ['dark-hover']: colors.purple[900],
                },
                secondary: {
                    DEFAULT: colors.neutral[200],
                    hover: colors.neutral[100],
                    border: colors.neutral[400],
                    text: colors.neutral[500],
                    dark: colors.neutral[800],
                    ['dark-hover']: colors.neutral[900],
                },
            },
        },
    },
    plugins: [],
};
