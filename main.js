// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function)
// The algorithm for myAtoi(string s) is as follows:
// Read in and ignore any leading whitespace.
// Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
// Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
// Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
// If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
// Return the integer as the final result.
// Note:
// Only the space character ' ' is considered a whitespace character.
// Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

// Example 1:
// Input: s = "42"
// Output: 42
// Explanation: The underlined characters are what is read in, the caret is the current reader position.
// Step 1: "42" (no characters read because there is no leading whitespace)
//          ^
// Step 2: "42" (no characters read because there is neither a '-' nor '+')
//          ^
// Step 3: "42" ("42" is read in)
//            ^
// The parsed integer is 42.
// Since 42 is in the range [-231, 231 - 1], the final result is 42.

// Example 2:
// Input: s = "   -42"
// Output: -42
// Explanation:
// Step 1: "   -42" (leading whitespace is read and ignored)
//             ^
// Step 2: "   -42" ('-' is read, so the result should be negative)
//              ^
// Step 3: "   -42" ("42" is read in)
//                ^
// The parsed integer is -42.
// Since -42 is in the range [-231, 231 - 1], the final result is -42.

// Example 3:
// Input: s = "4193 with words"
// Output: 4193
// Explanation:
// Step 1: "4193 with words" (no characters read because there is no leading whitespace)
//          ^
// Step 2: "4193 with words" (no characters read because there is neither a '-' nor '+')
//          ^
// Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
//              ^
// The parsed integer is 4193.
// Since 4193 is in the range [-231, 231 - 1], the final result is 4193.

const example1 = "42";
const example2 = "      -42";
const example3 = "4193 wwwords after";
const example4 = "words first 8734";
const edge = '-9786548765132168546513';
const pi = '3.14';
const soDumb = "  -  413"
const ultraDumb = ' ++1';
const evenDumber = '   '; 
const worldRecordDumb = '+ 29387';
const thisChallengeIsMakingMeWantToMurderEveryPersonAtLeetCode = "21474836++"
const yepAnotherOne = "  +b12102370352"
const andAnother = ".1"
const aaaaaandAnother = "  0000000000012345678"
const seriouslyDoneWithThis = "w10734368512"

//(/(^[A-Z|a-z]|^\s+?-{2,}|^\s+?\+{2,}|\+-|-\+|^\.|^\s+\+{2,}\s+|^\s+-\s+|^\s+?(\+|-)\s)/) ....turns out \D covers most of this...
// console.log(parseInt(ultraDumb));
////// first attempt ///////                        //not excited about a 50 line description for a challenge....
// function stringToInteger(string) { 
//   let answer;
//   const strCheck = string.match(/[A-Za-z\.]/);
//   console.log(strCheck)
//   if (strCheck === null) {
//     console.log(string);
//     answer = parseInt(string);
//     if (answer > (2**31) - 1) {
//       answer = (2**31) - 1;
//     };
//     if (answer < (2**31) * -1) {
//       answer = (2**31) * -1;
//     } return answer;
//   } else {
//   const cutString = string.substr(0, strCheck.index);
//   if (!cutString) {
//     return 0;
//   };
//   const sifted = cutString.match(/-?\d/g);
//   answer = parseInt(sifted.join(''));
//   if (answer > (2**31) - 1) {
//       answer = (2**31) - 1;
//     };
//   if (answer < (2**31) * -1) {
//       answer = (2**31) * -1;
//     };
//     return answer;
//   }
// }


//////// second attempt //////////                            ////honestly kind of boring that these ridiculous edge case fails 
// function thisWillWork(string) {                            ////aren't in the rules very clearly, but c'est la vie
//   if (!string.match(/[0-9]/)) {
//     return 0;
//   }
//   let answer;
//   const regex = /-{0,1}?[0-9]+/;
//   const matches = [...string.match(regex)];
//   const beforeVals = [...string.substr(0, string.indexOf(matches))];
//   // console.log(parseInt(matchPractice))
//   if (beforeVals.length === 0 || beforeVals.every((item) => item === ' ')) {
//     answer = parseInt(matches);
//   } else {
//     answer = 0;
//   };
//   if (answer > (2**31) - 1) {
//     answer = ((2**31) - 1);
//   };
//   if (answer < (2**31) * -1) {
//     answer = ((2**31) * -1)
//   };
//   return answer;
// }

// console.log(!evenDumber.replace(/\s/g, '').length); ///////// <--- Thank you StackOverflow. You are beautiful in the clutch.
//                                                     ///////// for context ^ I was struggling with this "empty" string edge case
/////// third attempt (or 200th depending on how you count)///////
function regexPowersActivate(string) {  
  let answer = 1;
  if (!string.replace(/\s/g, '').length) {
    answer = 0;
  } else if (string.match(/(^\s+(\+|-)\d+)|(^\s+\d+)/)) {
      const numString = string.match(/-?\d+/);
      const toInt = parseInt(numString);
      answer = toInt;
  } else if (string.match(/(^[a-z])|(^-?\D{2})|(^-?\s+\D{1,}\s)|(^\s*?\.)/)) {
      answer = 0;
  } else {
      const numString = string.match(/-?\d+/);
      const toInt = parseInt(numString);                              //// not sure I've ever been so proud of myself. 
      if (!toInt) {                                                   //// I learned regex from this and it's so cool.
        answer = 0;
      } else {
        answer = toInt;
      }
  };
  if (answer > (2**31) - 1) {
    answer = ((2**31) - 1);
  };
  if (answer < (2**31) * -1) {
    answer = ((2**31) * -1)
  };
  return answer;
}
console.log(regexPowersActivate(example1))
console.log(regexPowersActivate(example2))
console.log(regexPowersActivate(example3))
console.log(regexPowersActivate(example4))
console.log(regexPowersActivate(edge))
console.log(regexPowersActivate(pi))
console.log(regexPowersActivate(soDumb))
console.log(regexPowersActivate(ultraDumb))
console.log(regexPowersActivate(evenDumber))
console.log(regexPowersActivate(worldRecordDumb))
console.log(regexPowersActivate(thisChallengeIsMakingMeWantToMurderEveryPersonAtLeetCode))
console.log(regexPowersActivate(yepAnotherOne))
console.log(regexPowersActivate(andAnother))
console.log(regexPowersActivate(aaaaaandAnother))
console.log(regexPowersActivate(seriouslyDoneWithThis))