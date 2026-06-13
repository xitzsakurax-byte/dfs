'use client';

import {
  Sprout, Flame, Swords, Trophy, BookOpen, Library, BrainCircuit, Crown,
  Star, Sparkles, Zap, PenLine, Target, Medal, Award, type LucideIcon,
} from 'lucide-react';

/* Registry for achievement icons. lib/gamification.ts stores plain string
   keys (e.g. "crown") so the data layer stays serialisable; pages render
   them through this component. Falls back to Award for unknown keys. */
const REGISTRY: Record<string, LucideIcon> = {
  'sprout': Sprout,
  'flame': Flame,
  'swords': Swords,
  'trophy': Trophy,
  'book-open': BookOpen,
  'library': Library,
  'brain-circuit': BrainCircuit,
  'crown': Crown,
  'star': Star,
  'sparkles': Sparkles,
  'zap': Zap,
  'pen-line': PenLine,
  'target': Target,
  'medal': Medal,
};

export default function AchievementIcon({
  name,
  size = 20,
  locked = false,
  className,
}: {
  name: string;
  size?: number;
  locked?: boolean;
  className?: string;
}) {
  const Icon = REGISTRY[name] ?? Award;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl flex-shrink-0 ${className ?? ''}`}
      style={{
        width: size * 2.2,
        height: size * 2.2,
        background: locked ? 'var(--surface-3)' : 'rgba(212,160,23,0.12)',
        border: `1px solid ${locked ? 'var(--line-2)' : 'rgba(212,160,23,0.35)'}`,
        boxShadow: locked ? 'none' : '0 0 14px rgba(212,160,23,0.18)',
      }}
    >
      <Icon size={size} style={{ color: locked ? 'var(--muted)' : 'var(--gold-bright)' }} strokeWidth={1.8} />
    </span>
  );
}
