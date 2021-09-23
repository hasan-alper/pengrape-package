module.exports.validate = (opts) => {
	if (!opts.entries) return "Invalid entries value. Entries value must contain at least one entry.";
	if (!Array.isArray(opts.entries)) return "Invalid entries value. Entries value must be an array.";
	else if (!opts.entries[0]) return "Invalid entries value. Entries value must contain at least one entry.";
	else if (typeof opts.returnDetails !== "boolean") return "Invalid returnDetails value. returnDetails value must be true or false.";
	else if (typeof opts.returnEntries !== "boolean") return "Invalid returnEntries value. returnEntries value must be true or false.";
	else if (!Number.isInteger(opts.construct)) return "Invalid construct value. Construction value must be an integer.";
	else if (opts.construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";
	else return 0;
};
