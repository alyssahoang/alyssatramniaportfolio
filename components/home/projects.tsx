import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MENULINKS, PROJECTS, ProjectTypes } from "../../constants";
import ProjectTile from "../common/project-tile";
import { IDesktop } from "pages";
import { trackEvent } from "../../utils/clarity";
import { initHeadingWipe, prefersReducedMotion } from "../../utils/motion";

const CATEGORIES = [
	{ value: ProjectTypes.FEATURED, label: "Featured" },
	{ value: ProjectTypes.CX, label: "Customer Experience" },
	{ value: ProjectTypes.MARKET, label: "Market & Social" },
	{ value: ProjectTypes.RISK, label: "Forecasting & Risk" },
	{ value: ProjectTypes.BI, label: "BI & Dashboards" },
	{ value: ProjectTypes.COURSEWORK, label: "Coursework" },
];

const matchesCategory = (project: typeof PROJECTS[number], category: string) =>
	category === ProjectTypes.FEATURED ? !!project.featured : project.category === category;

const ProjectsSection = ({ isDesktop }: IDesktop) => {
	const targetSectionRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const [activeCategory, setActiveCategory] = useState(ProjectTypes.FEATURED);
	const isFirstRender = useRef(true);
	const isSwitching = useRef(false);

	useEffect(() => {
		const wipe = initHeadingWipe(targetSectionRef.current);
		return () => wipe?.kill();
	}, []);

	const handleCategoryChange = (category: string) => {
		if (category === activeCategory || isSwitching.current) return;
		trackEvent("project_category_filter", { category });

		if (prefersReducedMotion() || !gridRef.current) {
			setActiveCategory(category);
			return;
		}

		// Quick fade-out, then the new tiles cascade in (see the effect below)
		isSwitching.current = true;
		gsap.to(gridRef.current, {
			opacity: 0,
			y: 8,
			duration: 0.15,
			ease: "power2.in",
			onComplete: () => {
				isSwitching.current = false;
				setActiveCategory(category);
			},
		});
	};

	// Cascade the tiles in like dealt cards whenever the filter changes
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (prefersReducedMotion() || !gridRef.current) return;

		gsap.set(gridRef.current, { opacity: 1, y: 0 });
		gsap.from(gridRef.current.querySelectorAll(".project-tile-wrap"), {
			opacity: 0,
			y: 28,
			duration: 0.6,
			ease: "back.out(1.2)",
			stagger: 0.06,
			clearProps: "all",
		});
	}, [activeCategory]);

	const filteredProjects = PROJECTS.filter((project) =>
		matchesCategory(project, activeCategory)
	);

	const renderSectionTitle = (): React.ReactNode => (
		<div className="flex flex-col inner-container">
			<h2 className="section-heading seq">My Works</h2>
			<h3 className="text-xl md:text-2xl md:max-w-3xl w-full seq mt-2 text-gray-200">
				A few projects I&apos;m proud of. Each one started with a question worth answering.
			</h3>
		</div>
	);


	const renderCategoryFilters = (): React.ReactNode => (
		<div className="grid grid-cols-2 auto-rows-fr gap-2.5 sm:gap-3 mt-8 mb-10 sm:flex sm:flex-wrap">
			{CATEGORIES.map((category) => {
				const count = PROJECTS.filter((p) => matchesCategory(p, category.value)).length;
				return (
					<button
						key={category.value}
						onClick={() => handleCategoryChange(category.value)}
						className={`
							inline-flex items-center justify-center text-center w-full sm:w-auto h-full px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-sm font-medium leading-tight transition-all duration-[10ms]
							${
								activeCategory === category.value
									? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20"
									: "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50"
							}
						`}
					>
						{category.label}
						<span className={`ml-1.5 sm:ml-2 text-[11px] sm:text-xs ${activeCategory === category.value ? "opacity-100" : "opacity-60"}`}>
							({count})
						</span>
					</button>
				);
			})}
		</div>
	);

	const renderProjectGrid = (): React.ReactNode => (
		<div
			ref={gridRef}
			className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
		>
			{filteredProjects.map((project, index) => (
				<div className="project-tile-wrap h-full" key={`${project.name}-${activeCategory}`}>
					<ProjectTile project={project} index={index} />
				</div>
			))}
		</div>
	);

	const { ref: projectsSectionRef } = MENULINKS[3];

	return (
		<section
			ref={targetSectionRef}
			className={`${isDesktop && "min-h-screen"} w-full relative select-none section-container flex-col flex py-8 md:py-12 justify-center`}
			id={projectsSectionRef}
			style={{
				zIndex: 10,
				isolation: "isolate",
			}}
		>
			{renderSectionTitle()}
			{renderCategoryFilters()}
			{renderProjectGrid()}
		</section>
	);
};

export default ProjectsSection;
