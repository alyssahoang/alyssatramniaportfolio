import React from "react";

// The ✗ / ✓ illustrations from sections 1 and 3 of the original sheet, with
// the geometry and fills carried over exactly. Like MiniDashboard, they draw a
// light report canvas and stay light on the dark page: they picture how the
// colors behave in a real dashboard, which inverting would misrepresent.

export type Tone = "bad" | "good";

// A labelled example panel. Caption (section 1) sits inside the panel, as in
// the original; the section 3 pairs have a label only.
export const ExampleCard = ({
	tone,
	label,
	caption,
	children,
}: {
	tone: Tone;
	label: string;
	caption?: React.ReactNode;
	children: React.ReactNode;
}) => (
	<div
		className={`rounded-xl border bg-[#fcfcfd] px-3.5 pt-3 pb-3 ${
			tone === "bad" ? "border-[#f0d6d6]" : "border-[#cfe6da]"
		}`}
	>
		<span
			className={`block text-[10.5px] font-bold uppercase tracking-[0.05em] ${
				tone === "bad" ? "text-[#b03a3a]" : "text-[#1d6b4f]"
			}`}
		>
			<span aria-hidden>{tone === "bad" ? "✗ " : "✓ "}</span>
			{label}
		</span>
		<div className="mt-1.5">{children}</div>
		{caption && (
			<p className="text-[12px] text-[#5b6470] leading-snug mt-1.5 mb-0">
				{caption}
			</p>
		)}
	</div>
);

const Svg = ({
	viewBox,
	label,
	children,
}: {
	viewBox: string;
	label: string;
	children: React.ReactNode;
}) => (
	<svg viewBox={viewBox} className="w-full h-auto block" role="img" aria-label={label}>
		{children}
	</svg>
);

// Section 1 — the same six-bar chart, colored two ways.
const BAR_GEOMETRY = [
	{ x: 10, y: 34, h: 16 },
	{ x: 27, y: 24, h: 26 },
	{ x: 44, y: 29, h: 21 },
	{ x: 61, y: 17, h: 33 },
	{ x: 78, y: 22, h: 28 },
	{ x: 95, y: 12, h: 38 },
];

const SixBars = ({ fills, label }: { fills: string[]; label: string }) => (
	<Svg viewBox="0 0 120 58" label={label}>
		<line x1="8" y1="50" x2="114" y2="50" stroke="#e4e7eb" strokeWidth="1" />
		{BAR_GEOMETRY.map((b, i) => (
			<rect key={i} x={b.x} y={b.y} width="13" height={b.h} rx="1.5" fill={fills[i]} />
		))}
	</Svg>
);

export const ColorSpentOnNothing = () => (
	<SixBars
		label="Six bars, each a different hue"
		fills={["#4877c4", "#c4784b", "#5fa876", "#9a6bc4", "#c4507a", "#c9a227"]}
	/>
);

export const GrayPlusOneAccent = () => (
	<SixBars
		label="Six gray bars with one blue accent bar"
		fills={["#d3d8de", "#d3d8de", "#d3d8de", "#2f5fb3", "#d3d8de", "#d3d8de"]}
	/>
);

// Section 3, rule 1 — three dashboard panels, three bars each.
const ThreePanels = ({ panels, label }: { panels: string[][]; label: string }) => (
	<Svg viewBox="0 0 190 54" label={label}>
		{panels.map((fills, p) => {
			const x = 2 + p * 64;
			return (
				<g key={p}>
					<rect x={x} y="8" width="58" height="40" rx="3" fill="#f7f8fa" stroke="#e4e7eb" />
					<rect x={x + 6} y="14" width="22" height="3.5" rx="1.75" fill="#c2c8d0" />
					{fills.map((fill, i) => (
						<rect key={i} x={x + 6 + i * 13} y="26" width="10" height="16" rx="1.5" fill={fill} />
					))}
				</g>
			);
		})}
	</Svg>
);

// Section 3, rule 2 — five status tiles.
const Tiles = ({ fills, label }: { fills: string[]; label: string }) => (
	<Svg viewBox="0 0 124 48" label={label}>
		{fills.map((fill, i) => (
			<rect key={i} x={4 + i * 24} y="10" width="20" height="28" rx="3" fill={fill} />
		))}
	</Svg>
);

// Section 3, rule 3 — a five-entry legend: swatch + label bar.
const LEGEND_FILLS = ["#1f4c99", "#4877c4", "#7fa8e0", "#b9d1f2", "#eaf1fb"];

const Legend = ({ widths, label }: { widths: number[]; label: string }) => (
	<Svg viewBox="0 0 76 62" label={label}>
		{LEGEND_FILLS.map((fill, i) => (
			<g key={i}>
				<rect x="4" y={6 + i * 11} width="9" height="9" rx="1.5" fill={fill} />
				<rect x="18" y={9 + i * 11} width={widths[i]} height="3.5" rx="1.75" fill="#c2c8d0" />
			</g>
		))}
	</Svg>
);

export type RuleIllustration = "budget" | "scarcity" | "order";

export const RULE_ILLUSTRATIONS: Record<RuleIllustration, { bad: React.ReactNode; good: React.ReactNode }> = {
	budget: {
		bad: (
			<ThreePanels
				label="Three panels where blue marks a different thing in each"
				panels={[
					["#2f5fb3", "#2f5fb3", "#2f5fb3"],
					["#2f5fb3", "#8fb0dd", "#2f5fb3"],
					["#2f5fb3", "#2f5fb3", "#8fb0dd"],
				]}
			/>
		),
		good: (
			<ThreePanels
				label="Three panels, each using its own single hue against gray"
				panels={[
					["#2f5fb3", "#d3d8de", "#d3d8de"],
					["#d3d8de", "#c4784b", "#d3d8de"],
					["#d3d8de", "#d3d8de", "#5fa876"],
				]}
			/>
		),
	},
	scarcity: {
		bad: (
			<Tiles
				label="Five status tiles, three of them red"
				fills={["#c0392b", "#e08b7d", "#c0392b", "#e8a99e", "#c0392b"]}
			/>
		),
		good: (
			<Tiles
				label="Five status tiles, one red among neutral grays"
				fills={["#eef0f3", "#eef0f3", "#c0392b", "#eef0f3", "#eef0f3"]}
			/>
		),
	},
	order: {
		bad: (
			<Legend
				label="Legend in alphabetical order, darkest swatch on an arbitrary entry"
				widths={[26, 38, 22, 30, 34]}
			/>
		),
		good: (
			<Legend
				label="Legend ordered by size, darkest swatch on the largest entry"
				widths={[38, 34, 30, 26, 22]}
			/>
		),
	},
};
