const random = require("../color/main");
const { setDefaults } = require("../functions");
const { analogous, monochromatic, triad, complementary, shades, validate } = require("./functions");

module.exports.palette = (opts) => {
	opts = setDefaults(opts, "palette");
	const { harmony, format, syntax, construct } = opts;

	if (validate(opts)) return validate(opts);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		const main_color = random.color({ format: "all", syntax: "all" });
		let main_hue = +main_color.list[2][0];
		let main_sat = +main_color.list[2][1];
		let main_lig = +main_color.list[2][2];
		const params = [main_hue, main_sat, main_lig, format, syntax];
		switch (harmony) {
			case "analogous":
				results.push(analogous(...params));
				break;
			case "monochromatic":
				results.push(monochromatic(...params));
				break;
			case "triad":
				results.push(triad(...params));
				break;
			case "complementary":
				results.push(complementary(...params));
				break;
			case "shades":
				results.push(shades(...params));
				break;
		}
	}

	return +construct === 0 ? results[0] : results;
};
