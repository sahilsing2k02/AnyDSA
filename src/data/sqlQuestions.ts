import type { Pattern } from '../types';

export const sqlQuestions: Pattern[] = [
  {
    "id": "sql-theory-basics",
    "name": "Theory 1: SQL Architecture & Commands (Q1–Q5, Q10, Q11)",
    "description": "Foundational database theory: SQL command categories (DDL/DML/DQL/DCL/TCL), deletion mechanics, keys, constraints, NULL logic, and aggregate definitions.",
    "icon": "📚",
    "category": "theory",
    "problems": [
      {
        "id": "sql-q1",
        "title": "Q1. What is SQL? What are the different types of SQL commands?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "DDL/DML/DQL"
        ],
        "answer": "Answer:\nSQL (Structured Query Language) is the standard declarative language used to store, manipulate, retrieve, and manage data within Relational Database Management Systems (RDBMS).\n\nFive Major Command Categories:\n┌──────────┬─────────────────────────────┬────────────────────────────────┐\n│ Category │ Purpose                     │ Commands                       │\n├──────────┼─────────────────────────────┼────────────────────────────────┤\n│ DDL      │ Defines and alters schemas  │ CREATE, ALTER, DROP, TRUNCATE  │\n│ DML      │ Modifies table records      │ INSERT, UPDATE, DELETE         │\n│ DQL      │ Retrieves query records     │ SELECT                         │\n│ DCL      │ Manages user privileges     │ GRANT, REVOKE                  │\n│ TCL      │ Controls transaction states │ COMMIT, ROLLBACK, SAVEPOINT    │\n└──────────┴─────────────────────────────┴────────────────────────────────┘\n\nVisual Lifecycle:\n  [Client Query]\n       │\n       ├─ DQL (SELECT) ─────────> Read data pages\n       ├─ DML (INSERT/UPDATE) ──> Write to buffer pool + Undo/Redo logs\n       ├─ TCL (COMMIT) ─────────> Flush transaction log to disk\n       └─ DDL (ALTER/CREATE) ───> Update Database Data Dictionary"
      },
      {
        "id": "sql-q2",
        "title": "Q2. What is the difference between DELETE, TRUNCATE and DROP?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/truncate-table.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Data Deletion"
        ],
        "answer": "Answer:\n• DELETE: A DML command that removes rows one-by-one based on a WHERE predicate (or all rows if omitted). Fires triggers and logs individual row deletions in the Undo log, allowing ROLLBACK.\n• TRUNCATE: A DDL command that deallocates all data pages in the table. Preserves table definition and column constraints. Much faster than DELETE, resets AUTO_INCREMENT counters, and bypasses row-level delete triggers.\n• DROP: A DDL command that completely destroys the table, its schema definition, constraints, triggers, and indices from the database catalog.\n\nComparison Matrix:\n┌────────────┬─────────┬───────────────┬──────────────────┬──────────────┐\n│ Command    │ Type    │ WHERE Clause? │ Rollback Safe?   │ Speed        │\n├────────────┼─────────┼───────────────┼──────────────────┼──────────────┤\n│ DELETE     │ DML     │ Yes           │ Yes (in txn)     │ Slow (logged)│\n│ TRUNCATE   │ DDL     │ No            │ Engine-dependent │ Fast         │\n│ DROP       │ DDL     │ No            │ No               │ Instant      │\n└────────────┴─────────┴───────────────┴──────────────────┴──────────────┘\n\nVisual Memory Representation:\n  Initial Table:  [Row 1] [Row 2] [Row 3] [Schema Def]\n  After DELETE:   [Empty] [Row 2] [Row 3] [Schema Def]  <-- WHERE id=1\n  After TRUNCATE: [Empty Data Extents]    [Schema Def]  <-- Pages deallocated\n  After DROP:     [------------------ Completely Erased ------------------]"
      },
      {
        "id": "sql-q3",
        "title": "Q3. What is the difference between WHERE and HAVING?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Filtering"
        ],
        "answer": "Answer:\n• WHERE filters individual records before aggregation or grouping takes place. It cannot contain aggregate functions (e.g. WHERE AVG(salary) > 5000 is invalid).\n• HAVING filters groups after the GROUP BY clause has calculated summary values.\n\nVisual Query Processing Pipeline:\n  [Raw Table Rows]\n        │\n        ▼ (1) WHERE Filter: eliminates non-matching rows\n  [Filtered Rows]\n        │\n        ▼ (2) GROUP BY: groups matching rows by key\n  [Grouped Partitions]\n        │\n        ▼ (3) Aggregation (SUM, AVG, COUNT)\n  [Aggregated Metric Buckets]\n        │\n        ▼ (4) HAVING Filter: eliminates groups failing threshold\n  [Final Output Result]"
      },
      {
        "id": "sql-q4",
        "title": "Q4. What is the difference between PRIMARY KEY and UNIQUE KEY?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Constraints"
        ],
        "answer": "Answer:\nBoth enforce entity uniqueness, but have key structural differences:\n\n┌─────────────────┬──────────────────────────┬──────────────────────────┐\n│ Feature         │ PRIMARY KEY              │ UNIQUE KEY               │\n├─────────────────┼──────────────────────────┼──────────────────────────┤\n│ Purpose         │ Identifies each record   │ Prevents duplicate values│\n│ NULL Support    │ Disallowed (Strictly NOT)│ Allowed (engine rules)   │\n│ Limit per Table │ Exactly 1 per table      │ Multiple per table       │\n│ Default Index   │ Clustered Index (B-Tree) │ Secondary Non-Clustered  │\n│ Foreign Key Ref │ Ideal parent target      │ Can also be targeted     │\n└─────────────────┴──────────────────────────┴──────────────────────────┘\n\nVisual Representation (B-Tree Storage):\n  Primary Key (Clustered):\n  [Leaf Node] -> Stores the ENTIRE row data on leaf data pages.\n\n  Unique Key (Non-Clustered):\n  [Leaf Node] -> Stores the indexed column value + pointer to the Primary Key."
      },
      {
        "id": "sql-q5",
        "title": "Q5. What is a FOREIGN KEY?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Referential Integrity"
        ],
        "answer": "Answer:\nA FOREIGN KEY is a relational constraint that maps a column (or set of columns) in a child table to the PRIMARY KEY (or UNIQUE KEY) of a parent table, guaranteeing Referential Integrity.\n\nVisual Entity-Relationship Map:\n  Departments Table (Parent)\n  ┌──────────┬──────────────┐\n  │ dept_id  │ dept_name    │  <-- Primary Key\n  └──────────┴──────────────┘\n       ▲\n       │ Foreign Key (REFERENCES Departments(dept_id))\n       │\n  Employees Table (Child)\n  ┌────────┬─────────┬────────┬──────────┬────────────┐\n  │ emp_id │ name    │ salary │ dept_id  │ manager_id │\n  └────────┴─────────┴────────┴──────────┴────────────┘\n\nReferential Rules:\n1. Cannot insert a child row with dept_id=999 if 999 does not exist in Departments.\n2. Cannot delete a department if active employee rows point to it (unless configured with ON DELETE CASCADE or ON DELETE SET NULL)."
      },
      {
        "id": "sql-q10",
        "title": "Q10. What is NULL? How do you handle NULL values in SQL?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "NULL Logic"
        ],
        "answer": "Answer:\nNULL indicates the absence of any data value (missing, unknown, or inapplicable). It is NOT equivalent to zero (0), FALSE, or an empty string ('').\n\nThree-Valued Logic (3VL) Truth Matrix:\n┌───────────┬───────────┬─────────────┐\n│ Condition │ Evaluates │ Included?   │\n├───────────┼───────────┼─────────────┤\n│ 5 = 5     │ TRUE      │ Yes         │\n│ 5 = 4     │ FALSE     │ No          │\n│ 5 = NULL  │ UNKNOWN   │ No          │\n│ NULL=NULL │ UNKNOWN   │ No          │\n└───────────┴───────────┴─────────────┘\n\nGolden Rule:\nNever check NULL with '=' or '!='. Always use 'IS NULL' or 'IS NOT NULL'.\n\nCOALESCE Fallback Example:\nSELECT name, COALESCE(manager_id, 0) AS manager FROM Employees;"
      },
      {
        "id": "sql-q11",
        "title": "Q11. What are aggregate functions in SQL?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Aggregates"
        ],
        "answer": "Answer:\nAggregate functions accept multiple input rows across a column partition and distill them into a single scalar summary value.\n\nSummary Table:\n┌──────────┬────────────────────────────────────────────────────────┐\n│ Function │ Purpose & Behavior                                     │\n├──────────┼────────────────────────────────────────────────────────┤\n│ COUNT()  │ Counts rows. COUNT(*) counts all; COUNT(col) skips NULL│\n│ SUM()    │ Calculates numerical total sum (skips NULLs)           │\n│ AVG()    │ Calculates arithmetic mean (SUM / COUNT non-NULL)      │\n│ MIN()    │ Returns smallest numerical/alphabetical/date value     │\n│ MAX()    │ Returns largest numerical/alphabetical/date value      │\n└──────────┴────────────────────────────────────────────────────────┘\n\nVisual Fan-In:\n  Input Rows:      Aggregator:      Output:\n  [60,000] ───┐\n  [45,000] ───┼──>  AVG(salary) ──>  [58,000]  (Single scalar result)\n  [75,000] ───┘"
      }
    ]
  },
  {
    "id": "sql-theory-joins",
    "name": "Theory 2: Relational Joins & Set Operations (Q18, Q22, Q24, Q32)",
    "description": "Relational algebra: Inner, Outer, Self, Cross joins, anti-joins, set inclusion (IN) vs correlated existence checks (EXISTS).",
    "icon": "🔗",
    "category": "theory",
    "problems": [
      {
        "id": "sql-q18",
        "title": "Q18. What are SQL Joins? Explain all join types.",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Joins Overview"
        ],
        "answer": "Answer:\nJoins combine columns from one or more tables by evaluating matching values across designated relational key columns.\n\nVisual ASCII Venn Diagrams:\n1. INNER JOIN (Intersection):\n      Table A       Table B\n     ┌───────┐     ┌───────┐\n     │   A   │ ─── │   B   │   ===> Only matching rows (A ∩ B)\n     └───────┘     └───────┘\n\n2. LEFT JOIN (Left inclusive):\n     ┌───────────────┐\n     │ Table A       │ ───> All rows from Table A\n     │ ┌───────────┐ │\n     │ │ Matching B│ │ ───> Matching rows from Table B (NULL if none)\n     └─┴───────────┴─┘\n\n3. RIGHT JOIN:\n     All rows from Table B + matching columns from Table A (NULL if none).\n\n4. FULL OUTER JOIN:\n     All rows from Table A and Table B. (Simulated in MySQL via LEFT JOIN UNION RIGHT JOIN).\n\n5. CROSS JOIN (Cartesian Product):\n     Every row in A paired with every row in B (Size: N × M rows)."
      },
      {
        "id": "sql-q22",
        "title": "Q22. What is a SELF JOIN? When is it used?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "SELF JOIN"
        ],
        "answer": "Answer:\nA SELF JOIN is a regular join where a table is joined with itself using distinct table aliases. It is primarily used to represent hierarchical, tree, or graph relationships stored within a single table.\n\nVisual Hierarchy Representation:\n               [Rahul (emp_id: 1, manager_id: NULL)]\n                               ▲\n             ┌─────────────────┴─────────────────┐\n             │                                   │\n   [Aman (emp_id: 2, mgr: 1)]          [Priya (emp_id: 3, mgr: 1)]\n             ▲\n     ┌───────┴───────┐\n     │               │\n  [Neha]          [Karan]\n\nAlias Mapping:\n  FROM Employees e (as Employee role)\n  LEFT JOIN Employees m (as Manager role) ON e.manager_id = m.emp_id"
      },
      {
        "id": "sql-q24",
        "title": "Q24. What is the difference between INNER JOIN and LEFT JOIN?",
        "difficulty": "Easy",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "INNER vs LEFT"
        ],
        "answer": "Answer:\n• INNER JOIN discards rows from either table that do not satisfy the join predicate.\n• LEFT JOIN preserves 100% of the rows from the left table regardless of whether a matching record exists on the right side.\n\nVisual Comparison:\n  Left: Employees [dept_id: 101, 102, 999]\n  Right: Departments [dept_id: 101, 102, 103]\n\n  INNER JOIN Output:\n  dept_id 101, 102  <-- Only matching IDs\n\n  LEFT JOIN Output:\n  dept_id 101, 102  <-- Matched with Department names\n  dept_id 999       <-- Preserved, dept_name filled with NULL"
      },
      {
        "id": "sql-q32",
        "title": "Q32. What is the difference between IN and EXISTS?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "IN vs EXISTS"
        ],
        "answer": "Answer:\n• IN evaluates the subquery first, collects the entire value set into memory, and tests membership. It can fail unexpectedly with NULLs (NOT IN with a single NULL returns empty).\n• EXISTS executes as a boolean condition that short-circuits (stops scanning) as soon as the first matching row is found. It handles NULLs cleanly without returning UNKNOWN.\n\nExecution Flow:\n  IN:\n    Step 1: Execute subquery -> Set = {101, 102, 103}\n    Step 2: Check each outer row: WHERE dept_id IN ({101, 102, 103})\n\n  EXISTS:\n    For each outer row:\n    Scan child index -> Found 1 matching row? -> TRUE (Halt search immediately)."
      }
    ]
  },
  {
    "id": "sql-theory-advanced",
    "name": "Theory 3: Window Functions, CTEs & Internals (Q33, Q35, Q38, Q42)",
    "description": "Advanced relational architecture: Window calculations vs GROUP BY, analytical ranking semantics, Common Table Expressions, and temporary storage models.",
    "icon": "⚡",
    "category": "theory",
    "problems": [
      {
        "id": "sql-q33",
        "title": "Q33. What are Window Functions in SQL?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Window Functions"
        ],
        "answer": "Answer:\nWindow functions perform calculations across a designated set of rows (the \"window frame\") related to the current row, without collapsing multiple rows into a single output row like GROUP BY.\n\nVisual Comparison:\n  GROUP BY (Collapsing):\n  Row 1 (Dept 101, 60k) ──┐\n  Row 2 (Dept 101, 75k) ──┴──> Output: [Dept 101, AVG: 67.5k] (1 row)\n\n  WINDOW FUNCTION (Preserving Rows):\n  Row 1 (Rahul, 60k)  ───────> Output: [Rahul, 60k, Dept_Avg: 67.5k]\n  Row 2 (Priya, 75k)  ───────> Output: [Priya, 75k, Dept_Avg: 67.5k]"
      },
      {
        "id": "sql-q35",
        "title": "Q35. What is the difference between ROW_NUMBER(), RANK() and DENSE_RANK()?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "Ranking"
        ],
        "answer": "Visual Ranking Matrix (For Salaries: 90k, 80k, 80k, 70k):\n\n┌────────┬──────────────┬────────┬────────────┐\n│ Salary │ ROW_NUMBER() │ RANK() │ DENSE_RANK │\n├────────┼──────────────┼────────┼────────────┤\n│ 90,000 │ 1            │ 1      │ 1          │\n│ 80,000 │ 2 (tie #1)   │ 2      │ 2          │\n│ 80,000 │ 3 (tie #2)   │ 2      │ 2          │\n│ 70,000 │ 4            │ 4      │ 3          │\n└────────┴──────────────┴────────┴────────────┘\n\nRules to Memorize:\n• ROW_NUMBER(): Unique, strictly sequential integers with no duplicates (1, 2, 3, 4).\n• RANK(): Duplicate ranks on ties, leaves gaps in subsequent numbers (1, 2, 2, 4).\n• DENSE_RANK(): Duplicate ranks on ties, NO gaps in subsequent numbers (1, 2, 2, 3)."
      },
      {
        "id": "sql-q38",
        "title": "Q38. What is a CTE (Common Table Expression)?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/with.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Theory",
          "CTE"
        ],
        "answer": "Answer:\nA Common Table Expression (CTE) is a named, temporary result set declared using the WITH clause. It exists only within the execution scope of the single statement that defines it.\n\nVisual Modular Structure:\n  WITH DeptAvg AS (\n    -- Block 1: Modular calculation\n    SELECT dept_id, AVG(salary) AS avg_sal FROM Employees GROUP BY dept_id\n  ),\n  HighEarners AS (\n    -- Block 2: Consumes Block 1\n    SELECT e.* FROM Employees e JOIN DeptAvg d ON e.dept_id = d.dept_id WHERE e.salary > d.avg_sal\n  )\n  -- Final Consumption:\n  SELECT * FROM HighEarners;"
      },
      {
        "id": "sql-q42",
        "title": "Q42. What is the difference between a CTE, a subquery and a temporary table?",
        "difficulty": "Medium",
        "category": "theory",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/with.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Theory",
          "Architecture"
        ],
        "answer": "Comparison Matrix:\n┌──────────────┬────────────────────────┬──────────────────────┬──────────────────────────┐\n│ Dimension    │ CTE (WITH clause)      │ Subquery (Nested)    │ Temporary Table          │\n├──────────────┼────────────────────────┼──────────────────────┼──────────────────────────┤\n│ Syntax       │ WITH cte AS (...)      │ (SELECT ...)         │ CREATE TEMPORARY TABLE   │\n│ Scope        │ Single statement       │ Clause/statement     │ Entire client session    │\n│ Reusability  │ Multiple times in stmt │ Must be re-written   │ Across multiple queries  │\n│ Indexing     │ No explicit indexes    │ No explicit indexes  │ Can add custom B-Tree idx│\n│ Disk Storage │ Usually in-memory/opt  │ In-memory optimizer  │ Temp storage tablespace  │\n└──────────────┴────────────────────────┴──────────────────────┴──────────────────────────┘"
      }
    ]
  },
  {
    "id": "sql-cmd-basics",
    "name": "Commands 1: Basic Filtering, Patterns & Sorting (Q6–Q9)",
    "description": "Hands-on queries: WHERE filtering, LIKE wildcards, DISTINCT value deduplication, and multi-column ORDER BY.",
    "icon": "💻",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q6",
        "title": "Q6. Write a query to fetch all employees earning more than 50,000.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "WHERE"
        ],
        "answer": "Query:\nSELECT * FROM Employees WHERE salary > 50000;\n\nVisual Result Set:\n┌────────┬────────┬────────┬─────────┬────────────┐\n│ emp_id │ name   │ salary │ dept_id │ manager_id │\n├────────┼────────┼────────┼─────────┼────────────┤\n│ 1      │ Rahul  │ 60000  │ 101     │ NULL       │\n│ 3      │ Priya  │ 75000  │ 101     │ 1          │\n│ 5      │ Karan  │ 60000  │ 102     │ 2          │\n└────────┴────────┴────────┴─────────┴────────────┘\n(Rows with Aman [45k] and Neha [50k] are filtered out because 50,000 is not > 50,000)"
      },
      {
        "id": "sql-q7",
        "title": "Q7. Write a query to fetch employees whose names start with 'A'.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/pattern-matching.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "LIKE"
        ],
        "answer": "Query:\nSELECT * FROM Employees WHERE name LIKE 'A%';\n\nVisual Pattern Match:\n  'Aman'  ──> Starts with 'A' followed by 'man' (Matched!)\n  'Rahul' ──> Starts with 'R'                   (Rejected)\n  'Priya' ──> Starts with 'P'                   (Rejected)\n\nVisual Result Set:\n┌────────┬──────┬────────┬─────────┬────────────┐\n│ emp_id │ name │ salary │ dept_id │ manager_id │\n├────────┼──────┼────────┼─────────┼────────────┤\n│ 2      │ Aman │ 45000  │ 102     │ 1          │\n└────────┴──────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q8",
        "title": "Q8. How do you find distinct department IDs?",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/distinct-optimization.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "DISTINCT"
        ],
        "answer": "Query:\nSELECT DISTINCT dept_id FROM Employees;\n\nVisual Deduplication:\n  Input Stream: [101, 102, 101, 103, 102]\n                       │\n                  [DISTINCT]\n                       │\n  Output Set:   [101, 102, 103]\n\nVisual Result Set:\n┌─────────┐\n│ dept_id │\n├─────────┤\n│ 101     │\n│ 102     │\n│ 103     │\n└─────────┘"
      },
      {
        "id": "sql-q9",
        "title": "Q9. How do you sort employees by salary in descending order?",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/sorting-rows.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "ORDER BY"
        ],
        "answer": "Query:\nSELECT * FROM Employees ORDER BY salary DESC;\n\n-- Multi-column (Salary descending, then name ascending for ties):\nSELECT * FROM Employees ORDER BY salary DESC, name ASC;\n\nVisual Result Set (Ordered by salary DESC):\n┌────────┬────────┬────────┬─────────┬────────────┐\n│ emp_id │ name   │ salary │ dept_id │ manager_id │\n├────────┼────────┼────────┼─────────┼────────────┤\n│ 3      │ Priya  │ 75000  │ 101     │ 1          │  <-- Highest\n│ 5      │ Karan  │ 60000  │ 102     │ 2          │  <-- Tie (Alphabetical)\n│ 1      │ Rahul  │ 60000  │ 101     │ NULL       │  <-- Tie\n│ 4      │ Neha   │ 50000  │ 103     │ 2          │\n│ 2      │ Aman   │ 45000  │ 102     │ 1          │  <-- Lowest\n└────────┴────────┴────────┴─────────┴────────────┘"
      }
    ]
  },
  {
    "id": "sql-cmd-aggregates",
    "name": "Commands 2: Aggregations & GROUP BY (Q12–Q17)",
    "description": "Analytical queries: Department headcounts, salary averages, totals, and nested aggregate comparisons using HAVING.",
    "icon": "📊",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q12",
        "title": "Q12. Find the total number of employees in each department.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "GROUP BY"
        ],
        "answer": "Query:\nSELECT dept_id, COUNT(*) AS employee_count\nFROM Employees\nGROUP BY dept_id;\n\nVisual Partitioning:\n  Dept 101 Bucket: [Rahul, Priya] ──> Count = 2\n  Dept 102 Bucket: [Aman, Karan]  ──> Count = 2\n  Dept 103 Bucket: [Neha]         ──> Count = 1\n\nVisual Result Set:\n┌─────────┬────────────────┐\n│ dept_id │ employee_count │\n├─────────┼────────────────┤\n│ 101     │ 2              │\n│ 102     │ 2              │\n│ 103     │ 1              │\n└─────────┴────────────────┘"
      },
      {
        "id": "sql-q13",
        "title": "Q13. Find the average salary of each department.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "AVG"
        ],
        "answer": "Query:\nSELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id;\n\nVisual Result Set:\n┌─────────┬────────────┐\n│ dept_id │ avg_salary │\n├─────────┼────────────┤\n│ 101     │ 67500.0000 │  <-- (60,000 + 75,000) / 2\n│ 102     │ 52500.0000 │  <-- (45,000 + 60,000) / 2\n│ 103     │ 50000.0000 │  <-- 50,000 / 1\n└─────────┴────────────┘"
      },
      {
        "id": "sql-q14",
        "title": "Q14. Find departments having more than 2 employees.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "HAVING"
        ],
        "answer": "Query:\nSELECT dept_id, COUNT(*) AS total_employees\nFROM Employees\nGROUP BY dept_id\nHAVING COUNT(*) > 2;\n\nVisual Filter:\n  Dept 101 (Count=2) ──> 2 > 2 is FALSE (Filtered out)\n  Dept 102 (Count=2) ──> 2 > 2 is FALSE (Filtered out)\n  Dept 103 (Count=1) ──> 1 > 2 is FALSE (Filtered out)\n  Result: Empty set (In our sample data, no department has > 2)"
      },
      {
        "id": "sql-q15",
        "title": "Q15. Find the highest and lowest salary in the company.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "MAX/MIN"
        ],
        "answer": "Query:\nSELECT MAX(salary) AS highest_salary, MIN(salary) AS lowest_salary FROM Employees;\n\nVisual Result Set:\n┌────────────────┬───────────────┐\n│ highest_salary │ lowest_salary │\n├────────────────┼───────────────┤\n│ 75000          │ 45000         │\n└────────────────┴───────────────┘"
      },
      {
        "id": "sql-q16",
        "title": "Q16. Find the total salary paid by each department.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "SUM"
        ],
        "answer": "Query:\nSELECT dept_id, SUM(salary) AS total_salary\nFROM Employees\nGROUP BY dept_id;\n\nVisual Result Set:\n┌─────────┬──────────────┐\n│ dept_id │ total_salary │\n├─────────┼──────────────┤\n│ 101     │ 135000       │  <-- 60k + 75k\n│ 102     │ 105000       │  <-- 45k + 60k\n│ 103     │ 50000        │  <-- 50k\n└─────────┴──────────────┘"
      },
      {
        "id": "sql-q17",
        "title": "Q17. Find departments whose average salary is greater than the company's overall average salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "HAVING Subquery"
        ],
        "answer": "Query:\nSELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id\nHAVING AVG(salary) > (\n  SELECT AVG(salary) FROM Employees\n);\n\nVisual Comparison:\n  Overall Company Average = (60k + 45k + 75k + 50k + 60k) / 5 = 58,000\n\n  Dept 101 Avg: 67,500 > 58,000 ===> KEEP\n  Dept 102 Avg: 52,500 > 58,000 ===> DISCARD\n  Dept 103 Avg: 50,000 > 58,000 ===> DISCARD\n\nVisual Result Set:\n┌─────────┬────────────┐\n│ dept_id │ avg_salary │\n├─────────┼────────────┤\n│ 101     │ 67500.0000 │\n└─────────┴────────────┘"
      }
    ]
  },
  {
    "id": "sql-cmd-joins",
    "name": "Commands 3: Relational Join Queries (Q19–Q21, Q23, Q25)",
    "description": "Hands-on table joins: Multi-table entity lookups, preserving unmatched rows via LEFT JOIN, anti-joins, and non-symmetric self joins.",
    "icon": "🔗",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q19",
        "title": "Q19. Find employee names along with their department names.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "INNER JOIN"
        ],
        "answer": "Query:\nSELECT e.name, d.dept_name\nFROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id;\n\nVisual Relational Matching:\n  Employees (e)                  Departments (d)\n  [Rahul, dept_id: 101]   <--->  [dept_id: 101, IT]\n  [Aman,  dept_id: 102]   <--->  [dept_id: 102, HR]\n  [Priya, dept_id: 101]   <--->  [dept_id: 101, IT]\n  [Neha,  dept_id: 103]   <--->  [dept_id: 103, Finance]\n  [Karan, dept_id: 102]   <--->  [dept_id: 102, HR]\n\nVisual Result Set:\n┌───────┬───────────┐\n│ name  │ dept_name │\n├───────┼───────────┤\n│ Rahul │ IT        │\n│ Priya │ IT        │\n│ Aman  │ HR        │\n│ Karan │ HR        │\n│ Neha  │ Finance   │\n└───────┴───────────┘"
      },
      {
        "id": "sql-q20",
        "title": "Q20. Find all employees, including those who do not belong to any department.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "LEFT JOIN"
        ],
        "answer": "Query:\nSELECT e.name, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id;\n\nVisual Representation:\n  If an employee has dept_id = NULL or non-existent in Departments,\n  LEFT JOIN preserves their row and produces NULL in d.dept_name."
      },
      {
        "id": "sql-q21",
        "title": "Q21. Find departments that have no employees.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Anti-Join"
        ],
        "answer": "Query:\nSELECT d.dept_id, d.dept_name\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.dept_id\nWHERE e.emp_id IS NULL;\n\nVisual Anti-Join Process:\n  Departments    Joined Employee ID    Filter (IS NULL)\n  101 (IT)       1 (Rahul), 3 (Priya)  Discard\n  102 (HR)       2 (Aman), 5 (Karan)   Discard\n  103 (Finance)  4 (Neha)              Discard\n  104 (Marketing)NULL                  ===> KEEP (No employees!)\n\nVisual Result Set:\n┌─────────┬───────────┐\n│ dept_id │ dept_name │\n├─────────┼───────────┤\n│ 104     │ Marketing │\n└─────────┴───────────┘"
      },
      {
        "id": "sql-q23",
        "title": "Q23. Find employees who work in the IT department.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "JOIN Filter"
        ],
        "answer": "Query:\nSELECT e.name, d.dept_name\nFROM Employees e\nJOIN Departments d ON e.dept_id = d.dept_id\nWHERE d.dept_name = 'IT';\n\nVisual Result Set:\n┌───────┬───────────┐\n│ name  │ dept_name │\n├───────┼───────────┤\n│ Rahul │ IT        │\n│ Priya │ IT        │\n└───────┴───────────┘"
      },
      {
        "id": "sql-q25",
        "title": "Q25. Find pairs of employees working in the same department.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "Pairing Matrix"
        ],
        "answer": "Query:\nSELECT \n  e1.name AS employee1,\n  e2.name AS employee2,\n  e1.dept_id\nFROM Employees e1\nJOIN Employees e2 \n  ON e1.dept_id = e2.dept_id \n AND e1.emp_id < e2.emp_id;\n\nVisual Pairing Mechanism:\n  Condition e1.emp_id < e2.emp_id guarantees:\n  1. No self-pairing (emp_id 1 with 1 rejected)\n  2. No duplicate mirror pairs (returns (Rahul, Priya), omits (Priya, Rahul))\n\nVisual Result Set:\n┌───────────┬───────────┬─────────┐\n│ employee1 │ employee2 │ dept_id │\n├───────────┼───────────┼─────────┤\n│ Rahul     │ Priya     │ 101     │\n│ Aman      │ Karan     │ 102     │\n└───────────┴───────────┴─────────┘"
      }
    ]
  },
  {
    "id": "sql-cmd-subqueries",
    "name": "Commands 4: Subqueries and Nested Queries (Q26–Q31)",
    "description": "Subquery techniques: Scalar comparisons, department-correlated subqueries, Nth highest distinct values, and IN operators.",
    "icon": "🎯",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q26",
        "title": "Q26. Find the employee receiving the highest salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Scalar Subquery"
        ],
        "answer": "Query:\nSELECT * FROM Employees\nWHERE salary = (\n  SELECT MAX(salary) FROM Employees\n);\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────┬────────────┐\n│ emp_id │ name  │ salary │ dept_id │ manager_id │\n├────────┼───────┼────────┼─────────┼────────────┤\n│ 3      │ Priya │ 75000  │ 101     │ 1          │\n└────────┴───────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q27",
        "title": "Q27. Find employees earning more than the average company salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Subquery AVG"
        ],
        "answer": "Query:\nSELECT * FROM Employees\nWHERE salary > (\n  SELECT AVG(salary) FROM Employees\n);\n\nVisual Filter (Threshold: 58,000):\n  Rahul: 60,000 > 58,000  ===> KEEP\n  Priya: 75,000 > 58,000  ===> KEEP\n  Karan: 60,000 > 58,000  ===> KEEP\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────┬────────────┐\n│ emp_id │ name  │ salary │ dept_id │ manager_id │\n├────────┼───────┼────────┼─────────┼────────────┤\n│ 1      │ Rahul │ 60000  │ 101     │ NULL       │\n│ 3      │ Priya │ 75000  │ 101     │ 1          │\n│ 5      │ Karan │ 60000  │ 102     │ 2          │\n└────────┴───────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q28",
        "title": "Q28. Find the second-highest salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "2nd Highest"
        ],
        "answer": "Query:\nSELECT MAX(salary) AS second_highest_salary\nFROM Employees\nWHERE salary < (\n  SELECT MAX(salary) FROM Employees\n);\n\nVisual Steps:\n  1. Inner Max: 75,000\n  2. Outer Filter: All salaries < 75,000 -> {60k, 45k, 50k, 60k}\n  3. Max of remaining: 60,000\n\nVisual Result Set:\n┌───────────────────────┐\n│ second_highest_salary │\n├───────────────────────┤\n│ 60000                 │\n└───────────────────────┘"
      },
      {
        "id": "sql-q29",
        "title": "Q29. Find the third-highest distinct salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "LIMIT/OFFSET"
        ],
        "answer": "Query:\nSELECT DISTINCT salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 1 OFFSET 2;\n\nVisual Pagination:\n  Distinct Ordered Salaries:\n  [75,000]  <-- Offset 0\n  [60,000]  <-- Offset 1\n  [50,000]  <-- Offset 2 (LIMIT 1 picks this!)\n  [45,000]\n\nVisual Result Set:\n┌────────┐\n│ salary │\n├────────┤\n│ 50000  │\n└────────┘"
      },
      {
        "id": "sql-q30",
        "title": "Q30. Find employees earning more than their department's average salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/correlated-subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Correlated Subquery"
        ],
        "answer": "Query:\nSELECT e.*\nFROM Employees e\nWHERE e.salary > (\n  SELECT AVG(e2.salary)\n  FROM Employees e2\n  WHERE e2.dept_id = e.dept_id\n);\n\nVisual Evaluation:\n  • Rahul (Dept 101, 60k) vs Dept 101 Avg (67.5k) ===> Below\n  • Priya (Dept 101, 75k) vs Dept 101 Avg (67.5k) ===> ABOVE!\n  • Aman  (Dept 102, 45k) vs Dept 102 Avg (52.5k) ===> Below\n  • Karan (Dept 102, 60k) vs Dept 102 Avg (52.5k) ===> ABOVE!\n  • Neha  (Dept 103, 50k) vs Dept 103 Avg (50.0k) ===> Equal (not >)\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────┬────────────┐\n│ emp_id │ name  │ salary │ dept_id │ manager_id │\n├────────┼───────┼────────┼─────────┼────────────┤\n│ 3      │ Priya │ 75000  │ 101     │ 1          │\n│ 5      │ Karan │ 60000  │ 102     │ 2          │\n└────────┴───────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q31",
        "title": "Q31. Find employees who belong to departments present in the Departments table using IN.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/any-in-some-subqueries.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "IN Subquery"
        ],
        "answer": "Query:\nSELECT * FROM Employees\nWHERE dept_id IN (\n  SELECT dept_id FROM Departments\n);\n\nVisual Result Set:\nReturns all 5 employees because 101, 102, and 103 are all present in Departments."
      }
    ]
  },
  {
    "id": "sql-cmd-window",
    "name": "Commands 5: Window Functions & Analytical Queries (Q34, Q36, Q37, Q39–Q41)",
    "description": "Analytical MySQL 8.0 commands: DENSE_RANK partitioning, top N per department, LAG previous row lookups, and running totals.",
    "icon": "⚡",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q34",
        "title": "Q34. Find the second-highest salary using DENSE_RANK().",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "DENSE_RANK"
        ],
        "answer": "Query:\nWITH RankedEmployees AS (\n  SELECT \n    name, \n    salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM Employees\n)\nSELECT name, salary\nFROM RankedEmployees\nWHERE rnk = 2;\n\nVisual Partition Ranks:\n  Priya (75k) ──> rnk 1\n  Rahul (60k) ──> rnk 2 (Matches!)\n  Karan (60k) ──> rnk 2 (Matches!)\n  Neha  (50k) ──> rnk 3\n\nVisual Result Set:\n┌───────┬────────┐\n│ name  │ salary │\n├───────┼────────┤\n│ Rahul │ 60000  │\n│ Karan │ 60000  │\n└───────┴────────┘"
      },
      {
        "id": "sql-q36",
        "title": "Q36. Find the highest-paid employee in each department.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Top per Group"
        ],
        "answer": "Query:\nWITH RankedEmployees AS (\n  SELECT \n    name, \n    dept_id, \n    salary,\n    DENSE_RANK() OVER (\n      PARTITION BY dept_id \n      ORDER BY salary DESC\n    ) AS rnk\n  FROM Employees\n)\nSELECT name, dept_id, salary\nFROM RankedEmployees\nWHERE rnk = 1;\n\nVisual Partitioning:\n  Dept 101 Partition: Priya (75k: rank 1), Rahul (60k: rank 2)\n  Dept 102 Partition: Karan (60k: rank 1), Aman (45k: rank 2)\n  Dept 103 Partition: Neha (50k: rank 1)\n\nVisual Result Set:\n┌───────┬─────────┬────────┐\n│ name  │ dept_id │ salary │\n├───────┼─────────┼────────┤\n│ Priya │ 101     │ 75000  │\n│ Karan │ 102     │ 60000  │\n│ Neha  │ 103     │ 50000  │\n└───────┴─────────┴────────┘"
      },
      {
        "id": "sql-q37",
        "title": "Q37. Find the top 3 highest-paid employees in each department.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Top 3"
        ],
        "answer": "Query:\nWITH RankedEmployees AS (\n  SELECT \n    name, \n    dept_id, \n    salary,\n    DENSE_RANK() OVER (\n      PARTITION BY dept_id \n      ORDER BY salary DESC\n    ) AS rnk\n  FROM Employees\n)\nSELECT name, dept_id, salary, rnk\nFROM RankedEmployees\nWHERE rnk <= 3;"
      },
      {
        "id": "sql-q39",
        "title": "Q39. Find the employees whose salary is higher than the previous employee in employee ID order.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_lag"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Commands",
          "LAG Window"
        ],
        "answer": "Query:\nWITH SalaryComparison AS (\n  SELECT \n    emp_id, \n    name, \n    salary,\n    LAG(salary) OVER (ORDER BY emp_id) AS previous_salary\n  FROM Employees\n)\nSELECT emp_id, name, salary, previous_salary\nFROM SalaryComparison\nWHERE salary > previous_salary;\n\nVisual LAG Pointers:\n  emp_id 1 (Rahul: 60k) | Prev: NULL  (Discard)\n  emp_id 2 (Aman: 45k)  | Prev: 60k   (45k > 60k is False)\n  emp_id 3 (Priya: 75k) | Prev: 45k   (75k > 45k ===> TRUE!)\n  emp_id 4 (Neha: 50k)  | Prev: 75k   (50k > 75k is False)\n  emp_id 5 (Karan: 60k) | Prev: 50k   (60k > 50k ===> TRUE!)\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────────────┐\n│ emp_id │ name  │ salary │ previous_salary │\n├────────┼───────┼────────┼─────────────────┤\n│ 3      │ Priya │ 75000  │ 45000           │\n│ 5      │ Karan │ 60000  │ 50000           │\n└────────┴───────┴────────┴─────────────────┘"
      },
      {
        "id": "sql-q40",
        "title": "Q40. Calculate the running total of employee salaries.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "Running Total"
        ],
        "answer": "Query:\nSELECT \n  emp_id, \n  name, \n  salary,\n  SUM(salary) OVER (\n    ORDER BY emp_id \n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM Employees;\n\nVisual Rolling Sum Accumulation:\n  Row 1 (Rahul: 60k): 60k                     =  60,000\n  Row 2 (Aman: 45k):  60k + 45k               = 105,000\n  Row 3 (Priya: 75k): 60k + 45k + 75k         = 180,000\n  Row 4 (Neha: 50k):  60k + 45k + 75k + 50k   = 230,000\n  Row 5 (Karan: 60k): 60k + ... + 60k         = 290,000\n\nVisual Result Set:\n┌────────┬───────┬────────┬───────────────┐\n│ emp_id │ name  │ salary │ running_total │\n├────────┼───────┼────────┼───────────────┤\n│ 1      │ Rahul │ 60000  │ 60000         │\n│ 2      │ Aman  │ 45000  │ 105000        │\n│ 3      │ Priya │ 75000  │ 180000        │\n│ 4      │ Neha  │ 50000  │ 230000        │\n│ 5      │ Karan │ 60000  │ 290000        │\n└────────┴───────┴────────┴───────────────┘"
      },
      {
        "id": "sql-q41",
        "title": "Q41. Find the difference between each employee's salary and the company's average salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Commands",
          "AVG OVER"
        ],
        "answer": "Query:\nSELECT \n  name, \n  salary,\n  salary - AVG(salary) OVER() AS difference\nFROM Employees;\n\nVisual Calculation (Company Avg = 58,000):\n  Rahul: 60,000 - 58,000 =  +2,000\n  Aman:  45,000 - 58,000 = -13,000\n  Priya: 75,000 - 58,000 = +17,000\n  Neha:  50,000 - 58,000 =  -8,000\n  Karan: 60,000 - 58,000 =  +2,000"
      }
    ]
  },
  {
    "id": "sql-cmd-problems",
    "name": "Commands 6: Problem Solving & Deduplication (Q43–Q50)",
    "description": "Advanced real-world interview challenges: Deduplication with window CTEs, payroll percentages, manager hierarchies, and median calculations.",
    "icon": "🏆",
    "category": "commands",
    "problems": [
      {
        "id": "sql-q43",
        "title": "Q43. Find duplicate records based on employee name.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Duplicates"
        ],
        "answer": "Query:\nSELECT name, COUNT(*) AS total\nFROM Employees\nGROUP BY name\nHAVING COUNT(*) > 1;"
      },
      {
        "id": "sql-q44",
        "title": "Q44. Delete duplicate records while keeping one record.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/delete.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Deduplication"
        ],
        "answer": "Query:\nWITH DuplicateRecords AS (\n  SELECT \n    emp_id,\n    ROW_NUMBER() OVER (\n      PARTITION BY name, salary \n      ORDER BY emp_id ASC\n    ) AS rn\n  FROM Employees\n)\nDELETE FROM Employees\nWHERE emp_id IN (\n  SELECT emp_id FROM DuplicateRecords WHERE rn > 1\n);\n\nVisual Deduplication Flow:\n  Partition (Rahul, 60k):\n    emp_id: 1 ──> rn: 1  (KEEP)\n    emp_id: 6 ──> rn: 2  (DELETE)\n    emp_id: 9 ──> rn: 3  (DELETE)"
      },
      {
        "id": "sql-q45",
        "title": "Q45. Find employees who have the same salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "Salary Parity"
        ],
        "answer": "Query:\nSELECT * FROM Employees\nWHERE salary IN (\n  SELECT salary\n  FROM Employees\n  GROUP BY salary\n  HAVING COUNT(*) > 1\n);\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────┬────────────┐\n│ emp_id │ name  │ salary │ dept_id │ manager_id │\n├────────┼───────┼────────┼─────────┼────────────┤\n│ 1      │ Rahul │ 60000  │ 101     │ NULL       │\n│ 5      │ Karan │ 60000  │ 102     │ 2          │\n└────────┴───────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q46",
        "title": "Q46. Find the department with the highest average salary.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Commands",
          "Top-1 Dept"
        ],
        "answer": "Query:\nSELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id\nORDER BY avg_salary DESC\nLIMIT 1;\n\nVisual Result Set:\n┌─────────┬────────────┐\n│ dept_id │ avg_salary │\n├─────────┼────────────┤\n│ 101     │ 67500.0000 │\n└─────────┴────────────┘"
      },
      {
        "id": "sql-q47",
        "title": "Q47. Find employees who earn the same salary as at least one other employee.",
        "difficulty": "Medium",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "Non-Equi Join"
        ],
        "answer": "Query:\nSELECT DISTINCT e1.name, e1.salary\nFROM Employees e1\nJOIN Employees e2 \n  ON e1.salary = e2.salary \n AND e1.emp_id <> e2.emp_id;\n\nVisual Result Set:\n┌───────┬────────┐\n│ name  │ salary │\n├───────┼────────┤\n│ Rahul │ 60000  │\n│ Karan │ 60000  │\n└───────┴────────┘"
      },
      {
        "id": "sql-q48",
        "title": "Q48. Find the percentage contribution of each department to the total company salary.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Commands",
          "Percentages"
        ],
        "answer": "Query:\nSELECT \n  dept_id,\n  SUM(salary) AS dept_salary,\n  ROUND(\n    SUM(salary) * 100.0 / (SELECT SUM(salary) FROM Employees), \n    2\n  ) AS percentage\nFROM Employees\nGROUP BY dept_id;\n\nVisual Percentage Breakdown (Total Company Payroll = 290,000):\n  Dept 101 (IT):      135,000 / 290,000 * 100 = 46.55%\n  Dept 102 (HR):      105,000 / 290,000 * 100 = 36.21%\n  Dept 103 (Finance):  50,000 / 290,000 * 100 = 17.24%\n\nVisual Result Set:\n┌─────────┬─────────────┬────────────┐\n│ dept_id │ dept_salary │ percentage │\n├─────────┼─────────────┼────────────┤\n│ 101     │ 135000      │ 46.55      │\n│ 102     │ 105000      │ 36.21      │\n│ 103     │ 50000       │ 17.24      │\n└─────────┴─────────────┴────────────┘"
      },
      {
        "id": "sql-q49",
        "title": "Q49. Find employees who do not have a manager.",
        "difficulty": "Easy",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Commands",
          "IS NULL"
        ],
        "answer": "Query:\nSELECT * FROM Employees WHERE manager_id IS NULL;\n\nVisual Hierarchy Root:\n  [Rahul (emp_id: 1, manager_id: NULL)]  <=== Root of company!\n\nVisual Result Set:\n┌────────┬───────┬────────┬─────────┬────────────┐\n│ emp_id │ name  │ salary │ dept_id │ manager_id │\n├────────┼───────┼────────┼─────────┼────────────┤\n│ 1      │ Rahul │ 60000  │ 101     │ NULL       │\n└────────┴───────┴────────┴─────────┴────────────┘"
      },
      {
        "id": "sql-q50",
        "title": "Q50. Find the median salary of employees.",
        "difficulty": "Hard",
        "category": "commands",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Commands",
          "Median Window"
        ],
        "answer": "Query:\nWITH RankedSalaries AS (\n  SELECT \n    salary,\n    ROW_NUMBER() OVER (ORDER BY salary ASC) AS rn,\n    COUNT(*) OVER() AS total\n  FROM Employees\n)\nSELECT AVG(salary) AS median_salary\nFROM RankedSalaries\nWHERE rn IN (\n  FLOOR((total + 1) / 2),\n  FLOOR((total + 2) / 2)\n);\n\nVisual Median Index Selector:\n  Total Records = 5 (Odd):\n  FLOOR((5 + 1) / 2) = 3\n  FLOOR((5 + 2) / 2) = 3\n\n  Sorted Salaries:\n  rn 1: 45,000\n  rn 2: 50,000\n  rn 3: 60,000  <=== MEDIAN! (Average of 60,000 = 60,000)\n  rn 4: 60,000\n  rn 5: 75,000\n\nVisual Result Set:\n┌───────────────┐\n│ median_salary │\n├───────────────┤\n│ 60000.0000    │\n└───────────────┘"
      }
    ]
  }
];
