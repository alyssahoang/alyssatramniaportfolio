import React from "react";
import Link from "next/link";
import { IGuide, notebookTopicColor } from "../../constants";
import { trackEvent } from "../../utils/clarity";

// Cheat sheets and other long-form pages. Rendered above the notes on the
// notebook index: a guide is a destination, a note is a card you skim.
const GuideList = ({
	guides,
	heading = "Cheat sheets",
	subheading = "Reference pages I keep coming back to mid-project",
	id = "cheat-sheets",
}: {
	guides: IGuide[];
	heading?: string;
	subheading?: string;
	id?: string;
}) => {
	if (!guides.length) return null;

	return (
		<section
			className="w-full relative select-none section-container py-8 md:py-12 flex flex-col"
			id={id}
		>
			<div className="flex flex-col mb-8">
				<div className="flex items-end gap-3">
					<h2 className="section-heading seq">{heading}</h2>
					<span className="text-sm text-gray-500 font-normal whitespace-nowrap pb-1.5">
						· {guides.length} {guides.length === 1 ? "sheet" : "sheets"}
					</span>
				</div>
				<h3 className="text-xl md:text-2xl md:max-w-3xl w-full seq mt-2 text-gray-200">
					{subheading}
				</h3>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
				{guides.map((guide) => {
					const color = notebookTopicColor(guide.topic);
					return (
						<Link href={`/notebook/${guide.slug}`} key={guide.slug}>
							<a
								className="group block rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-5 md:p-6 transition-all duration-[10ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#219190]/40 hover:shadow-[0_20px_40px_-12px_rgba(33,145,144,0).15)] hover:-translate-y-1"
								onClick={() =>
									trackEvent("guide_click", { guide: guide.slug })
								}
							>
								<div className="flex items-center justify-between gap-3 mb-3">
									<span
										className="flex-none text-xs font-medium px-2.5 py-1 rounded-full border"
										style={{
											color,
											borderColor: `${color}4D`,
											backgroundColor: `${color}14`,
										}}
									>
										{guide.topic}
									</span>
									<span className="flex-none text-xs font-medium tracking-wide text-gray-500 uppercase">
										{guide.date}
									</span>
								</div>
								<h4 className="font-bold text-white group-hover:text-[#57C785] transition-colors duration-[10ms] leading-snug text-lg md:text-xl">
									{guide.title}
								</h4>
								<p className="text-sm text-gray-400 leading-relaxed mt-2.5">
									{guide.description}
								</p>
								<div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4">
									{guide.meta && (
										<span className="font-mono text-[11px] text-gray-500 mr-auto">
											{guide.meta}
										</span>
									)}
									<span className="flex-none text-xs font-medium text-[#57C785]">
										Open the sheet
										<span
											aria-hidden
											className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
										>
											→
										</span>
									</span>
								</div>
							</a>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default GuideList;
