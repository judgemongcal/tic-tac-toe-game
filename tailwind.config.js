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
			"navy-hover": "#21313A",
		},
		boxShadow: {
			"navy-shadow": "0px 8px 0px 0px #10212A",
			"navy-shadow-sm": "0px 4px 0px 0px #10212A",
			"silver-shadow-sm": "0px 4px 0px 0px #6B8997",
			"yellow-shadow": "0px 8px 0px 0px #CC8B13",
			"light-blue-shadow": "0px 8px 0px 0px #118C87",
		},
		width: {
			gamebox: "140px",
		},
		height: {
			gamebox: "140px",
		},
	},
	plugins: [],
};
