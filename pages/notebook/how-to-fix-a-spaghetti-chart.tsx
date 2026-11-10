import React, { useEffect, useState } from "react";
import Link from "next/link";

import { METADATA } from "../../constants";
import {
	SPAGHETTI_DOWNLOAD,
	SPAGHETTI_FIXES,
	SPAGHETTI_META,
	SPAGHETTI_QUESTIONS,
} from "../../content/spaghetti-chart";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import { trackEvent } from "../../utils/clarity";

const PATH = `/notebook/${SPAGHETTI_META.slug}/`;

// ---------------------------------------------------------------------------
// Prose building blocks, same type scale as the other Notebook posts.
// ---------------------------------------------------------------------------

const P = ({ children }: { children: React.ReactNode }) => (
	<p className="text-base md:text-[17px] text-gray-300 leading-relaxed mb-5">{children}</p>
);

const Strong = ({ children }: { children: React.ReactNode }) => (
	<strong className="text-white font-medium">{children}</strong>
);

// A line the argument turns on: set larger, with the site's teal rule.
const Ask = ({ children }: { children: React.ReactNode }) => (
	<p className="text-xl md:text-2xl text-white font-medium leading-snug border-l-2 border-[#219190] pl-4 my-7 [text-wrap:balance]">
		{children}
	</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
	<h2 className="text-2xl md:text-3xl font-bold leading-tight mt-12 mb-6 [text-wrap:balance]">
		<span className="text-gradient">{children}</span>
	</h2>
);

export default function HowToFixASpaghettiChart() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

	return (
		<Layout
			title={`${SPAGHETTI_META.title} — ${METADATA.title}`}
			description={SPAGHETTI_META.description}
			path={PATH}
			image={SPAGHETTI_META.image}
			imageAlt={SPAGHETTI_META.imageAlt}
			imageWidth={1920}
			imageHeight={1080}
			type="article"
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
								onClick={() => trackEvent("blog_back_to_notebook", { post: SPAGHETTI_META.slug })}
							>
								<span aria-hidden>← </span>Notebook
							</a>
						</Link>
						<p
							className={`text-[#57C785] text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4 ${reveal("delay-200")}`}
						>
							Before → After · 01
						</p>
						<h1
							className={`text-gradient w-fit max-w-4xl font-bold leading-[1.1] pb-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${reveal("delay-300")}`}
						>
							{SPAGHETTI_META.title}
						</h1>
						<div
							className={`h-1 mt-6 rounded-full bg-gradient-to-r from-[#219190] to-[#57C785] transition-[width,opacity] duration-700 delay-500 ease-out ${
								loaded ? "w-24 opacity-100" : "w-0 opacity-0"
							}`}
						/>
						<p className={`text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mt-7 ${reveal("delay-700")}`}>
							{SPAGHETTI_META.lede}
						</p>
						<span className={`text-xs uppercase tracking-[0.15em] text-gray-500 mt-6 ${reveal("delay-1000")}`}>
							{SPAGHETTI_META.date} · {SPAGHETTI_META.readTime}
						</span>
					</div>
				</section>

				<div className="section-container">
					<article className="min-w-0 max-w-3xl pt-4 md:pt-6 pb-12">
						<figure className="mb-10 lg:-mr-48">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={SPAGHETTI_META.gif}
								alt={SPAGHETTI_META.imageAlt}
								width={1440}
								height={1080}
								loading="eager"
								className="w-full h-auto rounded-2xl border border-white/10"
							/>
							<figcaption className="text-[12.5px] text-gray-500 leading-relaxed mt-3">
								The same 18 lines, drawn six ways. Sample data; client data stays private.
							</figcaption>
						</figure>

						<P>
							Usually the first idea is an interactive chart: add a filter, pick a region, and the mess disappears.
						</P>
						<Ask>
							But the right fix doesn&apos;t depend on the chart. It depends on the questions the client needs
							answered.
						</Ask>
						<P>Theirs were:</P>
						<ol className="list-none p-0 mb-6 space-y-2.5">
							{SPAGHETTI_QUESTIONS.map((q, i) => (
								<li
									key={q}
									className="flex gap-4 items-baseline rounded-xl bg-gray-800/60 border border-gray-700/60 px-4 py-3"
								>
									<span className="font-mono text-sm text-[#57C785]">{i + 1}</span>
									<span className="text-white">{q}</span>
								</li>
							))}
						</ol>

						<H2>Five ways to redraw it</H2>
						<P>So I rebuilt the chart five ways. Each one tells a different story:</P>
						<ol className="list-none p-0 mb-6 space-y-3">
							{SPAGHETTI_FIXES.map((fix, i) => (
								<li
									key={fix.name}
									className={`rounded-xl px-4 py-3.5 ${
										fix.preferred
											? "border border-[#57C785]/45 bg-[#219190]/10"
											: "bg-gray-800/60 border border-gray-700/60"
									}`}
								>
									<div className="flex items-baseline gap-3 mb-1">
										<span className="font-mono text-sm text-gray-500">{i + 1}</span>
										<span className="font-bold text-white">{fix.name}</span>
										{fix.preferred && (
											<span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-[#57C785]">Preferred</span>
										)}
									</div>
									<p className="text-gray-300 leading-relaxed m-0 pl-7">{fix.insight}</p>
								</li>
							))}
						</ol>
						<P>
							We shipped the two small-multiples views. <Strong>Same data, every line visible</Strong>, each layout
							matched to a question.
						</P>
						<P>
							Different questions would have picked a different chart. A regional manager who only ever checks their
							own region? The filter is perfect for that.
						</P>
						<Ask>My way: start with the questions, then choose the chart.</Ask>

						{/* Live report */}
						<section id="live-report" className="scroll-mt-28 mt-12">
							<H2>Explore it live</H2>
							<figure className="lg:-mr-48">
								{/* Tablet and up: the embedded report. Phones get the full-screen link only. */}
								<div className="hidden md:block relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-gray-800/60">
									<iframe
										src={SPAGHETTI_META.embedUrl}
										title={`${SPAGHETTI_META.title} (live Power BI report)`}
										className="absolute inset-0 w-full h-full"
										loading="lazy"
										allowFullScreen
									/>
								</div>
								<figcaption className="text-[12.5px] text-gray-500 leading-relaxed mt-3">
									<span className="md:hidden">The live report works best on a larger screen. </span>
									<a
										href={SPAGHETTI_META.embedUrl}
										target="_blank"
										rel="noreferrer"
										className="link text-[#57C785] hover:text-white whitespace-nowrap"
										onClick={() => trackEvent("blog_report_fullscreen", { post: SPAGHETTI_META.slug })}
									>
										Open the report full screen ↗
									</a>
								</figcaption>
							</figure>
						</section>

						{/* Download */}
						<section
							id="download"
							className="scroll-mt-28 mt-12 rounded-2xl border border-[#219190]/50 bg-gradient-to-br from-[#219190]/15 to-transparent p-6 md:p-8"
						>
							<p className="text-[10px] uppercase tracking-[0.2em] text-[#57C785] mb-2">Free download</p>
							<h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
								Try it on your own data
							</h2>
							<P>
								The Power BI file behind this post, free, with sample data you can swap for your own in about five
								minutes. You need Power BI Desktop (free).
							</P>
							<ul className="list-none p-0 mb-6 space-y-1.5">
								{SPAGHETTI_DOWNLOAD.contents.map((item) => (
									<li key={item} className="text-[15px] text-gray-300 leading-relaxed pl-5 relative">
										<span aria-hidden className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-[#219190]" />
										{item}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap items-center gap-4">
								<a
									href={SPAGHETTI_DOWNLOAD.href}
									download={SPAGHETTI_DOWNLOAD.fileName}
									className="inline-flex items-center gap-2 rounded-full bg-[#219190] hover:bg-[#57C785] text-white font-medium px-6 py-3 min-h-[44px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
									onClick={() => trackEvent("blog_download", { post: SPAGHETTI_META.slug, file: SPAGHETTI_DOWNLOAD.fileName })}
								>
									<span aria-hidden>↓</span> Download the Power BI file
									<span className="text-white/70 text-sm font-normal">(.zip, {SPAGHETTI_DOWNLOAD.size})</span>
								</a>
								<a
									href={SPAGHETTI_DOWNLOAD.github}
									target="_blank"
									rel="noreferrer"
									className="link text-sm text-gray-400 hover:text-[#57C785]"
									onClick={() => trackEvent("blog_github", { post: SPAGHETTI_META.slug })}
								>
									or view it on GitHub ↗
								</a>
							</div>
						</section>

						<p className="text-xl md:text-2xl text-white font-medium leading-snug mt-12 [text-wrap:balance]">
							How would you fix this chart?
						</p>
					</article>
				</div>

				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
