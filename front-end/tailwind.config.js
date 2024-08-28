/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-navy': 'rgb(31 41 55 / var(--tw-bg-opacity))',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};