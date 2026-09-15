import React, { useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { METADATA, TOOLS, TOOLS_LAST_UPDATED } from "../../constants";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import ToolList from "@/components/tools/tool-list";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";

// Register GSAP plugins once at module scope, same as the other routes.
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
	gsap.config({ nullTargetWarn: false });
}

const DESCRIPTION =
	"Free browser tools for Power BI work, starting with the Free Power BI Layout Generator: report background templates, a matching theme file and a ready-to-open .pbip project.";

export default function Tools() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Same staggered entrance as the Notebook hero, so the secondary pages
	// feel like siblings.
	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${
			loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
		}`;

	return (
		<Layout
			title={`Tools — ${METADATA.title}`}
			description={DESCRIPTION}
			// Trailing slash: next.config sets trailingSlash, so the page is
			// served at /tools/ and the canonical has to match it.
			path="/tools/"
		>
			<Header />
			<ProgressIndicator />
			<main className="flex-col flex">
				<div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1" />

				<section
					className="w-full relative select-none section-container pt-32 md:pt-40 pb-10 md:pb-14 overflow-hidden"
					id="tools-hero"
				>
					{/* Decorative glow — pure depth, hidden from the a11y tree */}
					<div
						aria-hidden
						className="pointer-events-none absolute -top-24 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#219190]/20 blur-[120px]"
					/>

					<div className="relative z-10 flex flex-col">
						<p
							className={`text-[#57C785] text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4 ${reveal(
								"delay-200"
							)}`}
						>
							Built for my own projects
						</p>
						<h1
							className={`text-gradient w-fit font-bold leading-[1.1] pb-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${reveal(
								"delay-300"
							)}`}
						>
							Tools
						</h1>
						<div
							className={`h-1 mt-6 rounded-full bg-gradient-to-r from-[#219190] to-[#57C785] transition-[width,opacity] duration-700 delay-500 ease-out ${
								loaded ? "w-24 opacity-100" : "w-0 opacity-0"
							}`}
						/>
						<p
							className={`text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mt-7 ${reveal(
								"delay-700"
							)}`}
						>
							Free tools I made to skip the repetitive parts of dashboard work.
							They run in your browser, and the images you add stay on your
							computer.
						</p>
						<span
							className={`text-xs uppercase tracking-[0.15em] text-gray-500 mt-8 ${reveal(
								"delay-1000"
							)}`}
						>
							{TOOLS.length} {TOOLS.length === 1 ? "tool" : "tools"} · updated{" "}
							{TOOLS_LAST_UPDATED}
						</span>
					</div>
				</section>

				<ToolList tools={TOOLS} />

				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
