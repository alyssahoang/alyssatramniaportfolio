import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { METADATA } from "../../constants";
import {
	CHEAT_SHEET_META,
	DISCLAIMERS,
} from "../../content/color-cheat-sheet";
import {
	INDUSTRY_PALETTES,
	MOOD_PALETTES,
} from "../../content/color-cheat-sheet-palettes";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import PaletteCard from "@/components/notebook/cheat-sheet/palette-card";
import {
	DecisionGates,
	FiveDials,
	Glossary,
	HowToUse,
	NonNegotiables,
	PaletteTypes,
	References,
	SymptomTable,
	ThreeRules,
} from "@/components/notebook/cheat-sheet/prose-sections";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import { initHeadingWipe, prefersReducedMotion } from "../../utils/motion";
import { trackEvent } from "../../utils/clarity";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
	gsap.config({ nullTargetWarn: false });
}

const DESCRIPTION =
	"When color earns its place on a dashboard and when gray does the job better — with copy-and-paste sequential and diverging palettes for 19 industries and 8 moods, each shown in a sample dashboard layout.";

// The page is long, so every section is an anchor and the jump nav sticks.
const SECTIONS = [
	{ id: "need-color", label: "Do you need color?" },
	{ id: "palette-types", label: "Palette types" },
	{ id: "worth-knowing", label: "Worth knowing" },
	{ id: "by-feeling", label: "By feeling" },
	{ id: "by-industry", label: "By industry" },
	{ id: "non-negotiables", label: "Non-negotiables" },
	{ id: "glossary", label: "Glossary" },
	{ id: "references", label: "References" },
];

// Section shell: the heading gets the site's clip-path wipe on scroll-in.
const Section = ({
	id,
	number,
	title,
	lede,
	children,
}: {
	id: string;
	number?: string;
	title: string;
	lede?: string;
	children: React.ReactNode;
}) => {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const wipe = initHeadingWipe(ref.current);
		return () => wipe?.kill();
	}, []);

	return (
		<section
			ref={ref}
			id={id}
			className="w-full relative select-none section-container py-8 md:py-12 flex flex-col scroll-mt-24"
		>
			<div className="flex flex-col mb-7">
				{number && (
					<span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
						{number}
					</span>
				)}
				<h2 className="section-heading seq">{title}</h2>
				{lede && (
					<h3 className="text-xl md:text-2xl md:max-w-3xl w-full seq mt-2 text-gray-200">
						{lede}
					</h3>
				)}
			</div>
			{children}
		</section>
	);
};

export default function ColorCheatSheet() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Cards rise in as they scroll past. Skipped under reduced motion, where
	// the `once` triggers would be the only thing making them visible.
	useEffect(() => {
		if (prefersReducedMotion()) return;
		const cards = document.querySelectorAll<HTMLElement>("[data-palette-card]");
		const triggers: ScrollTrigger[] = [];
		cards.forEach((el) => {
			gsap.set(el, { opacity: 0, y: 28 });
			triggers.push(
				ScrollTrigger.create({
					trigger: el,
					start: "top 94%",
					once: true,
					onEnter: () =>
						gsap.to(el, {
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: "power2.out",
							clearProps: "all",
						}),
				})
			);
		});
		return () => triggers.forEach((t) => t.kill());
	}, []);

	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${
			loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
		}`;

	return (
		<Layout
			title={`${CHEAT_SHEET_META.title} — ${METADATA.title}`}
			description={DESCRIPTION}
			path="/notebook/color-cheat-sheet/"
		>
			<Header />
			<ProgressIndicator />
			<main className="flex-col flex">
				<div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1" />

				{/* Hero */}
				<section className="w-full relative select-none section-container pt-32 md:pt-40 pb-8 md:pb-10 overflow-hidden">
					<div
						aria-hidden
						className="pointer-events-none absolute -top-24 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#3B82F6]/20 blur-[120px]"
					/>
					<div className="relative z-10 flex flex-col">
						<Link href="/notebook">
							<a
								className={`link text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#93C5FD] w-fit mb-5 ${reveal(
									"delay-100"
								)}`}
								onClick={() => trackEvent("cheat_sheet_back_to_notebook")}
							>
								<span aria-hidden>← </span>Notebook
							</a>
						</Link>
						<p
							className={`text-[#93C5FD] text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4 ${reveal(
								"delay-200"
							)}`}
						>
							Cheat sheet
						</p>
						<h1
							className={`text-gradient w-fit font-bold leading-[1.1] pb-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${reveal(
								"delay-300"
							)}`}
						>
							{CHEAT_SHEET_META.title}
						</h1>
						<div
							className={`h-1 mt-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] transition-[width,opacity] duration-700 delay-500 ease-out ${
								loaded ? "w-24 opacity-100" : "w-0 opacity-0"
							}`}
						/>
						<p
							className={`text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mt-7 ${reveal(
								"delay-700"
							)}`}
						>
							{CHEAT_SHEET_META.lede}
						</p>
						<span
							className={`text-xs uppercase tracking-[0.15em] text-gray-500 mt-6 ${reveal(
								"delay-1000"
							)}`}
						>
							{CHEAT_SHEET_META.hint}
						</span>
					</div>
				</section>

				{/* Jump nav. Sticks at top-0: the site header hides on scroll-down,
				    so a header-height offset would leave a gap; on scroll-up the
				    header (z-50) simply slides back over it. */}
				<nav
					aria-label="Sections"
					className="sticky top-0 z-30 w-full bg-gray-900/85 backdrop-blur-md border-y border-white/5 py-2.5"
				>
					<div className="section-container flex gap-2 overflow-x-auto">
						{SECTIONS.map((s) => (
							<a
								key={s.id}
								href={`#${s.id}`}
								className="link flex-none text-xs font-medium px-3 py-1.5 rounded-full border border-gray-700/70 text-gray-400 hover:border-[#3B82F6]/50 hover:text-[#93C5FD] whitespace-nowrap transition-colors duration-[10ms]"
								onClick={() =>
									trackEvent("cheat_sheet_jump", { section: s.id })
								}
							>
								{s.label}
							</a>
						))}
					</div>
				</nav>

				<div className="section-container pt-8 md:pt-10">
					<HowToUse />
				</div>

				<Section
					id="need-color"
					number="01"
					title="Start here: do you need color at all?"
				>
					<DecisionGates />
				</Section>

				<Section
					id="palette-types"
					number="02"
					title="If you do need a palette"
				>
					<PaletteTypes />
					<div className="mt-6">
						<SymptomTable />
					</div>
				</Section>

				<Section
					id="worth-knowing"
					number="03"
					title="Three things worth knowing"
				>
					<ThreeRules />
					<div className="mt-5">
						<FiveDials />
					</div>
				</Section>

				<Section
					id="by-feeling"
					number="04"
					title="By feeling"
				>
					<div className="space-y-6">
						{MOOD_PALETTES.map((card) => (
							<PaletteCard key={card.slug} card={card} />
						))}
					</div>
				</Section>

				<Section
					id="by-industry"
					number="05"
					title="By industry"
				>
					<div className="space-y-6">
						{INDUSTRY_PALETTES.map((card) => (
							<PaletteCard key={card.slug} card={card} />
						))}
					</div>
				</Section>

				<Section
					id="non-negotiables"
					number="06"
					title="Non-negotiables"
				>
					<NonNegotiables />
				</Section>

				<Section id="glossary" title="Glossary">
					<Glossary />
				</Section>

				<Section
					id="references"
					number="07"
					title="References & further reading"
				>
					<References />
					<div className="mt-8 space-y-3 max-w-3xl">
						{DISCLAIMERS.map((text, i) => (
							<p
								key={i}
								className="text-[12.5px] text-gray-500 leading-relaxed"
							>
								{text}
							</p>
						))}
					</div>
				</Section>

				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
