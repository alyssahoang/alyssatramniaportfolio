import React from "react";

// The "in use" preview: a 3-panel dashboard mock-up drawn from the card's own
// ramps — a KPI panel with a trend line, a bar chart down the sequential ramp,
// and a small heatmap across the diverging ramp.
//
// The original sheet hand-authored one SVG per palette; parameterising it means
// a new palette gets its preview for free, and the mock-up can never drift out
// of sync with the swatches above it.
//
// The canvas stays LIGHT on a dark page (unless a card asks for dark). It is a
// picture of a dashboard, so inverting it would misrepresent how the palette
// actually behaves in Power BI or Tableau.

const CHROME = {
	light: {
		card: "#ffffff",
		edge: "#e4e7eb",
		panel: "#f7f8fa",
		muted: "#c2c8d0",
		axis: "#dfe3e8",
	},
	dark: {
		card: "#12151a",
		edge: "#2b3340",
		panel: "#1a1f27",
		muted: "#3d4654",
		axis: "#2b3340",
	},
};

// Bar heights, bottom-aligned on the baseline at y=58.
const BARS = [14, 22, 18, 28, 24, 33];

const MiniDashboard = ({
	seq,
	div,
	dark = false,
	className = "",
}: {
	seq: string[];
	div?: string[];
	dark?: boolean;
	className?: string;
}) => {
	const c = dark ? CHROME.dark : CHROME.light;
	// Tolerate ramps of any length: clamp instead of assuming five entries.
	const at = (ramp: string[], i: number) =>
		ramp[Math.min(i, ramp.length - 1)] ?? c.muted;
	const heat = div && div.length ? div : seq;

	return (
		<svg
			viewBox="0 0 264 70"
			className={`w-full h-auto ${className}`}
			role="img"
			aria-label="Sample dashboard using this palette"
		>
			<rect width="264" height="70" rx="5" fill={c.card} stroke={c.edge} />

			{/* KPI + trend */}
			<rect x="6" y="6" width="80" height="58" rx="3" fill={c.panel} />
			<rect x="12" y="12" width="30" height="4" rx="2" fill={c.muted} />
			<rect x="12" y="20" width="46" height="9" rx="2" fill={at(seq, 4)} />
			<path
				d="M8,52 L18,46 L28,49 L38,38 L48,42 L58,31 L68,34 L78,24"
				fill="none"
				stroke={at(seq, 3)}
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			{/* Bars down the sequential ramp */}
			<rect x="96" y="6" width="88" height="58" rx="3" fill={c.panel} />
			<rect x="102" y="12" width="26" height="4" rx="2" fill={c.muted} />
			<line x1="102" y1="58" x2="178" y2="58" stroke={c.axis} strokeWidth="1" />
			{BARS.map((h, i) => (
				<rect
					key={i}
					x={104 + i * 13}
					y={58 - h}
					width="9"
					height={h}
					rx="1.5"
					fill={at(seq, i)}
				/>
			))}

			{/* Heatmap across the diverging ramp */}
			<rect x="190" y="6" width="68" height="58" rx="3" fill={c.panel} />
			<rect x="196" y="12" width="22" height="4" rx="2" fill={c.muted} />
			{[0, 1].map((row) =>
				[0, 1, 2, 3].map((col) => (
					<rect
						key={`${row}-${col}`}
						x={196 + col * 16}
						y={26 + row * 14}
						width="14"
						height="12"
						rx="1.5"
						// Second row walks the ramp backwards, so the panel reads as a
						// diverging surface rather than a repeated gradient.
						fill={at(heat, row === 0 ? col : heat.length - 1 - col)}
					/>
				))
			)}
			<rect x="196" y="55" width="10" height="4" rx="2" fill={at(heat, 0)} />
			<rect
				x="210"
				y="55"
				width="10"
				height="4"
				rx="2"
				fill={at(heat, heat.length - 1)}
			/>
		</svg>
	);
};

export default MiniDashboard;
