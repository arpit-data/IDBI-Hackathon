/**
 * Financial Health Score Page
 * Displays the user's composite financial health score with
 * animated ring, category breakdown, and action items.
 */
'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import { calculateHealthScore } from '@/lib/engines/healthScore';
import {
  sampleUser,
  monthlySummaries,
  samplePortfolio,
  sampleAccount,
} from '@/lib/data/syntheticData';
import { formatMonth } from '@/lib/utils/formatters';

/** Health Score Page Component */
export default function HealthPage() {
  const healthScore = useMemo(
    () =>
      calculateHealthScore(
        sampleUser,
        monthlySummaries,
        samplePortfolio,
        sampleAccount.balance
      ),
    []
  );

  /** SVG ring dimensions */
  const RING_SIZE = 200;
  const STROKE_WIDTH = 14;
  const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = CIRCUMFERENCE - (healthScore.overall / 100) * CIRCUMFERENCE;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="health-page-title">Financial Health Score</h1>
        <p className="page-description">
          A comprehensive assessment of your financial well-being based on savings, debt, emergency fund, investments, and spending habits.
        </p>
      </div>

      {/* Score Ring + Summary */}
      <div className="card card-accent" id="health-score-card" style={{ textAlign: 'center', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>
        <div className="health-ring-container" style={{ width: RING_SIZE, height: RING_SIZE, margin: '0 auto' }}>
          <svg
            className="health-ring-svg"
            width={RING_SIZE}
            height={RING_SIZE}
            aria-hidden="true"
          >
            <circle
              className="health-ring-bg"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
            />
            <circle
              className="health-ring-fill"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              stroke={healthScore.color}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </svg>
          <div className="health-ring-center">
            <div className="health-ring-score" style={{ color: healthScore.color }}>
              {healthScore.overall}
            </div>
            <div className="health-ring-label">out of 100</div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-4)' }}>
          <span
            className="badge"
            style={{
              background: `${healthScore.color}22`,
              color: healthScore.color,
              fontSize: 'var(--text-base)',
              padding: 'var(--space-2) var(--space-4)',
            }}
          >
            {healthScore.label}
          </span>
          {healthScore.monthlyChange !== 0 && (
            <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              {healthScore.monthlyChange > 0 ? (
                <><TrendingUp size={14} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--color-success)' }} /> +{healthScore.monthlyChange} points from last month</>
              ) : (
                <><TrendingDown size={14} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--color-danger)' }} /> {healthScore.monthlyChange} points from last month</>
              )}
            </p>
          )}
        </div>
        <p className="sr-only" role="status">
          Your financial health score is {healthScore.overall} out of 100, rated {healthScore.label}.
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="card section-gap" id="health-categories-card">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-6)' }}>Score Breakdown</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {healthScore.categories.map((cat, i) => (
            <div key={i} id={`health-cat-${i}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span aria-hidden="true">{cat.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{cat.name}</span>
                  <span className={`badge badge-${cat.status === 'good' ? 'success' : cat.status === 'average' ? 'warning' : 'danger'}`}>
                    {cat.status}
                  </span>
                </div>
                <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)' }}>
                  {cat.score}/100
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-bar-fill ${cat.status === 'good' ? 'success' : cat.status === 'average' ? 'warning' : 'danger'}`}
                  style={{ width: `${cat.score}%` }}
                  role="progressbar"
                  aria-valuenow={cat.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.name}: ${cat.score} out of 100`}
                />
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                {cat.description} (Weight: {(cat.weight * 100).toFixed(0)}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      {healthScore.actionItems.length > 0 && (
        <div className="card section-gap" id="health-actions-card">
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>
            AI Recommended Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {healthScore.actionItems.map((item) => (
              <div key={item.id} className="action-item" id={`action-${item.id}`}>
                <div className="action-item-checkbox">
                  <AlertCircle size={14} style={{ color: item.impact === 'high' ? 'var(--color-danger)' : 'var(--color-warning)' }} />
                </div>
                <div className="action-item-content">
                  <p className="action-item-title">{item.title}</p>
                  <p className="action-item-desc">{item.description}</p>
                  <span className="action-item-impact">
                    <span className={`badge badge-${item.impact === 'high' ? 'danger' : item.impact === 'medium' ? 'warning' : 'info'}`}>
                      +{item.estimatedScoreImprovement} pts • {item.impact} impact
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Trend */}
      <div className="card section-gap" id="health-history-card">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Score Trend (6 Months)</h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-end', justifyContent: 'space-around', minHeight: 120 }}>
          {healthScore.history.map((entry, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  height: `${entry.score * 1.2}px`,
                  background: i === 0 ? 'var(--gradient-accent)' : '#e2e8f0',
                  borderRadius: 'var(--radius-md)',
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: 40,
                  transition: 'height var(--transition-slow)',
                }}
                role="img"
                aria-label={`${formatMonth(entry.month)}: ${entry.score}`}
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                {formatMonth(entry.month)}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{entry.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Your Financial Health Score is calculated using your transaction data, savings patterns, investment portfolio, and debt obligations. 
        This score is for informational purposes and does not constitute financial advice.
      </div>
    </div>
  );
}
