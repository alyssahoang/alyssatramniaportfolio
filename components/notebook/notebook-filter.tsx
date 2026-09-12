import React from "react";
import { notebookTopicColor } from "../../constants";
import { trackEvent } from "../../utils/clarity";

export interface ITopicCount {
	topic: string;
	count: number;
}

// Search box + topic pills for the Notebook page. State lives in the page so
// both controls narrow the same list. Pill colors come from
// NOTEBOOK_TOPIC_COLORS via inline styles — Tailwind cannot build
// arbitrary-color classes at runtime.
const NotebookFilter = ({
	topics,
	active,
	onTopicChange,
	query,
	onQueryChange,
	resultCount,
}: {
	topics: ITopicCount[];
	active: string | null;
	onTopicChange: (topic: string | null) => void;
	query: string;
	onQueryChange: (query: string) => void;
	resultCount: number;
}) => {
	const pick = (topic: string | null) => {
		onTopicChange(topic);
		trackEvent("notebook_topic_filter", { topic: topic ?? "all" });
	};

	const basePill =
		"flex-none text-xs md:text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-[10ms] cursor-pointer";

	const filtering = active !== null || query.trim().length > 0;

	return (
		<div className="w-full relative select-none section-container pb-2 md:pb-4">
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center gap-3">
					<label className="relative flex-grow max-w-md">
						<span className="sr-only">Search notes</span>
						<span
							aria-hidden
							className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
						>
							⌕
						</span>
						<input
							type="search"
							value={query}
							onChange={(e) => onQueryChange(e.target.value)}
							placeholder="Search notes, tags, ideas…"
							className="w-full bg-gray-800/60 border border-gray-700/50 rounded-full pl-9 pr-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#219190]/60 focus:bg-gray-800 transition-colors duration-[10ms]"
						/>
					</label>
					<span
						className="text-xs uppercase tracking-[0.15em] text-gray-500"
						aria-live="polite"
					>
						{resultCount} {resultCount === 1 ? "note" : "notes"}
						{filtering ? " matched" : ""}
					</span>
				</div>

				<div
					className="flex flex-wrap items-center gap-2 md:gap-2.5"
					role="group"
					aria-label="Filter notes by topic"
				>
					<button
						type="button"
						aria-pressed={active === null}
						onClick={() => pick(null)}
						className={`${basePill} ${
							active === null
								? "bg-[#219190] border-[#219190] text-white"
								: "border-gray-700 text-gray-400 hover:border-[#219190]/40 hover:text-gray-200"
						}`}
					>
						All
					</button>
					{topics.map(({ topic, count }) => {
						const color = notebookTopicColor(topic);
						const isActive = active === topic;
						return (
							<button
								key={topic}
								type="button"
								aria-pressed={isActive}
								onClick={() => pick(isActive ? null : topic)}
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
								{topic}
								<span className={isActive ? "opacity-70" : "opacity-60"}>
									{" "}
									· {count}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default NotebookFilter;
