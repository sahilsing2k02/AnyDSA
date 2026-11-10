import type { Problem } from '../types';

export const dbmsQuestions: Problem[] = [
  {
    id: "dbms-1",
    title: "Q1. Difference Between DBMS and Traditional File System",
    difficulty: "Easy",
    tags: [
      "🔥 Frequently Asked",
      "DBMS Fundamentals",
      "File System"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/differences-between-file-system-and-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
A traditional file system stores data in separate files on disk, leaving application programs entirely responsible for reading, writing, parsing, and maintaining data relationships.

A DBMS (Database Management System) provides a structured software layer to store, retrieve, update, and manage relational data. It handles security, concurrent multi-user transactions, referential integrity, and crash recovery out of the box.

The primary issues with file systems are excessive data redundancy, data inconsistency across duplicate files, lack of atomicity during crashes, and difficulty enforcing relationship constraints.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
A college stores student details in separate files for Fees, Attendance, and Examinations:
• File System: Student name, address, and phone number are duplicated in all 3 files. If the student changes their phone number in the Fees file, Attendance and Exams remain stale (data inconsistency).
• DBMS: A single centralized "Student" table stores core profile info, referenced by foreign keys from Fees, Attendance, and Exam tables. Update once -> reflected everywhere.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Feature          │ File System             │ DBMS                    │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Redundancy       │ High (duplicate files)  │ Controlled & minimized  │
│ Security         │ OS-level file permits   │ Fine-grained RBAC/DAC   │
│ Data Consistency │ Difficult to enforce    │ ACID constraints        │
│ Concurrent Access│ Concurrency conflicts   │ Multi-user locking/MVCC │
│ Backup & Recovery│ Manual tape/disk copy   │ Automated WAL & logs    │
│ Relationships    │ Application-managed     │ Primary & Foreign Keys  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
File System = Files on Disk.
DBMS = Files + Intelligence (Security + Consistency + Concurrency + Crash Recovery).

❓ INTERVIEW FOLLOW-UP:
Q: Why is DBMS preferred over a file system despite higher computational overhead?
A: Because it prevents data corruption, guarantees ACID transactional atomicity, supports thousands of simultaneous users via concurrency control, and provides point-in-time crash recovery.`
  },
  {
    id: "dbms-2",
    title: "Q2. What is Data Independence?",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Data Independence",
      "Architecture"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/data-independence-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Data Independence is the ability to modify schema definitions at one level of the database architecture without altering the schema at the next higher level or breaking existing application programs.

In the ANSI-SPARC 3-tier architecture (Physical -> Conceptual/Logical -> External/View):

1. Physical Data Independence:
The capacity to alter the physical storage structure, disk partitioning, compression, or indexing methods without altering the logical (conceptual) schema.
• Example: Adding a B+ Tree index on the "salary" column, partitioning a table across multiple NVMe drives, or changing internal block page sizes.
• Impact: Application SQL queries remain completely unchanged; they simply execute faster.

2. Logical Data Independence:
The capacity to alter the conceptual/logical schema (table structures, attribute additions, table decompositions) without requiring rewriting of external views or user-facing application programs.
• Example: Adding a new "middle_name" column to the Student table, or decomposing Employee into Employee_Personal and Employee_Job while maintaining a unified VIEW for legacy callers.
• Impact: Preserves external views through database view definitions.

─────────────────────────────────────────────────────────────
📊 PHYSICAL VS LOGICAL INDEPENDENCE:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Physical Independence   │ Logical Independence    │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Layer Touched    │ Internal / Storage level│ Conceptual / Schema lvl │
│ Frequency        │ High (tuning & indexing)│ Low (business refactors)│
│ Difficulty       │ Relatively easy         │ Very hard to achieve    │
│ App Impact       │ Zero query changes      │ Requires VIEW wrappers  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
• Physical = HOW data is stored on disk (Storage changes).
• Logical = WHAT data is stored and its relationships (Structure changes).

❓ INTERVIEW FOLLOW-UP:
Q: Which one is harder to achieve in production systems and why?
A: Logical data independence is significantly harder because changing data structures, normalization boundaries, or column semantics directly impacts the contracts and schemas consumed by application code and client APIs.`
  },
  {
    id: "dbms-3",
    title: "Q3. Schema vs Database Instance",
    difficulty: "Easy",
    tags: [
      "🔥 Frequently Asked",
      "Schema",
      "Instance"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-schema-and-instance-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
• Database Schema: The formal structural design, blueprint, and skeleton of the database, specifying tables, columns, data types, primary/foreign keys, and constraints. It changes very rarely (e.g. during planned software migrations).
• Database Instance: The actual collection of data, records, and tuples stored in the database at a specific snapshot in time. It changes constantly as records are inserted, updated, and deleted.

─────────────────────────────────────────────────────────────
📋 CONCRETE EXAMPLE:
-- 1. Schema Definition (Blueprint):
CREATE TABLE Student (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);

-- 2. Database Instance at 10:00 AM:
┌─────┬───────────┬─────┐
│ id  │ name      │ age │
├─────┼───────────┼─────┤
│ 1   │ Rahul     │ 21  │
│ 2   │ Aman      │ 22  │
└─────┴───────────┴─────┘

-- 3. Database Instance at 10:05 AM (after INSERT and DELETE):
┌─────┬───────────┬─────┐
│ id  │ name      │ age │
├─────┼───────────┼─────┤
│ 1   │ Rahul     │ 21  │
│ 3   │ Priya     │ 23  │
└─────┴───────────┴─────┘
(The Schema remained identical; the Instance transitioned to a new state).

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
• Schema = Architectural Blueprint of a house (static, defined upfront).
• Instance = The furniture, occupants, and items inside the house at this exact second (dynamic, fluctuating).

❓ INTERVIEW FOLLOW-UP:
Q: Can two different production databases share the exact same schema but have completely different instances?
A: Yes! A multi-tenant SaaS architecture or a development vs production environment runs the exact same schema migrations, yet holds completely distinct instances of tenant data.`
  },
  {
    id: "dbms-4",
    title: "Q4. Primary Key vs Candidate Key",
    difficulty: "Easy",
    tags: [
      "🔥 Frequently Asked",
      "Primary Key",
      "Candidate Key"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-primary-key-and-candidate-key/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
• Candidate Key: A minimal set of attributes (columns) that can uniquely identify every single tuple in a relational table, without any redundant attributes. A table can possess multiple candidate keys.
• Primary Key: The specific candidate key selected by the database architect as the official identifier for tuples in the table. A table can have EXACTLY ONE primary key.
• Alternate Key: Any candidate key that was NOT chosen as the primary key.

─────────────────────────────────────────────────────────────
📋 RELATIONAL EXAMPLE:
Consider a Student table with columns:
Student(student_id, roll_no, email, name, phone)

Assuming student_id, roll_no, and email are all unique and NOT NULL:
• Candidate Keys: {student_id}, {roll_no}, {email}
• Chosen Primary Key: student_id
• Alternate Keys: roll_no, email (enforced using UNIQUE NOT NULL constraints)

─────────────────────────────────────────────────────────────
📊 COMPARISON TABLE:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Property         │ Candidate Key           │ Primary Key             │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Purpose          │ Uniquely identifies row │ Official row identifier │
│ Count per table  │ One or more (multiple)  │ Exactly ONE             │
│ Selection        │ All valid candidates    │ Architect-chosen        │
│ NULL values      │ Engine-dependent        │ Absolutely NEVER NULL   │
│ Foreign key ref  │ Can be referenced       │ Standard target for FK  │
│ Physical order   │ Secondary index         │ Often Clustered Index   │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Candidate Key = Job applicants who meet all qualifications.
Primary Key = The selected candidate hired for the position.

❓ INTERVIEW FOLLOW-UP:
Q: Can a Primary Key ever contain NULL values in standard SQL?
A: No! Entity Integrity rule dictates that no primary key value can be NULL because NULL represents an unknown, violating uniqueness and row addressability.`
  },
  {
    id: "dbms-5",
    title: "Q5. What is Referential Integrity?",
    difficulty: "Medium",
    tags: [
      "🔥 Frequently Asked",
      "Referential Integrity",
      "Foreign Key"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/referential-integrity-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Referential Integrity is a relational database constraint ensuring that relationships between tables remain consistently valid. 

It dictates that a Foreign Key value in a child table MUST reference a valid, existing Primary/Candidate Key in the parent table, or be explicitly NULL (if allowed). It strictly prevents orphan records in child tables.

─────────────────────────────────────────────────────────────
💻 SQL SCHEMA IMPLEMENTATION:
CREATE TABLE Department (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Employee (
  emp_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

• If Department has IDs [101, 102], inserting an Employee with dept_id = 999 will throw a Foreign Key Constraint Violation error.

─────────────────────────────────────────────────────────────
⚡ FOREIGN KEY ON DELETE / ON UPDATE ACTIONS:
1. CASCADE: Automatically deletes/updates corresponding rows in the child table when parent is deleted/updated.
2. RESTRICT / NO ACTION: Rejects the delete/update of the parent row if any child row references it (Default).
3. SET NULL: Sets the child foreign key column to NULL when the parent record is deleted.
4. SET DEFAULT: Resets child foreign key to a pre-configured column default.

💡 MEMORY TRICK:
Referential Integrity = Zero Orphan Records. A child can never point to a non-existent parent.

❓ INTERVIEW FOLLOW-UP:
Q: What is the fundamental difference between a Primary Key and a Foreign Key?
A: A Primary Key identifies uniqueness within its OWN table; a Foreign Key builds an active referential bridge to another table.`
  },
  {
    id: "dbms-6",
    title: "Q6. Modeling Students, Courses and Enrollments",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Data Modeling",
      "Many-to-Many"
    ],
    imageUrl: "/images/dbms/er-student-course.svg",
    imageCaption: "Associative entity Enrollment converts N:M relationship into two 1:N relations",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/how-to-model-many-to-many-relationships-in-database-design/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Students and Courses have a classic Many-to-Many (N:M) relationship:
• One student can register for multiple courses.
• One course can be attended by multiple students.

Relational databases cannot directly implement many-to-many relationships using a single foreign key without causing massive repeating groups or NULL column explosion. Therefore, we introduce an Associative Entity (Bridge / Junction Table) called "Enrollment".

─────────────────────────────────────────────────────────────
💻 DDL IMPLEMENTATION:
CREATE TABLE Student (
  student_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE Course (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL
);

CREATE TABLE Enrollment (
  student_id INT,
  course_id INT,
  enrollment_date DATE NOT NULL,
  grade VARCHAR(5),
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Student <-> Course = Many-to-Many = Bridge Table (Enrollment) with Composite Key.

❓ INTERVIEW FOLLOW-UP:
Q: What if a student is allowed to retake the exact same course across multiple semesters?
A: The composite key (student_id, course_id) would reject the second enrollment! You must either expand the composite key to (student_id, course_id, semester) or create a surrogate primary key "enrollment_id INT AUTO_INCREMENT".`
  },
  {
    id: "dbms-7",
    title: "Q7. Why Use an Associative Entity for Many-to-Many Relationships?",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Associative Entity",
      "Junction Table"
    ],
    imageUrl: "/images/dbms/er-student-course.svg",
    imageCaption: "Junction table captures relationship attributes and enforces referential integrity",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/junction-table-in-sql-explained/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
An associative entity (also known as a junction table, bridge table, or cross-reference table) solves two fundamental architectural needs:

1. Decomposes an N:M Relationship:
It converts a Many-to-Many relationship into two clean One-to-Many (1:N) relationships:
• Student (1) ───< Enrollment (N)
• Course (1) ───< Enrollment (N)

2. Stores Relationship-Specific Metadata:
Often, attributes do not belong strictly to Entity A or Entity B, but describe the active interaction between them:
• In Student-Course: "grade", "attendance_pct", "enrollment_date", and "term" belong to the Enrollment event, not to the student or course individually.
• In Order-Product: "quantity_ordered", "unit_price_at_purchase", and "discount" belong to OrderItem.

─────────────────────────────────────────────────────────────
🚫 WHY NOT DIRECTLY STORE AN ARRAY OR COMMA-SEPARATED IDS?
If Student had a column "enrolled_courses = '101,102,103'":
1. Violates 1NF (values must be atomic).
2. Cannot enforce referential integrity (foreign keys cannot target elements inside a CSV string).
3. Search queries become inefficient string matching (LIKE '%102%') causing full table scans.
4. Concurrency conflicts when two teachers grade different courses for the same student.

💡 MEMORY TRICK:
"If the relationship itself has data, give it its own table."`
  },
  {
    id: "dbms-8",
    title: "Q8. Insertion, Update and Deletion Anomalies",
    difficulty: "Medium",
    tags: [
      "🔥 Frequently Asked",
      "Anomalies",
      "Schema Design"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/anomalies-in-relational-model/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Anomalies are severe data corruption and structural bugs that arise when relational tables are poorly designed with unnormalized redundant data.

There are three classic anomalies:

1. Insertion Anomaly:
Occurs when you cannot insert data for one entity without simultaneously providing dummy or unrelated data for another entity.
• Example: In a combined Student_Course table, if university policy requires student_id as primary key, the administration cannot create a newly approved course until at least one student registers for it!

2. Update (Modification) Anomaly:
Occurs when identical data is duplicated across multiple rows, requiring updates to touch every single row. If any row is missed, the database falls into an inconsistent state.
• Example: If Professor "Dr. Sharma" changes department, and that name is stored in 500 enrollment rows, updating 499 rows leaves 1 row stale. Queries now give conflicting answers.

3. Deletion Anomaly:
Occurs when deleting data about one entity inadvertently destroys unrelated, crucial data about another entity.
• Example: If the sole student enrolled in "Quantum Computing" drops out and their record is deleted, all information about the course existence and syllabus is permanently erased!

─────────────────────────────────────────────────────────────
📊 THE ANOMALY MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Anomaly          │ Core Failure            │ Real-World Danger       │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Insertion        │ Cannot add isolated row │ Blocked onboarding      │
│ Update           │ Redundant copies desync │ Data inconsistency      │
│ Deletion         │ Deleting A erases B     │ Accidental data loss    │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
I-U-D:
• Insert = Cannot add without dummy info.
• Update = Multiple copies become desynchronized.
• Delete = Accidentally erases unintended data.

❓ INTERVIEW FOLLOW-UP:
Q: What is the formal mathematical cure for all three anomalies?
A: Database Normalization (decomposing the table into higher normal forms like 3NF/BCNF based on functional dependencies).`
  },
  {
    id: "dbms-9",
    title: "Q9. When is Normalization Required? (1NF, 2NF, 3NF, BCNF)",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "Normalization",
      "1NF-2NF-3NF",
      "BCNF"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Normalization is the systematic process of organizing relational schema to eliminate data redundancy and prevent insertion, update, and deletion anomalies while preserving functional dependencies and lossless joins.

It is required whenever:
• The same non-key attributes repeat across multiple records.
• Modifying a single real-world fact requires multi-row UPDATE operations.
• Nullable columns proliferate to accommodate optional entity relationships.

─────────────────────────────────────────────────────────────
🏆 SUMMARY OF NORMAL FORMS:
• 1NF: Atomic column values (no multi-value arrays/lists).
• 2NF: 1NF + No Partial Dependency (all non-prime attributes must fully depend on the entire candidate key, not a subset).
• 3NF: 2NF + No Transitive Dependency (non-prime attributes must not depend on other non-prime attributes: X -> Y -> Z).
• BCNF: For every non-trivial functional dependency X -> Y, X MUST be a Superkey.

─────────────────────────────────────────────────────────────
📋 PROGRESSIVE DECOMPOSITION EXAMPLE:
Unnormalized: Student(id, name, enrolled_courses) -> "CS101, CS102" (Violates 1NF)

• 1NF: Split into atomic rows:
  (1, 'Aman', 'CS101'), (1, 'Aman', 'CS102')
  Key is composite: (id, course).
  Problem: "name" depends only on "id", not "course" (Partial Dependency -> Violates 2NF).

• 2NF: Decompose into two tables:
  Student(id, name) and StudentCourse(id, course)
  Now all non-keys depend on whole key.
  Suppose we add dept_id, dept_head:
  id -> dept_id -> dept_head (Transitive Dependency -> Violates 3NF).

• 3NF: Split again:
  Student(id, name, dept_id) and Department(dept_id, dept_head).

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
"Every non-key attribute must provide a fact about:
 The Key (1NF),
 The Whole Key (2NF),
 And Nothing But The Key (3NF),
 So help me Codd (BCNF)!"`
  },
  {
    id: "dbms-10",
    title: "Q10. Third Normal Form (3NF) vs BCNF",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "3NF",
      "BCNF",
      "Dependencies"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-3nf-and-bcnf-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Both 3NF and BCNF (Boyce-Codd Normal Form) target the elimination of redundancy stemming from functional dependencies. However, BCNF is strictly stronger than 3NF.

Given a relation R and a non-trivial functional dependency X -> Y:
• 3NF Condition: At least ONE of the following must be true:
  1. X is a Superkey, OR
  2. Y is a Prime Attribute (member of any candidate key).

• BCNF Condition:
  1. X MUST be a Superkey (no exceptions allowed for prime attributes!).

─────────────────────────────────────────────────────────────
📋 THE CLASSIC COUNTER-EXAMPLE (3NF but NOT BCNF):
Relation: R(Student, Course, Instructor)
Business Rules:
1. (Student, Course) -> Instructor
2. Instructor -> Course
Candidate Keys: (Student, Course) and (Student, Instructor)
Prime attributes = {Student, Course, Instructor}

Check 3NF:
• Instructor -> Course: Instructor is not Superkey, BUT "Course" is a Prime Attribute -> Valid 3NF!

Check BCNF:
• Instructor -> Course: Instructor is NOT a Superkey -> VIOLATES BCNF!

─────────────────────────────────────────────────────────────
📊 COMPARISON:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Feature          │ 3NF                     │ BCNF                    │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Strictness       │ Relaxed (allows prime)  │ Very strict             │
│ Redundancy Level │ May retain minor dups   │ Completely eliminated   │
│ Dependency Pres. │ Always guaranteed       │ Sometimes impossible    │
│ Lossless Join    │ Always guaranteed       │ Always guaranteed       │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
BCNF is 3NF with the Prime Attribute loophole closed.

❓ INTERVIEW FOLLOW-UP:
Q: Is every BCNF relation automatically in 3NF?
A: Yes! BCNF is a strict subset of 3NF. However, decomposing into BCNF may sometimes sacrifice functional dependency preservation, which is why 3NF is often preferred in production.`
  },
  {
    id: "dbms-11",
    title: "Q11. When is Denormalization Better Than Normalization?",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Denormalization",
      "Trade-offs",
      "Performance"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/denormalization-in-databases/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Denormalization is the intentional introduction of controlled redundancy into a normalized relational schema to drastically accelerate read performance and reduce high-cost multi-table JOINs.

While normalization optimizes for write integrity and storage efficiency, real-world systems often have a 99:1 Read-to-Write ratio (OLAP, dashboards, e-commerce product catalogs). In such workloads, joining 6-8 tables per request causes severe latency bottlenecks.

─────────────────────────────────────────────────────────────
📋 PRACTICAL EXAMPLE:
E-commerce Orders Screen:
• Fully Normalized (3NF): Must JOIN Orders, Customers, ShippingAddress, OrderItems, Products, and Discounts on every page load.
• Denormalized: Duplicate customer_name, product_title, and delivery_city directly onto the OrderSummary table.
Result: 1 simple index scan instead of 6 table joins.

─────────────────────────────────────────────────────────────
⚖️ TRADE-OFF ANALYSIS:
• Advantages: Faster SELECT reads, fewer expensive joins, simpler client queries.
• Disadvantages: Slower INSERT/UPDATE/DELETE (write amplification), risk of data inconsistency, higher storage consumption.

🎯 WHEN TO DENORMALIZE:
1. High-traffic read-heavy consumer feeds (e.g. user follower counts, post like counts).
2. Data Warehouses, OLAP, and Star Schema architectures.
3. Pre-aggregating expensive metrics (e.g. total_spent on Customer table).

💡 MEMORY TRICK:
Normalize for Write Safety; Denormalize for Read Speed.`
  },
  {
    id: "dbms-12",
    title: "Q12. ACID Properties in DBMS",
    difficulty: "Easy",
    tags: [
      "🔥 Frequently Asked",
      "ACID",
      "Transactions",
      "Core"
    ],
    imageUrl: "/images/dbms/acid-properties.svg",
    imageCaption: "The 4 fundamental guarantees of database transactional reliability",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
ACID is an acronym representing the four foundational guarantees that a relational database management system enforces to ensure transaction reliability:

1. Atomicity (All or Nothing):
Every transaction is treated as a single, indivisible unit of work. Either all operations commit successfully to disk, or in the event of any failure, all modifications are completely rolled back.
• Banking Example: Transferring ₹1,000 from Account A to Account B. Account A is debited; if power fails before Account B is credited, the debit on A must be reverted.

2. Consistency (Valid State Invariants):
A transaction can only transition the database from one valid state to another valid state, maintaining all schema constraints, foreign keys, unique rules, and business check conditions.
• Example: Account balance cannot fall below ₹0 if CHECK(balance >= 0) is declared.

3. Isolation (Concurrency Barrier):
Concurrent transactions execute independently without interfering with each other. Intermediate, uncommitted state from one transaction remains invisible to concurrent transactions based on isolation levels.

4. Durability (Crash-Proof Persistence):
Once a transaction is committed, its modifications survive crashes, power outages, and OS restarts permanently.
• Implementation: Enforced via Write-Ahead Logging (WAL) and non-volatile disk flushing.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
A - All or nothing
C - Consistency preserved
I - Isolated execution
D - Durable on disk`
  },
  {
    id: "dbms-13",
    title: "Q13. Concurrency Problem – Lost Update",
    difficulty: "Medium",
    tags: [
      "🔥 Frequently Asked",
      "Concurrency",
      "Lost Update",
      "Race Condition"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/lost-update-problem-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
A Lost Update is a classic race condition concurrency anomaly where two concurrent transactions read the same data item, compute a new value based on that read, and write back. The transaction that commits second inadvertently overwrites the update made by the first, silently wiping it out.

─────────────────────────────────────────────────────────────
📋 THE LOST UPDATE SCENARIO:
Initial Balance for Account 1 = ₹1,000.
Transaction T1 deposits ₹200. Transaction T2 withdraws ₹100.

Timeline:
• t1: T1 reads Balance (1000)
• t2: T2 reads Balance (1000)
• t3: T1 computes 1200
• t4: T2 computes 900
• t5: T1 writes 1200 & commits
• t6: T2 writes 900 & commits (OVERWRITES T1's deposit!)
Result: Final balance is ₹900. T1's deposit of ₹200 was completely lost! (Correct: ₹1100).

─────────────────────────────────────────────────────────────
🛡️ HOW TO PREVENT LOST UPDATES:
1. Pessimistic Row Locking (SELECT ... FOR UPDATE):
   SELECT balance FROM Accounts WHERE account_id = 1 FOR UPDATE;
2. Atomic In-Place SQL Updates:
   UPDATE Accounts SET balance = balance + 200 WHERE account_id = 1;
3. Optimistic Concurrency Control (Version / Timestamp Checking):
   UPDATE Accounts SET balance = 1200, version = version + 1 
   WHERE account_id = 1 AND version = 5;

💡 MEMORY TRICK:
Lost Update = "Last Writer Wins, First Writer Cries."`
  },
  {
    id: "dbms-14",
    title: "Q14. Serial Schedule vs Serializable Schedule",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Serializability",
      "Schedules",
      "Concurrency"
    ],
    imageUrl: "/images/dbms/serial-vs-serializable.svg",
    imageCaption: "Serializable schedule interleaving yields the same result as a serial schedule",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/serializability-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
• Serial Schedule: A schedule where transactions execute strictly one after another in complete isolation without any interleaving of operations. 
  - If T1 runs, T2 cannot start any read or write until T1 completely commits.
  - Advantage: 100% consistent, zero concurrency anomalies.
  - Disadvantage: Extremely poor throughput and high latency; system waits idle during disk I/O.

• Serializable Schedule: A concurrent schedule where operations from multiple transactions are interleaved, but whose final outcome and database state is mathematically equivalent to some serial execution of those transactions.
  - Advantage: Maximum CPU and disk concurrency with guaranteed consistency.

─────────────────────────────────────────────────────────────
🔍 CONFLICT SERIALIZABILITY & PRECEDENCE GRAPH:
Two operations conflict if they belong to different transactions, access the SAME data item, and at least ONE operation is a WRITE.

Testing for Conflict Serializability:
1. Create a Directed Graph where Nodes = Transactions.
2. Draw edge Ti -> Tj if an operation of Ti precedes and conflicts with an operation of Tj.
3. If the graph contains NO CYCLES -> The schedule is Conflict Serializable!

💡 MEMORY TRICK:
Serial = Standing in single-file line.
Serializable = Interleaved dance, but arriving at the exact same destination.`
  },
  {
    id: "dbms-15",
    title: "Q15. Dirty Read and Isolation Levels",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "Dirty Read",
      "Isolation Levels",
      "ANSI SQL"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
A Dirty Read occurs when Transaction T1 modifies a row without committing, and Transaction T2 reads this uncommitted modified value. If T1 subsequently aborts and performs a ROLLBACK, T2 has processed a "ghost" value that never officially existed in the database.

─────────────────────────────────────────────────────────────
📋 THE DIRTY READ SCENARIO:
Account balance = ₹1,000.
1. T1 deducts ₹500 (balance = ₹500 in buffer cache, uncommitted).
2. T2 reads balance as ₹500 and approves a loan.
3. T1 crashes or encounters an error and issues ROLLBACK.
4. Real balance reverts to ₹1,000.
T2 made business decisions on fictitious, rolled-back data!

─────────────────────────────────────────────────────────────
📊 ANSI SQL ISOLATION LEVELS & PHENOMENA:
┌──────────────────┬────────────┬────────────────────┬──────────────┐
│ Isolation Level  │ Dirty Read │ Non-Repeatable Rd  │ Phantom Read │
├──────────────────┼────────────┼────────────────────┼──────────────┤
│ Read Uncommitted │ Possible   │ Possible           │ Possible     │
│ Read Committed   │ PREVENTED  │ Possible           │ Possible     │
│ Repeatable Read  │ PREVENTED  │ PREVENTED          │ Possible*    │
│ Serializable     │ PREVENTED  │ PREVENTED          │ PREVENTED    │
└──────────────────┴────────────┴────────────────────┴──────────────┘
(*Note: In MySQL InnoDB, Repeatable Read prevents phantom reads in ordinary SELECTs via MVCC Consistent Read snapshots).

💡 MEMORY TRICK:
Ascending order of protection:
Read Uncommitted -> Read Committed -> Repeatable Read -> Serializable.

❓ INTERVIEW FOLLOW-UP:
Q: What is the industry default isolation level for PostgreSQL and MySQL?
A: PostgreSQL defaults to Read Committed. MySQL InnoDB defaults to Repeatable Read.`
  },
  {
    id: "dbms-16",
    title: "Q16. Non-Repeatable Read vs Phantom Read",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Non-Repeatable Read",
      "Phantom Read",
      "Isolation"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-dirty-read-non-repeatable-read-and-phantom-read-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
A Non-Repeatable Read occurs when a transaction reads the exact same row twice during its execution, but discovers that the row's values have changed because another concurrent transaction modified and committed the row in the meantime.

─────────────────────────────────────────────────────────────
📋 NON-REPEATABLE READ SCENARIO:
1. T1: SELECT salary FROM Employee WHERE emp_id = 101;  --> Returns ₹50,000.
2. T2: UPDATE Employee SET salary = ₹75,000 WHERE emp_id = 101; COMMIT;
3. T1: SELECT salary FROM Employee WHERE emp_id = 101;  --> Returns ₹75,000!
Within the single transaction T1, re-reading row 101 gave two different values.

─────────────────────────────────────────────────────────────
📊 NON-REPEATABLE READ VS PHANTOM READ:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Non-Repeatable Read     │ Phantom Read            │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Scope            │ A single existing row   │ A range query predicate │
│ Cause            │ UPDATE or DELETE on row │ INSERT of new row       │
│ Phenomenon       │ Row column value changes│ Row count changes       │
│ Prevented by     │ Repeatable Read         │ Serializable / Next-Key │
└──────────────────┴─────────────────────────┴─────────────────────────┘

🛡️ HOW TO PREVENT:
• In MySQL/PostgreSQL: Set transaction isolation to Repeatable Read.
• Under Repeatable Read, MVCC takes a snapshot at the start of the first read; subsequent reads read from that fixed snapshot timestamp.

💡 MEMORY TRICK:
• Non-Repeatable Read = Same row, modified content.
• Phantom Read = Same query, ghost rows appeared.`
  },
  {
    id: "dbms-17",
    title: "Q17. Deadlock in DBMS and Deadlock Detection",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "Deadlock Detection",
      "Wait-For Graph"
    ],
    imageUrl: "/images/dbms/dbms-deadlock.svg",
    imageCaption: "Wait-for graph circular wait cycle between concurrent transactions",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/deadlock-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
A Deadlock is an impasse situation where two or more concurrent transactions are trapped in a circular waiting state, each holding a lock on a resource that the other transaction requires to proceed. Neither can advance.

─────────────────────────────────────────────────────────────
📋 CLASSIC DEADLOCK SCENARIO:
• Transaction T1 holds exclusive lock on Table A, wants lock on Table B.
• Transaction T2 holds exclusive lock on Table B, wants lock on Table A.
T1 waits for T2; T2 waits for T1 -> Infinite stall.

─────────────────────────────────────────────────────────────
🕸️ DEADLOCK DETECTION: THE WAIT-FOR GRAPH (WFG):
The DBMS background lock manager constructs a directed Wait-For Graph:
• Vertices (V): Active transactions (T1, T2, ...).
• Directed Edge (Ti -> Tj): Ti is blocked waiting for a lock currently held by Tj.
• Condition: If the graph contains a DIRECTED CYCLE (e.g. T1 -> T2 -> T1), a deadlock exists!

Handling the Deadlock:
1. Victim Selection: Choose the lowest-cost transaction to abort (fewest writes completed or shortest elapsed time).
2. Rollback & Lock Release: Abort the victim, issue ROLLBACK, and free all its held locks.
3. Retry: Application retries the aborted transaction with exponential backoff.

─────────────────────────────────────────────────────────────
🛡️ DEADLOCK PREVENTION STRATEGIES:
1. Global Lock Ordering: Always acquire locks in the exact same alphabetical or ID sequence across all services.
2. Lock Timeouts: Abandon query if lock is not acquired within N milliseconds (innodb_lock_wait_timeout).
3. Wait-Die & Wound-Wait Schemes: Timestamp-based preemption algorithms.

💡 MEMORY TRICK:
Four necessary Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait (M-H-N-C).`
  },
  {
    id: "dbms-18",
    title: "Q18. Two-Phase Locking (2PL) and Serializability",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "2PL",
      "Two-Phase Locking",
      "Serializability"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/two-phase-locking-protocol/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Two-Phase Locking (2PL) is a concurrency control protocol that mathematically guarantees Conflict Serializability in concurrent schedules by dividing a transaction's locking lifecycle into two strictly monotonic phases:

1. Growing Phase:
The transaction may acquire new shared (S) or exclusive (X) locks as needed, but is strictly FORBIDDEN from releasing any locks.

2. Shrinking Phase:
The transaction may release locks, but is strictly FORBIDDEN from acquiring any new locks. Once the very first lock is unlocked, the transaction enters the shrinking phase permanently.

─────────────────────────────────────────────────────────────
📋 THE THREE FLAVORS OF 2PL:
• Basic 2PL: Classic growing and shrinking phases (subject to cascading aborts).
• Strict 2PL: All EXCLUSIVE (write) locks are held until COMMIT/ABORT (guarantees strict schedules; prevents cascading rollbacks).
• Rigorous 2PL: Both SHARED and EXCLUSIVE locks are held until COMMIT (easiest to serialize, highest lock contention).

⚠️ CRITICAL INTERVIEW DISTINCTION:
Q: Does 2PL prevent Deadlocks?
A: NO! 2PL guarantees serializability, but transactions can still deadlock during their growing phases (e.g. T1 acquires A, waits for B; T2 acquires B, waits for A). Deadlock detection/prevention mechanisms must still be active.

💡 MEMORY TRICK:
"Lock first, Unlock later. Never take a lock once you let one go."`
  },
  {
    id: "dbms-19",
    title: "Q19. MVCC vs Strict Lock-Based Execution",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "MVCC",
      "Snapshot Isolation",
      "PostgreSQL",
      "MySQL"
    ],
    imageUrl: "/images/dbms/mvcc-snapshot.svg",
    imageCaption: "MVCC allows readers to access snapshot versions without blocking concurrent writers",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/multi-version-concurrency-control-mvcc-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Multi-Version Concurrency Control (MVCC) is the modern concurrency control mechanism employed by leading databases (PostgreSQL, MySQL InnoDB, Oracle) where the database maintains multiple historical versions of data rows.

The core golden rule of MVCC:
"READERS NEVER BLOCK WRITERS, AND WRITERS NEVER BLOCK READERS."

─────────────────────────────────────────────────────────────
📊 ARCHITECTURAL COMPARISON:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Feature          │ Strict Lock-Based (2PL) │ MVCC                    │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Concurrency      │ Shared & Exclusive locks│ Multi-version snapshots │
│ SELECT Queries   │ Acquires Shared Lock    │ Reads historical version│
│ Contention       │ Readers block writers   │ Zero blocking           │
│ Storage Footprint│ Minimal (in-place write)│ Higher (old versions)   │
│ Maintenance      │ Low                     │ Requires VACUUM / Purge │
│ Deadlock Risk    │ High                    │ Low on read operations  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

─────────────────────────────────────────────────────────────
🔍 HOW MVCC WORKS INTERNALLY (POSTGRESQL TUPLE HEADERS):
Every table row contains hidden metadata headers:
• xmin: The transaction ID that inserted this tuple.
• xmax: The transaction ID that deleted or updated this tuple (0 if active).

When T1 updates a row:
1. It does NOT overwrite in-place! It marks the old row's xmax = T1_id.
2. It inserts a completely new tuple with xmin = T1_id.
3. Concurrent readers whose transaction ID < T1_id cleanly read the old tuple without blocking!
4. PostgreSQL's autovacuum or MySQL's undo purge threads clean up old, unreferenced row versions in the background.

💡 MEMORY TRICK:
Locking = Queuing up for a single shared whiteboard.
MVCC = Everyone gets their own photocopied snapshot.`
  },
  {
    id: "dbms-20",
    title: "Q20. Indexing for Slow Queries & Leftmost Prefix Rule",
    difficulty: "Medium",
    tags: [
      "🔥 Frequently Asked",
      "Indexing",
      "Leftmost Prefix",
      "Query Optimization"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
An index is an auxiliary data structure (predominantly a B+ Tree) that stores ordered search keys along with direct row addresses (RowIDs or clustered primary keys) to enable the database engine to locate target records in logarithmic time O(log N) instead of scanning the entire table O(N) via a Full Table Scan.

─────────────────────────────────────────────────────────────
🧩 THE LEFTMOST PREFIX RULE (COMPOSITE INDEXES):
Suppose you create a composite index on three columns:
CREATE INDEX idx_emp_dept_salary_age ON Employee(dept_id, salary, age);

The B+ Tree sorts keys hierarchically: first by dept_id, then by salary within the same dept_id, then by age.

Will the index be used?
1. WHERE dept_id = 10;                         --> ✅ YES (Leftmost prefix)
2. WHERE dept_id = 10 AND salary > 50000;       --> ✅ YES (Prefix match)
3. WHERE dept_id = 10 AND salary = 50000 AND age = 25; --> ✅ YES (Full match)
4. WHERE salary = 50000;                       --> ❌ NO (Skips dept_id)
5. WHERE age = 25;                             --> ❌ NO (Skips leftmost columns)
6. WHERE dept_id = 10 AND age = 25;            --> ⚠️ PARTIAL (Uses dept_id only)

─────────────────────────────────────────────────────────────
🛠️ 5-STEP PROTOCOL FOR OPTIMIZING SLOW QUERIES:
1. Run EXPLAIN ANALYZE: Inspect whether the optimizer uses "Seq Scan" or "Index Scan".
2. Check Cardinality: High selectivity columns (unique emails, IDs) benefit most from indexing.
3. Covering Indexes: Include SELECTed columns in the index to enable Index-Only Scans.
4. Avoid Function Wrappers in WHERE: WHERE YEAR(created_at) = 2024 breaks index usage! Use WHERE created_at >= '2024-01-01'.
5. Prune Redundant Indexes: Every extra index slows down INSERT, UPDATE, and DELETE operations.

💡 MEMORY TRICK:
Composite Index = Telephone Directory (Sorted by Last Name, then First Name). Searching by First Name alone is useless!`
  },
  {
    id: "dbms-21",
    title: "Q21. Why Are B+ Trees Used for Database Indexes?",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "B+ Tree",
      "Storage Engine",
      "Data Structures"
    ],
    imageUrl: "/images/dbms/bplus-tree.svg",
    imageCaption: "B+ Tree index with high fan-out root and doubly linked leaf nodes for range scans",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Relational storage engines (InnoDB, PostgreSQL, SQLite, Oracle) overwhelmingly choose B+ Trees over Binary Search Trees (BST), AVL Trees, Red-Black Trees, and Hash Indexes due to physical disk hardware mechanics:

1. Massive Fan-Out -> Very Low Tree Height:
Internal nodes store ONLY routing keys and child pointers, with no table data payloads. In a standard 16KB disk page, an internal node can hold 1,000+ keys.
• Fan-out = 1,000.
• A 3-level B+ Tree can index: 1,000 * 1,000 * 1,000 = 1 Billion records in just 3 to 4 disk I/O reads!
• A balanced binary tree would require 30 sequential disk seeks!

2. Doubly Linked Leaves -> Lightning Fast Range Queries:
All actual data records (or row pointers) reside exclusively in leaf nodes. All leaf nodes are linked horizontally into a continuous doubly-linked list.
• To satisfy WHERE salary BETWEEN 40000 AND 80000: The engine traverses 3 levels to find 40,000, then simply scans sequentially along the leaf linked list until 80,000 is reached. Zero tree re-traversals!

3. Consistent Logarithmic Cost:
Because all leaf nodes sit at the exact same depth level, every single query has a deterministic O(log N) lookup cost.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
B+ Tree = Balanced + Broad (High Fan-Out) + Bound Together (Linked Leaves).`
  },
  {
    id: "dbms-22",
    title: "Q22. Clustered vs Non-Clustered Indexing",
    difficulty: "Medium",
    tags: [
      "🔥 Frequently Asked",
      "Clustered Index",
      "Non-Clustered",
      "Storage"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/difference-between-clustered-and-non-clustered-index/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
• Clustered Index: Determines the literal, physical sorting order of data rows on disk storage. Because physical rows on a hard drive can only be arranged in one physical order at any given moment, a table can have EXACTLY ONE Clustered Index (virtually always the PRIMARY KEY).
  - The leaf nodes of a clustered index DO NOT contain pointers—they contain the actual row data columns!

• Non-Clustered (Secondary) Index: A separate, independent B+ Tree structure whose leaf nodes contain the indexed key column value and a reference pointer back to the base row:
  - In MySQL InnoDB: The secondary index leaf stores the row's Primary Key.
  - In PostgreSQL / SQL Server heaps: It stores a Tuple ID (ctid / RID).
  - A table can have MULTIPLE non-clustered indexes.

─────────────────────────────────────────────────────────────
📊 COMPREHENSIVE COMPARISON:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Feature          │ Clustered Index         │ Non-Clustered Index     │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Physical Order   │ Directly alters storage │ Independent of storage  │
│ Count per table  │ Exactly ONE             │ Multiple (e.g. 5-10)    │
│ Leaf Contents    │ Actual data rows        │ Key + PK/RowID pointer  │
│ Lookup Cost      │ 1 tree traversal        │ 2 traversals (Index+PK) │
│ Ideal For        │ Range scans, ORDER BY PK│ Specific column lookups │
└──────────────────┴─────────────────────────┴─────────────────────────┘

🔍 THE "DOUBLE LOOKUP" (SECONDARY INDEX PENALTY):
In MySQL InnoDB, querying SELECT name, salary FROM Employee WHERE email = 'x':
1. Traverses the non-clustered index on email -> finds primary key emp_id = 42.
2. Must now traverse the clustered index on emp_id to retrieve name and salary (Bookmark Lookup).

💡 MEMORY TRICK:
• Clustered Index = Dictionary (Words are physically stored in alphabetical order).
• Non-Clustered Index = Index pages at the back of a textbook (Points you to page numbers).`
  },
  {
    id: "dbms-23",
    title: "Q23. Why Too Many Indexes Reduce Performance",
    difficulty: "Medium",
    tags: [
      "⭐ Important",
      "Index Overhead",
      "Write Penalty",
      "Performance"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/how-too-many-indexes-affect-database-performance/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
While indexes dramatically accelerate SELECT query reads, each index is an active, persistent B+ Tree structure that must be synchronously kept in sync with the table. Adding excessive indexes introduces severe write penalties and system overhead.

─────────────────────────────────────────────────────────────
⚠️ THE 5 PENALTIES OF OVER-INDEXING:
1. Write Amplification on INSERT:
Inserting 1 row into a table with 8 indexes requires writing to the clustered index PLUS traversing and inserting keys into 8 separate B+ Tree leaf blocks, triggering disk I/O and page splits.

2. Heavy UPDATE Cost:
Updating an indexed column forces the storage engine to delete the old key from the B+ Tree, balance nodes, and insert the new key into another leaf block.

3. Massive Memory & Buffer Pool Contention:
To be fast, B+ Tree index blocks must be cached in RAM (InnoDB Buffer Pool / Shared Buffers). Too many indexes evict hot table data pages from memory.

4. Inflated Storage Footprint:
In many write-heavy production tables, secondary index storage sizes frequently exceed the size of the actual raw data table itself!

5. Query Optimizer Overhead:
On every single SQL query, the query optimizer must evaluate execution plans for every candidate index.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
"Indexes are free on read, expensive on write."`
  },
  {
    id: "dbms-24",
    title: "Q24. Log-Based Recovery After a Crash (REDO and UNDO)",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "Crash Recovery",
      "REDO / UNDO",
      "Checkpoints"
    ],
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/log-based-recovery-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Log-based recovery is the mechanism relational databases utilize to restore data to a consistent, durable state following an unexpected crash, power loss, or OS shutdown.

The database maintains an append-only transaction log on stable storage recording every modification:
Format: <T_id, DataItem, OldValue, NewValue>

─────────────────────────────────────────────────────────────
🔄 THE TWO RECOVERY ACTIONS:
1. REDO (Roll-Forward):
Re-applies the modifications of all transactions that COMMITTED before the crash, ensuring changes reached permanent disk pages (enforcing Durability).
• Rule: If log contains <Ti START> and <Ti COMMIT> -> REDO Ti.

2. UNDO (Roll-Back):
Reverses the partial, dirty modifications made by active transactions that had NOT committed at the moment of the crash (enforcing Atomicity).
• Rule: If log contains <Tj START> but NO <Tj COMMIT> -> UNDO Tj using OldValue.

─────────────────────────────────────────────────────────────
🏁 WHY CHECKPOINTS ARE ESSENTIAL:
Without checkpoints, recovery would require replaying historical logs from Day 1.
A Checkpoint periodically flushes dirty in-memory pages to disk and records a sync point in the log. Recovery only needs to process backwards to the latest checkpoint!

💡 MEMORY TRICK:
• REDO = Keep the promises of COMMITTED work.
• UNDO = Erase the footprints of UNCOMMITTED work.`
  },
  {
    id: "dbms-25",
    title: "Q25. Write-Ahead Logging (WAL)",
    difficulty: "Hard",
    tags: [
      "🔥 Frequently Asked",
      "WAL",
      "Write-Ahead Logging",
      "Durability"
    ],
    imageUrl: "/images/dbms/wal-protocol.svg",
    imageCaption: "WAL protocol ensures log is durable on disk before flushing dirty data pages",
    links: [
      {
        platform: "GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/write-ahead-logging-wal-in-dbms/"
      }
    ],
    answer: `📌 INTERVIEW ANSWER:
Write-Ahead Logging (WAL) is the fundamental durability protocol in modern database engines (PostgreSQL, SQLite, MySQL InnoDB Redo Log) dictating that:

"NO DATA PAGE CAN BE WRITTEN TO NON-VOLATILE DISK STORAGE UNTIL THE CORRESPONDING LOG RECORDS DESCRIBING THE UPDATE HAVE FIRST BEEN SAFELY FLUSHED TO STABLE STORAGE."

Furthermore: A transaction is NOT considered officially committed until its COMMIT log record has been flushed and fsync'd to disk.

─────────────────────────────────────────────────────────────
🚀 WHY WAL IS A REVOLUTIONARY PERFORMANCE OPTIMIZATION:
Writing modified 8KB/16KB data pages directly to random disk sectors is excruciatingly slow (random I/O).

With WAL:
1. Fast Append-Only Writes: Modifications are written sequentially to the WAL log file at high disk throughput.
2. Lazy Buffer Flushing: In-memory table data pages (dirty buffers) remain in RAM buffer cache. The OS can lazily flush them to disk minutes later in large batches!
3. Crash Safety Guarantee: If power cuts while dirty pages are still in RAM, the recovery engine simply reads the durable WAL log and REDOs the missing writes.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
"Write the Log FIRST, Write the Data LATER."

❓ INTERVIEW FOLLOW-UP:
Q: What is the difference between WAL and a Checkpoint?
A: WAL is the real-time append-only protocol that makes unwritten RAM data crash-safe; a Checkpoint is a periodic house-cleaning event that synchronizes RAM dirty pages to disk and truncates old, unneeded WAL segments.`
  }
];
