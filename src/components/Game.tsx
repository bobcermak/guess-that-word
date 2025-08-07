import { useState, useEffect, useRef, useCallback } from "react";
import Languages from "./Languages";
import { pickRandomWord, addColors, isWon, pickLanguageWords, isTheRealWord } from "../utils/gameLogic";
import { wordsEN, wordsCZ } from "../data/words";
import { triggerConfetti } from "../utils/animations";

const Game = () => {
    //Hooks
    const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");
    const [currentWord, setCurrentWord] = useState<string>("");
    const [allInputs, setAllInputs] = useState<string[][]>(Array(6).fill(null).map(() => Array(5).fill("")));
    const [allColors, setAllColors] = useState<string[][]>([]);
    const [currentAttempt, setCurrentAttempt] = useState<number>(0);
    const [isGameWon, setIsGameWon] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [playerScore, setplayerScore] = useState<number>(0);
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const [isWrongWord, setIsWrongWord] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[][]>(
        Array(6).fill(null).map(() => Array(5).fill(null))
    );

    //Function to handle input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const value: string = event.target.value.toUpperCase();
        if (value && !/^[A-Z]$/.test(value)) return;
        const updatedInputs: string[][] = [...allInputs];
        updatedInputs[currentAttempt][index] = value;
        setAllInputs(updatedInputs);
        if (value && index < 4) {
            const nextInput = inputRefs.current[currentAttempt][index + 1];
            if (nextInput) nextInput.focus();
        }
    }
    //Function to handle keyboard events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        let nextInput: HTMLInputElement | null = null;
        switch (event.key) {
            case "Delete":
            case "Backspace": {
                const currentInput = allInputs[currentAttempt][index];
                if (currentInput !== "") {
                    const updatedInputs: string[][] = [...allInputs];
                    updatedInputs[currentAttempt][index] = "";
                    setAllInputs(updatedInputs);
                }
                else if (index > 0) {
                    nextInput = inputRefs.current[currentAttempt][index - 1];
                }
                break;
            }
            case "ArrowLeft":
                if (index > 0) nextInput = inputRefs.current[currentAttempt][index - 1];
                break;
            case "ArrowRight":
                if (index < 4) nextInput = inputRefs.current[currentAttempt][index + 1];
                break;
        }
        if (nextInput) nextInput.focus();
    }
    //Function to handle play again
    const handlePlayAgain = (): void => {
        setIsButtonClicked(true);
    }
    //Function to reset the game
    const resetGame = useCallback((): void => {
        setCurrentWord(pickRandomWord(pickLanguageWords(selectedLanguage, wordsEN, wordsCZ)).toUpperCase());
        setAllInputs(Array(6).fill(null).map(() => Array(5).fill("")));
        setAllColors([]);
        setCurrentAttempt(0);
        setIsGameWon(false);
        setIsGameOver(false);
        setIsButtonClicked(false);
        setTimeout(() => {
            const nextInput = inputRefs.current[0][0];
            if (nextInput) nextInput.focus();
        }, 100);
    }, [selectedLanguage]);
    //Select a word at the start
    useEffect(() => {
        resetGame();
    }, [resetGame, selectedLanguage]);
    //Effect to add colors when all inputs are filled
    useEffect(() => {
        const currentInputs: string[] = allInputs[currentAttempt];
        const allFilled: boolean = currentInputs.every(input => input.trim() !== "");
        if (allFilled) {
            if (isTheRealWord(currentInputs, pickLanguageWords(selectedLanguage, wordsEN, wordsCZ))) {
                const newColors: string[] = addColors(currentInputs, currentWord)
                setAllColors(prev => {
                    const copy: string[][] = [...prev];
                    copy[currentAttempt] = newColors;
                    return copy;
                });
                if (isWon(newColors)) {
                    setIsGameWon(true);
                    setplayerScore(prev => prev + 1);
                    setTimeout(() => triggerConfetti(), 100);
                }
                else if (currentAttempt + 1 < 6) {
                    setCurrentAttempt(prev => prev + 1);
                    setTimeout(() => {
                        const nextInput = inputRefs.current[currentAttempt + 1]?.[0];
                        if (nextInput) nextInput.focus();
                    }, 100);
                }
                else {
                    setIsGameOver(true);
                    setplayerScore(0);
                }
            }
            else {
                setIsWrongWord(true);
            }
            setTimeout(() => setIsWrongWord(false), 800);
        }
    }, [allInputs, currentAttempt, currentWord, selectedLanguage]);
    //Effect to reset the game when it is over
    useEffect(() => {
        if (isButtonClicked) resetGame();
    }, [isButtonClicked, resetGame]);
    return (
        <div className="min-h-screen py-8 px-auto flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4">
            <div className="text-center space-y-8">
                <Languages selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
                <h1 className="text-4xl font-bold tracking-wide font-mono text-green-400 drop-shadow-md">GuessThatWord</h1>
                <div className={`flex flex-col gap-4 ${isGameWon || isGameOver ? "hidden" : ""}`}>
                    {allInputs.map((attempt, rowIndex) => (
                    <div className="flex justify-center gap-2" key={rowIndex}>
                            {attempt.map((input, colIndex) => (
                                <input
                                className={`w-14 h-14 text-center text-2xl font-mono font-bold rounded-md border border-gray-500 shadow-lg focus:outline-none transition-all duration-200 ${ rowIndex === currentAttempt && !isGameWon ? "bg-white text-black" : "bg-gray-800 text-white" } ${isWrongWord && rowIndex === currentAttempt ? "animate-wiggle" : ""}`} id={`${rowIndex}-${colIndex}`} key={colIndex} ref={(el) => { inputRefs.current[rowIndex][colIndex] = el; }}  type="text" maxLength={1} value={input} disabled={rowIndex !== currentAttempt || isGameWon} onChange={(event) => handleInputChange(event, colIndex)} onKeyDown={(event) => handleKeyDown(event, colIndex)} style={{ backgroundColor: allColors[rowIndex]?.[colIndex] || (rowIndex === currentAttempt ? "" : "#1f2937"), color: allColors[rowIndex]?.[colIndex] ? "black" : rowIndex === currentAttempt ? "black" : "white" }}/> 
                            ))}
                    </div>
                    ))}
                </div>
                <p className="text-2xl m-0 font-mono font-bold">{selectedLanguage === "EN" ? "Your score is: " : "Vaše skóre je: "}{playerScore}</p>
                <p className={`text-xl mt-8 font-mono font-bold ${isGameOver ? "block" : "hidden"}`}>{selectedLanguage === "EN" ? "The correct word was" : "Správné slovo bylo"}: <span className="text-[#FF0000]">{currentWord}</span></p>
                <button className={`text-2xl font-mono font-bold ${isGameWon ? "bg-[#00FF00] hover:text-[#00FF00]" : "bg-[#FF0000] hover:text-[#FF0000]"} hover:bg-[#FFFFFF] text-[#FFFFFF] transition-[bg, color] ease-in-out duration-250 py-3 px-6 rounded-3xl cursor-pointer ${(isGameWon || isGameOver) ? "inline-block" : "hidden"}`} onClick={() => handlePlayAgain()}>{selectedLanguage === "EN" ? "Play again!" : "Hrát znovu!"}</button>
            </div>
        </div>
    );
}
export default Game;