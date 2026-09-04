import React from "react";
import Link from "next/link";

// "Off the clock" — placeholder structure until Alyssa's own photos and stories
// are added (see CONTENT-PLAN.md, idea 8). One card per passion from the resume.
const PASSIONS = [
	{
		title: "Marathon",
		blurb: "Long runs are where the week's problems get sorted. Race stories and training numbers coming here.",
		eyebrow: "Endurance",
	},
	{
		title: "Cooking",
		blurb: "Vietnamese home cooking first, everything else second. Recipes and the dishes worth the effort.",
		eyebrow: "Kitchen",
	},
	{
		title: "Photography",
		blurb: "Cities I have lived in, seen on foot: Hanoi, Kuala Lumpur, Ho Chi Minh City, Warsaw, Milan.",
		eyebrow: "Camera",
	},
	{
		title: "Painting & drawing",
		blurb: "Sketchbooks and the occasional canvas. Some of these will end up as the illustrations on this site.",
		eyebrow: "Studio",
	},
];

export default function PassionComponent() {
	return (
		<div className="section-container pt-32 pb-16">
			<p className="text-[#f27d0d] text-xs uppercase tracking-widest mb-3">Beyond the data</p>
			<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Off the clock</h1>
			<p className="text-gray-300 max-w-2xl mb-14">
				Four things that take up the hours the laptop does not. Photos and stories are being added; the
				structure is here so the page has a home.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{PASSIONS.map((p) => (
					<article
						key={p.title}
						className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#f27d0d]/50 transition-colors duration-300"
					>
						<p className="text-[#f27d0d] text-xs uppercase tracking-widest mb-2">{p.eyebrow}</p>
						<h2 className="text-2xl font-bold text-white mb-3">{p.title}</h2>
						<p className="text-gray-300">{p.blurb}</p>
					</article>
				))}
			</div>

			<div className="text-center pt-16">
				<p className="text-gray-400 mb-6">Curious what I read when I&apos;m not out running?</p>
				<Link href="/aboutme/reads">
					<a className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f27d0d] to-[#ff9a3c] hover:from-[#e06d00] hover:to-[#f27d0d] text-white font-semibold rounded-full transition-all duration-500 shadow-lg shadow-[#f27d0d]/25 hover:shadow-[#f27d0d]/40 hover:-translate-y-0.5">
						My favorite reads
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</Link>
			</div>
		</div>
	);
}
