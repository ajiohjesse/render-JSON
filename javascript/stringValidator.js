export default class stringValidator {
  constructor() {
    //case-insensitive latin alphabets from A-Z
    const letters = /[a-z]/i;
    //numbers from 0 - 9
    const numbers = /[0-9]/;
    // blankspaces, tabs and new lines
    const whiteSpace = /[\s]/;
    //ascii characters
    const chars = /[`£¬€!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    //ascii characters except dash and underscore
    const sepChars = /[`£¬€!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;

    // returns true if there
    //is at least one ALPHABET in a string.
    this.hasAlphabet = (string) => {
      return letters.test(string);
    };

    // returns true if there
    //is at least one NUMBER in a string.
    this.hasNumber = (string) => {
      return numbers.test(string);
    };

    // returns true if there is a blank space,
    //tab or line break anywhere in a string.
    this.hasSpace = (string) => {
      return whiteSpace.test(string);
    };

    // returns true if there is at least
    //one special character in a string.
    this.hasChar = (string) => {
      return chars.test(string);
    };

    // returns true if there is at least one special
    //character in a string except dash and underscore.
    this.hasCharSep = (string) => {
      return sepChars.test(string);
    };

    //----METHODS FOR STRICT VALIDATION----//

    // returns true if a string
    //contains only blank spaces.
    this.isEmpty = (string) => {
      return string.length === 0 ? true : /^[ \s]+$/.test(string);
    };

    // returns true if a string
    //contains only alphabets
    this.onlyAlphabet = (string) => {
      return /^[a-zA-Z]+$/.test(string);
    };

    // returns true if a string
    //contains only numbers
    this.onlyNumber = (string) => {
      return /^[0-9]+$/.test(string);
    };

    // returns true if a string
    //contains only special characters
    this.onlyChar = (string) => {
      return /^[`£¬€!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/.test(string);
    };
  }
}
