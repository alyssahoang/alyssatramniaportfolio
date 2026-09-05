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
	/** First entry is the primary topic shown on the tile badge; the rest are extra filter tabs. */
	categories: string[];
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
	CUSTOMER: "Customer & Marketing",
	RISK: "Risk & Credit",
	OPS: "Retail & Operations",
	MARKETS: "Markets & Media",
	BI: "BI & Dashboards",
	HEALTH: "Health",
	WEBAPP: "Web App",
}

export const PROJECTS: IProject[] = [
	{
		name: "E-commerce Reviews – What frustrates customers most?",
		categories: [ProjectTypes.CUSTOMER, ProjectTypes.WEBAPP],
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
		categories: [ProjectTypes.BI],
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
		categories: [ProjectTypes.BI],
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
		categories: [ProjectTypes.BI],
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
		categories: [ProjectTypes.MARKETS],
		image: "/projects/imdb.png",
		description: "I mined the IMDB Top 1000 with association rules to find the cast pairings and success-tier combinations that keep showing up in films people love, and benchmarked Apriori against PCY hashing.",
		gradient: ["#431407", "#f97316"],
		url: "https://github.com/alyssahoang/market-basket-analysis-apriori-pcy-pms",
		tech: ["python", "Pandas", "numpy"],
		fullDescription: "I treated each film as a shopping basket of its lead actors plus gross, rating, votes, runtime and metascore tiers, then mined frequent itemsets with Apriori, PCY and PCY-Multistage implemented from scratch. At low support the hashing methods are three orders of magnitude faster than Apriori. After significance and redundancy filtering the rules are readable: Tom Hanks in the cast means a high-grossing film 14 times out of 14, and well-reviewed hits are also the most voted.",
		impact: ["Apriori vs PCY vs PMS, 1,000x faster at low support", "Rules survive Fisher test + redundancy pruning", "IMDB Top 1000"],
		featured: true,
	},
	{
		name: "Insurance Risk Scoring – Which approvals can we trust?",
		categories: [ProjectTypes.RISK],
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
		categories: [ProjectTypes.CUSTOMER],
		image: "/projects/churn.png",
		description: "Churn prediction on customer behaviour: the signals that show up before a customer walks away, and how early they can be caught.",
		gradient: ["#1e1b4b", "#6366f1"],
		url: "https://github.com/alyssahoang/Churn-Prediction",
		tech: ["python", "scikit-learn", "Pandas"],
		fullDescription: "5,630 e-commerce customers, 16.8% churned. Tenure dominates: churn is concentrated in the first months, then complaints, number of addresses and distance to warehouse. The original notebook reported 97% accuracy after resampling before the split; I rebuilt the evaluation with resampling inside the training pipeline and an untouched holdout. Gradient boosting without resampling reaches recall 0.96 and F1 0.97 on that clean test set, and the resampling that was supposed to help actually cost precision.",
		impact: ["Recall 0.96, F1 0.97 on a clean holdout", "Tenure and complaints are the early signals", "Fixed a train/test leakage in the original"],
	},
	{
		name: "Customer Value Segmentation – Which customers deserve the next campaign?",
		categories: [ProjectTypes.CUSTOMER],
		image: "/projects/rfm.png",
		description: "RFM segmentation that sorts a customer base by recency, frequency and value, so marketing effort lands where it actually pays back.",
		gradient: ["#4a044e", "#d946ef"],
		url: "https://github.com/alyssahoang/RFM-Analysis",
		tech: ["python", "Pandas"],
		fullDescription: "4,338 customers of a UK online gift retailer scored on recency, frequency and monetary value and grouped into nine segments. A quarter of the base, the Champions, generate two-thirds of revenue; 15% are already lost and worth almost nothing. The most urgent list is the smallest: 63 former heavy buyers, £2,800 each, silent for five months. The original notebook scored frequency and monetary backwards, so I rebuilt the scoring in a standalone script.",
		impact: ["Champions: 26% of customers, 66% of revenue", "63 high-value customers to win back now", "Second purchase is the conversion that matters"],
	},
	{
		name: "Marketing Budget Allocation – Where should the next dollar go?",
		categories: [ProjectTypes.CUSTOMER],
		image: "/projects/budget.png",
		description: "Channel budget allocation modelled from real response data instead of last year's split.",
		gradient: ["#422006", "#eab308"],
		url: "https://github.com/alyssahoang/MKT-Budget-Allocation",
		tech: ["python", "Pandas", "numpy"],
		fullDescription: "300,000 campaign sends across SMS and email, three coupon values and four age bands, with the furthest funnel step each send reached. I measured ROI per channel × coupon × audience cell and split next quarter's $60K where the return actually was. SMS to 18–30 with the $2 coupon is the best cell at ROI 0.66; the 60+ audience loses money in every combination and gets nothing; bigger coupons do not buy proportionally more conversions.",
		impact: ["Best cell: SMS, 18–30, $2 coupon, ROI 0.66", "60+ audience negative ROI everywhere", "$60K split: SMS 62%, email 38%"],
	},
	{
		name: "Weather Shocks & Online Demand – Does heavy rain stop people shopping?",
		categories: [ProjectTypes.OPS],
		image: "/projects/thesis.png",
		description: "My master's thesis: a city-day panel of Brazilian e-commerce orders matched to daily weather. A heavy-rain day cuts orders per capita by about 9%.",
		gradient: ["#0c4a6e", "#38bdf8"],
		url: "https://github.com/alyssahoang/weather-shocks-ecommerce-thesis",
		tech: ["R"],
		fullDescription: "I built a balanced 2017 city × day panel from the Olist marketplace, Open-Meteo weather and IBGE population, and estimated Poisson pseudo-maximum-likelihood models with city and date fixed effects. Heavy rain reduces online orders by about 9% per capita and sustained wet spells by 11 to 13%, stable across thresholds, placebo timing and pre-trend sensitivity. On the delivery side, a multilevel model shows delays come from routing and shipment structure far more than from the weather itself.",
		impact: ["Heavy rain: −9% orders per capita", "Wet spells: −11% to −13%", "PPML with fixed effects, HonestDiD checks"],
		featured: true,
	},
	{
		name: "Delivery Lead Time – What makes a marketplace order slow?",
		categories: [ProjectTypes.OPS],
		image: "/projects/delivery.png",
		description: "93,853 Olist orders in a multilevel model with seller and destination random effects. Routing dominates, and a quarter of the variance still sits with who ships and where.",
		gradient: ["#1e3a8a", "#60a5fa"],
		url: "https://github.com/alyssahoang/olist-delivery-lead-time-multilevel",
		tech: ["R"],
		fullDescription: "Random intercepts for sellers and customer states, a ladder of fixed effects for routing, shipment profile, season and product theme, then shipment-regime clusters and their interactions. Same-state shipments are about 17% faster; freight intensity is the strongest positive driver; 26% of variance remains above the order level after all controls. Robust fits, trimming, region-specific refits and bootstrap intervals all keep the same ordering of effects.",
		impact: ["Same-state routing: ~17% faster", "26% of variance at seller/state level", "Robust to trimming, refits, bootstrap"],
	},
	{
		name: "Weather & Running – Does heat change how a run unfolds?",
		categories: [ProjectTypes.HEALTH],
		image: "/projects/running.png",
		description: "148 of my own runs, each treated as a curve rather than an average. Temperature raises heart rate across 83% of a run, building through the middle and peaking near three-quarters distance.",
		gradient: ["#7c2d12", "#fb923c"],
		url: "https://github.com/alyssahoang/weather-running-dynamics-fda",
		tech: ["R", "python"],
		fullDescription: "I pulled my Strava runs through the API, matched each to the hour's weather from Open-Meteo, and used functional data analysis to model heart rate as a smooth trajectory over normalised time. Function-on-scalar regression, pointwise ANOVA with BH correction and a global permutation test agree: hotter conditions systematically raise cardiovascular load. A topological data analysis extension found geometric structure but no extra temperature signal.",
		impact: ["Temperature significant over 83% of run time", "Permutation test p < 0.005", "FDA + TDA on wearable data"],
	},
	{
		name: "VN Stock Market Scraper – Fundamentals where no API exists",
		categories: [ProjectTypes.MARKETS, ProjectTypes.WEBAPP],
		image: "/projects/vn-stock.png",
		description: "Vietnam has no Yahoo Finance. A Selenium + BeautifulSoup pipeline pulled fundamentals, six-year ratios and dividend history for 1,570 listed companies, plus a screener app to explore them.",
		gradient: ["#14532d", "#4ade80"],
		url: "https://vn-stock-screener.streamlit.app/",
		tech: ["python", "Pandas", "streamlit"],
		fullDescription: "The symbol universe comes from CafeF's JavaScript-rendered screener, company financials and dividend events from Cophieu68's tabbed pages. Selenium renders, BeautifulSoup parses, a five-thread pool with randomised delays keeps the load polite, and retry lists make the run resumable. Vietnamese number formats and unit suffixes are normalised into clean CSVs. A Streamlit screener on the snapshot lets you filter by exchange, market cap, P/E, P/B, ROE and cash yield and drill into any company's 2019–2024 trend.",
		impact: ["1,570 tickers, 20 fields each", "Six-year ratio history, 16.5K dividend events", "Live Streamlit screener"],
	},
	{
		name: "Credit Risk Segmentation – Which borrowers look alike, and who is risky?",
		categories: [ProjectTypes.RISK],
		image: "/projects/credit-risk.png",
		description: "Credit-card applicants and their repayment histories, reduced with PCA and grouped with K-means into four risk profiles, from low-risk retirees to high-risk young low-income borrowers.",
		gradient: ["#312e81", "#818cf8"],
		url: "https://github.com/alyssahoang/credit-risk-segmentation-pca-kmeans",
		tech: ["R"],
		fullDescription: "Application data (income, family, employment, assets) merged with monthly repayment records for 36K customers, plus engineered features such as dependency ratio, income per household member and early-delinquency windows. PCA to de-noise, K-means with the number of clusters chosen by elbow and silhouette. Four segments fall out cleanly, and early repayment behaviour in the first 10–20 months turns out to be the leading indicator of later risk.",
		impact: ["Four interpretable risk segments", "Silhouette 0.42", "Early delinquency is the leading indicator"],
	},
	{
		name: "FitSculpt – Your shape, your journey",
		categories: [ProjectTypes.HEALTH, ProjectTypes.WEBAPP],
		image: "/projects/fitsculpt.png",
		description: "A small fitness web app: enter your measurements, pick the body shape you are aiming for, and get a tailored programme with progress tracking. My first full-stack project.",
		gradient: ["#7f1d1d", "#f87171"],
		url: "https://github.com/alyssahoang/fitsculpt",
		tech: ["python"],
		fullDescription: "Python, Bottle and SQLite. Sign-up captures weight, target weight, bust, waist, hip and weekly workout frequency; the app classifies body shape into one of five types, fitness level into three, and serves a programme from SQL views. Completed exercises are logged with calories burned and rolled up into weekly goals and per-category progress.",
		impact: ["Body-shape classification from measurements", "Programme served from SQL views", "Progress logging and weekly goals"],
	},
	{
		name: "Kitchen Inventory – What should I cook first?",
		categories: [ProjectTypes.HEALTH, ProjectTypes.WEBAPP],
		image: "/projects/fridge.png",
		description: "A Shiny app that turns up to five fridge ingredients into recipe matches and builds a calorie-targeted meal plan. Coursework that I still use at home.",
		gradient: ["#134e4a", "#2dd4bf"],
		url: "https://oo4voo-alyssa-hoang.shinyapps.io/myfridgebuddy/",
		tech: ["R"],
		fullDescription: "Pick what is in the fridge and the app ranks recipes by association rules mined over 20K Epicurious recipes, so it suggests what goes with what you have rather than exact matches only. Enter age, height, weight, activity and goal and it builds a 3-, 5- or 7-day plan with every meal within 10% of its calorie target, filtered by diet tags, then exports the plan as a PDF and the grocery list as CSV. Shipped with a companion R data package.",
		impact: ["Recipe matching by Apriori rules", "Meal plan within ±10% of calorie target", "PDF plan and grocery list export"],
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

