import React from "react";
import {
	DECISION_GATES,
	DIALS_LEDE,
	DIALS_WATCH,
	DIAL_PROOF,
	FIVE_DIALS,
	GLOSSARY,
	GLOSSARY_LEDE,
	GRAY_INSIGHT,
	HOW_TO_USE,
	NON_NEGOTIABLES,
	PALETTE_TYPES,
	PRE_DELIVERY_CHECK,
	REFERENCES_LEDE,
	REFERENCE_GROUPS,
	RULES_LEDE,
	SYMPTOM_FIXES,
	THREE_RULES,
} from "../../../content/color-cheat-sheet";
import PaletteStrip from "./palette-strip";
import { WatchNote } from "./palette-card";
import {
	ColorSpentOnNothing,
	ExampleCard,
	GrayPlusOneAccent,
	RULE_ILLUSTRATIONS,
} from "./illustrations";
import { trackEvent } from "../../../utils/clarity";

// The non-palette sections of the cheat sheet. Each is small, and each is used
// exactly once by the page, so they live together rather than in eight files.

const CARD =
	"rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50";

// Hides the native disclosure triangle; the chevron span replaces it.
const SUMMARY =
	"cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#219190] rounded-sm";

// A numbered "pay attention to this" block — the section 1 gates and the five
// dials share the shape.
const Numbered = ({
	n,
	title,
	accent = "teal",
	children,
}: {
	n: number | string;
	title: string;
	accent?: "teal" | "brown";
	children?: React.ReactNode;
}) => (
	<div className="flex gap-4">
		<span
			aria-hidden
			className={`flex-none w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
				accent === "brown"
					? "bg-[#8a7355] text-white"
					: "bg-[#219190]/15 border border-[#219190]/30 text-[#57C785]"
			}`}
		>
			{n}
		</span>
		<div className="min-w-0">
			<p className="font-semibold text-white leading-snug">{title}</p>
			{children}
		</div>
	</div>
);

// <details> rather than a state toggle: collapsed by default like the
// original, but the text stays in the prerendered HTML for search engines and
// for anyone who opens it with scripts disabled.
export const HowToUse = () => (
	<details
		className={`${CARD} group p-5 md:p-6`}
		onToggle={(e) => {
			if ((e.currentTarget as HTMLDetailsElement).open)
				trackEvent("cheat_sheet_how_to_use_open");
		}}
	>
		<summary className={`${SUMMARY} flex items-center justify-between`}>
			<span className="font-semibold text-white">How to use this</span>
			<span
				aria-hidden
				className="text-[#57C785] transition-transform duration-200 group-open:rotate-180"
			>
				⌄
			</span>
		</summary>
		<ul className="list-none p-0 mt-4 mb-0 space-y-2.5">
			{HOW_TO_USE.map((line, i) => (
				<li key={i} className="text-sm text-gray-400 leading-relaxed pl-4 relative">
					<span
						aria-hidden
						className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full bg-[#219190]/70"
					/>
					{line}
				</li>
			))}
		</ul>
	</details>
);

const GATE_ILLUSTRATIONS: Record<string, React.ReactNode> = {
	bad: <ColorSpentOnNothing />,
	good: <GrayPlusOneAccent />,
};

export const DecisionGates = () => (
	<div className="space-y-4">
		{DECISION_GATES.map((gate) => (
			<div key={gate.n} className={`${CARD} p-5 md:p-6`}>
				<Numbered n={gate.n} title={gate.question}>
					<p className="text-sm text-gray-400 leading-relaxed mt-2">{gate.detail}</p>
					<p className="text-sm text-[#57C785] leading-relaxed mt-3 flex gap-2">
						<span aria-hidden className="flex-none">
							→
						</span>
						<span>{gate.answer}</span>
					</p>
				</Numbered>
				{gate.examples && (
					<div className="grid sm:grid-cols-2 gap-3 mt-5">
						{gate.examples.map((ex) => (
							<ExampleCard
								key={ex.tone}
								tone={ex.tone}
								label={ex.label}
								caption={
									<>
										{ex.caption}
										{ex.emphasis && (
											<>
												{" "}
												<i>{ex.emphasis}</i>.
											</>
										)}
									</>
								}
							>
								{GATE_ILLUSTRATIONS[ex.tone]}
							</ExampleCard>
						))}
					</div>
				)}
			</div>
		))}
		<p className="text-sm md:text-base text-gray-300 leading-relaxed border-l-2 border-[#219190]/50 pl-4 md:pl-5 py-1">
			{GRAY_INSIGHT}
		</p>
	</div>
);

export const PaletteTypes = () => (
	<div className="grid md:grid-cols-3 gap-5">
		{PALETTE_TYPES.map((type) => (
			<div key={type.name} className={`${CARD} p-5 flex flex-col`}>
				<div className="flex items-baseline gap-2">
					<h3 className="font-bold text-white">{type.name}</h3>
					<span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
						{type.label}
					</span>
				</div>
				<p className="text-sm text-gray-400 leading-relaxed mt-2 mb-4 flex-grow">
					{type.description}
				</p>
				<PaletteStrip ramp={{ label: type.label, hexes: type.hexes }} showLabel={false} />
			</div>
		))}
	</div>
);

// Symptom → fix, and rule → why. A description list rather than a table: it
// stacks cleanly on a phone, where a two-column table would need to scroll.
const PairList = ({
	pairs,
	termHeading,
	descHeading,
}: {
	pairs: Array<{ term: string; desc: string }>;
	termHeading: string;
	descHeading: string;
}) => (
	<div className={`${CARD} overflow-hidden`}>
		<div className="hidden md:grid md:grid-cols-[minmax(0,18rem),1fr] gap-6 px-5 md:px-6 py-3 border-b border-gray-800/50 text-[10px] uppercase tracking-[0.15em] text-gray-500">
			<span>{termHeading}</span>
			<span>{descHeading}</span>
		</div>
		<dl className="m-0 divide-y divide-gray-800/50">
			{pairs.map((pair) => (
				<div
					key={pair.term}
					className="md:grid md:grid-cols-[minmax(0,18rem),1fr] md:gap-6 px-5 md:px-6 py-4"
				>
					<dt className="font-medium text-white text-sm leading-snug">{pair.term}</dt>
					<dd className="m-0 text-sm text-gray-400 leading-relaxed mt-1.5 md:mt-0">
						{pair.desc}
					</dd>
				</div>
			))}
		</dl>
	</div>
);

export const SymptomTable = () => (
	<PairList
		termHeading="Symptom"
		descHeading="Fix"
		pairs={SYMPTOM_FIXES.map((s) => ({ term: s.symptom, desc: s.fix }))}
	/>
);

export const NonNegotiables = () => (
	<PairList
		termHeading="Rule"
		descHeading="Why"
		pairs={NON_NEGOTIABLES.map((n) => ({ term: n.rule, desc: n.why }))}
	/>
);

// Text on the left, the ✗ / ✓ pair stacked on the right — the original's
// card layout. Stacks below the text on narrower screens.
export const ThreeRules = () => (
	<div className="space-y-5">
		<p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
			{RULES_LEDE}
		</p>
		{THREE_RULES.map((rule) => {
			const art = RULE_ILLUSTRATIONS[rule.illustration];
			return (
				<div
					key={rule.title}
					className={`${CARD} p-5 md:p-6 grid xl:grid-cols-[minmax(0,1fr),17rem] gap-5 xl:gap-6 items-start`}
				>
					<div className="min-w-0">
						<h3 className="font-bold text-white text-lg leading-snug">{rule.title}</h3>
						<p className="text-sm text-gray-400 leading-relaxed mt-2">{rule.text}</p>
						<p className="text-[13px] text-gray-300 leading-relaxed bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 mt-3.5 mb-0">
							<b className="text-[#57C785] font-semibold">Do this:</b> {rule.doThis}
						</p>
					</div>
					<div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-2.5">
						<ExampleCard tone="bad" label={rule.bad}>
							{art.bad}
						</ExampleCard>
						<ExampleCard tone="good" label={rule.good}>
							{art.good}
						</ExampleCard>
					</div>
				</div>
			);
		})}
	</div>
);

// Section 4 opener: the five dials, the same-blue proof strips, and the
// "luxury = brown" caution. Brown accent as in the original card.
export const FiveDials = () => (
	<div className={`${CARD} p-5 md:p-6 border-l-[3px] border-l-[#8a7355]`}>
		<div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
			<h3 className="font-bold text-white text-lg">Derive your own: the five dials</h3>
			<span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#8a7355]/20 text-[#d9c3a5] border border-[#8a7355]/40">
				mechanism
			</span>
		</div>
		<p className="text-sm text-gray-400 leading-relaxed mt-2.5">{DIALS_LEDE}</p>

		<div className="grid md:grid-cols-2 gap-2.5 mt-4">
			{FIVE_DIALS.map((dial) => (
				<div key={dial.n} className="rounded-lg bg-white/[0.03] border border-white/5 px-3.5 py-3">
					<Numbered n={dial.n} title={dial.name} accent="brown">
						<p className="text-[13px] text-gray-400 leading-relaxed mt-1 mb-0">{dial.text}</p>
					</Numbered>
				</div>
			))}
		</div>

		<p className="text-[13px] text-gray-300 leading-relaxed bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 mt-4">
			<b className="text-[#d9c3a5] font-semibold">Proof:</b> {DIAL_PROOF.lede}
		</p>
		<div className="space-y-2.5 mt-3">
			{DIAL_PROOF.rows.map((row) => (
				<div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
					<div className="sm:w-44 flex-none">
						<b className="block text-[13px] text-white font-semibold">{row.label}</b>
						<span className="text-[11.5px] text-gray-500">{row.note}</span>
					</div>
					<div className="flex gap-[3px] flex-grow" role="img" aria-label={`${row.label}: ${row.hexes.join(", ")}`}>
						{row.hexes.map((hex) => (
							<div key={hex} className="flex-1 h-[30px] rounded" style={{ backgroundColor: hex }} />
						))}
					</div>
				</div>
			))}
		</div>
		<div className="mt-4">
			<WatchNote text={DIALS_WATCH} />
		</div>
	</div>
);

export const Glossary = () => (
	<div>
		<p className="text-base text-gray-300 leading-relaxed max-w-3xl mb-6">{GLOSSARY_LEDE}</p>
		<dl className="grid md:grid-cols-2 gap-x-8 gap-y-5 m-0">
			{GLOSSARY.map((entry) => (
				<div key={entry.term}>
					<dt className="font-semibold text-white text-sm">{entry.term}</dt>
					<dd className="m-0 text-sm text-gray-400 leading-relaxed mt-1">{entry.definition}</dd>
				</div>
			))}
		</dl>
		<div className="mt-6">
			<WatchNote text={PRE_DELIVERY_CHECK} />
		</div>
	</div>
);

export const References = () => {
	const total = REFERENCE_GROUPS.reduce((n, g) => n + g.items.length, 0);

	return (
		<div>
			<p className="text-base text-gray-300 leading-relaxed max-w-3xl">{REFERENCES_LEDE}</p>
			<details
				className="group mt-4"
				onToggle={(e) => {
					if ((e.currentTarget as HTMLDetailsElement).open)
						trackEvent("cheat_sheet_references_open");
				}}
			>
				<summary
					className={`${SUMMARY} inline-flex items-center text-sm font-medium text-[#57C785] hover:text-white transition-colors duration-[10ms]`}
				>
					<span className="group-open:hidden">See more</span>
					<span className="hidden group-open:inline">Show less</span>
					<span
						aria-hidden
						className="inline-block ml-1.5 transition-transform duration-200 group-open:rotate-180"
					>
						⌄
					</span>
					<span className="ml-3 text-gray-500 font-normal">
						{total} sources — tools, papers and books
					</span>
				</summary>

				<div className="mt-6 space-y-8">
					{REFERENCE_GROUPS.map((group) => (
						<div key={group.group}>
							<h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
								{group.group}
							</h3>
							<ol className="list-none p-0 m-0 space-y-4">
								{group.items.map((ref) => (
									<li key={ref.n} className="flex gap-3">
										<span className="flex-none font-mono text-[11px] text-gray-600 mt-0.5 w-6">
											[{ref.n}]
										</span>
										<div className="min-w-0">
											<p className="text-sm text-gray-300 leading-relaxed">{ref.citation}</p>
											{ref.note && (
												<p className="text-[12.5px] text-gray-500 leading-relaxed mt-1">{ref.note}</p>
											)}
											{ref.url && (
												<a
													href={ref.url}
													target="_blank"
													rel="noreferrer"
													className="link inline-block font-mono text-[11px] text-[#57C785]/80 hover:text-[#57C785] mt-1 break-all"
												>
													{ref.url}
												</a>
											)}
										</div>
									</li>
								))}
							</ol>
						</div>
					))}
				</div>
			</details>
		</div>
	);
};
