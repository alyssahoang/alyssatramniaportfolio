export const METADATA = {
	title: "Alyssa Hoang | Portfolio",
	description: "Data analyst turning customer behaviour into business decisions. Customer experience, BI and market intelligence across e-commerce and consulting.",
	siteUrl: "https://alyssatramnia.com",
};

// Official site / definition page for each tech. Keys are lowercased so the
// varied casing across the data ("dbt"/"Dbt", "Github", "PowerBI", "alteryx")
// all resolve. Icons render in 3 places — the Skills grid, the project modal,
// and the pipeline DAG — and all look up their link here via getTechUrl().
// Concept-only names (ssh, tcp/ip, dns, normalDis, shell, kmeans) are omitted
// on purpose so they fall back to a plain, non-clickable icon.
export const TECH_LINKS: Record<string, string> = {
	r: "https://www.r-project.org/",
	"scikit-learn": "https://scikit-learn.org/",
	claude: "https://claude.com/product/claude-code",
	"alibaba cloud": "https://www.alibabacloud.com/product/maxcompute",
	"google cloud": "https://cloud.google.com/",
	salesforce: "https://www.salesforce.com/",
	"google bigquery": "https://cloud.google.com/bigquery",
	// Business Intelligence
	powerbi: "https://powerbi.microsoft.com/",
	tableau: "https://www.tableau.com/",
	mode: "https://mode.com/",
	hex: "https://hex.tech/",
	looker: "https://cloud.google.com/looker",
	omni: "https://omni.co/",
	// Warehouse and Lakehouse
	snowflake: "https://www.snowflake.com/",
	"aws redshift": "https://aws.amazon.com/redshift/",
	databricks: "https://www.databricks.com/",
	"apache iceberg": "https://iceberg.apache.org/",
	"delta lake": "https://delta.io/",
	// Data Integration
	airbyte: "https://airbyte.com/",
	dlt: "https://dlthub.com/",
	fivetran: "https://www.fivetran.com/",
	stitch: "https://www.stitchdata.com/",
	alteryx: "https://www.alteryx.com/",
	// Orchestration
	"apache airflow": "https://airflow.apache.org/",
	dagster: "https://dagster.io/",
	mageai: "https://www.mage.ai/",
	orchestra: "https://www.getorchestra.io/",
	astronomer: "https://www.astronomer.io/",
	// Data Processing
	dbt: "https://www.getdbt.com/",
	trino: "https://trino.io/",
	spark: "https://spark.apache.org/",
	hive: "https://hive.apache.org/",
	hadoop: "https://hadoop.apache.org/",
	beam: "https://beam.apache.org/",
	// Streaming
	kafka: "https://kafka.apache.org/",
	flink: "https://flink.apache.org/",
	"spark streaming": "https://spark.apache.org/streaming/",
	"kinesis firehose": "https://aws.amazon.com/firehose/",
	pubsub: "https://cloud.google.com/pubsub",
	pulsar: "https://pulsar.apache.org/",
	// Cloud (AWS)
	s3: "https://aws.amazon.com/s3/",
	ec2: "https://aws.amazon.com/ec2/",
	lambda: "https://aws.amazon.com/lambda/",
	mwaa: "https://aws.amazon.com/managed-workflows-for-apache-airflow/",
	vpc: "https://aws.amazon.com/vpc/",
	iam: "https://aws.amazon.com/iam/",
	// DevOps
	docker: "https://www.docker.com/",
	kubernetes: "https://kubernetes.io/",
	github: "https://github.com/",
	terraform: "https://www.terraform.io/",
	aws: "https://aws.amazon.com/",
	gitlab: "https://about.gitlab.com/",
	// Project-only tech
	python: "https://www.python.org/",
	prefect: "https://www.prefect.io/",
	duckdb: "https://duckdb.org/",
	clickhouse: "https://clickhouse.com/",
	fastapi: "https://fastapi.tiangolo.com/",
	minio: "https://min.io/",
	streamlit: "https://streamlit.io/",
	pandas: "https://pandas.pydata.org/",
	matplotlib: "https://matplotlib.org/",
	numpy: "https://numpy.org/",
	excel: "https://www.microsoft.com/en-us/microsoft-365/excel",
	powerquery: "https://learn.microsoft.com/power-query/",
	"microsoft sql server": "https://www.microsoft.com/en-us/sql-server",
	postgresql: "https://www.postgresql.org/",
	"docker compose": "https://docs.docker.com/compose/",
	git: "https://git-scm.com/",
	azure: "https://azure.microsoft.com/",
	langchain: "https://www.langchain.com/",
	openai: "https://openai.com/",
	// Pipeline-only
	hightouch: "https://hightouch.com/",
	snowplow: "https://snowplow.io/",
};

/** Official site for a tech name, or undefined when it has no link. */
export const getTechUrl = (name: string): string | undefined =>
	TECH_LINKS[name.trim().toLowerCase()];

export const NAVBARITEMS = [
	{
		name: "Home",
		ref: "home",
	},
	{
		name: "Skillset",
		ref: "skills",
	},
	{
		name: "Projects",
		ref: "works",
	},
	{
		name: "My Activity",
		ref: "activity",
	},
	{
		name: "Experience",
		ref: "timeline",
	},
	{
		name: "Passion",
		ref: "/aboutme/passion",
	},
	{
		name: "Reads",
		ref: "/aboutme/reads",
	},
];

// NOTE: home sections read their DOM ids from this array BY INDEX
// (hero=0, skills=1, projects=3, timeline=4) — append new entries at the
// END, never insert in the middle, or every section id shifts.
export const MENULINKS = [
	{
		name: "Home",
		ref: "home",
	},
	{
		name: "Skillset",
		ref: "skills",
	},
	{
		name: "Articles",
		ref: "articles",
	},
	{
		name: "Projects",
		ref: "works",
	},
	{
		name: "Experience",
		ref: "timeline",
	},
	{
		name: "Query Me",
		ref: "sql",
	},
];

// Recommendations (LinkedIn) — add with each author's permission.
export interface IComment {
	comment: string;
	author: string; // "First, Last" — join key used by ide-testimonials
	position: string;
	company: string; // folder name in the testimonials explorer
	recomendationType: string; // work | college | mentee
	avatar: string; // /person/<file>
}
export const COMMENTS: IComment[] = [];

export interface ITestimonialTheme {
	label: string;
	blurb: string;
	// Values must match COMMENTS[].author exactly — the section derives
	// counts, avatar stacks, and carousel jumps from this lookup.
	authors: string[];
}

export const TESTIMONIAL_THEMES: ITestimonialTheme[] = [];

export const TYPED_STRINGS = [
	'<span style="color:#9146FF">Data Analyst</span> · customer experience & BI',
	'<span style="color:#9146FF">36K+</span> customer reviews mapped',
	'<span style="color:#9146FF">MSc Data Science</span> · Milan & Warsaw',
	'<span style="color:#9146FF">Warsaw, Poland</span>',
];

export const QUOTE_STRINGS = [
	'I turn what <span style="color:#9146FF">customers say</span> into what <span style="color:#9146FF">businesses do</span>',
	'From <span style="color:#9146FF">messy signal</span> to a decision someone can <span style="color:#9146FF">act on</span>',
	'Always run the <span style="color:#9146FF">extra mile</span>',
];

export const SOCIAL_LINKS = {
	linkedin: "https://www.linkedin.com/in/alyssahoang/",
	github: "https://github.com/alyssahoang",
	email: "mailto:tramanh.hoang0607@gmail.com",
};

export interface IProject {
	name: string;
	category: string;
	image: string;
	description: string;
	gradient: [string, string];
	url: string;
	tech: string[];
	fullDescription?: string;
	impact?: string[];
	featured?: boolean;
}

export const ProjectTypes = {
	FEATURED: "Featured",
	CX: "Customer Experience",
	MARKET: "Market & Social Intelligence",
	RISK: "Forecasting & Risk",
	BI: "BI & Dashboards",
	COURSEWORK: "Coursework",
}

export const PROJECTS: IProject[] = [
	{
		name: "A map of customer frustration in e-commerce",
		category: ProjectTypes.CX,
		image: "/projects/review-map.svg",
		description: "36K+ customer reviews turned into an interactive map of recurring negative experiences, so unstructured feedback becomes something a CX team can act on.",
		gradient: ["#3b0764", "#9146FF"],
		url: "https://interactive-customer-review-map.streamlit.app/",
		tech: ["python", "streamlit", "Pandas"],
		fullDescription: "Cleaned and clustered 36K+ e-commerce reviews with NLP, then built a Streamlit app that lets anyone browse the recurring pain points by theme, product and severity.",
		impact: ["36K+ reviews processed", "Interactive Streamlit app", "Recurring negative themes surfaced"],
		featured: true,
	},
	{
		name: "Where is inventory getting stuck?",
		category: ProjectTypes.BI,
		image: "/projects/inventory.svg",
		description: "AdventureWorks production and inventory flows mapped in Power BI to expose bottlenecks, stock imbalances and cost drivers.",
		gradient: ["#082f49", "#0ea5e9"],
		url: "https://mavenshowcase.com/profile/18b173d0-70c1-7081-cb75-11db77f5defe",
		tech: ["PowerBI", "powerquery", "excel"],
		fullDescription: "Modelled the AdventureWorks production and inventory data in Power Query and Power BI, then designed a dashboard that walks from plant throughput to stock imbalances to the cost drivers behind them.",
		impact: ["Bottlenecks made visible", "Stock imbalances by product line", "Clearer production planning decisions"],
		featured: true,
	},
	{
		name: "What made a movie successful?",
		category: ProjectTypes.MARKET,
		image: "/projects/imdb.svg",
		description: "Association mining on the IMDB Top 1000, comparing Apriori and PCY to find the attribute combinations that travel together in successful films.",
		gradient: ["#431407", "#f97316"],
		url: "https://github.com/alyssahoang/market-basket-analysis-apriori-pcy-pms/blob/main/code/experiment-code-v4.0.ipynb",
		tech: ["python", "Pandas", "numpy"],
		fullDescription: "Framed movie attributes as market baskets and mined frequent itemsets with Apriori and PCY, benchmarking both for speed and memory while reading the rules for what actually co-occurs in top-rated films.",
		impact: ["Apriori vs PCY benchmarked", "Interpretable rules on genre, era and cast", "IMDB Top 1000"],
		featured: true,
	},
	{
		name: "Finding the signal in risk profiles",
		category: ProjectTypes.RISK,
		image: "/projects/insurance.svg",
		description: "An interpretable logistic model on 57K insurance records that finds valid approvals under severe class imbalance without giving up explainability.",
		gradient: ["#052e16", "#22c55e"],
		url: "https://github.com/alyssahoang/insurance-approval-model-credit-risk",
		tech: ["python", "scikit-learn", "Pandas"],
		fullDescription: "Handled a heavily imbalanced approval dataset with resampling and threshold tuning, then kept the final model a logistic regression so every risk decision can be explained feature by feature.",
		impact: ["57K records", "Severe class imbalance handled", "Explainable risk decisions"],
		featured: true,
	},
	{
		name: "Who is about to leave?",
		category: ProjectTypes.RISK,
		image: "/projects/churn.svg",
		description: "Churn prediction on customer behaviour data: which signals show up before a customer walks, and how early they can be caught.",
		gradient: ["#1e1b4b", "#6366f1"],
		url: "https://github.com/alyssahoang/Churn-Prediction",
		tech: ["python", "scikit-learn", "Pandas"],
	},
	{
		name: "Which customers deserve the next campaign?",
		category: ProjectTypes.CX,
		image: "/projects/rfm.svg",
		description: "RFM segmentation that splits a customer base by recency, frequency and value so marketing effort lands where it pays back.",
		gradient: ["#4a044e", "#d946ef"],
		url: "https://github.com/alyssahoang/RFM-Analysis",
		tech: ["python", "Pandas"],
	},
	{
		name: "Where should the marketing budget go?",
		category: ProjectTypes.MARKET,
		image: "/projects/budget.svg",
		description: "Budget allocation across channels, modelled from response data instead of last year's split.",
		gradient: ["#422006", "#eab308"],
		url: "https://github.com/alyssahoang/MKT-Budget-Allocation",
		tech: ["python", "Pandas", "numpy"],
	},
	{
		name: "What is about to expire in my fridge?",
		category: ProjectTypes.COURSEWORK,
		image: "/projects/fridge.svg",
		description: "A small R app that tracks what is in the fridge and what to cook first. Coursework, but also used at home.",
		gradient: ["#134e4a", "#2dd4bf"],
		url: "https://github.com/alyssahoang/myfridgebuddy",
		tech: ["R"],
	},
];

export const SKILLS = {
	"BI & Visualization": ["PowerBI", "Tableau", "Looker", "streamlit", "excel", "powerquery"],
	"Warehouse & Cloud": ["Google Bigquery", "Alibaba Cloud", "Google Cloud", "PostgreSQL", "Microsoft SQL Server", "Github"],
	"Programming & Data": ["python", "R", "Pandas", "numpy", "scikit-learn"],
	"Enterprise & AI tools": ["Salesforce", "Claude", "openai"],
};

export interface ICertificate {
	name: string;
	issuer: string;
	image: string; // file name under /public/skills/3rd/ (webp)
}

export const CERTIFICATES: ICertificate[] = [];

export const SQLCode = { code: "" };

export const COURSES = {};

export enum Branch {
	LEFT = "leftSide",
	RIGHT = "rightSide",
}

export enum NodeTypes {
	CONVERGE = "converge",
	DIVERGE = "diverge",
	CHECKPOINT = "checkpoint",
}

export enum ItemSize {
	SMALL = "small",
	LARGE = "large",
}

export const TIMELINE: Array<TimelineNodeV2> = [
	{
		type: NodeTypes.CHECKPOINT,
		title: "Sep 2025",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "MSc Data Science in Economics & Health - <a class='underline underline-offset-2' href='https://www.unimi.it/en' target='_blank' rel='noopener noreferrer'><u>University of Milan</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Università degli Studi di Milano Statale",
		location: "Milan, Italy",
		image: "/timeline/milan.svg",
		slideImage: "/timeline/milan.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.unimi.it/en",
		techStack: [
			{ name: "Python", icon: "/projects/tech/python.svg" },
			{ name: "R", icon: "/skills/1st/R.svg" },
			{ name: "scikit-learn", icon: "/skills/1st/scikit-learn.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Oct 2024",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "MSc Data Science & Business Analytics - <a class='underline underline-offset-2' href='https://www.uw.edu.pl/en/' target='_blank' rel='noopener noreferrer'><u>University of Warsaw</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Uniwersytet Warszawski · GPA 4.5/5",
		location: "Warsaw, Poland",
		image: "/timeline/warsaw.svg",
		slideImage: "/timeline/warsaw.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.uw.edu.pl/en/",
		techStack: [
			{ name: "Python", icon: "/projects/tech/python.svg" },
			{ name: "R", icon: "/skills/1st/R.svg" },
			{ name: "SQL", icon: "/projects/tech/PostgreSQL.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Mar 2024",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Senior Data & Insights Analyst - <a class='underline underline-offset-2' href='https://vero-asean.com/' target='_blank' rel='noopener noreferrer'><u>Vero ASEAN</u></a>",
		size: ItemSize.SMALL,
		subtitle: "PR & communications consultancy · Provoke Top 100 agency",
		location: "Ho Chi Minh City",
		image: "/timeline/vero.svg",
		slideImage: "/timeline/vero.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://vero-asean.com/",
		techStack: [
			{ name: "Python", icon: "/projects/tech/python.svg" },
			{ name: "Google Cloud", icon: "/skills/1st/Google Cloud.svg" },
			{ name: "BigQuery", icon: "/skills/1st/Google Bigquery.svg" },
			{ name: "Power BI", icon: "/skills/1st/PowerBI.svg" },
			{ name: "Tableau", icon: "/skills/1st/Tableau.svg" },
			{ name: "Looker Studio", icon: "/skills/1st/Looker.webp" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Oct 2023",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Data Analyst, Regional Customer Experience - <a class='underline underline-offset-2' href='https://www.lazada.com/' target='_blank' rel='noopener noreferrer'><u>Lazada Group</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Southeast Asia e-commerce · Alibaba · 65M+ active users",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada.svg",
		slideImage: "/timeline/lazada.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.lazada.com/",
		techStack: [
			{ name: "SQL", icon: "/projects/tech/PostgreSQL.svg" },
			{ name: "Python", icon: "/projects/tech/python.svg" },
			{ name: "Pandas", icon: "/projects/tech/Pandas.svg" },
			{ name: "MaxCompute", icon: "/skills/1st/Alibaba Cloud.svg" },
			{ name: "Power BI", icon: "/skills/1st/PowerBI.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Aug 2022",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Customer Experience Analyst - <a class='underline underline-offset-2' href='https://www.lazada.com/' target='_blank' rel='noopener noreferrer'><u>Lazada Group</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Customer journeys, product analytics, NPS and Brand Health Tracking",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada.svg",
		slideImage: "/timeline/lazada.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.lazada.com/",
		techStack: [
			{ name: "SQL", icon: "/projects/tech/PostgreSQL.svg" },
			{ name: "MaxCompute", icon: "/skills/1st/Alibaba Cloud.svg" },
			{ name: "Power BI", icon: "/skills/1st/PowerBI.svg" },
			{ name: "Excel", icon: "/projects/tech/excel.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Oct 2020",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Vendor Performance Supervisor - <a class='underline underline-offset-2' href='https://www.lazada.com/' target='_blank' rel='noopener noreferrer'><u>Lazada Group</u></a>",
		size: ItemSize.SMALL,
		subtitle: "BPO forecasting, SLA dashboards, chatbot routing",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada.svg",
		slideImage: "/timeline/lazada.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.lazada.com/",
		techStack: [
			{ name: "Power Query", icon: "/projects/tech/powerquery.svg" },
			{ name: "Excel", icon: "/projects/tech/excel.svg" },
			{ name: "Power BI", icon: "/skills/1st/PowerBI.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Jun 2018",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Project Quality Lead - <a class='underline underline-offset-2' href='https://www.accenture.com/' target='_blank' rel='noopener noreferrer'><u>Accenture Operations</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Fortune Global 500 · led a 12-person team across APAC and EMEA",
		location: "Kuala Lumpur, Malaysia",
		image: "/timeline/accenture.svg",
		slideImage: "/timeline/accenture.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://www.accenture.com/",
		techStack: [
			{ name: "Salesforce", icon: "/skills/1st/Salesforce.svg" },
			{ name: "Excel", icon: "/projects/tech/excel.svg" },
		],
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "Sep 2011",
		size: ItemSize.LARGE,
		shouldDrawLine: false,
		alignment: Branch.LEFT,
	},
	{
		type: NodeTypes.CHECKPOINT,
		title: "BA English for Finance & Banking - <a class='underline underline-offset-2' href='https://hvnh.edu.vn/' target='_blank' rel='noopener noreferrer'><u>Banking Academy of Vietnam</u></a>",
		size: ItemSize.SMALL,
		subtitle: "Hanoi, Vietnam · 2011-2015",
		location: "Hanoi",
		image: "/timeline/bav.svg",
		slideImage: "/timeline/bav.svg",
		shouldDrawLine: true,
		alignment: Branch.LEFT,
		companyUrl: "https://hvnh.edu.vn/",
	},
];

export type TimelineNodeV2 = CheckpointNode | BranchNode;

export interface CheckpointNode {
	type: NodeTypes.CHECKPOINT;
	title: string;
	subtitle?: string;
	location?: string;
	size: ItemSize;
	image?: string;
	slideImage?: string;
	shouldDrawLine: boolean;
	alignment: Branch;
	companyLogo?: string;
	companyUrl?: string;
	techStack?: Array<{ name: string; icon: string }>;
}

export interface BranchNode {
	type: NodeTypes.CONVERGE | NodeTypes.DIVERGE;
}

export interface IArticle {
	title: string;
	excerpt: string;
	thumbnail: string;
	url: string;
	date: string;
	readingTime: string;
	tag: string;
}

export const ARTICLES: IArticle[] = [];

// "reading" gets a pulsing purple dot ("Currently reading"), "must-read" a
// star pill. Leave undefined for the steady-state majority of items.
export type ReadStatus = "reading" | "must-read";

export interface IFavoriteRead {
	title: string;
	author: string;
	description: string;
	url: string;
	domain: string; // used to build the favicon URL + shown as a pill
	category: string;
	image?: string; // optional local avatar in /public; overrides the favicon
	date?: string; // optional publish date, shown in the article list meta row
	cover?: string; // optional article cover art (list layout); falls back to image
	take?: string; // optional first-person one-liner — my take, in my voice
	status?: ReadStatus;
}

// Per-category accent (same spirit as FOLDER_COLORS in the IDE testimonials):
// pill border/text pick up the category's color; card chrome stays purple.
export const READ_CATEGORY_COLORS: Record<string, string> = {
	"Data Science": "#5eead4",
	"Data Engineering": "#38bdf8",
	"Career & Ops": "#fbbf24",
	"Life & Reflection": "#f472b6",
	Psychology: "#fb7185",
	Philosophy: "#fb923c",
};

export const readCategoryColor = (category: string): string =>
	READ_CATEGORY_COLORS[category] ?? "#BF94FF";

// Shown in the reads hero — bump manually when the lists change, same
// discipline as VERSION.md.
export const READS_LAST_UPDATED = "Sep 2026";

export const FAVORITE_READS: IFavoriteRead[] = [];

// Individual posts worth reading in full (vs FAVORITE_READS, which are whole
// publications). Reuses IFavoriteRead — `author` is the publication and
// `domain` is the article's host.
export const FAV_ARTICLES: IFavoriteRead[] = [];

