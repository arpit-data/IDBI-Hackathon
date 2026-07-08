/**
 * Goal Planner Page
 * Track financial goals and simulate investment scenarios.
 */
'use client';

import { useState, useMemo } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { sampleGoals } from '@/lib/data/syntheticData';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { calculateSIPFutureValue } from '@/lib/utils/calculations';
// Goal categories use goal.icon and goal.color directly from data

/** Goal Planner Page Component */
export default function GoalsPage() {
  const [sipAmount, setSipAmount] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);

  /** Calculate projected values at different horizons */
  const projections = useMemo(
    () => [5, 10, 15, 20].map((years) => ({
      years,
      value: calculateSIPFutureValue(sipAmount, returnRate, years),
    })),
    [sipAmount, returnRate]
  );

  /** Status badge mapping */
  const statusBadge = (status: string) => {
    switch (status) {
      case 'on_track': return 'badge-success';
      case 'behind': return 'badge-warning';
      case 'at_risk': return 'badge-danger';
      case 'ahead': return 'badge-info';
      case 'completed': return 'badge-success';
      default: return 'badge-neutral';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'on_track': return 'On Track';
      case 'behind': return 'Behind';
      case 'at_risk': return 'At Risk';
      case 'ahead': return 'Ahead';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="goals-page-title">Goal Planner</h1>
        <p className="page-description">Plan and track your financial goals with AI-powered projections.</p>
      </div>

      {/* Goals Grid */}
      <div className="grid-3 stagger" role="list" aria-label="Financial goals">
        {sampleGoals.map((goal) => {
          const progressColor = goal.status === 'on_track' || goal.status === 'ahead'
            ? 'success'
            : goal.status === 'behind'
            ? 'warning'
            : 'danger';

          return (
            <div key={goal.id} className="goal-card" id={`goal-${goal.id}`} role="listitem">
              <div className="goal-card-header">
                <div className="goal-card-icon" style={{ background: `${goal.color}15` }}>
                  {goal.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="goal-card-title">{goal.name}</p>
                  <p className="goal-card-target">
                    Target: {formatCurrency(goal.targetAmount, false)}
                  </p>
                </div>
                <span className={`badge ${statusBadge(goal.status)}`}>
                  {statusLabel(goal.status)}
                </span>
              </div>

              {/* Progress */}
              <div className="goal-card-progress">
                <div className="goal-card-progress-text">
                  <span>{formatCurrency(goal.currentAmount, false)}</span>
                  <span>{goal.progress.toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${progressColor}`}
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={goal.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${goal.name}: ${goal.progress}% complete`}
                  />
                </div>
              </div>

              {/* Details */}
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <TrendingUp size={12} /> {formatCurrency(goal.monthlyContribution, false)}/mo
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                  <Calendar size={12} /> {formatDate(goal.targetDate, 'medium')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* What-If Simulator */}
      <div className="card card-accent section-gap" id="goal-simulator">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-2)' }}>
          🔮 What-If Simulator
        </h2>
        <p className="card-subtitle" style={{ marginBottom: 'var(--space-6)' }}>
          See how your investments could grow over time
        </p>

        {/* Sliders */}
        <div className="grid-2" style={{ gap: 'var(--space-8)' }}>
          <div className="form-group">
            <label htmlFor="sip-slider" className="form-label">
              Monthly SIP: <strong style={{ color: 'var(--color-accent)' }}>
                {formatCurrency(sipAmount, false)}
              </strong>
            </label>
            <input
              type="range"
              id="sip-slider"
              className="slider"
              min={5000}
              max={50000}
              step={1000}
              value={sipAmount}
              onChange={(e) => setSipAmount(Number(e.target.value))}
              aria-label={`Monthly SIP amount: ${sipAmount}`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
              <span>₹5,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="return-slider" className="form-label">
              Expected Returns: <strong style={{ color: 'var(--color-accent)' }}>
                {returnRate}% p.a.
              </strong>
            </label>
            <input
              type="range"
              id="return-slider"
              className="slider"
              min={6}
              max={15}
              step={0.5}
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              aria-label={`Expected return rate: ${returnRate}%`}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
              <span>6%</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Projections */}
        <div className="grid-4" style={{ marginTop: 'var(--space-6)' }}>
          {projections.map((p) => (
            <div
              key={p.years}
              className="summary-card"
              style={{ textAlign: 'center' }}
            >
              <p className="summary-card-label">{p.years} Years</p>
              <p className="summary-card-value" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-accent)' }}>
                {formatCurrency(p.value, false)}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                Invested: {formatCurrency(sipAmount * p.years * 12, false)}
              </p>
            </div>
          ))}
        </div>

        <div className="disclaimer" style={{ marginTop: 'var(--space-4)' }}>
          Projections are based on assumed constant returns. Actual returns may vary. This is not a guarantee of performance.
        </div>
      </div>
    </div>
  );
}
