/**
 * Smart Notifications Page
 * AI-powered proactive alerts and financial nudges.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck } from 'lucide-react';
import { smartNudges } from '@/lib/data/syntheticData';
import type { SmartNudge } from '@/lib/data/syntheticData';

/** Format relative time (e.g. "2 hours ago") */
function timeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

/** Category color map */
const CATEGORY_COLORS: Record<SmartNudge['category'], string> = {
  money: '#22c55e',
  investment: '#3b82f6',
  alert: '#f47920',
  celebration: '#8b5cf6',
};

const CATEGORY_BG: Record<SmartNudge['category'], string> = {
  money: '#dcfce7',
  investment: '#dbeafe',
  alert: '#fef0e5',
  celebration: '#ede9fe',
};

const PRIORITY_BORDER: Record<SmartNudge['priority'], string> = {
  high: '#f47920',
  medium: '#3b82f6',
  low: 'transparent',
};

type FilterType = 'all' | 'unread' | SmartNudge['category'];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [nudges, setNudges] = useState(smartNudges);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'money', label: '💰 Money' },
    { key: 'investment', label: '📈 Investment' },
    { key: 'alert', label: '⚠️ Alerts' },
    { key: 'celebration', label: '🎉 Celebrations' },
  ];

  const filtered = nudges.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !n.read;
    return n.category === activeFilter;
  });

  const unreadCount = nudges.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNudges(nudges.map((n) => ({ ...n, read: true })));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 className="page-title">
            <Bell size={28} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--space-2)' }} />
            Smart Notifications
          </h1>
          <p className="page-description">AI-powered alerts and proactive financial insights</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={markAllRead} id="mark-all-read-btn">
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      {/* Unread count badge */}
      {unreadCount > 0 && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
          background: '#fef0e5', color: '#f47920', padding: 'var(--space-2) var(--space-4)',
          borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 600,
          marginBottom: 'var(--space-4)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f47920' }} />
          {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-6)' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            className={`tab ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
            id={`filter-${f.key}`}
          >
            {f.label}
            {f.key === 'unread' && unreadCount > 0 && (
              <span className="badge badge-accent" style={{ marginLeft: 'var(--space-1)', fontSize: '0.6rem' }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔔</div>
            <h3 className="empty-state-title">No notifications</h3>
            <p className="empty-state-desc">You&apos;re all caught up! Check back later for new insights.</p>
          </div>
        ) : (
          filtered.map((nudge) => (
            <div
              key={nudge.id}
              id={`notification-${nudge.id}`}
              className="card"
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
                padding: 'var(--space-4) var(--space-5)',
                borderLeft: `4px solid ${PRIORITY_BORDER[nudge.priority]}`,
                background: nudge.read ? '#ffffff' : '#fafffe',
                transition: 'all var(--transition-base)',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-lg)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: CATEGORY_BG[nudge.category], fontSize: 24,
              }}>
                {nudge.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  {!nudge.read && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                  )}
                  <h3 style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{nudge.title}</h3>
                  <span className={`badge ${nudge.priority === 'high' ? 'badge-danger' : nudge.priority === 'medium' ? 'badge-info' : 'badge-neutral'}`}>
                    {nudge.priority}
                  </span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-2)' }}>
                  {nudge.message}
                </p>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                  {timeAgo(nudge.timestamp)}
                </span>
              </div>

              {/* Action Button */}
              {nudge.actionLabel && nudge.actionHref && (
                <Link
                  href={nudge.actionHref}
                  className="btn btn-accent btn-sm"
                  style={{ flexShrink: 0, alignSelf: 'center' }}
                  id={`notif-action-${nudge.id}`}
                >
                  {nudge.actionLabel}
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-8)' }}>
        ⚠️ Smart notifications are AI-generated suggestions based on your transaction patterns. They do not constitute financial advice.
        Please consult a certified financial planner for personalized guidance. IDBI Bank is not liable for investment decisions based on these alerts.
      </div>
    </div>
  );
}
