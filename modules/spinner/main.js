const random = require("../number/main");
const { setDefaults } = require("../functions");
const { validate } = require("./functions");

module.exports.spinner = (opts) => {
	opts = setDefaults(opts, "spinner");
	const { entries, returnDetails, returnEntries, construct } = opts;

	if (validate(opts)) return validate(opts);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		const deg = random.number({ min: 0, max: 359 });
		let winner;
		let detailedWinner;
		let allEntries = [];
		let allDetailedEntries = [];
		entries.forEach((entry, i) => {
			const max = Math.floor((360 / entries.length) * (i + 1));
			const min = Math.floor(max - 360 / entries.length);
			const data = max - min;
			let isWinner = false;
			const obj = { entry, min, max, deg, data, isWinner };
			if (obj.min <= deg && max > deg) {
				winner = entry;
				detailedWinner = obj;
				obj.isWinner = true;
			}
			allEntries = entries;
			allDetailedEntries.push(obj);
		});
		if (!returnEntries && !returnDetails) results.push(winner);
		else if (!returnEntries && returnDetails) results.push(detailedWinner);
		else if (returnEntries && !returnDetails) results.push(allEntries);
		else if (returnEntries && returnDetails) results.push(allDetailedEntries);
	}

	return +construct === 0 ? results[0] : results;
};
