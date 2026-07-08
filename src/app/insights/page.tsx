/**
 * Insights Center Page
 * AI-powered behavioral insights and monthly action plans.
 */
'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { sampleInsights, sampleActionPlan } from '@/lib/data/syntheticData';
import { formatDate } from '@/lib/utils/formatters';

/** Insights Center Page Component */
export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'insights' | 'actions'>('insights');

  /** Impact badge styling */
  const impactBadge = (impact: string) => {
    switch (impact) {
      case 'positive': return 'badge-success';
      case 'negative': return 'badge-danger';
      case 'neutral': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  /** Priority badge styling */
  const priorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-danger';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" id="insights-page-title">Insights Center</h1>
        <p className="page-description">
          AI-powered behavioral insights and personalized action plans to improve your financial health.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs" role="tablist" aria-label="Insights sections">
        <button
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
          role="tab"
          aria-selected={activeTab === 'insights'}
          aria-controls="panel-insights"
          id="tab-insights"
        >
          🧠 Behavioral Insights ({sampleInsights.length})
        </button>
        <button
          className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
          role="tab"
          aria-selected={activeTab === 'actions'}
          aria-controls="panel-actions"
          id="tab-actions"
        >
          ✅ Monthly Action Plan ({sampleActionPlan.length})
        </button>
      </div>

      {/* Behavioral Insights Tab */}
      {activeTab === 'insights' && (
        <div
          id="panel-insights"
          role="tabpanel"
          aria-labelledby="tab-insights"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          className="stagger"
        >
          {sampleInsights.map((insight) => (
            <div key={insight.id} className="insight-card" id={`insight-${insight.id}`}>
              <span className="insight-card-icon" aria-hidden="true">
                {insight.icon}
              </span>
              <div className="insight-card-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <p className="insight-card-title">{insight.title}</p>
                  <span className={`badge ${impactBadge(insight.impact)}`}>
                    {insight.impact}
                  </span>
                </div>
                <p className="insight-card-desc">{insight.description}</p>
                {insight.action && (
                  <p className="insight-card-action">💡 Action: {insight.action}</p>
                )}
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                  {formatDate(insight.date, 'relative')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monthly Action Plan Tab */}
      {activeTab === 'actions' && (
        <div
          id="panel-actions"
          role="tabpanel"
          aria-labelledby="tab-actions"
          className="card stagger"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 className="card-title">July 2026 Action Plan</h2>
            <span className="badge badge-accent">
              {sampleActionPlan.filter((a) => a.completed).length}/{sampleActionPlan.length} done
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {sampleActionPlan.map((item) => (
              <div key={item.id} className="action-item" id={`ap-${item.id}`}>
                <div
                  className={`action-item-checkbox ${item.completed ? 'checked' : ''}`}
                  role="checkbox"
                  aria-checked={item.completed}
                  aria-label={`${item.title}: ${item.completed ? 'completed' : 'pending'}`}
                  tabIndex={0}
                >
                  {item.completed && <Check size={12} color="white" />}
                </div>
                <div className="action-item-content">
                  <p
                    className="action-item-title"
                    style={{
                      textDecoration: item.completed ? 'line-through' : 'none',
                      opacity: item.completed ? 0.6 : 1,
                    }}
                  >
                    {item.title}
                  </p>
                  <p className="action-item-desc">{item.description}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                    <span className={`badge ${priorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className="badge badge-neutral">
                      Due: {formatDate(item.dueDate, 'short')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        Insights are generated by AI based on your financial activity patterns. They are for informational purposes 
        and do not constitute financial advice. Action items are suggestions — always review before acting.
      </div>
    </div>
  );
}
