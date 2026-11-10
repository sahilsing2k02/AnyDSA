import type { Pattern } from '../types';

export const sqlQuestions: Pattern[] = [
  {
    id: 'sql-select',
    name: '1. Select & Filtering (SQL 50)',
    description: 'Fundamental SQL queries: WHERE clauses, NULL checks, boolean logic, and regular expressions.',
    icon: '🔍',
    problems: [
      {
        id: 'sql-1',
        title: 'Recyclable and Low Fat Products (LC 1757)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/recyclable-and-low-fat-products/' }],
        tags: ['SELECT', 'WHERE'],
        answer: 'SELECT product_id\nFROM Products\nWHERE low_fats = \'Y\' AND recyclable = \'Y\';'
      },
      {
        id: 'sql-2',
        title: 'Find Customer Referee (LC 584)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/find-customer-referee/' }],
        tags: ['WHERE', 'NULL'],
        answer: '-- Crucial: In SQL, NULL != 2 evaluates to UNKNOWN, not TRUE.\nSELECT name\nFROM Customer\nWHERE referee_id != 2 OR referee_id IS NULL;'
      },
      {
        id: 'sql-3',
        title: 'Big Countries (LC 595)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/big-countries/' }],
        tags: ['WHERE', 'OR'],
        answer: 'SELECT name, population, area\nFROM World\nWHERE area >= 3000000 OR population >= 25000000;'
      },
      {
        id: 'sql-4',
        title: 'Article Views I (LC 1148)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/article-views-i/' }],
        tags: ['DISTINCT', 'ORDER BY'],
        answer: 'SELECT DISTINCT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nORDER BY id ASC;'
      },
      {
        id: 'sql-5',
        title: 'Invalid Tweets (LC 1683)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/invalid-tweets/' }],
        tags: ['LENGTH', 'CHAR_LENGTH'],
        answer: 'SELECT tweet_id\nFROM Tweets\nWHERE CHAR_LENGTH(content) > 15;'
      }
    ]
  },
  {
    id: 'sql-joins',
    name: '2. Basic Joins & Relationships (SQL 50)',
    description: 'INNER JOIN, LEFT JOIN, self joins, and multi-table entity relationships.',
    icon: '🔗',
    problems: [
      {
        id: 'sql-6',
        title: 'Replace Employee ID With Unique Identifier (LC 1378)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/' }],
        tags: ['LEFT JOIN'],
        answer: 'SELECT u.unique_id, e.name\nFROM Employees e\nLEFT JOIN EmployeeUNI u ON e.id = u.id;'
      },
      {
        id: 'sql-7',
        title: 'Product Sales Analysis I (LC 1068)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/product-sales-analysis-i/' }],
        tags: ['INNER JOIN'],
        answer: 'SELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id;'
      },
      {
        id: 'sql-8',
        title: 'Customer Who Visited but Did Not Make Any Transactions (LC 1581)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/' }],
        tags: ['LEFT JOIN', 'GROUP BY', 'IS NULL'],
        answer: 'SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans\nFROM Visits v\nLEFT JOIN Transactions t ON v.visit_id = t.visit_id\nWHERE t.transaction_id IS NULL\nGROUP BY v.customer_id;'
      },
      {
        id: 'sql-9',
        title: 'Rising Temperature (LC 197)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/rising-temperature/' }],
        tags: ['Self Join', 'DATEDIFF'],
        answer: 'SELECT w1.id\nFROM Weather w1\nJOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1\nWHERE w1.temperature > w2.temperature;'
      },
      {
        id: 'sql-10',
        title: 'Average Time of Process per Machine (LC 1661)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/average-time-of-process-per-machine/' }],
        tags: ['Self Join', 'AVG', 'ROUND'],
        answer: 'SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time\nFROM Activity a1\nJOIN Activity a2 \n  ON a1.machine_id = a2.machine_id \n  AND a1.process_id = a2.process_id\n  AND a1.activity_type = \'start\' \n  AND a2.activity_type = \'end\'\nGROUP BY a1.machine_id;'
      },
      {
        id: 'sql-11',
        title: 'Employee Bonus (LC 577)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/employee-bonus/' }],
        tags: ['LEFT JOIN', 'IS NULL'],
        answer: 'SELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus < 1000 OR b.bonus IS NULL;'
      },
      {
        id: 'sql-12',
        title: 'Students and Examinations (LC 1280)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/students-and-examinations/' }],
        tags: ['CROSS JOIN', 'LEFT JOIN', 'COUNT'],
        answer: 'SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams\nFROM Students s\nCROSS JOIN Subjects sub\nLEFT JOIN Examinations e \n  ON s.student_id = e.student_id AND sub.subject_name = e.subject_name\nGROUP BY s.student_id, s.student_name, sub.subject_name\nORDER BY s.student_id, sub.subject_name;'
      },
      {
        id: 'sql-13',
        title: 'Managers with at Least 5 Direct Reports (LC 570)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/managers-with-at-least-5-direct-reports/' }],
        tags: ['GROUP BY', 'HAVING', 'JOIN'],
        answer: 'SELECT m.name\nFROM Employee e\nJOIN Employee m ON e.managerId = m.id\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;'
      },
      {
        id: 'sql-14',
        title: 'Confirmation Rate (LC 1934)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/confirmation-rate/' }],
        tags: ['LEFT JOIN', 'CASE', 'ROUND', 'AVG'],
        answer: 'SELECT s.user_id, \n       ROUND(AVG(CASE WHEN c.action = \'confirmed\' THEN 1.0 ELSE 0.0 END), 2) AS confirmation_rate\nFROM Signups s\nLEFT JOIN Confirmations c ON s.user_id = c.user_id\nGROUP BY s.user_id;'
      }
    ]
  },
  {
    id: 'sql-aggregates',
    name: '3. Basic Aggregate Functions (SQL 50)',
    description: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, and conditional aggregation with CASE WHEN.',
    icon: '📊',
    problems: [
      {
        id: 'sql-15',
        title: 'Not Boring Movies (LC 620)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/not-boring-movies/' }],
        tags: ['MOD', 'ORDER BY'],
        answer: 'SELECT id, movie, description, rating\nFROM Cinema\nWHERE id % 2 != 0 AND description != \'boring\'\nORDER BY rating DESC;'
      },
      {
        id: 'sql-16',
        title: 'Average Selling Price (LC 1251)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/average-selling-price/' }],
        tags: ['LEFT JOIN', 'SUM', 'COALESCE'],
        answer: 'SELECT p.product_id, \n       COALESCE(ROUND(SUM(p.price * u.units) * 1.0 / NULLIF(SUM(u.units), 0), 2), 0) AS average_price\nFROM Prices p\nLEFT JOIN UnitsSold u \n  ON p.product_id = u.product_id \n  AND u.purchase_date BETWEEN p.start_date AND p.end_date\nGROUP BY p.product_id;'
      },
      {
        id: 'sql-17',
        title: 'Project Employees I (LC 1075)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/project-employees-i/' }],
        tags: ['JOIN', 'AVG', 'ROUND'],
        answer: 'SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nGROUP BY p.project_id;'
      },
      {
        id: 'sql-18',
        title: 'Percentage of Users Attended a Contest (LC 1633)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/percentage-of-users-attended-a-contest/' }],
        tags: ['Aggregation', 'ROUND', 'Subquery'],
        answer: 'SELECT contest_id, \n       ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage\nFROM Register\nGROUP BY contest_id\nORDER BY percentage DESC, contest_id ASC;'
      },
      {
        id: 'sql-19',
        title: 'Queries Quality and Percentage (LC 1211)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/queries-quality-and-percentage/' }],
        tags: ['AVG', 'CASE', 'ROUND'],
        answer: 'SELECT query_name,\n       ROUND(AVG(rating * 1.0 / position), 2) AS quality,\n       ROUND(AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100, 2) AS poor_query_percentage\nFROM Queries\nWHERE query_name IS NOT NULL\nGROUP BY query_name;'
      },
      {
        id: 'sql-20',
        title: 'Monthly Transactions I (LC 1193)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/monthly-transactions-i/' }],
        tags: ['DATE_FORMAT', 'GROUP BY', 'SUM'],
        answer: 'SELECT SUBSTRING(trans_date, 1, 7) AS month,\n       country,\n       COUNT(id) AS trans_count,\n       SUM(CASE WHEN state = \'approved\' THEN 1 ELSE 0 END) AS approved_count,\n       SUM(amount) AS trans_total_amount,\n       SUM(CASE WHEN state = \'approved\' THEN amount ELSE 0 END) AS approved_total_amount\nFROM Transactions\nGROUP BY month, country;'
      },
      {
        id: 'sql-21',
        title: 'Immediate Food Delivery II (LC 1174)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/immediate-food-delivery-ii/' }],
        tags: ['Subquery', 'MIN', 'ROUND'],
        answer: 'SELECT ROUND(AVG(order_date = customer_pref_delivery_date) * 100.0, 2) AS immediate_percentage\nFROM Delivery\nWHERE (customer_id, order_date) IN (\n  SELECT customer_id, MIN(order_date)\n  FROM Delivery\n  GROUP BY customer_id\n);'
      },
      {
        id: 'sql-22',
        title: 'Game Play Analysis IV (LC 550)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/game-play-analysis-iv/' }],
        tags: ['DATEDIFF', 'MIN', 'Self Join'],
        answer: 'SELECT ROUND(COUNT(DISTINCT a.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction\nFROM Activity a\nJOIN (\n  SELECT player_id, MIN(event_date) AS first_login\n  FROM Activity\n  GROUP BY player_id\n) f ON a.player_id = f.player_id AND DATEDIFF(a.event_date, f.first_login) = 1;'
      }
    ]
  },
  {
    id: 'sql-sorting-subqueries',
    name: '4. Sorting, Grouping & Subqueries (SQL 50)',
    description: 'HAVING filters, nested queries, subqueries, and multi-column grouping.',
    icon: '⚡',
    problems: [
      {
        id: 'sql-23',
        title: 'Number of Unique Subjects Taught by Each Teacher (LC 2356)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/' }],
        tags: ['COUNT DISTINCT'],
        answer: 'SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt\nFROM Teacher\nGROUP BY teacher_id;'
      },
      {
        id: 'sql-24',
        title: 'User Activity for the Past 30 Days I (LC 1141)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/user-activity-for-the-past-30-days-i/' }],
        tags: ['COUNT DISTINCT', 'DATEDIFF'],
        answer: 'SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users\nFROM Activity\nWHERE activity_date BETWEEN DATE_SUB(\'2019-07-27\', INTERVAL 29 DAY) AND \'2019-07-27\'\nGROUP BY activity_date;'
      },
      {
        id: 'sql-25',
        title: 'Product Sales Analysis III (LC 1070)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/product-sales-analysis-iii/' }],
        tags: ['Subquery', 'MIN'],
        answer: 'SELECT product_id, year AS first_year, quantity, price\nFROM Sales\nWHERE (product_id, year) IN (\n  SELECT product_id, MIN(year)\n  FROM Sales\n  GROUP BY product_id\n);'
      },
      {
        id: 'sql-26',
        title: 'Classes More Than 5 Students (LC 596)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/classes-more-than-5-students/' }],
        tags: ['HAVING'],
        answer: 'SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;'
      },
      {
        id: 'sql-27',
        title: 'Find Followers Count (LC 1729)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/find-followers-count/' }],
        tags: ['GROUP BY', 'ORDER BY'],
        answer: 'SELECT user_id, COUNT(follower_id) AS followers_count\nFROM Followers\nGROUP BY user_id\nORDER BY user_id ASC;'
      },
      {
        id: 'sql-28',
        title: 'Biggest Single Number (LC 619)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/biggest-single-number/' }],
        tags: ['HAVING', 'MAX'],
        answer: 'SELECT MAX(num) AS num\nFROM (\n  SELECT num\n  FROM MyNumbers\n  GROUP BY num\n  HAVING COUNT(num) = 1\n) AS single_nums;'
      },
      {
        id: 'sql-29',
        title: 'Customers Who Bought All Products (LC 1045)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/customers-who-bought-all-products/' }],
        tags: ['HAVING', 'COUNT DISTINCT'],
        answer: 'SELECT customer_id\nFROM Customer\nGROUP BY customer_id\nHAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);'
      },
      {
        id: 'sql-30',
        title: 'The Number of Employees Which Report to Each Employee (LC 1731)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/' }],
        tags: ['Self Join', 'GROUP BY'],
        answer: 'SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age)) AS average_age\nFROM Employees e\nJOIN Employees m ON e.reports_to = m.employee_id\nGROUP BY m.employee_id, m.name\nORDER BY m.employee_id ASC;'
      },
      {
        id: 'sql-31',
        title: 'Primary Department for Each Employee (LC 1789)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/primary-department-for-each-employee/' }],
        tags: ['UNION', 'OR'],
        answer: 'SELECT employee_id, department_id\nFROM Employee\nWHERE primary_flag = \'Y\'\nUNION\nSELECT employee_id, department_id\nFROM Employee\nGROUP BY employee_id\nHAVING COUNT(department_id) = 1;'
      },
      {
        id: 'sql-32',
        title: 'Triangle Judgement (LC 610)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/triangle-judgement/' }],
        tags: ['CASE'],
        answer: 'SELECT x, y, z, \n       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN \'Yes\' ELSE \'No\' END AS triangle\nFROM Triangle;'
      },
      {
        id: 'sql-33',
        title: 'Consecutive Numbers (LC 180)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/consecutive-numbers/' }],
        tags: ['Self Join', 'LEAD', 'LAG'],
        answer: 'SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num\nJOIN Logs l3 ON l1.id = l3.id - 2 AND l1.num = l3.num;'
      },
      {
        id: 'sql-34',
        title: 'Product Price at a Given Date (LC 1164)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/product-price-at-a-given-date/' }],
        tags: ['UNION', 'Subquery'],
        answer: 'SELECT product_id, new_price AS price\nFROM Products\nWHERE (product_id, change_date) IN (\n  SELECT product_id, MAX(change_date)\n  FROM Products\n  WHERE change_date <= \'2019-08-16\'\n  GROUP BY product_id\n)\nUNION\nSELECT product_id, 10 AS price\nFROM Products\nWHERE product_id NOT IN (\n  SELECT product_id\n  FROM Products\n  WHERE change_date <= \'2019-08-16\'\n);'
      },
      {
        id: 'sql-35',
        title: 'Last Person to Fit in the Bus (LC 1204)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/last-person-to-fit-in-the-bus/' }],
        tags: ['Window Function', 'SUM OVER'],
        answer: 'SELECT person_name\nFROM (\n  SELECT person_name, \n         SUM(weight) OVER (ORDER BY turn) AS cumulative_weight\n  FROM Queue\n) q\nWHERE cumulative_weight <= 1000\nORDER BY cumulative_weight DESC\nLIMIT 1;'
      },
      {
        id: 'sql-36',
        title: 'Count Salary Categories (LC 1907)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/count-salary-categories/' }],
        tags: ['UNION ALL', 'CASE'],
        answer: 'SELECT \'Low Salary\' AS category, SUM(income < 20000) AS accounts_count FROM Accounts\nUNION ALL\nSELECT \'Average Salary\' AS category, SUM(income >= 20000 AND income <= 50000) AS accounts_count FROM Accounts\nUNION ALL\nSELECT \'High Salary\' AS category, SUM(income > 50000) AS accounts_count FROM Accounts;'
      }
    ]
  },
  {
    id: 'sql-advanced-windows',
    name: '5. Advanced Select, Window Functions & CTEs (SQL 50)',
    description: 'DENSE_RANK, ROW_NUMBER, CTEs, self joins, and advanced interview query patterns.',
    icon: '👑',
    problems: [
      {
        id: 'sql-37',
        title: 'Employees Whose Manager Left the Company (LC 1978)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/employees-whose-manager-left-the-company/' }],
        tags: ['NOT IN', 'WHERE'],
        answer: 'SELECT employee_id\nFROM Employees\nWHERE salary < 30000 \n  AND manager_id IS NOT NULL \n  AND manager_id NOT IN (SELECT employee_id FROM Employees)\nORDER BY employee_id ASC;'
      },
      {
        id: 'sql-38',
        title: 'Exchange Seats (LC 626)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/exchange-seats/' }],
        tags: ['CASE', 'MOD'],
        answer: 'SELECT \n  CASE \n    WHEN id % 2 != 0 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n    WHEN id % 2 != 0 THEN id + 1\n    ELSE id - 1\n  END AS id,\n  student\nFROM Seat\nORDER BY id ASC;'
      },
      {
        id: 'sql-39',
        title: 'Movie Rating (LC 1341)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/movie-rating/' }],
        tags: ['UNION ALL', 'AVG', 'COUNT'],
        answer: '(SELECT u.name AS results\n FROM MovieRating mr\n JOIN Users u ON mr.user_id = u.user_id\n GROUP BY u.user_id, u.name\n ORDER BY COUNT(mr.movie_id) DESC, u.name ASC\n LIMIT 1)\nUNION ALL\n(SELECT m.title AS results\n FROM MovieRating mr\n JOIN Movies m ON mr.movie_id = m.movie_id\n WHERE mr.created_at BETWEEN \'2020-02-01\' AND \'2020-02-29\'\n GROUP BY m.movie_id, m.title\n ORDER BY AVG(mr.rating) DESC, m.title ASC\n LIMIT 1);'
      },
      {
        id: 'sql-40',
        title: 'Restaurant Growth (LC 1321)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/restaurant-growth/' }],
        tags: ['Window Function', 'SUM OVER'],
        answer: 'SELECT visited_on, amount, average_amount\nFROM (\n  SELECT visited_on,\n         SUM(day_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,\n         ROUND(AVG(day_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,\n         ROW_NUMBER() OVER (ORDER BY visited_on) AS rn\n  FROM (\n    SELECT visited_on, SUM(amount) AS day_amount\n    FROM Customer\n    GROUP BY visited_on\n  ) d\n) t\nWHERE rn >= 7;'
      },
      {
        id: 'sql-41',
        title: 'Friend Requests II: Who Has the Most Friends (LC 602)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/' }],
        tags: ['UNION ALL', 'GROUP BY'],
        answer: 'SELECT id, COUNT(*) AS num\nFROM (\n  SELECT requester_id AS id FROM RequestAccepted\n  UNION ALL\n  SELECT accepter_id AS id FROM RequestAccepted\n) all_friends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;'
      },
      {
        id: 'sql-42',
        title: 'Investments in 2016 (LC 585)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/investments-in-2016/' }],
        tags: ['Subquery', 'COUNT OVER'],
        answer: 'SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n  SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1\n)\nAND (lat, lon) IN (\n  SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1\n);'
      },
      {
        id: 'sql-43',
        title: 'Department Top Three Salaries (LC 185)',
        difficulty: 'Hard',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/department-top-three-salaries/' }],
        tags: ['DENSE_RANK', 'Window Function'],
        answer: 'WITH RankedSalaries AS (\n  SELECT d.name AS Department,\n         e.name AS Employee,\n         e.salary AS Salary,\n         DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n  FROM Employee e\n  JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM RankedSalaries\nWHERE rnk <= 3;'
      },
      {
        id: 'sql-44',
        title: 'Second Highest Salary (LC 176)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/second-highest-salary/' }],
        tags: ['MAX', 'LIMIT', 'NULL check'],
        answer: 'SELECT (\n  SELECT DISTINCT salary\n  FROM Employee\n  ORDER BY salary DESC\n  LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;'
      },
      {
        id: 'sql-45',
        title: 'Delete Duplicate Emails (LC 196)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/delete-duplicate-emails/' }],
        tags: ['DELETE', 'Self Join'],
        answer: 'DELETE p1\nFROM Person p1\nJOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id;'
      },
      {
        id: 'sql-46',
        title: 'Fix Names in a Table (LC 1667)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/fix-names-in-a-table/' }],
        tags: ['CONCAT', 'UPPER', 'LOWER', 'SUBSTRING'],
        answer: 'SELECT user_id,\n       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2))) AS name\nFROM Users\nORDER BY user_id ASC;'
      },
      {
        id: 'sql-47',
        title: 'Group Sold Products By The Date (LC 1484)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/group-sold-products-by-the-date/' }],
        tags: ['GROUP_CONCAT', 'COUNT DISTINCT'],
        answer: 'SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       GROUP_CONCAT(DISTINCT product ORDER BY product ASC SEPARATOR \',\') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date ASC;'
      },
      {
        id: 'sql-48',
        title: 'List the Products Ordered in a Period (LC 1327)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/list-the-products-ordered-in-a-period/' }],
        tags: ['HAVING', 'SUM', 'BETWEEN'],
        answer: 'SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date BETWEEN \'2020-02-01\' AND \'2020-02-29\'\nGROUP BY p.product_id, p.product_name\nHAVING SUM(o.unit) >= 100;'
      },
      {
        id: 'sql-49',
        title: 'Find Users With Valid E-Mails (LC 1517)',
        difficulty: 'Easy',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/find-users-with-valid-e-mails/' }],
        tags: ['REGEXP'],
        answer: 'SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP \'^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$\';'
      },
      {
        id: 'sql-50',
        title: 'Trips and Users (LC 262)',
        difficulty: 'Hard',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/trips-and-users/' }],
        tags: ['JOIN', 'CASE', 'ROUND', 'Cancellation Rate'],
        answer: 'SELECT t.request_at AS Day,\n       ROUND(SUM(CASE WHEN t.status != \'completed\' THEN 1.0 ELSE 0.0 END) / COUNT(*), 2) AS \'Cancellation Rate\'\nFROM Trips t\nJOIN Users c ON t.client_id = c.users_id AND c.banned = \'No\'\nJOIN Users d ON t.driver_id = d.users_id AND d.banned = \'No\'\nWHERE t.request_at BETWEEN \'2013-10-01\' AND \'2013-10-03\'\nGROUP BY t.request_at;'
      }
    ]
  }
];
