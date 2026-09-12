import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { INote } from "../../constants";
import NoteCard from "./note-card";
import { initHeadingWipe, prefersReducedMotion } from "../../utils/motion";

// The notes grid. Cards rise as they scroll in, the way the Works tiles and
// the Articles list do.
//
// `animate` goes false once the user touches a filter: the cards re-render
// mid-scroll, and a `once` ScrollTrigger on a card that is already below the
// fold would leave it stuck at opacity 0 (the same trap FavoriteArticles
// documents).
const NotebookList = ({
	notes,
	heading = "Notes",
	subheading = "One lesson per card — open a card for the reasoning behind it",
	id = "notes",
	animate = true,
}: {
	notes: INote[];
	heading?: string;
	subheading?: string;
	id?: string;
	animate?: boolean;
}) => {
	const sectionRef = useRef<HTMLElement>(null);
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (!sectionRef.current) return;

		if (!animate || prefersReducedMotion()) {
			cardsRef.current.forEach(
				(el) => el && gsap.set(el, { clearProps: "all" })
			);
			return;
		}

		const triggers: ScrollTrigger[] = [];

		cardsRef.current.forEach((el, idx) => {
			if (!el) return;
			gsap.set(el, { opacity: 0, y: 40 });

			triggers.push(
				ScrollTrigger.create({
					trigger: el,
					start: "top 92%",
					once: true,
					onEnter: () => {
						gsap.to(el, {
							opacity: 1,
							y: 0,
							duration: 0.6,
							// Stagger within a row, not down the whole page.
							delay: (idx % 2) * 0.1,
							ease: "power2.out",
							clearProps: "transform",
						});
					},
				})
			);
		});

		const wipe = initHeadingWipe(sectionRef.current);
		if (wipe) triggers.push(wipe);

		return () => triggers.forEach((t) => t.kill());
	}, [animate, notes]);

	return (
		<section
			ref={sectionRef}
			className="w-full relative select-none section-container py-8 md:py-12 flex flex-col"
			id={id}
		>
			<div className="flex flex-col mb-8">
				<div className="flex items-end gap-3">
					<h2 className="section-heading seq">{heading}</h2>
					<span className="text-sm text-gray-500 font-normal whitespace-nowrap pb-1.5">
						· {notes.length} {notes.length === 1 ? "note" : "notes"}
					</span>
				</div>
				<h3 className="text-xl md:text-2xl md:max-w-3xl w-full seq mt-2 text-gray-200">
					{subheading}
				</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
				{notes.map((note, index) => (
					<div key={note.slug} ref={(el) => (cardsRef.current[index] = el)}>
						<NoteCard note={note} />
					</div>
				))}
			</div>
		</section>
	);
};

export default NotebookList;
