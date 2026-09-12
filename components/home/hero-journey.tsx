import React, { useEffect, useRef } from "react";
import { HERO_JOURNEY, HERO_JOURNEY_NEXT } from "../../constants";
import { prefersReducedMotion } from "../../utils/motion";

// Hero illustration: a dusk map of the career journey. The logo bird travels
// the trail past each checkpoint in HERO_JOURNEY (constants.ts) through
// changing scenery: rice terraces in Hanoi, a city, a harbour, a broadcast
// tower on the coast, then flies across the sea to snowy Warsaw and to Milan
// under the Alps, and on toward a foggy edge marked "Next".
//
// The scenery is generated once (seeded, so identical on every load); only the
// living details are updated per frame. The loop pauses when the hero is off
// screen or the tab is hidden, and reduced-motion visitors get a still frame.
// On phones the checkpoint card, progress ring and next label are hidden:
// at that width they are too small to read.

type Attrs = Record<string, string | number>;
type Pt = [number, number];

const NS = "http://www.w3.org/2000/svg";
const ID = "hj-"; // prefix for every defs id, so nothing collides with other inline SVGs

// Where each checkpoint sits on the map, by index into HERO_JOURNEY. The
// scenery is drawn around these spots, so a new checkpoint needs a spot here.
const POSITIONS: Pt[] = [
	[170, 540], // Hanoi: rice terraces
	[330, 548], // Accenture: the city
	[470, 528], // Lazada: the harbour
	[612, 500], // Lazada: the harbour
	[566, 432], // Lazada: the harbour
	[250, 420], // Vero: broadcast tower on the coast
	[205, 300], // Warsaw: snowy old town
	[400, 292], // Milan: the Duomo, the Alps
];
const FLIGHT_FROM = 5; // the bird flies across the sea from this checkpoint...
const FLIGHT_TO = 6; // ...to this one
const START: Pt = [92, 562];
const SIGN: Pt = [618, 302];

const f1 = (n: number) => n.toFixed(1);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
const easeBack = (t: number) => {
	const k = clamp(t);
	const c = 1.9;
	return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
};
const clear = (el: Element) => {
	while (el.firstChild) el.removeChild(el.firstChild);
};

interface JourneyScene {
	render: (t: number) => void;
	setCompact: (compact: boolean) => void;
	rest: number;
}

function buildJourney(svg: SVGSVGElement): JourneyScene {
	const make = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Attrs = {}, parent: Element = svg): SVGElementTagNameMap[K] => {
		const e = document.createElementNS(NS, tag);
		for (const k in attrs) e.setAttribute(k, String(attrs[k]));
		parent.appendChild(e);
		return e;
	};
	const set = (e: Element, attrs: Attrs) => {
		for (const k in attrs) e.setAttribute(k, String(attrs[k]));
	};
	const group = (parent: Element = svg, attrs: Attrs = {}) => make("g", attrs, parent);

	let seed = 20110905;
	const rand = () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};

	const STOPS = HERO_JOURNEY.slice(0, POSITIONS.length).map((s, i) => ({ ...s, at: POSITIONS[i] }));

	/* ---------- defs ---------- */
	const defs = make("defs");
	const PANEL = { x: 40, y: 150, w: 680, h: 420, r: 26 };
	const RIGHT = PANEL.x + PANEL.w;
	const BOTTOM = PANEL.y + PANEL.h;
	const HZ = 234;
	// Feathered mask: the scenery dissolves into the hero's dark ground instead
	// of sitting in a hard-edged card, matching how the hero artwork has always
	// blended into the page.
	const FADE = `url(#${ID}fade)`;
	const feather = make("filter", { id: `${ID}feather`, x: "-30%", y: "-30%", width: "160%", height: "160%" }, defs);
	make("feGaussianBlur", { stdDeviation: 20 }, feather);
	const fadeMask = make("mask", { id: `${ID}fade`, maskUnits: "userSpaceOnUse", x: 0, y: 100, width: 760, height: 520 }, defs);
	make("rect", { x: PANEL.x + 24, y: PANEL.y + 20, width: PANEL.w - 48, height: PANEL.h - 40, rx: 48, fill: "#fff", filter: `url(#${ID}feather)` }, fadeMask);

	type Stop = [number, string, number?];
	const lin = (id: string, stops: Stop[], x2 = 0, y2 = 1, extra: Attrs = {}) => {
		const g = make("linearGradient", { id: ID + id, x1: 0, y1: 0, x2, y2, ...extra }, defs);
		stops.forEach(([o, c, a = 1]) => make("stop", { offset: o, "stop-color": c, "stop-opacity": a }, g));
		return `url(#${ID}${id})`;
	};
	const rad = (id: string, stops: Stop[]) => {
		const g = make("radialGradient", { id: ID + id, cx: 0.5, cy: 0.5, r: 0.5 }, defs);
		stops.forEach(([o, c, a = 1]) => make("stop", { offset: o, "stop-color": c, "stop-opacity": a }, g));
		return `url(#${ID}${id})`;
	};
	const blur = (id: string, sd: number) => {
		const f = make("filter", { id: ID + id, x: "-60%", y: "-60%", width: "220%", height: "220%" }, defs);
		make("feGaussianBlur", { stdDeviation: sd }, f);
		return `url(#${ID}${id})`;
	};
	const glowFilter = make("filter", { id: `${ID}glow`, x: "-100%", y: "-100%", width: "300%", height: "300%" }, defs);
	make("feGaussianBlur", { stdDeviation: 2.2, result: "b" }, glowFilter);
	const merge = make("feMerge", {}, glowFilter);
	make("feMergeNode", { in: "b" }, merge);
	make("feMergeNode", { in: "SourceGraphic" }, merge);
	const GLOW = `url(#${ID}glow)`;

	const SKYBAND = lin("skyband", [[0, "#0a1628"], [0.65, "#16334f"], [1, "#2d6a74"]]);
	const WARM = rad("warm", [[0, "#f0b36a", 0.5], [0.45, "#f0b36a", 0.15], [1, "#f0b36a", 0]]);
	const EUROPE = lin("europe", [[0, "#3a5a68"], [0.45, "#24504e"], [1, "#2b4f57"]], 1, 0);
	const SNOW = lin("snow", [[0, "#d7e7ee", 0.22], [0.8, "#d7e7ee", 0.12], [1, "#d7e7ee", 0]], 1, 0);
	const SEA = lin("sea", [[0, "#1d5c70"], [1, "#113649"]]);
	const ASIA = lin("asia", [[0, "#1b4b43"], [1, "#0e2c2a"]]);
	const MARBLE = lin("marble", [[0, "#f1f5f6"], [1, "#a9b5bb"]]);
	const PIN = lin("pin", [[0, "#35bdb9"], [1, "#1a6f6e"]]);
	const PIN_DIM = lin("pindim", [[0, "#2a4d63"], [1, "#1a3143"]]);
	const BEAM = lin("beam", [[0, "#cfe9e4", 0.18], [1, "#cfe9e4", 0]]);
	const FUTURE = lin("future", [[0, "#ffe3c0", 0.8], [1, "#ffe3c0", 0]], 1, 0, { gradientUnits: "userSpaceOnUse", x1: 400, x2: 720, y1: 0, y2: 0 });
	const FOG = blur("fog", 9);

	/* ---------- static scenery ---------- */
	const scene = group(svg, { mask: FADE });

	make("rect", { x: PANEL.x, y: PANEL.y, width: PANEL.w, height: HZ - PANEL.y + 4, fill: SKYBAND }, scene);
	make("ellipse", { cx: 420, cy: HZ, rx: 300, ry: 64, fill: WARM }, scene);
	const stars: Array<[SVGCircleElement, number, number]> = [];
	for (let i = 0; i < 38; i++) {
		const s = make("circle", { cx: f1(PANEL.x + 10 + rand() * (PANEL.w - 20)), cy: f1(PANEL.y + 6 + rand() * 60), r: f1(0.6 + rand()), fill: "#e6f4f1", opacity: 0.6 }, scene);
		stars.push([s, rand() * 6.28, 0.6 + rand() * 1.6]);
	}

	// horizon: low hills with church spires behind Warsaw, the Alps behind Milan
	let hills = `M${PANEL.x},${HZ + 2}`;
	for (let x = PANEL.x; x <= 390; x += 10) hills += ` L${x},${f1(HZ - 9 - 6 * Math.sin(x / 26) - 4 * Math.sin(x / 11))}`;
	hills += ` L390,${HZ + 2} Z`;
	make("path", { d: hills, fill: "#1b3c50" }, scene);
	[[118, 16], [168, 12], [312, 14]].forEach(([x, h]) =>
		make("polygon", { points: `${x - 2},${HZ - 12} ${x},${HZ - 12 - h} ${x + 2},${HZ - 12}`, fill: "#1b3c50" }, scene)
	);
	const ALPS: Pt[] = [[372, 14], [410, 40], [446, 26], [492, 60], [534, 36], [578, 68], [624, 44], [668, 58], [712, 30], [740, 20]];
	const alpsPoints = ALPS.map(([x, h], i) => `${x},${HZ - h}` + (i < ALPS.length - 1 ? ` ${(x + ALPS[i + 1][0]) / 2},${HZ - 6}` : "")).join(" ");
	make("polygon", { points: `372,${HZ + 2} ${alpsPoints} 740,${HZ + 2}`, fill: "#2b4a6c" }, scene);
	ALPS.forEach(([x, h]) => {
		if (h < 26) return;
		make("polygon", { points: `${x},${HZ - h} ${f1(x - h * 0.34)},${f1(HZ - h * 0.62)} ${f1(x - h * 0.1)},${f1(HZ - h * 0.7)} ${f1(x + h * 0.08)},${f1(HZ - h * 0.6)} ${f1(x + h * 0.3)},${f1(HZ - h * 0.66)}`, fill: "#e3eef3", opacity: 0.88 }, scene);
		make("line", { x1: x, y1: HZ - h, x2: f1(x - h * 0.55), y2: HZ - 4, stroke: "#f0b36a", "stroke-width": 1, opacity: 0.22 }, scene);
	});

	// land and sea bands: Europe (back), the sea, Asia (front)
	const europeEdge = (x: number) => 318 - (x - PANEL.x) * 0.022 + 3 * Math.sin(x / 37);
	const asiaEdge = (x: number) => 376 - (x - PANEL.x) * 0.03 + 4 * Math.sin(x / 29 + 1);
	const band = (topFn: (x: number) => number, bottomFn: (x: number) => number, fill: string, x0 = PANEL.x - 4, x1 = RIGHT + 4, parent: Element = scene) => {
		const top: string[] = [];
		const bottom: string[] = [];
		for (let x = x0; x <= x1; x += 8) {
			top.push(`${x},${f1(topFn(x))}`);
			bottom.unshift(`${x},${f1(bottomFn(x))}`);
		}
		return make("polygon", { points: [...top, ...bottom].join(" "), fill }, parent);
	};
	band(() => HZ, europeEdge, EUROPE);
	band(() => HZ, europeEdge, SNOW, PANEL.x - 4, 360);
	band(europeEdge, asiaEdge, SEA);
	band(asiaEdge, () => BOTTOM + 4, ASIA);

	for (let i = 0; i < 7; i++) {
		const y = 314 + i * 7;
		const w = 30 - i * 2 + rand() * 10;
		make("line", { x1: f1(420 - w / 2), y1: y, x2: f1(420 + w / 2), y2: y, stroke: "#f0b36a", "stroke-width": 1.4, opacity: f1(0.42 - i * 0.04), "stroke-linecap": "round" }, scene);
	}
	for (let i = 0; i < 22; i++) {
		const x = PANEL.x + 20 + rand() * (PANEL.w - 40);
		const y = europeEdge(x) + 8 + rand() * (asiaEdge(x) - europeEdge(x) - 16);
		make("path", { d: `M${f1(x)},${f1(y)} q3,-2 6,0 q3,2 6,0`, fill: "none", stroke: "#7fc3c9", "stroke-width": 1, opacity: 0.22 }, scene);
	}
	const edgeLine = (fn: (x: number) => number) => Array.from({ length: 86 }, (_, i) => `${PANEL.x + i * 8},${f1(fn(PANEL.x + i * 8))}`).join(" ");
	make("polyline", { points: edgeLine(asiaEdge), fill: "none", stroke: "#d9c9a0", "stroke-width": 2.4, opacity: 0.28 }, scene);
	make("polyline", { points: edgeLine(europeEdge), fill: "none", stroke: "#dbe8ee", "stroke-width": 1.6, opacity: 0.3 }, scene);

	const pine = (g: Element, x: number, y: number, h: number) => {
		const w = h * 0.52;
		make("polygon", { points: `${f1(x)},${f1(y - h)} ${f1(x - w / 2)},${f1(y)} ${f1(x + w / 2)},${f1(y)}`, fill: "#1b3a44" }, g);
		make("polygon", { points: `${f1(x)},${f1(y - h)} ${f1(x - w / 2)},${f1(y)} ${f1(x)},${f1(y)}`, fill: "#2a5360" }, g);
		make("polygon", { points: `${f1(x)},${f1(y - h)} ${f1(x - w * 0.2)},${f1(y - h * 0.6)} ${f1(x)},${f1(y - h * 0.66)} ${f1(x + w * 0.2)},${f1(y - h * 0.6)}`, fill: "#eaf3f6", opacity: 0.9 }, g);
	};

	/* ----- Europe: Warsaw ----- */
	const eu = group(scene);
	for (let i = 0; i < 34; i++) {
		const x = PANEL.x + 12 + rand() * 300;
		const y = HZ + 12 + rand() * (europeEdge(x) - HZ - 16);
		if ((x > 182 && x < 228 && y > 262) || (x > 234 && x < 280) || (x > 84 && x < 176 && y > 280)) continue;
		pine(eu, x, y, 9 + rand() * 8);
	}
	["#c98a6a", "#d9b36a", "#8fb3a8", "#c7806e", "#e0c27a"].forEach((col, i) => {
		const x = 92 + i * 16;
		const base = 308;
		make("rect", { x, y: base - 16, width: 14, height: 16, fill: col }, eu);
		make("polygon", { points: `${x - 1},${base - 16} ${x + 7},${base - 26} ${x + 15},${base - 16}`, fill: i % 2 ? "#6b3c34" : "#4e4466" }, eu);
		make("polyline", { points: `${x},${base - 17} ${x + 7},${base - 25} ${x + 14},${base - 17}`, fill: "none", stroke: "#f2f7f9", "stroke-width": 1.4, opacity: 0.85 }, eu);
		make("rect", { x: x + 5, y: base - 11, width: 4, height: 4, fill: "#ffd98a", filter: GLOW }, eu);
	});
	// Palace of Culture and Science
	([[241, 288, 30, 16, "#4a6a88"], [247, 270, 18, 18, "#58799a"], [251, 252, 10, 18, "#6a8aac"]] as Array<[number, number, number, number, string]>).forEach(([x, y, w, h, c]) => {
		make("rect", { x, y, width: w, height: h, fill: c }, eu);
		make("line", { x1: x, y1: y, x2: x + w, y2: y, stroke: "#f2f7f9", "stroke-width": 1.4, opacity: 0.75 }, eu);
		for (let r = 0; r < Math.floor(h / 5); r++) {
			for (let k = 0; k < Math.floor(w / 5); k++) {
				if (rand() < 0.55) make("rect", { x: x + 2 + k * 5, y: y + 3 + r * 5, width: 1.6, height: 1.6, fill: "#ffd98a", opacity: 0.85 }, eu);
			}
		}
	});
	make("line", { x1: 256, y1: 252, x2: 256, y2: 234, stroke: "#9fbcd2", "stroke-width": 1.6 }, eu);

	/* ----- Europe: Milan ----- */
	const it = group(scene);
	[366, 378, 548, 560, 572].forEach((x, i) => {
		const base = europeEdge(x) - 6;
		make("ellipse", { cx: x, cy: f1(base - 10), rx: 3.2, ry: 11, fill: i % 2 ? "#1d4538" : "#16362f" }, it);
	});
	make("rect", { x: 436, y: 276, width: 68, height: 24, fill: MARBLE }, it);
	for (let i = 0; i < 11; i++) {
		const x = 438 + i * 6.4;
		const h = i === 5 ? 30 : 10 + ((i * 7) % 3) * 4;
		make("polygon", { points: `${f1(x - 1.7)},276 ${f1(x)},${276 - h} ${f1(x + 1.7)},276`, fill: "#e3eaed" }, it);
	}
	make("circle", { cx: 470, cy: 244, r: 1.8, fill: "#f0c36a", filter: GLOW }, it);
	make("circle", { cx: 470, cy: 283, r: 3.2, fill: "#f0b36a", opacity: 0.85 }, it);
	[[451, 290, 6, 10], [467, 288, 6, 12], [483, 290, 6, 10]].forEach(([x, y, w, h]) => make("rect", { x, y, width: w, height: h, rx: 3, fill: "#3b3f4a" }, it));
	for (let i = 0; i < 9; i++) make("circle", { cx: 420 + i * 12, cy: 305, r: 1.3, fill: "#ffd98a", opacity: 0.8 }, it);

	/* ----- the edge of the map: fog ----- */
	[[640, 270, 70, 18], [690, 300, 60, 16], [620, 312, 50, 12]].forEach(([cx, cy, rx, ry]) => make("ellipse", { cx, cy, rx, ry, fill: "#cfe3e6", opacity: 0.14, filter: FOG }, scene));

	/* ----- Asia: Hanoi ----- */
	const vn = group(scene);
	const TERRACE = ["#2c6b52", "#377d5e", "#2a5f4c"];
	// the terraces fade out to the east rather than stopping at a hard edge
	const terraceGrad = make("linearGradient", { id: `${ID}terrace-grad`, gradientUnits: "userSpaceOnUse", x1: 176, y1: 0, x2: 256, y2: 0 }, defs);
	make("stop", { offset: 0, "stop-color": "#fff" }, terraceGrad);
	make("stop", { offset: 1, "stop-color": "#000" }, terraceGrad);
	const terraceMask = make("mask", { id: `${ID}terrace-fade`, maskUnits: "userSpaceOnUse", x: 0, y: 400, width: 320, height: 200 }, defs);
	make("rect", { x: 0, y: 400, width: 320, height: 200, fill: `url(#${ID}terrace-grad)` }, terraceMask);
	const terraces = group(vn, { mask: `url(#${ID}terrace-fade)` });
	for (let k = 0; k < 7; k++) {
		const top: string[] = [];
		const bottom: string[] = [];
		for (let x = PANEL.x - 4; x <= 262; x += 6) {
			top.push(`${x},${f1(446 + k * 18 + 6 * Math.sin(x / 28 + k * 0.7))}`);
			bottom.unshift(`${x},${f1(446 + (k + 1) * 18 + 6 * Math.sin(x / 28 + (k + 1) * 0.7))}`);
		}
		make("polygon", { points: [...top, ...bottom].join(" "), fill: TERRACE[k % 3] }, terraces);
		make("polyline", { points: top.join(" "), fill: "none", stroke: "#9ae6b8", "stroke-width": 1, opacity: 0.3 }, terraces);
	}
	[[52, 452, 44], [74, 460, 58], [98, 446, 36]].forEach(([x, base, h]) => {
		make("path", { d: `M${x - 13},${base} C${x - 15},${base - h * 0.6} ${x - 9},${base - h} ${x},${base - h} C${x + 9},${base - h} ${x + 15},${base - h * 0.6} ${x + 13},${base} Z`, fill: "#1d4a48" }, vn);
		make("path", { d: `M${x - 9},${base - h * 0.82} C${x - 6},${base - h * 1.02} ${x + 6},${base - h * 1.02} ${x + 9},${base - h * 0.82} C${x + 4},${base - h * 0.9} ${x - 4},${base - h * 0.9} ${x - 9},${base - h * 0.82} Z`, fill: "#3a8a5e" }, vn);
	});
	const RIVER = "M58,572 C92,532 72,502 112,474 C142,452 122,414 152,378";
	make("path", { d: RIVER, fill: "none", stroke: "#2f8a9a", "stroke-width": 9, "stroke-linecap": "round" }, vn);
	make("path", { d: RIVER, fill: "none", stroke: "#9fdfe2", "stroke-width": 1.4, opacity: 0.55, "stroke-linecap": "round" }, vn);
	const riverPath = make("path", { d: RIVER, fill: "none", stroke: "none" }, vn);
	for (let i = 0; i < 3; i++) {
		const cx = 212;
		const y = 514 - i * 10;
		const w = 26 - i * 6;
		make("rect", { x: cx - w / 2 + 3, y, width: w - 6, height: 7, fill: "#e6d6ae" }, vn);
		make("path", { d: `M${cx - w / 2 - 4},${y} Q${cx},${y - 7} ${cx + w / 2 + 4},${y} L${cx + w / 2},${y - 3} L${cx - w / 2},${y - 3} Z`, fill: "#c9603f" }, vn);
	}
	make("line", { x1: 212, y1: 490, x2: 212, y2: 482, stroke: "#e6d6ae", "stroke-width": 1.4 }, vn);
	make("path", { d: "M112,518 Q136,530 160,516", fill: "none", stroke: "#8a6a4a", "stroke-width": 1 }, vn);
	const lanterns = [0.12, 0.3, 0.5, 0.7, 0.88].map((f) =>
		make("ellipse", { cx: f1(112 + 48 * f), cy: f1(522 + 10.8 * f * (1 - f) - (f > 0.5 ? (f - 0.5) * 4 : 0)), rx: 2.6, ry: 3.4, fill: "#ff7a4c", filter: GLOW }, vn)
	);

	/* ----- Asia: the city ----- */
	const city = group(scene);
	([[282, 18, 58, "#1f4a6a"], [304, 22, 86, "#244f78"], [330, 16, 50, "#1b3a5a"], [352, 26, 104, "#2a6a8a"], [382, 18, 70, "#1f4a6a"], [404, 14, 46, "#244f78"]] as Array<[number, number, number, string]>).forEach(([x, w, h, c], i) => {
		const base = 568;
		make("rect", { x, y: base - h, width: w, height: h, fill: c }, city);
		make("rect", { x: x + w - 4, y: base - h, width: 4, height: h, fill: "#000", opacity: 0.18 }, city);
		for (let r = 0; r < Math.floor((h - 6) / 7); r++) {
			for (let k = 0; k < Math.floor((w - 4) / 5); k++) {
				if (rand() < 0.42) make("rect", { x: x + 3 + k * 5, y: base - h + 5 + r * 7, width: 2.2, height: 2.6, fill: "#f6d58a", opacity: 0.82 }, city);
			}
		}
		if (i === 3) make("line", { x1: x + w / 2, y1: base - h, x2: x + w / 2, y2: base - h - 12, stroke: "#8fa8b8", "stroke-width": 1.2 }, city);
	});
	const roofLight = make("circle", { cx: 365, cy: 452, r: 1.8, fill: "#ff6b6b", filter: GLOW }, city);

	/* ----- Asia: the harbour ----- */
	const port = group(scene);
	band(asiaEdge, (x) => asiaEdge(x) + 26, "#2b4550", 430, RIGHT + 4, port);
	make("polyline", { points: Array.from({ length: 38 }, (_, i) => `${430 + i * 8},${f1(asiaEdge(430 + i * 8))}`).join(" "), fill: "none", stroke: "#6c8c96", "stroke-width": 1.4, opacity: 0.7 }, port);
	const BOX = ["#219190", "#f0b36a", "#e07a5f", "#1f5673", "#b8e986", "#c9d3d8"];
	for (let r = 0; r < 3; r++) {
		for (let k = 0; k < 6; k++) {
			const x = 446 + k * 14 + r * 3;
			const y = 396 + r * 8;
			make("rect", { x, y, width: 13, height: 7, fill: BOX[Math.floor(rand() * BOX.length)] }, port);
			make("line", { x1: x + 4, y1: y, x2: x + 4, y2: y + 7, stroke: "#000", "stroke-width": 0.6, opacity: 0.25 }, port);
		}
	}
	[[604, 390], [668, 382]].forEach(([x, base]) => {
		make("polyline", { points: `${x - 8},${base} ${x - 6},${base - 38} ${x + 6},${base - 38} ${x + 8},${base}`, fill: "none", stroke: "#e3a24f", "stroke-width": 2 }, port);
		make("line", { x1: x - 10, y1: base - 38, x2: x - 26, y2: base - 62, stroke: "#e3a24f", "stroke-width": 2 }, port);
		make("line", { x1: x + 8, y1: base - 38, x2: x + 18, y2: base - 44, stroke: "#e3a24f", "stroke-width": 2 }, port);
	});
	make("rect", { x: 486, y: 468, width: 64, height: 28, fill: "#3a5563" }, port);
	make("polygon", { points: "482,468 518,454 554,468", fill: "#4d6b78" }, port);
	make("rect", { x: 510, y: 480, width: 16, height: 16, fill: "#1e2f37" }, port);
	[[470, 505], [480, 508], [475, 499]].forEach(([x, y]) => make("rect", { x, y, width: 9, height: 7, fill: "#c98a4c" }, port));
	[[664, 552], [700, 560]].forEach(([x, base]) => {
		make("path", { d: `M${x},${base} C${x + 3},${base - 14} ${x - 2},${base - 24} ${x + 4},${base - 34}`, fill: "none", stroke: "#5a4632", "stroke-width": 3, "stroke-linecap": "round" }, port);
		[[-16, 4], [-10, -6], [4, -8], [14, -2], [16, 8]].forEach(([dx, dy]) =>
			make("path", { d: `M${x + 4},${base - 34} Q${x + 4 + dx * 0.5},${base - 40 + dy * 0.3} ${x + 4 + dx},${base - 32 + dy}`, fill: "none", stroke: "#2f8a5a", "stroke-width": 2.6, "stroke-linecap": "round" }, port)
		);
	});

	/* ----- Asia: Vero's broadcast tower ----- */
	const vero = group(scene);
	make("polyline", { points: "274,404 282,352 290,404", fill: "none", stroke: "#8a9dab", "stroke-width": 1.6 }, vero);
	make("polyline", { points: "276,392 288,392 277,378 287,378 279,364 285,364", fill: "none", stroke: "#8a9dab", "stroke-width": 1 }, vero);
	const beacon = make("circle", { cx: 282, cy: 350, r: 2.4, fill: "#b8e986", filter: GLOW }, vero);
	make("rect", { x: 206, y: 396, width: 30, height: 18, rx: 2, fill: "#0e2a33", stroke: "#35bdb9", "stroke-width": 1 }, vero);
	[[210, 6], [216, 10], [222, 8], [228, 13]].forEach(([x, h], i) => make("rect", { x, y: 411 - h, width: 4, height: h, fill: i === 3 ? "#b8e986" : "#35bdb9" }, vero));


	/* ---------- the route ---------- */
	const smooth = (pts: Pt[]) => {
		let d = `M${pts[0][0]},${pts[0][1]}`;
		for (let i = 0; i < pts.length - 1; i++) {
			const p0 = pts[i - 1] || pts[i];
			const p1 = pts[i];
			const p2 = pts[i + 1];
			const p3 = pts[i + 2] || p2;
			d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)},${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)},${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]},${p2[1]}`;
		}
		return d;
	};
	const landA: Pt[] = [START, ...STOPS.slice(0, FLIGHT_FROM + 1).map((s) => s.at)];
	const landB: Pt[] = STOPS.slice(FLIGHT_TO).map((s) => s.at);
	const from = STOPS[FLIGHT_FROM].at;
	const to = STOPS[FLIGHT_TO].at;
	const control = `${f1(from[0] + 70)},${f1((from[1] + to[1]) / 2 - 30)}`;
	const allD = smooth(landA) + ` Q${control} ${to[0]},${to[1]}` + smooth(landB).replace(/^M[^C]*/, " ");

	const routeG = group(svg, { mask: FADE });
	const dash: Attrs = { fill: "none", stroke: "#d6ece8", "stroke-width": 1.8, "stroke-dasharray": "5 6", opacity: 0.6, "stroke-linecap": "round" };
	make("path", { d: smooth(landA), ...dash }, routeG);
	make("path", { d: `M${from[0]},${from[1]} Q${control} ${to[0]},${to[1]}`, ...dash, "stroke-dasharray": "1.5 6", "stroke-width": 2.2, opacity: 0.75 }, routeG);
	make("path", { d: smooth(landB), ...dash }, routeG);
	const futureTrail = make("path", { d: smooth([STOPS[STOPS.length - 1].at, [510, 306], SIGN, [690, 292]]), fill: "none", stroke: FUTURE, "stroke-width": 1.8, "stroke-dasharray": "3 6", "stroke-linecap": "round" }, routeG);
	const route = make("path", { d: allD, fill: "none", stroke: "none" }, routeG);
	const walked = make("path", { d: allD, fill: "none", stroke: "#b8e986", "stroke-width": 2.2, "stroke-linecap": "round", filter: GLOW, opacity: 0.9 }, routeG);

	const L = route.getTotalLength();
	set(walked, { "stroke-dasharray": `${f1(L)} ${f1(L)}`, "stroke-dashoffset": f1(L) });
	const samples: Array<[number, number, number]> = [];
	for (let i = 0; i <= 1200; i++) {
		const p = route.getPointAtLength((L * i) / 1200);
		samples.push([p.x, p.y, (L * i) / 1200]);
	}
	const stopLen = STOPS.map((s) => {
		let best = samples[0];
		let bestDist = Infinity;
		for (const p of samples) {
			const dist = Math.hypot(p[0] - s.at[0], p[1] - s.at[1]);
			if (dist < bestDist) { bestDist = dist; best = p; }
		}
		return best[2];
	});

	// constant speed, a short stop at each checkpoint
	const SPEED = 250;
	const PAUSE = 0.32;
	const T0 = 1.0;
	const arrive: number[] = [];
	let clock = T0;
	let prev = 0;
	stopLen.forEach((len) => {
		clock += (len - prev) / SPEED;
		arrive.push(clock);
		clock += PAUSE;
		prev = len;
	});
	const T_END = clock;
	const IDLE_START = T_END + 1.4;
	const IDLE_EVERY = 2.8;
	const distanceAt = (t: number) => {
		let fromLen = 0;
		let start = T0;
		for (let k = 0; k < STOPS.length; k++) {
			if (t < arrive[k]) return fromLen + (stopLen[k] - fromLen) * clamp((t - start) / (arrive[k] - start));
			if (t < arrive[k] + PAUSE) return stopLen[k];
			fromLen = stopLen[k];
			start = arrive[k] + PAUSE;
		}
		return stopLen[STOPS.length - 1];
	};

	/* ---------- living details ---------- */
	const life = group(svg, { mask: FADE });
	const snow: Array<[SVGCircleElement, number, number, number]> = Array.from({ length: 26 }, () => [
		make("circle", { r: f1(0.7 + rand() * 0.8), fill: "#f2f8fa", opacity: 0.8 }, life),
		PANEL.x + 8 + rand() * 310,
		rand(),
		0.12 + rand() * 0.12,
	]);
	const fogs: Array<[SVGEllipseElement, number, number]> = [[600, 262, 90, 20], [676, 292, 80, 18], [640, 318, 70, 14]].map(([cx, cy, rx, ry]) => [
		make("ellipse", { rx, ry, fill: "#d9eaec", opacity: 0.16, filter: FOG }, life),
		cx,
		cy,
	]);
	const ship = group(life);
	make("polygon", { points: "-26,0 26,0 20,8 -20,8", fill: "#1b2a4a" }, ship);
	make("polygon", { points: "-24,6 24,6 20,8 -20,8", fill: "#c0392b" }, ship);
	([["#219190", -20], ["#f0b36a", -12], ["#e07a5f", -4], ["#b8e986", 4], ["#1f5673", 12]] as Array<[string, number]>).forEach(([c, x]) => make("rect", { x, y: -6, width: 7.5, height: 6, fill: c }, ship));
	make("rect", { x: 16, y: -12, width: 7, height: 12, fill: "#e6eeec" }, ship);
	const boat = group(life);
	make("path", { d: "M-8,0 Q0,5 8,0 L6,-1 L-6,-1 Z", fill: "#3a2a22" }, boat);
	make("path", { d: "M-4,-1 Q0,-6 4,-1 Z", fill: "#e0a15e" }, boat);
	const cables: Array<[SVGLineElement, SVGRectElement, number, number]> = [[578, 328], [642, 320]].map(([x, y]) => [
		make("line", { x1: x, y1: y, x2: x, y2: y + 10, stroke: "#cfd6da", "stroke-width": 0.8 }, life),
		make("rect", { width: 10, height: 6, fill: "#e07a5f" }, life),
		x,
		y,
	]);
	const rings = Array.from({ length: 3 }, () => make("circle", { cx: 282, cy: 350, fill: "none", stroke: "#57c785", "stroke-width": 1.2 }, life));
	const van = group(life);
	make("rect", { x: -7, y: -6, width: 10, height: 6, rx: 1, fill: "#eef3f2" }, van);
	make("rect", { x: 3, y: -4.5, width: 4.5, height: 4.5, rx: 1, fill: "#219190" }, van);
	make("circle", { cx: -4, cy: 0.5, r: 1.4, fill: "#11161b" }, van);
	make("circle", { cx: 4, cy: 0.5, r: 1.4, fill: "#11161b" }, van);

	/* ---------- the sign at the edge ---------- */
	const signG = group();
	make("line", { x1: SIGN[0], y1: SIGN[1], x2: SIGN[0], y2: SIGN[1] - 30, stroke: "#b9a582", "stroke-width": 2 }, signG);
	make("polygon", { points: `${SIGN[0] - 16},${SIGN[1] - 30} ${SIGN[0] + 18},${SIGN[1] - 30} ${SIGN[0] + 25},${SIGN[1] - 24} ${SIGN[0] + 18},${SIGN[1] - 18} ${SIGN[0] - 16},${SIGN[1] - 18}`, fill: "#e8d9b5" }, signG);
	make("text", { x: SIGN[0] + 2, y: SIGN[1] - 21, "text-anchor": "middle", "font-family": "Google Sans, Figtree, system-ui, sans-serif", "font-size": 8.5, "font-weight": 700, fill: "#3a2f22" }, signG).textContent = "NEXT";
	const nextPill = group(signG);
	const pillWidth = HERO_JOURNEY_NEXT.length * 6.6 + 20;
	make("rect", { x: f1(SIGN[0] - 4 - pillWidth / 2), y: SIGN[1] - 62, width: f1(pillWidth), height: 22, rx: 11, fill: "#0d1a17", stroke: "#3b6a4e" }, nextPill);
	make("text", { x: SIGN[0] - 4, y: SIGN[1] - 47, "text-anchor": "middle", "font-family": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", "font-size": 10.5, fill: "#d7f5c0" }, nextPill).textContent = HERO_JOURNEY_NEXT;

	/* ---------- checkpoint pins ---------- */
	const pinsG = group();
	const pins = STOPS.map((s) => {
		const [x, y] = s.at;
		const g = group(pinsG);
		make("rect", { x: x - 11, y: y - 40, width: 22, height: 36, fill: BEAM }, g);
		make("circle", { cx: x, cy: y, r: 6.5, fill: "#0b161c", stroke: "#cfe9e4", "stroke-width": 1.4 }, g);
		make("circle", { cx: x, cy: y, r: 2.2, fill: "#cfe9e4" }, g);
		const head = group(g);
		const halo = make("circle", { cx: x, cy: y - 42, r: 22, fill: "none", stroke: "#b8e986", "stroke-width": 2, opacity: 0 }, head);
		const body = make("path", { d: `M${x},${y - 14} L${x - 9},${y - 30} A17,17 0 1 1 ${x + 9},${y - 30} Z`, fill: PIN_DIM, stroke: "#5f8f99", "stroke-width": 1.4 }, head);
		const label = make("text", { x, y: y - 38.5, "text-anchor": "middle", "font-family": "Google Sans, Figtree, system-ui, sans-serif", "font-weight": 700, "font-size": 10.5, fill: "#d8e8e6" }, head);
		label.textContent = s.year;
		return { head, halo, body, label, x, y };
	});

	/* ---------- the traveller: the logo bird ---------- */
	const travelShadow = make("ellipse", { cx: 0, cy: 0, rx: 9.5, ry: 2.6, fill: "#000", opacity: 0.35 });
	const travelG = group();
	let facing = -1;
	const drawBird = (x: number, y: number, scale: number, flap: number, tilt: number, face: number) => {
		clear(travelG);
		const sx = face > 0 ? -scale : scale; // the logo bird faces left
		const outer = make("g", { transform: `translate(${f1(x)} ${f1(y)}) rotate(${f1(tilt)}) scale(${sx} ${scale}) translate(-32 -47)` }, travelG);
		const inner = make("g", { transform: "translate(8.6 10.4) scale(.72)" }, outer);
		make("path", { d: "M25 33 C23 22 25 12 30 4 L32 9.5 L35.5 4 L36.5 11 L40.5 7.5 L39 17 C38 24 37 30 35 34 Z", fill: "#b8e986", transform: `rotate(${f1(-flap * 16)} 32 33)` }, inner);
		make("path", { d: "M12.5 37 C13 51 28 55.5 38.5 51 L47.5 56 L52.5 51.5 L46.5 44 C44.5 34.5 34 28.5 23 27.5 Z", fill: "#fff" }, inner);
		make("path", { d: "M27 37 C30 25 38 14 50 6 L49.5 11.5 L57 7.5 L53.5 14 L61 13 L55 19.5 L61 21 L52.5 27 C48.5 32 44.5 36 40.5 40 Z", fill: "#fff", stroke: "#12151a", "stroke-width": 2.4, "stroke-linejoin": "round", transform: `rotate(${f1(-flap * 26)} 40 40)` }, inner);
		make("circle", { cx: 19, cy: 33, r: 8.5, fill: "#fff" }, inner);
		make("polygon", { points: "11.5,30.5 4.5,34 11.5,36.5", fill: "#fff" }, inner);
	};

	/* ---------- checkpoint card and progress ring ---------- */
	const card = group(svg, { opacity: 0 });
	const cardBg = make("rect", { rx: 12, fill: "#0a151b", opacity: 0.94, stroke: "#2c4b56", "stroke-width": 1 }, card);
	const cardAccent = make("rect", { width: 3, rx: 1.5, fill: "#b8e986" }, card);
	const cardTop = make("text", { "font-family": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", "font-size": 10, "letter-spacing": 0.6, fill: "#b8e986" }, card);
	const cardRole = make("text", { "font-family": "Google Sans, Figtree, system-ui, sans-serif", "font-size": 13, "font-weight": 700, fill: "#eef5f3" }, card);

	const ring = group();
	make("rect", { x: 78, y: 188, width: 150, height: 50, rx: 12, fill: "#0a151b", opacity: 0.9, stroke: "#2c4b56" }, ring);
	make("circle", { cx: 104, cy: 213, r: 15, fill: "none", stroke: "#1f3a44", "stroke-width": 4 }, ring);
	const CIRC = 2 * Math.PI * 15;
	const arc = make("circle", { cx: 104, cy: 213, r: 15, fill: "none", stroke: "#b8e986", "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": `0 ${f1(CIRC)}`, transform: "rotate(-90 104 213)" }, ring);
	const ringText = make("text", { x: 104, y: 216.5, "text-anchor": "middle", "font-family": "Google Sans, Figtree, system-ui, sans-serif", "font-size": 10, "font-weight": 700, fill: "#eef5f3" }, ring);
	make("text", { x: 128, y: 210, "font-family": "Google Sans, Figtree, system-ui, sans-serif", "font-size": 12, "font-weight": 600, fill: "#eef5f3" }, ring).textContent = "checkpoints";
	make("text", { x: 128, y: 225, "font-family": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", "font-size": 9.5, fill: "#8fa3a0" }, ring).textContent = `${STOPS[0].year} → now`;

	let compact = false;
	const setCompact = (on: boolean) => {
		compact = on;
		[card, ring, nextPill].forEach((el) => { el.style.display = on ? "none" : ""; });
	};

	/* ---------- one frame ---------- */
	const render = (t: number) => {
		stars.forEach(([s, ph, sp]) => set(s, { opacity: f1(0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * sp + ph))) }));
		snow.forEach(([c, x, ph, sp]) => {
			const k = (ph + t * sp) % 1;
			set(c, { cx: f1(x + Math.sin(t * 1.3 + ph * 9) * 3), cy: f1(HZ + 4 + k * (europeEdge(x) - HZ - 4)), opacity: f1(0.85 * Math.sin(Math.PI * k)) });
		});
		fogs.forEach(([e, cx, cy], i) => set(e, { cx: f1(cx + Math.sin(t * 0.25 + i * 2) * 14), cy: f1(cy + Math.sin(t * 0.3 + i) * 3) }));
		set(ship, { transform: `translate(${f1(600 + Math.sin(t * 0.18) * 10)} ${f1(344 + Math.sin(t * 1.2) * 1.2)})` });
		const bp = riverPath.getPointAtLength(riverPath.getTotalLength() * 0.46);
		set(boat, { transform: `translate(${f1(bp.x)} ${f1(bp.y + Math.sin(t * 1.6) * 0.8)})` });
		cables.forEach(([line, box, x, y], i) => {
			const drop = 10 + (0.5 + 0.5 * Math.sin(t * 0.8 + i * 2)) * 22;
			set(line, { y2: f1(y + drop) });
			set(box, { x: x - 5, y: f1(y + drop) });
		});
		rings.forEach((r, i) => {
			const k = (t * 0.6 + i / 3) % 1;
			set(r, { r: f1(4 + k * 26), opacity: f1((1 - k) * 0.7) });
		});
		set(beacon, { opacity: (t * 1.3) % 1 < 0.5 ? 1 : 0.25 });
		set(roofLight, { opacity: (t * 0.9) % 1 < 0.5 ? 1 : 0.2 });
		lanterns.forEach((l, i) => set(l, { opacity: f1(0.75 + 0.25 * Math.sin(t * 6 + i * 1.7)) }));
		const vanLen = stopLen[0] + (stopLen[1] - stopLen[0]) * ((t * 0.09) % 1);
		const vp = route.getPointAtLength(vanLen);
		const vq = route.getPointAtLength(vanLen + 2);
		set(van, { transform: `translate(${f1(vp.x)} ${f1(vp.y + 7)}) scale(${vq.x >= vp.x ? 1 : -1} 1)` });
		set(futureTrail, { "stroke-dashoffset": f1(-t * 10) });
		set(nextPill, { opacity: f1(easeOut((t - T_END + 0.2) / 0.8)) });

		// the bird hops on land and flies across the sea
		const d = distanceAt(t);
		const p = route.getPointAtLength(d);
		const ahead = route.getPointAtLength(Math.min(L, d + 2));
		const behind = route.getPointAtLength(Math.max(0, d - 2));
		if (Math.abs(ahead.x - behind.x) > 0.05) facing = ahead.x > behind.x ? 1 : -1;
		if (t >= T_END) facing = 1;
		const moving = t > T0 && t < T_END && !arrive.some((a) => t >= a && t < a + PAUSE);
		const flying = d > stopLen[FLIGHT_FROM] + 1 && d < stopLen[FLIGHT_TO] - 1;
		const flightK = flying ? (d - stopLen[FLIGHT_FROM]) / (stopLen[FLIGHT_TO] - stopLen[FLIGHT_FROM]) : 0;
		const lift = flying ? Math.sin(Math.PI * flightK) * 22 : moving ? Math.abs(Math.sin(t * 9)) * 7 : 0;
		const flap = flying ? 0.5 + 0.5 * Math.sin(t * 26) : moving ? 0.5 + 0.5 * Math.sin(t * 20) : t % 5 < 0.4 ? Math.sin(((t % 5) / 0.4) * Math.PI) : 0;
		set(travelShadow, { cx: f1(p.x), cy: f1(p.y + 1), rx: f1(9.5 - lift * 0.2), opacity: f1(flying ? 0.12 : 0.35 - lift * 0.02) });
		drawBird(p.x, p.y - lift, 0.5, flap, flying ? -14 * facing : moving ? 6 * facing : 0, facing);
		set(walked, { "stroke-dashoffset": f1(L - d) });

		// pins: dim until reached, pop on arrival, glow while featured
		let reached = 0;
		let current = -1;
		const idle = t >= IDLE_START;
		const featured = idle ? Math.floor((t - IDLE_START) / IDLE_EVERY) % STOPS.length : -1;
		pins.forEach((pin, i) => {
			const done = t >= arrive[i];
			if (done) { reached++; current = i; }
			const s = done ? 0.75 + 0.25 * easeBack((t - arrive[i]) / 0.45) : 0.82;
			set(pin.head, { transform: `translate(${pin.x} ${pin.y - 14}) scale(${s.toFixed(3)}) translate(${-pin.x} ${-(pin.y - 14)})` });
			set(pin.body, { fill: done ? PIN : PIN_DIM, stroke: done ? "#78e6de" : "#5f8f99" });
			set(pin.label, { fill: done ? "#ffffff" : "#b9cfcc" });
			const hot = idle ? i === featured : i === current;
			set(pin.halo, { opacity: f1(hot ? 0.55 + 0.35 * Math.sin(t * 4) : 0) });
		});
		set(arc, { "stroke-dasharray": `${f1((reached / STOPS.length) * CIRC)} ${f1(CIRC)}` });
		ringText.textContent = `${reached}/${STOPS.length}`;

		// card beside the active pin, in whichever spot covers no other pin
		const show = idle ? featured : current;
		if (compact || show < 0) {
			set(card, { opacity: 0 });
			return;
		}
		const s = STOPS[show];
		const pin = pins[show];
		cardTop.textContent = `${s.year} · ${s.place.toUpperCase()}`;
		cardRole.textContent = s.role;
		const w = Math.max(s.role.length * 6.9, (s.year.length + s.place.length + 3) * 6.6, 120) + 30;
		const spots: Pt[] = [[pin.x + 28, pin.y - 80], [pin.x - 28 - w, pin.y - 80], [pin.x - w / 2, pin.y - 122], [pin.x - w / 2, pin.y + 16]];
		let bestX = 0;
		let bestY = 0;
		let bestScore = Infinity;
		spots.forEach(([sx, sy]) => {
			const cx = clamp(sx, PANEL.x + 34, RIGHT - 34 - w);
			const cy = clamp(sy, PANEL.y + 96, BOTTOM - 70);
			const covered = pins.filter((o, j) => j !== show && o.x > cx - 22 && o.x < cx + w + 22 && o.y - 60 < cy + 46 && o.y + 8 > cy).length;
			const score = covered * 1000 + Math.abs(cx - sx) + Math.abs(cy - sy);
			if (score < bestScore) { bestScore = score; bestX = cx; bestY = cy; }
		});
		set(cardBg, { x: f1(bestX), y: f1(bestY), width: f1(w), height: 46 });
		set(cardAccent, { x: f1(bestX + 10), y: f1(bestY + 12), height: 22 });
		set(cardTop, { x: f1(bestX + 21), y: f1(bestY + 20) });
		set(cardRole, { x: f1(bestX + 21), y: f1(bestY + 36) });
		const since = idle ? (t - IDLE_START) % IDLE_EVERY : t - arrive[show];
		const fade = idle ? (since < 0.3 ? since / 0.3 : since > IDLE_EVERY - 0.3 ? (IDLE_EVERY - since) / 0.3 : 1) : clamp(since / 0.2);
		set(card, { opacity: f1(clamp(fade)) });
	};

	// Still frame for reduced motion: every checkpoint reached, the last card showing.
	const rest = IDLE_START + (STOPS.length - 1) * IDLE_EVERY + 1.2;
	return { render, setCompact, rest };
}

const HeroJourney = () => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = svgRef.current;
		if (!svg) return;
		const scene = buildJourney(svg);
		const reduce = prefersReducedMotion();

		const phone = window.matchMedia("(max-width: 767px)");
		const applyCompact = () => scene.setCompact(phone.matches);
		applyCompact();
		phone.addEventListener("change", applyCompact);

		let raf = 0;
		let last: number | null = null;
		let elapsed = 0;
		let visible = true;

		const loop = (now: number) => {
			raf = 0;
			if (last !== null) elapsed += Math.min(0.05, (now - last) / 1000);
			last = now;
			scene.render(elapsed);
			if (visible && !document.hidden) raf = requestAnimationFrame(loop);
			else last = null;
		};
		const start = () => {
			if (reduce || raf) return;
			last = null;
			raf = requestAnimationFrame(loop);
		};

		if (reduce) scene.render(scene.rest);
		else {
			scene.render(0);
			start();
		}

		// Pause while the hero is scrolled away or the tab is hidden.
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
		});
		observer.observe(svg);
		const onVisibility = () => { if (!document.hidden) start(); };
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			if (raf) cancelAnimationFrame(raf);
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			phone.removeEventListener("change", applyCompact);
			clear(svg);
		};
	}, []);

	return (
		<svg
			ref={svgRef}
			viewBox="24 136 712 470"
			className="block w-full h-auto"
			role="img"
			aria-label="A map of Alyssa's career journey: rice terraces in Hanoi, a city, a harbour, a broadcast tower on the coast, then across the sea to snowy Warsaw and Milan under the Alps. A bird travels past each checkpoint toward a foggy edge marked next, coming soon."
		/>
	);
};

export default HeroJourney;
