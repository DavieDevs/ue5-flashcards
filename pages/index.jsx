import { useState } from 'react';
import { useRouter } from 'next/router';
import { lessons, getSections, getLessonsForSection } from '../data/cards';

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

const sectionColors = ['#00d4ff', '#ff6b35', '#a855f7', '#22c55e', '#f59e0b', '#ec4899'];

export default function Home() {
  const router = useRouter();
  const sections = getSections();
  const [selected, setSelected] = useState(new Set());
  const [activeSection, setActiveSection] = useState(sections[0] ?? 1);

  const visibleLessons = getLessonsForSection(activeSection);
  const totalSelected = selected.size;
  const totalCards = lessons
    .filter(l => selected.has(l.id))
    .reduce((a, l) => a + l.cards.length, 0);

  const toggleLesson = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectSection = (section) => {
    const ids = getLessonsForSection(section).map(l => l.id);
    const allSelected = ids.every(id => selected.has(id));
    setSelected(prev => {
      const next = new Set(prev);
      ids.forEach(id => allSelected ? next.delete(id) : next.add(id));
      return next;
    });
  };

  const startStudy = () => {
    if (totalSelected === 0) return;
    const ids = Array.from(selected).join(',');
    router.push(`/study?lessons=${ids}`);
  };

  const sectionColor = sectionColors[(activeSection - 1) % sectionColors.length];

  return (
    <div style={{ minHeight: '100vh', background: '#060810' }}>
      {/* Top bar */}
      <div className="topbar" style={{
        borderBottom: '1px solid #161b22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        position: 'sticky',
        top: 0,
        background: '#060810',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 800, color: '#000'
          }}>U</div>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#f0f6fc' }}>UE5 Flashcards</span>
        </div>
        <div style={{ fontSize: '12px', color: '#484f58' }}>
          GameDev.tv · Kaan Alpar
        </div>
      </div>

      <div className="main-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '12px', color: '#484f58', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Unreal Engine 5 C++ Game Development
          </div>
          <h1 className="hero-h1">
            Study Flashcards
          </h1>
          <p style={{ color: '#8b949e', fontSize: '15px', maxWidth: '480px', lineHeight: 1.6 }}>
            Select individual lessons or entire sections to study. Mix lessons for a combined test across multiple topics.
          </p>
        </div>

        <div className="main-grid">
          {/* Section tabs */}
          <div className="section-tabs">
            <div style={{ fontSize: '11px', color: '#484f58', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
              Sections
            </div>
            {sections.map((s, i) => {
              const sc = sectionColors[i % sectionColors.length];
              const sLessons = getLessonsForSection(s);
              const allSel = sLessons.every(l => selected.has(l.id));
              return (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  style={{
                    background: activeSection === s ? '#0d1117' : 'transparent',
                    border: activeSection === s ? `1px solid ${sc}44` : '1px solid transparent',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textAlign: 'left',
                    color: activeSection === s ? '#f0f6fc' : '#484f58',
                    transition: 'all 0.15s',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: allSel ? sc : (activeSection === s ? sc : '#21262d'),
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Section {s}</div>
                    <div style={{ fontSize: '11px', color: '#484f58', marginTop: '1px' }}>{sLessons.length} lesson{sLessons.length !== 1 ? 's' : ''}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Lesson cards */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#484f58', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Section {activeSection} · {visibleLessons.length} Lesson{visibleLessons.length !== 1 ? 's' : ''}
              </div>
              <button
                onClick={() => selectSection(activeSection)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${sectionColor}44`,
                  borderRadius: '6px',
                  padding: '5px 12px',
                  color: sectionColor,
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {getLessonsForSection(activeSection).every(l => selected.has(l.id)) ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {visibleLessons.map(lesson => {
                const isSelected = selected.has(lesson.id);
                const tags = [...new Set(lesson.cards.map(c => c.tag))];
                return (
                  <button
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    style={{
                      background: isSelected ? '#0d1117' : '#0a0e17',
                      border: isSelected ? `1px solid ${sectionColor}66` : '1px solid #161b22',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.15s',
                      boxShadow: isSelected ? `0 0 20px ${sectionColor}12` : 'none'
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                      border: `2px solid ${isSelected ? sectionColor : '#30363d'}`,
                      background: isSelected ? sectionColor : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: '#000', fontWeight: 700,
                      transition: 'all 0.15s'
                    }}>
                      {isSelected ? '✓' : ''}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#484f58' }}>Lesson {lesson.lesson}</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#f0f6fc' : '#8b949e' }}>
                          {lesson.title}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#484f58', marginBottom: '8px' }}>
                        {lesson.description}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {tags.map(tag => (
                          <span key={tag} style={{
                            padding: '2px 8px',
                            borderRadius: '20px',
                            background: (tagColors[tag] || '#8b949e') + '18',
                            border: `1px solid ${(tagColors[tag] || '#8b949e')}33`,
                            fontSize: '10px',
                            color: tagColors[tag] || '#8b949e',
                            fontWeight: 600
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Card count */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: isSelected ? sectionColor : '#30363d' }}>
                        {lesson.cards.length}
                      </div>
                      <div style={{ fontSize: '10px', color: '#484f58' }}>cards</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky start bar */}
      {totalSelected > 0 && (
        <div className="bottom-bar" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: '#0d1117',
          borderTop: '1px solid #21262d',
        }}>
          <div>
            <span style={{ color: '#f0f6fc', fontWeight: 600 }}>{totalSelected} lesson{totalSelected !== 1 ? 's' : ''} selected</span>
            <span style={{ color: '#484f58', marginLeft: '8px', fontSize: '14px' }}>· {totalCards} cards</span>
          </div>
          <button
            className="bottom-bar-start-btn"
            onClick={startStudy}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 28px',
              color: '#000',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          >
            Start Studying →
          </button>
        </div>
      )}
    </div>
  );
}
