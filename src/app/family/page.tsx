/**
 * Family Financial Dashboard
 * Consolidated view of family wealth, goals, and financial planning.
 * Unique differentiator — no competitor in India has this feature.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Target, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { familyMembers, familySummary } from '@/lib/data/syntheticData';
import { formatCurrency } from '@/lib/utils/formatters';

export default function FamilyPage() {
  const [expandedMember, setExpandedMember] = useState<string | null>('FAM-001');

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Users size={28} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--space-2)', color: 'var(--color-primary)' }} />
          Family Dashboard
        </h1>
        <p className="page-description">Track your family&apos;s combined wealth, goals, and financial health</p>
      </div>

      {/* Family Net Worth Banner */}
      <div className="card card-accent" id="family-networth-banner" style={{
        background: 'linear-gradient(135deg, #00836c 0%, #005a4a 60%, #003d33 100%)',
        color: 'white', marginBottom: 'var(--space-6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>Combined Family Net Worth</p>
            <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              {formatCurrency(familySummary.totalNetWorth)}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', opacity: 0.7, marginTop: 'var(--space-1)' }}>
              Across {familyMembers.length} family members
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {/* Family Avatars */}
            <div style={{ display: 'flex', marginRight: 'var(--space-2)' }}>
              {familyMembers.map((m, i) => (
                <div key={m.id} style={{
                  width: 42, height: 42, borderRadius: '50%', background: m.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 'var(--text-xs)',
                  border: '3px solid #005a4a', marginLeft: i > 0 ? -12 : 0,
                  zIndex: familyMembers.length - i,
                }}>
                  {m.avatar}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 stagger" id="family-summary-cards">
        <div className="summary-card" id="family-contribution">
          <div className="summary-card-icon" style={{ background: '#dcfce7', color: '#22c55e' }}>
            <TrendingUp size={20} />
          </div>
          <div className="summary-card-label">Monthly Contributions</div>
          <div className="summary-card-value">{formatCurrency(familySummary.totalMonthlyContribution, false)}</div>
          <span className="summary-card-change positive">All members combined</span>
        </div>
        <div className="summary-card" id="family-goals-count">
          <div className="summary-card-icon" style={{ background: '#fef0e5', color: '#f47920' }}>
            <Target size={20} />
          </div>
          <div className="summary-card-label">Active Goals</div>
          <div className="summary-card-value">{familySummary.totalGoals}</div>
          <span className="summary-card-change positive">{familySummary.goalsOnTrack} on track</span>
        </div>
        <div className="summary-card" id="family-health-score">
          <div className="summary-card-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <Heart size={20} />
          </div>
          <div className="summary-card-label">Family Health Score</div>
          <div className="summary-card-value">{familySummary.familyHealthScore}</div>
          <span className="summary-card-change positive">Good</span>
        </div>
        <div className="summary-card" id="family-members-count">
          <div className="summary-card-icon" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
            <Users size={20} />
          </div>
          <div className="summary-card-label">Family Members</div>
          <div className="summary-card-value">{familyMembers.length}</div>
          <span className="summary-card-change positive">Connected accounts</span>
        </div>
      </div>

      {/* Family Members — Accordion Cards */}
      <div style={{ marginTop: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)' }}>
          👨‍👩‍👧‍👦 Family Members
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {familyMembers.map((member) => {
            const isExpanded = expandedMember === member.id;
            const totalBalance = member.accounts.reduce((sum, a) => sum + a.balance, 0);
            const relationLabel: Record<string, string> = { self: 'You', spouse: 'Spouse', child: 'Child', parent: 'Parent' };

            return (
              <div key={member.id} className="card" id={`family-member-${member.id}`} style={{
                borderLeft: `4px solid ${member.color}`,
                transition: 'all var(--transition-base)',
              }}>
                {/* Header — Always Visible */}
                <button
                  onClick={() => toggleMember(member.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: 0, textAlign: 'left', fontFamily: 'var(--font-primary)',
                  }}
                  aria-expanded={isExpanded}
                  id={`toggle-${member.id}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', background: member.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: 'var(--text-sm)',
                    }}>
                      {member.avatar}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{member.name}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {relationLabel[member.relationship]} · Age {member.age}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>{formatCurrency(totalBalance, false)}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Total Balance</p>
                    </div>
                    {isExpanded ? <ChevronUp size={20} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                    {/* Accounts */}
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Accounts</h4>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                        {member.accounts.map((acc, i) => (
                          <div key={i} style={{
                            padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)',
                            background: 'var(--color-surface-alt)', flex: '1 1 120px',
                          }}>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{acc.type}</p>
                            <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{formatCurrency(acc.balance, false)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Goals */}
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                      <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>Financial Goals</h4>
                      {member.goals.map((goal, i) => {
                        const progress = Math.round((goal.current / goal.target) * 100);
                        return (
                          <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                                {goal.icon} {goal.name}
                              </span>
                              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: progress >= 50 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                                {progress}%
                              </span>
                            </div>
                            <div className="progress-bar" style={{ height: 6 }}>
                              <div className="progress-bar-fill" style={{
                                width: `${progress}%`,
                                background: progress >= 50 ? 'var(--color-success)' : 'var(--color-warning)',
                              }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-1)' }}>
                              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{formatCurrency(goal.current, false)}</span>
                              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{formatCurrency(goal.target, false)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Monthly Contribution */}
                    <div style={{
                      padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                      background: `${member.color}10`, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Monthly Contribution</span>
                      <span style={{ fontWeight: 700, color: member.color }}>{formatCurrency(member.monthlyContribution, false)}/mo</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Family Net Worth Breakdown */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }} id="family-networth-breakdown">
        <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>📊 Net Worth Breakdown</h3>
        {familyMembers.map((member) => {
          const totalBalance = member.accounts.reduce((sum, a) => sum + a.balance, 0);
          const pct = Math.round((totalBalance / familySummary.totalNetWorth) * 100);
          return (
            <div key={member.id} style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: member.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '0.55rem',
                  }}>{member.avatar}</div>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{member.name}</span>
                </div>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{formatCurrency(totalBalance, false)} ({pct}%)</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-bar-fill" style={{ width: `${pct}%`, background: member.color }} />
              </div>
            </div>
          );
        })}
        {/* Stacked bar */}
        <div style={{ display: 'flex', height: 24, borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: 'var(--space-4)' }}>
          {familyMembers.map((member) => {
            const totalBalance = member.accounts.reduce((sum, a) => sum + a.balance, 0);
            const pct = (totalBalance / familySummary.totalNetWorth) * 100;
            return (
              <div key={member.id} style={{
                width: `${pct}%`, background: member.color, transition: 'width var(--transition-slow)',
              }} title={`${member.name}: ${formatCurrency(totalBalance, false)}`} />
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="card" style={{
        marginTop: 'var(--space-6)', background: 'var(--color-primary-50)',
        borderLeft: '4px solid var(--color-primary)',
      }} id="family-ai-insight">
        <h3 className="card-title" style={{ marginBottom: 'var(--space-3)' }}>🤖 AI Family Insight</h3>
        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-text-secondary)' }}>
          Your family&apos;s combined net worth is <strong>{formatCurrency(familySummary.totalNetWorth)}</strong>. Aarav&apos;s education fund 
          needs an additional <strong>₹10,000/month</strong> to stay on track for 2041. Consider starting an IDBI Children&apos;s 
          Gift Fund SIP for Aarav. Suresh&apos;s retirement corpus is at <strong>64%</strong> — ahead of schedule! 
          Priya&apos;s MBA course fund can be supplemented with IDBI Education Loan at <strong>8.5% p.a.</strong>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          <Link href="/avatar" className="btn btn-accent btn-sm" id="family-ask-ai">
            Ask AI Coach →
          </Link>
          <Link href="/goals" className="btn btn-secondary btn-sm" id="family-plan-goals">
            Plan Family Goals
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Family data is shared only with explicit consent. Family members can control visibility of their financial data.
        IDBI Bank does not share individual family member data without authorization. Joint accounts are shown under the primary holder.
      </div>
    </div>
  );
}
