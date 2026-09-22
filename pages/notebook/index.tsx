import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { METADATA, NOTEBOOK_GUIDES, NOTEBOOK_POSTS, NOTES } from "../../constants";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import NotebookHero from "@/components/notebook/notebook-hero";
import NotebookFilter, { ITopicCount } from "@/components/notebook/notebook-filter";
import NotebookList from "@/components/notebook/notebook-list";
import GuideList from "@/components/notebook/guide-list";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";

// Register GSAP plugins once at module scope, not on every render.
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
	gsap.config({ nullTargetWarn: false });
}

const DEBOUNCE_TIME = 100;

// Echoes the hero line, but keeps the topic keywords a search engine needs.
const DESCRIPTION =
	"Everything I learn about data science, written down before I forget it — working notes on SQL, statistics, machine learning and data modelling.";

export default function Notebook() {
	const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Topic pills and the search box narrow the same list. `touched` flips
	// permanently on the first interaction: from then on the list skips its
	// GSAP scroll-in, because a `once` ScrollTrigger on re-rendered cards
	// below the fold would leave them stuck invisible.
	const [activeTopic, setActiveTopic] = useState<string | null>(null);
	const [query, setQuery] = useState("");
	const [touched, setTouched] = useState(false);

	// Topics in the order they first appear in NOTES, so the pill row is
	// stable and I control it by ordering the data.
	const topics: ITopicCount[] = useMemo(() => {
		const counts = new Map<string, number>();
		NOTES.forEach((note) =>
			counts.set(note.topic, (counts.get(note.topic) ?? 0) + 1)
		);
		return Array.from(counts, ([topic, count]) => ({ topic, count }));
	}, []);

	const notes = useMemo(() => {
		const needle = query.trim().toLowerCase();
		return NOTES.filter((note) => {
			if (activeTopic && note.topic !== activeTopic) return false;
			if (!needle) return true;
			// Search the whole note, snippet included — the thing I remember
			// months later is often a function name, not the title.
			const haystack = [
				note.title,
				note.summary,
				note.topic,
				...(note.points ?? []),
				...(note.tags ?? []),
				note.code?.snippet ?? "",
			]
				.join(" ")
				.toLowerCase();
			return haystack.includes(needle);
		});
	}, [activeTopic, query]);

	const handleTopic = (topic: string | null) => {
		setActiveTopic(topic);
		setTouched(true);
	};

	const handleQuery = (value: string) => {
		setQuery(value);
		setTouched(true);
	};

	const debouncedDimensionCalculator = useCallback(() => {
		if (resizeTimer.current) clearTimeout(resizeTimer.current);
		resizeTimer.current = setTimeout(() => {
			window.history.scrollRestoration = "manual";
		}, DEBOUNCE_TIME);
	}, []);

	useEffect(() => {
		debouncedDimensionCalculator();

		window.addEventListener("resize", debouncedDimensionCalculator);
		return () => {
			window.removeEventListener("resize", debouncedDimensionCalculator);
			if (resizeTimer.current) clearTimeout(resizeTimer.current);
		};
	}, [debouncedDimensionCalculator]);

	const renderBackdrop = (): React.ReactNode => (
		<div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1"></div>
	);

	const isFiltering = activeTopic !== null || query.trim().length > 0;
	const noNotes = NOTES.length === 0;

	const stats: string[] = [];
	if (NOTEBOOK_POSTS.length)
		stats.push(
			`${NOTEBOOK_POSTS.length} ${NOTEBOOK_POSTS.length === 1 ? "post" : "posts"}`
		);
	if (NOTEBOOK_GUIDES.length)
		stats.push(
			`${NOTEBOOK_GUIDES.length} cheat ${
				NOTEBOOK_GUIDES.length === 1 ? "sheet" : "sheets"
			}`
		);
	if (NOTES.length)
		stats.push(`${NOTES.length} ${NOTES.length === 1 ? "note" : "notes"}`);

	return (
		<Layout
			title={`Notebook — ${METADATA.title}`}
			description={DESCRIPTION}
			// Trailing slash: next.config sets trailingSlash, so the page is
			// served at /notebook/ and the canonical has to match it.
			path="/notebook/"
		>
			<Header />
			<ProgressIndicator />
			<main className="flex-col flex">
				{renderBackdrop()}
				<NotebookHero stats={stats} showShuffle={NOTES.length > 0} />

				<GuideList
					guides={NOTEBOOK_POSTS}
					heading="Blog"
					subheading="Longer reads on how data work actually goes wrong"
					id="blog"
					unit={["post", "posts"]}
					cta="Read the post"
				/>

				<GuideList guides={NOTEBOOK_GUIDES} />

				{/* Three states for the notes: none written yet (no controls to show),
				    notes that match, and notes that exist but not for this filter. */}
				{noNotes ? (
					<div className="section-container py-12 md:py-20">
						<div className="rounded-2xl border border-dashed border-gray-700/60 bg-gray-900/40 px-6 py-12 md:py-16 text-center">
							<p className="text-gray-300 text-lg">
								The first short notes are on their way.
							</p>
							<p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
								I am writing them up as I go — the post and the cheat sheet
								above landed first.
							</p>
						</div>
					</div>
				) : (
					<>
						<NotebookFilter
							topics={topics}
							active={activeTopic}
							onTopicChange={handleTopic}
							query={query}
							onQueryChange={handleQuery}
							resultCount={notes.length}
						/>
						{notes.length > 0 ? (
							<NotebookList notes={notes} animate={!touched} />
						) : (
							<div className="section-container text-center py-16 md:py-24">
								<p className="text-gray-400">
									No note matches that yet
									{query.trim() ? ` — nothing for "${query.trim()}"` : ""}.
								</p>
								{isFiltering && (
									<button
										type="button"
										onClick={() => {
											setActiveTopic(null);
											setQuery("");
										}}
										className="mt-4 text-sm font-medium text-[#57C785] hover:text-white transition-colors duration-[10ms]"
									>
										Clear the filters
									</button>
								)}
							</div>
						)}
					</>
				)}
				<CollaborationSection />
				<Footer />
			</main>
			<Scripts />
		</Layout>
	);
}
