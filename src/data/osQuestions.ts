import type { Problem } from '../types';

export const osQuestions: Problem[] = [
  // ─── 1. OS Fundamentals ──────────────────────────────────────────────────
  {
    id: 'os-1',
    title: 'Q1. What is an Operating System, and what are its main responsibilities?',
    difficulty: 'Easy',
    tags: ['OS Fundamentals', 'Core', 'Architecture'],
    imageUrl: '/images/os/os-architecture.svg',
    imageCaption: 'OS coordinates resource access between applications and underlying hardware',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/' }],
    answer: `📌 INTERVIEW ANSWER:
An Operating System (OS) is core system software that manages computer hardware resources and provides common services and abstractions for application software.

Main Responsibilities:
1. Process & CPU Management: Scheduling, context switching, synchronization, and process lifecycle.
2. Memory Management: Allocating and tracking RAM, virtual memory, paging, and address translation.
3. File System & Storage: Inode mapping, directories, permissions, buffering, and page caching.
4. Device & I/O Management: Device drivers, buffering, interrupts, and DMA controllers.
5. Protection & Security: Dual-mode execution (user vs kernel), access control, and memory isolation.
6. Networking & IPC: Socket communication, pipes, and message passing protocols.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
When a web browser streams a 4K video:
• CPU: OS schedules decoding threads across multiple CPU cores.
• Memory: OS allocates RAM buffers via demand paging.
• Network: OS network stack receives packets via NIC hardware interrupts.
• Display: OS communicates with GPU drivers via system calls.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
OS = Resource Manager (hardware allocator) + Abstraction Layer (hides low-level hardware details).

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What is the difference between the OS and the Kernel?
A: The Kernel is the privileged core running in Ring 0 that directly controls CPU, RAM, and hardware. The full OS includes the kernel plus system libraries (libc), daemons, shells, and user utilities.`
  },
  {
    id: 'os-2',
    title: 'Q2. Difference between User Mode and Kernel Mode',
    difficulty: 'Easy',
    tags: ['🔥 Frequently Asked', 'Dual Mode', 'Kernel', 'Security'],
    imageUrl: '/images/os/user-kernel-mode.svg',
    imageCaption: 'CPU privilege ring transition via system call trap and return',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/user-mode-and-kernel-mode-switching/' }],
    answer: `📌 INTERVIEW ANSWER:
Modern CPUs enforce dual-mode operation to guarantee system stability and security:

• User Mode (Ring 3 on x86): A restricted execution state where user applications run. Code cannot execute privileged instructions, access hardware directly, or touch memory outside its own virtual address space.
• Kernel Mode (Ring 0 on x86): An unrestricted, privileged execution state where the core operating system executes. The CPU has direct, unrestricted access to all hardware registers, physical memory, and privileged instructions.

A controlled transition (system call trap, hardware interrupt, or CPU exception) switches the processor from User Mode to Kernel Mode.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
An application cannot directly command an NVMe SSD to read a block. It issues a \`read()\` system call, triggering a CPU trap into Kernel Mode. The kernel verifies permissions, initiates disk DMA, and executes \`sysret\` to return data to User Mode.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ User Mode (Ring 3)      │ Kernel Mode (Ring 0)    │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Privilege Level  │ Restricted execution    │ Full unrestricted power │
│ Hardware Access  │ Blocked; via sys calls  │ Direct device control   │
│ Memory Access    │ Own user virtual memory │ Entire physical & kernel│
│ Instructions     │ Non-privileged subset   │ Privileged (CLI, HLT)   │
│ Crash Impact     │ Process crashes safely  │ Entire OS Kernel Panics │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
User = Restricted boundary; Kernel = Privileged core.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Can an application switch itself into kernel mode?
A: No. User code cannot set the CPU privilege bit directly. Mode transitions can only occur through dedicated hardware gates (syscall instructions, hardware interrupts, or faults).`
  },
  {
    id: 'os-3',
    title: 'Q3. What is a System Call, and what happens when one is executed?',
    difficulty: 'Medium',
    tags: ['System Calls', 'OS Internals', 'Trap'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/system-call-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
A system call is the controlled programmatic interface used by an application to request services from the operating system kernel.

Execution Lifecycle:
1. User Invocation: Application calls a standard C library wrapper function (e.g. \`read()\`).
2. Register Setup: Wrapper places system call number in register (\`%rax\` on x86-64) and arguments in \`%rdi\`, \`%rsi\`, \`%rdx\`.
3. Trap Execution: Wrapper executes \`syscall\` instruction, raising an intentional software interrupt.
4. Mode Switch: Hardware switches CPU from Ring 3 to Ring 0, saves user instruction pointer, and jumps to kernel system call handler.
5. Kernel Execution: Kernel validates user pointers and permissions, executes driver/filesystem logic, and stores return value in \`%rax\`.
6. Return to User Space: Kernel executes \`sysret\` / \`iret\`, restoring user CPU context and Ring 3 mode.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Executing \`read(fd, buffer, 1024)\` verifies that \`buffer\` points to valid writable user memory, copies 1024 bytes from the kernel page cache into user space, and returns the byte count.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
System call = Guarded doorway from user application into kernel space.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Is every C standard library function a system call?
A: No. Functions like \`strlen()\`, \`strcpy()\`, and math routines run entirely in user space. Even \`malloc()\` manages an in-process heap pool and only calls \`brk()\` / \`mmap()\` when it needs additional pages from the OS.`
  },
  {
    id: 'os-4',
    title: 'Q4. Difference between a Program and a Process',
    difficulty: 'Easy',
    tags: ['🔥 Frequently Asked', 'Process', 'Program'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-a-program-and-a-process-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
• Program: A passive entity consisting of compiled executable machine code, static data, and metadata stored on disk.
• Process: An active entity representing a program in execution, loaded into physical RAM with its own dynamic runtime context: virtual memory address space, Program Counter, CPU registers, stack, heap, and open file descriptors.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
The binary file \`/usr/bin/node\` on your SSD is a program. When you open three terminals and run three Node.js microservices, the OS creates three independent processes, each with its own PID, stack, and heap.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Program                 │ Process                 │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Nature           │ Passive entity on disk  │ Active entity in RAM    │
│ State            │ Static binary code/data │ Dynamic runtime state   │
│ Resource Usage   │ Disk space only         │ CPU, RAM, registers, FDs│
│ Lifetime         │ Permanent until deleted │ Temporary (starts & ends│
│ Instances        │ Single file on storage  │ Multiple running copies │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Program = Recipe; Process = Cooking the dish in progress.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Can multiple processes share the same program code in RAM?
A: Yes! While each process has private stack and heap regions, the OS marks the text (code) segment read-only and shares the exact same physical memory frames across instances.`
  },

  // ─── 2. Scheduling, Processes and Concurrency ─────────────────────────────
  {
    id: 'os-5',
    title: 'Q5. Difference between a Process and a Thread',
    difficulty: 'Easy',
    tags: ['🔥 Frequently Asked', '⭐ High Priority', 'Process', 'Thread'],
    imageUrl: '/images/os/process-vs-thread.svg',
    imageCaption: 'Process isolated address space vs threads sharing code, heap, and data',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/' }],
    answer: `📌 INTERVIEW ANSWER:
• Process: An independent resource allocation and protection unit with its own private virtual address space (Text, Data, Heap, Stack) managed by a Process Control Block (PCB).
• Thread: A lightweight unit of execution within a process. Threads belonging to the same process share code, global data, heap memory, and open file descriptors, but each thread has its own Program Counter (PC), register set, and private call stack (TCB).

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
A multi-threaded web server process holds the listening socket and in-memory cache; 50 worker threads handle incoming HTTP client connections concurrently by reading and writing to shared memory.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Process                 │ Thread                  │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Address Space    │ Private & fully isolated│ Shared within process   │
│ Creation Cost    │ Heavyweight (alloc VM)  │ Lightweight (alloc stack│
│ Context Switch   │ Expensive (TLB flush)   │ Fast (TLB & VM warm)    │
│ Communication    │ IPC (pipes, sockets)    │ Shared memory variables │
│ Crash Resilience │ Isolated; no crash leak │ Crash kills whole proc  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Process = Private house; Threads = Roommates sharing the living room and kitchen.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Why is thread context switching much faster than process context switching?
A: Because threads share the same page table. Switching threads within the same process does not require reloading CR3 or flushing the CPU Translation Lookaside Buffer (TLB).`
  },
  {
    id: 'os-6',
    title: 'Q6. What are the common states of a Process?',
    difficulty: 'Medium',
    tags: ['⭐ High Priority', 'Process States', 'Lifecycle'],
    imageUrl: '/images/os/process-states.svg',
    imageCaption: '5-state process lifecycle: New, Ready, Running, Waiting, Terminated',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/states-of-a-process-in-operating-systems/' }],
    answer: `📌 INTERVIEW ANSWER:
The standard 5-state process lifecycle:

1. New: The process is being created and its PCB allocated.
2. Ready: The process is loaded into memory and waiting in the ready queue for the CPU scheduler to allocate processing time.
3. Running: Process instructions are actively executing on a CPU core.
4. Waiting / Blocked: The process cannot execute because it is waiting for an external event (I/O completion, disk read, mutex acquisition).
5. Terminated: Execution has finished; exit status remains for parent to reap.

Transitions:
• Running ➔ Waiting: Process blocks on I/O.
• Waiting ➔ Ready: I/O completes (via hardware interrupt).
• Ready ➔ Running: Dispatcher assigns CPU core.
• Running ➔ Ready: Time slice expires (preemption).

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
A process calls \`cin >> x\`. The OS moves it from Running to Waiting. It consumes 0% CPU while waiting for keyboard input. When Enter is pressed, an interrupt moves it to Ready.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
New ➔ Ready ➔ Running ➔ Waiting/Ready ➔ Terminated.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What is the fundamental difference between Ready and Waiting?
A: A Ready process has all required resources and only needs a CPU core. A Waiting process cannot run even if all CPU cores are completely idle.`
  },
  {
    id: 'os-7',
    title: 'Q7. What is a Process Control Block (PCB)?',
    difficulty: 'Medium',
    tags: ['PCB', 'OS Internals', 'Data Structures'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/' }],
    answer: `📌 INTERVIEW ANSWER:
A Process Control Block (PCB, \`task_struct\` in Linux) is a vital kernel data structure that stores all runtime state needed to manage, schedule, and resume an individual process.

Core Components of a PCB:
1. Process Identifier (PID): Unique process ID and Parent PID (PPID).
2. Process State: Current state (Ready, Running, Blocked, Zombie).
3. CPU Registers: General-purpose registers, stack pointer (SP), and Program Counter (PC).
4. CPU Scheduling Info: Process priority, nice value, and scheduling queue pointers.
5. Memory Management: Pointers to base/limit registers or page tables (CR3 register).
6. Accounting Info: Total CPU time consumed, time slices, and account limits.
7. I/O Status: List of open file descriptors, allocated I/O devices, and socket handles.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
When a timer interrupt fires, the kernel saves the current values of all CPU registers directly into process A's PCB, then restores registers from process B's PCB.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
PCB = PID + State + CPU Context + Memory Maps + I/O Descriptors.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Where is the PCB stored?
A: In protected kernel memory space, completely inaccessible to user programs to prevent malicious tampering.`
  },
  {
    id: 'os-8',
    title: 'Q8. What is a Context Switch, and why is it considered overhead?',
    difficulty: 'Medium',
    tags: ['Context Switch', 'Scheduling', 'Performance'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/context-switch-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
A context switch is the mechanism of stopping the currently executing process or thread, saving its register state into its PCB/TCB, and restoring the state of another ready task to resume execution.

Why It Is Considered Overhead:
1. Pure CPU Overhead: The CPU spends cycles executing kernel scheduling logic and memory copies without advancing any user application work.
2. Cache & TLB Pollution: Switching virtual address spaces flushes the Translation Lookaside Buffer (TLB) and invalidates CPU L1/L2 caches, causing subsequent memory accesses to run significantly slower until caches warm up.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
If a scheduling time slice is set to 1ms while a context switch takes 100 microseconds, 10% of total CPU compute power is wasted solely on context switching overhead.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Context Switch = Save old context + Restore new context (zero application work done).

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: How does a thread switch compare to a process switch?
A: A thread switch within the same process saves and restores only registers and stack pointer. It retains the same page table mapping, keeping the CPU cache and TLB warm.`
  },
  {
    id: 'os-9',
    title: 'Q9. Preemptive vs Non-Preemptive Scheduling',
    difficulty: 'Medium',
    tags: ['Scheduling', 'CPU', 'Preemption'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/preemptive-and-non-preemptive-scheduling/' }],
    answer: `📌 INTERVIEW ANSWER:
• Preemptive Scheduling: The OS kernel can forcibly interrupt a currently running process when its allocated time slice (quantum) expires or when a higher-priority task arrives in the ready queue.
• Non-Preemptive Scheduling: Once a process is allocated the CPU, it retains control until it voluntarily yields, requests blocking I/O, or terminates.

Preemption provides high responsiveness and fairness for interactive multi-user operating systems, while non-preemption is simpler but risks starvation and long convoy delays.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Round Robin is preemptive: a CPU-intensive infinite loop cannot freeze your operating system. Classic FCFS is non-preemptive: a runaway task locks the CPU indefinitely.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Preemptive Scheduling   │ Non-Preemptive          │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Interruption     │ OS can forcibly preempt │ Task runs until yield   │
│ Responsiveness   │ High (fair time slices) │ Low (head-of-line wait) │
│ Overhead         │ Higher (frequent switch)│ Minimal context switch  │
│ Starvation Risk  │ Lower (aging supported) │ High if long job runs   │
│ Examples         │ Round Robin, SRTF, CFS  │ FCFS, Non-Preempt SJF   │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Preemptive = OS can snatch CPU; Non-preemptive = Task surrenders CPU voluntarily.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What scheduling algorithm does Linux use?
A: The Completely Fair Scheduler (CFS), a preemptive scheduling algorithm that uses red-black trees to track virtual runtime (\`vruntime\`).`
  },
  {
    id: 'os-10',
    title: 'Q10. Difference between fork() and exec()',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', 'fork', 'exec', 'Linux'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-fork-and-exec/' }],
    answer: `📌 INTERVIEW ANSWER:
• \`fork()\`: Creates a brand-new child process as a duplicate of the caller. The child receives an identical logical copy of the parent's address space (via Copy-on-Write), open file descriptors, and registers, but gets its own unique PID.
• \`exec()\`: Does NOT create a new process. It replaces the current process's memory space (code, data, heap, stack) with a new program image loaded from disk, keeping the same PID.

The standard Unix workflow: parent calls \`fork()\` to create a child, the child calls \`exec()\` to run a new binary, while the parent calls \`wait()\` for completion.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
When you run \`ls -la\` in a bash shell: Bash calls \`fork()\` to spawn a child subshell; the child calls \`execve("/bin/ls")\` to become the \`ls\` program.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ fork()                  │ exec()                  │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Process Creation │ Spawns a brand-new child│ Replaces current process│
│ PID              │ Child gets a new PID    │ PID remains identical   │
│ Address Space    │ Clones parent's space   │ Overwrites with new code│
│ Return Value     │ 0 in child, PID in par. │ Returns ONLY on failure │
│ Typical Usage    │ Parallel task/subshell  │ Executing a new binary  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
fork = Clone child; exec = Transform current process into new program.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Why does \`exec()\` never return on success?
A: Because the caller's text (code) segment has been completely overwritten by the new program's instructions.`
  },
  {
    id: 'os-11',
    title: 'Q11. What are Zombie and Orphan Processes?',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', 'Zombie', 'Orphan', 'Process Lifecycle'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/zombie-and-orphan-processes-in-c/' }],
    answer: `📌 INTERVIEW ANSWER:
• Zombie Process: A process that has finished execution and terminated, but its exit status has not yet been collected by its parent process via \`wait()\` / \`waitpid()\`. It holds no memory or CPU, but occupies an entry in the kernel process table.
• Orphan Process: A child process whose parent process terminated before the child finished. The OS adopts orphan processes by re-parenting them to \`init\` (PID 1) or systemd, which automatically reaps their exit codes when they terminate.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
If a Python server forks a child worker and enters an infinite loop without calling \`wait()\`, the child becomes a \`<defunct>\` zombie in \`ps aux\` when it finishes.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Zombie Process          │ Orphan Process          │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Alive or Dead?   │ Dead (execution ended)  │ Alive (actively running)│
│ Parent Status    │ Parent is still running │ Parent has died/exited  │
│ Resource Usage   │ Process table entry only│ Actively uses CPU & RAM │
│ Adoption         │ Not adopted             │ Re-parented to PID 1    │
│ Solution / Fix   │ Parent calls waitpid()  │ init reaps it upon exit │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Zombie = Dead but unreaped; Orphan = Child running after parent is dead.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Can you kill a zombie process with \`kill -9\`?
A: No, because it is already dead. You must kill its parent process so \`init\` adopts and reaps it.`
  },
  {
    id: 'os-12',
    title: 'Q12. Difference between Concurrency and Parallelism',
    difficulty: 'Easy',
    tags: ['🔥 Frequently Asked', 'Concurrency', 'Parallelism'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-concurrency-and-parallelism/' }],
    answer: `📌 INTERVIEW ANSWER:
• Concurrency: Structuring a system to handle multiple tasks making progress over overlapping periods of time. Tasks can be interleaved on a single CPU core via rapid time-slicing.
• Parallelism: Executing multiple computational tasks simultaneously at the exact same physical instant, which strictly requires multiple physical CPU cores or execution units.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• 1 CPU core time-slicing between your browser and Spotify = Concurrency.
• 8 CPU cores running 8 video encoding threads simultaneously = Parallelism.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Concurrency             │ Parallelism             │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Core Concept     │ Dealing with many tasks │ Doing many tasks at once│
│ Hardware Need    │ Works on 1 single core  │ Requires multiple cores │
│ Mechanism        │ Interleaving/time-slice │ Simultaneous execution  │
│ Focus            │ Application structure   │ Computational throughput│
│ Analogy          │ Juggling 3 balls 1 hand │ 2 people juggling balls │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Concurrency = Dealing with many things; Parallelism = Doing many things at once.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Can you have concurrency without parallelism?
A: Yes! A single-core CPU running a multitasking OS provides concurrency via rapid context switching.`
  },
  {
    id: 'os-13',
    title: 'Q13. What is a Race Condition, and what is a Critical Section?',
    difficulty: 'Medium',
    tags: ['Race Condition', 'Critical Section', 'Concurrency'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/race-condition-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
• Race Condition: A concurrency flaw where the correctness and output of a program depends on the non-deterministic timing, order, or interleaving of threads accessing shared mutable state.
• Critical Section: The specific segment of code accessing shared resources (memory variables, files, tables) that must not be executed concurrently by more than one thread.

A valid synchronization mechanism must satisfy three criteria:
1. Mutual Exclusion: At most one thread can be in the critical section at a time.
2. Progress: Waiting threads must eventually be selected if the section is free.
3. Bounded Waiting: No thread should starve indefinitely waiting to enter.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Two threads execute \`balance = balance + 100\` concurrently when \`balance = 500\`. Both read 500 into registers, both compute 600, and both write 600 back. Total balance is 600 instead of 700 due to a race condition.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Race = Timing-dependent data corruption; Critical Section = Shared-data code to guard.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Why is \`count++\` not thread-safe even though it is one line in C/Java?
A: Because it compiles into 3 assembly instructions: 1. Read memory into register, 2. Increment register, 3. Write register back to memory. A context switch between steps 1 and 3 corrupts data.`
  },
  {
    id: 'os-14',
    title: 'Q14. Mutex vs Semaphore',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', '⭐ High Priority', 'Mutex', 'Semaphore'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/mutex-vs-semaphore/' }],
    answer: `📌 INTERVIEW ANSWER:
• Mutex (Mutual Exclusion): A locking mechanism with strict thread ownership semantics. Only the thread that acquired the mutex is permitted to release it. Used to protect a single shared critical section.
• Semaphore: A signaling mechanism based on an atomic integer counter without ownership semantics. Threads call \`wait()\` (\`P()\`) to decrement/block and \`signal()\` (\`V()\`) to increment/wake. Any thread can signal a semaphore to awaken another thread.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• Mutex: Protecting access to a shared in-memory hash table.
• Semaphore: Managing a pool of 10 database connections (counting semaphore initialized to 10).

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Mutex                   │ Semaphore               │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Mechanism        │ Locking mechanism       │ Signaling mechanism     │
│ Ownership        │ Strict thread ownership │ No ownership (any signal│
│ Capacity         │ Binary only (0 or 1)    │ Integer count (0 to N)  │
│ Purpose          │ Mutual exclusion lock   │ Resource pool & order   │
│ Release Rule     │ ONLY locking thread     │ Any thread can signal   │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Mutex = Key to a single-person restroom; Semaphore = Bowling alley ball rack with N balls available.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What happens if a thread holding a mutex crashes?
A: The mutex remains permanently locked, deadlocking all waiting threads unless robust futex recovery or timed acquisitions are used.`
  },
  {
    id: 'os-15',
    title: 'Q15. What is Deadlock, and what four conditions are required?',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', '⭐ High Priority', 'Deadlock', 'Coffman'],
    imageUrl: '/images/os/deadlock-cycle.svg',
    imageCaption: 'Deadlock circular wait: Thread 1 holds A and wants B; Thread 2 holds B and wants A',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
A Deadlock is a state where a set of concurrent processes are permanently blocked because each holds a resource while waiting for another resource held by another process in the set.

All 4 Coffman conditions must hold simultaneously for a deadlock:
1. Mutual Exclusion: Resources cannot be shared simultaneously.
2. Hold and Wait: A process holds at least one resource while waiting for additional resources.
3. No Preemption: Resources cannot be forcibly revoked; must be released voluntarily.
4. Circular Wait: A closed chain of processes P0 ➔ P1 ➔ ... ➔ Pn ➔ P0 exists where each waits for a resource held by the next.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Thread 1 locks Account A and waits for Account B. Thread 2 locks Account B and waits for Account A. Neither can advance; both are deadlocked indefinitely.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
M-H-N-C: Mutual exclusion, Hold-and-wait, No preemption, Circular wait. Breaking ANY ONE condition prevents deadlock.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Does a cycle in a Resource Allocation Graph (RAG) always guarantee deadlock?
A: Only if all resource types have a single instance. If resource types have multiple instances, a cycle is necessary but not sufficient.`
  },
  {
    id: 'os-16',
    title: 'Q16. How can an Operating System handle deadlocks?',
    difficulty: 'Medium',
    tags: ['Deadlock Handling', 'Banker Algorithm'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/deadlock-prevention/' }],
    answer: `📌 INTERVIEW ANSWER:
Operating systems handle deadlocks using four main strategies:

1. Deadlock Prevention: Structurally invalidate at least one Coffman condition (e.g. enforce strict global lock ordering to eliminate Circular Wait).
2. Deadlock Avoidance: Dynamically evaluate safety before granting any resource request using algorithms like Dijkstra's Banker's Algorithm (allocates only if the system remains in a Safe State).
3. Deadlock Detection & Recovery: Allow deadlocks to occur, run periodic cycle detection on Wait-For Graphs, and recover by terminating victim processes or preempting resources.
4. Deadlock Ignorance (Ostrich Algorithm): Pretend deadlocks never happen. Used by general-purpose operating systems (Linux, Windows) because deadlocks are rare and preventative runtime overhead is too high.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Enforcing that all database transactions acquire table locks in alphabetical order (\`Lock(Accounts)\` before \`Lock(Transactions)\`) structurally eliminates circular wait.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Prevent, Avoid, Detect & Recover, Ignore (Ostrich).

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What is the main drawback of Banker's Algorithm in real-world systems?
A: It requires applications to state their maximum resource needs in advance, which is impossible for modern dynamic applications.`
  },
  {
    id: 'os-17',
    title: 'Q17. Deadlock vs Starvation vs Livelock',
    difficulty: 'Medium',
    tags: ['Deadlock', 'Starvation', 'Livelock', 'Comparison'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-deadlock-starvation-and-livelock/' }],
    answer: `📌 INTERVIEW ANSWER:
• Deadlock: Processes are permanently blocked waiting for resources held by each other; threads are dormant with 0% CPU consumption.
• Starvation: A runnable process is indefinitely delayed because higher-priority processes continually receive the CPU/resources; the process can run, but is neglected.
• Livelock: Processes actively change states in response to each other, consuming 100% CPU, but make zero forward progress.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• Deadlock: Two cars meeting on a narrow single-lane bridge refusing to reverse.
• Starvation: A low-priority thread waiting at a mutex that is continuously grabbed by high-priority threads.
• Livelock: Two polite people in a hallway repeatedly stepping to the exact same side at the same time to let each other pass.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌───────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Dimension     │ Deadlock        │ Starvation      │ Livelock        │
├───────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Process State │ Blocked/Waiting │ Ready to run    │ Actively running│
│ CPU Usage     │ 0% CPU consumed │ 0% (unscheduled)│ 100% CPU pegged │
│ Resolution    │ Kill or restart │ Aging algorithm │ Random backoff  │
│ Cause         │ Circular wait   │ Unfair priority │ State reaction  │
└───────────────┴─────────────────┴─────────────────┴─────────────────┘

💡 MEMORY TRICK:
Deadlock = Stuck; Starvation = Ignored; Livelock = Moving fast but getting nowhere.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: How is starvation solved in CPU schedulers?
A: Using Aging: the longer a process waits in the ready queue without running, the higher the kernel increments its priority.`
  },
  {
    id: 'os-18',
    title: 'Q18. What is Inter-Process Communication (IPC)?',
    difficulty: 'Medium',
    tags: ['IPC', 'Processes', 'Pipes', 'Sockets'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/inter-process-communication-ipc/' }],
    answer: `📌 INTERVIEW ANSWER:
Inter-Process Communication (IPC) is the set of mechanisms provided by the operating system allowing independent, memory-isolated processes to exchange data and synchronize execution.

Key IPC Mechanisms:
1. Pipes (Anonymous): Unidirectional byte streams between related processes (parent-child).
2. Named Pipes (FIFOs): File-system-backed communication between unrelated processes.
3. Shared Memory: Fastest local IPC; processes map identical physical memory pages into their address spaces (requires mutex/semaphore synchronization).
4. Message Queues: Kernel-managed queues of structured, typed messages.
5. Sockets: Bidirectional byte streams across networks (TCP/UDP) or locally via Unix Domain Sockets.
6. Signals: Asynchronous kernel notifications (e.g. SIGINT, SIGKILL, SIGSEGV).

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
The terminal command \`cat access.log | grep 500 | wc -l\` creates three separate processes connected via anonymous Unix pipes.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
IPC = Pipes, Messages, Shared Memory, Sockets, Signals.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Why is Shared Memory the fastest IPC mechanism?
A: Because once the memory mapping is established, reads and writes occur directly in RAM at bus speed without copying data into kernel space.`
  },

  // ─── 3. Memory Management and Virtual Memory ──────────────────────────────
  {
    id: 'os-19',
    title: 'Q19. Paging vs Segmentation',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', '⭐ High Priority', 'Paging', 'Segmentation'],
    imageUrl: '/images/os/paging-vs-segmentation.svg',
    imageCaption: 'Paging maps fixed-size virtual pages to physical frames via page tables',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-paging-and-segmentation/' }],
    answer: `📌 INTERVIEW ANSWER:
• Paging: Divides virtual address space into fixed-size blocks called Pages (typically 4KB) and physical memory into matching blocks called Frames. The hardware MMU and Page Tables translate virtual addresses (Page Number + Offset) to physical frames. Avoids external fragmentation; has minor internal fragmentation on the final page.
• Segmentation: Divides address space into variable-sized logical units reflecting program structure (Code, Data, Stack, Heap). Addresses consist of Segment Number + Offset. Eliminates internal fragmentation, but causes severe external fragmentation.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
With 4KB pages, allocating a 10KB buffer consumes 3 pages (12KB), leaving 2KB of internal fragmentation in the third page.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Paging                  │ Segmentation            │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Block Size       │ Fixed size (e.g. 4KB)   │ Variable logical size   │
│ Responsibility   │ Hardware MMU & OS       │ Compiler & Programmer   │
│ Address Division │ Page Number + Offset    │ Segment Number + Offset │
│ Fragmentation    │ Internal (on last page) │ External (free holes)   │
│ Modern Usage     │ Universal in modern OS  │ Mostly deprecated/hybrid│
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Paging = Fixed-size tiles; Segmentation = Custom-cut pieces.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Do modern 64-bit systems still use segmentation?
A: In x86-64 long mode, segmentation is essentially disabled (base address forced to 0 for CS, DS, ES, SS), leaving flat paging as the sole memory architecture.`
  },
  {
    id: 'os-20',
    title: 'Q20. What is Virtual Memory, and what is Demand Paging?',
    difficulty: 'Hard',
    tags: ['⭐ High Priority', 'Virtual Memory', 'Demand Paging'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
• Virtual Memory: A memory abstraction providing each process with an isolated, contiguous, private address space translated to physical RAM or secondary storage by the hardware MMU and page tables.
• Demand Paging: A lazy-loading memory architecture where pages are NOT loaded into RAM when a program launches. A page is brought from secondary storage into physical RAM only when referenced for the first time, triggering a Page Fault.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
A 64-bit executable reserves 16GB of virtual address space. If the user only navigates through two menus during execution, the OS only loads ~30MB of physical RAM frames.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Virtual Memory = Illusion of unlimited private memory; Demand Paging = Never load a page until accessed.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Does virtual memory make disk storage as fast as RAM?
A: No. RAM access takes ~50-100 nanoseconds; reading a page from an SSD takes ~50-100 microseconds (1,000x slower), and magnetic disk takes ~10 milliseconds (100,000x slower).`
  },
  {
    id: 'os-21',
    title: 'Q21. What is a TLB, and why is it important?',
    difficulty: 'Medium',
    tags: ['⭐ High Priority', 'TLB', 'MMU', 'Hardware'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/translation-lookaside-buffer-tlb-in-paging/' }],
    answer: `📌 INTERVIEW ANSWER:
A Translation Lookaside Buffer (TLB) is a high-speed hardware associative cache built directly into the CPU's Memory Management Unit (MMU) that stores recent virtual-to-physical page table translations.

Why It Is Crucial:
Without a TLB, translating every single virtual memory address on a 64-bit multi-level page table architecture requires 4 to 5 memory lookups in RAM, quadrupling memory latency.
• TLB Hit: Address translated in a single clock cycle (<1ns).
• TLB Miss: MMU walks multi-level page tables in RAM (~50ns) and populates the TLB.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Looping linearly through a large array access elements on the same 4KB page 1,024 times consecutively; after the first TLB miss, the remaining 1,023 accesses are instant TLB hits.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
TLB = Hardware cache for virtual page addresses.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Is a TLB miss the same as a page fault?
A: No! A TLB miss means the translation is missing from the CPU hardware cache, but the page usually exists in physical RAM. A page fault means the page is NOT resident in physical RAM at all.`
  },
  {
    id: 'os-22',
    title: 'Q22. What is a Page Fault, and how does the OS handle it?',
    difficulty: 'Hard',
    tags: ['🔥 Frequently Asked', 'Page Fault', 'Interrupt', 'MMU'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/page-fault-handling-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
A Page Fault is a hardware exception raised by the MMU when a process references a virtual page whose present bit in the page table is 0 (not in physical RAM) or violates access permissions.

OS Handling Steps:
1. Trap to Kernel: CPU suspends instruction and traps into kernel page fault handler.
2. Address Validation: Kernel checks address against process Virtual Memory Areas (VMA).
3. Check Invalid Access: If invalid address ➔ kernel raises SIGSEGV (Segmentation Fault).
4. Frame Allocation: If valid ➔ kernel finds a free physical frame (or evicts victim page).
5. Disk I/O: Kernel schedules disk read to fetch page from swap/binary; process sleeps.
6. Page Table Update: Once read, kernel writes frame address to page table (present bit = 1).
7. TLB Invalidation: Flushes corresponding TLB entry.
8. Instruction Restart: CPU restarts the exact machine instruction that faulted.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Memory-mapping a 2GB file with \`mmap()\`: initial access triggers a page fault; the OS loads that block into the page cache and resumes execution transparently.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Page Fault = Memory access needs OS kernel intervention to load or map page.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Do all page faults require reading from disk?
A: No. Minor page faults (allocating zeroed pages for heap expansion or Copy-on-Write page duplications) are resolved entirely in RAM without any disk I/O.`
  },
  {
    id: 'os-23',
    title: 'Q23. Page Replacement Algorithms and Belady\'s Anomaly',
    difficulty: 'Hard',
    tags: ['Page Replacement', 'LRU', 'FIFO', 'Belady'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/' }],
    answer: `📌 INTERVIEW ANSWER:
When a page fault occurs and all physical RAM frames are occupied, the OS page replacement algorithm selects which resident page to evict:

1. FIFO: Evicts the oldest page loaded into RAM. Simple, but can evict frequently used pages.
2. Optimal (OPT): Evicts the page that will not be referenced for the longest time in the future. Theoretical upper bound; impossible to implement in practice.
3. LRU (Least Recently Used): Evicts the page that has not been referenced for the longest past time. High hit rate.
4. Clock / Second-Chance: Hardware-efficient approximation of LRU using a circular list and reference bits.

Belady's Anomaly:
The counter-intuitive phenomenon where allocating MORE page frames results in MORE page faults. Can occur in FIFO, but is impossible in stack-based algorithms like LRU and OPT.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
FIFO on reference string \`1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5\` produces 9 page faults on 3 frames, but 10 page faults on 4 frames!

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Algorithm        │ Eviction Criteria       │ Belady's Anomaly?       │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ FIFO             │ Oldest loaded frame     │ YES (can increase faults│
│ Optimal (OPT)    │ Farthest future access  │ NO (theoretical best)   │
│ LRU              │ Least recently used past│ NO (stack algorithm)    │
│ Clock / 2nd Ch.  │ Oldest with ref bit = 0 │ NO (LRU approximation)  │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
FIFO = Oldest; LRU = Least recently used; OPT = Farthest future; Clock = Circular second chance.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Why do production operating systems use Clock instead of pure LRU?
A: Because pure LRU requires updating a timestamp or moving a linked list node on EVERY single memory access, causing massive CPU performance degradation.`
  },
  {
    id: 'os-24',
    title: 'Q24. What is Thrashing, and how can it be controlled?',
    difficulty: 'Hard',
    tags: ['Thrashing', 'Virtual Memory', 'Performance'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/techniques-to-handle-thrashing/' }],
    answer: `📌 INTERVIEW ANSWER:
Thrashing occurs when an operating system spends more time moving pages between RAM and swap storage than executing useful application instructions.

Cause:
The aggregate Working Set (the set of pages actively referenced) of all running processes exceeds total physical RAM. Because RAM is saturated, every page fault forces an eviction of a page that is needed immediately, triggering continuous page faults. Disk activity reaches 100% while CPU utilization drops to near zero.

Mitigation Strategies:
1. Decrease Multiprogramming: Suspend or terminate low-priority processes.
2. Working Set Model: Monitor each process's working set window and only schedule processes whose complete working set fits in RAM.
3. Page Fault Frequency (PFF): Dynamically adjust frame allocations based on fault rates.
4. Add Physical RAM: Expand memory capacity.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Opening 50 heavy browser tabs on an 8GB laptop causes disk activity to spike to 100% and UI freeze because the OS spends all its time swapping memory pages.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Thrashing = Too many page faults, disk pegged at 100%, zero CPU progress.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What is a process's Working Set?
A: The set of distinct virtual pages referenced by that process during the most recent time window Delta.`
  },
  {
    id: 'os-25',
    title: 'Q25. What happens inside the OS when a program opens and reads a file?',
    difficulty: 'Medium',
    tags: ['VFS', 'File System', 'Page Cache', 'System Calls'],
    imageUrl: '/images/os/file-read-path.svg',
    imageCaption: 'File open and read pipeline: Application ➔ System Call ➔ VFS ➔ Page Cache / Disk',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/file-system-in-operating-system/' }],
    answer: `📌 INTERVIEW ANSWER:
Step-by-Step OS Execution Flow:

1. \`open("/data/report.csv", O_RDONLY)\`:
• Library wrapper triggers \`syscall\` trap into kernel mode.
• Virtual File System (VFS) resolves path, checks inode permissions, and allocates an entry in the system-wide open file table.
• Kernel returns a File Descriptor (FD) integer to the application.

2. \`read(fd, buffer, 4096)\`:
• Enters kernel mode. Kernel checks the OS Page Cache in RAM.
• Cache Hit: Data already resident in RAM; kernel copies bytes directly into user \`buffer\` via \`copy_to_user()\`.
• Cache Miss: Kernel requests block device driver to fetch sectors via DMA, puts process in Waiting state, handles completion interrupt, copies data to user buffer, and increments file offset pointer.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
Running \`grep\` on a 1GB file twice: the first run takes 1.5 seconds (disk read); the second run takes 0.05 seconds because all blocks are served directly from the Linux RAM page cache.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
Syscall ➔ VFS inode lookup ➔ Page Cache check ➔ Disk DMA on miss ➔ User buffer copy.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Does every \`read()\` touch physical disk?
A: No! If data resides in the OS Page Cache, zero disk I/O occurs.`
  },
  {
    id: 'os-26',
    title: 'Q26. What is Fragmentation? Internal vs External Fragmentation',
    difficulty: 'Easy',
    tags: ['Memory Management', 'Fragmentation', 'Paging'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-internal-and-external-fragmentation/' }],
    answer: `📌 INTERVIEW ANSWER:
Fragmentation is unutilized, wasted memory resulting from dynamic memory allocation patterns:

• Internal Fragmentation: Memory allocated to a partition or block is larger than the requested payload; the unused memory is trapped INSIDE the allocated boundary.
• External Fragmentation: Total free memory across the system is sufficient to satisfy an allocation request, but free memory is fragmented into non-contiguous small chunks OUTSIDE allocated boundaries.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• Internal: Requesting 5KB in an 8KB fixed block wastes 3KB inside that block.
• External: You have 100MB of free RAM distributed as 1,000 fragmented 100KB holes; an allocation request for one contiguous 10MB buffer fails.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Internal Fragmentation  │ External Fragmentation  │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Location         │ Inside allocated block  │ Outside allocated blocks│
│ Occurs in        │ Fixed-size allocation   │ Dynamic-size allocation │
│ Cause            │ Block larger than data  │ Scattered free holes    │
│ Solution         │ Smaller page/block size │ Compaction or Paging    │
│ Paging Impact    │ Occurs on last page     │ Completely eliminated   │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Internal = Wasted inside the block; External = Scattered holes between blocks.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: How does paging eliminate external fragmentation?
A: By dividing physical RAM into uniform fixed-size frames (4KB), any free frame can satisfy any virtual page request regardless of its physical location.`
  },

  // ─── 4. Kernel Architecture and Advanced Concepts ─────────────────────────
  {
    id: 'os-27',
    title: 'Q27. What are the main types of Kernels?',
    difficulty: 'Medium',
    tags: ['Kernel', 'Monolithic', 'Microkernel', 'Architecture'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/types-of-operating-system-kernels/' }],
    answer: `📌 INTERVIEW ANSWER:
1. Monolithic Kernel: All core operating system services (scheduler, virtual memory, filesystems, networking, device drivers) execute in a single privileged kernel address space (Ring 0). Highly performant, but a single driver bug can cause a Kernel Panic (e.g. Linux).
2. Microkernel: Keeps only absolute minimal mechanisms inside privileged kernel mode (basic IPC, low-level scheduling, primitive memory mapping). Device drivers, filesystems, and network stacks run as isolated user-space servers (Ring 3). Highly crash-resilient, but incurs performance overhead due to frequent message-passing IPC (e.g. QNX, seL4, Minix).
3. Hybrid Kernel: Combines monolithic speed with microkernel architecture by running key drivers inside kernel space while maintaining modular boundaries (e.g. Windows NT, macOS XNU).

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
In QNX (microkernel), if a USB driver crashes, only that user daemon restarts; in a monolithic kernel, a kernel-mode driver bug crashes the entire machine.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌───────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Dimension     │ Monolithic      │ Microkernel     │ Hybrid Kernel   │
├───────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Driver Space  │ Ring 0 (Kernel) │ Ring 3 (User)   │ Mixed in Ring 0 │
│ Performance   │ Maximum speed   │ Slower (IPC cost│ Near-monolithic │
│ Crash Safety  │ Bug panics OS   │ High isolation  │ Driver can panic│
│ Codebase Size │ Very large core │ Minimal core    │ Large core      │
│ Real Examples │ Linux, FreeBSD  │ QNX, seL4, Minix│ Windows NT, XNU │
└───────────────┴─────────────────┴─────────────────┴─────────────────┘

💡 MEMORY TRICK:
Monolithic = Everything in kernel; Microkernel = Minimal kernel + user drivers; Hybrid = Blend.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: How does Linux achieve modularity without rebooting?
A: Through Loadable Kernel Modules (LKMs), which can be dynamically inserted (\`insmod\`) and removed (\`rmmod\`) from kernel space at runtime.`
  },
  {
    id: 'os-28',
    title: 'Q28. Multiprogramming vs Multitasking vs Multiprocessing',
    difficulty: 'Medium',
    tags: ['Multiprogramming', 'Multitasking', 'Multiprocessing'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-multiprogramming-multitasking-multithreading-and-multiprocessing/' }],
    answer: `📌 INTERVIEW ANSWER:
• Multiprogramming: An execution model where multiple programs reside in memory simultaneously so that when the currently running program blocks on I/O, the OS switches the CPU to another job, maximizing CPU utilization.
• Multitasking: A logical extension of multiprogramming (time-sharing) where the CPU rapidly time-slices among multiple tasks using small time quanta, providing interactive responsiveness for users.
• Multiprocessing: A hardware architecture featuring two or more physical CPU cores/processors, allowing true simultaneous parallel execution of multiple programs.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• Multiprogramming: Switches batch jobs when one waits on disk.
• Multitasking: Smoothly playing music while you type code in an editor.
• Multiprocessing: Distributing 8 tasks across 8 physical processor cores.

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌───────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Dimension     │ Multiprogramming│ Multitasking    │ Multiprocessing │
├───────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Primary Goal  │ Maximize CPU use│ User response   │ High throughput │
│ Switch Trigger│ I/O wait / yield│ Time quantum exp│ Parallel cores  │
│ Hardware Need │ 1 CPU core      │ 1 CPU core      │ Multiple CPUs   │
│ Concurrency   │ Interleaved     │ Time-sliced     │ True Parallel   │
└───────────────┴─────────────────┴─────────────────┴─────────────────┘

💡 MEMORY TRICK:
Multiprogramming = CPU utilization; Multitasking = User responsiveness; Multiprocessing = Multiple physical processors.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: Can multitasking occur on a single-core processor?
A: Yes! Through rapid context switching that creates the illusion of simultaneous execution.`
  },
  {
    id: 'os-29',
    title: 'Q29. Interrupt vs Exception',
    difficulty: 'Easy',
    tags: ['Interrupt', 'Exception', 'Traps', 'Hardware'],
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/difference-between-interrupt-and-exception/' }],
    answer: `📌 INTERVIEW ANSWER:
• Interrupt (Hardware Interrupt): An asynchronous signal initiated by an external hardware device independent of the currently executing CPU instruction stream (e.g. keyboard press, network packet arrival, timer tick).
• Exception (Software Interrupt / Trap / Fault): A synchronous event generated directly by the CPU as a result of executing a specific instruction (e.g. divide by zero, page fault, invalid opcode, or an explicit \`syscall\` instruction).

Both mechanisms cause the CPU to suspend current execution and branch to an Interrupt Service Routine (ISR) via the Interrupt Descriptor Table (IDT).

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
• A timer tick expiring a process time slice = Hardware Interrupt.
• A program dividing \`10 / 0\` = CPU Exception (SIGFPE).

─────────────────────────────────────────────────────────────
📊 COMPARISON MATRIX:
┌──────────────────┬─────────────────────────┬─────────────────────────┐
│ Dimension        │ Hardware Interrupt      │ Exception / Trap        │
├──────────────────┼─────────────────────────┼─────────────────────────┤
│ Timing           │ Asynchronous (anytime)  │ Synchronous (on inst)   │
│ Trigger Source   │ External hardware device│ CPU executing code      │
│ Reproducibility  │ Non-deterministic timing│ Reproducible on re-exec │
│ Examples         │ Keyboard, NIC, Timer    │ Div-by-zero, Page Fault │
│ Masking          │ Can be masked/disabled  │ Non-maskable faults     │
└──────────────────┴─────────────────────────┴─────────────────────────┘

💡 MEMORY TRICK:
Interrupt = Asynchronous external hardware tap; Exception = Synchronous internal instruction error.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: How does the CPU know which handler code to execute when an interrupt fires?
A: It indexes into the Interrupt Descriptor Table (IDT) using the interrupt vector number to fetch the handler's kernel address.`
  },
  {
    id: 'os-30',
    title: 'Q30. What is Copy-on-Write, and why is it useful?',
    difficulty: 'Medium',
    tags: ['🔥 Frequently Asked', '⭐ High Priority', 'Copy-on-Write', 'fork', 'Virtual Memory'],
    imageUrl: '/images/os/copy-on-write.svg',
    imageCaption: 'Parent and child share read-only pages; write triggers private page duplication',
    links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/copy-on-write/' }],
    answer: `📌 INTERVIEW ANSWER:
Copy-on-Write (CoW) is a resource management optimization where multiple processes initially share identical physical memory pages marked as read-only in their page tables.

How It Operates:
1. When \`fork()\` is called, the child's page table duplicates the parent's page table references instead of copying physical RAM frames. All pages are flagged read-only.
2. If either process only reads memory, zero copying occurs.
3. When either process attempts to write to a page, the MMU catches the write violation and triggers a protection Page Fault.
4. The OS kernel catches the fault, allocates a new physical frame, copies the 4KB page content, updates the writer's page table with write permission, and resumes execution.

Why It Is Invaluable:
It eliminates the massive overhead of eagerly duplicating gigabytes of RAM during \`fork()\`, especially when the child process immediately calls \`exec()\`.

─────────────────────────────────────────────────────────────
📋 REAL-WORLD EXAMPLE:
A Redis server performing background persistence (\`BGSAVE\`) calls \`fork()\`. The child writes the snapshot to disk using CoW pages while the parent Redis process continues handling client writes, copying only the specific pages modified during the backup.

─────────────────────────────────────────────────────────────
💡 MEMORY TRICK:
CoW = Share pages read-only; duplicate private frame only when written to.

❓ LIKELY INTERVIEW FOLLOW-UP:
Q: What would happen to Redis \`BGSAVE\` without Copy-on-Write?
A: Every snapshot would duplicate the entire 16GB+ RAM footprint of the parent process, consuming 2x memory and causing substantial latency spikes.`
  }
];
