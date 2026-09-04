export const sqlCode = {
	code1: `SELECT * FROM user_streaks
ORDER BY 1,2`,

	code2: `WITH distinct_visits AS (
  SELECT DISTINCT user_id, date_visited 
  FROM user_streaks
  WHERE date_visited <= '2022-08-10'
  ORDER BY 1, 2
)
SELECT * FROM distinct_visits`,

	code3: `visits_with_id AS (
  SELECT 
    ROW_NUMBER() OVER (ORDER BY user_id, date_visited) AS id,
    user_id,
    date_visited AS date
  FROM distinct_visits
)`,

	code4: `visits_with_prev_date AS (
  SELECT *, 
    LAG(date) OVER (PARTITION BY user_id ORDER BY date) AS prev_date 
  FROM visits_with_id
)
SELECT * FROM visits_with_prev_date`,

	code5: `CASE WHEN DATEDIFF(date, prev_date) != 1 OR prev_date IS NULL THEN 1 ELSE 0 END AS start_id`,

	code6: `SUM(CASE WHEN DATEDIFF(date, prev_date) != 1 OR prev_date IS NULL 
THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY id) AS streak_id`,

	code7: `SELECT 
  user_id, 
  SUM(CASE WHEN DATEDIFF(date, prev_date) != 1 OR prev_date IS NULL 
THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY id) AS streak_id
FROM visits_with_prev_date`,

	code8: `streak_rankings AS (
  SELECT 
    user_id, 
    streak_id, 
    COUNT(streak_id) AS streak_length,
    RANK() OVER (PARTITION BY user_id ORDER BY COUNT(streak_id) DESC) AS ranking 
  FROM visits_with_streaks
  GROUP BY 1, 2
)
SELECT user_id, streak_length 
FROM streak_rankings
WHERE ranking = 1
ORDER BY 2 DESC 
LIMIT 3`,

	code9: `WITH distinct_visits AS (
  SELECT DISTINCT user_id, date_visited 
  FROM user_streaks
  WHERE date_visited <= '2022-08-10'
  ORDER BY 1, 2
),
visits_with_id AS (
  SELECT 
    ROW_NUMBER() OVER (ORDER BY user_id, date_visited) AS id,
    user_id,
    date_visited AS date
  FROM distinct_visits
),
visits_with_prev_date AS (
  SELECT *, 
    LAG(date) OVER (PARTITION BY user_id ORDER BY date) AS prev_date 
  FROM visits_with_id
),
visits_with_streaks AS (
  SELECT 
    user_id, 
    SUM(CASE WHEN DATEDIFF(date, prev_date) != 1 OR prev_date IS NULL 
    THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY id) AS streak_id
  FROM visits_with_prev_date
),
streak_rankings AS (
  SELECT 
    user_id, 
    streak_id, 
    COUNT(streak_id) AS streak_length,
    RANK() OVER (PARTITION BY user_id ORDER BY COUNT(streak_id) DESC) AS ranking 
  FROM visits_with_streaks
  GROUP BY 1, 2
)
SELECT user_id, streak_length 
FROM streak_rankings
WHERE ranking = 1
ORDER BY 2 DESC 
LIMIT 3`,

	code10: `-- Insert data into the user_streaks table
INSERT INTO user_streaks (user_id, date_visited) VALUES
('u001', '2022-08-01'),
('u001', '2022-08-01'),
('u004', '2022-08-01'),
('u005', '2022-08-01'),
('u005', '2022-08-01'),
('u003', '2022-08-02'),
('u004', '2022-08-02'),
('u004', '2022-08-02'),
('u004', '2022-08-02'),
('u004', '2022-08-02'),
('u005', '2022-08-02'),
('u005', '2022-08-02'),
('u001', '2022-08-03'),
('u002', '2022-08-03'),
('u002', '2022-08-03'),
('u004', '2022-08-03'),
('u005', '2022-08-03'),
('u001', '2022-08-04'),
('u004', '2022-08-04'),
('u005', '2022-08-04'),
('u001', '2022-08-05'),
('u004', '2022-08-05'),
('u005', '2022-08-05'),
('u006', '2022-08-05'),
('u004', '2022-08-05'),
('u005', '2022-08-05'),
('u006', '2022-08-06'),
('u006', '2022-08-06'),
('u003', '2022-08-06'),
('u003', '2022-08-06'),
('u003', '2022-08-06'),
('u004', '2022-08-06'),
('u005', '2022-08-06'),
('u006', '2022-08-07'),
('u001', '2022-08-07'),
('u001', '2022-08-07'),
('u001', '2022-08-07'),
('u003', '2022-08-07'),
('u004', '2022-08-07'),
('u005', '2022-08-07'),
('u006', '2022-08-08'),
('u001', '2022-08-08'),
('u002', '2022-08-08'),
('u002', '2022-08-08'),
('u002', '2022-08-08'),
('u003', '2022-08-08'),
('u003', '2022-08-08'),
('u004', '2022-08-08'),
('u005', '2022-08-08'),
('u005', '2022-08-08'),
('u001', '2022-08-09'),
('u003', '2022-08-09'),
('u003', '2022-08-09'),
('u004', '2022-08-09'),
('u005', '2022-08-09'),
('u001', '2022-08-10'),
('u002', '2022-08-10'),
('u003', '2022-08-10'),
('u004', '2022-08-10'),
('u005', '2022-08-10'),
('u001', '2022-08-11'),
('u002', '2022-08-11'),
('u003', '2022-08-11'),
('u004', '2022-08-11'),
('u005', '2022-08-11');
`,
};

export const Table1 = {
	tableTitle: "user_visits",
	tableCol: [{ col1: "user_id" }, { col2: "date_visited" }],
	tableData: [
		[{ user_id: "u001" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-08" }],
	],
};

export const Table2 = {
	tableTitle: "user_visits",
	tableCol: [{ col1: "user_id" }, { col2: "date_visited" }],
	tableData: [
		[{ user_id: "u001" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u001" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u002" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u003" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u004" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-01" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-02" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-03" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-04" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-05" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-06" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-07" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-08" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-09" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-10" }],
		[{ user_id: "u005" }, { date_visited: "2022-08-11" }],
		[{ user_id: "u006" }, { date_visited: "2022-08-05" }],
	],
};

export const Table3 = {
	tableTitle: "user_visits",
	tableCol: [{ col1: "id" }, { col2: "user_id" }, { col3: "date" }],
	tableData: [
		[{ id: 1 }, { user_id: "u001" }, { date: "2022-08-01" }],
		[{ id: 2 }, { user_id: "u001" }, { date: "2022-08-03" }],
		[{ id: 3 }, { user_id: "u001" }, { date: "2022-08-04" }],
		[{ id: 4 }, { user_id: "u001" }, { date: "2022-08-05" }],
		[{ id: 5 }, { user_id: "u001" }, { date: "2022-08-07" }],
		[{ id: 6 }, { user_id: "u001" }, { date: "2022-08-08" }],
		[{ id: 7 }, { user_id: "u001" }, { date: "2022-08-09" }],
		[{ id: 8 }, { user_id: "u001" }, { date: "2022-08-10" }],
		[{ id: 9 }, { user_id: "u001" }, { date: "2022-08-11" }],
		[{ id: 10 }, { user_id: "u002" }, { date: "2022-08-03" }],
		[{ id: 11 }, { user_id: "u002" }, { date: "2022-08-08" }],
		[{ id: 12 }, { user_id: "u002" }, { date: "2022-08-10" }],
		[{ id: 13 }, { user_id: "u002" }, { date: "2022-08-11" }],
		[{ id: 14 }, { user_id: "u003" }, { date: "2022-08-02" }],
		[{ id: 15 }, { user_id: "u003" }, { date: "2022-08-06" }],
		[{ id: 16 }, { user_id: "u003" }, { date: "2022-08-07" }],
		[{ id: 17 }, { user_id: "u003" }, { date: "2022-08-08" }],
		[{ id: 18 }, { user_id: "u003" }, { date: "2022-08-09" }],
		[{ id: 19 }, { user_id: "u003" }, { date: "2022-08-10" }],
		[{ id: 20 }, { user_id: "u003" }, { date: "2022-08-11" }],
		[{ id: 21 }, { user_id: "u004" }, { date: "2022-08-01" }],
		[{ id: 22 }, { user_id: "u004" }, { date: "2022-08-02" }],
		[{ id: 23 }, { user_id: "u004" }, { date: "2022-08-03" }],
		[{ id: 24 }, { user_id: "u004" }, { date: "2022-08-04" }],
		[{ id: 25 }, { user_id: "u004" }, { date: "2022-08-05" }],
		[{ id: 26 }, { user_id: "u004" }, { date: "2022-08-06" }],
		[{ id: 27 }, { user_id: "u004" }, { date: "2022-08-07" }],
		[{ id: 28 }, { user_id: "u004" }, { date: "2022-08-08" }],
		[{ id: 29 }, { user_id: "u004" }, { date: "2022-08-09" }],
		[{ id: 30 }, { user_id: "u004" }, { date: "2022-08-10" }],
		[{ id: 31 }, { user_id: "u004" }, { date: "2022-08-11" }],
		[{ id: 32 }, { user_id: "u005" }, { date: "2022-08-01" }],
		[{ id: 33 }, { user_id: "u005" }, { date: "2022-08-02" }],
		[{ id: 34 }, { user_id: "u005" }, { date: "2022-08-03" }],
		[{ id: 35 }, { user_id: "u005" }, { date: "2022-08-04" }],
		[{ id: 36 }, { user_id: "u005" }, { date: "2022-08-05" }],
		[{ id: 37 }, { user_id: "u005" }, { date: "2022-08-06" }],
		[{ id: 38 }, { user_id: "u005" }, { date: "2022-08-07" }],
		[{ id: 39 }, { user_id: "u005" }, { date: "2022-08-08" }],
		[{ id: 40 }, { user_id: "u005" }, { date: "2022-08-09" }],
		[{ id: 41 }, { user_id: "u005" }, { date: "2022-08-10" }],
		[{ id: 42 }, { user_id: "u005" }, { date: "2022-08-11" }],
		[{ id: 43 }, { user_id: "u006" }, { date: "2022-08-05" }],
		[{ id: 44 }, { user_id: "u006" }, { date: "2022-08-06" }],
		[{ id: 45 }, { user_id: "u006" }, { date: "2022-08-07" }],
		[{ id: 46 }, { user_id: "u006" }, { date: "2022-08-08" }],
	],
};

export const Table4 = {
	tableTitle: "user_visits",
	tableCol: [
		{ col1: "id" },
		{ col2: "user_id" },
		{ col3: "date" },
		{ col4: "prev_date" },
	],
	tableData: [
		[
			{ id: 1 },
			{ user_id: "u001" },
			{ date: "2022-08-01" },
			{ prev_date: null },
		],
		[
			{ id: 2 },
			{ user_id: "u001" },
			{ date: "2022-08-03" },
			{ prev_date: "2022-08-01" },
		],
		[
			{ id: 3 },
			{ user_id: "u001" },
			{ date: "2022-08-04" },
			{ prev_date: "2022-08-03" },
		],
		[
			{ id: 4 },
			{ user_id: "u001" },
			{ date: "2022-08-05" },
			{ prev_date: "2022-08-04" },
		],
		[
			{ id: 5 },
			{ user_id: "u001" },
			{ date: "2022-08-07" },
			{ prev_date: "2022-08-05" },
		],
		[
			{ id: 6 },
			{ user_id: "u001" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-07" },
		],
		[
			{ id: 7 },
			{ user_id: "u001" },
			{ date: "2022-08-09" },
			{ prev_date: "2022-08-08" },
		],
		[
			{ id: 8 },
			{ user_id: "u001" },
			{ date: "2022-08-10" },
			{ prev_date: "2022-08-09" },
		],
		[
			{ id: 9 },
			{ user_id: "u001" },
			{ date: "2022-08-11" },
			{ prev_date: "2022-08-10" },
		],
		[
			{ id: 10 },
			{ user_id: "u002" },
			{ date: "2022-08-03" },
			{ prev_date: null },
		],
		[
			{ id: 11 },
			{ user_id: "u002" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-03" },
		],
		[
			{ id: 12 },
			{ user_id: "u002" },
			{ date: "2022-08-10" },
			{ prev_date: "2022-08-08" },
		],
		[
			{ id: 13 },
			{ user_id: "u002" },
			{ date: "2022-08-11" },
			{ prev_date: "2022-08-10" },
		],
		[
			{ id: 14 },
			{ user_id: "u003" },
			{ date: "2022-08-02" },
			{ prev_date: null },
		],
		[
			{ id: 15 },
			{ user_id: "u003" },
			{ date: "2022-08-06" },
			{ prev_date: "2022-08-02" },
		],
		[
			{ id: 16 },
			{ user_id: "u003" },
			{ date: "2022-08-07" },
			{ prev_date: "2022-08-06" },
		],
		[
			{ id: 17 },
			{ user_id: "u003" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-07" },
		],
		[
			{ id: 18 },
			{ user_id: "u003" },
			{ date: "2022-08-09" },
			{ prev_date: "2022-08-08" },
		],
		[
			{ id: 19 },
			{ user_id: "u003" },
			{ date: "2022-08-10" },
			{ prev_date: "2022-08-09" },
		],
		[
			{ id: 20 },
			{ user_id: "u003" },
			{ date: "2022-08-11" },
			{ prev_date: "2022-08-10" },
		],
		[
			{ id: 21 },
			{ user_id: "u004" },
			{ date: "2022-08-01" },
			{ prev_date: null },
		],
		[
			{ id: 22 },
			{ user_id: "u004" },
			{ date: "2022-08-02" },
			{ prev_date: "2022-08-01" },
		],
		[
			{ id: 23 },
			{ user_id: "u004" },
			{ date: "2022-08-03" },
			{ prev_date: "2022-08-02" },
		],
		[
			{ id: 24 },
			{ user_id: "u004" },
			{ date: "2022-08-04" },
			{ prev_date: "2022-08-03" },
		],
		[
			{ id: 25 },
			{ user_id: "u004" },
			{ date: "2022-08-05" },
			{ prev_date: "2022-08-04" },
		],
		[
			{ id: 26 },
			{ user_id: "u004" },
			{ date: "2022-08-06" },
			{ prev_date: "2022-08-05" },
		],
		[
			{ id: 27 },
			{ user_id: "u004" },
			{ date: "2022-08-07" },
			{ prev_date: "2022-08-06" },
		],
		[
			{ id: 28 },
			{ user_id: "u004" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-07" },
		],
		[
			{ id: 29 },
			{ user_id: "u004" },
			{ date: "2022-08-09" },
			{ prev_date: "2022-08-08" },
		],
		[
			{ id: 30 },
			{ user_id: "u004" },
			{ date: "2022-08-10" },
			{ prev_date: "2022-08-09" },
		],
		[
			{ id: 31 },
			{ user_id: "u004" },
			{ date: "2022-08-11" },
			{ prev_date: "2022-08-10" },
		],
		[
			{ id: 32 },
			{ user_id: "u005" },
			{ date: "2022-08-01" },
			{ prev_date: null },
		],
		[
			{ id: 33 },
			{ user_id: "u005" },
			{ date: "2022-08-02" },
			{ prev_date: "2022-08-01" },
		],
		[
			{ id: 34 },
			{ user_id: "u005" },
			{ date: "2022-08-03" },
			{ prev_date: "2022-08-02" },
		],
		[
			{ id: 35 },
			{ user_id: "u005" },
			{ date: "2022-08-04" },
			{ prev_date: "2022-08-03" },
		],
		[
			{ id: 36 },
			{ user_id: "u005" },
			{ date: "2022-08-05" },
			{ prev_date: "2022-08-04" },
		],
		[
			{ id: 37 },
			{ user_id: "u005" },
			{ date: "2022-08-06" },
			{ prev_date: "2022-08-05" },
		],
		[
			{ id: 38 },
			{ user_id: "u005" },
			{ date: "2022-08-07" },
			{ prev_date: "2022-08-06" },
		],
		[
			{ id: 39 },
			{ user_id: "u005" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-07" },
		],
		[
			{ id: 40 },
			{ user_id: "u005" },
			{ date: "2022-08-09" },
			{ prev_date: "2022-08-08" },
		],
		[
			{ id: 41 },
			{ user_id: "u005" },
			{ date: "2022-08-10" },
			{ prev_date: "2022-08-09" },
		],
		[
			{ id: 42 },
			{ user_id: "u005" },
			{ date: "2022-08-11" },
			{ prev_date: "2022-08-10" },
		],
		[
			{ id: 43 },
			{ user_id: "u006" },
			{ date: "2022-08-05" },
			{ prev_date: null },
		],
		[
			{ id: 44 },
			{ user_id: "u006" },
			{ date: "2022-08-06" },
			{ prev_date: "2022-08-05" },
		],
		[
			{ id: 45 },
			{ user_id: "u006" },
			{ date: "2022-08-07" },
			{ prev_date: "2022-08-06" },
		],
		[
			{ id: 46 },
			{ user_id: "u006" },
			{ date: "2022-08-08" },
			{ prev_date: "2022-08-07" },
		],
	],
};

export const Table5 = {
	tableTitle: "user_streaks",
	tableCol: [{ col1: "user_id" }, { col2: "Streak_ID" }],
	tableData: [
		[{ user_id: "u001" }, { Streak_ID: 1 }],
		[{ user_id: "u001" }, { Streak_ID: 2 }],
		[{ user_id: "u001" }, { Streak_ID: 2 }],
		[{ user_id: "u001" }, { Streak_ID: 2 }],
		[{ user_id: "u001" }, { Streak_ID: 3 }],
		[{ user_id: "u001" }, { Streak_ID: 3 }],
		[{ user_id: "u001" }, { Streak_ID: 3 }],
		[{ user_id: "u001" }, { Streak_ID: 3 }],
		[{ user_id: "u001" }, { Streak_ID: 3 }],
		[{ user_id: "u002" }, { Streak_ID: 1 }],
		[{ user_id: "u002" }, { Streak_ID: 2 }],
		[{ user_id: "u002" }, { Streak_ID: 3 }],
		[{ user_id: "u002" }, { Streak_ID: 3 }],
		[{ user_id: "u003" }, { Streak_ID: 1 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u003" }, { Streak_ID: 2 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u004" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u005" }, { Streak_ID: 1 }],
		[{ user_id: "u006" }, { Streak_ID: 1 }],
		[{ user_id: "u006" }, { Streak_ID: 1 }],
		[{ user_id: "u006" }, { Streak_ID: 1 }],
	],
};

export const Table6 = {
	tableTitle: "user_streaks",
	tableCol: [{ col1: "user_id" }, { col2: "Streak_length" }],
	tableData: [
		[{ user_id: "u004" }, { Streak_length: 10 }],
		[{ user_id: "u005" }, { Streak_length: 10 }],
		[{ user_id: "u003" }, { Streak_length: 5 }],
	],
};
