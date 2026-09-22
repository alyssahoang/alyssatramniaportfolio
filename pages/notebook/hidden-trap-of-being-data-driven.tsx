import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { METADATA } from "../../constants";
import {
	DATA_DRIVEN_DISCLAIMER,
	DATA_DRIVEN_META,
	DATA_DRIVEN_REFERENCES,
	DATA_DRIVEN_REFERENCES_LEDE,
	DATA_DRIVEN_SECTIONS,
} from "../../content/data-driven-trap";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import {
	ActiveUsers,
	EngagementVsConversion,
	FiveLayers,
	JoinFanOut,
	MeetingSlide,
	SignalOrNoise,
	TrafficMix,
} from "@/components/notebook/blog/data-driven-figures";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import { trackEvent } from "../../utils/clarity";

const PATH = `/notebook/${DATA_DRIVEN_META.slug}/`;

// How far below the viewport top a heading must pass to count as "current".
// Clears the fixed site header when it is showing.
const SPY_OFFSET = 140;

// ---------------------------------------------------------------------------
// Prose building blocks. The wording is the author's; these only set type.
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

const Bullets = ({ items }: { items: React.ReactNode[] }) => (
	<ul className="list-none p-0 mb-5 space-y-1.5">
		{items.map((item, i) => (
			<li key={i} className="text-base md:text-[17px] text-gray-300 leading-relaxed pl-5 relative">
				<span aria-hidden className="absolute left-0 top-[0.7em] w-1.5 h-1.5 rounded-full bg-[#219190]" />
				{item}
			</li>
		))}
	</ul>
);

const Section = ({
	id,
	n,
	title,
	children,
}: {
	id: string;
	n?: string;
	title: string;
	children: React.ReactNode;
}) => (
	<section id={id} className="scroll-mt-28 pt-10 md:pt-14">
		<h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6 [text-wrap:balance]">
			{n && (
				<span className="font-mono text-sm text-gray-500 align-middle mr-3">{n.padStart(2, "0")}</span>
			)}
			<span className="text-gradient">{title}</span>
		</h2>
		{children}
	</section>
);

const References = () => {
	const total = DATA_DRIVEN_REFERENCES.reduce((sum, g) => sum + g.items.length, 0);
	return (
		<div>
			<P>{DATA_DRIVEN_REFERENCES_LEDE}</P>
			<details
				className="group"
				onToggle={(e) => {
					if ((e.currentTarget as HTMLDetailsElement).open)
						trackEvent("blog_references_open", { post: DATA_DRIVEN_META.slug });
				}}
			>
				<summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden inline-flex items-center text-sm font-medium text-[#57C785] hover:text-white transition-colors duration-[10ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#219190] rounded-sm">
					<span className="group-open:hidden">See more</span>
					<span className="hidden group-open:inline">Show less</span>
					<span aria-hidden className="inline-block ml-1.5 transition-transform duration-200 group-open:rotate-180">
						⌄
					</span>
					<span className="ml-3 text-gray-500 font-normal">{total} sources — books and papers</span>
				</summary>
				<div className="mt-6 space-y-8">
					{DATA_DRIVEN_REFERENCES.map((group) => (
						<div key={group.group}>
							<h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">{group.group}</h3>
							<ol className="list-none p-0 m-0 space-y-4">
								{group.items.map((ref) => (
									<li key={ref.n} className="flex gap-3">
										<span className="flex-none font-mono text-[11px] text-gray-600 mt-0.5 w-7">[{ref.n}]</span>
										<div className="min-w-0">
											<p className="text-sm text-gray-300 leading-relaxed">{ref.citation}</p>
											{ref.note && (
												<p className="text-[12.5px] text-gray-500 leading-relaxed mt-1">{ref.note}</p>
											)}
											{ref.url && (
												<a
													href={ref.url}
													target="_blank"
													rel="noreferrer"
													className="link inline-block font-mono text-[11px] text-[#57C785]/80 hover:text-[#57C785] mt-1 break-all"
												>
													{ref.url}
												</a>
											)}
										</div>
									</li>
								))}
							</ol>
						</div>
					))}
				</div>
			</details>
			<p className="text-[12.5px] text-gray-500 leading-relaxed mt-8">{DATA_DRIVEN_DISCLAIMER}</p>
		</div>
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

export default function HiddenTrapOfBeingDataDriven() {
	const [loaded, setLoaded] = useState(false);
	const [active, setActive] = useState<string | null>(null);
	const sidebarRef = useRef<HTMLElement>(null);
	const chipsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Scroll spy: the current section is the last one whose top has passed
	// SPY_OFFSET. Measured once per animation frame at most.
	useEffect(() => {
		let frame = 0;
		const measure = () => {
			frame = 0;
			let current: string | null = null;
			for (const s of DATA_DRIVEN_SECTIONS) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = s.id;
			}
			setActive(current);
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
		if (!active) return;
		revealIn(sidebarRef.current, `[data-nav="${active}"]`, "y");
		revealIn(chipsRef.current, `[data-chip="${active}"]`, "x");
	}, [active]);

	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

	const jump = (target: string) => trackEvent("blog_jump", { post: DATA_DRIVEN_META.slug, section: target });

	return (
		<Layout
			title={`${DATA_DRIVEN_META.title} — ${METADATA.title}`}
			description={DATA_DRIVEN_META.description}
			path={PATH}
			image={DATA_DRIVEN_META.image}
			imageAlt={DATA_DRIVEN_META.imageAlt}
			imageWidth={2400}
			imageHeight={1350}
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
								onClick={() => trackEvent("blog_back_to_notebook", { post: DATA_DRIVEN_META.slug })}
							>
								<span aria-hidden>← </span>Notebook
							</a>
						</Link>
						<p
							className={`text-[#57C785] text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4 ${reveal("delay-200")}`}
						>
							Blog
						</p>
						<h1
							className={`text-gradient w-fit max-w-4xl font-bold leading-[1.1] pb-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${reveal("delay-300")}`}
						>
							{DATA_DRIVEN_META.title}
						</h1>
						<div
							className={`h-1 mt-6 rounded-full bg-gradient-to-r from-[#219190] to-[#57C785] transition-[width,opacity] duration-700 delay-500 ease-out ${
								loaded ? "w-24 opacity-100" : "w-0 opacity-0"
							}`}
						/>
						<p className={`text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mt-7 ${reveal("delay-700")}`}>
							{DATA_DRIVEN_META.lede}
						</p>
						<span className={`text-xs uppercase tracking-[0.15em] text-gray-500 mt-6 ${reveal("delay-1000")}`}>
							{DATA_DRIVEN_META.date} · {DATA_DRIVEN_META.readTime}
						</span>
					</div>
				</section>

				{/* Phone / tablet: horizontal jump bar, replaced by the sidebar from lg up. */}
				<nav
					aria-label="Sections"
					className="lg:hidden sticky top-0 z-30 w-full bg-gray-900/85 backdrop-blur-md border-y border-white/5 py-2.5"
				>
					<div ref={chipsRef} className="relative section-container flex gap-2 overflow-x-auto">
						{DATA_DRIVEN_SECTIONS.map((s) => {
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
								<p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 pl-4">On this page</p>
								<ol className="list-none m-0 p-0 border-l border-white/10">
									{DATA_DRIVEN_SECTIONS.map((s) => {
										const on = active === s.id;
										return (
											<li key={s.id}>
												<a
													data-nav={s.id}
													href={`#${s.id}`}
													aria-current={on ? "location" : undefined}
													className={`link block -ml-px border-l-2 py-1.5 pl-3.5 pr-1 text-[13px] leading-snug transition-colors duration-[10ms] ${
														on
															? "border-[#219190] text-white font-medium"
															: "border-transparent text-gray-400 hover:text-gray-200 hover:border-white/30"
													}`}
													onClick={() => jump(s.id)}
												>
													{s.n && <span className="font-mono text-[11px] text-gray-500 mr-2">{s.n}</span>}
													{s.label}
												</a>
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

						<article className="min-w-0 max-w-3xl pt-8 md:pt-10 pb-12">
							<P>
								Instead of relying on opinions, intuition, or whoever speaks the loudest in the room, we look at
								customer behavior, conversion, revenue, retention, and hundreds of other signals before making a
								decision.
							</P>
							<P>
								And in principle, that is a good thing. Data can help us challenge assumptions, understand what
								users are actually doing, and make decisions based on evidence rather than instinct.
							</P>
							<P>
								<Strong>But being data-driven does not automatically mean being objective.</Strong>
							</P>
							<P>
								Sometimes the data is completely real, the dashboard is working, the SQL query runs without errors,
								and we still arrive at the wrong conclusion.
							</P>
							<P>
								The hidden trap is not always bad data. Sometimes it is how we choose, define, calculate, and
								interpret that data.
							</P>

							<Section id="choosing" n="1" title="We choose what to measure">
								<P>
									Most companies do not suffer from having too little data. They often have the opposite problem:
									hundreds, sometimes thousands, of metrics.
								</P>
								<P>
									Revenue. Conversion. Retention. Click-through rate. Daily active users. Average order value.
									Session duration. Customer acquisition cost.
								</P>
								<P>
									But which one should we look at? The moment we choose one metric over another, we are already
									making a subjective decision.
								</P>
								<P>
									Imagine a product team launches a new feature. Engagement increases by 20%. That sounds like a
									success.
								</P>
								<P>
									But what if retention stays flat? What if customers use the feature more because it adds
									unnecessary steps? What if engagement increases while conversion decreases?
								</P>
								<EngagementVsConversion />
								<P>
									The metric itself may be correct. The problem is that we selected one number and treated it as
									the full story.
								</P>
								<P>Before asking, “What does the data say?”, perhaps we should first ask:</P>
								<Ask>Why did we choose this particular metric to represent success?</Ask>
							</Section>

							<Section id="definition" n="2" title="A metric name can hide a complicated definition">
								<P>Some metrics sound so familiar that we rarely question them.</P>
								<P>
									Take “active users.” What is an active user? Someone who logs in? Someone who opens the app?
									Someone who performs a specific action? Someone who spends more than a certain amount of time
									using the product?
								</P>
								<ActiveUsers />
								<P>
									Different teams can use the same metric name while measuring completely different behavior. The
									same applies to revenue, conversion, churn, retention, or even customer.
								</P>
								<P>A dashboard might simply display:</P>
								<p className="inline-block font-mono text-[15px] text-white bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-2 mb-5">
									Conversion Rate: 4.8%
								</p>
								<P>But behind that number are many decisions.</P>
								<P>
									What counts as a conversion? What is the denominator? Are cancelled transactions included? Are
									returning customers treated differently? What time period is being used? Which timezone? Are test
									accounts excluded?
								</P>
								<P>
									A metric can be technically correct and still be misunderstood. For important metrics,
									understanding the definition is just as important as reading the value.
								</P>
							</Section>

							<Section id="query" n="3" title="A query can run perfectly and still be wrong">
								<P>A SQL query can execute successfully and still produce the wrong result.</P>
								<Bullets
									items={[
										"A join can duplicate records.",
										"A filter can unintentionally exclude a customer group.",
										"NULL values can behave differently from what we expected.",
										"A date condition can shift transactions into the wrong period.",
										"A timezone issue can make yesterday's activity appear today.",
									]}
								/>
								<P>
									The number may still look reasonable. That is exactly what makes these mistakes difficult to
									detect.
								</P>
								<JoinFanOut />
								<P>An obvious error is usually easy to catch.</P>
								<Ask>A plausible but incorrect number is much more dangerous.</Ask>
								<P>
									This becomes even more relevant as AI tools help analysts generate SQL. AI can make us much
									faster: it can help us write queries, explore unfamiliar databases, or build prototypes in
									minutes.
								</P>
								<P>
									But speed does not remove the need for validation. A query generated in seconds can still contain
									assumptions that do not match the business logic.
								</P>
								<P>
									The question should not only be <Strong>“Does this query run?”</Strong> It should also be:
								</P>
								<Ask>Does this query actually answer the question I am asking?</Ask>
							</Section>

							<Section id="context" n="4" title="Numbers without context can be misleading">
								<P>Imagine someone tells you:</P>
								<p className="text-xl md:text-2xl text-white font-medium my-6">“Conversion dropped by 15%.”</p>
								<P>Should you be worried? Maybe. But we still do not know enough.</P>
								<P>
									Compared with yesterday? Last month? The same period last year? Is the drop bigger than the
									normal week-to-week movement, or is it just noise?
								</P>
								<SignalOrNoise />
								<P>
									Did the traffic source change? Was there a promotion last week? Did mobile traffic increase? Did
									a large marketing campaign bring in lower-intent visitors? Did the definition of conversion
									change?
								</P>
								<TrafficMix />
								<P>
									A number in isolation rarely explains what happened. Trends, segments, historical comparisons,
									seasonality, customer mix, and operational changes can completely change the interpretation.
								</P>
							</Section>

							<Section id="confirmation" n="5" title="Sometimes we use data to confirm what we already believe">
								<P>
									This may be the hardest trap to recognize, because the problem is no longer inside the database.
									It is inside our interpretation.
								</P>
								<P>Imagine you believe a new feature is performing well.</P>
								<P>You open the dashboard. Engagement is up 20%. Great. Hypothesis confirmed.</P>
								<P>
									But retention is slightly down. Support tickets increased. And one customer segment is using the
									feature much less than before.
								</P>
								<MeetingSlide />
								<Ask>Which number gets mentioned in the meeting? Probably the +20%.</Ask>
								<P>
									We naturally pay more attention to evidence that supports what we already believe. This is
									confirmation bias, and having more data does not automatically protect us from it. In some cases,
									having more metrics simply gives us more opportunities to find one that supports our preferred
									story.
								</P>
								<P>A useful question is:</P>
								<Ask>What data would make me change my mind?</Ask>
								<P>
									That question forces us to look for evidence against our hypothesis, not just evidence supporting
									it.
								</P>
							</Section>

							<Section id="dashboard" n="6" title="The dashboard is the beginning, not the conclusion">
								<P>
									Dashboards help us monitor performance, detect unusual changes, and quickly understand what is
									happening across a business.
								</P>
								<P>
									But a dashboard usually answers <Strong>what happened?</Strong> It does not always answer{" "}
									<Strong>why did it happen?</Strong>
								</P>
								<P>
									That second question often requires deeper investigation: segmenting customers, checking
									operational changes, reviewing the underlying data, talking to users, looking at qualitative
									feedback, running experiments, and understanding the business context.
								</P>
								<P>
									The purpose of a dashboard should not be to eliminate questions. A good dashboard often helps us
									identify better questions.
								</P>
							</Section>

							<Section id="layers" title="A simple way to challenge important numbers">
								<P>For metrics that influence important decisions, I find it useful to think about five layers:</P>
								<FiveLayers />
								<ul className="list-none p-0 mb-6 space-y-2.5">
									{[
										["Selection", "Why this metric, and not another one?"],
										["Definition", "What exactly are we measuring?"],
										["Calculation", "How was the number produced?"],
										["Context", "What else could explain this change?"],
										[
											"Interpretation",
											"What story are we telling based on the number, and what alternative explanation might exist?",
										],
									].map(([name, question]) => (
										<li
											key={name}
											className="grid sm:grid-cols-[8.5rem_1fr] gap-x-4 gap-y-0.5 rounded-xl bg-gray-800/60 border border-gray-700/60 px-4 py-3"
										>
											<span className="font-bold text-white">{name}</span>
											<span className="text-gray-300">{question}</span>
										</li>
									))}
									<li className="rounded-xl border border-[#57C785]/45 px-4 py-3 text-white">
										<span aria-hidden className="text-[#57C785] mr-2">★</span>
										And one more question: what is this metric not telling us?
									</li>
								</ul>
								<P>
									Every metric is a simplified representation of reality. No single number captures everything
									about customers, products, or businesses.
								</P>

								<h2 className="text-2xl md:text-3xl font-bold leading-tight mt-12 mb-6 [text-wrap:balance]">
									<span className="text-gradient">Being data-driven should mean being curious, not just confident</span>
								</h2>
								<P>The goal is not to trust data less. It is to understand it better.</P>
								<P>
									Data is valuable precisely because it helps us challenge assumptions. But that only works if we
									are also willing to challenge the assumptions behind the data itself:
								</P>
								<Bullets
									items={[
										"The metric we selected.",
										"The definition behind it.",
										"The query that calculated it.",
										"The context surrounding it.",
										"And the story we created after seeing it.",
									]}
								/>
								<P>
									Being truly data-driven is not simply saying <Strong>“The numbers say this.”</Strong> Sometimes
									it means asking:
								</P>
								<Ask>How much should we trust this number, and what else could it be telling us?</Ask>
								<p className="text-2xl md:text-[1.7rem] text-white font-medium leading-snug mt-10 mb-4 [text-wrap:balance]">
									Data does not have to be false for us to reach the wrong conclusion.
								</p>
								<P>
									Sometimes the mistake happens in the question, the measurement, or the story we build around the
									number.
								</P>
							</Section>

							<Section id="references" title="References & further reading">
								<References />
							</Section>
						</article>
					</div>
				</div>

				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
