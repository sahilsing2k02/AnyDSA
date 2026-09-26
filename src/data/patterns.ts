import type { Pattern } from '../types';

export const patterns: Pattern[] = [
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    description: 'Use two pointers to solve pair/triplet problems on sorted arrays efficiently.',
    icon: '',
    problems: [
      {
        id: 'tp-1',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/valid-palindrome/' },
        ],
        tags: ['string', 'two-pointers'],
      },
      {
        id: 'tp-2',
        title: 'Two Sum II - Input Array Is Sorted',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
        ],
        tags: ['array', 'two-pointers', 'binary-search'],
      },
      {
        id: 'tp-3',
        title: '3Sum',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/3sum/' },
        ],
        tags: ['array', 'two-pointers', 'sorting'],
      },
      {
        id: 'tp-4',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/container-with-most-water/' },
        ],
        tags: ['array', 'two-pointers', 'greedy'],
      },
      {
        id: 'tp-5',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/trapping-rain-water/' },
        ],
        tags: ['array', 'two-pointers', 'stack', 'dp'],
      },
    ],
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    description: 'Maintain a window over data to efficiently compute results without redundant work.',
    icon: '',
    problems: [
      {
        id: 'sw-1',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
        ],
        tags: ['string', 'hashmap', 'sliding-window'],
      },
      {
        id: 'sw-2',
        title: 'Permutation in String',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/permutation-in-string/' },
        ],
        tags: ['string', 'hashmap', 'sliding-window'],
      },
      {
        id: 'sw-3',
        title: 'Longest Repeating Character Replacement',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
        ],
        tags: ['string', 'hashmap', 'sliding-window'],
      },
      {
        id: 'sw-4',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/minimum-window-substring/' },
        ],
        tags: ['string', 'hashmap', 'sliding-window'],
      },
      {
        id: 'sw-5',
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
        ],
        tags: ['array', 'deque', 'sliding-window', 'monotonic'],
      },
    ],
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointers',
    description: 'Two pointers at different speeds — detect cycles, find midpoints in linked lists.',
    icon: '',
    problems: [
      {
        id: 'fsp-1',
        title: 'Linked List Cycle',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/linked-list-cycle/' },
        ],
        tags: ['linked-list', 'fast-slow'],
      },
      {
        id: 'fsp-2',
        title: 'Middle of the Linked List',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
        ],
        tags: ['linked-list', 'fast-slow'],
      },
      {
        id: 'fsp-3',
        title: 'Linked List Cycle II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
        ],
        tags: ['linked-list', 'fast-slow', 'math'],
      },
      {
        id: 'fsp-4',
        title: 'Happy Number',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/happy-number/' },
        ],
        tags: ['math', 'fast-slow', 'hashset'],
      },
      {
        id: 'fsp-5',
        title: 'Find the Duplicate Number',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
        ],
        tags: ['array', 'fast-slow', 'binary-search'],
      },
    ],
  },
  {
    id: 'merge-intervals',
    name: 'Merge Intervals',
    description: 'Sort and merge overlapping intervals for scheduling, calendar, and range problems.',
    icon: '',
    problems: [
      {
        id: 'mi-1',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/merge-intervals/' },
        ],
        tags: ['array', 'sorting', 'intervals'],
      },
      {
        id: 'mi-2',
        title: 'Insert Interval',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/insert-interval/' },
        ],
        tags: ['array', 'intervals'],
      },
      {
        id: 'mi-3',
        title: 'Non-overlapping Intervals',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
        ],
        tags: ['array', 'sorting', 'greedy', 'intervals'],
      },
      {
        id: 'mi-4',
        title: 'Meeting Rooms II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
        ],
        tags: ['array', 'sorting', 'heap', 'intervals'],
      },
      {
        id: 'mi-5',
        title: 'Employee Free Time',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/employee-free-time/' },
        ],
        tags: ['array', 'sorting', 'heap', 'intervals'],
      },
    ],
  },
  {
    id: 'cyclic-sort',
    name: 'Cyclic Sort',
    description: 'Place elements at their correct index in O(n) to find missing or duplicate numbers.',
    icon: '',
    problems: [
      {
        id: 'cs-1',
        title: 'Missing Number',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/missing-number/' },
        ],
        tags: ['array', 'cyclic-sort', 'math', 'bit-manipulation'],
      },
      {
        id: 'cs-2',
        title: 'Find the Duplicate Number',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
        ],
        tags: ['array', 'cyclic-sort', 'fast-slow'],
      },
      {
        id: 'cs-3',
        title: 'Find All Numbers Disappeared in an Array',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
        ],
        tags: ['array', 'cyclic-sort', 'hashset'],
      },
      {
        id: 'cs-4',
        title: 'Find All Duplicates in an Array',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/' },
        ],
        tags: ['array', 'cyclic-sort', 'hashset'],
      },
      {
        id: 'cs-5',
        title: 'First Missing Positive',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/first-missing-positive/' },
        ],
        tags: ['array', 'cyclic-sort', 'hashset'],
      },
    ],
  },
  {
    id: 'in-place-reversal-ll',
    name: 'In-place Reversal of Linked List',
    description: 'Reverse parts of a linked list in-place using pointer manipulation.',
    icon: '',
    problems: [
      {
        id: 'irll-1',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/reverse-linked-list/' },
        ],
        tags: ['linked-list', 'recursion'],
      },
      {
        id: 'irll-2',
        title: 'Reverse Linked List II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
        ],
        tags: ['linked-list'],
      },
      {
        id: 'irll-3',
        title: 'Palindrome Linked List',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/palindrome-linked-list/' },
        ],
        tags: ['linked-list', 'two-pointers', 'stack'],
      },
      {
        id: 'irll-4',
        title: 'Reorder List',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/reorder-list/' },
        ],
        tags: ['linked-list', 'two-pointers', 'recursion'],
      },
      {
        id: 'irll-5',
        title: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
        ],
        tags: ['linked-list', 'recursion'],
      },
    ],
  },
  {
    id: 'tree-bfs',
    name: 'Tree BFS',
    description: 'Level-order traversal using a queue — great for shortest paths and level-by-level processing.',
    icon: '',
    problems: [
      {
        id: 'tbfs-1',
        title: 'Symmetric Tree',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/symmetric-tree/' },
        ],
        tags: ['tree', 'bfs', 'dfs', 'recursion'],
      },
      {
        id: 'tbfs-2',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
        ],
        tags: ['tree', 'bfs', 'queue'],
      },
      {
        id: 'tbfs-3',
        title: 'Binary Tree Right Side View',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
        ],
        tags: ['tree', 'bfs', 'dfs'],
      },
      {
        id: 'tbfs-4',
        title: 'Binary Tree Zigzag Level Order Traversal',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
        ],
        tags: ['tree', 'bfs', 'deque'],
      },
      {
        id: 'tbfs-5',
        title: 'Populating Next Right Pointers in Each Node',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/' },
        ],
        tags: ['tree', 'bfs', 'linked-list'],
      },
    ],
  },
  {
    id: 'tree-dfs',
    name: 'Tree DFS',
    description: 'Depth-first traversal using recursion or stack — ideal for path problems and subtree operations.',
    icon: '',
    problems: [
      {
        id: 'tdfs-1',
        title: 'Path Sum',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/path-sum/' },
        ],
        tags: ['tree', 'dfs', 'recursion'],
      },
      {
        id: 'tdfs-2',
        title: 'Path Sum II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/path-sum-ii/' },
        ],
        tags: ['tree', 'dfs', 'backtracking'],
      },
      {
        id: 'tdfs-3',
        title: 'Sum Root to Leaf Numbers',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/' },
        ],
        tags: ['tree', 'dfs', 'math'],
      },
      {
        id: 'tdfs-4',
        title: 'Path Sum III',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/path-sum-iii/' },
        ],
        tags: ['tree', 'dfs', 'prefix-sum', 'hashmap'],
      },
      {
        id: 'tdfs-5',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
        ],
        tags: ['tree', 'dfs', 'dp'],
      },
    ],
  },
  {
    id: 'two-heaps',
    name: 'Two Heaps',
    description: 'Use a max-heap and min-heap together to efficiently track medians and partitioned data.',
    icon: '',
    problems: [
      {
        id: 'th-1',
        title: 'Find Median from Data Stream',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
        ],
        tags: ['heap', 'two-heaps', 'design'],
      },
      {
        id: 'th-2',
        title: 'Sliding Window Median',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/sliding-window-median/' },
        ],
        tags: ['array', 'heap', 'two-heaps', 'sliding-window'],
      },
      {
        id: 'th-3',
        title: 'IPO',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/ipo/' },
        ],
        tags: ['array', 'heap', 'greedy', 'sorting'],
      },
      {
        id: 'th-4',
        title: 'Maximum Performance of a Team',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/maximum-performance-of-a-team/' },
        ],
        tags: ['array', 'heap', 'greedy', 'sorting'],
      },
      {
        id: 'th-5',
        title: 'Minimize Deviation in Array',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/minimize-deviation-in-array/' },
        ],
        tags: ['array', 'heap', 'greedy'],
      },
    ],
  },
  {
    id: 'subsets-backtracking',
    name: 'Subsets / Backtracking',
    description: 'Build candidates incrementally and backtrack on dead ends to explore all valid states.',
    icon: '',
    problems: [
      {
        id: 'bt-1',
        title: 'Subsets',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/subsets/' },
        ],
        tags: ['backtracking', 'bit-manipulation', 'array'],
      },
      {
        id: 'bt-2',
        title: 'Subsets II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/subsets-ii/' },
        ],
        tags: ['backtracking', 'array', 'sorting'],
      },
      {
        id: 'bt-3',
        title: 'Permutations',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/permutations/' },
        ],
        tags: ['backtracking', 'array'],
      },
      {
        id: 'bt-4',
        title: 'Combination Sum',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/combination-sum/' },
        ],
        tags: ['backtracking', 'array', 'dp'],
      },
      {
        id: 'bt-5',
        title: 'Palindrome Partitioning',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/palindrome-partitioning/' },
        ],
        tags: ['backtracking', 'string', 'dp'],
      },
    ],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    description: 'Halve the search space each step to find elements in sorted or monotonic answer spaces.',
    icon: '',
    problems: [
      {
        id: 'bs-1',
        title: 'Binary Search',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-search/' },
        ],
        tags: ['array', 'binary-search'],
      },
      {
        id: 'bs-2',
        title: 'Find Minimum in Rotated Sorted Array',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
        ],
        tags: ['array', 'binary-search'],
      },
      {
        id: 'bs-3',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
        ],
        tags: ['array', 'binary-search'],
      },
      {
        id: 'bs-4',
        title: 'Find Peak Element',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-peak-element/' },
        ],
        tags: ['array', 'binary-search'],
      },
      {
        id: 'bs-5',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
        ],
        tags: ['array', 'binary-search', 'divide-and-conquer'],
      },
    ],
  },
  {
    id: 'top-k-elements',
    name: 'Top K Elements',
    description: 'Use a heap to efficiently find the top K largest, smallest, or most frequent elements.',
    icon: '',
    problems: [
      {
        id: 'tke-1',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
        ],
        tags: ['array', 'heap', 'sorting', 'quickselect'],
      },
      {
        id: 'tke-2',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
        ],
        tags: ['array', 'heap', 'hashmap', 'bucket-sort'],
      },
      {
        id: 'tke-3',
        title: 'K Closest Points to Origin',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
        ],
        tags: ['array', 'heap', 'geometry', 'quickselect'],
      },
      {
        id: 'tke-4',
        title: 'Top K Frequent Words',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/top-k-frequent-words/' },
        ],
        tags: ['string', 'heap', 'hashmap', 'bucket-sort'],
      },
      {
        id: 'tke-5',
        title: 'Find K Pairs with Smallest Sums',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/' },
        ],
        tags: ['array', 'heap'],
      },
    ],
  },
  {
    id: 'k-way-merge',
    name: 'K-way Merge',
    description: 'Merge K sorted lists or arrays efficiently using a min-heap.',
    icon: '',
    problems: [
      {
        id: 'kwm-1',
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
        ],
        tags: ['linked-list', 'heap', 'divide-and-conquer'],
      },
      {
        id: 'kwm-2',
        title: 'Kth Smallest Element in a Sorted Matrix',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/' },
        ],
        tags: ['array', 'heap', 'binary-search', 'matrix'],
      },
      {
        id: 'kwm-3',
        title: 'Smallest Range Covering Elements from K Lists',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/' },
        ],
        tags: ['array', 'heap', 'sliding-window'],
      },
      {
        id: 'kwm-4',
        title: 'Find K Pairs with Smallest Sums',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/' },
        ],
        tags: ['array', 'heap'],
      },
      {
        id: 'kwm-5',
        title: 'K-th Smallest Prime Fraction',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/k-th-smallest-prime-fraction/' },
        ],
        tags: ['array', 'heap', 'binary-search', 'sorting'],
      },
    ],
  },
  {
    id: 'dp-1d',
    name: 'Dynamic Programming — 1D',
    description: 'Break 1D problems into overlapping subproblems — use tabulation or memoization.',
    icon: '',
    problems: [
      {
        id: 'dp1-1',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/climbing-stairs/' },
        ],
        tags: ['dp', 'math', 'fibonacci'],
      },
      {
        id: 'dp1-2',
        title: 'House Robber',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/house-robber/' },
        ],
        tags: ['dp', 'array'],
      },
      {
        id: 'dp1-3',
        title: 'Longest Increasing Subsequence',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
        ],
        tags: ['dp', 'binary-search', 'array'],
      },
      {
        id: 'dp1-4',
        title: 'Coin Change',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/coin-change/' },
        ],
        tags: ['dp', 'bfs', 'array'],
      },
      {
        id: 'dp1-5',
        title: 'Word Break',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/word-break/' },
        ],
        tags: ['dp', 'string', 'trie', 'memoization'],
      },
    ],
  },
  {
    id: 'dp-2d',
    name: 'Dynamic Programming — 2D / Interval',
    description: 'Handle 2D grids, string matching, and interval DP with tabulation.',
    icon: '',
    problems: [
      {
        id: 'dp2-1',
        title: 'Unique Paths',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/unique-paths/' },
        ],
        tags: ['dp', 'math', 'combinatorics'],
      },
      {
        id: 'dp2-2',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
        ],
        tags: ['dp', 'string'],
      },
      {
        id: 'dp2-3',
        title: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
        ],
        tags: ['dp', 'array'],
      },
      {
        id: 'dp2-4',
        title: 'Edit Distance',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/edit-distance/' },
        ],
        tags: ['dp', 'string'],
      },
      {
        id: 'dp2-5',
        title: 'Burst Balloons',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/burst-balloons/' },
        ],
        tags: ['dp', 'array', 'divide-and-conquer'],
      },
    ],
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    description: 'Order tasks respecting dependencies — detect cycles and find build order in DAGs.',
    icon: '',
    problems: [
      {
        id: 'ts-1',
        title: 'Course Schedule',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/course-schedule/' },
        ],
        tags: ['graph', 'topological-sort', 'bfs', 'dfs'],
      },
      {
        id: 'ts-2',
        title: 'Course Schedule II',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/course-schedule-ii/' },
        ],
        tags: ['graph', 'topological-sort', 'bfs', 'dfs'],
      },
      {
        id: 'ts-3',
        title: 'Alien Dictionary',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/alien-dictionary/' },
        ],
        tags: ['graph', 'topological-sort', 'string', 'bfs'],
      },
      {
        id: 'ts-4',
        title: 'Minimum Height Trees',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/minimum-height-trees/' },
        ],
        tags: ['graph', 'topological-sort', 'bfs'],
      },
      {
        id: 'ts-5',
        title: 'Sequence Reconstruction',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/sequence-reconstruction/' },
        ],
        tags: ['graph', 'topological-sort', 'array'],
      },
    ],
  },
  {
    id: 'graph-bfs-dfs',
    name: 'Graph BFS / DFS',
    description: 'Traverse graphs to find connected components, shortest paths, and reachability.',
    icon: '',
    problems: [
      {
        id: 'gr-1',
        title: 'Number of Islands',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/number-of-islands/' },
        ],
        tags: ['graph', 'bfs', 'dfs', 'union-find', 'matrix'],
      },
      {
        id: 'gr-2',
        title: 'Clone Graph',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/clone-graph/' },
        ],
        tags: ['graph', 'bfs', 'dfs', 'hashmap'],
      },
      {
        id: 'gr-3',
        title: 'Max Area of Island',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/max-area-of-island/' },
        ],
        tags: ['graph', 'bfs', 'dfs', 'matrix'],
      },
      {
        id: 'gr-4',
        title: 'Pacific Atlantic Water Flow',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
        ],
        tags: ['graph', 'bfs', 'dfs', 'matrix'],
      },
      {
        id: 'gr-5',
        title: 'Word Ladder',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/word-ladder/' },
        ],
        tags: ['graph', 'bfs', 'string', 'hashset'],
      },
    ],
  },
  {
    id: 'union-find',
    name: 'Union Find',
    description: 'Efficiently track disjoint sets and find/merge connected components in O(α(n)).',
    icon: '',
    problems: [
      {
        id: 'uf-1',
        title: 'Number of Provinces',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/number-of-provinces/' },
        ],
        tags: ['graph', 'union-find', 'dfs'],
      },
      {
        id: 'uf-2',
        title: 'Redundant Connection',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/redundant-connection/' },
        ],
        tags: ['graph', 'union-find', 'dfs'],
      },
      {
        id: 'uf-3',
        title: 'Accounts Merge',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/accounts-merge/' },
        ],
        tags: ['graph', 'union-find', 'dfs', 'string', 'sorting'],
      },
      {
        id: 'uf-4',
        title: 'Number of Operations to Make Network Connected',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/' },
        ],
        tags: ['graph', 'union-find', 'bfs', 'dfs'],
      },
      {
        id: 'uf-5',
        title: 'Smallest String With Swaps',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/smallest-string-with-swaps/' },
        ],
        tags: ['graph', 'union-find', 'string', 'hashmap'],
      },
    ],
  },
  {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    description: 'Maintain a stack in increasing or decreasing order to solve next-greater and histogram problems.',
    icon: '',
    problems: [
      {
        id: 'ms-1',
        title: 'Next Greater Element I',
        difficulty: 'Easy',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/next-greater-element-i/' },
        ],
        tags: ['array', 'stack', 'monotonic', 'hashmap'],
      },
      {
        id: 'ms-2',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/daily-temperatures/' },
        ],
        tags: ['array', 'stack', 'monotonic'],
      },
      {
        id: 'ms-3',
        title: 'Online Stock Span',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/online-stock-span/' },
        ],
        tags: ['stack', 'monotonic', 'design'],
      },
      {
        id: 'ms-4',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
        ],
        tags: ['array', 'stack', 'monotonic'],
      },
      {
        id: 'ms-5',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/trapping-rain-water/' },
        ],
        tags: ['array', 'stack', 'monotonic', 'two-pointers', 'dp'],
      },
    ],
  },
  {
    id: 'prefix-sum',
    name: 'Prefix Sum / Hash Map',
    description: 'Precompute cumulative sums paired with a hash map to answer range and subarray queries in O(1).',
    icon: '',
    problems: [
      {
        id: 'ps-1',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
        ],
        tags: ['array', 'prefix-sum', 'hashmap'],
      },
      {
        id: 'ps-2',
        title: 'Continuous Subarray Sum',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/continuous-subarray-sum/' },
        ],
        tags: ['array', 'prefix-sum', 'hashmap', 'math'],
      },
      {
        id: 'ps-3',
        title: 'Subarray Sums Divisible by K',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/' },
        ],
        tags: ['array', 'prefix-sum', 'hashmap'],
      },
      {
        id: 'ps-4',
        title: 'Path Sum III',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/path-sum-iii/' },
        ],
        tags: ['tree', 'dfs', 'prefix-sum', 'hashmap'],
      },
      {
        id: 'ps-5',
        title: 'Count Number of Nice Subarrays',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/' },
        ],
        tags: ['array', 'prefix-sum', 'hashmap', 'sliding-window'],
      },
    ],
  },
  {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    description: 'A tree data structure for efficient string prefix lookups, autocomplete, and word searches.',
    icon: '',
    problems: [
      {
        id: 'tr-1',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
        ],
        tags: ['trie', 'design', 'string'],
      },
      {
        id: 'tr-2',
        title: 'Design Add and Search Words Data Structure',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
        ],
        tags: ['trie', 'dfs', 'design', 'string'],
      },
      {
        id: 'tr-3',
        title: 'Replace Words',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/replace-words/' },
        ],
        tags: ['trie', 'string', 'hashset'],
      },
      {
        id: 'tr-4',
        title: 'Index Pairs of a String',
        difficulty: 'Medium',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/index-pairs-of-a-string/' },
        ],
        tags: ['trie', 'string'],
      },
      {
        id: 'tr-5',
        title: 'Word Search II',
        difficulty: 'Hard',
        links: [
          { platform: 'LeetCode', url: 'https://leetcode.com/problems/word-search-ii/' },
        ],
        tags: ['trie', 'backtracking', 'matrix', 'dfs'],
      },
    ],
  },
];
