import type { Pattern } from '../types';
import { osQuestions } from './osQuestions';
import { dbmsQuestions } from './dbmsQuestions';

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
    description: '30 Essential SDE-1 Interview Questions: Process management, CPU scheduling, concurrency, synchronization, deadlocks, virtual memory, paging, and kernel architecture.',
    icon: '💻',
    problems: osQuestions
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
    description: 'Comprehensive 25 interview questions: DBMS fundamentals, relational design, 1NF-BCNF, transactions, ACID, concurrency control, MVCC, B+ tree indexing, and crash recovery (WAL).',
    icon: '🗄️',
    problems: dbmsQuestions
  }
];
