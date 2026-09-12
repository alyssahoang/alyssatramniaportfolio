import React from "react";
import { IPaletteCard } from "../../../content/color-cheat-sheet";
import PaletteStrip, { isLight } from "./palette-strip";
import MiniDashboard from "./mini-dashboard";

const rampBy = (card: IPaletteCard, label: string) =>
	card.ramps.find((r) => r.label.toLowerCase() === label.toLowerCase());

// A caution: "red = gains in Greater China", "viridis dies on a dark canvas".
export const WatchNote = ({ text }: { text: string }) => (
	<p className="flex gap-2 text-[12.5px] leading-relaxed text-amber-200/90 bg-amber-400/[0.07] border border-amber-300/20 rounded-lg px-3 py-2">
		<span aria-hidden className="flex-none">
			⚠
		</span>
		<span>{text}</span>
	</p>
);

// One industry or mood: heading, reference brand, the ramps, and the in-use
// preview. Ramps and preview sit side by side on desktop and stack on mobile.
const PaletteCard = ({ card }: { card: IPaletteCard }) => {
	const seq = rampBy(card, "Seq") ?? card.ramps[0];
	const div = rampBy(card, "Div");
	// Extra ramps (the Technical card carries UI and Print) render below.
	const extras = card.ramps.filter((r) => r !== seq && r !== div);

	return (
		<article
			id={`palette-${card.slug}`}
			data-palette-card
			className="rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-5 md:p-6 scroll-mt-28 transition-colors duration-[10ms] hover:border-[#3B82F6]/30"
		>
			<div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
				<h3 className="font-bold text-white text-lg md:text-xl">
					{card.title}
				</h3>
				{card.tag && (
					<span className="flex-none text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#93C5FD] border border-[#3B82F6]/25">
						{card.tag}
					</span>
				)}
			</div>

			{card.brand && (
				<div className="flex flex-wrap items-center gap-2 mt-3">
					<span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
						<span
							aria-hidden
							className={`w-4 h-4 rounded-[3px] flex items-center justify-center text-[9px] font-bold ${
								isLight(card.brand.color) ? "text-black/70" : "text-white/90"
							}`}
							style={{ backgroundColor: card.brand.color }}
						>
							{card.brand.name.charAt(0)}
						</span>
						{card.brand.name}
					</span>
					{card.brand.note && (
						<span className="text-[11px] uppercase tracking-wider text-gray-500">
							{card.brand.note}
						</span>
					)}
				</div>
			)}

			<p className="text-sm text-gray-400 leading-relaxed mt-3">
				{card.description}
			</p>

			<div className="grid lg:grid-cols-[1fr,264px] gap-5 lg:gap-6 mt-4 items-start">
				<div className="space-y-2.5 min-w-0">
					{seq && <PaletteStrip ramp={seq} />}
					{div && <PaletteStrip ramp={div} />}
					{extras.map((r) => (
						<PaletteStrip key={r.label} ramp={r} />
					))}
				</div>
				<div className="w-full lg:w-[264px]">
					<span className="block text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-1.5">
						in use
					</span>
					<MiniDashboard
						seq={seq?.hexes ?? []}
						div={div?.hexes}
						dark={card.dark}
					/>
				</div>
			</div>

			{card.how && (
				<p className="text-[12.5px] text-gray-300 leading-relaxed bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2.5 mt-4">
					<span className="text-gray-500 uppercase tracking-wider text-[10px] mr-1.5">
						How
					</span>
					{card.how}
				</p>
			)}

			{card.watch && card.watch.length > 0 && (
				<div className="space-y-2 mt-3">
					{card.watch.map((w, i) => (
						<WatchNote key={i} text={w} />
					))}
				</div>
			)}
		</article>
	);
};

export default PaletteCard;
