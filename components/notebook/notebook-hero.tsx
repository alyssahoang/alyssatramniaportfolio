import React, { useEffect, useRef, useState } from "react";
import { NOTEBOOK_LAST_UPDATED } from "../../constants";
import { trackEvent } from "../../utils/clarity";

// Classes applied to a random card by the shuffle chip, then removed. Kept as
// full literal strings so Tailwind's scanner generates them.
const PULSE_CLASSES = [
	"ring-2",
	"ring-[#219190]",
	"ring-offset-2",
	"ring-offset-gray-900",
];

// Typographic, photo-free hero for the Notebook page. Same entrance
// choreography as the Reads hero (a `loaded` flag driving a staggered
// fade/translate-up) so the two secondary pages feel like siblings.
const NotebookHero = ({
	stats = [],
	showShuffle = false,
}: {
	/** Short meta fragments joined with "·" under the tagline. */
	stats?: string[];
	/** Only offered when there are note cards on the page to shuffle to. */
	showShuffle?: boolean;
}) => {
	const [loaded, setLoaded] = useState(false);
	const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => {
			clearTimeout(timer);
			if (pulseTimer.current) clearTimeout(pulseTimer.current);
		};
	}, []);

	// Scroll to a random note and pulse a blue ring on it — the answer to
	// "where do I start?" on a page with no obvious reading order.
	const randomNote = () => {
		const cards = document.querySelectorAll<HTMLElement>("[data-note-card]");
		if (!cards.length) return;
		const pick = cards[Math.floor(Math.random() * cards.length)];

		cards.forEach((c) => c.classList.remove(...PULSE_CLASSES));
		pick.scrollIntoView({ behavior: "smooth", block: "center" });
		pick.classList.add(...PULSE_CLASSES);

		if (pulseTimer.current) clearTimeout(pulseTimer.current);
		pulseTimer.current = setTimeout(
			() => pick.classList.remove(...PULSE_CLASSES),
			1600
		);

		trackEvent("notebook_shuffle");
	};

	const reveal = (delay: string) =>
		`transition-all duration-1000 ${delay} ${
			loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
		}`;

	return (
		<section
			className="w-full relative select-none section-container pt-32 md:pt-40 pb-10 md:pb-14 overflow-hidden"
			id="notebook-hero"
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
					Learning in public
				</p>
				<h1
					className={`text-gradient w-fit font-bold leading-[1.1] pb-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${reveal(
						"delay-300"
					)}`}
				>
					Notebook
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
					Everything I learn about data science, written down before I forget
					it.
				</p>
				{/* The shuffle chip needs note cards to jump to, and the counts need
				    something to count — an empty notebook shows neither. */}
				{(showShuffle || stats.length > 0) && (
					<div
						className={`flex flex-wrap items-center gap-x-5 gap-y-3 mt-8 ${reveal(
							"delay-1000"
						)}`}
					>
						{showShuffle && (
							<button
								type="button"
								onClick={randomNote}
								className="font-mono text-sm text-[#57C785] bg-[#219190]/10 border border-[#219190]/30 rounded-lg px-4 py-2 hover:border-[#219190]/60 hover:bg-[#219190]/20 transition-all duration-[10ms]"
							>
								<span aria-hidden>🎲 </span>Open a note at random
							</button>
						)}
						{stats.length > 0 && (
							<span className="text-xs uppercase tracking-[0.15em] text-gray-500">
								{stats.join(" · ")} · updated {NOTEBOOK_LAST_UPDATED}
							</span>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default NotebookHero;
