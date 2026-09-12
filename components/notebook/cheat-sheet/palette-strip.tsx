import React from "react";
import { IPaletteRamp } from "../../../content/color-cheat-sheet";
import { useCopy } from "./use-copy";

// WCAG relative luminance. The original sheet hand-tagged every swatch
// .onlight / .ondark to decide the hex label's colour; computing it means a new
// palette can never be tagged wrong.
const luminance = (hex: string): number => {
	const h = hex.replace("#", "");
	const full =
		h.length === 3
			? h
					.split("")
					.map((c) => c + c)
					.join("")
			: h;
	const channel = (i: number) => {
		const c = parseInt(full.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	};
	return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
};

export const isLight = (hex: string): boolean => luminance(hex) > 0.45;

// One ramp: a label, the swatches (click to copy a single hex), and a Copy
// button for the whole ramp. Swatches carry their hex as visible text, not just
// a title attribute, so the sheet works without hovering.
const PaletteStrip = ({
	ramp,
	showLabel = true,
}: {
	ramp: IPaletteRamp;
	showLabel?: boolean;
}) => {
	const { copy, copied } = useCopy();
	const all = ramp.hexes.join(", ");

	return (
		<div className="flex items-center gap-2 md:gap-3">
			{showLabel && (
				<span className="flex-none w-10 text-[11px] font-mono uppercase tracking-wider text-gray-500">
					{ramp.label}
				</span>
			)}
			<div className="flex flex-grow min-w-0 rounded-md overflow-hidden border border-white/10">
				{ramp.hexes.map((hex) => (
					<button
						key={hex}
						type="button"
						onClick={() => copy(hex, hex)}
						title={`Copy ${hex}`}
						aria-label={`Copy ${hex}`}
						className="group relative flex-1 min-w-0 h-9 md:h-10 flex items-end justify-center transition-transform duration-[10ms] hover:z-10 hover:scale-y-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:z-10"
						style={{ backgroundColor: hex }}
					>
						<span
							className={`w-full text-center font-mono text-[8px] md:text-[9px] leading-[1.6] truncate px-0.5 ${
								isLight(hex) ? "text-black/60" : "text-white/70"
							}`}
						>
							{copied === hex ? "✓" : hex}
						</span>
					</button>
				))}
			</div>
			<button
				type="button"
				onClick={() => copy(all, all)}
				title="Copy all hex codes in this ramp"
				className="flex-none text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-700 text-gray-400 hover:border-[#219190]/50 hover:text-[#57C785] transition-colors duration-[10ms]"
			>
				{copied === all ? "Copied ✓" : "Copy"}
			</button>
		</div>
	);
};

export default PaletteStrip;
