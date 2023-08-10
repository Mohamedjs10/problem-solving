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
//* [7] Find the longest substring of a string containing k distinct characters => [Sliding Window Technique: gonna be based on indices]
//& longestSubstringWithKDistinctChars("aabbccdd", 2); => "aabb" (a/b)
// -------------------------------------------------------------------------
