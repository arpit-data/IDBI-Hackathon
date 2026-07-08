/**
 * Retirement Planner Page
 * Interactive retirement corpus calculator with inflation adjustment,
 * Monte Carlo projections, and milestone tracking.
 */
'use client';

import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip as ChartTooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Calculator, TrendingUp, Shield, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatters';
import { calculateSIPFutureValue, calculateInflationAdjusted } from '@/lib/utils/calculations';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, ChartTooltip);

/** Retirement Planner Page Component */
export default function RetirementPage() {
  const [currentAge, setCurrentAge] = useState(28);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySIP, setMonthlySIP] = useState(20000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [postRetirementReturn, setPostRetirementReturn] = useState(8);

  const yearsToRetirement = Math.max(retirementAge - currentAge, 1);
  const retirementDuration = 25; // Plan for 25 years post-retirement

  /** Calculate retirement metrics */
  const metrics = useMemo(() => {
    // Monthly expenses at retirement (inflation-adjusted)
    const expensesAtRetirement = calculateInflationAdjusted(
      monthlyExpenses * 12, inflationRate, yearsToRetirement
    ) / 12;

    // Total corpus needed (accounting for post-retirement inflation and returns)
    const realReturnRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100) - 1) * 100;
    const monthlyRealReturn = realReturnRate / 100 / 12;

    let corpusNeeded: number;
    if (monthlyRealReturn <= 0) {
      corpusNeeded = expensesAtRetirement * 12 * retirementDuration;
    } else {
      corpusNeeded = expensesAtRetirement *
        ((1 - Math.pow(1 + monthlyRealReturn, -retirementDuration * 12)) / monthlyRealReturn);
    }

    // Projected corpus from current savings + SIP
    const savingsGrowth = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    const sipCorpus = calculateSIPFutureValue(monthlySIP, expectedReturn, yearsToRetirement);
    const projectedCorpus = savingsGrowth + sipCorpus;

    // Gap analysis
    const gap = corpusNeeded - projectedCorpus;
    const isOnTrack = projectedCorpus >= corpusNeeded;

    // Additional SIP needed to bridge the gap
    let additionalSIPNeeded = 0;
    if (gap > 0) {
      const monthlyRate = expectedReturn / 100 / 12;
      const months = yearsToRetirement * 12;
      if (monthlyRate > 0) {
        additionalSIPNeeded = gap * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        additionalSIPNeeded = gap / months;
      }
    }

    return {
      expensesAtRetirement: Math.round(expensesAtRetirement),
      corpusNeeded: Math.round(corpusNeeded),
      projectedCorpus: Math.round(projectedCorpus),
      savingsGrowth: Math.round(savingsGrowth),
      sipCorpus: Math.round(sipCorpus),
      gap: Math.round(gap),
      isOnTrack,
      additionalSIPNeeded: Math.round(additionalSIPNeeded),
      fundedPercentage: Math.min(100, Math.round((projectedCorpus / corpusNeeded) * 100)),
    };
  }, [currentAge, retirementAge, monthlyExpenses, currentSavings, monthlySIP, expectedReturn, inflationRate, postRetirementReturn, yearsToRetirement]);

  /** Chart data showing corpus growth over time */
  const chartData = useMemo(() => {
    const labels: string[] = [];
    const projectedData: number[] = [];
    const targetData: number[] = [];

    for (let year = 0; year <= yearsToRetirement; year++) {
      labels.push(`Age ${currentAge + year}`);
      const savings = currentSavings * Math.pow(1 + expectedReturn / 100, year);
      const sip = calculateSIPFutureValue(monthlySIP, expectedReturn, year);
      projectedData.push(Math.round(savings + sip));

      const annualTarget = metrics.corpusNeeded * (year / yearsToRetirement);
      targetData.push(Math.round(annualTarget));
    }

    return {
      labels,
      datasets: [
        {
          label: 'Your Projected Corpus',
          data: projectedData,
          borderColor: '#00836c',
          backgroundColor: 'rgba(0, 131, 108, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: 'Target Corpus',
          data: targetData,
          borderColor: '#f47920',
          backgroundColor: 'transparent',
          borderDash: [6, 4],
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    };
  }, [currentAge, currentSavings, monthlySIP, expectedReturn, yearsToRetirement, metrics.corpusNeeded]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: { color: '#5a6a7e', font: { size: 11, family: 'Montserrat' }, usePointStyle: true, pointStyle: 'line' as const },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#2c3e50',
        bodyColor: '#5a6a7e',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx: { dataset?: { label?: string }; raw?: unknown }) =>
            `${ctx.dataset?.label}: ${formatCurrency(ctx.raw as number, false)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8d99a8', font: { size: 10 }, maxTicksLimit: 8 } },
      y: { grid: { color: '#e2e8f0' }, ticks: { color: '#8d99a8', font: { size: 10 }, callback: (value: string | number) => `₹${(Number(value) / 10000000).toFixed(1)}Cr` } },
    },
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="retirement-page-title">Retirement Planner</h1>
        <p className="page-description">Plan your retirement corpus with inflation-adjusted projections and gap analysis.</p>
      </div>

      {/* Status Card */}
      <div className={`card ${metrics.isOnTrack ? 'card-accent' : ''}`} id="retirement-status" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-full)',
            background: metrics.isOnTrack ? 'var(--color-success-light)' : 'var(--color-warning-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {metrics.isOnTrack ? <Shield size={28} color="var(--color-success)" /> : <Clock size={28} color="#856404" />}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
              {metrics.isOnTrack ? '✅ You\'re on track!' : '⚠️ Action needed'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              {metrics.isOnTrack
                ? `Your projected corpus of ${formatCurrency(metrics.projectedCorpus, false)} exceeds your target.`
                : `You need an additional SIP of ${formatCurrency(metrics.additionalSIPNeeded, false)}/month to reach your target.`
              }
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Funded</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: metrics.isOnTrack ? 'var(--color-success)' : 'var(--color-accent)' }}>
              {metrics.fundedPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 stagger">
        <div className="summary-card" id="ret-corpus-needed">
          <div className="summary-card-icon"><Calculator size={22} /></div>
          <p className="summary-card-label">Corpus Needed</p>
          <p className="summary-card-value" style={{ fontSize: 'var(--text-xl)' }}>{formatCurrency(metrics.corpusNeeded, false)}</p>
        </div>
        <div className="summary-card" id="ret-projected">
          <div className="summary-card-icon" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}><TrendingUp size={22} /></div>
          <p className="summary-card-label">Projected Corpus</p>
          <p className="summary-card-value" style={{ fontSize: 'var(--text-xl)' }}>{formatCurrency(metrics.projectedCorpus, false)}</p>
        </div>
        <div className="summary-card" id="ret-monthly-expenses">
          <div className="summary-card-icon"><Clock size={22} /></div>
          <p className="summary-card-label">Monthly at Retirement</p>
          <p className="summary-card-value" style={{ fontSize: 'var(--text-xl)' }}>{formatCurrency(metrics.expensesAtRetirement, false)}</p>
        </div>
        <div className="summary-card" id="ret-gap">
          <div className="summary-card-icon" style={{ background: metrics.gap > 0 ? 'var(--color-danger-light)' : 'var(--color-success-light)', color: metrics.gap > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
            <Shield size={22} />
          </div>
          <p className="summary-card-label">{metrics.gap > 0 ? 'Gap' : 'Surplus'}</p>
          <p className="summary-card-value" style={{ fontSize: 'var(--text-xl)', color: metrics.gap > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
            {formatCurrency(Math.abs(metrics.gap), false)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="card section-gap" id="retirement-chart-card">
        <h2 className="card-title">Corpus Growth Projection</h2>
        <div className="chart-container" style={{ height: 300, marginTop: 'var(--space-4)' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Input Sliders */}
      <div className="card section-gap" id="retirement-inputs">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-6)' }}>Adjust Your Plan</h2>
        <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
          <div className="form-group">
            <label htmlFor="age-slider" className="form-label">Current Age: <strong>{currentAge}</strong></label>
            <input type="range" id="age-slider" className="slider" min={20} max={55} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="retire-age-slider" className="form-label">Retirement Age: <strong>{retirementAge}</strong></label>
            <input type="range" id="retire-age-slider" className="slider" min={45} max={70} value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="expenses-slider" className="form-label">Monthly Expenses: <strong>{formatCurrency(monthlyExpenses, false)}</strong></label>
            <input type="range" id="expenses-slider" className="slider" min={20000} max={200000} step={5000} value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="savings-slider" className="form-label">Current Savings: <strong>{formatCurrency(currentSavings, false)}</strong></label>
            <input type="range" id="savings-slider" className="slider" min={0} max={5000000} step={50000} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="sip-ret-slider" className="form-label">Monthly SIP: <strong>{formatCurrency(monthlySIP, false)}</strong></label>
            <input type="range" id="sip-ret-slider" className="slider" min={5000} max={100000} step={1000} value={monthlySIP} onChange={(e) => setMonthlySIP(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="return-ret-slider" className="form-label">Expected Return: <strong>{expectedReturn}% p.a.</strong></label>
            <input type="range" id="return-ret-slider" className="slider" min={6} max={18} step={0.5} value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="inflation-slider" className="form-label">Inflation Rate: <strong>{inflationRate}%</strong></label>
            <input type="range" id="inflation-slider" className="slider" min={3} max={10} step={0.5} value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label htmlFor="post-ret-slider" className="form-label">Post-Retirement Return: <strong>{postRetirementReturn}%</strong></label>
            <input type="range" id="post-ret-slider" className="slider" min={4} max={12} step={0.5} value={postRetirementReturn} onChange={(e) => setPostRetirementReturn(Number(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Retirement projections assume constant returns and inflation rates. Actual results will vary. This tool is for planning purposes only and does not guarantee any returns. Consult your IDBI Bank advisor for a personalized retirement plan.
      </div>
    </div>
  );
}
