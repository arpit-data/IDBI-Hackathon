/**
 * Risk Profiling Wizard Page
 * Interactive questionnaire that determines a user's investment risk profile.
 * Part of the onboarding flow for personalized wealth advisory.
 */
'use client';

import { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

/** Quiz question type */
interface Question {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

/** Risk profiling questions */
const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'What is your primary investment goal?',
    options: [
      { label: 'Preserve capital — I cannot afford to lose money', score: 1 },
      { label: 'Generate steady income with minimal risk', score: 2 },
      { label: 'Balanced growth with moderate risk', score: 3 },
      { label: 'Aggressive growth — I can handle significant volatility', score: 4 },
    ],
  },
  {
    id: 'q2',
    question: 'How long can you keep your money invested without needing it?',
    options: [
      { label: 'Less than 1 year', score: 1 },
      { label: '1–3 years', score: 2 },
      { label: '3–7 years', score: 3 },
      { label: 'More than 7 years', score: 4 },
    ],
  },
  {
    id: 'q3',
    question: 'If your portfolio dropped 20% in a month, what would you do?',
    options: [
      { label: 'Sell everything immediately to prevent more losses', score: 1 },
      { label: 'Sell some investments to reduce exposure', score: 2 },
      { label: 'Hold and wait for recovery', score: 3 },
      { label: 'Buy more — great opportunity at lower prices', score: 4 },
    ],
  },
  {
    id: 'q4',
    question: 'What portion of your monthly income can you invest?',
    options: [
      { label: 'Less than 10%', score: 1 },
      { label: '10–20%', score: 2 },
      { label: '20–35%', score: 3 },
      { label: 'More than 35%', score: 4 },
    ],
  },
  {
    id: 'q5',
    question: 'How would you describe your investment experience?',
    options: [
      { label: 'None — I\'m completely new to investing', score: 1 },
      { label: 'Basic — I have FDs and savings accounts', score: 2 },
      { label: 'Moderate — I invest in mutual funds and SIPs', score: 3 },
      { label: 'Advanced — I trade stocks, options, and alternative assets', score: 4 },
    ],
  },
  {
    id: 'q6',
    question: 'How many dependents do you have?',
    options: [
      { label: '3 or more dependents', score: 1 },
      { label: '2 dependents', score: 2 },
      { label: '1 dependent', score: 3 },
      { label: 'No dependents', score: 4 },
    ],
  },
  {
    id: 'q7',
    question: 'Do you have an emergency fund covering at least 6 months of expenses?',
    options: [
      { label: 'No emergency fund', score: 1 },
      { label: 'Covers 1–3 months', score: 2 },
      { label: 'Covers 3–6 months', score: 3 },
      { label: 'Covers 6+ months', score: 4 },
    ],
  },
];

/** Risk profile result */
interface RiskResult {
  profile: string;
  description: string;
  allocation: { label: string; percentage: number; color: string }[];
  color: string;
}

/** Calculate risk profile from total score */
function calculateRiskProfile(totalScore: number): RiskResult {
  const maxScore = QUESTIONS.length * 4;
  const percentage = (totalScore / maxScore) * 100;

  if (percentage <= 25) {
    return {
      profile: 'Conservative',
      description: 'You prefer safety over returns. Focus on capital preservation with fixed-income instruments like FDs, government bonds, and debt funds.',
      color: '#17a2b8',
      allocation: [
        { label: 'Fixed Deposits', percentage: 40, color: '#17a2b8' },
        { label: 'Debt Funds', percentage: 30, color: '#20c997' },
        { label: 'Gold', percentage: 15, color: '#f0ad4e' },
        { label: 'Large Cap Equity', percentage: 15, color: '#28a745' },
      ],
    };
  }
  if (percentage <= 50) {
    return {
      profile: 'Moderate',
      description: 'You seek a balance between growth and safety. A mix of equity and debt instruments suits your temperament, with a tilt toward stable returns.',
      color: '#28a745',
      allocation: [
        { label: 'Large Cap Equity', percentage: 30, color: '#28a745' },
        { label: 'Debt Funds', percentage: 25, color: '#20c997' },
        { label: 'Multi Cap Funds', percentage: 20, color: '#00836c' },
        { label: 'Fixed Deposits', percentage: 15, color: '#17a2b8' },
        { label: 'Gold', percentage: 10, color: '#f0ad4e' },
      ],
    };
  }
  if (percentage <= 75) {
    return {
      profile: 'Aggressive',
      description: 'You\'re comfortable with market volatility and have a long investment horizon. Higher equity allocation can help maximize wealth creation.',
      color: '#f47920',
      allocation: [
        { label: 'Equity Funds', percentage: 45, color: '#28a745' },
        { label: 'Mid/Small Cap', percentage: 20, color: '#f47920' },
        { label: 'International Equity', percentage: 15, color: '#6f42c1' },
        { label: 'Debt Funds', percentage: 10, color: '#20c997' },
        { label: 'Gold/Alternatives', percentage: 10, color: '#f0ad4e' },
      ],
    };
  }
  return {
    profile: 'Very Aggressive',
    description: 'You have high risk tolerance and deep market knowledge. You can withstand significant short-term losses for potentially outsized long-term returns.',
    color: '#dc3545',
    allocation: [
      { label: 'Equity/Direct Stocks', percentage: 50, color: '#dc3545' },
      { label: 'Mid/Small Cap Funds', percentage: 25, color: '#f47920' },
      { label: 'International Equity', percentage: 15, color: '#6f42c1' },
      { label: 'Alternatives (REITs)', percentage: 10, color: '#f0ad4e' },
    ],
  };
}

/** Risk Profiling Wizard Page */
export default function RiskProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  const handleAnswer = useCallback((score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));
  }, [currentQuestion]);

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const result = calculateRiskProfile(totalScore);

  if (showResult) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title" id="risk-result-title">Your Risk Profile</h1>
          <p className="page-description">Based on your responses, here is your personalized risk assessment.</p>
        </div>

        <div className="card card-accent" style={{ textAlign: 'center', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-full)',
            background: `${result.color}15`, display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto var(--space-4)',
          }}>
            <ShieldCheck size={36} color={result.color} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: result.color, marginBottom: 'var(--space-2)' }}>
            {result.profile}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>
            {result.description}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Score: {totalScore}/{totalQuestions * 4}
          </p>
        </div>

        {/* Recommended Allocation */}
        <div className="card section-gap" id="risk-allocation-card">
          <h2 className="card-title" style={{ marginBottom: 'var(--space-6)' }}>Recommended Asset Allocation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {result.allocation.map((asset, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: asset.color }} />
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{asset.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', color: asset.color }}>
                    {asset.percentage}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${asset.percentage}%`, background: asset.color }}
                    role="progressbar"
                    aria-valuenow={asset.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${asset.label}: ${asset.percentage}%`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stacked allocation bar */}
          <div style={{ display: 'flex', height: 32, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: 'var(--space-6)' }}>
            {result.allocation.map((asset, i) => (
              <div
                key={i}
                style={{ width: `${asset.percentage}%`, background: asset.color, transition: 'width var(--transition-slow)' }}
                title={`${asset.label}: ${asset.percentage}%`}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <button className="btn btn-secondary" onClick={handleRestart} id="risk-retake-btn">
            Retake Assessment
          </button>
          <a href="/invest" className="btn btn-primary" id="risk-invest-btn">
            View Recommendations →
          </a>
        </div>

        <div className="disclaimer" style={{ marginTop: 'var(--space-4)' }}>
          Risk profiling is indicative and based on self-assessment. Your actual risk capacity may differ. Review your profile periodically and consult your IDBI Bank advisor before making investment decisions.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="risk-page-title">Risk Profile Assessment</h1>
        <p className="page-description">Answer 7 quick questions to determine your investment risk personality.</p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
            Question {currentStep + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="progress-bar" style={{ height: 6 }}>
          <div
            className="progress-bar-fill accent"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card" id={`risk-${currentQuestion.id}`} style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-normal)' }}>
          {currentQuestion.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} role="radiogroup" aria-label={currentQuestion.question}>
          {currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentQuestion.id] === option.score;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(option.score)}
                className={isSelected ? 'card card-accent' : 'card'}
                id={`risk-option-${currentQuestion.id}-${i}`}
                role="radio"
                aria-checked={isSelected}
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 'var(--space-4)',
                  borderColor: isSelected ? 'var(--color-primary)' : undefined,
                  background: isSelected ? 'var(--color-primary-50)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 'var(--radius-full)',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {isSelected && <div style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--color-primary)' }} />}
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: isSelected ? 600 : 400 }}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
        <button
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
          id="risk-back-btn"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          id="risk-next-btn"
        >
          {currentStep === totalQuestions - 1 ? (
            <>View Results <CheckCircle2 size={16} /></>
          ) : (
            <>Next <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}
