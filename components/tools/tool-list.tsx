import React from "react";
import { ITool } from "../../constants";
import { trackEvent } from "../../utils/clarity";

// Tool cards for the /tools index. Each tool is a self-contained static page
// in public/tools/<slug>/, so the card is a plain <a>, not a Next <Link>:
// the router has no route for it and would 404 on client-side navigation.
const ToolList = ({
	tools,
	heading = "Power BI",
	subheading = "Start a report from a finished canvas instead of a blank one",
	id = "power-bi-tools",
}: {
	tools: ITool[];
	heading?: string;
	subheading?: string;
	id?: string;
}) => {
	if (!tools.length) return null;

	return (
		<section
			className="w-full relative section-container py-8 md:py-12 flex flex-col"
			id={id}
		>
			<div className="flex flex-col mb-8">
				<div className="flex items-end gap-3">
					<h2 className="section-heading seq">{heading}</h2>
					<span className="text-sm text-gray-500 font-normal whitespace-nowrap pb-1.5">
						· {tools.length} {tools.length === 1 ? "tool" : "tools"}
					</span>
				</div>
				<h3 className="text-xl md:text-2xl md:max-w-3xl w-full seq mt-2 text-gray-200">
					{subheading}
				</h3>
			</div>

			<div className="grid grid-cols-1 gap-6 md:gap-8">
				{tools.map((tool) => (
					<a
						key={tool.slug}
						href={tool.href}
						className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 overflow-hidden transition-all duration-[10ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#219190]/40 hover:-translate-y-1"
						onClick={() => trackEvent("tool_open", { tool: tool.slug })}
					>
						<div className="relative bg-gray-800/40 border-b lg:border-b-0 lg:border-r border-gray-800/50 overflow-hidden">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={tool.image}
								alt={tool.imageAlt}
								width={1600}
								height={840}
								loading="lazy"
								className="block w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.015]"
							/>
						</div>

						<div className="p-5 md:p-7 flex flex-col">
							<div className="flex items-center justify-between gap-3 mb-3">
								<span className="flex-none text-xs font-medium px-2.5 py-1 rounded-full border border-[#219190]/30 bg-[#219190]/10 text-[#57C785]">
									{tool.topic}
								</span>
								<span className="flex-none text-xs font-medium tracking-wide text-gray-500 uppercase">
									{tool.date}
								</span>
							</div>
							<h4 className="font-bold text-white group-hover:text-[#57C785] transition-colors duration-[10ms] leading-snug text-2xl md:text-3xl">
								{tool.name}
							</h4>
							<p className="text-base md:text-lg text-gray-200 leading-snug mt-2">
								{tool.tagline}
							</p>
							<p className="text-sm text-gray-400 leading-relaxed mt-3">
								{tool.description}
							</p>
							{tool.features && tool.features.length > 0 && (
								<ul className="mt-4 space-y-2">
									{tool.features.map((feature) => (
										<li
											key={feature}
											className="flex gap-2.5 text-sm text-gray-300 leading-relaxed"
										>
											<span
												aria-hidden
												className="flex-none mt-2 w-1.5 h-1.5 rounded-full bg-[#57C785]"
											/>
											{feature}
										</li>
									))}
								</ul>
							)}
							<div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-auto pt-6">
								{tool.meta && (
									<span className="font-mono text-[11px] text-gray-500 mr-auto">
										{tool.meta}
									</span>
								)}
								<span className="flex-none text-sm font-medium text-[#57C785]">
									Open the tool
									<span
										aria-hidden
										className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
									>
										→
									</span>
								</span>
							</div>
						</div>
					</a>
				))}
			</div>
		</section>
	);
};

export default ToolList;
