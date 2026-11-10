// Content for the blog post at /notebook/how-to-fix-a-spaghetti-chart/.
//
// The prose lives in the page itself (a short read); this file holds the
// metadata, the five fixes and the download.

export const SPAGHETTI_META = {
	title: "How Do You Fix a Spaghetti Chart?",
	slug: "how-to-fix-a-spaghetti-chart",
	description:
		"A client's revenue chart had 18 lines. The usual fix is a filter, but the right fix depends on the questions the chart has to answer. Five ways to redraw it, what each one reveals or hides, and a free Power BI file to try it on your own data.",
	lede: "A client asked me to “clean up” their revenue chart. It had 18 lines on it: 3 sales channels × 6 regions.",
	date: "Nov 2026",
	readTime: "3 min read",
	/** 16:9 link-preview image in public/notebook/. */
	image: "/notebook/how-to-fix-a-spaghetti-chart.png",
	imageAlt:
		"How do you fix a spaghetti chart? An 18-line chart on the left and five ways to redraw it on the right: a filter, top 5 plus others, highlight one, and two small-multiples layouts.",
	/** The animated version shown in the article. */
	gif: "/notebook/how-to-fix-a-spaghetti-chart.gif",
};

export const SPAGHETTI_QUESTIONS = [
	"Which region sold the most online?",
	"Is in-store declining anywhere?",
	"What's the top channel in each region?",
];

export interface ISpaghettiFix {
	name: string;
	insight: string;
	/** The two fixes that were shipped. */
	shipped?: boolean;
}

export const SPAGHETTI_FIXES: ISpaghettiFix[] = [
	{
		name: "Interactive filter",
		insight:
			"Looks the cleanest, but you only ever see one region. To spot that West leads online, you'd click through all six and remember every line.",
	},
	{
		name: "Top 5 + “Others”",
		insight:
			"The leaders stand out, with Online West at #1. But a warning sign disappears: in-store fell 36% in North and 43% in West, and both lines are buried in “Others”.",
	},
	{
		name: "Highlight one",
		insight:
			"Online West jumps out, peaking near $58K in November. But you can only highlight a story you already know.",
	},
	{
		name: "Small multiples by channel",
		insight: "Online, West is clearly ahead. In-store, North and West are both sliding.",
		shipped: true,
	},
	{
		name: "Small multiples by region",
		insight:
			"Every region has its own winner: online leads in North, West and Int'l; in-store still leads in South, East and Central.",
		shipped: true,
	},
];

export const SPAGHETTI_DOWNLOAD = {
	/** Served from public/downloads/. */
	href: "/downloads/spaghetti-chart-powerbi.zip",
	fileName: "spaghetti-chart-powerbi.zip",
	size: "37 KB",
	github: "https://github.com/alyssahoang/powerbi-best-practices/tree/main/01-spaghetti-chart",
	contents: [
		"Two report pages: the 18-line “before” chart, and the five fixes",
		"Sample data (illustrative), plus the script that generates it",
		"Settings to point it at your own CSV: date, two groupings and a value",
		"A README with step-by-step instructions",
	],
};
