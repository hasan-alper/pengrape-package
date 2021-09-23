module.exports.validate = (opts) => {
	const splits = opts.notation.split("d");
	const amounts = parseInt(splits[0] || 1);
	const sides = parseInt(splits[1] || 6);
	if (!Number.isInteger(amounts) || !Number.isInteger(sides)) return 'Invalid notation value. Notation value should look like these: "2d10", "d6", "12d" , "8" or "d"';
	else if (amounts <= 0) return "Invalid amounts value. Amounts value must be greater than 0.";
	else if (sides <= 1) return "Invalid sides value. Sides value must be greater than 1.";
	else if (!Number.isInteger(opts.construct)) return "Invalid construct value. Construction value must be an integer.";
	else if (opts.construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";
	else return 0;
};
