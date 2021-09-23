const convert = {
	rgbToHex: (arr) => {
		let r = +arr[0];
		let g = +arr[1];
		let b = +arr[2];
		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);
		if (r.length == 1) r = "0" + r;
		if (g.length == 1) g = "0" + g;
		if (b.length == 1) b = "0" + b;
		return [r, g, b];
	},
	rgbToHsl: (arr) => {
		let r = arr[0];
		let g = arr[1];
		let b = arr[2];
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = Math.round(+(s * 100).toFixed(1));
		l = Math.round(+(l * 100).toFixed(1));
		return [h.toString(), s.toString(), l.toString()];
	},
	hexToRgb: (arr) => {
		return [parseInt(arr[0], 16).toString(), parseInt(arr[1], 16).toString(), parseInt(arr[2], 16).toString()];
	},
	hexToHsl: (arr) => {
		return convert.rgbToHsl(convert.hexToRgb(arr));
	},
	hslToRgb: (arr) => {
		let h = arr[0];
		let s = arr[1] / 100;
		let l = arr[2] / 100;
		let a = s * Math.min(l, 1 - l);
		let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return [Math.round(f(0) * 255).toString(), Math.round(f(8) * 255).toString(), Math.round(f(4) * 255).toString()];
	},
	hslToHex: (arr) => {
		return convert.rgbToHex(convert.hslToRgb(arr));
	},
};

const pretty = {
	rgb: (arr) => {
		return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
	},
	hex: (arr) => {
		return `#${arr[0]}${arr[1]}${arr[2]}`;
	},
	hsl: (arr) => {
		return `hsl(${arr[0]}, ${arr[1]}, ${arr[2]})`;
	},
};

const generateResults = (rst, fmt, syx) => {
	let hexCodesNormal = [];
	let rgbCodesNormal = [];
	let hslCodesNormal = [];
	let hexCodesList = [];
	let rgbCodesList = [];
	let hslCodesList = [];
	for (let i = 0; i < 5; i++) {
		hexCodesNormal.push(pretty.hex(convert.hslToHex(rst[i])));
		rgbCodesNormal.push(pretty.rgb(convert.hslToRgb(rst[i])));
		hslCodesNormal.push(pretty.hsl(rst[i]));
		hexCodesList.push(convert.hslToHex(rst[i]));
		rgbCodesList.push(convert.hslToRgb(rst[i]));
		hslCodesList.push(rst[i]);
	}
	if (syx == "normal") {
		switch (fmt) {
			case "hex":
				return hexCodesNormal;
			case "rgb":
				return rgbCodesNormal;
			case "hsl":
				return hslCodesNormal;
			case "all":
				return [hexCodesNormal, rgbCodesNormal, hslCodesNormal];
		}
	} else if (syx == "list") {
		switch (fmt) {
			case "hex":
				return hexCodesList;
			case "rgb":
				return rgbCodesList;
			case "hsl":
				return hslCodesList;
			case "all":
				return [hexCodesList, rgbCodesList, hslCodesList];
		}
	} else if (syx == "all") {
		switch (fmt) {
			case "hex":
				return { normal: hexCodesNormal, list: hexCodesList };
			case "rgb":
				return { normal: rgbCodesNormal, list: rgbCodesList };
			case "hsl":
				return { normal: hslCodesNormal, list: hslCodesList };
			case "all":
				return { normal: [hexCodesNormal, rgbCodesNormal, hslCodesNormal], list: [hexCodesList, rgbCodesList, hslCodesList] };
		}
	}
};

module.exports.analogous = (h, s, l, format, syntax) => {
	if (s > 95) s -= 5;
	const hue_values = [(h + 30 + 360) % 360, (h + 15 + 360) % 360, h, (h - 15 + 360) % 360, (h - 30 + 360) % 360];
	const sat_values = [s + 5, s + 5, s, s + 5, s + 5];
	const lig_values = [50, 48, 52, 48, 50];
	let result = [];
	for (let i = 0; i < 5; i++) {
		result.push([hue_values[i], sat_values[i], lig_values[i]]);
	}
	return generateResults(result, format, syntax);
};

module.exports.monochromatic = (h, s, l, format, syntax) => {
	const hue_values = [h, h, h, h, h];
	let sat_values = [];
	if (s > 40) sat_values = [s, s - 30, s, s - 30, s];
	else sat_values = [s, s + 30, s, s + 30, s];
	const lig_values = [22, 49, 47, 22, 38];
	let result = [];
	for (let i = 0; i < 5; i++) {
		result.push([hue_values[i], sat_values[i], lig_values[i]]);
	}
	return generateResults(result, format, syntax);
};

module.exports.triad = (h, s, l, format, syntax) => {
	if (s > 90) s -= 10;
	const hue_values = [h, (h + 120 + 360) % 360, h, (h - 120 + 360) % 360, (h - 120 + 360) % 360];
	const sat_values = [s + 10, s + 10, s, s + 10, s + 5];
	const lig_values = [32, 46, 46, 46, 32];

	let result = [];
	for (let i = 0; i < 5; i++) {
		result.push([hue_values[i], sat_values[i], lig_values[i]]);
	}
	return generateResults(result, format, syntax);
};

module.exports.complementary = (h, s, l, format, syntax) => {
	if (s > 90) s -= 10;
	else if (s < 10) s += 30;
	const hue_values = [h, h, h, (h + 180 + 360) % 360, (h + 180 + 360) % 360];
	const sat_values = [s + 10, s - 10, s, s + 10, s];
	const lig_values = [35, 50, 50, 35, 50];
	let result = [];
	for (let i = 0; i < 5; i++) {
		result.push([hue_values[i], sat_values[i], lig_values[i]]);
	}
	return generateResults(result, format, syntax);
};

module.exports.shades = (h, s, l, format, syntax) => {
	const hue_values = [h, h, h, h, h];
	const sat_values = [s, s, s, s, s];
	const lig_values = [34, 22, 47, 50, 42];
	let result = [];
	for (let i = 0; i < 5; i++) {
		result.push([hue_values[i], sat_values[i], lig_values[i]]);
	}
	return generateResults(result, format, syntax);
};

module.exports.validate = (opts) => {
	if (!["analogous", "monochromatic", "triad", "complementary", "shades"].includes(opts.harmony)) throw RangeError('Invalid format. The value must be an "analogous", "monochromatic", "triad", "complementary" or "shades".');
	else if (!["hex", "rgb", "hsl", "all"].includes(opts.format)) throw RangeError('Invalid format. The value must be a "hex", "rgb", “hsl” or "all".');
	else if (!["normal", "list", "all"].includes(opts.syntax)) throw RangeError('Invalid syntax. The value must be a "normal", "list" or "all".');
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
