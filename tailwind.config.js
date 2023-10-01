/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./dist/*.{html,js}"],
	theme: {
		extend: {},
		fontFamily: {
			outfit: ["Outfit", "sans-serif"],
		},
		colors: {
			"dark-navy": "#1A2A33",
			"semi-dark-navy": "#1F3641",
			silver: "#A8BFC9",
			"silver-hover": "#DBE8ED",
			"light-blue": "#31C3BD",
			"light-blue-hover": "#65E9E4",
			"light-yellow": "#F2B137",
			"light-yellow-hover": "#FFC860",
		},
	},
	plugins: [],
};
