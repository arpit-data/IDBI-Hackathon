/**
 * Header Component
 * Top bar showing current page title, search overlay, and notification link.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Search, X } from 'lucide-react';

/** Map pathnames to page titles */
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/avatar': 'AI Wealth Avatar',
  '/health': 'Financial Health',
  '/spending': 'Spending Analytics',
  '/portfolio': 'Portfolio',
  '/goals': 'Goal Planner',
  '/invest': 'Investments',
  '/retirement': 'Retirement Planner',
  '/tax': 'Tax Optimizer',
  '/risk-profile': 'Risk Profile',
  '/insights': 'Insights',
  '/gold': 'Digital Gold',
  '/family': 'Family Dashboard',
  '/notifications': 'Notifications',
};

/** Searchable pages for quick navigation */
const SEARCH_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', keywords: 'home overview balance summary' },
  { label: 'AI Wealth Avatar', href: '/avatar', keywords: 'chat bot assistant ai coach talk' },
  { label: 'Financial Health Score', href: '/health', keywords: 'health score wellness rating' },
  { label: 'Spending Analytics', href: '/spending', keywords: 'spend expense category upi budget' },
  { label: 'Portfolio Dashboard', href: '/portfolio', keywords: 'portfolio holdings mutual fund stocks invest' },
  { label: 'Goal Planner', href: '/goals', keywords: 'goals plan target house car education' },
  { label: 'Investment Recommendations', href: '/invest', keywords: 'invest recommend sip elss nps' },
  { label: 'Retirement Planner', href: '/retirement', keywords: 'retire pension future plan old age' },
  { label: 'Tax Optimizer', href: '/tax', keywords: 'tax 80c 80d deduction save itr' },
  { label: 'Risk Profile', href: '/risk-profile', keywords: 'risk profile assessment tolerance' },
  { label: 'Insights Center', href: '/insights', keywords: 'insight tip advice behavioral action' },
  { label: 'Digital Gold', href: '/gold', keywords: 'gold sgb sovereign digital buy sell price' },
  { label: 'Family Dashboard', href: '/family', keywords: 'family spouse child parent joint networth' },
  { label: 'Notifications', href: '/notifications', keywords: 'notification alert nudge reminder' },
];

/** Top header bar with functional Search and Notifications */
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const title = PAGE_TITLES[pathname] || 'WealthWise AI';

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      // Ctrl+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = searchQuery.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords.includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS;

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    router.push(href);
  };

  return (
    <>
      <header className="header" role="banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <h2 className="header-title">{title}</h2>
          <div style={{ height: '24px', width: '1px', background: 'var(--color-border)' }} />
          <img
            src="/idbi-bank-logo.png"
            alt="IDBI Bank"
            style={{ height: '24px', width: 'auto', borderRadius: '4px' }}
          />
        </div>
        <div className="header-actions">
          {/* Search Button */}
          <button
            className="header-icon-btn"
            aria-label="Search (Ctrl+K)"
            id="header-search-btn"
            onClick={() => setSearchOpen(true)}
            title="Search (Ctrl+K)"
          >
            <Search size={18} />
          </button>

          {/* Notifications Button — navigates to /notifications */}
          <Link
            href="/notifications"
            className="header-icon-btn"
            aria-label="Notifications"
            id="header-notifications-btn"
            style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              background: '#f47920',
              borderRadius: '50%',
              border: '2px solid white',
            }} />
          </Link>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '12vh',
            animation: 'fadeIn 150ms ease-out',
          }}
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-label="Search"
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-2xl)',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              animation: 'slideUp 200ms ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <Search size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search pages, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredItems.length > 0) {
                    handleSearchSelect(filteredItems[0].href);
                  }
                }}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 'var(--text-base)', fontFamily: 'var(--font-primary)',
                  color: 'var(--color-text)', background: 'transparent',
                }}
                id="search-input"
                autoComplete="off"
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{
                  background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)', padding: '4px 8px',
                  fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)',
                  cursor: 'pointer', fontFamily: 'var(--font-primary)',
                }}
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            {/* Search Results */}
            <div style={{ maxHeight: '360px', overflowY: 'auto', padding: 'var(--space-2) 0' }}>
              {filteredItems.length === 0 ? (
                <div style={{
                  padding: 'var(--space-8) var(--space-4)', textAlign: 'center',
                  color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)',
                }}>
                  No results for &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSearchSelect(item.href)}
                    id={`search-result-${item.href.replace('/', '')}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                      width: '100%', padding: 'var(--space-3) var(--space-5)',
                      border: 'none', background: 'transparent',
                      cursor: 'pointer', fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-primary)', color: 'var(--color-text)',
                      textAlign: 'left', transition: 'background 150ms',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--color-primary-50)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
                  >
                    <span style={{
                      width: 32, height: 32, borderRadius: 'var(--radius-md)',
                      background: pathname === item.href ? 'var(--color-primary)' : 'var(--color-bg)',
                      color: pathname === item.href ? 'white' : 'var(--color-text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: 'var(--text-xs)', fontWeight: 600,
                    }}>
                      {item.label.charAt(0)}
                    </span>
                    <span style={{ fontWeight: pathname === item.href ? 600 : 400 }}>
                      {item.label}
                    </span>
                    {pathname === item.href && (
                      <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.6rem' }}>
                        Current
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div style={{
              padding: 'var(--space-3) var(--space-5)',
              borderTop: '1px solid var(--color-border)',
              fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)',
              display: 'flex', gap: 'var(--space-4)',
            }}>
              <span>↵ to select</span>
              <span>ESC to close</span>
              <span style={{ marginLeft: 'auto' }}>Ctrl+K to search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
