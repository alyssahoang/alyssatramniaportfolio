export const sqlCode = {
	code1: `SELECT * FROM marketing_campaign
ORDER BY 1,2`,

	code2: `SELECT user_id
FROM marketing_campaign
GROUP BY user_id
HAVING COUNT(DISTINCT created_at) = 1`,

	code3: `SELECT 
	user_id,
	created_at,
	product_id,
	RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
FROM marketing_campaign
WHERE user_id NOT IN (
	SELECT user_id
	FROM marketing_campaign
	GROUP BY user_id
	HAVING COUNT(DISTINCT created_at) = 1
)`,

	code4: `WITH ranked_purchases AS (
	SELECT 
		user_id,
		created_at,
		product_id,
		RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
	FROM marketing_campaign
	WHERE user_id NOT IN (
		SELECT user_id
		FROM marketing_campaign
		GROUP BY user_id
		HAVING COUNT(DISTINCT created_at) = 1
	)
)
SELECT * FROM ranked_purchases`,

	code5: `WITH ranked_purchases AS (
	SELECT 
		user_id,
		created_at,
		product_id,
		RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
	FROM marketing_campaign
	WHERE user_id NOT IN (
		SELECT user_id
		FROM marketing_campaign
		GROUP BY user_id
		HAVING COUNT(DISTINCT created_at) = 1
	)
)
SELECT * FROM ranked_purchases`,

	code6: `WITH ranked_purchases AS (
	SELECT 
		user_id,
		created_at,
		product_id,
		RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
	FROM marketing_campaign
	WHERE user_id NOT IN (
		SELECT user_id
		FROM marketing_campaign
		GROUP BY user_id
		HAVING COUNT(DISTINCT created_at) = 1
	)
),
first_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking = 1
)
SELECT * FROM first_day_purchases`,

	code7: `other_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking != 1 
)
SELECT * FROM other_day_purchases`,

	code8: `WITH ranked_purchases AS (
	SELECT 
		user_id, 
		created_at, 
		product_id, 
		RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
	FROM marketing_campaign
	WHERE user_id NOT IN (
		SELECT user_id
		FROM marketing_campaign
		GROUP BY user_id
		HAVING COUNT(DISTINCT created_at) = 1
	)
), 

first_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking = 1 
),

other_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking != 1 
)

SELECT 
	other_day_purchases.user_id,
	other_day_purchases.product_id AS others_purchase,
	first_day_purchases.product_id AS first_day_purchase
FROM other_day_purchases
LEFT JOIN first_day_purchases ON other_day_purchases.user_id = first_day_purchases.user_id
	AND other_day_purchases.product_id = first_day_purchases.product_id`,

	code9: `SELECT COUNT(DISTINCT(other_day_purchases.user_id)) AS total_users
FROM other_day_purchases
LEFT JOIN first_day_purchases ON other_day_purchases.user_id = first_day_purchases.user_id
	AND other_day_purchases.product_id = first_day_purchases.product_id
WHERE first_day_purchases.product_id IS NULL`,

	code10: `WITH ranked_purchases AS (
	SELECT 
		user_id, 
		created_at, 
		product_id, 
		RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS ranking
	FROM marketing_campaign
	WHERE user_id NOT IN (
		SELECT user_id
		FROM marketing_campaign
		GROUP BY user_id
		HAVING COUNT(DISTINCT created_at) = 1
	)
), 

first_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking = 1 
),

other_day_purchases AS (
	SELECT *
	FROM ranked_purchases
	WHERE ranking != 1 
)

SELECT COUNT(DISTINCT(other_day_purchases.user_id)) AS total_users
FROM other_day_purchases
LEFT JOIN first_day_purchases ON other_day_purchases.user_id = first_day_purchases.user_id
	AND other_day_purchases.product_id = first_day_purchases.product_id
WHERE first_day_purchases.product_id IS NULL`,

	code11: `SELECT COUNT(DISTINCT user_id)
FROM marketing_campaign
WHERE user_id IN (
	SELECT user_id
	FROM marketing_campaign
	GROUP BY user_id
	HAVING COUNT(DISTINCT created_at) > 1
		AND COUNT(DISTINCT product_id) > 1
)
  
AND CONCAT(user_id, '_', product_id) NOT IN (
	SELECT CONCAT(user_id, '_', product_id) AS user_product
	FROM (
		SELECT *,
			RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS rn
		FROM marketing_campaign
	) ranked_data
	WHERE rn = 1 
)`,

	code12: `SELECT user_id
FROM marketing_campaign
GROUP BY user_id
HAVING COUNT(DISTINCT created_at) > 1
	AND COUNT(DISTINCT product_id) > 1`,

	code13: `AND CONCAT(user_id, '_', product_id) NOT IN (
	SELECT CONCAT(user_id, '_', product_id) AS user_product
	FROM (
		SELECT *,
			RANK() OVER (PARTITION BY user_id ORDER BY created_at) AS rn
		FROM marketing_campaign
	) ranked_data
	WHERE rn = 1 
)`,

	code14: `CREATE TABLE marketing_campaign (
	user_id INT,
	created_at DATETIME,
	product_id INT,
	quantity INT,
	price INT
);
INSERT INTO marketing_campaign (user_id, created_at, product_id, quantity, price)
VALUES
(10, '2019-01-01', 101, 3, 55),
(10, '2019-01-02', 119, 5, 29),
(10, '2019-03-31', 111, 2, 149),
(11, '2019-01-02', 105, 3, 234),
(11, '2019-03-31', 120, 3, 99),
(12, '2019-01-02', 112, 2, 200),
(12, '2019-03-31', 110, 2, 299),
(13, '2019-01-05', 113, 1, 67),
(13, '2019-03-31', 118, 3, 35),
(14, '2019-01-06', 109, 5, 199),
(14, '2019-01-06', 107, 2, 27),
(14, '2019-03-31', 112, 3, 200),
(15, '2019-01-08', 105, 4, 234),
(15, '2019-01-09', 110, 4, 299),
(15, '2019-03-31', 116, 2, 499),
(16, '2019-01-10', 113, 2, 67),
(16, '2019-03-31', 107, 4, 27),
(17, '2019-01-11', 116, 2, 499),
(17, '2019-03-31', 104, 1, 154),
(18, '2019-01-12', 114, 2, 248),
(18, '2019-01-12', 113, 4, 67),
(19, '2019-01-12', 114, 3, 248),
(20, '2019-01-15', 117, 2, 999),
(21, '2019-01-16', 105, 3, 234),
(21, '2019-01-17', 114, 4, 248),
(22, '2019-01-18', 113, 3, 67),
(22, '2019-01-19', 118, 4, 35),
(23, '2019-01-20', 119, 3, 29),
(24, '2019-01-21', 114, 2, 248),
(25, '2019-01-22', 114, 2, 248),
(25, '2019-01-22', 115, 2, 72),
(25, '2019-01-24', 114, 5, 248),
(25, '2019-01-27', 115, 1, 72),
(26, '2019-01-25', 115, 1, 72),
(27, '2019-01-26', 104, 3, 154),
(28, '2019-01-27', 101, 4, 55),
(29, '2019-01-27', 111, 3, 149),
(30, '2019-01-29', 111, 1, 149),
(31, '2019-01-30', 104, 3, 154),
(32, '2019-01-31', 117, 1, 999),
(33, '2019-01-31', 117, 2, 999),
(34, '2019-01-31', 110, 3, 299),
(35, '2019-02-03', 117, 2, 999),
(36, '2019-02-04', 102, 4, 82),
(37, '2019-02-05', 102, 2, 82),
(38, '2019-02-06', 113, 2, 67),
(39, '2019-02-07', 120, 5, 99),
(40, '2019-02-08', 115, 2, 72),
(41, '2019-02-08', 114, 1, 248),
(42, '2019-02-10', 105, 5, 234),
(43, '2019-02-11', 102, 1, 82),
(43, '2019-03-05', 104, 3, 154),
(44, '2019-02-12', 105, 3, 234),
(44, '2019-03-05', 102, 4, 82),
(45, '2019-02-13', 119, 5, 29),
(45, '2019-03-05', 105, 3, 234),
(46, '2019-02-14', 102, 4, 82),
(46, '2019-02-14', 102, 5, 29),
(46, '2019-03-09', 102, 2, 35),
(46, '2019-03-10', 103, 1, 199),
(46, '2019-03-11', 103, 1, 199),
(47, '2019-02-14', 110, 2, 299),
(47, '2019-03-11', 105, 5, 234),
(48, '2019-02-14', 115, 4, 72),
(48, '2019-03-12', 105, 3, 234),
(49, '2019-02-18', 106, 2, 123),
(49, '2019-02-18', 114, 1, 248),
(49, '2019-02-18', 112, 4, 200),
(49, '2019-02-18', 116, 1, 499),
(50, '2019-02-20', 118, 4, 35),
(50, '2019-02-21', 118, 4, 29),
(50, '2019-03-13', 118, 5, 299),
(50, '2019-03-14', 118, 2, 199),
(51, '2019-02-21', 120, 2, 99),
(51, '2019-03-13', 108, 4, 120),
(52, '2019-02-23', 117, 2, 999),
(52, '2019-03-18', 112, 5, 200),
(53, '2019-02-24', 120, 4, 99),
(53, '2019-03-19', 105, 5, 234),
(54, '2019-02-25', 119, 4, 29),
(54, '2019-03-20', 110, 1, 299),
(55, '2019-02-26', 117, 2, 999),
(55, '2019-03-20', 117, 5, 999),
(56, '2019-02-27', 115, 2, 72),
(56, '2019-03-20', 116, 2, 499),
(57, '2019-02-28', 105, 4, 234),
(57, '2019-02-28', 106, 1, 123),
(57, '2019-03-20', 108, 1, 120),
(57, '2019-03-20', 103, 1, 79),
(58, '2019-02-28', 104, 1, 154),
(58, '2019-03-01', 101, 3, 55),
(58, '2019-03-02', 119, 2, 29),
(58, '2019-03-25', 102, 2, 82),
(59, '2019-03-04', 117, 4, 999),
(60, '2019-03-05', 114, 3, 248),
(61, '2019-03-26', 120, 2, 99),
(62, '2019-03-27', 106, 1, 123),
(63, '2019-03-27', 120, 5, 99),
(64, '2019-03-27', 105, 3, 234),
(65, '2019-03-27', 103, 4, 79),
(66, '2019-03-31', 107, 2, 27),
(67, '2019-03-31', 102, 5, 82);
`,
};

export const Table1 = {
	tableTitle: "marketing_campaign",
	// tableCol: [
	// 	{ key: "col1", label: "user_id" },
	// 	{ key: "col2", label: "created_at" },
	// 	{ key: "col3", label: "product_id" },
	// 	{ key: "col4", label: "quantity" },
	// 	{ key: "col5", label: "price" },
	// ],
	tableCol: [
		{ col1: "user_id" },
		{ col2: "created_at" },
		{ col3: "product_id" },
		{ col4: "quantity" },
		{ col5: "price" },
	],
	tableData: [
		[
			{ user_id: 10 },
			{ created_at: "2019-01-01" },
			{ product_id: 101 },
			{ quantity: 3 },
			{ price: 55 },
		],
		[
			{ user_id: 10 },
			{ created_at: "2019-01-02" },
			{ product_id: 119 },
			{ quantity: 5 },
			{ price: 29 },
		],
		[
			{ user_id: 10 },
			{ created_at: "2019-03-31" },
			{ product_id: 111 },
			{ quantity: 2 },
			{ price: 149 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-01-02" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-03-31" },
			{ product_id: 120 },
			{ quantity: 3 },
			{ price: 99 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-01-02" },
			{ product_id: 112 },
			{ quantity: 2 },
			{ price: 200 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-03-31" },
			{ product_id: 110 },
			{ quantity: 2 },
			{ price: 299 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-01-05" },
			{ product_id: 113 },
			{ quantity: 1 },
			{ price: 67 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-03-31" },
			{ product_id: 118 },
			{ quantity: 3 },
			{ price: 35 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 109 },
			{ quantity: 5 },
			{ price: 199 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 107 },
			{ quantity: 2 },
			{ price: 27 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-03-31" },
			{ product_id: 112 },
			{ quantity: 3 },
			{ price: 200 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-08" },
			{ product_id: 105 },
			{ quantity: 4 },
			{ price: 234 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-09" },
			{ product_id: 110 },
			{ quantity: 4 },
			{ price: 299 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-03-31" },
			{ product_id: 116 },
			{ quantity: 2 },
			{ price: 499 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-01-10" },
			{ product_id: 113 },
			{ quantity: 2 },
			{ price: 67 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-03-31" },
			{ product_id: 107 },
			{ quantity: 4 },
			{ price: 27 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-01-11" },
			{ product_id: 116 },
			{ quantity: 2 },
			{ price: 499 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-03-31" },
			{ product_id: 104 },
			{ quantity: 1 },
			{ price: 154 },
		],
		[
			{ user_id: 18 },
			{ created_at: "2019-01-12" },
			{ product_id: 114 },
			{ quantity: 2 },
			{ price: 248 },
		],
		[
			{ user_id: 18 },
			{ created_at: "2019-01-12" },
			{ product_id: 113 },
			{ quantity: 4 },
			{ price: 67 },
		],
		[
			{ user_id: 19 },
			{ created_at: "2019-01-12" },
			{ product_id: 114 },
			{ quantity: 3 },
			{ price: 248 },
		],
		[
			{ user_id: 20 },
			{ created_at: "2019-01-15" },
			{ product_id: 117 },
			{ quantity: 2 },
			{ price: 999 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-16" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-17" },
			{ product_id: 114 },
			{ quantity: 4 },
			{ price: 248 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-18" },
			{ product_id: 113 },
			{ quantity: 3 },
			{ price: 67 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-19" },
			{ product_id: 118 },
			{ quantity: 4 },
			{ price: 35 },
		],
		[
			{ user_id: 23 },
			{ created_at: "2019-01-20" },
			{ product_id: 119 },
			{ quantity: 3 },
			{ price: 29 },
		],
		[
			{ user_id: 24 },
			{ created_at: "2019-01-21" },
			{ product_id: 114 },
			{ quantity: 2 },
			{ price: 248 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 114 },
			{ quantity: 2 },
			{ price: 248 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 115 },
			{ quantity: 2 },
			{ price: 72 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-24" },
			{ product_id: 114 },
			{ quantity: 5 },
			{ price: 248 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-27" },
			{ product_id: 115 },
			{ quantity: 1 },
			{ price: 72 },
		],
		[
			{ user_id: 26 },
			{ created_at: "2019-01-25" },
			{ product_id: 115 },
			{ quantity: 1 },
			{ price: 72 },
		],
		[
			{ user_id: 27 },
			{ created_at: "2019-01-26" },
			{ product_id: 104 },
			{ quantity: 3 },
			{ price: 154 },
		],
		[
			{ user_id: 28 },
			{ created_at: "2019-01-27" },
			{ product_id: 101 },
			{ quantity: 4 },
			{ price: 55 },
		],
		[
			{ user_id: 29 },
			{ created_at: "2019-01-27" },
			{ product_id: 111 },
			{ quantity: 3 },
			{ price: 149 },
		],
		[
			{ user_id: 30 },
			{ created_at: "2019-01-29" },
			{ product_id: 111 },
			{ quantity: 1 },
			{ price: 149 },
		],
		[
			{ user_id: 31 },
			{ created_at: "2019-01-30" },
			{ product_id: 104 },
			{ quantity: 3 },
			{ price: 154 },
		],
		[
			{ user_id: 32 },
			{ created_at: "2019-01-31" },
			{ product_id: 117 },
			{ quantity: 1 },
			{ price: 999 },
		],
		[
			{ user_id: 33 },
			{ created_at: "2019-01-31" },
			{ product_id: 117 },
			{ quantity: 2 },
			{ price: 999 },
		],
		[
			{ user_id: 34 },
			{ created_at: "2019-01-31" },
			{ product_id: 110 },
			{ quantity: 3 },
			{ price: 299 },
		],
		[
			{ user_id: 35 },
			{ created_at: "2019-02-03" },
			{ product_id: 117 },
			{ quantity: 2 },
			{ price: 999 },
		],
		[
			{ user_id: 36 },
			{ created_at: "2019-02-04" },
			{ product_id: 102 },
			{ quantity: 4 },
			{ price: 82 },
		],
		[
			{ user_id: 37 },
			{ created_at: "2019-02-05" },
			{ product_id: 102 },
			{ quantity: 2 },
			{ price: 82 },
		],
		[
			{ user_id: 38 },
			{ created_at: "2019-02-06" },
			{ product_id: 113 },
			{ quantity: 2 },
			{ price: 67 },
		],
		[
			{ user_id: 39 },
			{ created_at: "2019-02-07" },
			{ product_id: 120 },
			{ quantity: 5 },
			{ price: 99 },
		],
		[
			{ user_id: 40 },
			{ created_at: "2019-02-08" },
			{ product_id: 115 },
			{ quantity: 2 },
			{ price: 72 },
		],
		[
			{ user_id: 41 },
			{ created_at: "2019-02-08" },
			{ product_id: 114 },
			{ quantity: 1 },
			{ price: 248 },
		],
		[
			{ user_id: 42 },
			{ created_at: "2019-02-10" },
			{ product_id: 105 },
			{ quantity: 5 },
			{ price: 234 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-02-11" },
			{ product_id: 102 },
			{ quantity: 1 },
			{ price: 82 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-03-05" },
			{ product_id: 104 },
			{ quantity: 3 },
			{ price: 154 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-02-12" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-03-05" },
			{ product_id: 102 },
			{ quantity: 4 },
			{ price: 82 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-02-13" },
			{ product_id: 119 },
			{ quantity: 5 },
			{ price: 29 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-03-05" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ quantity: 4 },
			{ price: 82 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ quantity: 5 },
			{ price: 29 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-09" },
			{ product_id: 102 },
			{ quantity: 2 },
			{ price: 35 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-10" },
			{ product_id: 103 },
			{ quantity: 1 },
			{ price: 199 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-11" },
			{ product_id: 103 },
			{ quantity: 1 },
			{ price: 199 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-02-14" },
			{ product_id: 110 },
			{ quantity: 2 },
			{ price: 299 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-03-11" },
			{ product_id: 105 },
			{ quantity: 5 },
			{ price: 234 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-02-14" },
			{ product_id: 115 },
			{ quantity: 4 },
			{ price: 72 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-03-12" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 49 },
			{ created_at: "2019-02-18" },
			{ product_id: 106 },
			{ quantity: 2 },
			{ price: 123 },
		],
		[
			{ user_id: 49 },
			{ created_at: "2019-02-18" },
			{ product_id: 114 },
			{ quantity: 1 },
			{ price: 248 },
		],
		[
			{ user_id: 49 },
			{ created_at: "2019-02-18" },
			{ product_id: 112 },
			{ quantity: 4 },
			{ price: 200 },
		],
		[
			{ user_id: 49 },
			{ created_at: "2019-02-18" },
			{ product_id: 116 },
			{ quantity: 1 },
			{ price: 499 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-20" },
			{ product_id: 118 },
			{ quantity: 4 },
			{ price: 35 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-21" },
			{ product_id: 118 },
			{ quantity: 4 },
			{ price: 29 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-13" },
			{ product_id: 118 },
			{ quantity: 5 },
			{ price: 299 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-14" },
			{ product_id: 118 },
			{ quantity: 2 },
			{ price: 199 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-02-21" },
			{ product_id: 120 },
			{ quantity: 2 },
			{ price: 99 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-03-13" },
			{ product_id: 108 },
			{ quantity: 4 },
			{ price: 120 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-02-23" },
			{ product_id: 117 },
			{ quantity: 2 },
			{ price: 999 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-03-18" },
			{ product_id: 112 },
			{ quantity: 5 },
			{ price: 200 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-02-24" },
			{ product_id: 120 },
			{ quantity: 4 },
			{ price: 99 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-03-19" },
			{ product_id: 105 },
			{ quantity: 5 },
			{ price: 234 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-02-25" },
			{ product_id: 119 },
			{ quantity: 4 },
			{ price: 29 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-03-20" },
			{ product_id: 110 },
			{ quantity: 1 },
			{ price: 299 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-02-26" },
			{ product_id: 117 },
			{ quantity: 2 },
			{ price: 999 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-03-20" },
			{ product_id: 117 },
			{ quantity: 5 },
			{ price: 999 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-02-27" },
			{ product_id: 115 },
			{ quantity: 2 },
			{ price: 72 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-03-20" },
			{ product_id: 116 },
			{ quantity: 2 },
			{ price: 499 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 105 },
			{ quantity: 4 },
			{ price: 234 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 106 },
			{ quantity: 1 },
			{ price: 123 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 108 },
			{ quantity: 1 },
			{ price: 120 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 103 },
			{ quantity: 1 },
			{ price: 79 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-02-28" },
			{ product_id: 104 },
			{ quantity: 1 },
			{ price: 154 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-01" },
			{ product_id: 101 },
			{ quantity: 3 },
			{ price: 55 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-02" },
			{ product_id: 119 },
			{ quantity: 2 },
			{ price: 29 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-25" },
			{ product_id: 102 },
			{ quantity: 2 },
			{ price: 82 },
		],
		[
			{ user_id: 59 },
			{ created_at: "2019-03-04" },
			{ product_id: 117 },
			{ quantity: 4 },
			{ price: 999 },
		],
		[
			{ user_id: 60 },
			{ created_at: "2019-03-05" },
			{ product_id: 114 },
			{ quantity: 3 },
			{ price: 248 },
		],
		[
			{ user_id: 61 },
			{ created_at: "2019-03-26" },
			{ product_id: 120 },
			{ quantity: 2 },
			{ price: 99 },
		],
		[
			{ user_id: 62 },
			{ created_at: "2019-03-27" },
			{ product_id: 106 },
			{ quantity: 1 },
			{ price: 123 },
		],
		[
			{ user_id: 63 },
			{ created_at: "2019-03-27" },
			{ product_id: 120 },
			{ quantity: 5 },
			{ price: 99 },
		],
		[
			{ user_id: 64 },
			{ created_at: "2019-03-27" },
			{ product_id: 105 },
			{ quantity: 3 },
			{ price: 234 },
		],
		[
			{ user_id: 65 },
			{ created_at: "2019-03-27" },
			{ product_id: 103 },
			{ quantity: 4 },
			{ price: 79 },
		],
		[
			{ user_id: 66 },
			{ created_at: "2019-03-31" },
			{ product_id: 107 },
			{ quantity: 2 },
			{ price: 27 },
		],
		[
			{ user_id: 67 },
			{ created_at: "2019-03-31" },
			{ product_id: 102 },
			{ quantity: 5 },
			{ price: 82 },
		],
	],
};

export const Table2 = {
	tableTitle: "user_id_data",
	tableCol: [{ col1: "user_id" }],
	tableData: [
		[{ user_id: 10 }],
		[{ user_id: 11 }],
		[{ user_id: 12 }],
		[{ user_id: 13 }],
		[{ user_id: 14 }],
		[{ user_id: 15 }],
		[{ user_id: 16 }],
		[{ user_id: 17 }],
		[{ user_id: 18 }],
		[{ user_id: 19 }],
		[{ user_id: 20 }],
		[{ user_id: 21 }],
		[{ user_id: 22 }],
		[{ user_id: 23 }],
		[{ user_id: 24 }],
		[{ user_id: 25 }],
		[{ user_id: 26 }],
		[{ user_id: 27 }],
		[{ user_id: 28 }],
		[{ user_id: 29 }],
		[{ user_id: 30 }],
		[{ user_id: 31 }],
		[{ user_id: 32 }],
		[{ user_id: 33 }],
		[{ user_id: 34 }],
		[{ user_id: 35 }],
		[{ user_id: 36 }],
		[{ user_id: 37 }],
		[{ user_id: 38 }],
		[{ user_id: 39 }],
		[{ user_id: 40 }],
		[{ user_id: 41 }],
		[{ user_id: 42 }],
		[{ user_id: 43 }],
		[{ user_id: 44 }],
		[{ user_id: 45 }],
		[{ user_id: 46 }],
		[{ user_id: 47 }],
		[{ user_id: 48 }],
		[{ user_id: 49 }],
		[{ user_id: 50 }],
		[{ user_id: 51 }],
		[{ user_id: 52 }],
		[{ user_id: 53 }],
		[{ user_id: 54 }],
		[{ user_id: 55 }],
		[{ user_id: 56 }],
		[{ user_id: 57 }],
		[{ user_id: 58 }],
		[{ user_id: 59 }],
		[{ user_id: 60 }],
		[{ user_id: 61 }],
		[{ user_id: 62 }],
		[{ user_id: 63 }],
		[{ user_id: 64 }],
		[{ user_id: 65 }],
		[{ user_id: 66 }],
		[{ user_id: 67 }],
	],
};

export const Table3 = {
	tableTitle: "user_data",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "created_at" },
		{ col3: "product_id" },
	],
	tableData: [
		[{ user_id: 10 }, { created_at: "2019-01-01" }, { product_id: 101 }],
		[{ user_id: 10 }, { created_at: "2019-01-02" }, { product_id: 119 }],
		[{ user_id: 10 }, { created_at: "2019-03-31" }, { product_id: 111 }],
		[{ user_id: 11 }, { created_at: "2019-01-02" }, { product_id: 105 }],
		[{ user_id: 11 }, { created_at: "2019-03-31" }, { product_id: 120 }],
		[{ user_id: 12 }, { created_at: "2019-01-02" }, { product_id: 112 }],
		[{ user_id: 12 }, { created_at: "2019-03-31" }, { product_id: 110 }],
		[{ user_id: 13 }, { created_at: "2019-01-05" }, { product_id: 113 }],
		[{ user_id: 13 }, { created_at: "2019-03-31" }, { product_id: 118 }],
		[{ user_id: 14 }, { created_at: "2019-01-06" }, { product_id: 109 }],
		[{ user_id: 14 }, { created_at: "2019-01-06" }, { product_id: 107 }],
		[{ user_id: 14 }, { created_at: "2019-03-31" }, { product_id: 112 }],
		[{ user_id: 15 }, { created_at: "2019-01-08" }, { product_id: 105 }],
		[{ user_id: 15 }, { created_at: "2019-01-09" }, { product_id: 110 }],
		[{ user_id: 15 }, { created_at: "2019-03-31" }, { product_id: 116 }],
		[{ user_id: 16 }, { created_at: "2019-01-10" }, { product_id: 113 }],
		[{ user_id: 16 }, { created_at: "2019-03-31" }, { product_id: 107 }],
		[{ user_id: 17 }, { created_at: "2019-01-11" }, { product_id: 116 }],
		[{ user_id: 17 }, { created_at: "2019-03-31" }, { product_id: 104 }],
		[{ user_id: 21 }, { created_at: "2019-01-16" }, { product_id: 105 }],
		[{ user_id: 21 }, { created_at: "2019-01-17" }, { product_id: 114 }],
		[{ user_id: 22 }, { created_at: "2019-01-18" }, { product_id: 113 }],
		[{ user_id: 22 }, { created_at: "2019-01-19" }, { product_id: 118 }],
		[{ user_id: 25 }, { created_at: "2019-01-22" }, { product_id: 114 }],
		[{ user_id: 25 }, { created_at: "2019-01-22" }, { product_id: 115 }],
		[{ user_id: 25 }, { created_at: "2019-01-24" }, { product_id: 114 }],
		[{ user_id: 25 }, { created_at: "2019-01-27" }, { product_id: 115 }],
		[{ user_id: 43 }, { created_at: "2019-02-11" }, { product_id: 102 }],
		[{ user_id: 43 }, { created_at: "2019-03-05" }, { product_id: 104 }],
		[{ user_id: 44 }, { created_at: "2019-02-12" }, { product_id: 105 }],
		[{ user_id: 44 }, { created_at: "2019-03-05" }, { product_id: 102 }],
		[{ user_id: 45 }, { created_at: "2019-02-13" }, { product_id: 119 }],
		[{ user_id: 45 }, { created_at: "2019-03-05" }, { product_id: 105 }],
		[{ user_id: 46 }, { created_at: "2019-02-14" }, { product_id: 102 }],
		[{ user_id: 46 }, { created_at: "2019-02-14" }, { product_id: 102 }],
		[{ user_id: 46 }, { created_at: "2019-03-09" }, { product_id: 102 }],
		[{ user_id: 46 }, { created_at: "2019-03-10" }, { product_id: 103 }],
		[{ user_id: 46 }, { created_at: "2019-03-11" }, { product_id: 103 }],
		[{ user_id: 47 }, { created_at: "2019-02-14" }, { product_id: 110 }],
		[{ user_id: 47 }, { created_at: "2019-03-11" }, { product_id: 105 }],
		[{ user_id: 48 }, { created_at: "2019-02-14" }, { product_id: 115 }],
		[{ user_id: 48 }, { created_at: "2019-03-12" }, { product_id: 105 }],
		[{ user_id: 50 }, { created_at: "2019-02-20" }, { product_id: 118 }],
		[{ user_id: 50 }, { created_at: "2019-02-21" }, { product_id: 118 }],
		[{ user_id: 50 }, { created_at: "2019-03-13" }, { product_id: 118 }],
		[{ user_id: 50 }, { created_at: "2019-03-14" }, { product_id: 118 }],
		[{ user_id: 51 }, { created_at: "2019-02-21" }, { product_id: 120 }],
		[{ user_id: 51 }, { created_at: "2019-03-13" }, { product_id: 108 }],
		[{ user_id: 52 }, { created_at: "2019-02-23" }, { product_id: 117 }],
		[{ user_id: 52 }, { created_at: "2019-03-18" }, { product_id: 112 }],
		[{ user_id: 53 }, { created_at: "2019-02-24" }, { product_id: 120 }],
		[{ user_id: 53 }, { created_at: "2019-03-19" }, { product_id: 105 }],
		[{ user_id: 54 }, { created_at: "2019-02-25" }, { product_id: 119 }],
		[{ user_id: 54 }, { created_at: "2019-03-20" }, { product_id: 110 }],
		[{ user_id: 55 }, { created_at: "2019-02-26" }, { product_id: 117 }],
		[{ user_id: 55 }, { created_at: "2019-03-20" }, { product_id: 117 }],
		[{ user_id: 56 }, { created_at: "2019-02-27" }, { product_id: 115 }],
		[{ user_id: 56 }, { created_at: "2019-03-20" }, { product_id: 116 }],
		[{ user_id: 57 }, { created_at: "2019-02-28" }, { product_id: 105 }],
		[{ user_id: 57 }, { created_at: "2019-02-28" }, { product_id: 106 }],
		[{ user_id: 57 }, { created_at: "2019-03-20" }, { product_id: 108 }],
		[{ user_id: 57 }, { created_at: "2019-03-20" }, { product_id: 103 }],
		[{ user_id: 58 }, { created_at: "2019-02-28" }, { product_id: 104 }],
		[{ user_id: 58 }, { created_at: "2019-03-01" }, { product_id: 101 }],
		[{ user_id: 58 }, { created_at: "2019-03-02" }, { product_id: 119 }],
		[{ user_id: 58 }, { created_at: "2019-03-25" }, { product_id: 102 }],
	],
};

export const Table4 = {
	tableTitle: "user_ranking_data",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "created_at" },
		{ col3: "product_id" },
		{ col4: "ranking" },
	],
	tableData: [
		[
			{ user_id: 10 },
			{ created_at: "2019-01-01" },
			{ product_id: 101 },
			{ ranking: 1 },
		],
		[
			{ user_id: 10 },
			{ created_at: "2019-01-02" },
			{ product_id: 119 },
			{ ranking: 2 },
		],
		[
			{ user_id: 10 },
			{ created_at: "2019-03-31" },
			{ product_id: 111 },
			{ ranking: 3 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-01-02" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-03-31" },
			{ product_id: 120 },
			{ ranking: 2 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-01-02" },
			{ product_id: 112 },
			{ ranking: 1 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-03-31" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-01-05" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-03-31" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 109 },
			{ ranking: 1 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 107 },
			{ ranking: 1 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-03-31" },
			{ product_id: 112 },
			{ ranking: 3 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-08" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-09" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-03-31" },
			{ product_id: 116 },
			{ ranking: 3 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-01-10" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-03-31" },
			{ product_id: 107 },
			{ ranking: 2 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-01-11" },
			{ product_id: 116 },
			{ ranking: 1 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-03-31" },
			{ product_id: 104 },
			{ ranking: 2 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-16" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-17" },
			{ product_id: 114 },
			{ ranking: 2 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-18" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-19" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 114 },
			{ ranking: 1 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-24" },
			{ product_id: 114 },
			{ ranking: 3 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-27" },
			{ product_id: 115 },
			{ ranking: 4 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-02-11" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-03-05" },
			{ product_id: 104 },
			{ ranking: 2 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-02-12" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-03-05" },
			{ product_id: 102 },
			{ ranking: 2 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-02-13" },
			{ product_id: 119 },
			{ ranking: 1 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-03-05" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-09" },
			{ product_id: 102 },
			{ ranking: 3 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-10" },
			{ product_id: 103 },
			{ ranking: 4 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-11" },
			{ product_id: 103 },
			{ ranking: 5 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-02-14" },
			{ product_id: 110 },
			{ ranking: 1 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-03-11" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-02-14" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-03-12" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-20" },
			{ product_id: 118 },
			{ ranking: 1 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-21" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-13" },
			{ product_id: 118 },
			{ ranking: 3 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-14" },
			{ product_id: 118 },
			{ ranking: 4 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-02-21" },
			{ product_id: 120 },
			{ ranking: 1 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-03-13" },
			{ product_id: 108 },
			{ ranking: 2 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-02-23" },
			{ product_id: 117 },
			{ ranking: 1 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-03-18" },
			{ product_id: 112 },
			{ ranking: 2 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-02-24" },
			{ product_id: 120 },
			{ ranking: 1 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-03-19" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-02-25" },
			{ product_id: 119 },
			{ ranking: 1 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-03-20" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-02-26" },
			{ product_id: 117 },
			{ ranking: 1 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-03-20" },
			{ product_id: 117 },
			{ ranking: 2 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-02-27" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-03-20" },
			{ product_id: 116 },
			{ ranking: 2 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 106 },
			{ ranking: 1 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 108 },
			{ ranking: 3 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 103 },
			{ ranking: 3 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-02-28" },
			{ product_id: 104 },
			{ ranking: 1 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-01" },
			{ product_id: 101 },
			{ ranking: 2 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-02" },
			{ product_id: 119 },
			{ ranking: 3 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-25" },
			{ product_id: 102 },
			{ ranking: 4 },
		],
	],
};

export const Table5 = {
	tableTitle: "user_ranking_data",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "created_at" },
		{ col3: "product_id" },
		{ col4: "ranking" },
	],
	tableData: [
		[
			{ user_id: 10 },
			{ created_at: "2019-01-01" },
			{ product_id: 101 },
			{ ranking: 1 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-01-02" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-01-02" },
			{ product_id: 112 },
			{ ranking: 1 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-01-05" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 109 },
			{ ranking: 1 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-01-06" },
			{ product_id: 107 },
			{ ranking: 1 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-08" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-01-10" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-01-11" },
			{ product_id: 116 },
			{ ranking: 1 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-16" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-18" },
			{ product_id: 113 },
			{ ranking: 1 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 114 },
			{ ranking: 1 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-22" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-02-11" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-02-12" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-02-13" },
			{ product_id: 119 },
			{ ranking: 1 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-02-14" },
			{ product_id: 102 },
			{ ranking: 1 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-02-14" },
			{ product_id: 110 },
			{ ranking: 1 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-02-14" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-20" },
			{ product_id: 118 },
			{ ranking: 1 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-02-21" },
			{ product_id: 120 },
			{ ranking: 1 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-02-23" },
			{ product_id: 117 },
			{ ranking: 1 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-02-24" },
			{ product_id: 120 },
			{ ranking: 1 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-02-25" },
			{ product_id: 119 },
			{ ranking: 1 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-02-26" },
			{ product_id: 117 },
			{ ranking: 1 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-02-27" },
			{ product_id: 115 },
			{ ranking: 1 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 105 },
			{ ranking: 1 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-02-28" },
			{ product_id: 106 },
			{ ranking: 1 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-02-28" },
			{ product_id: 104 },
			{ ranking: 1 },
		],
		// ... (rest of the data)
	],
};

export const Table6 = {
	tableTitle: "user_ranking_data2",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "created_at" },
		{ col3: "product_id" },
		{ col4: "ranking" },
	],
	tableData: [
		[
			{ user_id: 10 },
			{ created_at: "2019-01-02" },
			{ product_id: 119 },
			{ ranking: 2 },
		],
		[
			{ user_id: 10 },
			{ created_at: "2019-03-31" },
			{ product_id: 111 },
			{ ranking: 3 },
		],
		[
			{ user_id: 11 },
			{ created_at: "2019-03-31" },
			{ product_id: 120 },
			{ ranking: 2 },
		],
		[
			{ user_id: 12 },
			{ created_at: "2019-03-31" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 13 },
			{ created_at: "2019-03-31" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 14 },
			{ created_at: "2019-03-31" },
			{ product_id: 112 },
			{ ranking: 3 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-01-09" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 15 },
			{ created_at: "2019-03-31" },
			{ product_id: 116 },
			{ ranking: 3 },
		],
		[
			{ user_id: 16 },
			{ created_at: "2019-03-31" },
			{ product_id: 107 },
			{ ranking: 2 },
		],
		[
			{ user_id: 17 },
			{ created_at: "2019-03-31" },
			{ product_id: 104 },
			{ ranking: 2 },
		],
		[
			{ user_id: 21 },
			{ created_at: "2019-01-17" },
			{ product_id: 114 },
			{ ranking: 2 },
		],
		[
			{ user_id: 22 },
			{ created_at: "2019-01-19" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-24" },
			{ product_id: 114 },
			{ ranking: 3 },
		],
		[
			{ user_id: 25 },
			{ created_at: "2019-01-27" },
			{ product_id: 115 },
			{ ranking: 4 },
		],
		[
			{ user_id: 43 },
			{ created_at: "2019-03-05" },
			{ product_id: 104 },
			{ ranking: 2 },
		],
		[
			{ user_id: 44 },
			{ created_at: "2019-03-05" },
			{ product_id: 102 },
			{ ranking: 2 },
		],
		[
			{ user_id: 45 },
			{ created_at: "2019-03-05" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-09" },
			{ product_id: 102 },
			{ ranking: 3 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-10" },
			{ product_id: 103 },
			{ ranking: 4 },
		],
		[
			{ user_id: 46 },
			{ created_at: "2019-03-11" },
			{ product_id: 103 },
			{ ranking: 5 },
		],
		[
			{ user_id: 47 },
			{ created_at: "2019-03-11" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 48 },
			{ created_at: "2019-03-12" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-02-21" },
			{ product_id: 118 },
			{ ranking: 2 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-13" },
			{ product_id: 118 },
			{ ranking: 3 },
		],
		[
			{ user_id: 50 },
			{ created_at: "2019-03-14" },
			{ product_id: 118 },
			{ ranking: 4 },
		],
		[
			{ user_id: 51 },
			{ created_at: "2019-03-13" },
			{ product_id: 108 },
			{ ranking: 2 },
		],
		[
			{ user_id: 52 },
			{ created_at: "2019-03-18" },
			{ product_id: 112 },
			{ ranking: 2 },
		],
		[
			{ user_id: 53 },
			{ created_at: "2019-03-19" },
			{ product_id: 105 },
			{ ranking: 2 },
		],
		[
			{ user_id: 54 },
			{ created_at: "2019-03-20" },
			{ product_id: 110 },
			{ ranking: 2 },
		],
		[
			{ user_id: 55 },
			{ created_at: "2019-03-20" },
			{ product_id: 117 },
			{ ranking: 2 },
		],
		[
			{ user_id: 56 },
			{ created_at: "2019-03-20" },
			{ product_id: 116 },
			{ ranking: 2 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 108 },
			{ ranking: 3 },
		],
		[
			{ user_id: 57 },
			{ created_at: "2019-03-20" },
			{ product_id: 103 },
			{ ranking: 3 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-01" },
			{ product_id: 101 },
			{ ranking: 2 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-02" },
			{ product_id: 119 },
			{ ranking: 3 },
		],
		[
			{ user_id: 58 },
			{ created_at: "2019-03-25" },
			{ product_id: 102 },
			{ ranking: 4 },
		],
		// ... (rest of the data)
	],
};

export const Table7 = {
	tableTitle: "user_purchase_data",
	tableCol: [
		{ col1: "user_id" },
		{ col2: "others_purchase" },
		{ col3: "first_day_purchase" },
	],
	tableData: [
		[{ user_id: 10 }, { others_purchase: 119 }, { first_day_purchase: null }],
		[{ user_id: 10 }, { others_purchase: 111 }, { first_day_purchase: null }],
		[{ user_id: 11 }, { others_purchase: 120 }, { first_day_purchase: null }],
		[{ user_id: 12 }, { others_purchase: 110 }, { first_day_purchase: null }],
		[{ user_id: 13 }, { others_purchase: 118 }, { first_day_purchase: null }],
		[{ user_id: 14 }, { others_purchase: 112 }, { first_day_purchase: null }],
		[{ user_id: 15 }, { others_purchase: 110 }, { first_day_purchase: null }],
		[{ user_id: 15 }, { others_purchase: 116 }, { first_day_purchase: null }],
		[{ user_id: 16 }, { others_purchase: 107 }, { first_day_purchase: null }],
		[{ user_id: 17 }, { others_purchase: 104 }, { first_day_purchase: null }],
		[{ user_id: 21 }, { others_purchase: 114 }, { first_day_purchase: null }],
		[{ user_id: 22 }, { others_purchase: 118 }, { first_day_purchase: null }],
		[{ user_id: 25 }, { others_purchase: 114 }, { first_day_purchase: 114 }],
		[{ user_id: 25 }, { others_purchase: 115 }, { first_day_purchase: 115 }],
		[{ user_id: 43 }, { others_purchase: 104 }, { first_day_purchase: null }],
		[{ user_id: 44 }, { others_purchase: 102 }, { first_day_purchase: null }],
		[{ user_id: 45 }, { others_purchase: 105 }, { first_day_purchase: null }],
		[{ user_id: 46 }, { others_purchase: 102 }, { first_day_purchase: 102 }],
		[{ user_id: 46 }, { others_purchase: 102 }, { first_day_purchase: 102 }],
		[{ user_id: 46 }, { others_purchase: 103 }, { first_day_purchase: null }],
		[{ user_id: 46 }, { others_purchase: 103 }, { first_day_purchase: null }],
		[{ user_id: 47 }, { others_purchase: 105 }, { first_day_purchase: null }],
		[{ user_id: 48 }, { others_purchase: 105 }, { first_day_purchase: null }],
		[{ user_id: 50 }, { others_purchase: 118 }, { first_day_purchase: 118 }],
		[{ user_id: 50 }, { others_purchase: 118 }, { first_day_purchase: 118 }],
		[{ user_id: 50 }, { others_purchase: 118 }, { first_day_purchase: 118 }],
		[{ user_id: 51 }, { others_purchase: 108 }, { first_day_purchase: null }],
		[{ user_id: 52 }, { others_purchase: 112 }, { first_day_purchase: null }],
		[{ user_id: 53 }, { others_purchase: 105 }, { first_day_purchase: null }],
		[{ user_id: 54 }, { others_purchase: 110 }, { first_day_purchase: null }],
		[{ user_id: 55 }, { others_purchase: 117 }, { first_day_purchase: 117 }],
		[{ user_id: 56 }, { others_purchase: 116 }, { first_day_purchase: null }],
		[{ user_id: 57 }, { others_purchase: 108 }, { first_day_purchase: null }],
		[{ user_id: 57 }, { others_purchase: 103 }, { first_day_purchase: null }],
		[{ user_id: 58 }, { others_purchase: 101 }, { first_day_purchase: null }],
		[{ user_id: 58 }, { others_purchase: 119 }, { first_day_purchase: null }],
		[{ user_id: 58 }, { others_purchase: 102 }, { first_day_purchase: null }],
		// ... (rest of the data)
	],
};
