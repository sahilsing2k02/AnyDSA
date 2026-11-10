import type { Pattern } from '../types';

export const csFundamentals: Pattern[] = [
  {
    id: 'cs-cn',
    name: 'Computer Networks (CN)',
    description: 'Protocols, OSI 7-layer architecture, TCP/UDP, HTTP/HTTPS, DNS, and network layer routing.',
    icon: '🌐',
    problems: [
      {
        id: 'cn-1',
        title: 'OSI Model vs TCP/IP Model: Functions of All 7 Layers',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/layers-of-osi-model/' }],
        tags: ['OSI', 'Architecture', 'Protocols'],
        answer: 'OSI 7 Layers:\n1. Physical: Raw bit transmission over physical medium (cables, hubs).\n2. Data Link: Node-to-node frame delivery, MAC addressing, error detection (Ethernet, switches).\n3. Network: Logical IP addressing, packet routing across networks (Routers, IP, ICMP).\n4. Transport: End-to-end communication, segmentation, reliability, flow control (TCP, UDP, ports).\n5. Session: Establishes, maintains, and synchronizes session dialogs.\n6. Presentation: Data translation, compression, and encryption/decryption (SSL/TLS, JSON, JPEG).\n7. Application: User-facing network services and interface (HTTP, DNS, FTP, SMTP).\n\nTCP/IP simplifies this into 4 layers: Link, Internet, Transport, and Application.'
      },
      {
        id: 'cn-2',
        title: 'TCP vs UDP: Key Differences & When to Use Which',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/differences-between-tcp-and-udp/' }],
        tags: ['Transport', 'TCP', 'UDP'],
        answer: 'Key Differences:\n• Connection: TCP is connection-oriented (3-way handshake); UDP is connectionless.\n• Reliability: TCP guarantees delivery via acknowledgments, checksums, and retransmission. UDP is best-effort (packets may drop or arrive out of order).\n• Ordering: TCP guarantees in-order byte delivery; UDP has no sequence tracking.\n• Speed & Overhead: TCP header is 20-60 bytes (slower); UDP header is fixed at 8 bytes (minimal latency).\n• Flow & Congestion Control: TCP has sliding window flow control and congestion window backoff (AIMD). UDP has none.\n\nUse Cases:\n• TCP: Web browsing (HTTP/HTTPS), file transfer (FTP), email (SMTP), SSH.\n• UDP: Real-time gaming, live audio/video streaming (VoIP, WebRTC), DNS lookups.'
      },
      {
        id: 'cn-3',
        title: 'TCP 3-Way Handshake & 4-Way Connection Termination',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' }],
        tags: ['TCP', 'Handshake', 'Lifecycle'],
        answer: '3-Way Handshake (Establishment):\n1. Client -> Server: SYN (Synchronize sequence number X).\n2. Server -> Client: SYN-ACK (Server ACK = X+1, server SYN = sequence number Y).\n3. Client -> Server: ACK (Client ACK = Y+1). Connection established!\n\n4-Way Termination (Teardown):\n1. Client -> Server: FIN (Client has no more data to send).\n2. Server -> Client: ACK (Server acknowledges FIN, closes read end).\n3. Server -> Client: FIN (Server finishes sending remaining data and closes its write end).\n4. Client -> Server: ACK (Client enters TIME_WAIT for 2*MSL to ensure final ACK delivery before full close).'
      },
      {
        id: 'cn-4',
        title: 'What happens when you type a URL into a browser? (Step by Step)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/what-happens-when-we-type-a-url-in-web-browser/' }],
        tags: ['DNS', 'HTTP', 'Browser', 'Interview-Classic'],
        answer: '1. URL Parsing: Browser parses scheme, domain name, port, and path.\n2. DNS Lookup: Browser checks local cache -> OS hosts cache -> recursive DNS resolver -> Root -> TLD (.com) -> Authoritative server to get IP.\n3. TCP Connection: 3-way handshake (SYN, SYN-ACK, ACK) with target server IP on port 80/443.\n4. TLS Handshake (HTTPS): Cipher suite negotiation, server certificate verification via CA, and symmetric session key generation.\n5. HTTP Request: Browser transmits HTTP GET / request with headers and cookies.\n6. Server Response: Web server/reverse proxy processes request and returns HTTP status code (200 OK) + payload (HTML).\n7. DOM Rendering: Browser parses HTML into DOM tree, CSS into CSSOM tree, builds Render tree, computes layout, paints pixels, and executes JavaScript.'
      },
      {
        id: 'cn-5',
        title: 'HTTP vs HTTPS & How SSL/TLS Encryption Works',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-http-and-https/' }],
        tags: ['Security', 'HTTPS', 'TLS', 'Cryptography'],
        answer: '• HTTP: Transmits plain text over port 80; vulnerable to man-in-the-middle (MITM) sniffing and tampering.\n• HTTPS: Runs over port 443 with TLS encryption providing Confidentiality, Integrity, and Authentication.\n\nTLS Handshake Process (Hybrid Encryption):\n1. ClientHello: Client sends supported TLS version and cipher suites + random nonce.\n2. ServerHello: Server chooses cipher suite + sends public certificate containing its RSA/ECC Public Key.\n3. Certificate Verification: Client verifies certificate with trusted Certificate Authority (CA) root store.\n4. Key Exchange: Client creates Pre-Master Secret encrypted with server public key (or Diffie-Hellman ephemeral exchange) -> both derive symmetric Master Session Key.\n5. Secure Communication: All subsequent HTTP payloads are encrypted using the fast symmetric session key (e.g. AES-256-GCM).'
      },
      {
        id: 'cn-6',
        title: 'IP Addressing, IPv4 vs IPv6, and Subnetting (CIDR)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/introduction-to-ip-addressing-and-subnets/' }],
        tags: ['IP', 'Subnetting', 'Routing'],
        answer: '• IPv4: 32-bit address (~4.3 billion total) in dotted decimal format (e.g., 192.168.1.1). Depleted, prolonged via NAT and private IP blocks (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).\n• IPv6: 128-bit address (3.4 x 10^38 addresses) in hexadecimal colon format (e.g., 2001:0db8::1). Built-in IPSec and zero NAT needed.\n\nCIDR (Classless Inter-Domain Routing):\n• Notation `192.168.1.0/24`: The `/24` means the first 24 bits are Network prefix, leaving 32 - 24 = 8 bits for host addresses.\n• Number of hosts = 2^8 - 2 = 254 (subtracting 2 for Network ID .0 and Broadcast ID .255).'
      },
      {
        id: 'cn-7',
        title: 'Forward Proxy vs Reverse Proxy vs Load Balancer',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-forward-proxy-and-reverse-proxy/' }],
        tags: ['Proxy', 'LoadBalancing', 'Architecture'],
        answer: '• Forward Proxy: Sits in front of CLIENTS. Represents the client to the internet (e.g., corporate VPN, content filtering, masking client IP).\n• Reverse Proxy: Sits in front of SERVERS (e.g., Nginx, Cloudflare). Intercepts client requests, handles SSL termination, caching, and forwards to internal microservices.\n• Load Balancer: A specialized reverse proxy that distributes traffic across multiple backend server instances using algorithms like Round Robin, Least Connections, or Consistent IP Hash.'
      },
      {
        id: 'cn-8',
        title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-http-1-1-and-http-2/' }],
        tags: ['HTTP2', 'QUIC', 'Optimization'],
        answer: '• HTTP/1.1: Text-based protocol. Suffers from Head-of-Line (HoL) blocking on single TCP connection. Browsers opened 6 parallel connections per domain.\n• HTTP/2: Binary protocol over single TCP connection. Introduces multiplexing (multiple streams interleaved in one connection), header compression (HPACK), and server push. Still vulnerable to TCP-level packet loss HoL blocking.\n• HTTP/3: Replaces TCP with QUIC over UDP. Eliminates TCP head-of-line blocking completely, provides 0-RTT connection resumption, and seamless connection migration across IP/Wi-Fi transitions.'
      }
    ]
  },
  {
    id: 'cs-os',
    name: 'Operating Systems (OS)',
    description: 'Process management, thread synchronization, deadlocks, virtual memory, and file systems.',
    icon: '💻',
    problems: [
      {
        id: 'os-1',
        title: 'Process vs Thread & Context Switching Internals',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/' }],
        tags: ['Process', 'Threads', 'Concurrency'],
        answer: '• Process: Independent program in execution with its own isolated address space (Text, Data, Heap, Stack, File Descriptors). High creation and context switch overhead; memory protection between processes.\n• Thread: Lightweight unit of execution within a process. Threads of the same process share Code, Data, Heap, and open files, but each has its own Program Counter (PC), Register set, and Stack.\n\nContext Switching:\nSaving the state of the current executing process/thread (PCB / TCB: registers, PC, stack pointer, page tables) and restoring the state of the next process from ready queue. Thread context switches are significantly faster because memory address space and TLB cache remain warm.'
      },
      {
        id: 'os-2',
        title: 'Process Synchronization: Critical Section, Mutex vs Semaphore',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/' }],
        tags: ['Synchronization', 'Mutex', 'Semaphore', 'Concurrency'],
        answer: 'Critical Section: Code segment accessing shared mutable resources that must not be executed concurrently by multiple threads.\n\nMutex (Mutual Exclusion):\n• Locking mechanism (binary flag 0 or 1).\n• Ownership: The thread that locks the mutex MUST be the one that unlocks it.\n• Strict serialization for protecting a single resource.\n\nSemaphore (Signaling Mechanism):\n• Counting integer variable manipulated via atomic wait() / P() and signal() / V() operations.\n• No ownership concept: One thread can signal while another waits.\n• Types: Binary Semaphore (values 0 and 1, acts as lock) and Counting Semaphore (integer N representing capacity of finite resource pool, e.g. connection pool).'
      },
      {
        id: 'os-3',
        title: 'Deadlocks: 4 Coffman Conditions & Handling Strategies',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/' }],
        tags: ['Deadlock', 'ResourceAllocation'],
        answer: 'Deadlock: A state where a set of processes are blocked because each holds a resource and waits for another resource held by another process.\n\n4 Necessary Conditions (Coffman):\n1. Mutual Exclusion: Resources cannot be shared simultaneously.\n2. Hold and Wait: Process holds at least one resource and waits for another.\n3. No Preemption: Resources cannot be forcibly revoked; must be released voluntarily.\n4. Circular Wait: A closed chain of processes P0 -> P1 -> ... -> Pn -> P0 exists.\n\nStrategies:\n• Prevention: Eliminate at least one condition (e.g. enforce global resource ordering to break circular wait).\n• Avoidance: Banker\'s Algorithm dynamically assesses safety before allocating.\n• Detection & Recovery: Build Resource Allocation Graph (RAG), detect cycles, and terminate victim process or preempt resources.\n• Ignorance (Ostrich Algorithm): Assume deadlocks rarely occur (used by general-purpose OS like Linux/Windows).'
      },
      {
        id: 'os-4',
        title: 'Virtual Memory, Paging, Page Faults & Thrashing',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/' }],
        tags: ['Memory', 'Paging', 'VirtualMemory'],
        answer: '• Virtual Memory: Memory management technique giving processes the illusion of contiguous, large memory space by mapping virtual addresses to physical RAM or secondary storage (swap/paging file).\n• Paging: Divides virtual address space into fixed-size Pages (typically 4KB) and physical RAM into Frames of identical size. The Page Table translates virtual page numbers (VPN) to physical frame numbers (PFN), cached in hardware Translation Lookaside Buffer (TLB).\n• Page Fault: Hardware interrupt triggered by MMU when a requested virtual page is not currently in physical RAM. OS catches the trap, loads the page from disk into a free frame, updates page table, and restarts instruction.\n• Thrashing: Condition where CPU spends more time swapping pages in/out of disk than executing instructions, caused by total working set of processes exceeding available physical RAM.'
      },
      {
        id: 'os-5',
        title: 'CPU Scheduling Algorithms: FCFS, SJF, Round Robin, Priority',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/' }],
        tags: ['Scheduling', 'CPU'],
        answer: '1. FCFS (First Come First Serve): Non-preemptive. Simple FIFO queue. Suffering from Convoy Effect (short jobs stuck behind long job).\n2. SJF (Shortest Job First): Provably optimal average turnaround time. Requires knowledge of future burst times. Preemptive version is SRTF (Shortest Remaining Time First).\n3. Round Robin (RR): Preemptive. Each process gets a fixed time quantum. Fair and optimal for interactive time-sharing systems. Small quantum -> high context switch overhead; Large quantum -> degenerates into FCFS.\n4. Priority Scheduling: Each task assigned priority. Vulnerable to Starvation (low priority tasks never run). Solved via Aging (gradually increasing priority of waiting tasks).'
      }
    ]
  },
  {
    id: 'cs-oops',
    name: 'Object-Oriented Programming (OOPS)',
    description: 'The 4 pillars, SOLID principles, design patterns, polymorphism, and class relationships.',
    icon: '🧩',
    problems: [
      {
        id: 'oops-1',
        title: 'The 4 Pillars of OOPS: Definitions & Real-World Examples',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' }],
        tags: ['OOPS', 'Pillars', 'Core'],
        answer: '1. Encapsulation: Bundling data (state) and methods (behavior) within a single class, while restricting direct access using access modifiers (private, protected). Example: BankAccount class with private balance and public deposit()/withdraw() with validation.\n2. Abstraction: Hiding complex internal implementation details and exposing only essential interface to user. Example: Car steering wheel and brake pedal hide engine mechanics.\n3. Inheritance: Mechanism where a child class acquires properties and behavior of parent class to promote code reusability. Example: Dog inherits from Animal.\n4. Polymorphism: Ability of an entity to take multiple forms (one interface, multiple implementations). Compile-time (Method Overloading) vs Runtime (Method Overriding via virtual dispatch).'
      },
      {
        id: 'oops-2',
        title: 'SOLID Principles with Practical Software Architecture Examples',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/solid-principles-in-programming/' }],
        tags: ['SOLID', 'Architecture', 'CleanCode'],
        answer: '• S - Single Responsibility (SRP): A class should have one, and only one, reason to change. Example: Separate UserDatabaseService from UserEmailNotifier.\n• O - Open/Closed (OCP): Software entities should be open for extension, but closed for modification. Example: PaymentProcessor takes IPaymentStrategy (CreditCard, PayPal, Crypto) without modifying existing processor logic.\n• L - Liskov Substitution (LSP): Subtypes must be substitutable for their base types without breaking correctness. Classic violation: Square inheriting from Rectangle where setting width modifies height.\n• I - Interface Segregation (ISP): Clients should not be forced to depend on interfaces they do not use. Split fat interfaces into fine-grained interfaces (e.g. Printer and Scanner interfaces rather than MultiFunctionDevice).\n• D - Dependency Inversion (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions. Pass interface repository via constructor injection rather than instantiating PostgresDb inside service.'
      },
      {
        id: 'oops-3',
        title: 'Method Overloading vs Overriding & Runtime Virtual Method Dispatch',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/' }],
        tags: ['Polymorphism', 'Overloading', 'Overriding'],
        answer: '• Overloading (Compile-Time / Static Polymorphism): Same method name within the same class, but different parameter types or counts. Resolved at compile-time based on static signature.\n• Overriding (Runtime / Dynamic Polymorphism): Subclass redefines a method from superclass with identical signature and return type. Resolved at runtime based on actual object instance in memory.\n\nVirtual Method Dispatch (vtable):\nCompilers create a virtual method table (vtable) for classes containing virtual/overridden methods. Each object instance stores a hidden vpointer (vptr) pointing to its class\'s vtable. At runtime, method calls look up the function address in the vtable, enabling dynamic dispatch.'
      },
      {
        id: 'oops-4',
        title: 'Composition vs Inheritance: Why "Favor Composition over Inheritance"',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/favoring-composition-over-inheritance-in-java-with-examples/' }],
        tags: ['DesignPatterns', 'Composition', 'Inheritance'],
        answer: '• Inheritance ("is-a" relationship): White-box reuse. Subclass tightly couples to parent class internals. Fragile base class problem: Changing parent class breaks subclasses. Java/C++ prevent multiple class inheritance.\n• Composition ("has-a" relationship): Black-box reuse. Class contains an instance of another class and delegates behavior through interfaces.\n\nWhy favor composition:\n1. Loose coupling: Components can be swapped dynamically at runtime (Strategy Pattern).\n2. Testability: Easy to mock dependencies.\n3. Flexibility: Prevents class explosion (e.g. FlyingVehicle, SwimmingVehicle, FlyingSwimmingVehicle avoided by composing FlyBehavior and SwimBehavior).'
      }
    ]
  },
  {
    id: 'cs-dbms',
    name: 'Database Management Systems (DBMS)',
    description: 'ACID properties, indexing internals (B+ Trees), normalization, transactions, and isolation levels.',
    icon: '🗄️',
    problems: [
      {
        id: 'dbms-1',
        title: 'ACID Properties in Relational Databases with Concrete Examples',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/' }],
        tags: ['ACID', 'Transactions', 'Core'],
        answer: '• Atomicity (All or Nothing): Transaction executes completely or rolls back entirely. Example: Transferring $100 from Account A to B: A is debited and B is credited; if power fails halfway, changes roll back.\n• Consistency: Database moves from one valid state to another, satisfying all integrity constraints (Foreign keys, uniqueness, check constraints).\n• Isolation: Concurrent transactions execute independently without interfering. Intermediate uncommitted changes are invisible to other transactions.\n• Durability: Once a transaction commits, its modifications are permanently recorded on disk (via Write-Ahead Logging WAL) even if system crashes immediately after.'
      },
      {
        id: 'dbms-2',
        title: 'Database Indexing Internals: B-Trees vs B+ Trees & Clustered Indexes',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/' }],
        tags: ['Indexing', 'B+Tree', 'Performance'],
        answer: 'Why B+ Trees over B-Trees for Databases:\n1. Leaf Nodes Contain All Data/Pointers: Internal nodes only store keys (routing guides). This allows more keys per 4KB/8KB disk block -> higher fan-out -> very low tree height (typically 3-4 levels for millions of rows).\n2. Linked List at Leaves: Leaf nodes are connected via a doubly linked list, enabling ultra-fast sequential range scans (e.g. `WHERE age BETWEEN 20 AND 30`) without tree traversals.\n\nClustered vs Non-Clustered Indexes:\n• Clustered Index: Dictates the physical storage order of table rows on disk. Only ONE clustered index per table (typically the Primary Key). Leaf nodes store the actual row data.\n• Non-Clustered (Secondary) Index: Separate structure storing index key + pointer (or primary key) to the actual data row.'
      },
      {
        id: 'dbms-3',
        title: 'Database Normalization: 1NF, 2NF, 3NF, and BCNF Explained',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-database-normalization/' }],
        tags: ['Normalization', 'SchemaDesign'],
        answer: 'Normalization minimizes data redundancy and avoids update, insertion, and deletion anomalies:\n• 1NF (First Normal Form): Every column value must be atomic (single value, no multi-valued arrays or nested tables), and each record unique.\n• 2NF: Must be in 1NF + NO partial dependency (no non-prime attribute functionally dependent on a subset of a composite primary key).\n• 3NF: Must be in 2NF + NO transitive dependency (non-prime attributes must not depend on other non-prime attributes: X -> Y -> Z).\n• BCNF (Boyce-Codd): Stricter 3NF: For every functional dependency X -> Y, X must be a super key.'
      },
      {
        id: 'dbms-4',
        title: 'Transaction Isolation Levels & Concurrency Read Phenomena',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/' }],
        tags: ['Isolation', 'Transactions', 'Concurrency'],
        answer: 'Read Phenomena:\n1. Dirty Read: Transaction reads uncommitted changes from another transaction that later rolls back.\n2. Non-Repeatable Read: Reading the same row twice produces different values because another transaction committed an update in between.\n3. Phantom Read: Rerunning a range query returns new rows added by another committed transaction.\n\n4 ANSI SQL Isolation Levels:\n• Read Uncommitted: Allows dirty, non-repeatable, and phantom reads (lowest overhead).\n• Read Committed: Prevents dirty reads; allows non-repeatable & phantom reads (default in PostgreSQL, Oracle, SQL Server).\n• Repeatable Read: Prevents dirty and non-repeatable reads; phantom reads may occur (default in MySQL InnoDB via MVCC & Next-Key locking).\n• Serializable: Strict serial execution via range locks or Serialization Graph Checking (no anomalies, highest lock contention).'
      }
    ]
  }
];
