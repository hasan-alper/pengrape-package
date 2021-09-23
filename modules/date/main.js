const { setDefaults } = require("../functions");
const { formatDate, pad, validate } = require("./functions");

module.exports.date = (opts) => {
	opts = setDefaults(opts, "date");
	const { dateStart, dateEnd, format, construct } = opts;

	if (validate(opts)) return validate(opts);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		dateStart[1]--;
		dateStart[2];
		dateEnd[1]--;
		dateEnd[2]++;
		const result = new Date(new Date(...dateStart).getTime() + Math.random() * (new Date(...dateEnd).getTime() - new Date(...dateStart).getTime()));
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const flags = {
			yy: result.getFullYear().toString().slice(-2),
			yyyy: result.getFullYear().toString(),
			m: (result.getMonth() + 1).toString(),
			mm: pad(result.getMonth() + 1),
			mmm: months[result.getMonth()].slice(0, 3),
			mmmm: months[result.getMonth()],
			d: result.getDate().toString(),
			dd: pad(result.getDate()),
			ddd: days[result.getDay()].slice(0, 3),
			dddd: days[result.getDay()],
		};
		results.push(formatDate(format, flags));
	}

	return +construct === 0 ? results[0] : results;
};
