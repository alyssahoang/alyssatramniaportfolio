import React, { useEffect, useRef } from "react";
import GitHubStats from "./github-stats";
// Wakatime widget removed: see CONTENT-PLAN.md (Training log)
import { initHeadingWipe } from "../../utils/motion";

const ActivitySection = () => {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const wipe = initHeadingWipe(sectionRef.current);
		return () => wipe?.kill();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="w-full relative select-none section-container py-8 md:py-12 flex flex-col"
			id="activity"
		>
			{/* Ambient glow tying the section back to the hero/pipeline treatment */}
			<div
				aria-hidden="true"
				className="absolute -top-24 right-0 w-[26rem] h-[26rem] rounded-full bg-[#3B82F6]/10 blur-3xl aurora-blob aurora-drift-2 pointer-events-none"
			/>

			<div className="flex flex-col mb-10 relative">
				<h2 className="section-heading seq">My Activity</h2>
				<h3 className="text-2xl md:max-w-2xl w-full seq mt-2">
					Coding stats & contributions
				</h3>
			</div>

			<div className="flex flex-col gap-8 relative">
				<GitHubStats />
			</div>
		</section>
	);
};

export default ActivitySection;
