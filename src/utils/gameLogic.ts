//Function to pick a random word from the list
export const pickRandomWord = (words: string[]): string => {
    const randomNumber: number = Math.floor(Math.random() * words.length);
    return words[randomNumber];
}
//Function to add colors based on input
export const addColors = (inputs: string[], word: string): string[] => {
    const newColors: string[] = Array(inputs.length).fill("#FF0000"); //Red
    const wordLettersCount: Record<string, number> = {};
    for (const letter of word) {
        wordLettersCount[letter] = (wordLettersCount[letter] || 0) + 1;
    }
    inputs.forEach((input, i) => {
        if (input === word[i]) {
            newColors[i] = "#00FF00" //Green
            wordLettersCount[input] -= 1;
        }
    });
    inputs.forEach((input, i) => {
        if (newColors[i] !== "#00FF00" && wordLettersCount[input] > 0) {
            if (word.includes(input)) {
                newColors[i] = "#FFFF00"; //Yellow
                wordLettersCount[input] -= 1;
            }
        }
    });
    return newColors;
}
//Function to check if the game is won or lost
export const isWon = (items: string[]): boolean => {
    const yellow: string = "#FFFF00";
    const red: string = "#FF0000";
    return !items.includes(yellow) && !items.includes(red);
}
//Function to pick words based on selected language
export const pickLanguageWords = (language: string, wordsEN: string[], wordsCZ: string[]): string[] => {
    return language === "EN" ? wordsEN : wordsCZ;
}