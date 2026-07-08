/**
 * Dashboard Page
 * Main landing page with financial summary, quick actions,
 * recent transactions, and AI insights.
 */
'use client';

import Link from 'next/link';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Percent,
  Bot,
  Briefcase,
  Target,
  CreditCard,
  TrendingUp,
  TrendingDown,
  HeartPulse,
  Flame,
  Trophy,
  CheckCircle,
  Bell,
  ChevronRight,
} from 'lucide-react';
import {
  sampleUser,
  sampleAccount,
  sampleTransactions,
  sampleInsights,
  monthlySummaries,
  samplePortfolio,
  achievements,
  streakData,
  smartNudges,
} from '@/lib/data/syntheticData';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { CATEGORY_META } from '@/lib/types/banking';

/** Summary card data */
const summaryCards = [
  {
    id: 'card-balance',
    label: 'Total Balance',
    value: formatCurrency(sampleAccount.balance, false),
    change: '+2.4%',
    positive: true,
    icon: Wallet,
    color: 'var(--gradient-blue)',
  },
  {
    id: 'card-income',
    label: 'Monthly Income',
    value: formatCurrency(sampleUser.monthlySalary, false),
    change: 'Stable',
    positive: true,
    icon: ArrowDownLeft,
    color: 'var(--gradient-success)',
  },
  {
    id: 'card-expenses',
    label: 'Monthly Expenses',
    value: formatCurrency(monthlySummaries[0].totalExpenses, false),
    change: '+8.9%',
    positive: false,
    icon: ArrowUpRight,
    color: 'var(--gradient-danger)',
  },
  {
    id: 'card-savings',
    label: 'Savings Rate',
    value: `${monthlySummaries[0].savingsRate}%`,
    change: '-5.9%',
    positive: false,
    icon: Percent,
    color: 'var(--gradient-purple)',
  },
];

/** Quick action buttons */
const quickActions = [
  { href: '/avatar', label: 'Chat with AI', icon: Bot, color: '#f47920' },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase, color: '#3b82f6' },
  { href: '/goals', label: 'Set Goals', icon: Target, color: '#22c55e' },
  { href: '/spending', label: 'Spending', icon: CreditCard, color: '#8b5cf6' },
];

/** Dashboard Page Component */
export default function DashboardPage() {
  const recentTransactions = sampleTransactions.slice(0, 8);
  const topInsights = sampleInsights.slice(0, 3);
  const topAchievements = achievements.slice(0, 4);
  const unreadNudges = smartNudges
    .filter((n) => !n.read)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);
  const challenge = streakData.weeklyChallenge;
  const challengePercent = Math.round((challenge.progress / challenge.target) * 100);

  return (
    <div>
      {/* Welcome Banner — IDBI Bank Style */}
      <div className="welcome-banner" id="welcome-banner">
        {/* IDBI Logo in banner */}
        <img
          src="/idbi-bank-logo.png"
          alt="IDBI Bank"
          style={{
            position: 'absolute',
            top: 'var(--space-5)',
            right: 'var(--space-6)',
            height: '30px',
            width: 'auto',
            borderRadius: '4px',
            zIndex: 2,
            opacity: 0.9,
          }}
        />
        <p className="welcome-banner-greeting">Good evening, {sampleUser.name.split(' ')[0]} 👋</p>
        <h1 className="welcome-banner-title">Your financial health looks good today</h1>
        <p className="welcome-banner-insight">
          Your portfolio is up {samplePortfolio.totalReturnsPercentage.toFixed(1)}% overall, and
          your SIP streak is going strong at 6 months. Your AI coach has 3 new insights for you.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          <Link href="/avatar" className="btn btn-accent btn-lg" id="banner-cta-chat" style={{ boxShadow: '0 4px 15px rgba(244,121,32,0.35)' }}>
            <Bot size={18} /> Talk to AI Coach
          </Link>
          <Link href="/health" className="btn btn-secondary btn-lg" id="banner-cta-health" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)' }}>
            <HeartPulse size={18} /> Health Score: 82
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 stagger" role="list" aria-label="Financial summary">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="summary-card"
              id={card.id}
              role="listitem"
              style={{ '--card-accent-color': card.color } as React.CSSProperties}
            >
              <div className="summary-card-icon" style={{ color: card.color.includes('var') ? 'var(--color-info)' : 'var(--color-text-secondary)' }}>
                <Icon size={22} />
              </div>
              <p className="summary-card-label">{card.label}</p>
              <p className="summary-card-value">{card.value}</p>
              <span className={`summary-card-change ${card.positive ? 'positive' : 'negative'}`}>
                {card.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {card.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)' }}>
          Quick Actions
        </h2>
        <div className="quick-actions">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="quick-action-btn"
                id={`quick-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div
                  className="quick-action-icon"
                  style={{ background: `${action.color}22`, color: action.color }}
                >
                  <Icon size={20} />
                </div>
                <span className="quick-action-label">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Section: Gamification — Achievements & Streaks ── */}
      <div style={{ marginTop: 'var(--space-8)' }} id="gamification-section">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)' }}>
          🏆 Your Progress
        </h2>

        {/* Streak & Level Bar */}
        <div className="card" id="streak-level-card" style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Left: Level badge + XP */}
            <div style={{ flex: '1 1 280px', minWidth: 0 }} id="level-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--gradient-purple)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: 'white',
                  fontWeight: 700, fontSize: 'var(--text-lg)',
                }}>
                  {streakData.level}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>
                    Level {streakData.level} — {streakData.levelTitle}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                    {streakData.totalXP} / {streakData.nextLevelXP} XP
                  </p>
                </div>
              </div>
              <div className="progress-bar" style={{ height: 10 }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(streakData.totalXP / streakData.nextLevelXP) * 100}%` }}
                />
              </div>
            </div>

            {/* Right: Streak counters */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flex: '1 1 320px', flexWrap: 'wrap' }} id="streak-counters">
              <div className="summary-card" id="streak-sip" style={{ flex: '1 1 120px', textAlign: 'center', padding: 'var(--space-3) var(--space-4)' }}>
                <Flame size={18} style={{ color: '#ef4444', marginBottom: 4 }} />
                <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{streakData.currentSIPStreak}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Month SIP Streak</p>
              </div>
              <div className="summary-card" id="streak-savings" style={{ flex: '1 1 120px', textAlign: 'center', padding: 'var(--space-3) var(--space-4)' }}>
                <span style={{ fontSize: 18 }}>💰</span>
                <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{streakData.currentSavingsStreak}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Month Savings Streak</p>
              </div>
              <div className="summary-card" id="streak-budget" style={{ flex: '1 1 120px', textAlign: 'center', padding: 'var(--space-3) var(--space-4)' }}>
                <span style={{ fontSize: 18 }}>📅</span>
                <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{streakData.budgetStreakDays}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Day Budget Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="card card-accent" id="weekly-challenge-card" style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>
                {challenge.icon} Weekly Challenge
              </p>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
                {challenge.title}
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                {challenge.description}
              </p>
              <div className="progress-bar" style={{ marginBottom: 'var(--space-2)' }}>
                <div className="progress-bar-fill" style={{ width: `${challengePercent}%` }} />
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                {formatCurrency(challenge.progress, false)} / {formatCurrency(challenge.target, false)}
                <span style={{ marginLeft: 'var(--space-2)', fontWeight: 600 }}>{challengePercent}%</span>
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
              <span className="badge" style={{ background: 'var(--color-warning)', color: '#000', fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                {challenge.daysLeft} days left
              </span>
              <Link href="/goals" className="btn btn-accent btn-sm" id="challenge-view-details">
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="grid-4" id="achievement-badges">
          {topAchievements.map((ach) => (
            <div
              key={ach.id}
              className="card"
              id={`achievement-${ach.id}`}
              style={{
                textAlign: 'center',
                position: 'relative',
                opacity: ach.unlocked ? 1 : 0.7,
                borderColor: ach.unlocked ? '#eab308' : undefined,
                borderWidth: ach.unlocked ? 2 : undefined,
              }}
            >
              {ach.unlocked && (
                <CheckCircle
                  size={20}
                  style={{
                    position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)',
                    color: '#22c55e',
                  }}
                />
              )}
              <span style={{ fontSize: 48, lineHeight: 1, display: 'block', marginBottom: 'var(--space-2)' }}>
                {ach.icon}
              </span>
              <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                {ach.title}
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-2)' }}>
                {ach.description}
              </p>
              {!ach.unlocked && (
                <div className="progress-bar" style={{ height: 6, marginBottom: 'var(--space-2)' }}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min((ach.progress / ach.target) * 100, 100)}%` }}
                  />
                </div>
              )}
              <span
                className="badge"
                style={{
                  fontSize: 'var(--text-xs)',
                  background: ach.unlocked ? '#eab30822' : 'var(--color-surface-alt)',
                  color: ach.unlocked ? '#eab308' : 'var(--color-text-muted)',
                }}
              >
                <Trophy size={10} /> +{ach.xpReward} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Smart Nudges Preview ── */}
      <div style={{ marginTop: 'var(--space-8)' }} id="smart-nudges-section">
        <div className="card" id="smart-alerts-card">
          <div className="card-header">
            <h2 className="card-title">
              <Bell size={18} style={{ marginRight: 'var(--space-2)', verticalAlign: 'text-bottom' }} />
              🔔 Smart Alerts
            </h2>
            <Link href="/notifications" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {unreadNudges.map((nudge) => (
              <div
                key={nudge.id}
                id={`nudge-${nudge.id}`}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                  padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-surface-alt)',
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{nudge.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                    {nudge.title}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                    {nudge.message.length > 80 ? nudge.message.slice(0, 80) + '…' : nudge.message}
                  </p>
                </div>
                {nudge.actionLabel && nudge.actionHref && (
                  <Link
                    href={nudge.actionHref}
                    className="btn btn-accent btn-sm"
                    style={{ flexShrink: 0, alignSelf: 'center' }}
                    id={`nudge-action-${nudge.id}`}
                  >
                    {nudge.actionLabel} <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column: Transactions + Insights */}
      <div className="grid-2" style={{ marginTop: 'var(--space-8)' }}>
        {/* Recent Transactions */}
        <div className="card" id="recent-transactions-card">
          <div className="card-header">
            <h2 className="card-title">Recent Transactions</h2>
            <Link href="/spending" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div role="list" aria-label="Recent transactions">
            {recentTransactions.map((txn) => {
              const meta = CATEGORY_META[txn.category];
              return (
                <div
                  key={txn.id}
                  className="transaction-item"
                  role="listitem"
                  id={`txn-${txn.id}`}
                >
                  <div className="transaction-icon" aria-hidden="true">
                    {meta.icon}
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-name">{txn.description}</p>
                    <p className="transaction-date">{formatDate(txn.date, 'relative')}</p>
                  </div>
                  <p className={`transaction-amount ${txn.type}`}>
                    {txn.type === 'credit' ? '+' : '-'}
                    {formatCurrency(txn.amount, false)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card" id="ai-insights-card">
          <div className="card-header">
            <h2 className="card-title">AI Insights</h2>
            <Link href="/insights" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {topInsights.map((insight) => (
              <div key={insight.id} className="insight-card" id={`insight-${insight.id}`}>
                <span className="insight-card-icon" aria-hidden="true">
                  {insight.icon}
                </span>
                <div className="insight-card-content">
                  <p className="insight-card-title">{insight.title}</p>
                  <p className="insight-card-desc">{insight.description}</p>
                  {insight.action && (
                    <p className="insight-card-action">💡 {insight.action}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA to Avatar */}
          <Link
            href="/avatar"
            className="btn btn-accent"
            id="cta-chat-avatar"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
          >
            <Bot size={16} /> Chat with AI Coach
          </Link>
        </div>
      </div>
    </div>
  );
}
