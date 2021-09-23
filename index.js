const random = {
	number: require("./modules/number/main").number,
	color: require("./modules/color/main").color,
	palette: require("./modules/palette/main").palette,
	password: require("./modules/password/main").password,
	spinner: require("./modules/spinner/main").spinner,
	dice: require("./modules/dice/main").dice,
	text: require("./modules/text/main").text,
	date: require("./modules/date/main").date,
};

module.exports = random;
