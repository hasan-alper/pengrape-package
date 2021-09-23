const { setDefaults } = require("../functions");
const { getInteger, getOdd, getEven, validate } = require("./functions");

module.exports.number = (opts) => {
	opts = setDefaults(opts, "number");
	const { min, max, type, parity, precision, construct } = opts;

	if (validate(opts)) return validate(opts);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		if (type === "integer") {
			switch (parity) {
				case "none":
					results.push(getInteger(min, max));
					break;
				case "odd":
					results.push(getOdd(min, max));
					break;
				case "even":
					results.push(getEven(min, max));
					break;
			}
		} else if (type === "decimal") {
			let num = `${getInteger(min, max)}.`;
			for (let i = 0; i < precision; i++) {
				num += Math.floor(Math.random() * 10).toString();
			}
			results.push(num);
		}
	}

	return +construct === 0 ? results[0] : results;
};
