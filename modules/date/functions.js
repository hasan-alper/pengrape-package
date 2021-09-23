module.exports.formatDate = (format, flags) => {
	if (format.includes("yyyy")) format = format.replace("yyyy", flags.yyyy);
	else if (format.includes("yy")) format = format.replace("yy", flags.yy);
	if (format.includes("mmmm")) format = format.replace("mmmm", flags.mmmm);
	else if (format.includes("mmm")) format = format.replace("mmm", flags.mmm);
	else if (format.includes("mm")) format = format.replace("mm", flags.mm);
	else if (format.includes("m")) format = format.replace("m", flags.m);
	if (format.includes("dddd")) format = format.replace("dddd", flags.dddd);
	else if (format.includes("ddd")) format = format.replace("ddd", flags.ddd);
	else if (format.includes("dd")) format = format.replace("dd", flags.dd);
	else if (format.includes("d")) format = format.replace("d", flags.d);
	return format;
};

module.exports.pad = (x) => {
	if (x < 10) x = "0" + x;
	else x = x.toString();
	return x;
};

module.exports.validate = (opts) => {
	if (opts.dateStart[0] < 1000 || opts.dateEnd[0] < 1000) throw RangeError("Invalid year. The value cannot be less than 1000.");
	else if (opts.dateStart[0] > 3000 || opts.dateEnd[0] > 3000) throw RangeError("Invalid year. The value cannot be more than 3000.");
	else if (new Date(...opts.dateStart).getTime() > new Date(...opts.dateEnd).getTime()) throw RangeError("Invalid date. Start date must come before end date.");
	else if (typeof opts.format !== "string") throw TypeError("Invalid format, expected a string.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
