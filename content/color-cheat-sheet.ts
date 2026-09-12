// Content for the colour cheat sheet at /notebook/color-cheat-sheet/.
//
// Ported from the standalone HTML sheet in Social-Content-Sites/Colors.
// The wording is carried over as written; only the presentation changed. The
// palette tables live next door in color-cheat-sheet-palettes.ts because they
// were transcribed mechanically.

export interface IPaletteRamp {
	/** "Seq", "Div", "Qual", "UI", "Print" — the ramp's role. */
	label: string;
	/** Ordered hex values, light → dark for sequential ramps. */
	hexes: string[];
}

export interface IPaletteCard {
	slug: string;
	title: string;
	/** Short positioning label, e.g. "Trust-first". */
	tag?: string;
	/**
	 * Reference brand. The colour is an approximation inspired by a public
	 * brand identity, never an official value — see the disclaimer below.
	 */
	brand?: { name: string; color: string; note?: string };
	description: string;
	/** The settings that produce the look (mood cards). */
	how?: string;
	/** Cautions — rendered with a warning icon. */
	watch?: string[];
	ramps: IPaletteRamp[];
	/** Render the in-use preview on a dark canvas instead of a light one. */
	dark?: boolean;
}

export const CHEAT_SHEET_META = {
	title: "Color Cheat Sheet for Data Viz and Dashboard Design",
	lede: "Palettes by industry and by mood, each shown in a sample dashboard layout. Everything is copy-and-paste ready — and there's a glossary at the end if any of the vocabulary is new.",
	hint: "Click any swatch to copy its hex · click Copy to take the whole ramp",
	updated: "Sep 2026",
};

export const HOW_TO_USE = [
	"In a hurry? Jump to section 5, find something close to your client's industry, and copy the ramp. That's a perfectly good starting point.",
	"Not sure what mood you're after? Section 4 has eight, each with the settings that produce it.",
	"Want to understand the reasoning? Sections 1 and 3 are the short version of why any of this matters.",
	"Copying colors: click any swatch for that one hex, or the Copy button for the whole ramp.",
	"Industry not listed? That's fine — pick the mood that fits instead. Industry is a shortcut, not a requirement.",
	"The references in section 7 are optional. Nothing here needs them to be useful.",
];

export interface IDecisionGate {
	n: number;
	question: string;
	detail: string;
	/** The recommendation this gate leads to. */
	answer: string;
	/** Illustrated ✗ / ✓ pair under the gate; captions as written. */
	examples?: Array<{
		tone: "bad" | "good";
		label: string;
		caption: string;
		/** Italic tail of the caption, e.g. "look here". */
		emphasis?: string;
	}>;
}

export const DECISION_GATES: IDecisionGate[] = [
	{
		n: 1,
		question: "Does position already separate these?",
		detail:
			"Bar charts, columns, dot plots — the axis has already done the work. Adding a hue per category spends color on information the reader can already see.",
		answer:
			"Gray everything, one accent hue on the series you're talking about.",
		examples: [
			{
				tone: "bad",
				label: "color spent on nothing",
				caption:
					"Six hues encode what the axis already says. Color is now unavailable for anything meaningful.",
			},
			{
				tone: "good",
				label: "gray + one accent",
				caption: "Position does the separating. Color is saved to say one thing:",
				emphasis: "look here",
			},
		],
	},
	{
		n: 2,
		question: "Do the categories have an order?",
		detail:
			"Tiers, satisfaction bands, age brackets, deal stages, sizes. These look categorical but aren't.",
		answer: "Sequential. A qualitative palette here destroys the order.",
	},
	{
		n: 3,
		question: "Genuinely unordered and tracked across several charts?",
		detail:
			"The real case for categorical: EMEA must be the same blue on every chart in the dashboard so the eye can follow it.",
		answer: "Now a qualitative palette earns its place. Cap it at 5–6.",
	},
];

export const GRAY_INSIGHT =
	"Gray is an instruction, not an absence. It actively says don't look here — it isn't what's left when you run out of colors. Default every series to gray, then pay one hue to the series you're actually discussing. Reach for a full palette only when a question above forces it.";

export interface IPaletteType {
	name: string;
	label: string;
	description: string;
	hexes: string[];
}

export const PALETTE_TYPES: IPaletteType[] = [
	{
		name: "Sequential",
		label: "Seq",
		description: "Ordered continuous data. One hue, light→dark.",
		hexes: ["#EAF1FB", "#B9D1F2", "#7FA8E0", "#4877C4", "#1F4C99"],
	},
	{
		name: "Diverging",
		label: "Div",
		description: "A meaningful zero or benchmark. Two hues, neutral middle.",
		hexes: ["#B23A3A", "#E29B9B", "#ECEFF1", "#9FC2E0", "#3D7AB5"],
	},
	{
		name: "Qualitative",
		label: "last resort",
		description:
			"Only after the gate above. Unordered, cross-chart identity, 5–6 max.",
		hexes: ["#4877C4", "#C4784B", "#5FA876", "#9A6BC4", "#C4507A"],
	},
];

export const SYMPTOM_FIXES: Array<{ symptom: string; fix: string }> = [
	{
		symptom: "Legend has 8+ entries",
		fix: "Group them, split into small multiples (facets), or label the lines directly. No legend survives eight entries.",
	},
	{ symptom: "Every bar a different color", fix: "Gray + one accent." },
	{
		symptom: "Rainbow on a continuous measure",
		fix: "Use a perceptually uniform ramp (see glossary) — rainbow scales invent boundaries that aren't in the data.",
	},
	{
		symptom: "Hue used for both category and alert",
		fix: "Pick one job for hue. Shape or position takes the other.",
	},
];

export const RULES_LEDE =
	"Here's the idea underneath everything else: color is a way of directing attention, not just a way of labelling things. These three follow from that, and they're the ones that tend to surface only after a few projects.";

export interface IRule {
	title: string;
	text: string;
	doThis: string;
	/** Labels for the two mini examples. */
	bad: string;
	good: string;
	/** Which ✗ / ✓ drawing illustrates the rule (see cheat-sheet/illustrations). */
	illustration: "budget" | "scarcity" | "order";
}

export const THREE_RULES: IRule[] = [
	{
		title: "Your color budget is per dashboard, not per chart",
		text: "Viewers read the whole screen. A hue spent in one chart makes it less distinctive everywhere else. Blue used for a KPI, a category and a map ramp means nothing.",
		doThis:
			"Decide your hues once, for the whole dashboard, before you build any single chart — this hue is always region, this one is always alert. In Power BI or Tableau that means setting a theme up front rather than picking colors visual by visual.",
		bad: "blue means 3 things",
		good: "one hue, one job",
		illustration: "budget",
	},
	{
		title: "Semantic colors only work while they're scarce",
		text: "Red means something is wrong because it's rare. Three reds on a healthy dashboard and users learn to scan past it.",
		doThis:
			"On a good day, a well-built dashboard should look almost entirely neutral. If someone calls it boring when nothing is broken, that's the system working — and it's worth saying so when you hand it over.",
		bad: "red is wallpaper",
		good: "red is a signal",
		illustration: "scarcity",
	},
	{
		title: "Assignment order carries meaning you didn't intend",
		text: "The darkest, most saturated color reads as most important — whatever the data says. Alphabetical legends hand that weight to whoever starts with A.",
		doThis:
			"Assign color by importance or by data order. Try not to leave it to whatever order the tool happened to use.",
		bad: "alphabetical",
		good: "by size / importance",
		illustration: "order",
	},
];

export const FIVE_DIALS: Array<{ n: number; name: string; text: string }> = [
	{
		n: 1,
		name: "Saturation",
		text: "The biggest mood lever by far. Low reads expensive, calm, serious. High reads consumer, urgent, young.",
	},
	{
		n: 2,
		name: "Lightness spread",
		text: "Wide spread reads analytical and legible. Narrow spread reads soft, tonal, atmospheric — and charts badly.",
	},
	{
		n: 3,
		name: "Neutral temperature",
		text: "Warm grays read human and handmade. Cool grays read corporate and technical. Almost nobody touches this dial; it's strong.",
	},
	{
		n: 4,
		name: "Hue count",
		text: "One reads disciplined. Four or more reads friendly — or chaotic, depending on whether lightness is matched.",
	},
	{
		n: 5,
		name: "Hue itself",
		text: "Last, and mostly a matter of picking a convention your audience already holds. It carries less of the mood than you might expect — the dials above are doing most of the work.",
	},
];

// Section 4 opener, around the five dials above.
export const DIALS_LEDE =
	"Mood is not a hue lookup. These five dials do the work, roughly in order of impact — hue comes last.";

// Proof strips: the same blue at different saturation / neutral temperature.
// Not copyable in the original, so rendered as plain swatches.
export const DIAL_PROOF = {
	lede: "every ramp below is the same blue. Only saturation and neutral temperature change — and they land in completely different registers.",
	rows: [
		{ label: "Saturation 85%", note: "reads consumer, urgent, young", hexes: ["#CFE0FF", "#7AA9FF", "#2A6DFF", "#0B3FB8", "#06276E"] },
		{ label: "Saturation 45%", note: "reads institutional, competent", hexes: ["#E3EAF4", "#B0C5DE", "#6F90BB", "#3D6A99", "#1D3F63"] },
		{ label: "Saturation 18%", note: "reads premium, restrained", hexes: ["#EEF0F2", "#D2D7DD", "#A9B2BC", "#7A838E", "#434B55"] },
		{ label: "Warm neutrals", note: "same lightness, warmer grays", hexes: ["#F2EFEC", "#DBD5CD", "#B6ADA2", "#8A8076", "#4F473F"] },
	],
};

export const DIALS_WATCH =
	"“Luxury = brown” is really “luxury = low saturation” wearing a hue costume — brown is desaturated dark orange. Deep green or charcoal-and-bone would read just as premium.";

export const NON_NEGOTIABLES: Array<{ rule: string; why: string }> = [
	{
		rule: "Never encode meaning in color alone",
		why: "Around 8% of men have red-green color vision deficiency. Add a label, shape or position cue as well.",
	},
	{
		rule: "Perceptually uniform sequential scales",
		why: "Rainbow creates false boundaries in continuous data.",
	},
	{
		rule: "Brand color = accent, not the palette",
		why: "Brand palettes lack the perceptual steps a data scale needs.",
	},
	{
		rule: "Test grayscale + colorblind before delivery",
		why: "Five minutes. Catches nearly everything.",
	},
	{
		rule: "Check cultural associations for the real audience",
		why: "Red/green and red/blue meanings flip by region.",
	},
];

export const GLOSSARY_LEDE =
	"Plain-language versions of the terms used above. No shame in needing these — most of them are field jargon rather than anything fundamental.";

export const GLOSSARY: Array<{ term: string; definition: string }> = [
	{
		term: "Hex code",
		definition:
			"The #1F6FC4 format every tool accepts. Six characters: red, green and blue, two each.",
	},
	{
		term: "Ramp (or scale)",
		definition:
			"An ordered set of colors used together — the five swatches in each row here.",
	},
	{
		term: "Sequential (Seq)",
		definition:
			"One hue going light to dark. For data with a low-to-high order: revenue, population, age.",
	},
	{
		term: "Diverging (Div)",
		definition:
			"Two hues meeting at a neutral middle. For data with a meaningful centre: profit vs loss, above vs below target. Variance-to-target counts — zero is your middle.",
	},
	{
		term: "Qualitative (categorical)",
		definition:
			"Distinct hues at similar lightness, for categories with no order: regions, product lines.",
	},
	{
		term: "Hue, saturation, lightness (HSL)",
		definition:
			"Three ways to describe a color. Hue is which color it is; saturation is how vivid; lightness is how pale or dark. Most color pickers let you drag these separately — that's where the percentages in section 4 come from.",
	},
	{
		term: "Perceptually uniform",
		definition:
			"A ramp where equal steps in the data look like equal steps to the eye. Rainbow scales fail this, which is why they seem to show edges that aren't really there.",
	},
	{
		term: "Viridis",
		definition:
			"The best-known perceptually uniform ramp — the blue-green-yellow one. Built into Python, R, Tableau and most other tools, usually under that name.",
	},
	{
		term: "CVD (color vision deficiency)",
		definition:
			"Color blindness. The common form makes red and green hard to tell apart, and affects roughly 8% of men.",
	},
	{
		term: "WCAG",
		definition:
			"The W3C's accessibility guidelines. The part that matters here is contrast: level AA asks for 4.5:1 between text and its background.",
	},
	{
		term: "Facet / small multiples",
		definition:
			"Splitting one crowded chart into a grid of smaller ones, one per category. Often better than adding more colors.",
	},
	{
		term: "Choropleth",
		definition:
			"A map where areas are shaded by value — sales by region, for instance.",
	},
	{
		term: "Protanopia / deuteranopia",
		definition: "Specific types of red-green color blindness.",
	},
	{
		term: "Accent hue",
		definition:
			"The single color you keep in reserve to mark the thing you want noticed.",
	},
];

export const PRE_DELIVERY_CHECK =
	"Two quick checks before you deliver, both about a minute: paste a screenshot into a colorblindness simulator such as Coblis, and view the same screenshot in grayscale to see whether your categories still separate.";

export const REFERENCES_LEDE =
	"Where the ideas in this sheet come from. Nothing here is original research — it's a working synthesis, and these are the sources worth going to directly.";

export interface IReference {
	n: number;
	citation: string;
	note?: string;
	url?: string;
}

export const REFERENCE_GROUPS: Array<{ group: string; items: IReference[] }> = [
	{
		group: "Tools, palettes and standards",
		items: [
			{
				n: 1,
				citation:
					"Brewer, C. A., & Harrower, M. (2002–). ColorBrewer 2.0: Color advice for cartography. The Pennsylvania State University.",
				note: "Source of the sequential / diverging / qualitative taxonomy used in section 2.",
				url: "https://colorbrewer2.org",
			},
			{
				n: 2,
				citation:
					"Harrower, M., & Brewer, C. A. (2003). ColorBrewer.org: An online tool for selecting colour schemes for maps. The Cartographic Journal, 40(1), 27–37.",
				note: "The peer-reviewed paper behind the tool.",
			},
			{
				n: 3,
				citation: "van der Walt, S., & Smith, N. (2015). matplotlib colormaps.",
				note: "Design write-up for viridis, magma, inferno and plasma, including the perceptual-delta plots that show why jet fails.",
				url: "https://bids.github.io/colormap/",
			},
			{
				n: 4,
				citation: "Crameri, F. (2018–). Scientific colour maps.",
				note: "Perceptually uniform, CVD-safe ramps with ports for most tools.",
				url: "https://www.fabiocrameri.ch/colourmaps/",
			},
			{
				n: 5,
				citation: "Moreland, K. Color map advice for scientific visualization.",
				note: "Per-map guidance plus downloadable colour tables.",
				url: "https://www.kennethmoreland.com/color-advice/",
			},
			{
				n: 6,
				citation:
					"World Wide Web Consortium. (2025). Web Content Accessibility Guidelines (WCAG) 2.1 [W3C Recommendation].",
				note: "Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.",
				url: "https://www.w3.org/TR/WCAG21/",
			},
		],
	},
	{
		group: "Papers",
		items: [
			{
				n: 7,
				citation:
					"Crameri, F., Shephard, G. E., & Heron, P. J. (2020). The misuse of colour in science communication. Nature Communications, 11, 5444.",
				note: "The clearest modern case against rainbow and red–green maps, with practical alternatives.",
				url: "https://doi.org/10.1038/s41467-020-19160-7",
			},
			{
				n: 8,
				citation:
					"Borland, D., & Taylor, R. M. (2007). Rainbow color map (still) considered harmful. IEEE Computer Graphics and Applications, 27(2), 14–17.",
				note: "The paper that made anti-rainbow the default position.",
				url: "https://doi.org/10.1109/MCG.2007.323435",
			},
			{
				n: 9,
				citation:
					"Ware, C., Stone, M., Szafir, D. A., & Rhyne, T.-M. (2023). Rainbow colormaps are not all bad. IEEE Computer Graphics and Applications, 43(3), 88–93.",
				note: "The rebuttal. Rainbow maps test well for reading a value off a key; the critique holds for judging shape and gradient.",
				url: "https://doi.org/10.1109/MCG.2023.3246111",
			},
			{
				n: 10,
				citation:
					"Gołębiowska, I., & Çöltekin, A. (2022). What's wrong with the rainbow? An interdisciplinary review of empirical evidence for and against the rainbow color scheme in visualizations. ISPRS Journal of Photogrammetry and Remote Sensing, 194, 195–208.",
				note: "Review of evidence on both sides; concludes the answer is task-dependent.",
			},
			{
				n: 11,
				citation:
					"Olson, J. M., & Brewer, C. A. (1997). An evaluation of color selections to accommodate map users with color-vision impairments. Annals of the Association of American Geographers, 87(1), 103–134.",
				note: "Early empirical grounding for the CVD-safe palettes still in use.",
				url: "https://doi.org/10.1111/0004-5608.00043",
			},
			{
				n: 12,
				citation:
					"Rogowitz, B. E., & Treinish, L. A. (1998). Data visualization: The end of the rainbow. IEEE Spectrum, 35(12), 52–59.",
				note: "One of the earliest statements of the perceptual argument.",
				url: "https://doi.org/10.1109/6.736450",
			},
		],
	},
	{
		group: "Books",
		items: [
			{
				n: 13,
				citation:
					"Knaflic, C. N. (2015). Storytelling with data: A data visualization guide for business professionals. Wiley.",
				note: "The clearest treatment of the gray-plus-one-accent technique behind sections 1 and 3.",
			},
			{
				n: 14,
				citation:
					"Ware, C. (2021). Information visualization: Perception for design (4th ed.). Morgan Kaufmann.",
				note: "Standard reference for why lightness, not hue, carries perceptual separation.",
			},
			{
				n: 15,
				citation:
					"Tufte, E. R. (1983). The visual display of quantitative information. Graphics Press.",
				note: "Origin of the restraint argument and the data-ink ratio.",
			},
			{
				n: 16,
				citation: "Stone, M. (2003). A field guide to digital color. A K Peters.",
				note: "Colour theory written for screens rather than pigment.",
			},
			{
				n: 17,
				citation:
					"Cairo, A. (2016). The truthful art: Data, charts, and maps for communication. New Riders.",
				note: "On the ethics of encoding choices, including unintentional misleading.",
			},
			{
				n: 18,
				citation:
					"Few, S. (2013). Information dashboard design: Displaying data for at-a-glance monitoring (2nd ed.). Analytics Press.",
				note: "Dashboard-specific; source of much of the alert-scarcity thinking in section 3.",
			},
			{
				n: 19,
				citation:
					"Brewer, C. A. (2015). Designing better maps: A guide for GIS users (2nd ed.). Esri Press.",
				note: "Book-length version of the ColorBrewer reasoning.",
			},
		],
	},
];

export const DISCLAIMERS = [
	"Accessed September 2026. This sheet is a working synthesis, not original research — where a claim matters to a decision, go to the source rather than citing the sheet.",
	"Hex values are approximations inspired by public brand identities, not official values — pull real codes from brand guidelines before client delivery. Brand names are references only; no trademarked artwork is reproduced.",
];
