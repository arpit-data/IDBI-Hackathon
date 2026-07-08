/**
 * Sidebar Navigation Component
 * Provides the main navigation for the WealthWise AI application.
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Bot,
  HeartPulse,
  PieChart,
  Briefcase,
  Target,
  TrendingUp,
  Lightbulb,
  Sunset,
  Receipt,
  Shield,
  Bell,
  Gem,
  Users,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/utils/constants';

/** Map icon names to Lucide components */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  home: Home,
  bot: Bot,
  'heart-pulse': HeartPulse,
  'pie-chart': PieChart,
  briefcase: Briefcase,
  target: Target,
  'trending-up': TrendingUp,
  sunset: Sunset,
  receipt: Receipt,
  shield: Shield,
  lightbulb: Lightbulb,
  bell: Bell,
  gem: Gem,
  users: Users,
};

/** Sidebar navigation with IDBI Bank branding */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo — Official IDBI Bank Logo */}
      <div className="sidebar-logo" style={{ flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-5) var(--space-6)' }}>
        {/* Official IDBI Bank Logo */}
        <img
          src="/idbi-bank-logo.png"
          alt="IDBI Bank"
          style={{
            width: '100%',
            maxWidth: '180px',
            height: 'auto',
            borderRadius: 'var(--radius-md)',
          }}
        />
        {/* App Name */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '2px', background: '#f47920', borderRadius: '1px', margin: '0 auto var(--space-2)' }} />
          <div className="sidebar-logo-text" style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>WealthWise AI</div>
          <div className="sidebar-logo-subtext" style={{ fontSize: '0.65rem', marginTop: '2px' }}>Digital Wealth Advisory</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list" role="list">
          {NAV_ITEMS.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="sidebar-nav-item">
                <Link
                  href={item.href}
                  className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  id={`nav-${item.icon}`}
                >
                  {IconComponent && (
                    <IconComponent size={20} />
                  )}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar" aria-hidden="true">AM</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Arjun Mehta</div>
          <div className="sidebar-user-id">A/C: XXXX1234</div>
        </div>
      </div>
    </aside>
  );
}
