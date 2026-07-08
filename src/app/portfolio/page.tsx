/**
 * Portfolio Dashboard Page
 * Visualizes investment portfolio with allocation chart, holdings table, and risk meter.
 */
'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TrendingUp, IndianRupee, BarChart3, ShieldCheck } from 'lucide-react';
import { samplePortfolio, sampleHoldings } from '@/lib/data/syntheticData';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { ASSET_CLASS_META } from '@/lib/types/investment';

ChartJS.register(ArcElement, ChartTooltip, Legend);

/** Portfolio Dashboard Component */
export default function PortfolioPage() {
  /** Summary cards data */
  const cards = [
    { id: 'pf-invested', label: 'Total Invested', value: formatCurrency(samplePortfolio.totalInvested, false), icon: IndianRupee, color: '#3b82f6' },
    { id: 'pf-current', label: 'Current Value', value: formatCurrency(samplePortfolio.totalCurrentValue, false), icon: BarChart3, color: '#8b5cf6' },
    { id: 'pf-returns', label: 'Total Returns', value: formatCurrency(samplePortfolio.totalReturns, false), icon: TrendingUp, color: '#22c55e' },
    { id: 'pf-xirr', label: 'Portfolio XIRR', value: formatPercentage(samplePortfolio.overallXirr), icon: ShieldCheck, color: '#f97316' },
  ];

  /** Doughnut data for asset allocation */
  const doughnutData = useMemo(() => ({
    labels: samplePortfolio.allocation.map((a) => a.label),
    datasets: [{
      data: samplePortfolio.allocation.map((a) => a.amount),
      backgroundColor: samplePortfolio.allocation.map((a) => a.color),
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 8,
    }],
  }), []);

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

  /** Risk meter bars */
  const riskLevels = ['low', 'low', 'moderate', 'high', 'high'] as const;
  const riskIndex = { low: 1, moderate: 3, high: 4, very_high: 5 };
  const activeLevel = riskIndex[samplePortfolio.portfolioRiskLevel];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="portfolio-page-title">Portfolio Dashboard</h1>
        <p className="page-description">Track your investments and monitor performance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 stagger">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="summary-card" id={card.id}>
              <div className="summary-card-icon" style={{ color: card.color }}>
                <Icon size={22} />
              </div>
              <p className="summary-card-label">{card.label}</p>
              <p className="summary-card-value">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Allocation Chart + Risk Meter */}
      <div className="grid-2 section-gap">
        {/* Allocation Chart */}
        <div className="card" id="allocation-chart-card">
          <h2 className="card-title">Asset Allocation</h2>
          <div className="chart-container" style={{ height: 280, marginTop: 'var(--space-4)', position: 'relative' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <p style={{ fontSize: 'var(--text-xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {formatCurrency(samplePortfolio.totalCurrentValue, false)}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Value</p>
            </div>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            {samplePortfolio.allocation.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: a.color }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>{a.label} ({a.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk & Diversification */}
        <div className="card" id="risk-meter-card">
          <h2 className="card-title">Risk Profile</h2>

          {/* Risk Meter */}
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
            <div className="risk-meter" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
              {riskLevels.map((level, i) => (
                <div
                  key={i}
                  className={`risk-meter-bar ${i < activeLevel ? 'active' : ''} ${level}`}
                  style={{ height: `${12 + i * 6}px` }}
                />
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', textTransform: 'capitalize' }}>
              {samplePortfolio.portfolioRiskLevel} Risk
            </p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
              Suitable for 5+ year investment horizon
            </p>
          </div>

          {/* Diversification Score */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Diversification Score</span>
              <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
                {samplePortfolio.diversificationScore}/100
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill accent"
                style={{ width: `${samplePortfolio.diversificationScore}%` }}
                role="progressbar"
                aria-valuenow={samplePortfolio.diversificationScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Diversification: ${samplePortfolio.diversificationScore}%`}
              />
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
              Adding international equity could improve this to 85+
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="card section-gap" id="holdings-table-card" style={{ overflowX: 'auto' }}>
        <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Holdings</h2>
        <table className="holdings-table" aria-label="Investment holdings">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Invested</th>
              <th scope="col">Current</th>
              <th scope="col">Returns</th>
              <th scope="col">XIRR</th>
            </tr>
          </thead>
          <tbody>
            {sampleHoldings.map((h) => (
              <tr key={h.id} id={`holding-${h.id}`}>
                <td>
                  <div>
                    <p style={{ fontWeight: 500 }}>{h.name}</p>
                    {h.sipAmount && (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        SIP: {formatCurrency(h.sipAmount, false)}/mo
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <span className="badge badge-neutral">
                    {ASSET_CLASS_META[h.assetClass]?.label || h.assetClass}
                  </span>
                </td>
                <td>{formatCurrency(h.investedAmount, false)}</td>
                <td>{formatCurrency(h.currentValue, false)}</td>
                <td style={{ color: h.returns >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {h.returns >= 0 ? '+' : ''}{formatCurrency(h.returns, false)}
                  <br />
                  <span style={{ fontSize: 'var(--text-xs)' }}>
                    ({formatPercentage(h.returnsPercentage)})
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--color-accent)' }}>
                  {formatPercentage(h.xirr)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Portfolio values are indicative and may differ from actual market values. Past performance does not guarantee future returns. 
        Please consult your IDBI Bank advisor before making investment decisions.
      </div>
    </div>
  );
}
