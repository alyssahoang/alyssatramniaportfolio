import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { METADATA } from "../../constants";
import {
	CHEAT_SHEET_META,
	DISCLAIMERS,
	IPaletteCard,
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

interface INavSection {
	id: string;
	/** Section number as in the original sheet; the glossary has none. */
	n: string;
	label: string;
	/** Palette cards listed under the section in the sidebar. */
	children?: IPaletteCard[];
}

const SECTIONS: INavSection[] = [
	{ id: "need-color", n: "1", label: "Do you need color at all?" },
	{ id: "palette-types", n: "2", label: "If you do need a palette" },
	{ id: "worth-knowing", n: "3", label: "Three things worth knowing" },
	{ id: "by-feeling", n: "4", label: "By feeling", children: MOOD_PALETTES },
	{ id: "by-industry", n: "5", label: "By industry", children: INDUSTRY_PALETTES },
	{ id: "non-negotiables", n: "6", label: "Non-negotiables" },
	{ id: "glossary", n: "", label: "Glossary" },
	{ id: "references", n: "7", label: "References" },
];

// How far below the viewport top a heading must pass to count as "current".
// Clears the fixed site header when it is showing.
const SPY_OFFSET = 140;

// Section shell: the heading gets the site's clip-path wipe on scroll-in.
const Section = ({
	id,
	number,
	title,
	children,
}: {
	id: string;
	number?: string;
	title: string;
	children: React.ReactNode;
}) => {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const wipe = initHeadingWipe(ref.current);
		return () => wipe?.kill();
	}, []);

	return (
		<section ref={ref} id={id} className="w-full relative select-none py-8 md:py-12 flex flex-col scroll-mt-28">
			<div className="flex flex-col mb-7">
				{number && (
					<span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
						{number}
					</span>
				)}
				<h2 className="section-heading seq">{title}</h2>
			</div>
			{children}
		</section>
	);
};

// Keep the active item inside a scrolling container without moving the page.
const revealIn = (container: HTMLElement | null, selector: string, axis: "x" | "y") => {
	if (!container) return;
	const item = container.querySelector<HTMLElement>(selector);
	if (!item) return;
	const pad = 24;
	if (axis === "y") {
		const top = item.offsetTop;
		const bottom = top + item.offsetHeight;
		if (top < container.scrollTop + pad) container.scrollTop = top - pad;
		else if (bottom > container.scrollTop + container.clientHeight - pad)
			container.scrollTop = bottom - container.clientHeight + pad;
	} else {
		const left = item.offsetLeft;
		const right = left + item.offsetWidth;
		if (left < container.scrollLeft + pad) container.scrollLeft = left - pad;
		else if (right > container.scrollLeft + container.clientWidth - pad)
			container.scrollLeft = right - container.clientWidth + pad;
	}
};

export default function ColorCheatSheet() {
	const [loaded, setLoaded] = useState(false);
	const [active, setActive] = useState(SECTIONS[0].id);
	const [activeCard, setActiveCard] = useState<string | null>(null);
	// Sidebar groups the reader opened or closed by hand; otherwise a group
	// follows the scroll position (open while you are inside it).
	const [manual, setManual] = useState<Record<string, boolean>>({});
	const sidebarRef = useRef<HTMLElement>(null);
	const chipsRef = useRef<HTMLDivElement>(null);

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
						gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" }),
				})
			);
		});
		return () => triggers.forEach((t) => t.kill());
	}, []);

	// Scroll spy: the current section is the last one whose top has passed
	// SPY_OFFSET; inside a palette section, likewise for its cards. Measured
	// once per animation frame at most.
	useEffect(() => {
		let frame = 0;
		const measure = () => {
			frame = 0;
			let current = SECTIONS[0].id;
			for (const s of SECTIONS) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = s.id;
			}
			let card: string | null = null;
			const section = SECTIONS.find((s) => s.id === current);
			for (const c of section?.children ?? []) {
				const el = document.getElementById(`palette-${c.slug}`);
				if (el && el.getBoundingClientRect().top <= SPY_OFFSET) card = c.slug;
			}
			setActive(current);
			setActiveCard(card);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	useEffect(() => {
		const key = activeCard ? `palette-${activeCard}` : active;
		revealIn(sidebarRef.current, `[data-nav="${key}"]`, "y");
		revealIn(chipsRef.current, `[data-chip="${active}"]`, "x");
	}, [active, activeCard]);

	const isOpen = (id: string) => manual[id] ?? active === id;

	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

	const jump = (target: string) => trackEvent("cheat_sheet_jump", { section: target });

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
				<section
					id="top"
					className="w-full relative select-none section-container pt-32 md:pt-40 pb-8 md:pb-10 overflow-hidden"
				>
					<div
						aria-hidden
						className="pointer-events-none absolute -top-24 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#219190]/20 blur-[120px]"
					/>
					<div className="relative z-10 flex flex-col">
						<Link href="/notebook">
							<a
								className={`link text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#57C785] w-fit mb-5 ${reveal("delay-100")}`}
								onClick={() => trackEvent("cheat_sheet_back_to_notebook")}
							>
								<span aria-hidden>← </span>Notebook
							</a>
						</Link>
						<p
							className={`text-[#57C785] text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4 ${reveal("delay-200")}`}
						>
							Cheat sheet
						</p>
						<h1
							className={`text-gradient w-fit font-bold leading-[1.1] pb-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${reveal("delay-300")}`}
						>
							{CHEAT_SHEET_META.title}
						</h1>
						<div
							className={`h-1 mt-6 rounded-full bg-gradient-to-r from-[#219190] to-[#57C785] transition-[width,opacity] duration-700 delay-500 ease-out ${
								loaded ? "w-24 opacity-100" : "w-0 opacity-0"
							}`}
						/>
						<p className={`text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mt-7 ${reveal("delay-700")}`}>
							{CHEAT_SHEET_META.lede}
						</p>
						<span className={`text-xs uppercase tracking-[0.15em] text-gray-500 mt-6 ${reveal("delay-1000")}`}>
							{CHEAT_SHEET_META.hint}
						</span>
					</div>
				</section>

				{/* Phone / tablet: horizontal jump bar. Sticks at top-0 because the
				    site header hides on scroll-down; the header (z-50) slides back
				    over it on scroll-up. Replaced by the sidebar from lg up. */}
				<nav
					aria-label="Sections"
					className="lg:hidden sticky top-0 z-30 w-full bg-gray-900/85 backdrop-blur-md border-y border-white/5 py-2.5"
				>
					<div ref={chipsRef} className="relative section-container flex gap-2 overflow-x-auto">
						{SECTIONS.map((s) => {
							const on = active === s.id;
							return (
								<a
									key={s.id}
									data-chip={s.id}
									href={`#${s.id}`}
									aria-current={on ? "location" : undefined}
									className={`link flex-none text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors duration-[10ms] ${
										on
											? "border-[#219190]/60 bg-[#219190]/15 text-[#57C785]"
											: "border-gray-700/70 text-gray-400 hover:border-[#219190]/50 hover:text-[#57C785]"
									}`}
									onClick={() => jump(s.id)}
								>
									{s.n && <span className="opacity-60 mr-1">{s.n}</span>}
									{s.label}
								</a>
							);
						})}
					</div>
				</nav>

				<div className="section-container">
					<div className="lg:grid lg:grid-cols-[14.5rem,minmax(0,1fr)] lg:gap-10 xl:gap-14">
						{/* Desktop: sticky "On this page" sidebar */}
						<aside className="hidden lg:block">
							<nav
								ref={sidebarRef}
								aria-label="On this page"
								className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pt-10 pb-8 pr-2"
							>
								<p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 pl-4">
									On this page
								</p>
								<ol className="list-none m-0 p-0 border-l border-white/10">
									{SECTIONS.map((s) => {
										const on = active === s.id;
										const open = !!s.children && isOpen(s.id);
										return (
											<li key={s.id}>
												<div className="flex items-center">
													<a
														data-nav={s.id}
														href={`#${s.id}`}
														aria-current={on && !activeCard ? "location" : undefined}
														className={`link flex-grow -ml-px border-l-2 py-1.5 pl-3.5 pr-1 text-[13px] leading-snug transition-colors duration-[10ms] ${
															on
																? "border-[#219190] text-white font-medium"
																: "border-transparent text-gray-400 hover:text-gray-200 hover:border-white/30"
														}`}
														onClick={() => jump(s.id)}
													>
														{s.n && (
															<span className="font-mono text-[11px] text-gray-500 mr-2">{s.n}</span>
														)}
														{s.label}
													</a>
													{s.children && (
														<button
															type="button"
															aria-expanded={open}
															aria-label={`${open ? "Collapse" : "Expand"} ${s.label}`}
															onClick={() => setManual((m) => ({ ...m, [s.id]: !open }))}
															className="flex-none w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#57C785] rounded"
														>
															<span
																aria-hidden
																className={`inline-block text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
															>
																⌄
															</span>
														</button>
													)}
												</div>
												{s.children && open && (
													<ol className="list-none m-0 p-0 pb-1.5">
														{s.children.map((c) => {
															const cardOn = on && activeCard === c.slug;
															return (
																<li key={c.slug}>
																	<a
																		data-nav={`palette-${c.slug}`}
																		href={`#palette-${c.slug}`}
																		aria-current={cardOn ? "location" : undefined}
																		className={`link block -ml-px border-l-2 py-1 pl-7 pr-1 text-[12px] leading-snug transition-colors duration-[10ms] ${
																			cardOn
																				? "border-[#57C785] text-[#57C785]"
																				: "border-transparent text-gray-500 hover:text-gray-300"
																		}`}
																		onClick={() => jump(`palette-${c.slug}`)}
																	>
																		{c.title}
																	</a>
																</li>
															);
														})}
													</ol>
												)}
											</li>
										);
									})}
								</ol>
								<a
									href="#top"
									className="link inline-block mt-5 pl-4 text-xs text-gray-500 hover:text-[#57C785]"
									onClick={() => jump("top")}
								>
									↑ Back to top
								</a>
							</nav>
						</aside>

						<div className="min-w-0">
							<div className="pt-8 md:pt-10">
								<HowToUse />
							</div>

							<Section id="need-color" number="01" title="Start here: do you need color at all?">
								<DecisionGates />
							</Section>

							<Section id="palette-types" number="02" title="If you do need a palette">
								<PaletteTypes />
								<div className="mt-6">
									<SymptomTable />
								</div>
							</Section>

							<Section id="worth-knowing" number="03" title="Three things worth knowing">
								<ThreeRules />
							</Section>

							<Section id="by-feeling" number="04" title="By feeling">
								<FiveDials />
								<div className="space-y-6 mt-6">
									{MOOD_PALETTES.map((card) => (
										<PaletteCard key={card.slug} card={card} />
									))}
								</div>
							</Section>

							<Section id="by-industry" number="05" title="By industry">
								<div className="space-y-6">
									{INDUSTRY_PALETTES.map((card) => (
										<PaletteCard key={card.slug} card={card} />
									))}
								</div>
							</Section>

							<Section id="non-negotiables" number="06" title="Non-negotiables">
								<NonNegotiables />
							</Section>

							<Section id="glossary" title="Glossary">
								<Glossary />
							</Section>

							<Section id="references" number="07" title="References & further reading">
								<References />
								<div className="mt-8 space-y-3 max-w-3xl">
									{DISCLAIMERS.map((text, i) => (
										<p key={i} className="text-[12.5px] text-gray-500 leading-relaxed">
											{text}
										</p>
									))}
								</div>
							</Section>
						</div>
					</div>
				</div>

				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
