import React from "react";
import { readCategoryColor } from "../../constants";
import { trackEvent } from "../../utils/clarity";

export interface ICategoryCount {
	category: string;
	count: number;
}

// Category filter pills for the reads page. State lives in the page so one
// row filters all three sections (articles / books / publications). Colors
// come from READ_CATEGORY_COLORS via inline styles — Tailwind can't build
// arbitrary-color classes at runtime.
const ReadsFilter = ({
	categories,
	active,
	onChange,
}: {
	categories: ICategoryCount[];
	active: string | null;
	onChange: (category: string | null) => void;
}) => {
	const pick = (category: string | null) => {
		onChange(category);
		trackEvent("reads_filter", { category: category ?? "all" });
	};

	const basePill =
		"flex-none text-xs md:text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-[10ms] cursor-pointer";

	return (
		<div className="w-full relative select-none section-container pb-2 md:pb-4">
			<div
				className="flex flex-wrap items-center gap-2 md:gap-2.5"
				role="group"
				aria-label="Filter reads by category"
			>
				<button
					type="button"
					aria-pressed={active === null}
					onClick={() => pick(null)}
					className={`${basePill} ${
						active === null
							? "bg-[#9146FF] border-[#9146FF] text-white"
							: "border-gray-700 text-gray-400 hover:border-[#9146FF]/40 hover:text-gray-200"
					}`}
				>
					All
				</button>
				{categories.map(({ category, count }) => {
					const color = readCategoryColor(category);
					const isActive = active === category;
					return (
						<button
							key={category}
							type="button"
							aria-pressed={isActive}
							onClick={() => pick(isActive ? null : category)}
							className={`${basePill} ${
								isActive ? "text-gray-900" : "hover:brightness-125"
							}`}
							style={
								isActive
									? { backgroundColor: color, borderColor: color }
									: {
											color,
											borderColor: `${color}4D`,
											backgroundColor: `${color}14`,
									  }
							}
						>
							{category}
							<span className={isActive ? "opacity-70" : "opacity-60"}>
								{" "}
								· {count}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ReadsFilter;
