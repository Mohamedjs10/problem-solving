// Dynamic Programming Solution:
// The problem can be solved using dynamic programming, where we build the solution incrementally based on smaller subproblems.
// gonna go with tabulation

// -------------------------------------------------------------------------
//* [1] Climbing Stairs [fibonacci sequence (1,1,2,3,5,...) : each number is the addition of the previous two numbers]
//^ stairs options sequence:     0,1,2,(3),5,8,13,21,... ( 0th step: 0 options / 1st step : 1 option / 2nd step : 2 options / 3rd step : 3 options / 3rd step : 3 options / ... )
//^ fibonacci sequence:          1,1,2,(3),5,8,13,21,...
//^ stairs options sequence follows fibonacci sequence starting from 4th number (3rd index, if considered the sequence as an array)
//~ climbStairs(0) => 0
//~ climbStairs(3) => 3
//~ climbStairs(4) => 5
// console.log(`Number of ways to climb ${n} steps: ${ways}`);
// -------------------------------------------------------------------------
function climbStairs(n) {
  if (n <= 2) {
    // 0 step => 0 option // 1 step => 1 option // 2 steps => 2 options (1 step + 1 step / 2 steps)
    return n;
  }
  const dp = new Array(n + 1); // (+1) as array start with needless zero index
  dp[1] = 1; // One way to reach the first step
  dp[2] = 2; // Two ways to reach the second step

  // follows fibonacci sequence from 3rd step (3rd step option = 1nd step options + 3rd step options = 1 + 2 = 3)
  for (let i = 3; i <= n; i++) {
    // At each step, the number of ways to reach it is the sum of ways to reach the previous two steps
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// -------------------------------------------------------------------------
//* [2] Coin Change
//^
//~ coinChange([1, 2, 5], 11) => 3 (5 + 5 + 1 = 11)
// console.log(`Minimum number of coins needed to make ${amount}: ${minCoins}`);
// -------------------------------------------------------------------------
function coinChange(coins, amount) {
  // Create a dynamic programming array to store the minimum number of coins needed for each amount from 0 to 'amount'
  const dp = new Array(amount + 1).fill(Infinity);

  // Base case: It takes 0 coins to make an amount of 0
  dp[0] = 0;

  // Iterate through each amount from 1 to 'amount'
  for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
    // Iterate through each coin denomination
    for (const coin of coins) {
      // If the current coin denomination is less than or equal to the current amount
      if (coin <= currentAmount) {
        // Calculate the remaining amount after using the current coin denomination
        const remainingAmount = currentAmount - coin;

        // Update dp[currentAmount] with the minimum between its current value and (dp[remainingAmount] + 1)
        // Adding 1 to dp[remainingAmount] because we're using one coin of the current denomination
        dp[currentAmount] = Math.min(
          dp[currentAmount],
          dp[remainingAmount] + 1
        );
      }
    }
  }

  // If dp[amount] remains Infinity, it means the target amount cannot be made up using the given coin denominations
  // Otherwise, return dp[amount] which represents the minimum number of coins needed to make up the amount
  return dp[amount] === Infinity ? -1 : dp[amount];
}
