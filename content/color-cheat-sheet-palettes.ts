// Palette tables for the colour cheat sheet, transcribed from the original
// standalone HTML sheet (01_Design Template/color-palette). Treated as source
// from here on — edit these values directly.
//
// Brand names are references only and the hex values are approximations
// inspired by public brand identities, NOT official brand colours. Pull real
// codes from a brand's own guidelines before using them in client work.
import { IPaletteCard } from "./color-cheat-sheet";

export const INDUSTRY_PALETTES: IPaletteCard[] = [
	{
		slug: "finance-banking",
		title: "Finance / Banking",
		tag: "Trust-first",
		brand: { name: "Chase", color: "#1F6FC4", note: "reference brand" },
		description: "Conservative, high-contrast. Red/green is entrenched — make it accessible, don't fight it.",
		watch: [
			"In Greater China, red = gains, green = losses. Opposite of Western convention.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E7F0FA", "#B3D0F0", "#6AA7E0", "#1F6FC4", "#0F3D70"] },
			{ label: "Div", hexes: ["#A83232", "#D99A9A", "#EEF1F5", "#8FBBE8", "#0F6CBD"] },
		],
	},
	{
		slug: "healthcare-life-sciences",
		title: "Healthcare / Life Sciences",
		tag: "Calm, clinical",
		brand: { name: "Cigna", color: "#00966C", note: "reference brand" },
		description: "Moderate saturation, cool hues. This audience scans under stress.",
		watch: [
			"Reserve saturated red for real clinical alerts only, or staff learn to ignore it.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E3F4EE", "#A9DCC9", "#5CBD9C", "#00966C", "#005C42"] },
			{ label: "Div", hexes: ["#C0392B", "#E6A89F", "#EEF1EE", "#8FD0B8", "#00966C"] },
		],
	},
	{
		slug: "tech-saas-b2b",
		title: "Tech / SaaS / B2B",
		tag: "Brand-forward",
		brand: { name: "Stripe", color: "#635BFF", note: "reference brand" },
		description: "Highest brand-color pressure. Use the brand hue as accent, not as the whole scale.",
		watch: [
			"One brand hue rarely yields 5–8 distinct steps. Ask for their gray scale too.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#EEEDFE", "#C6C2FB", "#9B93F7", "#635BFF", "#33299E"] },
			{ label: "Div", hexes: ["#C1401F", "#E8A893", "#F0EFF5", "#B3ACF7", "#635BFF"] },
		],
	},
	{
		slug: "retail-e-commerce",
		title: "Retail / E-commerce",
		tag: "Warm, energetic",
		brand: { name: "Target", color: "#CC0000", note: "reference brand" },
		description: "Higher saturation tolerance. Keep alert color separate from brand color.",
		watch: [
			"Keep seasonal campaign palettes out of permanent reporting.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#FBE6E6", "#F2B3B3", "#E2686A", "#CC0000", "#7A0000"] },
			{ label: "Div", hexes: ["#CC0000", "#EDA8A8", "#F2EFE8", "#9CC7A3", "#3F8556"] },
		],
	},
	{
		slug: "government-public-sector",
		title: "Government / Public Sector",
		tag: "Accessible by default",
		brand: { name: "GOV.UK", color: "#1D70B8", note: "reference brand" },
		description: "Often a legal WCAG obligation. Colorblind-safe by default, not retrofit.",
		watch: [
			"Red/blue two-category reads as partisan in US-facing work, whatever the data.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E9F1F8", "#B7D4EC", "#6FA8D8", "#1D70B8", "#0B4A7D"] },
			{ label: "Div", hexes: ["#D4351C", "#EBA392", "#F0F2F2", "#8FBFE0", "#1D70B8"] },
		],
	},
	{
		slug: "energy-sustainability",
		title: "Energy / Sustainability",
		tag: "Earned trust",
		brand: { name: "BP", color: "#4C9A2A", note: "reference brand" },
		description: "Green is overused to the point of greenwashing fatigue. Deploy it selectively.",
		watch: [
			"For emissions, state green = less in the legend. Viewers assume green = more.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#EDF5E6", "#C6E2AB", "#95C968", "#4C9A2A", "#295C14"] },
			{ label: "Div", hexes: ["#A8622B", "#DCAE8A", "#ECEEE6", "#B0D791", "#4C9A2A"] },
		],
	},
	{
		slug: "nonprofit-impact",
		title: "Nonprofit / Impact",
		tag: "Warm but credible",
		brand: { name: "UNICEF", color: "#1CABE2", note: "reference brand" },
		description: "Serves donors and funders at once. Restrained data palette, warmth from imagery.",
		watch: [
			"Funder packs get printed. Test grayscale and projection.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E6F6FB", "#A9E2F2", "#5CC4E8", "#1CABE2", "#0C5F80"] },
			{ label: "Div", hexes: ["#C66F2F", "#E8BD97", "#EEF3F5", "#9CD7EF", "#1CABE2"] },
		],
	},
	{
		slug: "luxury-fashion",
		title: "Luxury / Fashion",
		tag: "Restraint = status",
		brand: { name: "Hermès", color: "#C65D21", note: "reference brand" },
		description: "Premium comes from subtraction: fewer colors, lower saturation, more space.",
		watch: [
			"Metallics have no flat hex. A muted ochre reads richer than literal gold.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#F7EFE8", "#E5CDB5", "#D19A6B", "#C65D21", "#7A3410"] },
			{ label: "Div", hexes: ["#8A6D3B", "#C9B28C", "#F2EFEC", "#E0A77C", "#C65D21"] },
		],
	},
	{
		slug: "hospitality-travel",
		title: "Hospitality / Travel",
		tag: "Aspirational warmth",
		brand: { name: "Airbnb", color: "#FF5A5F", note: "reference brand" },
		description: "Warm brand hue, but the data (load factor, delays) is operational.",
		watch: [
			"Coral and red are near-identical when small. Pick a different alert hue.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#FDECEB", "#FBC2C0", "#F88C8B", "#FF5A5F", "#993034"] },
			{ label: "Div", hexes: ["#FF5A5F", "#F7B0AD", "#F2F0EF", "#9EC9D4", "#2D7F92"] },
		],
	},
	{
		slug: "media-streaming",
		title: "Media / Streaming",
		tag: "Dark-mode native",
		brand: { name: "Spotify", color: "#1DB954", note: "reference brand" },
		description: "Dark-first, so the palette inverts: brightest chip = high end.",
		watch: [
			"Dark-tuned palettes wash out when exported to white PDF. Build both.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#0C3A21", "#13623A", "#199E56", "#1DB954", "#7EE8A8"] },
			{ label: "Div", hexes: ["#E2434B", "#EA8B90", "#3B3B3B", "#6FD192", "#1DB954"] },
		],
	},
	{
		slug: "automotive-mobility",
		title: "Automotive / Mobility",
		tag: "Engineered precision",
		brand: { name: "BMW", color: "#0066B1", note: "reference brand" },
		description: "Technical, graphite-heavy. Color used for signal, not decoration.",
		watch: [
			"Silver/graphite brand palettes are all mid-gray. Push lightness apart hard.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E6EFF7", "#B0CDE6", "#6BA2CC", "#0066B1", "#00365E"] },
			{ label: "Div", hexes: ["#B3322B", "#DD9A94", "#ECEEF0", "#8FB9D8", "#0066B1"] },
		],
	},
	{
		slug: "food-and-beverage-qsr",
		title: "Food & Beverage / QSR",
		tag: "Appetite-forward",
		brand: { name: "McDonald's", color: "#FFC72C", note: "reference brand" },
		description: "Warm and saturated by nature — which collides with alert colors.",
		watch: [
			"Yellow blows out against white. Anchor the pale end with warm off-white.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#FFF8E0", "#FFE9A8", "#FFD463", "#FFC72C", "#8A6410"] },
			{ label: "Div", hexes: ["#DA291C", "#EB9B94", "#F5F2EA", "#FFDF8F", "#C99700"] },
		],
	},
	{
		slug: "education-edtech",
		title: "Education / EdTech",
		tag: "Non-judgmental",
		brand: { name: "Coursera", color: "#0056D2", note: "reference brand" },
		description: "Students read these as verdicts on themselves. Blue–orange beats red–green.",
		watch: [
			"Minors and parents see these. Red 'failing' fills land harder than intended.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E8F0FE", "#B3CCF7", "#6B96EC", "#0056D2", "#002C73"] },
			{ label: "Div", hexes: ["#C96A1F", "#E8B489", "#EEF1F5", "#93B8EE", "#0056D2"] },
		],
	},
	{
		slug: "professional-services",
		title: "Professional Services",
		tag: "Credible, understated",
		brand: { name: "Deloitte", color: "#86BC25", note: "reference brand" },
		description: "Deck-first. Optimize for projection and grayscale print, not screen.",
		watch: [
			"Assume a board member prints it in B&W. Test grayscale separation.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#EEF6E0", "#CDE79F", "#A6D45C", "#86BC25", "#456013"] },
			{ label: "Div", hexes: ["#9B2F2F", "#D59C9C", "#F0F1EC", "#B8DD85", "#86BC25"] },
		],
	},
	{
		slug: "telecom",
		title: "Telecom",
		tag: "High-visibility brand",
		brand: { name: "T-Mobile", color: "#E20074", note: "reference brand" },
		description: "Brand hue chosen for billboard recall, not chart legibility.",
		watch: [
			"Magenta and red look nearly identical to people with protanopia (a common form of red-green color blindness). Use amber for alerts instead.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#FDE8F3", "#F8B3D8", "#F066B0", "#E20074", "#7A0040"] },
			{ label: "Div", hexes: ["#E20074", "#F0A0C8", "#F1F0F2", "#93C4DD", "#1A6A93"] },
		],
	},
	{
		slug: "crypto-trading",
		title: "Crypto / Trading",
		tag: "Dark, fast, dense",
		brand: { name: "Coinbase", color: "#0052FF", note: "reference brand" },
		description: "Red/green even more entrenched than finance — but desaturate on dark.",
		watch: [
			"Flashing red/green cells are hostile to colorblind and motion-sensitive users.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#0A1F52", "#123A99", "#1F5CE0", "#0052FF", "#8AB0FF"] },
			{ label: "Div", hexes: ["#E05260", "#A34049", "#2A2E39", "#3F9E6A", "#4CD08A"] },
		],
	},
	{
		slug: "gaming",
		title: "Gaming",
		tag: "Saturated, expressive",
		brand: { name: "Twitch", color: "#9146FF", note: "reference brand" },
		description: "The one category where saturated-on-dark is native, not a mistake.",
		watch: [
			"Purple + blue is a near-invisible collision. Separate by lightness.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#2B1252", "#4A1F8F", "#7130D1", "#9146FF", "#C9A3FF"] },
			{ label: "Div", hexes: ["#E0574F", "#A03C38", "#35323D", "#5F9EE0", "#9146FF"] },
		],
	},
	{
		slug: "real-estate-proptech",
		title: "Real Estate / PropTech",
		tag: "Map-heavy",
		brand: { name: "Zillow", color: "#006AFF", note: "reference brand" },
		description: "Choropleths — maps shaded by value — lean on color as the whole encoding, with no position cue to fall back on.",
		watch: [
			"The basemap is part of your palette. Mute roads, water and terrain hard.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#E8F0FF", "#B3CDFF", "#6B9AFF", "#006AFF", "#003A8C"] },
			{ label: "Div", hexes: ["#C44536", "#E3A094", "#EFF1F4", "#93B8F2", "#006AFF"] },
		],
	},
	{
		slug: "beauty-cosmetics",
		title: "Beauty / Cosmetics",
		tag: "Soft, tonal",
		brand: { name: "Glossier", color: "#C9788C", note: "reference brand" },
		description: "Entire brand palette lives in a narrow light band. Hardest to chart.",
		watch: [
			"No dark values = no usable ramp. Negotiate one deep anchor tone early.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#FDF1F3", "#F6D3DA", "#E5A3B1", "#C9788C", "#7D3F50"] },
			{ label: "Div", hexes: ["#C9788C", "#E8BCC5", "#F4F2F0", "#B8CCC0", "#5F8C74"] },
		],
	},
];

export const MOOD_PALETTES: IPaletteCard[] = [
	{
		slug: "fancy-high-class",
		title: "Fancy / high-class",
		description: "Premium = subtraction, not addition.",
		how: "Saturation 15–35% (HSL). Near-black such as #1a1a1a rather than pure #000. One accent hue, neutrals do the rest. Hairline gridlines, wide margins. No gradients or shadows — heavy ink reads cheap.",
		ramps: [
			{ label: "Seq", hexes: ["#F5F2EE", "#DDD3C6", "#B8A68F", "#8A7355", "#3D3125"] },
			{ label: "Div", hexes: ["#8A5F3D", "#C9AB8F", "#F0EEEA", "#9AA898", "#4A5C46"] },
		],
	},
	{
		slug: "trustworthy-institutional",
		title: "Trustworthy / institutional",
		description: "Competent and unexcitable. Safe, rarely memorable.",
		how: "Mid-to-deep blue anchor, saturation 40–60% (HSL). Cool grays for all secondary elements. Warm hues only as a diverging counterpoint.",
		ramps: [
			{ label: "Seq", hexes: ["#EAF0F7", "#C0D3E8", "#7FA3C9", "#3D6A99", "#183C5E"] },
			{ label: "Div", hexes: ["#9E4A3C", "#D3A096", "#EEF0F2", "#9AB7D1", "#3D6A99"] },
		],
	},
	{
		slug: "energetic-youthful",
		title: "Energetic / youthful",
		description: "High contrast, unexpected pairings. Fatigues fast on dense data.",
		how: "Saturation 70–90% (HSL) on one or two elements only — energy comes from contrast against neutrals. Pair warm and cool at matched lightness.",
		ramps: [
			{ label: "Seq", hexes: ["#FFF0E6", "#FFCBA3", "#FF9A52", "#F2660A", "#8F3800"] },
			{ label: "Div", hexes: ["#F2660A", "#F7B183", "#F4F4F5", "#8FD0E8", "#1690BA"] },
		],
	},
	{
		slug: "calm-minimal",
		title: "Calm / minimal",
		description: "Near-monochrome. Unhurried. Risky for dense data.",
		how: "One hue family, vary lightness only. Saturation under 30% (HSL). Off-white rather than pure white. Failure mode is insufficient contrast — check the contrast between your lightest and darkest steps (WCAG AA wants 4.5:1 for normal text).",
		ramps: [
			{ label: "Seq", hexes: ["#F2F4F3", "#D7DEDC", "#ADBAB7", "#7D8F8B", "#485754"] },
			{ label: "Div", hexes: ["#A08267", "#CDBAA8", "#F0F1F0", "#ADBAB7", "#65807B"] },
		],
	},
	{
		slug: "warm-human",
		title: "Warm / human",
		description: "Earthy and handmade rather than corporate.",
		how: "Shift every hue toward yellow/orange, including neutrals (warm grays). Saturation 35–55% (HSL). Terracotta against sage for diverging.",
		ramps: [
			{ label: "Seq", hexes: ["#FAF0E8", "#ECCDB4", "#D69F74", "#B56F3D", "#6B3D1C"] },
			{ label: "Div", hexes: ["#B56F3D", "#DDAC85", "#F2EFEB", "#A3B898", "#5C7A54"] },
		],
	},
	{
		slug: "bold-disruptive",
		title: "Bold / disruptive",
		description: "Deliberately uncomfortable. Reads as confident, but it won’t land with every audience — check the room first.",
		how: "Break one convention, not three. Full-strength hue against near-black or off-white, no midtones. A second bold hue cancels the first.",
		ramps: [
			{ label: "Seq", hexes: ["#FFE8EC", "#FFA8B8", "#FF4D6D", "#D90429", "#6B0114"] },
			{ label: "Div", hexes: ["#D90429", "#F08A9A", "#1C1C1E", "#7FD4C1", "#06B89B"] },
		],
	},
	{
		slug: "playful-approachable",
		title: "Playful / approachable",
		description: "Multi-hue and friendly. Breaks when you need order.",
		how: "4–6 hues at matched lightness — that's what makes multi-hue read friendly not noisy. Build ramps from one hue kept outside the categorical set.",
		ramps: [
			{ label: "Seq", hexes: ["#EAF7F5", "#B8E8E0", "#79D2C4", "#3AAB99", "#1D6157"] },
			{ label: "Div", hexes: ["#E8836A", "#F2B8A8", "#F5F3EF", "#9FDCD1", "#3AAB99"] },
		],
	},
	{
		slug: "technical-precise",
		title: "Technical / precise",
		tag: "Dark by default",
		description: "Engineering and observability register. Dark, because the tooling this audience lives in is dark.",
		how: "Canvas #12151a–#1c2028, never pure black. Gridlines at 6–10% white opacity, axes 35–45%, labels around 70%. Saturation reads ~15–20% hotter on dark — pull every hue back. One exception: academic papers, print and LaTeX still assume a light background.",
		watch: [
			"Viridis (the standard perceptually uniform ramp, built into Python, R and most tools) is designed for light backgrounds — its dark purple end, #440154, all but disappears on a near-black canvas. Lift the ramp or swap it.",
		],
		ramps: [
			{ label: "Seq", hexes: ["#1B2A4A", "#1F5673", "#219190", "#57C785", "#B8E986"] },
			{ label: "Div", hexes: ["#FF6B6B", "#B04A52", "#2A2F38", "#4A9E8F", "#5FD9C0"] },
			{ label: "UI", hexes: ["#12151A", "#1C2028", "#2B3340", "#5A6472", "#C3CAD4"] },
			{ label: "Print", hexes: ["#440154", "#3B528B", "#21918C", "#5EC962", "#FDE725"] },
		],
		dark: true,
	},
];
