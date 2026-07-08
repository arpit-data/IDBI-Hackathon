/**
 * Tax Optimizer Page
 * AI-powered tax savings suggestions under Section 80C, 80D, 80CCD.
 * Shows utilized vs available deductions with actionable recommendations.
 */
'use client';

import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IndianRupee, ArrowRight, Info } from 'lucide-react';
import { sampleUser } from '@/lib/data/syntheticData';
import { formatCurrency } from '@/lib/utils/formatters';

ChartJS.register(ArcElement, ChartTooltip, Legend);

/** Tax deduction section data */
interface TaxSection {
  id: string;
  section: string;
  limit: number;
  utilized: number;
  investments: { name: string; amount: number; icon: string }[];
  suggestions: { text: string; potentialSaving: number }[];
}

/** Tax sections with sample utilization */
const TAX_SECTIONS: TaxSection[] = [
  {
    id: '80c',
    section: 'Section 80C',
    limit: 150000,
    utilized: 98000,
    investments: [
      { name: 'ELSS Mutual Fund SIP', amount: 48000, icon: '📊' },
      { name: 'EPF Contribution', amount: 36000, icon: '🏦' },
      { name: 'Life Insurance Premium', amount: 14000, icon: '🛡️' },
    ],
    suggestions: [
      { text: 'Start an additional ELSS SIP of ₹4,333/month to fully utilize 80C limit', potentialSaving: 15600 },
      { text: 'Consider Tax Saver FD (5yr lock-in) for remaining ₹52,000', potentialSaving: 15600 },
    ],
  },
  {
    id: '80d',
    section: 'Section 80D',
    limit: 25000,
    utilized: 14000,
    investments: [
      { name: 'Health Insurance Premium', amount: 14000, icon: '❤️' },
    ],
    suggestions: [
      { text: 'Upgrade to a super top-up health plan covering ₹25L for additional ₹11,000', potentialSaving: 3300 },
      { text: 'Add parents health insurance for extra ₹50,000 deduction under 80D', potentialSaving: 15000 },
    ],
  },
  {
    id: '80ccd',
    section: 'Section 80CCD(1B)',
    limit: 50000,
    utilized: 0,
    investments: [],
    suggestions: [
      { text: 'Open NPS account and invest ₹50,000 for additional tax savings', potentialSaving: 15000 },
      { text: 'Set up NPS auto-debit of ₹4,167/month for disciplined investing', potentialSaving: 15000 },
    ],
  },
  {
    id: 'hra',
    section: 'HRA Exemption',
    limit: 240000,
    utilized: 180000,
    investments: [
      { name: 'Rent Paid (₹15,000/month)', amount: 180000, icon: '🏠' },
    ],
    suggestions: [
      { text: 'Ensure rent receipts are submitted for full HRA claim', potentialSaving: 0 },
    ],
  },
];

/** Tax regime comparison */
type RegimeType = 'old' | 'new';

/** Tax Optimizer Page Component */
export default function TaxPage() {
  const [selectedRegime, setSelectedRegime] = useState<RegimeType>('old');

  /** Calculate total savings */
  const totals = useMemo(() => {
    const totalLimit = TAX_SECTIONS.reduce((s, t) => s + t.limit, 0);
    const totalUtilized = TAX_SECTIONS.reduce((s, t) => s + t.utilized, 0);
    const totalUnused = totalLimit - totalUtilized;
    const potentialSavings = TAX_SECTIONS.reduce(
      (s, t) => s + t.suggestions.reduce((ss, sg) => ss + sg.potentialSaving, 0), 0
    );

    return { totalLimit, totalUtilized, totalUnused, potentialSavings };
  }, []);

  /** Tax comparison data */
  const regimeComparison = useMemo(() => {
    const income = sampleUser.annualIncome;

    // Old Regime with deductions
    const totalDeductions = TAX_SECTIONS.reduce((s, t) => s + t.utilized, 0) + 50000; // + Std deduction
    const taxableOld = Math.max(0, income - totalDeductions);

    // New Regime (no deductions, lower rates)
    const taxableNew = Math.max(0, income - 75000); // New regime std deduction

    // Simplified tax calculation
    const calcOldTax = (ti: number) => {
      if (ti <= 250000) return 0;
      if (ti <= 500000) return (ti - 250000) * 0.05;
      if (ti <= 1000000) return 12500 + (ti - 500000) * 0.2;
      return 112500 + (ti - 1000000) * 0.3;
    };

    const calcNewTax = (ti: number) => {
      if (ti <= 300000) return 0;
      if (ti <= 700000) return (ti - 300000) * 0.05;
      if (ti <= 1000000) return 20000 + (ti - 700000) * 0.1;
      if (ti <= 1200000) return 50000 + (ti - 1000000) * 0.15;
      if (ti <= 1500000) return 80000 + (ti - 1200000) * 0.2;
      return 140000 + (ti - 1500000) * 0.3;
    };

    const oldTax = calcOldTax(taxableOld);
    const newTax = calcNewTax(taxableNew);
    const better = oldTax < newTax ? 'old' : 'new';
    const saving = Math.abs(oldTax - newTax);

    return { income, taxableOld, taxableNew, oldTax, newTax, better, saving };
  }, []);

  /** Doughnut chart for utilization */
  const doughnutData = {
    labels: ['Utilized', 'Unused'],
    datasets: [{
      data: [totals.totalUtilized, totals.totalUnused],
      backgroundColor: ['#00836c', '#e9ecef'],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  const utilizationPercentage = Math.round((totals.totalUtilized / totals.totalLimit) * 100);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="tax-page-title">Tax Optimizer</h1>
        <p className="page-description">Maximize your tax savings with AI-powered deduction analysis and regime comparison.</p>
      </div>

      {/* Summary Row */}
      <div className="grid-2 stagger" style={{ marginBottom: 'var(--space-8)' }}>
        {/* Utilization Chart */}
        <div className="card" id="tax-utilization-card">
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Deduction Utilization</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <div style={{ width: 160, height: 160, position: 'relative' }}>
              <Doughnut
                data={doughnutData}
                options={{ responsive: true, maintainAspectRatio: true, cutout: '75%', plugins: { legend: { display: false } } }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {utilizationPercentage}%
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Used</p>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Deductions Claimed</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--color-primary)' }}>
                  {formatCurrency(totals.totalUtilized, false)}
                </p>
              </div>
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Available Limit</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {formatCurrency(totals.totalLimit, false)}
                </p>
              </div>
              <div className="badge badge-accent" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-3)' }}>
                <IndianRupee size={14} /> Save up to {formatCurrency(totals.potentialSavings, false)} more
              </div>
            </div>
          </div>
        </div>

        {/* Regime Comparison */}
        <div className="card" id="tax-regime-card">
          <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Regime Comparison</h2>
          <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
            <button className={`tab ${selectedRegime === 'old' ? 'active' : ''}`} onClick={() => setSelectedRegime('old')}>Old Regime</button>
            <button className={`tab ${selectedRegime === 'new' ? 'active' : ''}`} onClick={() => setSelectedRegime('new')}>New Regime</button>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <div style={{ flex: 1, padding: 'var(--space-3)', background: regimeComparison.better === 'old' ? 'var(--color-success-light)' : 'var(--color-bg)', borderRadius: 'var(--radius-lg)', border: `1px solid ${regimeComparison.better === 'old' ? 'var(--color-success)' : 'var(--color-border)'}` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Old Regime Tax</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>{formatCurrency(regimeComparison.oldTax, false)}</p>
              {regimeComparison.better === 'old' && <span className="badge badge-success" style={{ marginTop: 'var(--space-2)' }}>Recommended</span>}
            </div>
            <div style={{ flex: 1, padding: 'var(--space-3)', background: regimeComparison.better === 'new' ? 'var(--color-success-light)' : 'var(--color-bg)', borderRadius: 'var(--radius-lg)', border: `1px solid ${regimeComparison.better === 'new' ? 'var(--color-success)' : 'var(--color-border)'}` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>New Regime Tax</p>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>{formatCurrency(regimeComparison.newTax, false)}</p>
              {regimeComparison.better === 'new' && <span className="badge badge-success" style={{ marginTop: 'var(--space-2)' }}>Recommended</span>}
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', fontWeight: 600, marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <Info size={12} /> You save {formatCurrency(regimeComparison.saving, false)} with the {regimeComparison.better} regime
          </p>
        </div>
      </div>

      {/* Section-wise Breakdown */}
      <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Section-wise Breakdown</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {TAX_SECTIONS.map((section) => {
          const usedPct = Math.round((section.utilized / section.limit) * 100);
          const remaining = section.limit - section.utilized;

          return (
            <div key={section.id} className="card" id={`tax-section-${section.id}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-base)' }}>
                    {section.section}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Limit: {formatCurrency(section.limit, false)}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={remaining > 0 ? 'badge badge-warning' : 'badge badge-success'}>
                    {remaining > 0 ? `₹${(remaining / 1000).toFixed(0)}K unused` : 'Fully utilized'}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>
                  <span>{formatCurrency(section.utilized, false)} used</span>
                  <span>{usedPct}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-bar-fill ${usedPct >= 90 ? 'success' : usedPct >= 50 ? 'accent' : 'warning'}`} style={{ width: `${usedPct}%` }} />
                </div>
              </div>

              {/* Current investments */}
              {section.investments.length > 0 && (
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  {section.investments.map((inv, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', fontSize: 'var(--text-sm)' }}>
                      <span>{inv.icon} {inv.name}</span>
                      <span style={{ fontWeight: 600 }}>{formatCurrency(inv.amount, false)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {section.suggestions.length > 0 && remaining > 0 && (
                <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-3)' }}>
                  {section.suggestions.map((sg, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <ArrowRight size={14} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{sg.text}</p>
                        {sg.potentialSaving > 0 && (
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
                            Potential tax saving: {formatCurrency(sg.potentialSaving, false)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Tax calculations are estimates based on FY 2025-26 tax slabs. Actual tax liability may vary based on other income, exemptions, and deductions. Please consult a certified tax professional or your IDBI Bank advisor for accurate tax planning.
      </div>
    </div>
  );
}
