// -------------------------------------------------------------------------
//* [1] Two Sum
//^ return indices of the two integers that they add up to target
//& twoSum([2,15,11,7],9) => [0,3]
// -------------------------------------------------------------------------
function twoSum(integersArr, target) {
  let integersIndices = {};

  for (let i = 0; i < integersArr.length; i++) {
    let complement = target - integersArr[i];
    if (complement in integersIndices) {
      return [integersIndices[complement], i];
    }
    integersIndices[integersArr[i]] = i;
  }

  return []; // no solution found
}
// -------------------------------------------------------------------------
//* [2] Three Sum
//^ return indices of the three integers that they add up to target
//& threeSum([-1, 0, 1, 2, -1, -4], 0) => [ [-1, -1, 2], [-1, 0, 1] ]
// -------------------------------------------------------------------------
function threeSum(nums, target) {
  // sort nums array ascending
  nums.sort((a, b) => a - b);

  const triplets = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue; // Skip duplicate elements
    }
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === target) {
        triplets.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) {
          left++; // Skip duplicate elements
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--; // Skip duplicate elements
        }
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return triplets;
}

// -------------------------------------------------------------------------
//* [2] Best Time to Buy and Sell Stock
//^ return the maximum profit you can achieve by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. If you cannot achieve any profit, return 0.
//& maxProfit([7,1,5,3,6,4]) => 5
// -------------------------------------------------------------------------
function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}

// -------------------------------------------------------------------------
//* [3] Contains Duplicate
//^ return true if any value appears at least twice in the array, and return false if every element is distinct.
//& containsDuplicate([1, 2, 3, 1]) => true
// -------------------------------------------------------------------------
function containsDuplicate(nums) {
  let seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}
// -------------------------------------------------------------------------
//* [4] Product of Array Except Self
//^ return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
//todo: must run in O(n) + without using the division operation.
//& productExceptSelf([1, 2, 3, 4]); => [24, 12, 8, 6]
// -------------------------------------------------------------------------
function productExceptSelf(nums) {
  const n = nums.length;
  const leftProducts = new Array(n); // array to store products of elements on the left
  const rightProducts = new Array(n); // array to store products of elements on the right

  // Calculate products of elements on the left
  leftProducts[0] = 1;
  for (let i = 1; i < n; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }

  // Calculate products of elements on the right
  rightProducts[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  // Calculate the final answer by multiplying left and right products
  const answer = new Array(n);
  for (let i = 0; i < n; i++) {
    answer[i] = leftProducts[i] * rightProducts[i];
  }

  return answer;
}

// -------------------------------------------------------------------------
//* [5] Maximum Subarray
//^ return the largest contiguous subarray sum
//& maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]) => 6
// -------------------------------------------------------------------------
// Brute Force Approach => O(n3) / optimization: O(n2)

// (Kadane’s Algorithm) => O(n)
function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
// -------------------------------------------------------------------------
//* [6] Maximum Product Subarray
//^ return the largest contiguous subarray product
//& maxSubarrayProduct = ([2, 3, -2, 4, -1, 0, 2, -3]) => 48
// -------------------------------------------------------------------------
// Brute Force Approach => O(n3) / optimization: O(n2)

// (Kadane’s Algorithm) => O(n)
function maxProductSubarray(nums) {
  // Edge case: Empty array
  if (nums.length === 0) {
    return 0;
  }

  let maxProduct = nums[0]; // Maximum product found so far
  let minProduct = nums[0]; // Minimum product found so far
  let result = maxProduct; // Overall maximum product

  for (let i = 1; i < nums.length; i++) {
    // If the current number is negative, swap maxProduct and minProduct
    if (nums[i] < 0) {
      [maxProduct, minProduct] = [minProduct, maxProduct];
    }

    // Update maxProduct and minProduct for the current element
    maxProduct = Math.max(nums[i], maxProduct * nums[i]);
    minProduct = Math.min(nums[i], minProduct * nums[i]);

    // Update the overall maximum product
    result = Math.max(result, maxProduct);
  }

  return result;
}
