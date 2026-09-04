import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type Typed from "typed.js";
import { QUOTE_STRINGS } from "../../constants";
import { prefersReducedMotion } from "../../utils/motion";

const QuoteSection2 = () => {
	const typedRef = useRef<HTMLSpanElement>(null);
	const targetSection = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const typedInstance = useRef<Typed | null>(null);

	useEffect(() => {
		if (!targetSection.current) return;

		const reduceMotion = prefersReducedMotion();
		const lines = targetSection.current.querySelectorAll(".quote-line");
		const ghost = targetSection.current.querySelector(".quote-ghost");

		if (!reduceMotion) {
			gsap.set(lines, { opacity: 0, y: 24 });
			if (ghost) gsap.set(ghost, { opacity: 0, scale: 0.6 });
		}

		const trigger = ScrollTrigger.create({
			trigger: targetSection.current,
			start: "top 80%",
			onEnter: () => {
				setIsVisible(true);
				if (reduceMotion) return;
				gsap.to(lines, {
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power3.out",
					stagger: 0.15,
				});
				if (ghost) {
					gsap.to(ghost, {
						opacity: 1,
						scale: 1,
						duration: 1,
						ease: "power2.out",
					});
				}
			},
			once: true,
		});

		return () => trigger.kill();
	}, []);

	useEffect(() => {
		if (!isVisible || !typedRef.current) return;

		let cancelled = false;
		import("typed.js").then(({ default: Typed }) => {
			if (cancelled || !typedRef.current) return;
			typedInstance.current = new Typed(typedRef.current, {
				strings: QUOTE_STRINGS,
				typeSpeed: 40,
				backSpeed: 25,
				backDelay: 4000,
				contentType: 'html',
				loop: true,
			});
		});

		return () => {
			cancelled = true;
			typedInstance.current?.destroy();
		};
	}, [isVisible]);

	return (
		<section className="w-full relative select-none" ref={targetSection}>
			<div className="py-16 sm:py-24 md:py-36 tall:py-30 section-container relative">
				{/* Oversized ghost quote mark */}
				<span
					aria-hidden="true"
					className="quote-ghost absolute -top-2 left-2 md:left-10 text-[8rem] md:text-[12rem] leading-none font-bold text-[#9146FF]/10 pointer-events-none"
				>
					&ldquo;
				</span>

				{/* Soft ambient glow behind the quote */}
				<div
					aria-hidden="true"
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[16rem] md:w-[30rem] md:h-[18rem] rounded-full bg-[#9146FF]/10 blur-3xl aurora-blob aurora-drift-3 pointer-events-none"
				/>

				<div className="text-center relative">
					<p className="quote-line font-medium text-3xl md:text-5xl min-h-[1.5em]">
						<span ref={typedRef}></span>
					</p>
					<p className="quote-line mt-4 text-xl md:text-2xl text-gray-400">
						scroll down and <span className="text-[#BF94FF] font-bold">see for yourself</span>
					</p>
					<div className="quote-line mt-8 flex justify-center" aria-hidden="true">
						<svg
							className="chevron-bounce w-6 h-6 text-[#BF94FF]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth="2"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuoteSection2;
