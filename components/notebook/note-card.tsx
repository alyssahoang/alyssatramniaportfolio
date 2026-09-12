import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { INote, notebookTopicColor } from "../../constants";
import CodeBlock from "../common/codeblock";
import { trackEvent } from "../../utils/clarity";
import { prefersReducedMotion } from "../../utils/motion";

// Topic pill in the note's accent color (inline styles — Tailwind cannot
// generate arbitrary-color classes at runtime).
const TopicPill = ({ topic }: { topic: string }) => {
	const color = notebookTopicColor(topic);
	return (
		<span
			className="flex-none text-xs font-medium px-2.5 py-1 rounded-full border"
			style={{
				color,
				borderColor: `${color}4D`,
				backgroundColor: `${color}14`,
			}}
		>
			{topic}
		</span>
	);
};

// One note: the takeaway as the heading, the summary always visible, and the
// reasoning / snippet / source behind a toggle so the page stays skimmable.
// Notes are my own writing, so the card is an <article> with a disclosure
// button — not a link out, the way the Reads cards are.
const NoteCard = ({ note }: { note: INote }) => {
	const [open, setOpen] = useState(false);
	const bodyRef = useRef<HTMLDivElement>(null);
	const hasDetail = Boolean(note.points?.length || note.code || note.source);

	// Fade the detail in on open. Height is left to the browser — animating it
	// would need a measured value and fights the code block's own scrolling.
	useEffect(() => {
		if (!open || !bodyRef.current || prefersReducedMotion()) return;
		gsap.fromTo(
			bodyRef.current,
			{ opacity: 0, y: -6 },
			{ opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "all" }
		);
	}, [open]);

	const toggle = () => {
		setOpen((prev) => {
			if (!prev) trackEvent("note_expand", { note: note.slug });
			return !prev;
		});
	};

	const bodyId = `note-body-${note.slug}`;

	return (
		<article
			id={`note-${note.slug}`}
			data-note-card
			className="group flex flex-col rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-5 md:p-6 transition-all duration-[10ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#219190]/40 hover:shadow-[0_20px_40px_-12px_rgba(33,145,144,0).15)] scroll-mt-28"
		>
			<div className="flex items-center justify-between gap-3 mb-3">
				<TopicPill topic={note.topic} />
				<span className="flex-none text-xs font-medium tracking-wide text-gray-500 uppercase">
					{note.date}
				</span>
			</div>

			<h3 className="font-bold text-white leading-snug text-lg md:text-xl">
				{hasDetail ? (
					<button
						type="button"
						onClick={toggle}
						aria-expanded={open}
						aria-controls={bodyId}
						className="text-left w-full group-hover:text-[#57C785] transition-colors duration-[10ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#219190] rounded-sm"
					>
						{note.title}
					</button>
				) : (
					note.title
				)}
			</h3>

			<p className="text-sm md:text-base text-gray-400 leading-relaxed mt-2.5">
				{note.summary}
			</p>

			{open && hasDetail && (
				<div id={bodyId} ref={bodyRef} className="mt-4">
					{note.points && note.points.length > 0 && (
						<ul className="space-y-2.5 list-none p-0 m-0">
							{note.points.map((point, index) => (
								<li
									key={index}
									className="text-sm text-gray-300 leading-relaxed pl-4 relative"
								>
									<span
										aria-hidden
										className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full bg-[#219190]"
									/>
									{point}
								</li>
							))}
						</ul>
					)}

					{note.code && (
						<div className="mt-4 text-sm rounded-lg overflow-hidden">
							<CodeBlock
								language={note.code.language}
								code={note.code.snippet}
							/>
						</div>
					)}

					{note.source && (
						<a
							href={note.source.url}
							target="_blank"
							rel="noreferrer"
							className="link inline-block mt-4 text-sm text-[#57C785] hover:text-white"
							onClick={() =>
								trackEvent("note_source_click", { note: note.slug })
							}
						>
							{note.source.label} ↗
						</a>
					)}
				</div>
			)}

			<div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-auto pt-4">
				{note.tags && note.tags.length > 0 && (
					<div className="flex flex-wrap gap-x-2 gap-y-1.5 mr-auto">
						{note.tags.map((tag) => (
							<span
								key={tag}
								className="font-mono text-[11px] text-gray-500 bg-white/5 border border-white/5 rounded px-1.5 py-0.5"
							>
								#{tag}
							</span>
						))}
					</div>
				)}
				{hasDetail && (
					<button
						type="button"
						onClick={toggle}
						aria-expanded={open}
						aria-controls={bodyId}
						className="flex-none text-xs font-medium text-[#57C785] hover:text-white transition-colors duration-[10ms]"
					>
						{open ? "Show less" : "Read the reasoning"}
						<span
							aria-hidden
							className={`inline-block ml-1.5 transition-transform duration-200 ${
								open ? "rotate-180" : ""
							}`}
						>
							⌄
						</span>
					</button>
				)}
			</div>
		</article>
	);
};

export default NoteCard;
