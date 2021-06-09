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

module.exports = { convert: convert, pretty: pretty };
