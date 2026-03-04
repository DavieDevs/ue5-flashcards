# UE5 C++ Flashcards

Study flashcards for the **Unreal Engine 5 C++ Game Development** course by GameDev.tv & Kaan Alpar.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Adding New Lesson Cards

All card content lives in **`data/cards.js`**. To add a new lesson, copy this template and add it to the `lessons` array:

```js
{
  id: "s2-l18",          // unique id — section + lesson number
  section: 2,            // section number
  lesson: 18,            // lesson number
  title: "Your Title",   // shown in the lesson selector
  description: "Brief description of what this lesson covers",
  cards: [
    {
      id: "s2l18-1",     // unique card id
      front: "Question text here?",
      back: "Answer text here.\n\nUse \\n for line breaks.",
      tag: "Components"  // tag for color coding (see list below)
    },
    // add more cards...
  ]
}
```

### Available Tags
- `Architecture` — class design, inheritance
- `Files` — .h and .cpp structure  
- `Conventions` — naming rules
- `Lifecycle` — BeginPlay, Tick, etc.
- `Logging` — UE_LOG and debug output
- `Fundamentals` — core C++ concepts
- `Components` — Actor components
- `Editor` — UE5 editor navigation

Add your own tags freely — they'll be color-coded automatically.

---

## Deploying to Vercel (Free)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → select your repo
4. Click **Deploy** — done. Live in ~2 minutes.

Every time you push new cards to GitHub, Vercel redeploys automatically.

---

## Project Structure

```
ue5-flashcards/
├── data/
│   └── cards.js        ← ALL card content lives here
├── pages/
│   ├── _app.jsx        ← global styles wrapper
│   ├── index.jsx       ← lesson selector home screen
│   └── study.jsx       ← flashcard study session
├── styles/
│   └── globals.css
└── README.md
```
