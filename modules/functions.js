const defaults = require("./defaults");

module.exports.setDefaults = (opts, type) => {
	if (opts) {
		for (let property in defaults[type]) {
			if (opts[property] === undefined) {
				opts[property] = defaults[type][property];
			}
		}
		return opts;
	} else {
		return defaults[type];
	}
};
