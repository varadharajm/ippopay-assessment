//1.A function that accepts a string parameter (string) and returns a boolean value (whether or not it meets the criteria to be a strong password).
const strongPasswordChecker = (string) => {
  //2. Initialize variables to store characters in the string parameter and count the number of characters.
  let lowercaseChar = false;
  let uppercaseChar = false;
  let digitChar = false;
  let charCount = 0;
  const weakRegex = /(.)\1\1/i;

  //3. Checking length of string.
  if (string.length < 6) return string.length;
  if (string.length > 20) return string.length;

  //4. Iterate through the string parameter and count the number of characters. Check if the character is lowercase, uppercase, or a digit.
  for (let i = 0; i < string.length; i++) {
    charCount++;

    if (string.charAt(i).toLowerCase() === string.charAt(i)) {
      lowercaseChar = true;
    } else if (string.charAt(i).toUpperCase() === string.charAt(i)) {
      uppercaseChar = true;
    }

    if (string.charAt(i).match(/[0-9]/g)) {
      digitChar = true;
    }
  }

  //5. Check if all of the conditions have been met and return either true or false.
  if (
    charCount >= 6 &&
    charCount <= 20 &&
    lowercaseChar &&
    uppercaseChar &&
    digitChar &&
    !weakRegex.test(string)
  ) {
    return 0;
  } else {
    return -1;
  }
};

//Unit Tests
console.log("Test #1: ", strongPasswordChecker("Baabab0")); //Should log 0 (storng password)
console.log("Test #2: ", strongPasswordChecker("Baaabb0")); //Should log -1 because not full fill the conntion for storng password.
console.log("Test #3: ", strongPasswordChecker("a")); //Should log 1 because of string length 1.
console.log("Test #4: ", strongPasswordChecker("abBde01234567890012345")); //Should log 22 because of string length more then 20.
console.log("Test #5: ", strongPasswordChecker("abbcBgd")); //Should log -1 because not full fill the conntion for storng password.
console.log("Test #6: ", strongPasswordChecker("aB0")); //Should log 1 because of string length 3.
