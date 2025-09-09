import type React from "react";

type LanguagesProps = {
    language: string,
    languageChange: (language: string) => void
}
const Languages: React.FC<LanguagesProps> = ({language, languageChange}) => {
    return (
        <div className="flex justify-center gap-3">
            <button className={`w-12 h-12 text-2xl font-mono rounded-lg border transition-all duration-200 transform hover:scale-105 ${ language === "EN" ? "border-green-400 bg-green-400/20 shadow-md shadow-green-400/30" : "border-gray-500 bg-gray-800/50 hover:border-green-400" }`} onClick={() => languageChange("EN")}>EN</button>
            <button className={`w-12 h-12 text-2xl font-mono rounded-lg border transition-all duration-200 transform hover:scale-105 ${ language === "CZ" ? "border-green-400 bg-green-400/20 shadow-md shadow-green-400/30" : "border-gray-500 bg-gray-800/50 hover:border-green-400" }`} onClick={() => languageChange("CZ")}>CZ</button>
        </div>
    )
}
export default Languages;