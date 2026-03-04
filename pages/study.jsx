import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCardsForLessons } from "../data/cards";

const tagColors = {
  Architecture: "#00d4ff",
  Files: "#f59e0b",
  Conventions: "#a855f7",
  Lifecycle: "#22c55e",
  Logging: "#ff6b35",
  Fundamentals: "#ec4899",
  Components: "#00d4ff",
  Editor: "#a855f7",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function RenderContent({ text, isQuestion }) {
  const segments = [];
  const codeBlockRegex = /```([^`]*?)```/gs;
  let last = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ type: "text", content: text.slice(last, match.index) });
    }
    segments.push({ type: "code", content: match[1].replace(/^\n/, "") });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    segments.push({ type: "text", content: text.slice(last) });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {segments.map((seg, i) => {
        if (seg.type === "code") {
          return (
            <div
              key={i}
              style={{
                background: "#060810",
                border: "1px solid #30363d",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "4px 12px",
                  background: "#0d1117",
                  borderBottom: "1px solid #21262d",
                  fontSize: "10px",
                  color: "#484f58",
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                }}
              >
                c++
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "14px 16px",
                  overflowX: "auto",
                  fontSize: "12px",
                  lineHeight: "1.65",
                  color: "#e6edf3",
                  fontFamily:
                    "'DM Mono', 'Fira Code', 'Courier New', monospace",
                  whiteSpace: "pre",
                }}
              >
                {seg.content}
              </pre>
            </div>
          );
        }
        return (
          <div
            key={i}
            style={{
              color: isQuestion ? "#f0f6fc" : "#c9d1d9",
              fontSize: isQuestion ? "17px" : "14px",
              fontWeight: isQuestion ? 500 : 400,
              lineHeight: "1.7",
            }}
          >
            {renderInlineText(seg.content)}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineText(text) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    const parts = line.split(/(`[^`]+`)/g);
    return (
      <span key={li}>
        {parts.map((part, pi) => {
          if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
            return (
              <code
                key={pi}
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "4px",
                  padding: "1px 6px",
                  fontSize: "12px",
                  color: "#79c0ff",
                  fontFamily: "'DM Mono', 'Fira Code', monospace",
                }}
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        })}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

async function gradeAnswer(question, correctAnswer, userAnswer) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `You are grading a flashcard answer for a student learning Unreal Engine 5 C++.

Question: ${question}

Correct Answer: ${correctAnswer}

Student's Answer: ${userAnswer}

Grade leniently — if the student has the core idea right, mark it correct even if they missed minor details or used different wording. Only mark incorrect if they are clearly missing the main concept or got something factually wrong.

Respond with ONLY a JSON object in this exact format (no markdown, no extra text):
{"correct": true or false, "feedback": "One or two sentences. If correct, say what they got right. If incorrect, explain the key concept they missed."}`,
        },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `API error ${response.status}`);
  }
  const text = data.content.map((i) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export default function Study() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [missed, setMissed] = useState(new Set());
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState("all");

  const [aiMode, setAiMode] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [grading, setGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!router.isReady) return;
    const ids = router.query.lessons?.split(",") ?? [];
    const loaded = getCardsForLessons(ids);
    setCards(shuffle(loaded));
  }, [router.isReady, router.query.lessons]);

  useEffect(() => {
    if (aiMode && textareaRef.current && !flipped) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [current, aiMode, flipped]);

  if (!cards.length) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#060810",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "#484f58", fontSize: "14px" }}>
          Loading cards...
        </div>
      </div>
    );
  }

  const card = cards[current];
  const tagColor = tagColors[card?.tag] || "#8b949e";
  const progress = current / cards.length;

  const advance = () => {
    setFlipped(false);
    setUserAnswer("");
    setGradingResult(null);
    setTimeout(() => {
      if (current + 1 < cards.length) {
        setCurrent((c) => c + 1);
      } else {
        setDone(true);
      }
    }, 120);
  };

  const handleKnow = () => {
    setKnown((prev) => new Set([...prev, card.id]));
    advance();
  };
  const handleMiss = () => {
    setMissed((prev) => new Set([...prev, card.id]));
    advance();
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setGrading(true);
    try {
      const result = await gradeAnswer(card.front, card.back, userAnswer);
      setGradingResult(result);
    } catch (e) {
      console.error("Grader error:", e);
      setGradingResult({
        correct: null,
        feedback: `Grader error: ${e.message}`,
      });
    }
    setFlipped(true);
    setGrading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmitAnswer();
  };

  const toggleAiMode = () => {
    setAiMode((m) => !m);
    setUserAnswer("");
    setGradingResult(null);
    setFlipped(false);
  };

  const restartAll = () => {
    setCards(shuffle(cards));
    setCurrent(0);
    setFlipped(false);
    setKnown(new Set());
    setMissed(new Set());
    setDone(false);
    setMode("all");
    setUserAnswer("");
    setGradingResult(null);
  };

  const reviewMissed = () => {
    const missedCards = shuffle(cards.filter((c) => missed.has(c.id)));
    setCards(missedCards);
    setCurrent(0);
    setFlipped(false);
    setMissed(new Set());
    setDone(false);
    setMode("missed");
    setUserAnswer("");
    setGradingResult(null);
  };

  if (done) {
    const knownCount = known.size;
    const missedCount = missed.size;
    const pct =
      Math.round((knownCount / (knownCount + missedCount)) * 100) || 0;
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#060810",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          gap: "32px",
        }}
      >
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            fontSize: "13px",
            color: "#484f58",
          }}
        >
          ← Back to lessons
        </Link>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>
            {pct === 100 ? "🏆" : pct >= 70 ? "💪" : "📚"}
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#f0f6fc",
              marginBottom: "8px",
            }}
          >
            {mode === "missed" ? "Review Complete" : "Round Complete"}
          </h2>
          <p style={{ color: "#8b949e", fontSize: "15px" }}>
            You scored{" "}
            <span
              style={{
                color: pct >= 70 ? "#22c55e" : "#ff6b35",
                fontWeight: 700,
              }}
            >
              {pct}%
            </span>
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              background: "#0d1117",
              border: "1px solid #22c55e44",
              borderRadius: "12px",
              padding: "20px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: 700, color: "#22c55e" }}
            >
              {knownCount}
            </div>
            <div
              style={{ fontSize: "12px", color: "#484f58", marginTop: "4px" }}
            >
              Got it
            </div>
          </div>
          <div
            style={{
              background: "#0d1117",
              border: "1px solid #ff6b3544",
              borderRadius: "12px",
              padding: "20px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "28px", fontWeight: 700, color: "#ff6b35" }}
            >
              {missedCount}
            </div>
            <div
              style={{ fontSize: "12px", color: "#484f58", marginTop: "4px" }}
            >
              Again
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {missedCount > 0 && (
            <button
              onClick={reviewMissed}
              style={{
                background: "#ff6b35",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            >
              Review {missedCount} missed
            </button>
          )}
          <button
            onClick={restartAll}
            style={{
              background: "#21262d",
              border: "1px solid #30363d",
              borderRadius: "10px",
              padding: "12px 24px",
              color: "#8b949e",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          >
            Restart all
          </button>
          <Link
            href="/"
            style={{
              background: "transparent",
              border: "1px solid #30363d",
              borderRadius: "10px",
              padding: "12px 24px",
              color: "#484f58",
              fontWeight: 600,
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            Change lessons
          </Link>
        </div>
      </div>
    );
  }

  const resultColor =
    gradingResult?.correct === null
      ? "#8b949e"
      : gradingResult?.correct
        ? "#22c55e"
        : "#ff6b35";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        gap: "20px",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ fontSize: "13px", color: "#484f58" }}>
          ← lessons
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {mode === "missed" && (
            <span
              style={{
                fontSize: "11px",
                color: "#ff6b35",
                background: "#ff6b3518",
                border: "1px solid #ff6b3533",
                padding: "3px 10px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              Review Mode
            </span>
          )}
          <button
            onClick={toggleAiMode}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: aiMode ? "#a855f718" : "transparent",
              border: `1px solid ${aiMode ? "#a855f755" : "#30363d"}`,
              borderRadius: "20px",
              padding: "3px 12px",
              color: aiMode ? "#a855f7" : "#484f58",
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ✦ AI {aiMode ? "On" : "Off"}
          </button>
        </div>
        <span style={{ fontSize: "12px", color: "#484f58" }}>
          {current + 1} / {cards.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div
          style={{ height: "3px", background: "#21262d", borderRadius: "2px" }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, #00d4ff, #a855f7)",
              borderRadius: "2px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "6px",
          }}
        >
          <span style={{ fontSize: "11px", color: "#22c55e" }}>
            ✓ {known.size}
          </span>
          <span style={{ fontSize: "11px", color: "#ff6b35" }}>
            ✗ {missed.size}
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => {
          if (!aiMode) setFlipped((f) => !f);
        }}
        style={{
          width: "100%",
          maxWidth: "600px",
          minHeight: "300px",
          background: "#0d1117",
          border: `1px solid ${flipped ? tagColor + "55" : "#161b22"}`,
          borderRadius: "16px",
          padding: "28px 32px",
          cursor: aiMode ? "default" : "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: flipped ? `0 0 40px ${tagColor}15` : "none",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "3px 10px",
            borderRadius: "20px",
            background: tagColor + "18",
            border: `1px solid ${tagColor}44`,
            fontSize: "11px",
            color: tagColor,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {card.tag}
        </div>
        {card.lessonTitle && (
          <div style={{ fontSize: "11px", color: "#30363d" }}>
            Lesson {card.lesson} · {card.lessonTitle}
          </div>
        )}
        <div
          style={{
            fontSize: "11px",
            color: "#484f58",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {flipped ? "Answer" : "Question"}
        </div>
        <div style={{ flex: 1 }}>
          <RenderContent
            text={flipped ? card.back : card.front}
            isQuestion={!flipped}
          />
        </div>
        {!flipped && !aiMode && (
          <div
            style={{
              fontSize: "11px",
              color: "#21262d",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            tap to reveal
          </div>
        )}
      </div>

      {/* AI feedback banner */}
      {flipped && gradingResult && (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: `${resultColor}10`,
            border: `1px solid ${resultColor}44`,
            borderRadius: "12px",
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>
              {gradingResult.correct === null
                ? "⚠"
                : gradingResult.correct
                  ? "✓"
                  : "✗"}
            </span>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: resultColor }}
            >
              {gradingResult.correct === null
                ? "Grader unavailable"
                : gradingResult.correct
                  ? "Correct"
                  : "Not quite"}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#8b949e",
              lineHeight: "1.6",
            }}
          >
            {gradingResult.feedback}
          </p>
        </div>
      )}

      {/* Bottom controls */}
      {aiMode ? (
        !flipped ? (
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <textarea
              ref={textareaRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (Ctrl+Enter to submit)"
              style={{
                width: "100%",
                minHeight: "110px",
                background: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "12px",
                padding: "14px 16px",
                color: "#c9d1d9",
                fontSize: "14px",
                lineHeight: "1.6",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <button
              onClick={handleSubmitAnswer}
              disabled={grading || !userAnswer.trim()}
              style={{
                background:
                  grading || !userAnswer.trim()
                    ? "#0d1117"
                    : "linear-gradient(135deg, #00d4ff12, #a855f722)",
                border: `1px solid ${grading || !userAnswer.trim() ? "#21262d" : "#a855f755"}`,
                borderRadius: "12px",
                padding: "14px",
                color: grading || !userAnswer.trim() ? "#30363d" : "#a855f7",
                fontWeight: 700,
                fontSize: "14px",
                fontFamily: "inherit",
                cursor:
                  grading || !userAnswer.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {grading
                ? "✦ Analysing your answer..."
                : "✦ Submit for AI Review"}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "12px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <button
              onClick={handleMiss}
              style={{
                flex: 1,
                background: "#0d1117",
                border: "1px solid #ff6b3555",
                borderRadius: "12px",
                padding: "16px",
                color: "#ff6b35",
                fontWeight: 700,
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            >
              ✗ Again
            </button>
            <button
              onClick={handleKnow}
              style={{
                flex: 1,
                background: "#0d1117",
                border: "1px solid #22c55e55",
                borderRadius: "12px",
                padding: "16px",
                color: "#22c55e",
                fontWeight: 700,
                fontSize: "15px",
                fontFamily: "inherit",
              }}
            >
              ✓ Got it
            </button>
          </div>
        )
      ) : flipped ? (
        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <button
            onClick={handleMiss}
            style={{
              flex: 1,
              background: "#0d1117",
              border: "1px solid #ff6b3555",
              borderRadius: "12px",
              padding: "16px",
              color: "#ff6b35",
              fontWeight: 700,
              fontSize: "15px",
              fontFamily: "inherit",
            }}
          >
            ✗ Again
          </button>
          <button
            onClick={handleKnow}
            style={{
              flex: 1,
              background: "#0d1117",
              border: "1px solid #22c55e55",
              borderRadius: "12px",
              padding: "16px",
              color: "#22c55e",
              fontWeight: 700,
              fontSize: "15px",
              fontFamily: "inherit",
            }}
          >
            ✓ Got it
          </button>
        </div>
      ) : (
        <div style={{ height: "56px", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#21262d" }}>
            click the card to see the answer
          </span>
        </div>
      )}
    </div>
  );
}
