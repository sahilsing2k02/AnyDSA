import type { Pattern } from '../types';

export const lldQuestions: Pattern[] = [
  {
    id: 'lld-machine-coding',
    name: '1. Classic Machine Coding Systems',
    description: 'Object-Oriented Design for real-world applications with clean separation, extensible models, and patterns.',
    icon: '🏗️',
    problems: [
      {
        id: 'lld-1',
        title: 'Design a Parking Lot System',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-parking-lot-using-object-oriented-principles/' }],
        tags: ['ParkingLot', 'StrategyPattern', 'Factory'],
        answer: `Requirements:
• Multiple floors with distinct spot types: Compact, Large, Handicapped, Motorcycle.
• Support entry/exit gates with automated ticket issuing and fee calculation based on duration.
• Dynamic parking spot allocation strategy (Nearest-to-entry, lowest floor first).

Core Classes:
1. Vehicle (abstract): String licensePlate, VehicleType type -> Car, Bike, Truck subclasses.
2. ParkingSpot (abstract): int spotNumber, int floor, boolean isOccupied, SpotType type.
3. ParkingTicket: String ticketId, Vehicle vehicle, ParkingSpot spot, Instant entryTime.
4. IParkingStrategy (Strategy Pattern): findSpot(VehicleType type, List<Floor> floors).
5. FeeCalculationStrategy: calculateFee(ParkingTicket ticket). Hourly / Daily / Vehicle-weighted rates.
6. ParkingLot (Singleton): List<Floor> floors, List<Gate> entryGates, List<Gate> exitGates.`
      },
      {
        id: 'lld-2',
        title: 'Design an LRU Cache (Least Recently Used)',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/lru-cache/' }],
        tags: ['LRUCache', 'DoublyLinkedList', 'HashMap'],
        answer: `Requirement:
O(1) time complexity for both get(key) and put(key, value). Capacity N. Evicts the least recently accessed item when full.

Data Structure:
• HashMap<K, Node>: Enables O(1) key lookup.
• Doubly Linked List with dummy Head and Tail: Enables O(1) removal of arbitrary node and O(1) insertion at head (Most Recently Used).

Algorithm:
• get(key): If key not in map, return -1. Otherwise, fetch node from map, detach it from its current position in the DLL, move it to the head, and return its value.
• put(key, value): If key exists, update value and move node to head. If key is new:
  - If size == capacity: remove tail.prev (LRU node) from DLL and delete its key from map.
  - Allocate new node, insert at head, and insert into map.`
      },
      {
        id: 'lld-3',
        title: 'Design Snake and Ladder Game',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/snake-ladder-problem-using-oop/' }],
        tags: ['GameDesign', 'Queue', 'BoardGame'],
        answer: `Requirements:
• N x N board (typically 100 cells), standard 1-6 dice, 2+ players.
• Snakes (tail < head) pull player down; Ladders (top > bottom) pull player up.
• First player reaching exact 100 wins.

Core Classes:
1. Cell: int position, Optional<Snake> snake, Optional<Ladder> ladder.
2. Jumper: int start, int end (Base class for Snake: start > end, and Ladder: start < end).
3. Board: int size, Map<Integer, Jumper> jumpers. getNextPosition(int current, int diceRoll).
4. Dice: int count, roll() -> returns random int between 1 and 6*count.
5. Player: String id, String name, int currentPosition.
6. Game: Queue<Player> players, Board board, Dice dice, GameStatus status.
   - Loop: Pop player from queue -> roll dice -> compute nextPos = current + roll -> check for jumper -> update player pos -> check if pos == 100 (Winner!) -> push player to back of queue.`
      },
      {
        id: 'lld-4',
        title: 'Design Tic-Tac-Toe Game with O(1) Move Validation',
        difficulty: 'Medium',
        links: [{ platform: 'LeetCode', url: 'https://leetcode.com/problems/design-tic-tac-toe/' }],
        tags: ['TicTacToe', 'Game', 'Math'],
        answer: `Requirement:
N x N grid, 2 players (X and O). Validate win condition after every move in O(1) time rather than O(N) scanning.

O(1) Verification Technique:
• Maintain:
  - rows[N]: tracks balance for each row (+1 for Player 1, -1 for Player 2).
  - cols[N]: tracks balance for each column.
  - diagonal: tracks main diagonal (r == c).
  - antiDiagonal: tracks anti-diagonal (r + c == N - 1).
• When Player makes move at (r, c):
  - let delta = (player == 1) ? 1 : -1;
  - rows[r] += delta; cols[c] += delta;
  - if (r == c) diagonal += delta;
  - if (r + c == N - 1) antiDiagonal += delta;
  - If Math.abs(rows[r]) == N || Math.abs(cols[c]) == N || Math.abs(diagonal) == N || Math.abs(antiDiagonal) == N -> Player WINS!`
      },
      {
        id: 'lld-5',
        title: 'Design an API Rate Limiter (Token Bucket & Sliding Window)',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-a-rate-limiter/' }],
        tags: ['RateLimiter', 'TokenBucket', 'SlidingWindow'],
        answer: `Algorithms:
1. Token Bucket: Bucket holds up to maxCapacity tokens. Tokens refill at constant rate R tokens/sec. Each request consumes 1 token. If bucket empty, request rejected (HTTP 429).
   - O(1) space, allows bursts up to capacity.
   - Implementation: Store (tokens, lastRefillTimestamp). On request: newTokens = (now - lastRefill) * rate; tokens = min(capacity, tokens + newTokens); if (tokens >= 1) { tokens--; return allow; }
2. Sliding Window Counter:
   - Divides time into small windows. Computes weight: countInCurrentWindow + countInPrevWindow * (1 - timeElapsedInCurrent / windowSize).
   - Smooths boundary burst issues of Fixed Window.`
      },
      {
        id: 'lld-6',
        title: 'Design an Elevator Management System',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-an-elevator-system/' }],
        tags: ['Elevator', 'StatePattern', 'Scheduling'],
        answer: `Requirements:
• N elevators serving M floors. Handle internal requests (passenger presses floor button inside cab) and external requests (hall call button UP/DOWN on a floor).
• Optimize wait time and power efficiency using the SCAN/Elevator (LOOK) algorithm.

Core Classes:
1. Elevator: int id, int currentFloor, Direction (UP, DOWN, IDLE), State (MOVING, STOPPED, MAINTENANCE), TreeSet<Integer> upStops, TreeSet<Integer> downStops.
2. Request: int sourceFloor, int destinationFloor, Direction direction.
3. ElevatorController: Manages individual elevator state machine, door opening/closing timers, and step movement.
4. Dispatcher / ElevatorSystem: Dispatches external requests to the optimal elevator based on proximity and matching direction.`
      }
    ]
  },
  {
    id: 'lld-popular-apps',
    name: '2. Popular App & Service Architectures',
    description: 'Low-level design for industry-standard apps: BookMyShow, Splitwise, Vending Machine, and Notification Engine.',
    icon: '📱',
    problems: [
      {
        id: 'lld-7',
        title: 'Design Movie Ticket Booking System (BookMyShow)',
        difficulty: 'Hard',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-movie-ticket-booking-system-like-bookmyshow/' }],
        tags: ['BookMyShow', 'Concurrency', 'Transactions'],
        answer: `Core Challenge: Concurrency & Seat Locking (preventing double bookings).

Entities:
• Theater, Screen, Seat (seatNumber, SeatType: Regular, VIP).
• Movie, Show (ShowTime, Screen, Movie).
• ShowSeat: SeatStatus (AVAILABLE, TEMPORARILY_LOCKED, BOOKED), lockAcquiredTime.
• Booking: bookingId, User, Show, List<ShowSeat>, PaymentStatus, totalAmount.

Concurrency Handling:
• Temporary Lock: When user selects seats, acquire temporary lock (e.g. 10-minute Redis TTL or DB row lock with lock_expiry timestamp).
• Atomic Transition: UPDATE show_seat SET status = 'LOCKED', lock_expiry = NOW() + INTERVAL 10 MINUTE WHERE show_seat_id IN (...) AND status = 'AVAILABLE'.
• If payment completes within 10 mins: Transition to 'BOOKED'. If payment fails or times out: Release lock back to 'AVAILABLE'.`
      },
      {
        id: 'lld-8',
        title: 'Design Splitwise (Expense Sharing Application)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-splitwise-a-smart-expense-sharing-application/' }],
        tags: ['Splitwise', 'StrategyPattern', 'Math'],
        answer: `Requirements:
• Users can add expenses and split with multiple users.
• Split Types: EQUAL, EXACT amounts, PERCENTAGE shares.
• Compute user balances and simplify debt graphs.

Design:
1. User: id, name, email.
2. Split (abstract): User user, double amount -> EqualSplit, ExactSplit, PercentageSplit subclasses.
3. ISplitValidator: validates that sum of splits == total expense amount.
4. Expense: id, double totalAmount, User paidBy, List<Split> splits, ExpenseMetadata.
5. BalanceSheetController: Updates net balance graph. Map<UserId, Map<UserId, Double>> balanceSheet.
6. Debt Minimization: Simplify debt using Min-Cash-Flow algorithm with Max-Heap (creditors) and Min-Heap (debtors).`
      },
      {
        id: 'lld-9',
        title: 'Design a Vending Machine (State Pattern)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-vending-machine-using-state-design-pattern/' }],
        tags: ['StatePattern', 'Inventory', 'StateMachine'],
        answer: `Pattern: State Pattern.
The vending machine transitions through distinct states: ReadyState, DispenseState, InsertCoinState, OutOfStockState.

Interfaces & Classes:
1. IVendingMachineState:
   - insertCoin(Coin coin)
   - selectProduct(int code)
   - dispenseProduct()
   - refund()
2. Concrete States:
   - IdleState: Allows inserting coin or selecting item.
   - HasMoneyState: Validates item price vs inserted amount.
   - DispensingState: Decrements inventory, ejects product, returns change, resets to Idle.
   - SoldOutState: Rejects coin/selection.
3. Inventory: Map<Integer, ItemShelf> storing item details and stock count.`
      },
      {
        id: 'lld-10',
        title: 'Design a Pluggable Notification System (Observer & Factory)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-notification-service-system-design/' }],
        tags: ['Notification', 'Observer', 'Factory'],
        answer: `Patterns: Observer Pattern, Factory Pattern, Strategy Pattern.

Design:
1. INotificationChannel: send(NotificationPayload payload).
   - EmailChannel (SendGrid, SES)
   - SMSChannel (Twilio)
   - PushNotificationChannel (Firebase FCM, APNS)
2. NotificationFactory: Returns channel strategy based on user preferences and notification priority.
3. NotificationObserver / Subscriber: Event-driven triggers (OrderPlacedEvent, PaymentReceivedEvent) broadcast to registered notification handlers.
4. Rate Limiting & Retry: Queue (RabbitMQ/Kafka) buffers notifications with exponential backoff on delivery failure.`
      },
      {
        id: 'lld-11',
        title: 'Design a Logging Library (Log4j / Winston-like)',
        difficulty: 'Medium',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/design-a-logging-system/' }],
        tags: ['Logging', 'ChainOfResponsibility', 'Singleton'],
        answer: `Patterns: Chain of Responsibility, Singleton, Observer.

Design:
1. LogLevel (enum): DEBUG (1), INFO (2), WARN (3), ERROR (4), FATAL (5).
2. LogMessage: String message, LogLevel level, Instant timestamp, String threadName.
3. LogAppender (abstract): write(LogMessage message) -> ConsoleAppender, FileAppender, CloudWatchAppender.
4. LogManager / Logger (Singleton):
   - Chain of Responsibility: If message level >= configured logger level, pass to appenders.
   - Asynchronous Logging: Messages pushed to ConcurrentLinkedQueue / RingBuffer (LMAX Disruptor), drained by background worker thread to prevent blocking main application threads.`
      },
      {
        id: 'lld-12',
        title: 'Gang of Four (GoF) Core Design Patterns: Quick Reference',
        difficulty: 'Easy',
        links: [{ platform: 'GeeksForGeeks', url: 'https://www.geeksforgeeks.org/gang-of-four-gof-design-patterns/' }],
        tags: ['GoF', 'Creational', 'Structural', 'Behavioral'],
        answer: `1. Creational:
• Singleton: Ensures only one instance exists (Double-checked locking / Enum).
• Factory Method: Defines interface for creating objects; subclasses decide which class to instantiate.
• Builder: Constructs complex objects step-by-step; eliminates telescoping constructors.

2. Structural:
• Adapter: Converts interface of a class into another interface clients expect.
• Decorator: Attaches additional responsibilities dynamically without subclass explosion (e.g. Java I/O streams).
• Facade: Provides simplified high-level interface to a complex subsystem.

3. Behavioral:
• Strategy: Defines family of algorithms, encapsulates each, and makes them interchangeable at runtime.
• Observer: One-to-many dependency; when one object changes state, all dependents are notified automatically.
• Command: Encapsulates a request as an object, enabling parameterization, queuing, and undo/redo.`
      }
    ]
  }
];

