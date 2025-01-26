import wordBank from "./assets/targetWords.json";

export const boardDefault: string[][] = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async (): Promise<{ wordSet: Set<string>; todaysWord: string }> => {
  let wordSet: Set<string>;
  let todaysWord: string;

  const wordArr = wordBank; // wordBank is already an array from the imported JSON file

  todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  wordSet = new Set(wordArr);

  return { wordSet, todaysWord };
};
