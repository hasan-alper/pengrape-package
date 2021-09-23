module.exports.validate = (opts) => {
	const splits = opts.notation.split("d");
	const amounts = parseInt(splits[0] || 1);
	const sides = parseInt(splits[1] || 6);
	if (!Number.isInteger(amounts) || !Number.isInteger(sides)) throw RangeError('Invalid notation. The value should look like these: "2d10", "d6" or "12d".');
	else if (amounts <= 0) throw RangeError("Invalid amounts. The value cannot be less than one.");
	else if (sides <= 1) throw RangeError("Invalid sides. The value cannot be less than two.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
