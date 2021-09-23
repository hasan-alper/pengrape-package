const random = require("../number/main");
const { setDefaults } = require("../functions");
const { validate } = require("./functions");

module.exports.dice = (opts) => {
	opts = setDefaults(opts, "dice");
	const { notation, construct } = opts;

	if (validate(opts)) return validate(opts);

	const splits = notation.split("d");
	const amounts = parseInt(splits[0] || 1);
	const sides = parseInt(splits[1] || 6);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		let total = 0;
		let output = [];
		let allData = {};
		for (let i = 0; i < amounts; i++) {
			const result = random.number({ min: 1, max: sides });
			total += result;
			output.push(result);
		}
		allData = { output, total };
		results.push(allData);
	}

	return +construct === 0 ? results[0] : results;
};
