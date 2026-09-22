import React from "react";

// Figures for /notebook/hidden-trap-of-being-data-driven/. Every number here is
// illustrative — the figure tags say so, and the disclaimer under the
// references repeats it. Colours follow the site's gray + one accent rule:
// green for the number someone wants to see, amber for the one that should
// worry them, gray for everything else.

const GREEN = "#57C785";
const AMBER = "#fbbf24";
const RED = "#F07A7A";
const LINE = "#2B3340";
const MARK = "#5A6472";
const SOFT = "#9AA3B0";
const MUTED = "#7A8494";

const Figure = ({
	tag,
	caption,
	children,
}: {
	tag: string;
	caption?: React.ReactNode;
	children: React.ReactNode;
}) => (
	<figure className="my-8">
		<div className="rounded-2xl bg-gray-800/60 border border-gray-700/60 p-4 md:p-5">
			<div className="flex justify-between gap-3 flex-wrap font-mono text-[10.5px] uppercase tracking-[0.12em] text-gray-500 mb-3">
				<span>{tag}</span>
				<span className="text-gray-600">illustrative</span>
			</div>
			{children}
		</div>
		{caption && (
			<figcaption className="text-[13.5px] text-gray-500 leading-relaxed mt-2.5">
				{caption}
			</figcaption>
		)}
	</figure>
);

// Wide SVGs keep a minimum width and scroll inside their own box on phones,
// so labels never shrink below reading size.
const Scroll = ({ min, children }: { min: number; children: React.ReactNode }) => (
	<div className="overflow-x-auto">
		<div style={{ minWidth: min }}>{children}</div>
	</div>
);

const svgText = { fontFamily: "inherit" } as const;

// 1 · Choosing the metric
export const EngagementVsConversion = () => (
	<Figure
		tag="Healthy on the dashboard, worse in the business"
		caption={<><b className="text-gray-400 font-medium">The metric can be correct and still the wrong one to watch.</b></>}
	>
		<Scroll min={440}>
			<svg viewBox="0 0 560 170" className="w-full h-auto" style={svgText} role="img" aria-label="Over six months engagement rises while conversion falls.">
				<line x1="40" y1="150" x2="440" y2="150" stroke={LINE} />
				<polyline points="40,130 120,118 200,104 280,92 360,76 440,60" fill="none" stroke={GREEN} strokeWidth="2.5" />
				<polyline points="40,60 120,66 200,78 280,88 360,100 440,112" fill="none" stroke={AMBER} strokeWidth="2.5" />
				<circle cx="440" cy="60" r="4" fill={GREEN} />
				<circle cx="440" cy="112" r="4" fill={AMBER} />
				<text x="452" y="64" fill={GREEN} fontSize="13">Engagement ↑</text>
				<text x="452" y="116" fill={AMBER} fontSize="13">Conversion ↓</text>
				<text x="40" y="166" fill={MUTED} fontSize="11.5">Launch</text>
				<text x="440" y="166" fill={MUTED} fontSize="11.5" textAnchor="middle">+6 months</text>
			</svg>
		</Scroll>
	</Figure>
);

// 2 · The hidden definition
const DEFINITIONS = [
	{ label: "Logged in at least once", value: "12,400", pct: 100 },
	{ label: "Did a key action", value: "8,100", pct: 65 },
	{ label: "Made a purchase", value: "2,300", pct: 18.5 },
];

export const ActiveUsers = () => (
	<Figure
		tag="One label, three numbers"
		caption={<><b className="text-gray-400 font-medium">Same dashboard tile, three honest answers.</b> Each team is right under its own definition.</>}
	>
		<div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
			<span className="text-[13px] uppercase tracking-[0.12em] text-gray-400">Active users · last 30 days</span>
			<span className="text-3xl font-bold text-white">?</span>
		</div>
		<div className="space-y-3">
			{DEFINITIONS.map((d, i) => (
				<div key={d.label} className="grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr_auto] gap-x-3 gap-y-1.5 items-center text-sm">
					<span className="text-gray-300">{d.label}</span>
					<span className="col-span-2 sm:col-span-1 order-3 sm:order-none h-2.5 rounded-full bg-gray-700 overflow-hidden">
						<span
							className="block h-full rounded-full"
							style={{ width: `${d.pct}%`, background: i === 0 ? GREEN : MARK }}
						/>
					</span>
					<span className="font-medium text-white tabular-nums text-right">{d.value}</span>
				</div>
			))}
		</div>
	</Figure>
);

// 3 · The query that runs
const ORDERS = [
	{ id: 101, total: 150, items: ["A", "B"] },
	{ id: 102, total: 200, items: ["C", "D", "E"] },
	{ id: 103, total: 100, items: ["F", "G"] },
];

const MiniTable = ({
	caption,
	head,
	children,
	foot,
}: {
	caption: string;
	head: React.ReactNode;
	children: React.ReactNode;
	foot?: React.ReactNode;
}) => (
	<table className="w-full border-collapse font-mono text-xs tabular-nums">
		<caption className="text-left text-[11px] text-gray-500 pb-1.5">{caption}</caption>
		<thead className="text-gray-500">{head}</thead>
		<tbody className="text-gray-300">{children}</tbody>
		{foot && <tfoot className="text-white font-bold">{foot}</tfoot>}
	</table>
);

const TD = "px-2 py-1 border-b border-gray-700/70 text-left";

export const JoinFanOut = () => (
	<Figure
		tag="The query ran. The number looked fine."
		caption={<><b className="text-gray-400 font-medium">No error, no warning.</b> Each order's total repeats once per item, so revenue comes out 2.4× too high.</>}
	>
		<div className="grid md:grid-cols-[1fr_auto_1.25fr] gap-4 items-center">
			<div className="space-y-3.5">
				<MiniTable caption="orders" head={<tr><th className={TD}>order_id</th><th className={`${TD} text-right`}>order_total</th></tr>}>
					{ORDERS.map((o) => (
						<tr key={o.id}><td className={TD}>{o.id}</td><td className={`${TD} text-right`}>${o.total}</td></tr>
					))}
				</MiniTable>
				<MiniTable caption="order_items · 7 rows" head={<tr><th className={TD}>order_id</th><th className={TD}>items</th></tr>}>
					{ORDERS.map((o) => (
						<tr key={o.id}><td className={TD}>{o.id}</td><td className={TD}>{o.items.join(", ")}</td></tr>
					))}
				</MiniTable>
			</div>
			<div aria-hidden className="text-gray-500 text-xl text-center rotate-90 md:rotate-0">→</div>
			<MiniTable
				caption="orders JOIN order_items"
				head={<tr><th className={TD}>order_id</th><th className={TD}>item</th><th className={`${TD} text-right`}>order_total</th></tr>}
				foot={<tr><td className="px-2 pt-2" colSpan={2}>SUM(order_total)</td><td className="px-2 pt-2 text-right">$1,100</td></tr>}
			>
				{ORDERS.flatMap((o) =>
					o.items.map((item, i) => (
						<tr key={item} style={i > 0 ? { color: AMBER } : undefined}>
							<td className={TD}>{o.id}</td>
							<td className={TD}>{item}</td>
							<td className={`${TD} text-right`}>${o.total}</td>
						</tr>
					))
				)}
			</MiniTable>
		</div>
		<div className="flex flex-wrap gap-5 mt-4 text-sm">
			<span>Real revenue <b className="text-lg tabular-nums" style={{ color: GREEN }}>$450</b></span>
			<span>Dashboard shows <b className="text-lg tabular-nums" style={{ color: AMBER }}>$1,100</b></span>
		</div>
	</Figure>
);

// 4 · Missing context: a drop that stays inside the normal range
export const SignalOrNoise = () => (
	<Figure
		tag="Signal or noise?"
		caption={<><b className="text-gray-400 font-medium">A big drop from an unusually good week.</b> Against the normal range, this week is ordinary.</>}
	>
		<Scroll min={520}>
			<svg viewBox="0 0 620 190" className="w-full h-auto" style={svgText} role="img" aria-label="Twelve weeks of conversion between 3.65% and 4.3%. The latest week is 15% lower than the week before but still inside the normal range.">
				<rect x="40" y="26" width="440" height="96" fill="rgba(33,145,144,0.14)" />
				<text x="46" y="42" fill={GREEN} fontSize="11.5">normal range, last 12 weeks (3.6–4.4%)</text>
				<line x1="40" y1="170" x2="480" y2="170" stroke={LINE} />
				<polyline points="40,74 80,50 120,98 160,62 200,86 240,50 280,98 320,74 360,62 400,86 440,38 480,116" fill="none" stroke={SOFT} strokeWidth="2" />
				<circle cx="480" cy="116" r="5" fill={AMBER} />
				<text x="494" y="106" fill={AMBER} fontSize="13">−15% week</text>
				<text x="494" y="122" fill={AMBER} fontSize="13">over week</text>
				<text x="494" y="140" fill={MUTED} fontSize="11.5">still inside the band</text>
				<text x="40" y="186" fill={MUTED} fontSize="11.5">Week 1</text>
				<text x="480" y="186" fill={MUTED} fontSize="11.5" textAnchor="middle">Week 12</text>
			</svg>
		</Scroll>
	</Figure>
);

// 4 · Missing context: Simpson's paradox from a traffic-mix shift
export const TrafficMix = () => (
	<Figure
		tag="Conversion fell. Every channel improved."
		caption={<><b className="text-gray-400 font-medium">Simpson's paradox.</b> Both channels converted better, but traffic moved toward the channel that converts less, so the overall rate fell.</>}
	>
		<Scroll min={520}>
			<svg viewBox="0 0 720 240" className="w-full h-auto" style={svgText} role="img" aria-label="Overall conversion falls from 4.2% to 2.9% while Search rises from 5.0% to 5.5% and Social from 1.0% to 1.2%.">
				<line x1="20" y1="190" x2="240" y2="190" stroke={LINE} />
				<line x1="290" y1="190" x2="700" y2="190" stroke={LINE} />
				<text x="20" y="20" fill={SOFT} fontSize="13">All traffic</text>
				<text x="290" y="20" fill={SOFT} fontSize="13">Split by channel</text>
				<rect x="60" y="85" width="56" height="105" rx="3" fill={MARK} />
				<rect x="140" y="117.5" width="56" height="72.5" rx="3" fill={AMBER} />
				<text x="88" y="77" fill={SOFT} fontSize="13" textAnchor="middle">4.2%</text>
				<text x="168" y="109" fill={AMBER} fontSize="13" textAnchor="middle">2.9%</text>
				<text x="88" y="210" fill={MUTED} fontSize="11.5" textAnchor="middle">Before</text>
				<text x="168" y="210" fill={MUTED} fontSize="11.5" textAnchor="middle">After</text>
				<text x="128" y="44" fill={AMBER} fontSize="11.5" textAnchor="middle">−1.3 pts</text>
				<rect x="340" y="65" width="48" height="125" rx="3" fill={MARK} />
				<rect x="396" y="52.5" width="48" height="137.5" rx="3" fill={GREEN} />
				<text x="364" y="57" fill={SOFT} fontSize="13" textAnchor="middle">5.0%</text>
				<text x="420" y="44" fill={GREEN} fontSize="13" textAnchor="middle">5.5%</text>
				<text x="392" y="210" fill={MUTED} fontSize="11.5" textAnchor="middle">Search</text>
				<rect x="530" y="165" width="48" height="25" rx="3" fill={MARK} />
				<rect x="586" y="160" width="48" height="30" rx="3" fill={GREEN} />
				<text x="554" y="157" fill={SOFT} fontSize="13" textAnchor="middle">1.0%</text>
				<text x="610" y="152" fill={GREEN} fontSize="13" textAnchor="middle">1.2%</text>
				<text x="582" y="210" fill={MUTED} fontSize="11.5" textAnchor="middle">Social</text>
				<rect x="290" y="226" width="10" height="10" rx="2" fill={MARK} />
				<text x="306" y="235" fill={MUTED} fontSize="11.5">Before</text>
				<rect x="360" y="226" width="10" height="10" rx="2" fill={GREEN} />
				<text x="376" y="235" fill={MUTED} fontSize="11.5">After</text>
			</svg>
		</Scroll>
		<div className="grid gap-1.5 mt-4 text-[12.5px]">
			{[
				{ label: "Mix before", search: 80 },
				{ label: "Mix after", search: 40 },
			].map((row) => (
				<div key={row.label} className="grid grid-cols-[5.5rem_1fr] gap-2.5 items-center">
					<span className="text-gray-400">{row.label}</span>
					<div className="flex h-4 rounded overflow-hidden text-[10.5px] font-bold leading-4">
						<span className="pl-1.5 whitespace-nowrap overflow-hidden text-gray-900" style={{ width: `${row.search}%`, background: SOFT }}>
							Search {row.search}%
						</span>
						<span className="pl-1.5 whitespace-nowrap overflow-hidden text-white" style={{ width: `${100 - row.search}%`, background: MARK }}>
							Social {100 - row.search}%
						</span>
					</div>
				</div>
			))}
		</div>
	</Figure>
);

// 5 · Confirming what we believe
const MEETING_TILES = [
	{ label: "Engagement", value: "+20%", hero: true },
	{ label: "Retention", value: "−2.1%" },
	{ label: "Support tickets", value: "+18%" },
	{ label: "Usage, Segment B", value: "−35%" },
];

export const MeetingSlide = () => (
	<Figure
		tag="Which number gets mentioned in the meeting?"
		caption={<><b className="text-gray-400 font-medium">Four numbers on the dashboard, one on the slide.</b></>}
	>
		<div className="grid md:grid-cols-[1.2fr_auto_1fr] gap-4 items-center">
			<div className="grid grid-cols-2 gap-2.5">
				{MEETING_TILES.map((t) => (
					<div
						key={t.label}
						className={`rounded-xl border px-3.5 py-3 ${t.hero ? "border-[#57C785]/55 bg-[#57C785]/10" : "border-gray-700 bg-gray-900"}`}
					>
						<div className="text-[12.5px] text-gray-400">{t.label}</div>
						<div className="text-2xl font-bold tabular-nums leading-tight" style={{ color: t.hero ? GREEN : RED }}>
							{t.value}
						</div>
					</div>
				))}
			</div>
			<div aria-hidden className="text-gray-500 text-center leading-tight">
				<span className="inline-block text-xl rotate-90 md:rotate-0">→</span>
				<span className="block text-[10.5px] uppercase tracking-widest">the slide</span>
			</div>
			<div className="rounded-xl border border-gray-700 border-t-[5px] bg-gray-900 px-4 py-4" style={{ borderTopColor: GREEN }}>
				<div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-gray-500">Launch review</div>
				<div className="font-bold text-white mt-1">The new feature is working</div>
				<div className="text-5xl font-bold leading-none mt-2" style={{ color: GREEN }}>+20%</div>
				<span className="inline-block mt-3 text-xs font-bold rounded-full px-2.5 py-1" style={{ color: GREEN, background: "rgba(87,199,133,0.12)" }}>
					✓ Hypothesis confirmed
				</span>
			</div>
		</div>
	</Figure>
);

// Five layers overview
const LAYERS = ["Selection", "Definition", "Calculation", "Context", "Interpretation"];
const LAYER_SECTIONS = ["section 1", "section 2", "section 3", "section 4", "sections 5–6"];

export const FiveLayers = () => (
	<figure className="my-8">
		<div className="rounded-2xl bg-gray-800/60 border border-gray-700/60 p-4 md:p-5">
			<div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-gray-500 mb-3">
				Five layers before a decision
			</div>
			<Scroll min={600}>
				<svg viewBox="0 0 760 110" className="w-full h-auto" style={svgText} role="img" aria-label="Selection, definition, calculation, context and interpretation lead to a decision.">
					<defs>
						<marker id="layers-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
							<path d="M0,0 L10,5 L0,10 z" fill={MARK} />
						</marker>
					</defs>
					{LAYERS.map((name, i) => {
						const x = 4 + i * 128;
						return (
							<g key={name}>
								<rect x={x} y="10" width="108" height="56" rx="10" fill="#12151A" stroke={LINE} />
								<text x={x + 54} y="43" fill="#F4F6F8" fontSize="14" fontWeight="700" textAnchor="middle">{name}</text>
								<line x1={x + 109} y1="38" x2={x + 125} y2="38" stroke={MARK} strokeWidth="1.5" markerEnd="url(#layers-arrow)" />
								<text x={x + 54} y="92" fill={MUTED} fontSize="11.5" textAnchor="middle">{LAYER_SECTIONS[i]}</text>
							</g>
						);
					})}
					<rect x="644" y="10" width="108" height="56" rx="10" fill="rgba(87,199,133,0.12)" stroke={GREEN} />
					<text x="698" y="43" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">Decision</text>
				</svg>
			</Scroll>
		</div>
	</figure>
);
