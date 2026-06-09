<div align="center">

# ♟ Checkora

**A premium, offline-first desktop chess application.**

Built with React • TypeScript • Electron • Stockfish AI

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Electron](https://img.shields.io/badge/Electron-31.0-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📥 Downloads & Installation

Get the latest stable release of Checkora for your platform:

* **💻 Windows**: [Download Installer (.exe)](https://github.com/sourishnandy4-cell/Checkora/releases/latest)
* **🍏 macOS**: [Download Disk Image (.dmg)](https://github.com/sourishnandy4-cell/Checkora/releases/latest) or [Compressed Archive (.zip)](https://github.com/sourishnandy4-cell/Checkora/releases/latest)
  > [!IMPORTANT]
  > **Note for macOS users**: If you see the message `"Checkora is damaged and can't be opened. You should move it to the Bin."`, this is due to Gatekeeper blocking unsigned applications. You can easily fix this by opening your Terminal and running:
  > ```bash
  > xattr -cr /Applications/Checkora.app
  > ```
* **🤖 Android**: [Download Package (.apk)](https://github.com/sourishnandy4-cell/Checkora/releases/latest)
* **📱 iPhone / iOS**: See below to build and run on your iPhone locally.

---

## 🛠️ iOS Local Build Instructions

Due to Apple's security policy, distributing pre-compiled iOS packages (`.ipa`) requires an active Apple Developer Program membership and code-signing certificates. However, you can build and run Checkora on your iPhone locally for free:

1. Ensure you have a Mac with **Xcode** installed.
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Build the React web frontend:
   ```bash
   npm run build:renderer
   ```
4. Sync the web assets with the Capacitor iOS project:
   ```bash
   npx cap sync ios
   ```
5. Open the project in Xcode:
   ```bash
   npx cap open ios
   ```
6. Connect your iPhone via USB, select your device as the target in Xcode, and click the **Run** button (or press `Cmd + R`).

---

## ✨ Features

### 🎮 Play Against AI Bots
- **20+ unique bot opponents** ranging from 200 to 3200 ELO — each with distinct personalities, playstyles, and in-game chat
- **Celebrity chess bots** including Magnus Carlsen, Hikaru Nakamura, GothamChess, Samay Raina, Sagar Shah, Vidit Gujrathi, and Praggnanandhaa
- Fully configurable **time controls**: Bullet (1+0), Blitz (3+0, 5+0), Rapid (10+0, 15+10), and custom presets
- Choose your color: White, Black, or Random
- **Real-time bot chat** with context-aware taunts, reactions to captures, blunders, and game outcomes

### 📊 ELO Rating System
- Professional **Chess.com-style Elo formula** with separate ratings for Bullet, Blitz, and Rapid
- **Provisional placement** with K-factor=40 for first 20 games, then K=20 for established players
- Rating floor of 100 ELO ensures you never drop below the baseline
- Full match history tracking with per-game rating change visualization

### 🧩 Puzzles & Tactics
- **Interactive tactical puzzles** covering Checkmate, Pin, Fork, Sacrifice, Removal of Defender, and Escape themes
- **Puzzle Rush mode**: Solve as many puzzles as possible in 3 minutes with 3 lives
- Persistent high score tracking

### 📚 Chess Academy (Learn)
- **7 guided interactive lessons** covering openings (Italian, Ruy Lopez, Queen's Gambit), tactics (Scholar's Mate, En Passant, Pawn Promotion), and strategy (Castling)
- Step-by-step move coaching with automatic opponent responses
- Visual progress indicators per lesson

### 🎯 Coordinates Trainer
- Speed-test your board vision by clicking the correct squares under a 60-second countdown
- Local high score persistence

### 🔬 Analysis Board
- Full Stockfish-powered position evaluation with adjustable depth (8–22)
- **Import FEN or PGN** to analyze any position or game
- Real-time evaluation bar, best move display, and evaluation trend chart
- Interactive move navigation with clickable notation log
- Board flip support

### 🎨 5 Premium Themes
| Theme | Description |
|-------|-------------|
| **Mono** | Stark black & white — the default |
| **Forest** | Deep greens with parchment board |
| **Ocean** | Midnight navy with ice-blue squares |
| **Crimson** | Dark burgundy with ivory accents |
| **Aurora** | Violet indigo with lavender highlights |

### ⚙️ Settings & Customization
- Theme picker with live preview
- Sound effects toggle (move, capture, check, win, lose sounds)
- Board coordinate visibility toggle
- Custom player avatar with preset chess-piece options or photo upload
- Guest and local player modes

---

## Screenshots

<img width="2920" height="1684" alt="image" src="https://github.com/user-attachments/assets/f3bdc743-15e2-4440-9eeb-a75291b96606" />
<img width="2920" height="1684" alt="image" src="https://github.com/user-attachments/assets/f9434175-d296-4a1a-8241-0991f277d47b" />
<img width="2914" height="1688" alt="image" src="https://github.com/user-attachments/assets/603e7eb8-0775-444d-9830-4578efdf41ff" />
<img width="2916" height="1692" alt="image" src="https://github.com/user-attachments/assets/ab15175d-1f82-43e6-bfc8-a2baf971be76" />
<img width="2908" height="1696" alt="image" src="https://github.com/user-attachments/assets/8cae5276-f15c-49df-aa58-ef7d818dfc05" />


---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Electron](https://www.electronjs.org/) 31 |
| **UI** | [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/) 5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 alpha + vanilla CSS custom properties |
| **State** | [Zustand](https://zustand-demo.pmnd.rs/) with persistence |
| **Chess Logic** | [chess.js](https://github.com/jhlywa/chess.js) |
| **Board** | [react-chessboard](https://www.npmjs.com/package/react-chessboard) |
| **Engine** | [Stockfish](https://stockfishchess.org/) (WASM, via Web Worker) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Routing** | [React Router](https://reactrouter.com/) v6 |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Persistence** | [electron-store](https://github.com/sindresorhus/electron-store) (Electron) / localStorage (web) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sourishnandy4-cell/Checkora.git
cd Checkora

# Install dependencies
npm install
```

### Development

```bash
# Start the Electron app in development mode
npm run dev
```

This launches both the Vite dev server and Electron concurrently.

### Production Build

```bash
# Build everything (renderer + main process)
npm run build

# Launch the built app
npm start
```

---

## 📁 Project Structure

```
Checkora/
├── electron/                 # Electron main process
│   ├── main.ts              # Window creation, IPC bridge, OS controls
│   └── preload.ts           # Secure contextBridge API
├── public/
│   ├── avatars/             # Bot & player avatar images
│   ├── sounds/              # Game sound effects
│   ├── stockfish.js         # Stockfish WASM engine
│   └── stockfish.wasm       # Stockfish binary
├── scripts/
│   └── copy-stockfish.js    # Setup script to install Stockfish assets
├── src/
│   ├── components/          # Shared UI components
│   │   ├── NavigationRail.tsx
│   │   ├── StatusBar.tsx
│   │   └── TitleBar.tsx
│   ├── data/
│   │   └── bots.ts          # Bot definitions (20+ characters)
│   ├── engine/
│   │   └── stockfish.ts     # Web Worker Stockfish integration
│   ├── pages/               # Route pages
│   │   ├── Analysis.tsx
│   │   ├── Auth.tsx
│   │   ├── Game.tsx
│   │   ├── Learn.tsx
│   │   ├── Play.tsx
│   │   ├── Profile.tsx
│   │   ├── Puzzles.tsx
│   │   ├── Settings.tsx
│   │   └── Train.tsx
│   ├── store/               # Zustand state management
│   │   ├── gameStore.ts     # Game state, ELO, history
│   │   └── settingsStore.ts # Theme, sound, auth preferences
│   ├── utils/
│   │   └── audio.ts         # Sound effect player utility
│   ├── App.tsx              # Root layout + routing
│   ├── index.css            # Theme variables + global styles
│   └── main.tsx             # React entry point
├── index.html               # HTML shell
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## 🎮 How to Play

1. **Launch** the app and sign in (or continue as Guest)
2. **Navigate** using the left sidebar to access Play, Puzzles, Learn, Train, Analysis, or Profile
3. **Challenge a bot** by clicking any bot card on the Play page → configure time control and color → hit "Start Battle"
4. **Make moves** by dragging pieces on the board
5. **Use the takeback button** (↩️) during games if you need to undo a move
6. **Review your stats** on the Profile page — track ELO progression across Bullet, Blitz, and Rapid

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google Antigravity 
- [Stockfish](https://stockfishchess.org/) — the world's strongest open-source chess engine
- [chess.js](https://github.com/jhlywa/chess.js) — chess move validation and game logic
- [react-chessboard](https://github.com/Clariity/react-chessboard) — beautiful React chessboard component
- [Lucide](https://lucide.dev/) — premium open-source icons
- [Google Fonts](https://fonts.google.com/) — Playfair Display, DM Sans, JetBrains Mono
- https://github.com/satiricalguru
- https://github.com/sourishnandy4-cell
---

<div align="center">
  <strong>Built with ♟ and ☕ by the Checkora team</strong>
</div>
