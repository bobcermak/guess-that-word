type LanguagesProps = {
    selectedLanguage: string,
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}
const Languages = ({selectedLanguage, setSelectedLanguage}: LanguagesProps) => {
    return (
        <div className="flex justify-center gap-3">
            <button className={`w-12 h-12 text-2xl font-mono rounded-lg border transition-all duration-200 transform hover:scale-105 ${ selectedLanguage === "EN" ? "border-green-400 bg-green-400/20 shadow-md shadow-green-400/30" : "border-gray-500 bg-gray-800/50 hover:border-green-400" }`} onClick={() => setSelectedLanguage("EN")}>EN</button>
            <button className={`w-12 h-12 text-2xl font-mono rounded-lg border transition-all duration-200 transform hover:scale-105 ${ selectedLanguage === "CZ" ? "border-green-400 bg-green-400/20 shadow-md shadow-green-400/30" : "border-gray-500 bg-gray-800/50 hover:border-green-400" }`} onClick={() => setSelectedLanguage("CZ")}>CZ</button>
        </div>
    )
}
export default Languages;