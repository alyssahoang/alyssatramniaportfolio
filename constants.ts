export const METADATA = {
	title: "Alyssa Tram Anh H. | Data Analyst",
	description: "I help teams uncover the story behind their data and turn it into action. Data analyst with four years in e-commerce and consulting and two master's degrees in data science.",
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
		name: "Works",
		ref: "works",
	},
	{
		name: "Skills",
		ref: "skills",
	},
	{
		name: "Timeline",
		ref: "timeline",
	},
	{
		name: "Contact",
		ref: "contact",
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
	'<span style="color:#3B82F6">Data Analyst</span>',
	'<span style="color:#3B82F6">Analytics Engineer</span>',
	'<span style="color:#3B82F6">Data Viz Consultant</span>',
	'<span style="color:#3B82F6">Customer Insights Analyst</span>',
	'<span style="color:#3B82F6">Customer Experience Specialist</span>',
];

export const QUOTE_STRINGS = [
	'I help teams uncover the <span style="color:#3B82F6">story behind their data</span> and turn it into <span style="color:#3B82F6">action</span>',
	'A good dashboard answers the question <span style="color:#3B82F6">before anyone asks it</span>',
	'One screen, <span style="color:#3B82F6">one decision</span>. Everything else is noise',
	'If a number needs a footnote, it needs a <span style="color:#3B82F6">better chart</span>',
	'Good analysis starts with a <span style="color:#3B82F6">good question</span>',
	'<span style="color:#3B82F6">Clarity</span> over cleverness, every time',
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
		name: "E-commerce Reviews – What frustrates customers most?",
		category: ProjectTypes.CX,
		image: "/projects/review-map.png",
		description: "I read 36K+ e-commerce reviews so nobody else has to. The result is an interactive map of where customers get frustrated, and what to fix first.",
		gradient: ["#172554", "#3B82F6"],
		url: "https://interactive-customer-review-map.streamlit.app/",
		tech: ["python", "streamlit", "Pandas"],
		fullDescription: "Unstructured feedback is where the real customer voice lives, but no team has time to read 36,000 reviews. I cleaned and clustered them with NLP, then built a Streamlit app that lets a CX team browse the recurring pain points by theme, product and severity, and decide what to fix first.",
		impact: ["36K+ reviews, one clear map", "Python, NLP and Streamlit", "Built for CX teams, not data teams"],
		featured: true,
	},
	{
		name: "AdventureWorks Production – Where is inventory getting stuck?",
		category: ProjectTypes.BI,
		image: "/projects/inventory.gif",
		description: "A Power BI walk-through of AdventureWorks' production floor: 4.5M units, seven assembly stages, and an on-time rate of only 41.6%. Where does the time go?",
		gradient: ["#082f49", "#0ea5e9"],
		url: "https://mavenanalytics.io/projects/57599",
		tech: ["PowerBI", "powerquery"],
		fullDescription: "Inventory problems rarely announce themselves. I modelled AdventureWorks' production and inventory records (2011 to 2014) in Power Query and Power BI, then built a view that walks from executive KPIs to quarter-by-quarter performance to productivity by assembly location. The bottlenecks turned out to be local to specific stages such as Frame Welding and Paint, not systemic, and waste was tightly controlled at 0.2% even at that volume.",
		impact: ["4.5M units, 7 assembly stages", "On-time rate 41.6%, bottlenecks localised", "Waste held at 0.2%"],
		featured: true,
	},
	{
		name: "Global Store Performance – Which markets actually make money?",
		category: ProjectTypes.BI,
		image: "/projects/global-store.gif",
		description: "An executive dashboard for a retailer in seven markets. Sales grew 51.5%, but the repurchase rate fell, and the biggest market was not the most profitable.",
		gradient: ["#172554", "#3B82F6"],
		url: "https://mavenanalytics.io/projects/57600",
		tech: ["PowerBI"],
		fullDescription: "Global Superstore sells across APAC, the EU, the US and more. I modelled four years of sales, profit and customer transactions into one Power BI view: KPI scorecards with period-over-period change, a map paired with a share-of-sales versus profit-margin chart, and a product scatter that isolates high-revenue, low-profit outliers. Sales reached $13M and profit $1.5M, yet the repurchase rate dropped to 36.3%, APAC led on share but trailed on margin, and Tables lost money on every sale.",
		impact: ["Sales $13M, up 51.5%", "Repurchase rate down to 36.3%", "Copiers 17.1% margin, Tables -8.5%"],
		featured: true,
	},
	{
		name: "Furniture Store Performance – Which branch performs best, and why?",
		category: ProjectTypes.BI,
		image: "/projects/furniture-store.gif",
		description: "Three branches, 18 monthly Excel files, one answer: the revenue gap comes from footfall, not from what people buy. Weekends bring in 46% of revenue.",
		gradient: ["#3f2a14", "#d97706"],
		url: "https://mavenanalytics.io/projects/57541",
		tech: ["PowerBI", "excel", "python"],
		fullDescription: "A furniture retailer with branches in Long Island City, Paramus and Red Hook supplied 18 monthly transaction files. I consolidated them into a three-page Power BI report: Executive Overview, Product Intelligence, and Store & Demand. Average order value is almost identical across branches, so the revenue gap is traffic. Saturday and Sunday produce 46.3% of revenue, 19 of 80 products make half of it, and H1 2026 closed up 7.0%. The dataset had no product images, so I generated a consistent catalogue with a Python script, seeded by product id so the set is reproducible.",
		impact: ["Revenue gap explained by footfall", "Weekends 46.3% of revenue", "19 of 80 products = half of revenue"],
		featured: true,
	},
	{
		name: "IMDB Top 1000 – What makes a movie successful?",
		category: ProjectTypes.MARKET,
		image: "/projects/imdb.png",
		description: "I mined the IMDB Top 1000 with association rules to find the combinations of genre, era and cast that keep showing up in films people love.",
		gradient: ["#431407", "#f97316"],
		url: "https://github.com/alyssahoang/market-basket-analysis-apriori-pcy-pms/blob/main/code/experiment-code-v4.0.ipynb",
		tech: ["python", "Pandas", "numpy"],
		fullDescription: "I treated each film's attributes as a shopping basket and mined frequent itemsets with Apriori and PCY, comparing both for speed and memory. The fun part was reading the rules: which genres, eras and cast patterns actually travel together in top-rated films.",
		impact: ["Apriori vs PCY, benchmarked", "Readable rules on genre, era and cast", "IMDB Top 1000"],
		featured: true,
	},
	{
		name: "Insurance Risk Scoring – Which approvals can we trust?",
		category: ProjectTypes.RISK,
		image: "/projects/insurance.png",
		description: "A risk model that explains itself: 57K insurance records, a severe class imbalance, and a logistic regression you could defend in a meeting.",
		gradient: ["#052e16", "#22c55e"],
		url: "https://github.com/alyssahoang/insurance-approval-model-credit-risk",
		tech: ["python", "scikit-learn", "Pandas"],
		fullDescription: "Valid approvals were the rare class, so accuracy alone would have been misleading. I handled the imbalance with resampling and threshold tuning, and kept the final model a logistic regression on purpose, so every risk decision can be explained feature by feature.",
		impact: ["57K records", "Class imbalance handled honestly", "Every decision explainable"],
		featured: true,
	},
	{
		name: "Customer Retention – Who is about to churn, and how early can we tell?",
		category: ProjectTypes.RISK,
		image: "/projects/churn.png",
		description: "Churn prediction on customer behaviour: the signals that show up before a customer walks away, and how early they can be caught.",
		gradient: ["#1e1b4b", "#6366f1"],
		url: "https://github.com/alyssahoang/Churn-Prediction",
		tech: ["python", "scikit-learn", "Pandas"],
	},
	{
		name: "Customer Value Segmentation – Which customers deserve the next campaign?",
		category: ProjectTypes.CX,
		image: "/projects/rfm.png",
		description: "RFM segmentation that sorts a customer base by recency, frequency and value, so marketing effort lands where it actually pays back.",
		gradient: ["#4a044e", "#d946ef"],
		url: "https://github.com/alyssahoang/RFM-Analysis",
		tech: ["python", "Pandas"],
	},
	{
		name: "Marketing Budget Allocation – Where should the next dollar go?",
		category: ProjectTypes.MARKET,
		image: "/projects/budget.png",
		description: "Channel budget allocation modelled from real response data instead of last year's split.",
		gradient: ["#422006", "#eab308"],
		url: "https://github.com/alyssahoang/MKT-Budget-Allocation",
		tech: ["python", "Pandas", "numpy"],
	},
	{
		name: "Kitchen Inventory – What should I cook first?",
		category: ProjectTypes.COURSEWORK,
		image: "/projects/fridge.png",
		description: "A small R app that tracks what's in the fridge and what to cook first. Coursework that I still use at home.",
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
		subtitle: "Second year of my dual-degree master's · Università degli Studi di Milano Statale · GPA 27/30",
		location: "Milan, Italy",
		image: "/timeline/milan.jpg",
		slideImage: "/timeline/milan.jpg",
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
		subtitle: "First year of my dual-degree master's · Uniwersytet Warszawski · GPA 4.5/5",
		location: "Warsaw, Poland",
		image: "/timeline/warsaw.jpg",
		slideImage: "/timeline/warsaw.jpg",
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
		subtitle: "Social listening pipelines, KOL scoring and brand reputation dashboards for a top-100 PR agency",
		location: "Ho Chi Minh City",
		image: "/timeline/vero.jpg",
		slideImage: "/timeline/vero.jpg",
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
		subtitle: "Regional customer experience for 65M+ users; one source of truth behind 60+ dashboards",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada-data-analyst.jpg",
		slideImage: "/timeline/lazada-data-analyst.jpg",
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
		subtitle: "Mapped customer journeys and turned friction into product fixes; 4x checkout rate, 15% fewer cancellations",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada-customer-experience.jpg",
		slideImage: "/timeline/lazada-customer-experience.jpg",
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
		subtitle: "Forecasting, SLA dashboards and smarter chatbot routing for the customer-care vendors",
		location: "Ho Chi Minh City",
		image: "/timeline/lazada-vendor-supervisor.jpg",
		slideImage: "/timeline/lazada-vendor-supervisor.jpg",
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
		subtitle: "Led a 12-person team across APAC and EMEA on data-driven quality",
		location: "Kuala Lumpur, Malaysia",
		image: "/timeline/accenture.jpg",
		slideImage: "/timeline/accenture.jpg",
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
		subtitle: "Where it all started · 2011-2015",
		location: "Hanoi",
		image: "/timeline/bav.jpg",
		slideImage: "/timeline/bav.jpg",
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
	READ_CATEGORY_COLORS[category] ?? "#93C5FD";

// Shown in the reads hero — bump manually when the lists change, same
// discipline as VERSION.md.
export const READS_LAST_UPDATED = "Sep 2026";

export const FAVORITE_READS: IFavoriteRead[] = [];

// Individual posts worth reading in full (vs FAVORITE_READS, which are whole
// publications). Reuses IFavoriteRead — `author` is the publication and
// `domain` is the article's host.
export const FAV_ARTICLES: IFavoriteRead[] = [];

