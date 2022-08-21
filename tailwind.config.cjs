/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				primary: ['Poppins', 'sans-serif'],
			}
		},
	},
	plugins: [],
};
