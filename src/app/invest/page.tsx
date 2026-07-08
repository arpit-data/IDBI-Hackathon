/**
 * Investment Recommendations Page
 * Personalized investment suggestions with explainability.
 */
'use client';

import { User, ShieldCheck } from 'lucide-react';
import { investmentProducts, sampleUser } from '@/lib/data/syntheticData';
import { formatCurrency } from '@/lib/utils/formatters';

/** Match scores for demo products */
const MATCH_SCORES = [95, 88, 85, 82, 78, 75];

/** Recommendation reasons for demo */
const REASONS: Record<string, string> = {
  'PROD-001': 'Aligns with your long-term home-buying goal and moderate risk profile. Low expense ratio maximizes compounding over 5+ years.',
  'PROD-002': 'Active management provides potential alpha over index. Good complement to your existing Nifty 50 SIP for diversification.',
  'PROD-003': 'Save up to ₹46,800 in taxes under Section 80C. 3-year lock-in aligns with your investment horizon.',
  'PROD-004': 'Guaranteed returns for your emergency fund component. Senior citizen-friendly with flexible tenure options.',
  'PROD-005': 'Build disciplined monthly savings habit. Ideal for your short-term vacation goal with guaranteed returns.',
  'PROD-006': 'Better returns than savings account for parking surplus cash. High liquidity for emergency needs.',
  'PROD-007': 'Hedge against inflation and market volatility. Improves portfolio diversification score from 72 to 80+.',
  'PROD-008': 'Additional ₹50,000 tax deduction under Section 80CCD(1B). Long-term retirement corpus builder.',
  'PROD-009': 'Balanced equity-debt mix suitable for your moderate risk profile. Good entry point for conservative investors.',
  'PROD-010': 'Zero credit risk, sovereign-guaranteed. Stable income for the debt portion of your portfolio.',
};

/** Risk level badge styling */
const riskBadge = (level: string) => {
  switch (level) {
    case 'low': return 'badge-success';
    case 'moderate': return 'badge-warning';
    case 'high': return 'badge-danger';
    case 'very_high': return 'badge-danger';
    default: return 'badge-neutral';
  }
};

/** Investment Recommendations Page Component */
export default function InvestPage() {
  const topProducts = investmentProducts.slice(0, 6);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="invest-page-title">Investment Recommendations</h1>
        <p className="page-description">Personalized picks based on your financial profile and goals.</p>
      </div>

      {/* User Profile Summary */}
      <div className="card card-accent" id="invest-profile-card" style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div className="sidebar-user-avatar" aria-hidden="true">
              <User size={18} />
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>{sampleUser.name}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {sampleUser.age} yrs • {sampleUser.occupation}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginLeft: 'auto' }}>
            <span className="badge badge-accent">
              <ShieldCheck size={12} /> {sampleUser.riskAppetite} risk
            </span>
            <span className="badge badge-info">
              Salary: {formatCurrency(sampleUser.monthlySalary, false)}
            </span>
            <span className="badge badge-success">
              Active SIPs: ₹15,000/mo
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid-3 stagger" role="list" aria-label="Investment recommendations">
        {topProducts.map((product, i) => (
          <div
            key={product.id}
            className="rec-card"
            id={`rec-${product.id}`}
            role="listitem"
          >
            {/* Match Score */}
            <div className="rec-card-match">
              <span className="rec-card-match-score">{MATCH_SCORES[i]}%</span>
              <span className="rec-card-match-label">Match Score</span>
            </div>

            {/* Product Info */}
            <p className="rec-card-name">{product.name}</p>
            <p className="rec-card-returns">
              {product.expectedReturnLow}–{product.expectedReturnHigh}% p.a. expected
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span className={`badge ${riskBadge(product.riskLevel)}`}>
                {product.riskLevel} risk
              </span>
              {product.isIDBIProduct && (
                <span className="badge badge-accent">IDBI Bank</span>
              )}
              {product.lockInMonths > 0 && (
                <span className="badge badge-neutral">
                  {product.lockInMonths}mo lock-in
                </span>
              )}
            </div>

            {/* Min Investment */}
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)' }}>
              Min. Investment: {formatCurrency(product.minInvestment, false)}
            </p>

            {/* Why This Recommendation */}
            <div className="rec-card-reason">
              <p className="rec-card-reason-title">💡 Why this recommendation</p>
              <p className="rec-card-reason-text">{REASONS[product.id]}</p>
            </div>

            {/* CTA */}
            <button
              className="btn btn-primary btn-sm"
              style={{ width: '100%', marginTop: 'var(--space-3)' }}
              id={`invest-btn-${product.id}`}
              onClick={() => alert(`🚀 Starting investment in ${product.name}!\n\nIn production, this would redirect to IDBI Bank's secure investment gateway for KYC verification and payment processing.`)}
            >
              Start Investing
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card section-gap" id="invest-comparison-card" style={{ overflowX: 'auto' }}>
        <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Quick Comparison</h2>
        <table className="holdings-table" aria-label="Investment comparison">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Type</th>
              <th scope="col">Returns</th>
              <th scope="col">Risk</th>
              <th scope="col">Min. Amount</th>
              <th scope="col">Lock-in</th>
              <th scope="col">Match</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.slice(0, 4).map((p, i) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 500 }}>{p.name}</td>
                <td><span className="badge badge-neutral">{p.category.replace('_', ' ')}</span></td>
                <td style={{ color: 'var(--color-success)' }}>{p.expectedReturnLow}–{p.expectedReturnHigh}%</td>
                <td><span className={`badge ${riskBadge(p.riskLevel)}`}>{p.riskLevel}</span></td>
                <td>{formatCurrency(p.minInvestment, false)}</td>
                <td>{p.lockInMonths > 0 ? `${p.lockInMonths} months` : 'None'}</td>
                <td style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{MATCH_SCORES[i]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Investment recommendations are generated by AI based on your risk profile and goals. They do not constitute certified financial advice. 
        Mutual fund investments are subject to market risks. Read all scheme related documents carefully. 
        Past performance does not guarantee future returns.
      </div>
    </div>
  );
}
