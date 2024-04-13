const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldStructure) {
   let newStructure = {};
   for (let pointValue in oldStructure) {
       let letters = oldStructure[pointValue]; 
       for (let i = 0; i < letters.length; i++) {
           let letter = letters[i].toLowerCase();
           newStructure[letter] = Number(pointValue);
       }
   }
   return newStructure;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
       let char = word[i].toLowerCase();
       if (char in newPointStructure) {
           score += newPointStructure[char];
       }
   }
   return score;
}

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   return input.question("Enter a word to score: ");
}

function simpleScorer(word) {
   return word.trim().length;
}

function vowelBonusScorer(word) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let totalScore = 0;
    word = word.trim().toUpperCase();
    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            totalScore += 3;
        } else {
            totalScore += 1;
        }
    }
    return totalScore;
}

const scoringAlgorithms = [
    { scorerFunction: simpleScorer },
    { scorerFunction: vowelBonusScorer },
    { scorerFunction: scrabbleScorer }
];

function scorerPrompt(word) {
    console.log("Which scoring algorithm would you like to use?");
    console.log("0 - Simple: One point per character");
    console.log("1 - Vowel Bonus: Vowels are worth 3 points");
    console.log("2 - Scrabble: Uses scrabble point system");
    let selection = input.question("Enter 0, 1, or 2: ");
    return scoringAlgorithms[Number(selection)].scorerFunction(word);
}

function runProgram() {
    let word = initialPrompt();
    let totalScore = scorerPrompt(word);
    console.log(`Score for '${word}': ${totalScore}`);
}

module.exports = {
   initialPrompt,
   transform,
   oldPointStructure,
   newPointStructure,
   simpleScorer,
   vowelBonusScorer,
   scrabbleScorer,
   scoringAlgorithms,
   runProgram,
   scorerPrompt
};
