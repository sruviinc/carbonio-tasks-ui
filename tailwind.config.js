/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			xxs: '0px',
			xs: '420px',
			sm: '720px',
			md: '1024px',
			lg: '1280px',
			xl: '1536px',
			xxl: '1920px'
		},
		extend: {}
	},

	plugins: []
};
