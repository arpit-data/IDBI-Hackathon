/**
 * Spending Analytics Page
 * Visualizes spending patterns with charts and behavioral insights.
 */
'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { monthlySummaries, sampleInsights, upiTransactions, upiSummary } from '@/lib/data/syntheticData';
import { formatCurrency, formatMonth } from '@/lib/utils/formatters';
import { CATEGORY_META } from '@/lib/types/banking';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

/** Spending Analytics Page Component */
export default function SpendingPage() {
  const latestMonth = monthlySummaries[0];

  /** Filter to actual spending categories (exclude salary, investment) */
  const spendingCategories = useMemo(
    () =>
      latestMonth.categoryBreakdown.filter(
        (c) => c.category !== 'salary' && c.category !== 'investment'
      ),
    [latestMonth]
  );

  /** Doughnut chart data */
  const doughnutData = useMemo(
    () => ({
      labels: spendingCategories.map((c) => CATEGORY_META[c.category].label),
      datasets: [
        {
          data: spendingCategories.map((c) => c.amount),
          backgroundColor: spendingCategories.map((c) => CATEGORY_META[c.category].color),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    }),
    [spendingCategories]
  );

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#2c3e50',
        bodyColor: '#5a6a7e',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: { label?: string; raw?: unknown }) =>
            `${ctx.label}: ${formatCurrency(ctx.raw as number, false)}`,
        },
      },
    },
  };

  /** Bar chart data — monthly expense trend */
  const barData = useMemo(
    () => ({
      labels: [...monthlySummaries].reverse().map((m) => formatMonth(m.month)),
      datasets: [
        {
          label: 'Total Expenses',
          data: [...monthlySummaries].reverse().map((m) => m.totalExpenses),
          backgroundColor: 'rgba(0, 131, 108, 0.6)',
          borderColor: '#00836c',
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(0, 131, 108, 0.8)',
        },
      ],
    }),
    []
  );

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#2c3e50',
        bodyColor: '#5a6a7e',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: { raw?: unknown }) =>
            `Expenses: ${formatCurrency(ctx.raw as number, false)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#8d99a8', font: { size: 11 } },
      },
      y: {
        grid: { color: '#e2e8f0' },
        ticks: {
          color: '#8d99a8',
          font: { size: 11 },
          callback: (value: string | number) => `₹${(Number(value) / 1000).toFixed(0)}K`,
        },
      },
    },
  };

  /** Total spending (excl. investments) */
  const totalSpending = spendingCategories.reduce((s, c) => s + c.amount, 0);

  const spendingInsights = sampleInsights.filter((i) => i.category === 'spending');

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="spending-page-title">Spending Analytics</h1>
        <p className="page-description">
          Understand where your money goes and identify opportunities to save.
        </p>
      </div>

      {/* Spending breakdown + Category list */}
      <div className="grid-2">
        {/* Doughnut Chart */}
        <div className="card" id="spending-chart-card">
          <h2 className="card-title">
            Spending Breakdown — {formatMonth(latestMonth.month)}
          </h2>
          <p className="card-subtitle">Total: {formatCurrency(totalSpending, false)}</p>
          <div className="chart-container" style={{ height: 280, marginTop: 'var(--space-4)', position: 'relative' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            {/* Center text */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', textAlign: 'center',
              pointerEvents: 'none',
            }}>
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {formatCurrency(totalSpending, false)}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Spent</p>
            </div>
          </div>
        </div>

        {/* Category List */}
        <div className="card" id="spending-categories-card">
          <h2 className="card-title">By Category</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
            {spendingCategories.map((cat, i) => {
              const meta = CATEGORY_META[cat.category];
              return (
                <div
                  key={i}
                  className="transaction-item"
                  id={`spend-cat-${cat.category}`}
                >
                  <div className="transaction-icon" style={{ fontSize: 'var(--text-lg)' }} aria-hidden="true">
                    {meta.icon}
                  </div>
                  <div className="transaction-info">
                    <p className="transaction-name">{meta.label}</p>
                    <p className="transaction-date">{cat.transactionCount} transactions</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="transaction-amount debit">
                      {formatCurrency(cat.amount, false)}
                    </p>
                    {cat.monthOverMonthChange !== null && (
                      <span className={`summary-card-change ${cat.monthOverMonthChange <= 0 ? 'positive' : 'negative'}`}>
                        {cat.monthOverMonthChange <= 0 ? (
                          <TrendingDown size={10} />
                        ) : (
                          <TrendingUp size={10} />
                        )}
                        {cat.monthOverMonthChange > 0 ? '+' : ''}
                        {cat.monthOverMonthChange}%
                      </span>
                    )}
                    {cat.monthOverMonthChange === null && (
                      <span className="summary-card-change" style={{ color: 'var(--color-text-muted)' }}>
                        <Minus size={10} /> N/A
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card section-gap" id="spending-trend-card">
        <h2 className="card-title">Monthly Expense Trend</h2>
        <div className="chart-container" style={{ height: 250, marginTop: 'var(--space-4)' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Behavioral Insights */}
      {spendingInsights.length > 0 && (
        <div className="card section-gap" id="spending-insights-card">
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>
            AI Behavioral Insights
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {spendingInsights.map((insight) => (
              <div key={insight.id} className="insight-card" id={`si-${insight.id}`}>
                <span className="insight-card-icon" aria-hidden="true">{insight.icon}</span>
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
        </div>
      )}

      {/* ══════════════════════════════════════════
         UPI SPENDING ANALYSIS
         ══════════════════════════════════════════ */}
      <div className="section-gap" id="upi-spending-section">
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)', color: 'var(--color-primary-dark)' }}>
          📱 UPI Spending Analysis
        </h2>

        {/* UPI Summary Cards */}
        <div className="grid-4 stagger" id="upi-summary-cards">
          <div className="summary-card" id="upi-total-txns">
            <div className="summary-card-label">Total UPI Transactions</div>
            <div className="summary-card-value">{upiSummary.totalTransactions}</div>
            <span className="summary-card-change positive">this month</span>
          </div>
          <div className="summary-card" id="upi-total-spend">
            <div className="summary-card-label">UPI Spend</div>
            <div className="summary-card-value">{formatCurrency(upiSummary.totalSpent, false)}</div>
            <span className="summary-card-change negative">↑ {upiSummary.monthOverMonthChange}%</span>
          </div>
          <div className="summary-card" id="upi-avg-txn">
            <div className="summary-card-label">Avg per Transaction</div>
            <div className="summary-card-value">{formatCurrency(upiSummary.avgPerTransaction, false)}</div>
            <span className="summary-card-change positive">healthy</span>
          </div>
          <div className="summary-card" id="upi-impulse-spend">
            <div className="summary-card-label">Impulse Spend</div>
            <div className="summary-card-value" style={{ color: 'var(--color-danger)' }}>{formatCurrency(upiSummary.impulseSpend, false)}</div>
            <span className="badge badge-warning" style={{ marginTop: 'var(--space-2)' }}>39% of UPI</span>
          </div>
        </div>

        {/* UPI App Breakdown + Spending Type */}
        <div className="grid-2" style={{ marginTop: 'var(--space-6)' }}>
          {/* Left: UPI App Breakdown */}
          <div className="card" id="upi-app-breakdown">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>UPI App Usage</h3>
            {[
              { name: 'Google Pay', pct: 42, color: '#4285F4', icon: 'G' },
              { name: 'PhonePe', pct: 28, color: '#5f259f', icon: 'P' },
              { name: 'IDBI UPI', pct: 18, color: '#00836c', icon: 'I', highlight: true },
              { name: 'Paytm', pct: 12, color: '#00BAF2', icon: 'T' },
            ].map((app) => (
              <div key={app.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }} id={`upi-app-${app.icon}`}>
                <div style={{
                  width: 32, height: 32, borderRadius: 'var(--radius-md)', background: app.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0,
                }}>{app.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                      {app.name}
                      {app.highlight && <span className="badge badge-success" style={{ marginLeft: 'var(--space-2)', fontSize: '0.6rem' }}>★ Bank App</span>}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{app.pct}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-bar-fill" style={{ width: `${app.pct}%`, background: app.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Spending by Type */}
          <div className="card" id="upi-spending-type">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Spending by Type</h3>
            {[
              { name: 'Essential', amount: upiSummary.essentialSpend, pct: 44, color: 'var(--color-success)', cls: 'success' },
              { name: 'Impulse', amount: upiSummary.impulseSpend, pct: 39, color: 'var(--color-warning)', cls: 'warning' },
              { name: 'Recurring', amount: upiSummary.recurringSpend, pct: 17, color: 'var(--color-info)', cls: 'accent' },
            ].map((type) => (
              <div key={type.name} style={{ marginBottom: 'var(--space-4)' }} id={`upi-type-${type.name.toLowerCase()}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{type.name}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{formatCurrency(type.amount, false)} ({type.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-bar-fill ${type.cls}`} style={{ width: `${type.pct}%` }} />
                </div>
              </div>
            ))}
            <div style={{
              background: 'var(--color-warning-light)', padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)',
              color: '#856404', marginTop: 'var(--space-2)',
              borderLeft: '3px solid var(--color-warning)',
            }}>
              ⚠️ Your impulse spending is 39% — try to keep it under 25% for better savings.
            </div>
          </div>
        </div>

        {/* Recent UPI Transactions */}
        <div className="card" style={{ marginTop: 'var(--space-6)' }} id="upi-recent-txns">
          <div className="card-header">
            <h3 className="card-title">Recent UPI Payments</h3>
            <span className="badge badge-info">{upiTransactions.length} transactions</span>
          </div>
          <div>
            {upiTransactions.map((txn) => {
              const appColors: Record<string, string> = { gpay: '#4285F4', phonepe: '#5f259f', idbi_upi: '#00836c', paytm: '#00BAF2' };
              const appLabels: Record<string, string> = { gpay: 'G', phonepe: 'P', idbi_upi: 'I', paytm: 'T' };
              const typeBadge: Record<string, string> = { essential: 'badge-success', impulse: 'badge-warning', recurring: 'badge-info' };
              return (
                <div key={txn.id} className="transaction-item" id={`upi-txn-${txn.id}`}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-lg)',
                    background: appColors[txn.upiApp] || '#666',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0,
                  }}>
                    {appLabels[txn.upiApp] || '?'}
                  </div>
                  <div className="transaction-info">
                    <div className="transaction-name">{txn.merchantName}</div>
                    <div className="transaction-date">{txn.upiId} · {txn.date}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className={`badge ${typeBadge[txn.type]}`} style={{ fontSize: '0.6rem' }}>{txn.type}</span>
                    <div className="transaction-amount debit">-{formatCurrency(txn.amount, false)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
