import { METADATA, FAV_ARTICLES, FAVORITE_READS } from "../../constants";
import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import ReadsHero from "@/components/home/reads-hero";
import ReadsFilter, { ICategoryCount } from "@/components/home/reads-filter";
import FavoriteReads from "@/components/home/favorite-reads";
import FavoriteArticles from "@/components/home/favorite-articles";
import CollaborationSection from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";

const DEBOUNCE_TIME = 100;

export const isSmallScreen = (): boolean => document.body.clientWidth < 767;
export const NO_MOTION_PREFERENCE_QUERY =
	"(prefers-reduced-motion: no-preference)";

export default function Reads() {
	gsap.registerPlugin(ScrollTrigger);
	gsap.config({ nullTargetWarn: false });

	const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// One filter across all three sections. `touched` flips permanently on the
	// first filter interaction: from then on the sections skip their GSAP
	// scroll-in (a `once` ScrollTrigger on re-rendered cards below the fold
	// would leave them stuck at opacity 0).
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [touched, setTouched] = useState(false);

	const categories: ICategoryCount[] = useMemo(() => {
		const counts = new Map<string, number>();
		[...FAV_ARTICLES, ...FAVORITE_READS].forEach((item) =>
			counts.set(item.category, (counts.get(item.category) ?? 0) + 1)
		);
		return Array.from(counts, ([category, count]) => ({ category, count }));
	}, []);

	const handleFilter = (category: string | null) => {
		setActiveCategory(category);
		setTouched(true);
	};

	const byCategory = <T extends { category: string }>(items: T[]): T[] =>
		activeCategory ? items.filter((i) => i.category === activeCategory) : items;

	const articles = byCategory(FAV_ARTICLES);
	const reads = byCategory(FAVORITE_READS);

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

	return (
		<>
			<Layout title={`Favorite Reads — ${METADATA.title}`} path="/aboutme/reads">
				<Header />
				<ProgressIndicator />
				<div className="flex-col flex">
					{renderBackdrop()}
					<ReadsHero />
					<ReadsFilter
						categories={categories}
						active={activeCategory}
						onChange={handleFilter}
					/>
					{articles.length > 0 && (
						<FavoriteArticles items={articles} animate={!touched} />
					)}
					{articles.length > 0 && reads.length > 0 && (
						<div className="section-divider my-4 md:my-6" />
					)}
					{reads.length > 0 && (
						<FavoriteReads items={reads} animate={!touched} />
					)}
					{articles.length === 0 && reads.length === 0 && (
						<p className="section-container text-center text-gray-500 py-16">
							Nothing filed under &ldquo;{activeCategory}&rdquo; yet — check
							back soon.
						</p>
					)}
					<CollaborationSection />
					<Footer />
				</div>
				<Scripts />
			</Layout>
		</>
	);
}
