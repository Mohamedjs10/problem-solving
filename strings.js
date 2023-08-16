// -------------------------------------------------------------------------
//* [1] Valid Anagram
//^ return true if t is an anagram of s, and false otherwise (anagram: is a word formed by rearranging the letters of a different word)
//& isAnagram("listen", "silent") => true
//& isAnagram("hello", "world") => false
// -------------------------------------------------------------------------
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const charCount = {};

  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (const char of t) {
    // if not found or found and equal to zero (in case of duplicate chars)
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}
// -------------------------------------------------------------------------
//* [2] Group Anagrams
//^ return the anagrams grouped together
//& groupedAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]) => [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
// -------------------------------------------------------------------------
function groupAnagrams(strs) {
  const anagrams = {};

  for (const str of strs) {
    const sortedStr = str.split("").sort().join("");
    if (anagrams[sortedStr]) {
      anagrams[sortedStr].push(str);
    } else {
      anagrams[sortedStr] = [str];
    }
  }

  return Object.values(anagrams);
}

// -------------------------------------------------------------------------
//* [3] Valid Palindrome
//^ return true if it is a palindrome, or false otherwise (palindrome: ltr reads the same as rtl)
//& isPalindrome("A man, a plan, a canal: Panama") => true
//& isPalindrome("race a car") => false
// -------------------------------------------------------------------------
// converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters
function isPalindrome(s) {
  // Convert the string to lowercase and remove non-alphanumeric characters
  const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Check if the clean string is equal to its reverse
  return cleanStr === cleanStr.split("").reverse().join("");
}
// -------------------------------------------------------------------------
//* [4] Palindromic Substrings (substrings that can work as a palindrome on its own)
//& palindromicSubstrings("abc") => ["a", "b", "c"]
//& palindromicSubstrings("aaa") => ["a", "a", "a", "aa", "aa", "aaa"]
// -------------------------------------------------------------------------
function isPalindrome(s) {
  const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
}

function palindromicSubstrings(str) {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const substring = str.substring(i, j);
      if (isPalindrome(substring)) {
        result.push(substring);
      }
    }
  }

  return result;
}

// -------------------------------------------------------------------------
//* [5] Longest Palindromic Substring
//& longestPalindromicSubstring("babad") => "bab" / "aba"
//& longestPalindromicSubstring("cbbd") => "bb"
// -------------------------------------------------------------------------
function isPalindrome(s) {
  const cleanStr = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
}

function longestPalindromicSubstring(str) {
  let lps = "";

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      const substring = str.substring(i, j);
      if (isPalindrome(substring) && substring.length > lps.length) {
        lps = substring;
      }
    }
  }

  return lps;
}
// -------------------------------------------------------------------------
//* [5] Valid Parentheses
//^ return true if it is contains Valid Parentheses
//& isValidParentheses("()[]{}") => true
//& isValidParentheses("(]") => false
// -------------------------------------------------------------------------

function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (const char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (char !== pairs[last]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// -------------------------------------------------------------------------
//* [6] Longest Substring Without Repeating Characters => [Sliding Window Technique: gonna be based on indices]
//& lengthOfLongestSubstring("abcabcbb"); // Output: 3 (for "abc")
// -------------------------------------------------------------------------
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0; // Left pointer of the sliding window
  const charIndexMap = {}; // Map to store the index of each character

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    if (
      charIndexMap[currentChar] !== undefined &&
      charIndexMap[currentChar] >= left
    ) {
      // If the current character is already seen and its index is within the current window
      left = charIndexMap[currentChar] + 1; // Move the left pointer to the next position after the repeated character
    }

    charIndexMap[currentChar] = right; // Update the index of the current character
    maxLength = Math.max(maxLength, right - left + 1); // Update the maximum length
    // (right - left + 1) the length of the current window // (+1) converts indices difference into length
  }

  return maxLength;
}
// -------------------------------------------------------------------------
//* [7] Longest Repeating Character Replacement => [Sliding Window Technique: gonna be based on indices]
//^ replace at most k characters with any other character => to form the longest possible same-character substring => print its length
//& characterReplacement("ABAB", 2); => 4
//& characterReplacement("AABABBA", 1); => 4
// -------------------------------------------------------------------------
function characterReplacement(s, k) {
  const charCount = new Array(26).fill(0); // Assuming input contains only uppercase English letters // [0,0,0, ...]
  let left = 0;
  let maxCount = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const charIndex = s.charCodeAt(right) - "A".charCodeAt(0); // charCodeAt(x): get the Unicode of a specific character in a string
    charCount[charIndex]++;

    maxCount = Math.max(maxCount, charCount[charIndex]);

    // Calculate the length of the current window
    const windowSize = right - left + 1; // (+1) convert indices difference into length
    // If the number of characters to replace is more than k, shrink the window
    if (windowSize - maxCount > k) {
      charCount[s.charCodeAt(left) - "A".charCodeAt(0)]--;
      left++;
    }

    maxLength = Math.max(maxLength, windowSize);
  }

  return maxLength;
}

// -------------------------------------------------------------------------
//* [8] Encode and Decode Strings (Leetcode Premium)
// -------------------------------------------------------------------------

function encode(strs) {
  return strs.map((str) => `${str.length}/${str}`).join("");
}

function decode(s) {
  const result = [];
  let i = 0;

  while (i < s.length) {
    // Find the index of slash '/'
    const slashIndex = s.indexOf("/", i);
    // Get the length of the encoded string
    const length = parseInt(s.substring(i, slashIndex));
    // Move the pointer to the start of the encoded string
    i = slashIndex + 1;
    // Extract the encoded string
    const encodedStr = s.substr(i, length);
    // Move the pointer to the start of the next encoded string
    i += length;

    result.push(encodedStr);
  }

  return result;
}

// Test
const inputStrings = ["hello", "world", "leetcode"];
const encodedString = encode(inputStrings);
console.log(encodedString); // Encoded string
const decodedStrings = decode(encodedString);
console.log(decodedStrings); // Output: ["hello", "world", "leetcode"]

// -------------------------------------------------------------------------
//* [9] Minimum Window Substring => [Sliding Window Technique: gonna be based on indices]
//^ return the minimum window substring of s such that every character in t (including duplicates) is included in the window.
//& minWindow("ADOBECODEBANC", "ABC"); => "BANC"
//& minWindow("a", "a"); => "a"
//& minWindow("a", "aa"); => ""
// -------------------------------------------------------------------------
function minWindow(s, t) {
  // Create a frequency map to store the count of characters in string t
  const targetFreq = new Map();
  for (const char of t) {
    targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
  }

  // Initialize variables to track the sliding window and result
  let left = 0; // Left pointer of the sliding window
  let minLength = Infinity; // Length of the minimum window found
  let minWindowStart = 0; // Start index of the minimum window found
  let charCount = t.length; // Count of characters in t that need to be covered

  // Iterate through the string s using the right pointer
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];

    // If the current character is in t, update the frequency map and charCount
    if (targetFreq.has(rightChar)) {
      if (targetFreq.get(rightChar) > 0) {
        charCount--;
      }
      targetFreq.set(rightChar, targetFreq.get(rightChar) - 1);
    }

    // When all characters of t are covered in the current window
    while (charCount === 0) {
      // Update the minimum window if the current window is smaller
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minWindowStart = left;
      }

      const leftChar = s[left];

      // If the left character is in t, update the frequency map and charCount
      if (targetFreq.has(leftChar)) {
        targetFreq.set(leftChar, targetFreq.get(leftChar) + 1);
        if (targetFreq.get(leftChar) > 0) {
          charCount++;
        }
      }

      // Shrink the window from the left
      left++;
    }
  }

  // If minLength is still Infinity, no valid window was found
  if (minLength === Infinity) {
    return "";
  }

  // Return the minimum window substring from the start index
  return s.substr(minWindowStart, minLength);
}

// Example usage
const s = "ADOBECODEBANC";
const t = "ABC";

const minimumWindow = minWindow(s, t);
console.log(minimumWindow); // Output: "BANC"

// -------
function minWindow(s, t) {
  const charCount = new Array(128).fill(0); // Assuming ASCII character set
  for (const char of t) {
    charCount[char.charCodeAt(0)]++;
  }

  let left = 0;
  let right = 0;
  let minLen = Infinity;
  let minStart = 0;
  let requiredChars = t.length;

  while (right < s.length) {
    if (charCount[s.charCodeAt(right)] > 0) {
      requiredChars--;
    }
    charCount[s.charCodeAt(right)]--;

    while (requiredChars === 0) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      charCount[s.charCodeAt(left)]++;
      if (charCount[s.charCodeAt(left)] > 0) {
        requiredChars++;
      }
      left++;
    }

    right++;
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
