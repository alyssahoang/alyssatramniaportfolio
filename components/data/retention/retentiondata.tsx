export const Table1 = {
	tableTitle: "players_logins",
	tableCol: [{ col1: "player_id" }, { col2: "login_date" }],
	tableData: [
		[{ player_id: 101 }, { login_date: "2021-12-14" }],
		[{ player_id: 101 }, { login_date: "2021-12-18" }],
		[{ player_id: 101 }, { login_date: "2021-12-15" }],
		[{ player_id: 101 }, { login_date: "2021-12-19" }],
		[{ player_id: 102 }, { login_date: "2021-12-31" }],
		[{ player_id: 102 }, { login_date: "2022-01-01" }],
		[{ player_id: 102 }, { login_date: "2022-01-15" }],
		[{ player_id: 102 }, { login_date: "2022-01-15" }],
		[{ player_id: 103 }, { login_date: "2020-12-22" }],
		[{ player_id: 103 }, { login_date: "2021-12-23" }],
	],
};

export const Table2 = {
	tableTitle: "players_logins",
	tableCol: [{ col1: "player_id" }, { col2: "login_date" }],
	tableData: [
		[{ player_id: 101 }, { login_date: "2021-12-14" }],
		[{ player_id: 101 }, { login_date: "2021-12-18" }],
		[{ player_id: 101 }, { login_date: "2021-12-15" }],
		[{ player_id: 101 }, { login_date: "2021-12-19" }],
		[{ player_id: 102 }, { login_date: "2021-12-31" }],
		[{ player_id: 102 }, { login_date: "2022-01-01" }],
		[{ player_id: 102 }, { login_date: "2022-01-15" }],
		[{ player_id: 102 }, { login_date: "2022-01-15" }],
		[{ player_id: 103 }, { login_date: "2020-12-22" }],
		[{ player_id: 103 }, { login_date: "2021-12-23" }],
		[{ player_id: 103 }, { login_date: "2021-12-15" }],
		[{ player_id: 104 }, { login_date: "2022-01-14" }],
		[{ player_id: 105 }, { login_date: "2022-01-08" }],
		[{ player_id: 105 }, { login_date: "2022-01-06" }],
		[{ player_id: 105 }, { login_date: "2022-01-10" }],
		[{ player_id: 106 }, { login_date: "2022-01-24" }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }],
		[{ player_id: 106 }, { login_date: "2022-01-24" }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }],
	],
};

export const Table3_1 = {
	tableTitle: "DENSE_RANK()",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "login_date" },
		{ col3: "ranking" },
	],
	tableData: [
		[{ player_id: 106 }, { login_date: "2022-01-24" }, { login_total: 1 }],
		[{ player_id: 106 }, { login_date: "2022-01-24" }, { login_total: 1 }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }, { login_total: 2 }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }, { login_total: 2 }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }, { login_total: 3 }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }, { login_total: 3 }],
	],
};

export const Table3_2 = {
	tableTitle: "RANK()",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "login_date" },
		{ col3: "ranking" },
	],
	tableData: [
		[{ player_id: 106 }, { login_date: "2022-01-24" }, { login_total: 1 }],
		[{ player_id: 106 }, { login_date: "2022-01-24" }, { login_total: 1 }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }, { login_total: 3 }],
		[{ player_id: 106 }, { login_date: "2022-01-25" }, { login_total: 3 }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }, { login_total: 5 }],
		[{ player_id: 106 }, { login_date: "2022-01-26" }, { login_total: 5 }],
	],
};

export const Table4 = {
	tableTitle: "",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "first_login_date" },
		{ col3: "first_ranking" },
		{ col4: "second_login_date" },
		{ col5: "second_ranking" },
	],
	tableData: [
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-14" },
			{ first_ranking: 1 },
			{ second_login_date: "2021-12-15" },
			{ second_ranking: 2 },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2021-12-31" },
			{ first_ranking: 1 },
			{ second_login_date: "2022-01-01" },
			{ second_ranking: 2 },
		],
		[
			{ player_id: 103 },
			{ first_login_date: "2020-12-22" },
			{ first_ranking: 1 },
			{ second_login_date: "" },
			{ second_ranking: "" },
		],
		[
			{ player_id: 104 },
			{ first_login_date: "2022-01-14" },
			{ first_ranking: 1 },
			{ second_login_date: "" },
			{ second_ranking: "" },
		],
		[
			{ player_id: 105 },
			{ first_login_date: "2022-01-06" },
			{ first_ranking: 1 },
			{ second_login_date: "" },
			{ second_ranking: "" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-24" },
			{ first_ranking: 1 },
			{ second_login_date: "2022-01-25" },
			{ second_ranking: "2" },
		],
	],
};

export const Table5 = {
	tableTitle: "",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "first_login" },
		{ col3: "second_login" },
	],
	tableData: [
		[
			{ player_id: 101 },
			{ first_login: "2021-12-14" },
			{ second_login: "2021-12-15" },
		],
		[
			{ player_id: 102 },
			{ first_login: "2021-12-31" },
			{ second_login: "2022-01-01" },
		],
		[{ player_id: 103 }, { first_login: "2021-12-22" }, { second_login: "" }],
		[{ player_id: 104 }, { first_login: "2022-01-14" }, { second_login: "" }],
		[{ player_id: 105 }, { first_login: "2022-01-06" }, { second_login: "" }],
		[
			{ player_id: 106 },
			{ first_login: "2022-01-24" },
			{ second_login: "2022-01-25" },
		],
	],
};

export const Table6 = {
	tableTitle: "players_login_dates",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "login_date" },
		{ col3: "next_login_date" },
	],
	tableData: [
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-14" },
			{ second_login_date: "2021-12-15" },
		],
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-15" },
			{ second_login_date: "2021-12-18" },
		],
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-18" },
			{ second_login_date: "2021-12-19" },
		],
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-19" },
			{ second_login_date: null },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2021-12-31" },
			{ second_login_date: "2022-01-01" },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2022-01-01" },
			{ second_login_date: "2022-01-15" },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2022-01-15" },
			{ second_login_date: "2022-01-15" },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2022-01-15" },
			{ second_login_date: null },
		],
		[
			{ player_id: 103 },
			{ first_login_date: "2020-12-22" },
			{ second_login_date: "2021-12-15" },
		],
		[
			{ player_id: 103 },
			{ first_login_date: "2021-12-15" },
			{ second_login_date: "2021-12-23" },
		],
		[
			{ player_id: 103 },
			{ first_login_date: "2021-12-23" },
			{ second_login_date: null },
		],
		[
			{ player_id: 104 },
			{ first_login_date: "2022-01-14" },
			{ second_login_date: null },
		],
		[
			{ player_id: 105 },
			{ first_login_date: "2022-01-06" },
			{ second_login_date: "2022-01-08" },
		],
		[
			{ player_id: 105 },
			{ first_login_date: "2022-01-08" },
			{ second_login_date: "2022-01-10" },
		],
		[
			{ player_id: 105 },
			{ first_login_date: "2022-01-10" },
			{ second_login_date: null },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-24" },
			{ second_login_date: "2022-01-24" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-24" },
			{ second_login_date: "2022-01-25" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-25" },
			{ second_login_date: "2022-01-25" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-25" },
			{ second_login_date: "2022-01-26" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-26" },
			{ second_login_date: "2022-01-26" },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-26" },
			{ second_login_date: null },
		],
	],
};

export const Table7 = {
	tableTitle: "players_data",
	tableCol: [
		{ col1: "player_id" },
		{ col2: "first_login_date" },
		{ col3: "second_login_date" },
		{ col4: "ranking" },
	],
	tableData: [
		[
			{ player_id: 101 },
			{ first_login_date: "2021-12-14" },
			{ second_login_date: "2021-12-15" },
			{ ranking: 1 },
		],
		[
			{ player_id: 102 },
			{ first_login_date: "2021-12-31" },
			{ second_login_date: "2022-01-01" },
			{ ranking: 1 },
		],
		[
			{ player_id: 103 },
			{ first_login_date: "2020-12-22" },
			{ second_login_date: "2021-12-15" },
			{ ranking: 1 },
		],
		[
			{ player_id: 104 },
			{ first_login_date: "2022-01-14" },
			{ second_login_date: null },
			{ ranking: 1 },
		],
		[
			{ player_id: 105 },
			{ first_login_date: "2022-01-06" },
			{ second_login_date: "2022-01-08" },
			{ ranking: 1 },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-24" },
			{ second_login_date: "2022-01-25" },
			{ ranking: 1 },
		],
		[
			{ player_id: 106 },
			{ first_login_date: "2022-01-24" },
			{ second_login_date: "2022-01-24" },
			{ ranking: 1 },
		],
	],
};

export const sqlCode = {
	code0: `SELECT * FROM players_logins`,

	code1: `SELECT *,
	DENSE_RANK() OVER (PARTITION BY player_id ORDER BY login_date) AS ranking
FROM player_logins`,

	code2: `WITH player_login_ranking AS (
	SELECT *,
		DENSE_RANK() OVER (PARTITION BY player_id ORDER BY login_date) AS ranking
	FROM players_logins
)`,

	code3: `SELECT DISTINCT 
	a.player_id,
	a.login_date AS first_login_date,
	b.login_date AS second_login_date
FROM player_login_ranking a
LEFT JOIN player_login_ranking b ON a.player_id = b.player_id
	AND a.ranking = b.ranking - 1
	AND DATEDIFF(b.login_date, a.login_date) = 1
WHERE a.ranking = 1`,

	code4: `SELECT CONCAT(
	ROUND(COUNT(second_login_date) / COUNT(first_login_date), 2) * 100, 
	'%'
) AS 'First Day Retention Rate'
FROM (
	SELECT DISTINCT 
		a.player_id,
		a.login_date AS first_login_date,
		b.login_date AS second_login_date
	FROM player_login_ranking a
	LEFT JOIN player_login_ranking b ON a.player_id = b.player_id
		AND a.ranking = b.ranking - 1
		AND DATEDIFF(b.login_date, a.login_date) = 1
	WHERE a.ranking = 1
) retention_data`,

	code5: `WITH player_login_ranking AS (
	SELECT *,
		DENSE_RANK() OVER (PARTITION BY player_id ORDER BY login_date) AS ranking
	FROM players_logins
)
SELECT 
	CONCAT(
		ROUND(COUNT(second_login_date) / COUNT(first_login_date), 2) * 100,
		'%'
	) AS 'First Day Retention Rate'
FROM (
	SELECT DISTINCT 
		a.player_id,
		a.login_date AS first_login_date,
		b.login_date AS second_login_date
	FROM player_login_ranking a
	LEFT JOIN player_login_ranking b ON a.player_id = b.player_id
		AND a.ranking = b.ranking - 1
		AND DATEDIFF(b.login_date, a.login_date) = 1
	WHERE a.ranking = 1
) retention_data`,

	code6: `SELECT 
	player_id,
	login_date,
	LEAD(login_date) OVER (PARTITION BY player_id ORDER BY ranking) AS next_login_date
FROM player_login_ranking`,

	code7: `SELECT *
FROM (
	SELECT DISTINCT 
		player_id,
		login_date AS first_login_date,
		LEAD(login_date) OVER (PARTITION BY player_id ORDER BY ranking) AS second_login_date,
		ranking
	FROM player_login_ranking
) ranked_logins
WHERE ranking = 1
ORDER BY 1, 2`,

	code8: `WITH player_login_ranking AS (
	SELECT *,
		DENSE_RANK() OVER (PARTITION BY player_id ORDER BY login_date) AS ranking
	FROM players_logins
)
SELECT 
	(COUNT(DISTINCT(CASE WHEN DATEDIFF(second_login_date, first_login_date) = 1 
	THEN player_id ELSE NULL END)) * 100) / COUNT(DISTINCT(player_id)) AS "First Day Retention Rate"
FROM (
	SELECT DISTINCT 
		player_id,
		login_date AS first_login_date,
		LEAD(login_date) OVER (PARTITION BY player_id ORDER BY ranking) AS second_login_date,
		ranking
	FROM player_login_ranking
) ranked_logins
WHERE ranking = 1`,

	code9: `WITH player_login_ranking AS (
	SELECT *,
		DENSE_RANK() OVER (PARTITION BY player_id ORDER BY login_date) AS ranking
	FROM players_logins
)
SELECT 
	CONCAT(
		(COUNT(DISTINCT(CASE WHEN DATEDIFF(second_login_date, first_login_date) = 1 
		THEN player_id ELSE NULL END)) * 100) / COUNT(DISTINCT(player_id)),
		'%'
	) AS "First Day Retention Rate"
FROM (
	SELECT DISTINCT 
		player_id,
		login_date AS first_login_date,
		LEAD(login_date) OVER (PARTITION BY player_id ORDER BY ranking) AS second_login_date,
		ranking
	FROM player_login_ranking
) ranked_logins
WHERE ranking = 1`,

	code10: `CREATE TABLE 'players_logins' (
	'player_id:' int  NOT NULL ,
	'login_date:' datetime  NOT NULL ,
	PRIMARY KEY (
		'player_id:','login_date:'
	)
);
	
-- Insert data into the players_logins table
INSERT INTO players_logins (player_id, login_date)
VALUES
	(101, '2021-12-14'),
	(101, '2021-12-18'),
	(101, '2021-12-15'),
	(101, '2021-12-19'),
	(102, '2021-12-31'),
	(102, '2022-01-01'),
	(102, '2022-01-15'),
	(102, '2022-01-15'),
	(103, '2020-12-22'),
	(103, '2021-12-23'),
	(103, '2021-12-15'),
	(104, '2022-01-14'),
	(105, '2022-01-08'),
	(105, '2022-01-06'),
	(105, '2022-01-10'),
	(106, '2022-01-24'),
	(106, '2022-01-25'),
	(106, '2022-01-24'),
	(106, '2022-01-25'),
	(106, '2022-01-26'),
	(106, '2022-01-26');`,
};
