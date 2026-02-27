import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                handwriting: ['"Patrick Hand"', 'cursive'],
            },
            colors: {
                cork: {
                    50: '#fdf6e3',
                    100: '#f5e6c8',
                    200: '#e8d5a3',
                    300: '#d4a574',
                    400: '#c4956a',
                    500: '#b8845a',
                    600: '#a0724d',
                    700: '#7a5638',
                    800: '#5c4029',
                    900: '#3d2b1a',
                },
                paper: {
                    50: '#fffef9',
                    100: '#fff8dc',
                    200: '#fdf6e3',
                    300: '#f5edd6',
                },
                pin: {
                    red: '#e74c3c',
                    blue: '#3498db',
                    green: '#27ae60',
                    yellow: '#f39c12',
                },
                wood: {
                    light: '#deb887',
                    DEFAULT: '#a0724d',
                    dark: '#6b4423',
                },
            },
            boxShadow: {
                'paper': '2px 3px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
                'paper-hover': '3px 5px 12px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.12)',
                'pin': '0 2px 4px rgba(0,0,0,0.3)',
            },
        },
    },

    plugins: [forms],
};
