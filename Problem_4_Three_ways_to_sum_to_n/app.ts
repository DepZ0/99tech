// Implementation 1: Iterative Approach

function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Complexity:

// Time Complexity: O(n) – The function iterates from 1 to n, performing a constant-time addition in each iteration.
// Space Complexity: O(1) – Uses a constant amount of extra space.
// Comment: This implementation is straightforward and easy to understand but can be less efficient for very large n due to its linear time complexity

// =========================
// =========================

// Implementation 2: Mathematical Formula

function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Complexity:

// Time Complexity: O(1) – The function performs a constant number of arithmetic operations regardless of the size of n.
// Space Complexity: O(1) – Uses a constant amount of extra space.
// Comment: This implementation is highly efficient as it computes the sum using a mathematical formula, making it ideal
// for very large values of n. It avoids the need for iterative summation

// =========================
// =========================

// Implementation 3: Recursive Approach

function sum_to_n_c(n: number): number {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
}

// Complexity:

// Time Complexity: O(n) – The function makes a recursive call for each integer from n down to 1.
// Space Complexity: O(n) – The function uses stack space for each recursive call, resulting in linear space complexity.
// Comment: The recursive approach can be elegant but may lead to stack overflow issues for very large n due to deep recursion.
// It's less efficient in terms of space compared to the iterative approach and the mathematical formula.
