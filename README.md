# GuessThatWord

**GuessThatWord** je pokročilá implementace populární hádací hry slov postavená na moderním React + TypeScript stacku. Projekt demonstruje best practices ve frontend developmentu včetně type-safe programování, komponenty-driven architektury a responsivního designu.

![guess-that-word-image](/public/images/guess-that-word-image.png)

---

[Náhled hry](https://bobcermak.github.io/guess-that-word/)

---

## 🚀 Rychlé spuštění

### 1. Naklonuj repozitář

```bash
git clone https://github.com/bobcermak/guess-that-word.git
```

### 2. Přejdi do složky projektu

```bash
cd guess-that-word
```

### 3. Nainstaluj závislosti

```bash
npm install
```

### 4. Spusť vývojový server

```bash
npm run dev
```

## ✨ Hlavní funkce

- 🌍 **Dva jazyky** - Čeština a angličtina
- 🎊 **Animace konfet** - Oslavy při výhře
- 🎯 **Barevná zpětná vazba** - Zelená/žlutá/červená
- 📊 **Bodování** - Sledování úspěšnosti
- ⌨️ **Chytrá navigace** - Automatický přechod mezi políčky
- 🎨 **Tmavý design** - Moderní gradient pozadí

## 🛠️ Technologie

- **React 18** + **TypeScript**
- **Vite** - Rychlý build nástroj
- **Tailwind CSS** - Stylování
- **Canvas Confetti** - Animace

## 🎮 Pravidla hry

1. **Hádej 5písmenná slova** - Máš 6 pokusů  
2. **Barevné nápovědy**:  
   - 🟢 **Zelená** = Správné písmeno na správném místě  
   - 🟡 **Žlutá** = Správné písmeno na špatném místě  
   - 🔴 **Červená** = Písmeno není ve slově  
3. **Neplatná slova? Hezky se to zavlní!**  
   Pokud napíšeš slovo, které není v oficiálním seznamu, vstupní políčka se jemně zavlní - dá ti to najevo, že tohle slovo systém neuznává. Zkus jiné!
4. **Vyber jazyk** - Přepínej mezi EN/CZ  
5. **Sleduj skóre** - Získávej body za výhry

## 📋 Dostupné příkazy

### 🔧 Instalace závislostí

```bash
npm install
```

### 🚀 Spuštění vývojového serveru

```bash
npm run dev
```

### 📦 Build pro produkci

```bash
npm run build
```

### 👁️ Náhled produkční verze

```bash
npm run preview
```

### 🔍 Kontrola kódu (ESLint)

```bash
npm run lint
```