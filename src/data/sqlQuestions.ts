import type { Pattern } from '../types';

export const sqlQuestions: Pattern[] = [
  {
    "id": "sql-basics",
    "name": "Section 1: SQL Basics (Q1–Q10)",
    "description": "These questions establish your understanding of SQL commands, filtering, sorting and basic functions.",
    "icon": "🔰",
    "problems": [
      {
        "id": "sql-q1",
        "title": "Q1. What is SQL? What are the different types of SQL commands?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "SQL Commands",
          "DDL/DML"
        ],
        "answer": "Answer: SQL (Structured Query Language) is used to store, retrieve, manipulate and manage relational databases.\n\nFive Major Categories:\n• DDL (Data Definition Language): Defines and modifies table structures.\n  Commands: CREATE, ALTER, DROP, TRUNCATE\n• DML (Data Manipulation Language): Modifies and manages table records.\n  Commands: INSERT, UPDATE, DELETE\n• DQL (Data Query Language): Retrieves data from the database.\n  Commands: SELECT\n• DCL (Data Control Language): Controls permissions and access rights.\n  Commands: GRANT, REVOKE\n• TCL (Transaction Control Language): Manages transactional boundaries.\n  Commands: COMMIT, ROLLBACK, SAVEPOINT"
      },
      {
        "id": "sql-q2",
        "title": "Q2. What is the difference between DELETE, TRUNCATE and DROP?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/truncate-table.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Data Deletion",
          "DDL vs DML"
        ],
        "answer": "Answer:\n• DELETE: Removes selected rows based on a WHERE condition (or all rows if omitted). Operates as DML, logs individual row deletions, and activates triggers.\n• TRUNCATE: Removes all rows while preserving table structure and columns. Operates as DDL, deallocates data pages directly, and is much faster than DELETE.\n• DROP: Completely removes the entire table along with its schema, constraints, indexes, and triggers from the database dictionary.\n\nSyntax:\n-- Delete selected rows\nDELETE FROM Employees WHERE emp_id = 1;\n\n-- Remove all records while retaining structure\nTRUNCATE TABLE Employees;\n\n-- Remove the entire table definition and data\nDROP TABLE Employees;\n\nInterview Point:\nDELETE supports the WHERE clause; TRUNCATE and DROP do not. In transaction-safe storage engines (like MySQL InnoDB), TRUNCATE implicitly commits the transaction and cannot be rolled back, whereas DELETE can be rolled back inside an active transaction."
      },
      {
        "id": "sql-q3",
        "title": "Q3. What is the difference between WHERE and HAVING?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Filtering",
          "GROUP BY"
        ],
        "answer": "Answer:\n• WHERE: Filters individual rows before any grouping or aggregation takes place. It cannot evaluate aggregate functions directly.\n• HAVING: Filters aggregated groups after the GROUP BY clause has summarized the data.\n\nSyntax Examples:\n-- Employees earning above 50,000 (Row-level filter before grouping)\nSELECT * FROM Employees WHERE salary > 50000;\n\n-- Departments with average salary above 50,000 (Group-level filter on aggregated metric)\nSELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id\nHAVING AVG(salary) > 50000;"
      },
      {
        "id": "sql-q4",
        "title": "Q4. What is the difference between PRIMARY KEY and UNIQUE KEY?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Constraints",
          "Keys"
        ],
        "answer": "Primary Key vs Unique Key Comparison:\n\nFeature           | PRIMARY KEY                    | UNIQUE KEY\n------------------+--------------------------------+----------------------------\nPurpose           | Uniquely identifies each row   | Prevents duplicate values\nNULL Handling     | Strictly NOT NULL              | Allows NULL (depends on DBMS)\nLimit per Table   | Exactly 1 per table            | Multiple constraints allowed\nIndex Type        | Clustered index by default     | Non-clustered index\nComposite Keys    | Can span multiple columns      | Can span multiple columns\n\nSyntax Example:\nCREATE TABLE Students (\n  id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE\n);"
      },
      {
        "id": "sql-q5",
        "title": "Q5. What is a FOREIGN KEY?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Referential Integrity"
        ],
        "answer": "Answer:\nA FOREIGN KEY creates a relationship between two tables and preserves referential integrity. It guarantees that the foreign key column value in the child table must either match an existing primary key in the referenced parent table or be NULL.\n\nSyntax:\nCREATE TABLE Departments (\n  dept_id INT PRIMARY KEY,\n  dept_name VARCHAR(50)\n);\n\nCREATE TABLE Employees (\n  emp_id INT PRIMARY KEY,\n  name VARCHAR(50),\n  dept_id INT,\n  FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)\n);\n\nExplanation:\nPrevents inserting a non-NULL department ID that does not exist in Departments, and prevents deleting a department while active employee rows still reference it (unless configured with ON DELETE CASCADE)."
      },
      {
        "id": "sql-q6",
        "title": "Q6. Write a query to fetch all employees earning more than 50,000.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "SELECT",
          "WHERE"
        ],
        "answer": "SELECT * FROM Employees WHERE salary > 50000;\n\nExplanation:\nWHERE applies a boolean condition to each row in the Employees table and returns only matching employee records."
      },
      {
        "id": "sql-q7",
        "title": "Q7. Write a query to fetch employees whose names start with 'A'.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/pattern-matching.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Pattern Matching",
          "LIKE"
        ],
        "answer": "SELECT * FROM Employees WHERE name LIKE 'A%';\n\nExplanation:\nThe LIKE operator evaluates wildcard pattern matches:\n• % matches zero or more characters.\n• _ matches exactly one character.\n\nOther Pattern Matching Examples:\n-- Names ending with 'a'\nSELECT * FROM Employees WHERE name LIKE '%a';\n\n-- Names containing 'an' anywhere\nSELECT * FROM Employees WHERE name LIKE '%an%';\n\n-- Names with exactly 4 characters\nSELECT * FROM Employees WHERE name LIKE '____';"
      },
      {
        "id": "sql-q8",
        "title": "Q8. How do you find distinct department IDs?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/distinct-optimization.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "DISTINCT",
          "Deduplication"
        ],
        "answer": "SELECT DISTINCT dept_id FROM Employees;\n\nExplanation:\nDISTINCT eliminates duplicate values from the query result set, returning each unique dept_id exactly once."
      },
      {
        "id": "sql-q9",
        "title": "Q9. How do you sort employees by salary in descending order?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/sorting-rows.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "ORDER BY",
          "Sorting"
        ],
        "answer": "SELECT * FROM Employees ORDER BY salary DESC;\n\n-- For multiple columns (descending by salary, ascending by name for ties)\nSELECT * FROM Employees ORDER BY salary DESC, name ASC;\n\nExplanation:\nORDER BY sorts the returned records. ASC denotes ascending order (default), while DESC denotes descending order."
      },
      {
        "id": "sql-q10",
        "title": "Q10. What is NULL? How do you handle NULL values?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "NULL Handling",
          "COALESCE"
        ],
        "answer": "Answer:\nNULL represents missing, unknown, or unassigned data. It is fundamentally not equivalent to zero (0) or an empty string ('').\n\nQuery Examples:\n-- Find employees without a manager\nSELECT * FROM Employees WHERE manager_id IS NULL;\n\n-- Find employees having a manager\nSELECT * FROM Employees WHERE manager_id IS NOT NULL;\n\n-- Using COALESCE() to substitute a fallback value for NULL\nSELECT name, COALESCE(manager_id, 0) AS manager FROM Employees;\n\nImportant:\nNever compare NULL using = NULL or != NULL. In three-valued logic, comparison with NULL evaluates to UNKNOWN. Always use IS NULL or IS NOT NULL."
      }
    ]
  },
  {
    "id": "sql-aggregates",
    "name": "Section 2: Aggregate Functions & GROUP BY (Q11–Q17)",
    "description": "These questions test your ability to analyze data and calculate statistics.",
    "icon": "📊",
    "problems": [
      {
        "id": "sql-q11",
        "title": "Q11. What are aggregate functions in SQL?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Aggregate Functions",
          "Analytics"
        ],
        "answer": "Answer:\nAggregate functions perform calculations across multiple rows and return a single summary value per group.\n\nCommon Aggregate Functions:\nFunction | Purpose\n---------+----------------------------------------------\nCOUNT()  | Counts the number of rows or non-NULL values\nSUM()    | Calculates the total sum of a numeric column\nAVG()    | Calculates the arithmetic mean\nMIN()    | Finds the minimum value\nMAX()    | Finds the maximum value\n\nExample:\nSELECT \n  COUNT(*) AS total_employees,\n  SUM(salary) AS total_salary,\n  AVG(salary) AS average_salary,\n  MIN(salary) AS minimum_salary,\n  MAX(salary) AS maximum_salary\nFROM Employees;"
      },
      {
        "id": "sql-q12",
        "title": "Q12. Find the total number of employees in each department.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "COUNT",
          "GROUP BY"
        ],
        "answer": "SELECT dept_id, COUNT(*) AS employee_count\nFROM Employees\nGROUP BY dept_id;\n\nExplanation:\nGROUP BY partitions rows with matching department IDs into groups, and COUNT(*) calculates the total number of employees within each department."
      },
      {
        "id": "sql-q13",
        "title": "Q13. Find the average salary of each department.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "AVG",
          "GROUP BY"
        ],
        "answer": "SELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id;\n\nExplanation:\nComputes the mean salary across all employees sharing the same dept_id."
      },
      {
        "id": "sql-q14",
        "title": "Q14. Find departments having more than 2 employees.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "HAVING",
          "GROUP BY"
        ],
        "answer": "SELECT dept_id, COUNT(*) AS total_employees\nFROM Employees\nGROUP BY dept_id\nHAVING COUNT(*) > 2;\n\nExplanation:\nUse HAVING instead of WHERE because the condition evaluates an aggregate function result (COUNT(*)) after grouping."
      },
      {
        "id": "sql-q15",
        "title": "Q15. Find the highest and lowest salary in the company.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "MAX",
          "MIN"
        ],
        "answer": "SELECT \n  MAX(salary) AS highest_salary,\n  MIN(salary) AS lowest_salary\nFROM Employees;\n\nExplanation:\nMAX() scans all salary values to return the peak salary, while MIN() returns the minimum salary."
      },
      {
        "id": "sql-q16",
        "title": "Q16. Find the total salary paid by each department.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "SUM",
          "GROUP BY"
        ],
        "answer": "SELECT dept_id, SUM(salary) AS total_salary\nFROM Employees\nGROUP BY dept_id;\n\nExplanation:\nSums the compensation of all employees assigned to each respective department."
      },
      {
        "id": "sql-q17",
        "title": "Q17. Find departments whose average salary is greater than the company's overall average salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "HAVING",
          "Subquery"
        ],
        "answer": "SELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id\nHAVING AVG(salary) > (\n  SELECT AVG(salary) FROM Employees\n);\n\nExplanation:\nThe inner scalar subquery calculates the company-wide average salary. The outer query groups employees by department and uses HAVING to compare each department's average against that benchmark."
      }
    ]
  },
  {
    "id": "sql-joins",
    "name": "Section 3: SQL Joins (Q18–Q25)",
    "description": "Joins are among the most important SQL interview topics. Understand how tables are connected using common columns.",
    "icon": "🔗",
    "problems": [
      {
        "id": "sql-q18",
        "title": "Q18. What are SQL Joins? Explain their types.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Joins Overview",
          "Relational"
        ],
        "answer": "Answer:\nJoins combine records from two or more tables based on a related column between them.\n\nTypes of SQL Joins:\nJoin Type       | Function / Result\n----------------+-------------------------------------------------------------\nINNER JOIN      | Returns only matching records present in both tables\nLEFT JOIN       | Returns all records from left table + matching right records\nRIGHT JOIN      | Returns all records from right table + matching left records\nFULL OUTER JOIN | Returns all records from both tables (matched or NULL)\nCROSS JOIN      | Returns the Cartesian product of all rows from both tables\nSELF JOIN       | Joins a table with itself using distinct aliases\n\nNote:\nMySQL does not natively support FULL OUTER JOIN syntax. In MySQL, you simulate FULL OUTER JOIN by combining a LEFT JOIN and a RIGHT JOIN using UNION."
      },
      {
        "id": "sql-q19",
        "title": "Q19. Find employee names along with their department names.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "INNER JOIN",
          "Relational"
        ],
        "answer": "SELECT e.name, d.dept_name\nFROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id;\n\nExplanation:\nINNER JOIN matches employee records with department records having the identical dept_id, omitting employees without departments and departments without employees."
      },
      {
        "id": "sql-q20",
        "title": "Q20. Find all employees, including those who do not belong to any department.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "LEFT JOIN",
          "Preserving Rows"
        ],
        "answer": "SELECT e.name, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id;\n\nExplanation:\nLEFT JOIN preserves every employee from the left table (Employees). If an employee has no matching department, dept_name will be returned as NULL."
      },
      {
        "id": "sql-q21",
        "title": "Q21. Find departments that have no employees.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "LEFT JOIN",
          "Anti-Join"
        ],
        "answer": "SELECT d.dept_id, d.dept_name\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.dept_id\nWHERE e.emp_id IS NULL;\n\nExplanation:\nBy LEFT JOINing Departments with Employees, departments without matching workers yield NULL in e.emp_id. Filtering WHERE e.emp_id IS NULL isolates empty departments (anti-join pattern)."
      },
      {
        "id": "sql-q22",
        "title": "Q22. What is a SELF JOIN? Find employees along with their manager names.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "SELF JOIN",
          "Hierarchies"
        ],
        "answer": "Answer:\nA SELF JOIN joins a table with itself. It is particularly useful for modeling hierarchical and recursive relationships, such as employee-manager structures.\n\nQuery:\nSELECT \n  e.name AS employee,\n  m.name AS manager\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id;\n\nExplanation:\nTwo aliases of the same Employees table are used: 'e' represents the employee, and 'm' represents their manager. A LEFT JOIN ensures top-level employees without managers (where manager_id IS NULL) are still displayed."
      },
      {
        "id": "sql-q23",
        "title": "Q23. Find employees who work in the IT department.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "JOIN",
          "Filtering"
        ],
        "answer": "SELECT e.name, d.dept_name\nFROM Employees e\nJOIN Departments d ON e.dept_id = d.dept_id\nWHERE d.dept_name = 'IT';\n\nExplanation:\nJoins the tables on dept_id and filters the resulting rows where dept_name equals 'IT'."
      },
      {
        "id": "sql-q24",
        "title": "Q24. What is the difference between INNER JOIN and LEFT JOIN?",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "INNER vs LEFT",
          "Comparison"
        ],
        "answer": "Answer:\n• INNER JOIN returns only records where the join condition matches in both tables.\n• LEFT JOIN returns all records from the left table, plus matched records from the right table (unmatched right columns return NULL).\n\nExample:\n-- Returns only matching employees and departments\nSELECT * FROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id;\n\n-- Returns all employees, even if dept_id does not exist in Departments\nSELECT * FROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id;"
      },
      {
        "id": "sql-q25",
        "title": "Q25. Find pairs of employees working in the same department.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "SELF JOIN",
          "Pairs"
        ],
        "answer": "SELECT \n  e1.name AS employee1,\n  e2.name AS employee2,\n  e1.dept_id\nFROM Employees e1\nJOIN Employees e2 \n  ON e1.dept_id = e2.dept_id \n AND e1.emp_id < e2.emp_id;\n\nExplanation:\nA SELF JOIN matches employees who share the same dept_id. Using e1.emp_id < e2.emp_id prevents pairing an employee with themselves and prevents symmetric duplicates (e.g. (Rahul, Priya) and (Priya, Rahul))."
      }
    ]
  },
  {
    "id": "sql-subqueries",
    "name": "Section 4: Subqueries and Nested Queries (Q26–Q32)",
    "description": "A subquery is a query written inside another SQL query. It is useful when the result of one query is required by another.",
    "icon": "🎯",
    "problems": [
      {
        "id": "sql-q26",
        "title": "Q26. Find the employee receiving the highest salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Subquery",
          "MAX"
        ],
        "answer": "SELECT * FROM Employees\nWHERE salary = (\n  SELECT MAX(salary) FROM Employees\n);\n\nExplanation:\nThe inner scalar subquery evaluates the maximum salary in the table. The outer query then returns all employees earning that exact salary."
      },
      {
        "id": "sql-q27",
        "title": "Q27. Find employees earning more than the average company salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Subquery",
          "AVG"
        ],
        "answer": "SELECT * FROM Employees\nWHERE salary > (\n  SELECT AVG(salary) FROM Employees\n);\n\nExplanation:\nThe subquery calculates the company-wide average salary, and the outer WHERE filters employees earning above that threshold."
      },
      {
        "id": "sql-q28",
        "title": "Q28. Find the second-highest salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Nth Highest",
          "Subquery"
        ],
        "answer": "SELECT MAX(salary) AS second_highest_salary\nFROM Employees\nWHERE salary < (\n  SELECT MAX(salary) FROM Employees\n);\n\nExplanation:\nFirst identifies the overall maximum salary, then finds the highest salary strictly less than that maximum.\n\nInterview Follow-up:\nThis returns the second-highest distinct salary value. If multiple employees share the top salary, they are all excluded, correctly identifying the next highest value."
      },
      {
        "id": "sql-q29",
        "title": "Q29. Find the third-highest distinct salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "LIMIT",
          "OFFSET"
        ],
        "answer": "SELECT DISTINCT salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 1 OFFSET 2;\n\nExplanation:\nORDER BY salary DESC orders salaries from highest to lowest. DISTINCT removes duplicates. OFFSET 2 skips the top two distinct values, and LIMIT 1 retrieves the third distinct salary."
      },
      {
        "id": "sql-q30",
        "title": "Q30. Find employees earning more than their department's average salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/correlated-subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Correlated Subquery"
        ],
        "answer": "SELECT e.*\nFROM Employees e\nWHERE e.salary > (\n  SELECT AVG(e2.salary)\n  FROM Employees e2\n  WHERE e2.dept_id = e.dept_id\n);\n\nExplanation:\nThis is a correlated subquery because the inner query references e.dept_id from the outer row. For each candidate employee, the inner query computes their specific department's average salary."
      },
      {
        "id": "sql-q31",
        "title": "Q31. Find employees who belong to departments present in the Departments table using IN.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/any-in-some-subqueries.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "IN Operator",
          "Subquery"
        ],
        "answer": "SELECT * FROM Employees\nWHERE dept_id IN (\n  SELECT dept_id FROM Departments\n);\n\nExplanation:\nThe IN operator tests membership in the result set produced by the subquery, returning only employees whose dept_id exists in Departments."
      },
      {
        "id": "sql-q32",
        "title": "Q32. What is the difference between IN and EXISTS?",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "IN vs EXISTS",
          "Performance"
        ],
        "answer": "Answer:\n• IN evaluates the subquery, builds an in-memory set of values, and checks whether the outer column matches any item in the list.\n• EXISTS evaluates the correlated subquery row-by-row and terminates immediately (short-circuits) upon finding the first matching row.\n\nUsing EXISTS:\nSELECT * FROM Employees e\nWHERE EXISTS (\n  SELECT 1 FROM Departments d \n  WHERE d.dept_id = e.dept_id\n);\n\nInterview Point:\nEXISTS is ideal for correlated presence checks and handles NULLs safely (never returns UNKNOWN). Modern SQL optimizers often rewrite IN to EXISTS or SEMI-JOINs internally, but EXISTS is widely favored when working with large indexed parent tables."
      }
    ]
  },
  {
    "id": "sql-advanced-interview",
    "name": "Section 5: Advanced SQL Interview Questions (Q33–Q42)",
    "description": "These questions cover window functions, ranking, CTEs and analytical SQL queries. These are especially useful for SDE-1 interviews.",
    "icon": "⚡",
    "problems": [
      {
        "id": "sql-q33",
        "title": "Q33. What are Window Functions in SQL?",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "Window Functions"
        ],
        "answer": "Answer:\nWindow functions perform calculations across a set of table rows that are related to the current row, without collapsing the individual rows into a single summary output like GROUP BY does.\n\nCommon Window Functions:\n• ROW_NUMBER(): Assigns a sequential integer to rows\n• RANK(): Assigns rank with gaps for ties\n• DENSE_RANK(): Assigns rank without gaps for ties\n• LAG(): Accesses data from a preceding row\n• LEAD(): Accesses data from a subsequent row\n• SUM() OVER(): Computes running/partitioned sums\n• AVG() OVER(): Computes moving/partitioned averages\n\nExample:\nSELECT \n  name, \n  salary, \n  AVG(salary) OVER() AS company_avg\nFROM Employees;\n\nExplanation:\nEach employee retains their individual row and salary, while the company-wide average salary is calculated across the entire window and displayed on every row."
      },
      {
        "id": "sql-q34",
        "title": "Q34. Find the second-highest salary using DENSE_RANK().",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "DENSE_RANK",
          "CTE"
        ],
        "answer": "WITH RankedEmployees AS (\n  SELECT \n    name, \n    salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM Employees\n)\nSELECT name, salary\nFROM RankedEmployees\nWHERE rnk = 2;\n\nExplanation:\nDENSE_RANK() orders distinct salaries from highest to lowest. Equal salaries share the same rank, and no rank values are skipped. Filtering rnk = 2 reliably yields the second-highest compensation."
      },
      {
        "id": "sql-q35",
        "title": "Q35. What is the difference between ROW_NUMBER(), RANK() and DENSE_RANK()?",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Ranking Functions",
          "Comparison"
        ],
        "answer": "Suppose salaries are 90000, 80000, 80000, and 70000:\n\nSalary | ROW_NUMBER() | RANK() | DENSE_RANK()\n-------+--------------+--------+-------------\n90000  | 1            | 1      | 1\n80000  | 2            | 2      | 2\n80000  | 3            | 2      | 2\n70000  | 4            | 4      | 3\n\nKey Rules to Remember:\n• ROW_NUMBER(): Always assigns a strictly unique sequential integer (1, 2, 3, 4).\n• RANK(): Assigns duplicate ranks to ties, then skips subsequent ranks (1, 2, 2, 4).\n• DENSE_RANK(): Assigns duplicate ranks to ties, but never skips subsequent ranks (1, 2, 2, 3)."
      },
      {
        "id": "sql-q36",
        "title": "Q36. Find the highest-paid employee in each department.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "PARTITION BY",
          "DENSE_RANK"
        ],
        "answer": "WITH RankedEmployees AS (\n  SELECT \n    name, \n    dept_id, \n    salary,\n    DENSE_RANK() OVER (\n      PARTITION BY dept_id \n      ORDER BY salary DESC\n    ) AS rnk\n  FROM Employees\n)\nSELECT name, dept_id, salary\nFROM RankedEmployees\nWHERE rnk = 1;\n\nExplanation:\n• PARTITION BY dept_id divides employees by department.\n• ORDER BY salary DESC ranks salaries within each partition.\n• DENSE_RANK assigns rank 1 to the highest earner(s). If multiple employees tie for the top salary, all are returned."
      },
      {
        "id": "sql-q37",
        "title": "Q37. Find the top 3 highest-paid employees in each department.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "Top N per Group"
        ],
        "answer": "WITH RankedEmployees AS (\n  SELECT \n    name, \n    dept_id, \n    salary,\n    DENSE_RANK() OVER (\n      PARTITION BY dept_id \n      ORDER BY salary DESC\n    ) AS rnk\n  FROM Employees\n)\nSELECT name, dept_id, salary, rnk\nFROM RankedEmployees\nWHERE rnk <= 3;\n\nExplanation:\nPARTITION BY independently evaluates ranks within each department. Filtering rnk <= 3 retrieves the top 3 salary tiers.\n\nInterview Note:\nDENSE_RANK can return more than 3 employee records per department if salaries are tied. If an interview requires strictly at most 3 rows per department, use ROW_NUMBER() instead."
      },
      {
        "id": "sql-q38",
        "title": "Q38. What is a CTE (Common Table Expression)?",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/with.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "CTE",
          "WITH Clause"
        ],
        "answer": "Answer:\nA Common Table Expression (CTE) is a temporary named result set defined within the scope of a single SQL statement using the WITH clause. It simplifies complex nested joins, supports recursion, and dramatically improves query readability and maintainability.\n\nSyntax Example:\nWITH HighSalary AS (\n  SELECT * FROM Employees WHERE salary > 50000\n)\nSELECT * FROM HighSalary;\n\nExplanation:\nThe CTE is evaluated and aliased first, making it reusable within the main SELECT, INSERT, UPDATE, or DELETE statement that follows."
      },
      {
        "id": "sql-q39",
        "title": "Q39. Find the employees whose salary is higher than the previous employee in employee ID order.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_lag"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "LAG()",
          "Window Functions"
        ],
        "answer": "WITH SalaryComparison AS (\n  SELECT \n    emp_id, \n    name, \n    salary,\n    LAG(salary) OVER (ORDER BY emp_id) AS previous_salary\n  FROM Employees\n)\nSELECT emp_id, name, salary, previous_salary\nFROM SalaryComparison\nWHERE salary > previous_salary;\n\nExplanation:\nThe LAG() window function accesses the salary from the immediately preceding row according to the ORDER BY emp_id sequence without requiring a cumbersome SELF JOIN."
      },
      {
        "id": "sql-q40",
        "title": "Q40. Calculate the running total of employee salaries.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "🚀 Advanced",
          "Running Total",
          "SUM OVER"
        ],
        "answer": "SELECT \n  emp_id, \n  name, \n  salary,\n  SUM(salary) OVER (\n    ORDER BY emp_id \n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM Employees;\n\nExplanation:\nThe cumulative sum aggregates the current employee's salary with all previous salaries ordered by emp_id."
      },
      {
        "id": "sql-q41",
        "title": "Q41. Find the difference between each employee's salary and the company's average salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "AVG OVER",
          "Analytics"
        ],
        "answer": "SELECT \n  name, \n  salary,\n  salary - AVG(salary) OVER() AS difference\nFROM Employees;\n\nExplanation:\nAVG(salary) OVER() calculates the overall company average across all records without collapsing rows, allowing row-level arithmetic directly in the SELECT list."
      },
      {
        "id": "sql-q42",
        "title": "Q42. What is the difference between a CTE, a subquery and a temporary table?",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/with.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "Architecture",
          "CTE vs Temp Table"
        ],
        "answer": "Feature         | CTE (WITH clause)       | Subquery (Nested SELECT) | Temporary Table\n----------------+-------------------------+--------------------------+------------------------------\nDefinition      | WITH cte_name AS (...)  | Inside (SELECT ...)      | CREATE TEMPORARY TABLE ...\nScope           | Single SQL statement    | Clause / statement part  | Entire database session\nReusability     | Across statement        | Nested query only        | Multiple queries in session\nReadability     | High (top-down)         | Low (deeply nested)      | Modular across scripts\nStorage         | Optimizer-managed (RAM) | Optimizer-managed (RAM)  | Stored on temp disk/RAM\n\nTemporary Table Example:\nCREATE TEMPORARY TABLE HighSalary AS\nSELECT * FROM Employees WHERE salary > 50000;"
      }
    ]
  },
  {
    "id": "sql-advanced-problems",
    "name": "Section 6: Advanced SQL Problem-Solving (Q43–Q50)",
    "description": "Practical interview-style problems that test your ability to combine multiple SQL concepts.",
    "icon": "🏆",
    "problems": [
      {
        "id": "sql-q43",
        "title": "Q43. Find duplicate records based on employee name.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "HAVING",
          "Duplicates"
        ],
        "answer": "SELECT name, COUNT(*) AS total\nFROM Employees\nGROUP BY name\nHAVING COUNT(*) > 1;\n\nExplanation:\nGROUP BY groups employees sharing the exact same name, and HAVING filters only those groups with a row count exceeding 1."
      },
      {
        "id": "sql-q44",
        "title": "Q44. Delete duplicate records while keeping one record.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/delete.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "🚀 Advanced",
          "Deduplication",
          "DELETE CTE"
        ],
        "answer": "Assume duplicate employees are identified by the same name and salary, and the lowest emp_id should be retained:\n\nWITH DuplicateRecords AS (\n  SELECT \n    emp_id,\n    ROW_NUMBER() OVER (\n      PARTITION BY name, salary \n      ORDER BY emp_id ASC\n    ) AS rn\n  FROM Employees\n)\nDELETE FROM Employees\nWHERE emp_id IN (\n  SELECT emp_id FROM DuplicateRecords WHERE rn > 1\n);\n\nExplanation:\n• PARTITION BY groups duplicates by name and salary.\n• ROW_NUMBER() assigns sequential numbers starting at 1 for the lowest emp_id.\n• Rows with rn > 1 represent duplicates and are deleted, preserving the lowest ID.\n\nImportant:\nAlways run the equivalent SELECT first and ensure you have a database snapshot before running destructive DELETE scripts in production."
      },
      {
        "id": "sql-q45",
        "title": "Q45. Find employees who have the same salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/subqueries.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "GROUP BY",
          "HAVING"
        ],
        "answer": "SELECT * FROM Employees\nWHERE salary IN (\n  SELECT salary\n  FROM Employees\n  GROUP BY salary\n  HAVING COUNT(*) > 1\n);\n\nExplanation:\nThe inner query finds all salary figures earned by more than one person. The outer query returns every employee who earns one of those shared salaries."
      },
      {
        "id": "sql-q46",
        "title": "Q46. Find the department with the highest average salary.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/select.html"
          }
        ],
        "tags": [
          "🔥 Frequently Asked",
          "Aggregates",
          "LIMIT"
        ],
        "answer": "SELECT dept_id, AVG(salary) AS avg_salary\nFROM Employees\nGROUP BY dept_id\nORDER BY avg_salary DESC\nLIMIT 1;\n\nExplanation:\nCalculates the average salary for each department, sorts them in descending order (highest first), and uses LIMIT 1 to return the top department."
      },
      {
        "id": "sql-q47",
        "title": "Q47. Find employees who earn the same salary as at least one other employee.",
        "difficulty": "Medium",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "SELF JOIN",
          "Non-Equi Join"
        ],
        "answer": "SELECT DISTINCT e1.name, e1.salary\nFROM Employees e1\nJOIN Employees e2 \n  ON e1.salary = e2.salary \n AND e1.emp_id <> e2.emp_id;\n\nExplanation:\nA SELF JOIN matches employees on identical salaries while ensuring e1.emp_id <> e2.emp_id to exclude self-matches. DISTINCT ensures each employee name is reported only once if multiple peers share their salary."
      },
      {
        "id": "sql-q48",
        "title": "Q48. Find the percentage contribution of each department to the total company salary.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Percentages",
          "Analytics"
        ],
        "answer": "SELECT \n  dept_id,\n  SUM(salary) AS dept_salary,\n  ROUND(\n    SUM(salary) * 100.0 / (SELECT SUM(salary) FROM Employees), \n    2\n  ) AS percentage\nFROM Employees\nGROUP BY dept_id;\n\nExplanation:\nComputes the department's aggregate salary, divides it by the scalar total company payroll subquery, and rounds the percentage to 2 decimal places."
      },
      {
        "id": "sql-q49",
        "title": "Q49. Find employees who do not have a manager.",
        "difficulty": "Easy",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html"
          }
        ],
        "tags": [
          "⭐ Important",
          "NULL Check",
          "Hierarchies"
        ],
        "answer": "SELECT * FROM Employees WHERE manager_id IS NULL;\n\nExplanation:\nThe IS NULL operator checks for records where the manager_id field is NULL (representing top-level executives or unassigned personnel)."
      },
      {
        "id": "sql-q50",
        "title": "Q50. Find the median salary of employees.",
        "difficulty": "Hard",
        "links": [
          {
            "platform": "Other",
            "url": "https://dev.mysql.com/doc/refman/8.0/en/window-functions.html"
          }
        ],
        "tags": [
          "🚀 Advanced",
          "Median",
          "Statistical Functions"
        ],
        "answer": "WITH RankedSalaries AS (\n  SELECT \n    salary,\n    ROW_NUMBER() OVER (ORDER BY salary ASC) AS rn,\n    COUNT(*) OVER() AS total\n  FROM Employees\n)\nSELECT AVG(salary) AS median_salary\nFROM RankedSalaries\nWHERE rn IN (\n  FLOOR((total + 1) / 2),\n  FLOOR((total + 2) / 2)\n);\n\nExplanation:\n• Sorts all salaries in ascending order and assigns a sequential row number (rn).\n• Computes the overall count (total) using COUNT(*) OVER().\n• For odd numbers of records (e.g. 5): FLOOR(6/2)=3 and FLOOR(7/2)=3, selecting the middle row.\n• For even numbers of records (e.g. 6): FLOOR(7/2)=3 and FLOOR(8/2)=4, averaging the two central values.\nThis MySQL 8.0 query accurately calculates the mathematical median for both even and odd dataset lengths."
      }
    ]
  }
];
