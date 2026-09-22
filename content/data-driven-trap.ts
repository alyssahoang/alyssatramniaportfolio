// Content for the blog post at /notebook/hidden-trap-of-being-data-driven/.
//
// The prose lives in the page itself (it is one long read with figures woven
// through it); this file holds the metadata, the section list that drives the
// navigation, and the references.

import { IReference } from "./color-cheat-sheet";

export const DATA_DRIVEN_META = {
	title: "The Hidden Trap of Being Data-Driven",
	slug: "hidden-trap-of-being-data-driven",
	description:
		"Being data-driven does not automatically mean being objective. Five places a real number leads to the wrong conclusion — the metric we choose, its definition, the query, the missing context and our own confirmation bias — and the questions that catch them.",
	lede: "“Let the data speak.” It sounds like one of the safest principles in business.",
	date: "Sep 2026",
	readTime: "7 min read",
	/** 16:9 link-preview image in public/notebook/. */
	image: "/notebook/hidden-trap-of-being-data-driven.png",
	imageAlt:
		"Data-driven, or data-confirming? Four dashboard numbers, and only the +20% makes it onto the meeting slide.",
};

export interface IPostSection {
	id: string;
	/** Section number as printed in the heading; unnumbered sections have none. */
	n: string;
	label: string;
}

export const DATA_DRIVEN_SECTIONS: IPostSection[] = [
	{ id: "choosing", n: "1", label: "Choosing the metric" },
	{ id: "definition", n: "2", label: "The hidden definition" },
	{ id: "query", n: "3", label: "The query that runs" },
	{ id: "context", n: "4", label: "Missing context" },
	{ id: "confirmation", n: "5", label: "Confirming what we believe" },
	{ id: "dashboard", n: "6", label: "Beyond the dashboard" },
	{ id: "layers", n: "", label: "Five layers" },
	{ id: "references", n: "", label: "References" },
];

export const DATA_DRIVEN_REFERENCES_LEDE =
	"Where the ideas in this post come from. It's a working synthesis, not original research, and these are the sources worth going to directly.";

export const DATA_DRIVEN_REFERENCES: Array<{ group: string; items: IReference[] }> = [
	{
		group: "Books",
		items: [
			{
				n: 1,
				citation: "Muller, J. Z. (2018). The tyranny of metrics. Princeton University Press.",
				note: "How the choice of what to measure shapes what an organisation pays attention to (section 1).",
			},
			{
				n: 2,
				citation:
					"Kimball, R., & Ross, M. (2013). The data warehouse toolkit: The definitive guide to dimensional modeling (3rd ed.). Wiley.",
				note: "Shared metric definitions and declaring the grain of a table, the discipline that prevents the double counting in section 3.",
			},
			{
				n: 3,
				citation:
					"Kohavi, R., Tang, D., & Xu, Y. (2020). Trustworthy online controlled experiments: A practical guide to A/B testing. Cambridge University Press.",
				note: "Twyman's law, “any figure that looks interesting or different is usually wrong” (section 3), and guardrail metrics (section 1).",
			},
			{
				n: 4,
				citation: "Wheeler, D. J. (2000). Understanding variation: The key to managing chaos (2nd ed.). SPC Press.",
				note: "How to tell a real change from routine variation; the shaded band in section 4.",
			},
			{
				n: 5,
				citation:
					"Pearl, J., & Mackenzie, D. (2018). The book of why: The new science of cause and effect. Basic Books.",
				note: "From “what happened” to “why it happened” (section 6), with a chapter on Simpson's paradox.",
			},
			{
				n: 6,
				citation: "Kahneman, D. (2011). Thinking, fast and slow. Farrar, Straus and Giroux.",
				note: "“What you see is all there is”: we build a confident story from whatever evidence is in front of us.",
			},
			{
				n: 7,
				citation:
					"Harford, T. (2021). The data detective: Ten easy rules to make sense of statistics. Riverhead Books.",
				note: "A readable companion to the whole post.",
			},
			{
				n: 8,
				citation: "Spiegelhalter, D. (2019). The art of statistics: How to learn from data. Basic Books.",
				note: "Plain-language grounding in how data turns into claims.",
			},
		],
	},
	{
		group: "Papers",
		items: [
			{
				n: 9,
				citation:
					"Simpson, E. H. (1951). The interpretation of interaction in contingency tables. Journal of the Royal Statistical Society: Series B, 13(2), 238–241.",
				note: "The original description of the paradox in section 4.",
			},
			{
				n: 10,
				citation:
					"Bickel, P. J., Hammel, E. A., & O'Connell, J. W. (1975). Sex bias in graduate admissions: Data from Berkeley. Science, 187(4175), 398–404.",
				note: "A real case where the overall numbers pointed the wrong way.",
				url: "https://doi.org/10.1126/science.187.4175.398",
			},
			{
				n: 11,
				citation:
					"Nickerson, R. S. (1998). Confirmation bias: A ubiquitous phenomenon in many guises. Review of General Psychology, 2(2), 175–220.",
				note: "The standard review behind section 5.",
				url: "https://doi.org/10.1037/1089-2680.2.2.175",
			},
			{
				n: 12,
				citation:
					"Goodhart, C. A. E. (1975). Problems of monetary management: The U.K. experience. In Papers in monetary economics (Vol. 1). Reserve Bank of Australia.",
				note: "Origin of Goodhart's law: a measure used for control stops behaving the way it used to.",
			},
			{
				n: 13,
				citation:
					"Strathern, M. (1997). ‘Improving ratings’: Audit in the British University system. European Review, 5(3), 305–321.",
				note: "Source of the popular phrasing: “When a measure becomes a target, it ceases to be a good measure.”",
			},
		],
	},
];

export const DATA_DRIVEN_DISCLAIMER =
	"Accessed September 2026. Figure values are illustrative, not from real data. Where a claim matters to a decision, go to the source rather than citing this post.";
