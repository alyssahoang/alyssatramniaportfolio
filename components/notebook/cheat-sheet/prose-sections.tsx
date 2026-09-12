import React, { useState } from "react";
import {
	DECISION_GATES,
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
import { trackEvent } from "../../../utils/clarity";

// The non-palette sections of the cheat sheet. Each is small, and each is used
// exactly once by the page, so they live together rather than in eight files.

const CARD =
	"rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50";

// A numbered "pay attention to this" block — the section 1 gates and the five
// dials share the shape.
const Numbered = ({
	n,
	title,
	children,
}: {
	n: number | string;
	title: string;
	children?: React.ReactNode;
}) => (
	<div className="flex gap-4">
		<span
			aria-hidden
			className="flex-none w-7 h-7 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-bold flex items-center justify-center mt-0.5"
		>
			{n}
		</span>
		<div className="min-w-0">
			<p className="font-semibold text-white leading-snug">{title}</p>
			{children}
		</div>
	</div>
);

export const HowToUse = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className={`${CARD} p-5 md:p-6`}>
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				aria-expanded={open}
				className="flex items-center justify-between w-full text-left"
			>
				<span className="font-semibold text-white">How to use this</span>
				<span
					aria-hidden
					className={`text-[#93C5FD] transition-transform duration-200 ${
						open ? "rotate-180" : ""
					}`}
				>
					⌄
				</span>
			</button>
			{open && (
				<ul className="list-none p-0 mt-4 space-y-2.5">
					{HOW_TO_USE.map((line, i) => (
						<li
							key={i}
							className="text-sm text-gray-400 leading-relaxed pl-4 relative"
						>
							<span
								aria-hidden
								className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full bg-[#3B82F6]/70"
							/>
							{line}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export const DecisionGates = () => (
	<div className="space-y-4">
		{DECISION_GATES.map((gate) => (
			<div key={gate.n} className={`${CARD} p-5 md:p-6`}>
				<Numbered n={gate.n} title={gate.question}>
					<p className="text-sm text-gray-400 leading-relaxed mt-2">
						{gate.detail}
					</p>
					<p className="text-sm text-[#93C5FD] leading-relaxed mt-3 flex gap-2">
						<span aria-hidden className="flex-none">
							→
						</span>
						<span>{gate.answer}</span>
					</p>
				</Numbered>
			</div>
		))}
		<p className="text-sm md:text-base text-gray-300 leading-relaxed border-l-2 border-[#3B82F6]/50 pl-4 md:pl-5 py-1">
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
				<PaletteStrip
					ramp={{ label: type.label, hexes: type.hexes }}
					showLabel={false}
				/>
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
					<dt className="font-medium text-white text-sm leading-snug">
						{pair.term}
					</dt>
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

export const ThreeRules = () => (
	<div className="space-y-5">
		<p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
			{RULES_LEDE}
		</p>
		{THREE_RULES.map((rule) => (
			<div key={rule.title} className={`${CARD} p-5 md:p-6`}>
				<h3 className="font-bold text-white text-lg leading-snug">
					{rule.title}
				</h3>
				<p className="text-sm text-gray-400 leading-relaxed mt-2">
					{rule.text}
				</p>
				<p className="text-[12.5px] text-gray-300 leading-relaxed bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 mt-3.5">
					<span className="text-gray-500 uppercase tracking-wider text-[10px] mr-1.5">
						Do this
					</span>
					{rule.doThis}
				</p>
				<div className="flex flex-wrap gap-2.5 mt-3.5">
					<span className="text-[11px] px-2.5 py-1 rounded-full bg-red-500/10 text-red-300/90 border border-red-400/20">
						<span aria-hidden>✗ </span>
						{rule.bad}
					</span>
					<span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300/90 border border-emerald-400/20">
						<span aria-hidden>✓ </span>
						{rule.good}
					</span>
				</div>
			</div>
		))}
	</div>
);

export const FiveDials = () => (
	<div className={`${CARD} p-5 md:p-6`}>
		<div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-5">
			<h3 className="font-bold text-white text-lg">
				Derive your own: the five dials
			</h3>
			<span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#93C5FD] border border-[#3B82F6]/25">
				mechanism
			</span>
		</div>
		<div className="space-y-4">
			{FIVE_DIALS.map((dial) => (
				<Numbered key={dial.n} n={dial.n} title={dial.name}>
					<p className="text-sm text-gray-400 leading-relaxed mt-1.5">
						{dial.text}
					</p>
				</Numbered>
			))}
		</div>
	</div>
);

export const Glossary = () => (
	<div>
		<p className="text-base text-gray-300 leading-relaxed max-w-3xl mb-6">
			{GLOSSARY_LEDE}
		</p>
		<dl className="grid md:grid-cols-2 gap-x-8 gap-y-5 m-0">
			{GLOSSARY.map((entry) => (
				<div key={entry.term}>
					<dt className="font-semibold text-white text-sm">{entry.term}</dt>
					<dd className="m-0 text-sm text-gray-400 leading-relaxed mt-1">
						{entry.definition}
					</dd>
				</div>
			))}
		</dl>
		<div className="mt-6">
			<WatchNote text={PRE_DELIVERY_CHECK} />
		</div>
	</div>
);

export const References = () => {
	const [open, setOpen] = useState(false);
	const total = REFERENCE_GROUPS.reduce((n, g) => n + g.items.length, 0);

	return (
		<div>
			<p className="text-base text-gray-300 leading-relaxed max-w-3xl">
				{REFERENCES_LEDE}
			</p>
			<button
				type="button"
				onClick={() => {
					setOpen((p) => {
						if (!p) trackEvent("cheat_sheet_references_open");
						return !p;
					});
				}}
				aria-expanded={open}
				className="mt-4 text-sm font-medium text-[#93C5FD] hover:text-white transition-colors duration-[10ms]"
			>
				{open ? "Show less" : `Show all ${total} sources`}
				<span
					aria-hidden
					className={`inline-block ml-1.5 transition-transform duration-200 ${
						open ? "rotate-180" : ""
					}`}
				>
					⌄
				</span>
			</button>

			{open && (
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
											<p className="text-sm text-gray-300 leading-relaxed">
												{ref.citation}
											</p>
											{ref.note && (
												<p className="text-[12.5px] text-gray-500 leading-relaxed mt-1">
													{ref.note}
												</p>
											)}
											{ref.url && (
												<a
													href={ref.url}
													target="_blank"
													rel="noreferrer"
													className="link inline-block font-mono text-[11px] text-[#93C5FD]/80 hover:text-[#93C5FD] mt-1 break-all"
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
			)}
		</div>
	);
};
