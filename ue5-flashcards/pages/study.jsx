import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCardsForLessons } from '../data/cards';

const tagColors = {
  Architecture: '#00d4ff',
  Files: '#f59e0b',
  Conventions: '#a855f7',
  Lifecycle: '#22c55e',
  Logging: '#ff6b35',
  Fundamentals: '#ec4899',
  Components: '#00d4ff',
  Editor: '#a855f7',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Study() {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [missed, setMissed] = useState(new Set());
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState('all'); // 'all' | 'missed'

  useEffect(() => {
    if (!router.isReady) return;
    const ids = router.query.lessons?.split(',') ?? [];
    const loaded = getCardsForLessons(ids);
    setCards(shuffle(loaded));
  }, [router.isReady, router.query.lessons]);

  if (!cards.length) {
    return (
      <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#484f58', fontSize: '14px' }}>Loading cards...</div>
      </div>
    );
  }

  const card = cards[current];
  const tagColor = tagColors[card?.tag] || '#8b949e';
  const progress = current / cards.length;

  const advance = () => {
    setFlipped(false);
    setTimeout(() => {
      if (current + 1 < cards.length) {
        setCurrent(c => c + 1);
      } else {
        setDone(true);
      }
    }, 120);
  };

  const handleKnow = () => {
    setKnown(prev => new Set([...prev, card.id]));
    advance();
  };

  const handleMiss = () => {
    setMissed(prev => new Set([...prev, card.id]));
    advance();
  };

  const restartAll = () => {
    setCards(shuffle(cards));
    setCurrent(0);
    setFlipped(false);
    setKnown(new Set());
    setMissed(new Set());
    setDone(false);
    setMode('all');
  };

  const reviewMissed = () => {
    const missedCards = shuffle(cards.filter(c => missed.has(c.id)));
    setCards(missedCards);
    setCurrent(0);
    setFlipped(false);
    setMissed(new Set());
    setDone(false);
    setMode('missed');
  };

  if (done) {
    const knownCount = known.size;
    const missedCount = missed.size;
    const pct = Math.round((knownCount / (knownCount + missedCount)) * 100) || 0;

    return (
      <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '32px' }}>
        <Link href="/" style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '13px', color: '#484f58', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back to lessons
        </Link>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>
            {pct === 100 ? '🏆' : pct >= 70 ? '💪' : '📚'}
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#f0f6fc', marginBottom: '8px' }}>
            {mode === 'missed' ? 'Review Complete' : 'Round Complete'}
          </h2>
          <p style={{ color: '#8b949e', fontSize: '15px' }}>
            You scored <span style={{ color: pct >= 70 ? '#22c55e' : '#ff6b35', fontWeight: 700 }}>{pct}%</span>
          </p>
        </div>

        {/* Score breakdown */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{
            background: '#0d1117', border: '1px solid #22c55e44', borderRadius: '12px',
            padding: '20px 28px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#22c55e' }}>{knownCount}</div>
            <div style={{ fontSize: '12px', color: '#484f58', marginTop: '4px' }}>Got it</div>
          </div>
          <div style={{
            background: '#0d1117', border: '1px solid #ff6b3544', borderRadius: '12px',
            padding: '20px 28px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#ff6b35' }}>{missedCount}</div>
            <div style={{ fontSize: '12px', color: '#484f58', marginTop: '4px' }}>Again</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {missedCount > 0 && (
            <button onClick={reviewMissed} style={{
              background: '#ff6b35', border: 'none', borderRadius: '10px',
              padding: '12px 24px', color: '#fff', fontWeight: 700,
              fontSize: '14px', fontFamily: 'inherit'
            }}>
              Review {missedCount} missed
            </button>
          )}
          <button onClick={restartAll} style={{
            background: '#21262d', border: '1px solid #30363d', borderRadius: '10px',
            padding: '12px 24px', color: '#8b949e', fontWeight: 600,
            fontSize: '14px', fontFamily: 'inherit'
          }}>
            Restart all
          </button>
          <Link href="/" style={{
            background: 'transparent', border: '1px solid #30363d', borderRadius: '10px',
            padding: '12px 24px', color: '#484f58', fontWeight: 600,
            fontSize: '14px', display: 'inline-block'
          }}>
            Change lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '20px' }}>
      {/* Top nav */}
      <div style={{ width: '100%', maxWidth: '560px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontSize: '13px', color: '#484f58', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ← lessons
        </Link>
        {mode === 'missed' && (
          <span style={{ fontSize: '11px', color: '#ff6b35', background: '#ff6b3518', border: '1px solid #ff6b3533', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>
            Review Mode
          </span>
        )}
        <span style={{ fontSize: '12px', color: '#484f58' }}>{current + 1} / {cards.length}</span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <div style={{ height: '3px', background: '#21262d', borderRadius: '2px' }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '11px', color: '#22c55e' }}>✓ {known.size}</span>
          <span style={{ fontSize: '11px', color: '#ff6b35' }}>✗ {missed.size}</span>
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          width: '100%',
          maxWidth: '560px',
          minHeight: '300px',
          background: '#0d1117',
          border: `1px solid ${flipped ? tagColor + '55' : '#161b22'}`,
          borderRadius: '16px',
          padding: '32px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: flipped ? `0 0 40px ${tagColor}15` : 'none',
          position: 'relative'
        }}
      >
        {/* Tag */}
        <div style={{
          alignSelf: 'flex-start',
          padding: '3px 10px',
          borderRadius: '20px',
          background: tagColor + '18',
          border: `1px solid ${tagColor}44`,
          fontSize: '11px',
          color: tagColor,
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {card.tag}
        </div>

        {/* Lesson label */}
        {card.lessonTitle && (
          <div style={{ fontSize: '11px', color: '#30363d' }}>
            Lesson {card.lesson} · {card.lessonTitle}
          </div>
        )}

        {/* Side label */}
        <div style={{ fontSize: '11px', color: '#484f58', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {flipped ? 'Answer' : 'Question'}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          color: flipped ? '#c9d1d9' : '#f0f6fc',
          fontSize: flipped ? '14px' : '17px',
          fontWeight: flipped ? 400 : 500,
          lineHeight: '1.7',
          whiteSpace: 'pre-line',
        }}>
          {flipped ? card.back : card.front}
        </div>

        {!flipped && (
          <div style={{ fontSize: '11px', color: '#21262d', textAlign: 'center', marginTop: '8px' }}>
            tap to reveal
          </div>
        )}
      </div>

      {/* Action buttons */}
      {flipped ? (
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '560px' }}>
          <button
            onClick={handleMiss}
            style={{
              flex: 1, background: '#0d1117',
              border: '1px solid #ff6b3555', borderRadius: '12px',
              padding: '16px', color: '#ff6b35', fontWeight: 700,
              fontSize: '15px', fontFamily: 'inherit',
              transition: 'background 0.15s'
            }}
          >
            ✗ Again
          </button>
          <button
            onClick={handleKnow}
            style={{
              flex: 1, background: '#0d1117',
              border: '1px solid #22c55e55', borderRadius: '12px',
              padding: '16px', color: '#22c55e', fontWeight: 700,
              fontSize: '15px', fontFamily: 'inherit',
              transition: 'background 0.15s'
            }}
          >
            ✓ Got it
          </button>
        </div>
      ) : (
        <div style={{ height: '56px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#21262d' }}>click the card to see the answer</span>
        </div>
      )}
    </div>
  );
}
