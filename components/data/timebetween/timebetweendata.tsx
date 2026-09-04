export const sqlCode = {
	code1: `SELECT * FROM facebook_web_log
ORDER BY 1,2`,

	code2: `WITH filtered_actions AS (
  SELECT * 
  FROM facebook_web_log
  WHERE action IN ('page_load', 'scroll_down')
  ORDER BY 1, 2
) 
SELECT * FROM filtered_actions`,

	code3: `actions_with_next AS (
  SELECT *,
    LEAD(timestamp) OVER (PARTITION BY user_id ORDER BY timestamp) AS next_timestamp,
    LEAD(action) OVER (PARTITION BY user_id ORDER BY timestamp) AS next_action
  FROM filtered_actions
)`,

	code4: `SELECT 
  user_id, 
  timestamp AS page_load_time, 
  next_timestamp AS scroll_down_time,
  TIMESTAMPDIFF(SECOND, timestamp, next_timestamp) AS time_diff,
  RANK() OVER (ORDER BY TIMESTAMPDIFF(SECOND, timestamp, next_timestamp)) AS ranking
FROM actions_with_next
WHERE action = 'page_load' 
  AND next_action = 'scroll_down'`,

	code5: `SELECT 
  user_id, 
  page_load_time, 
  scroll_down_time, 
  time_diff 
FROM (
  SELECT 
    user_id, 
    timestamp AS page_load_time, 
    next_timestamp AS scroll_down_time,
    TIMESTAMPDIFF(SECOND, timestamp, next_timestamp) AS time_diff,
    RANK() OVER (ORDER BY TIMESTAMPDIFF(SECOND, timestamp, next_timestamp)) AS ranking
  FROM actions_with_next
  WHERE action = 'page_load' 
    AND next_action = 'scroll_down'
) ranked_results
WHERE ranking = 1`,

	code6: `SELECT 
  user_id, 
  page_load_time, 
  scroll_down_time, 
  TIME_FORMAT(SEC_TO_TIME(time_diff), '%H:%i:%s') AS time_diff 
FROM (
  SELECT 
    user_id, 
    timestamp AS page_load_time, 
    next_timestamp AS scroll_down_time,
    TIMESTAMPDIFF(SECOND, timestamp, next_timestamp) AS time_diff,
    RANK() OVER (ORDER BY TIMESTAMPDIFF(SECOND, timestamp, next_timestamp)) AS ranking
  FROM actions_with_next
  WHERE action = 'page_load' 
    AND next_action = 'scroll_down'
) ranked_results
WHERE ranking = 1`,

	code7: `WITH filtered_actions AS (
  SELECT * 
  FROM facebook_web_log
  WHERE action IN ('page_load', 'scroll_down')
  ORDER BY 1, 2
),

actions_with_next AS (
  SELECT *,
    LEAD(timestamp) OVER (PARTITION BY user_id ORDER BY timestamp) AS next_timestamp,
    LEAD(action) OVER (PARTITION BY user_id ORDER BY timestamp) AS next_action
  FROM filtered_actions
)

SELECT 
  user_id, 
  page_load_time, 
  scroll_down_time, 
  TIME_FORMAT(SEC_TO_TIME(time_diff), '%H:%i:%s') AS time_diff 
FROM (
  SELECT 
    user_id, 
    timestamp AS page_load_time, 
    next_timestamp AS scroll_down_time,
    TIMESTAMPDIFF(SECOND, timestamp, next_timestamp) AS time_diff,
    RANK() OVER (ORDER BY TIMESTAMPDIFF(SECOND, timestamp, next_timestamp)) AS ranking
  FROM actions_with_next
  WHERE action = 'page_load' 
    AND next_action = 'scroll_down'
) ranked_results
WHERE ranking = 1`,

	code8: `CREATE TABLE facebook_web_log (
  user_id INT,
  timestamp TIMESTAMP,
  action VARCHAR(20)
);

INSERT INTO facebook_web_log (user_id, timestamp, action)
VALUES
  (0, '2019-04-25 13:30:15', 'page_load'),
  (0, '2019-04-25 13:30:18', 'page_load'),
  (0, '2019-04-25 13:30:40', 'scroll_down'),
  (0, '2019-04-25 13:30:45', 'scroll_up'),
  (0, '2019-04-25 13:31:10', 'scroll_down'),
  (0, '2019-04-25 13:31:25', 'scroll_down'),
  (0, '2019-04-25 13:31:40', 'page_exit'),
  (1, '2019-04-25 13:40:00', 'page_load'),
  (1, '2019-04-25 13:40:10', 'scroll_down'),
  (1, '2019-04-25 13:40:15', 'scroll_down'),
  (1, '2019-04-25 13:40:20', 'scroll_down'),
  (1, '2019-04-25 13:40:25', 'scroll_down'),
  (1, '2019-04-25 13:40:30', 'scroll_down'),
  (1, '2019-04-25 13:40:35', 'page_exit'),
  (2, '2019-04-25 13:41:21', 'page_load'),
  (2, '2019-04-25 13:41:30', 'scroll_down'),
  (2, '2019-04-25 13:41:35', 'scroll_down'),
  (2, '2019-04-25 13:41:40', 'scroll_up'),
  (1, '2019-04-26 11:15:00', 'page_load'),
  (1, '2019-04-26 11:15:10', 'scroll_down'),
  (1, '2019-04-26 11:15:20', 'scroll_down'),
  (1, '2019-04-26 11:15:25', 'scroll_up'),
  (1, '2019-04-26 11:15:35', 'page_exit'),
  (0, '2019-04-28 14:30:15', 'page_load'),
  (0, '2019-04-28 14:30:10', 'page_load'),
  (0, '2019-04-28 13:30:40', 'scroll_down'),
  (0, '2019-04-28 15:31:40', 'page_exit');
`,
};

export const Table1 = {
	tableTitle: "User Activity Table",
	tableCol: [{ col1: "User ID" }, { col2: "Timestamp" }, { col3: "Action" }],
	tableData: [
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:15" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:18" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:40" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:45" },
			{ Action: "scroll_up" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:31:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:31:25" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:31:40" },
			{ Action: "page_exit" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 13:30:40" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 14:30:10" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 14:30:15" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 15:31:40" },
			{ Action: "page_exit" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:00" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:15" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:20" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:25" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:30" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:35" },
			{ Action: "page_exit" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:00" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:20" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:25" },
			{ Action: "scroll_up" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:35" },
			{ Action: "page_exit" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:21" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:30" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:35" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:40" },
			{ Action: "scroll_up" },
		],
	],
};

export const Table2 = {
	tableTitle: "User Activity Table",
	tableCol: [{ col1: "User ID" }, { col2: "Timestamp" }, { col3: "Action" }],
	tableData: [
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:15" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:18" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:30:40" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:31:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-25 13:31:25" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 13:30:40" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 14:30:10" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 0 },
			{ Timestamp: "2019-04-28 14:30:15" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:00" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:15" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:20" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:25" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-25 13:40:30" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:00" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:10" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 1 },
			{ Timestamp: "2019-04-26 11:15:20" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:21" },
			{ Action: "page_load" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:30" },
			{ Action: "scroll_down" },
		],
		[
			{ User_ID: 2 },
			{ Timestamp: "2019-04-25 13:41:35" },
			{ Action: "scroll_down" },
		],
	],
};

export const Table3 = {
	tableTitle: "user_action_data_with_next",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "timestamp" },
		{ col3: "action" },
		{ col4: "next_timestamp" },
		{ col5: "next_action" },
	],
	tableData: [
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-25 13:30:15" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-25 13:30:18" },
			{ next_action: "page_load" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-25 13:30:18" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-25 13:30:40" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-25 13:30:40" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:31:10" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-25 13:31:10" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:31:25" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-25 13:31:25" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-28 13:30:40" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-28 13:30:40" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-28 14:30:10" },
			{ next_action: "page_load" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-28 14:30:10" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-28 14:30:15" },
			{ next_action: "page_load" },
		],
		[
			{ user_id: 0 },
			{ timestamp: "2019-04-28 14:30:15" },
			{ action: "page_load" },
			{ next_timestamp: "" },
			{ next_action: "" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:00" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-25 13:40:10" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:10" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:40:15" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:15" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:40:20" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:20" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:40:25" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:25" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:40:30" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-25 13:40:30" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-26 11:15:00" },
			{ next_action: "page_load" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-26 11:15:00" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-26 11:15:10" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-26 11:15:10" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-26 11:15:20" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 1 },
			{ timestamp: "2019-04-26 11:15:20" },
			{ action: "scroll_down" },
			{ next_timestamp: "" },
			{ next_action: "" },
		],
		[
			{ user_id: 2 },
			{ timestamp: "2019-04-25 13:41:21" },
			{ action: "page_load" },
			{ next_timestamp: "2019-04-25 13:41:30" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 2 },
			{ timestamp: "2019-04-25 13:41:30" },
			{ action: "scroll_down" },
			{ next_timestamp: "2019-04-25 13:41:35" },
			{ next_action: "scroll_down" },
		],
		[
			{ user_id: 2 },
			{ timestamp: "2019-04-25 13:41:35" },
			{ action: "scroll_down" },
			{ next_timestamp: "" },
			{ next_action: "" },
		],
	],
};

export const Table4 = {
	tableTitle: "user_action_data_with_time",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "page_load_time" },
		{ col3: "scroll_down_time" },
		{ col4: "time_diff" },
		{ col5: "ranking" },
	],
	tableData: [
		[
			{ user_id: 2 },
			{ page_load_time: "2019-04-25 13:41:21" },
			{ scroll_down_time: "2019-04-25 13:41:30" },
			{ time_diff: 9 },
			{ ranking: 1 },
		],
		[
			{ user_id: 1 },
			{ page_load_time: "2019-04-25 13:40:00" },
			{ scroll_down_time: "2019-04-25 13:40:10" },
			{ time_diff: 10 },
			{ ranking: 2 },
		],
		[
			{ user_id: 1 },
			{ page_load_time: "2019-04-26 11:15:00" },
			{ scroll_down_time: "2019-04-26 11:15:10" },
			{ time_diff: 10 },
			{ ranking: 2 },
		],
		[
			{ user_id: 0 },
			{ page_load_time: "2019-04-25 13:30:18" },
			{ scroll_down_time: "2019-04-25 13:30:40" },
			{ time_diff: 22 },
			{ ranking: 4 },
		],
	],
};

export const Table5 = {
	tableTitle: "user_action_data_with_time",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "page_load_time" },
		{ col3: "scroll_down_time" },
		{ col4: "time_diff" },
	],
	tableData: [
		[
			{ user_id: 2 },
			{ page_load_time: "2019-04-25 13:41:21" },
			{ scroll_down_time: "2019-04-25 13:41:30" },
			{ time_diff: 9 },
		],
	],
};

export const Table6 = {
	tableTitle: "User Activity Table",
	tableCol: [
		{ col1: "User_ID" },
		{ col2: "Page_Load_Time" },
		{ col3: "Scroll_Down_Time" },
		{ col4: "Time_Difference" },
	],
	tableData: [
		[
			{ User_id: 2 },
			{ Pag_Load_Time: "2019-04-25 13:41:21" },
			{ Scroll_Down_Time: "2019-04-25 13:41:30" },
			{ Time_Difference: "00:00:09" },
		],
	],
};
