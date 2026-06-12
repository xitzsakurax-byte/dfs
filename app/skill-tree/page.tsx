'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSkillTree, type SkillNode } from '@/lib/gamification';
import MobileBottomNav from '@/components/MobileBottomNav';

const CEFR_COLORS: Record<string, string> = {
  B1: 'var(--gold)',
  B2: 'var(--gold-warm)',
  C1: '#A78BFA',
};

const CEFR_BG: Record<string, string> = {
  B1: 'rgba(212,160,23,0.08)',
  B2: 'rgba(232,150,42,0.08)',
  C1: 'rgba(167,139,250,0.08)',
};

const CEFR_BORDER: Record<string, string> = {
  B1: 'rgba(212,160,23,0.3)',
  B2: 'rgba(232,150,42,0.3)',
  C1: 'rgba(167,139,250,0.3)',
};

function NodeCard({ node, onSelect }: { node: SkillNode; onSelect: (n: SkillNode) => void }) {
  const color = CEFR_COLORS[node.cefr];
  const bg = CEFR_BG[node.cefr];
  const border = CEFR_BORDER[node.cefr];

  return (
    <button
      onClick={() => node.unlocked && onSelect(node)}
      className={`skill-node w-full text-left p-4 ${node.mastery >= 80 ? 'mastered' : node.unlocked ? 'unlocked' : 'locked'}`}
      style={node.unlocked ? { background: bg, borderColor: border } : {}}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-sm">{node.title}</div>
        <div className="text-xs font-bold" style={{ color }}>{node.mastery}%</div>
      </div>
      <div className="xp-bar-track" style={{ height: 4 }}>
        <div
          className="rounded-full transition-all duration-700"
          style={{
            width: `${node.mastery}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: node.mastery > 0 ? `0 0 6px ${color}60` : 'none',
          }}
        />
      </div>
      {!node.unlocked && (
        <div className="mt-2 text-xs text-[var(--muted)]">
          🔒 Locked — complete prerequisites first
        </div>
      )}
    </button>
  );
}

export default function SkillTreePage() {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [selected, setSelected] = useState<SkillNode | null>(null);

  useEffect(() => {
    setNodes(getSkillTree());
  }, []);

  const b1 = nodes.filter(n => n.cefr === 'B1');
  const b2 = nodes.filter(n => n.cefr === 'B2');
  const c1 = nodes.filter(n => n.cefr === 'C1');

  const avgMastery = (ns: SkillNode[]) =>
    ns.length > 0 ? Math.round(ns.reduce((s, n) => s + n.mastery, 0) / ns.length) : 0;

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-sm font-black">GF</Link>
          <span className="font-semibold tracking-tight hidden sm:block">GermanForge</span>
        </div>
        <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[var(--gold)]">← Dashboard</Link>
      </nav>

      <div className="pt-20 container max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-10">
          <div className="section-label mb-3">Skill Progression</div>
          <h1 className="text-[40px] sm:text-[48px] font-black tracking-[-2px] mb-3">Skill Tree</h1>
          <p className="text-[var(--text-2)] text-lg max-w-[55ch]">
            Your CEFR progression from B1 to C1. Mastery percentages are calculated from your quiz performance across all modules.
          </p>
        </div>

        {/* CEFR summary row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { level: 'B1', nodes: b1, desc: 'Foundation' },
            { level: 'B2', nodes: b2, desc: 'Upper Intermediate' },
            { level: 'C1', nodes: c1, desc: 'Advanced' },
          ].map(({ level, nodes: ns, desc }) => (
            <div key={level} className="glass-card p-5 text-center">
              <div className="text-2xl font-black mb-1" style={{ color: CEFR_COLORS[level] }}>{level}</div>
              <div className="text-xs text-[var(--muted)] mb-3">{desc}</div>
              <div className="text-3xl font-black tabular-nums gradient-text">{avgMastery(ns)}%</div>
              <div className="xp-bar-track mt-3">
                <div
                  className="rounded-full"
                  style={{
                    width: `${avgMastery(ns)}%`,
                    height: '6px',
                    background: `linear-gradient(90deg, ${CEFR_COLORS[level]}, ${CEFR_COLORS[level]}88)`,
                    boxShadow: `0 0 8px ${CEFR_COLORS[level]}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skill tree visual (B1 → B2 → C1 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { level: 'B1', ns: b1, label: 'Foundation — B1' },
            { level: 'B2', ns: b2, label: 'Upper Intermediate — B2' },
            { level: 'C1', ns: c1, label: 'Advanced — C1' },
          ].map(({ level, ns, label }) => (
            <div key={level}>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-sm font-bold" style={{ color: CEFR_COLORS[level] }}>{label}</div>
                <div className="flex-1 h-px" style={{ background: CEFR_COLORS[level], opacity: 0.25 }} />
              </div>
              <div className="space-y-3">
                {ns.map(node => (
                  <NodeCard key={node.id} node={node} onSelect={setSelected} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:fixed sm:bottom-8 sm:right-8 sm:w-80 z-40">
            <div className="glass-card p-6"
              style={{ borderColor: CEFR_BORDER[selected.cefr], background: CEFR_BG[selected.cefr] }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: CEFR_COLORS[selected.cefr] }}>
                    {selected.cefr}
                  </div>
                  <div className="font-black text-lg">{selected.title}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-[var(--muted)] hover:text-[var(--text)] text-xl">✕</button>
              </div>
              <div className="flex items-center justify-between mb-3 text-sm">
                <span className="text-[var(--muted)]">Mastery</span>
                <span className="font-bold" style={{ color: CEFR_COLORS[selected.cefr] }}>{selected.mastery}%</span>
              </div>
              <div className="xp-bar-track mb-4">
                <div
                  className="rounded-full"
                  style={{
                    width: `${selected.mastery}%`,
                    height: '6px',
                    background: `linear-gradient(90deg, ${CEFR_COLORS[selected.cefr]}, ${CEFR_COLORS[selected.cefr]}88)`,
                  }}
                />
              </div>
              {selected.mastery < 80 && (
                <p className="text-sm text-[var(--text-2)] mb-4">
                  Practice {selected.topic} exercises to improve this node. {80 - selected.mastery}% more needed to fully unlock.
                </p>
              )}
              <Link
                href={selected.topic === 'writing' ? '/practice/writing' : selected.topic === 'vocab' ? '/practice/vocab' : '/practice/grammar'}
                className="btn-primary text-sm px-5 py-2 inline-block w-full text-center"
              >
                Practice {selected.title} →
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-[var(--muted)]">
          Mastery is calculated from your answers across all practice modules.<br />
          Answer more questions to see accurate percentages.
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
