import React from "react";
import { ReadStatus, readCategoryColor } from "../../constants";

// Small shared pieces for the reads page cards (publications / articles /
// books) so the three card components stay in sync.

// "Currently reading" pulses; "Must-read" is a quiet star pill.
export const StatusBadge = ({ status }: { status?: ReadStatus }) => {
	if (!status) return null;

	if (status === "reading") {
		return (
			<span className="flex-none inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#9146FF]/15 text-[#BF94FF] border border-[#9146FF]/30">
				<span className="relative flex h-1.5 w-1.5" aria-hidden>
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF94FF] opacity-75" />
					<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#BF94FF]" />
				</span>
				Currently reading
			</span>
		);
	}

	return (
		<span className="flex-none inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-amber-300/90 border border-amber-300/30">
			<span aria-hidden>★</span>
			Must-read
		</span>
	);
};

// First-person one-liner. Hidden behind hover on md+ (cards are <a> links, so
// tap-to-toggle would fight navigation — on mobile it's simply visible).
export const TakeLine = ({ take }: { take?: string }) => {
	if (!take) return null;
	return (
		<p className="text-sm italic text-[#BF94FF]/90 leading-relaxed mt-3 md:mt-0 md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:mt-3 md:group-hover:max-h-24 md:group-hover:opacity-100 transition-all duration-200 ease-out">
			<span aria-hidden>» </span>
			{take}
		</p>
	);
};

// Category pill with the per-category accent color (inline styles — Tailwind
// can't generate arbitrary-color classes at runtime).
export const CategoryPill = ({ category }: { category: string }) => {
	const color = readCategoryColor(category);
	return (
		<span
			className="flex-none text-xs font-medium px-2.5 py-1 rounded-full border"
			style={{
				color,
				borderColor: `${color}4D`,
				backgroundColor: `${color}14`,
			}}
		>
			{category}
		</span>
	);
};

// Section heading with a muted item count ("· 6 blogs").
export const SectionCount = ({
	count,
	noun,
}: {
	count: number;
	noun: string;
}) => (
	<span className="text-sm text-gray-500 font-normal whitespace-nowrap pb-1.5">
		· {count} {noun}
		{count === 1 ? "" : "s"}
	</span>
);
