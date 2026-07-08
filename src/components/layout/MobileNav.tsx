/**
 * Mobile Bottom Navigation Component
 * Shows primary navigation items for mobile screens.
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bot, HeartPulse, Briefcase, Target } from 'lucide-react';

const MOBILE_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/avatar', label: 'Avatar', icon: Bot },
  { href: '/health', label: 'Health', icon: HeartPulse },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/goals', label: 'Goals', icon: Target },
];

/** Bottom navigation for mobile screens */
export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
      {MOBILE_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            id={`mobile-nav-${item.label.toLowerCase()}`}
          >
            <Icon size={22} className="nav-icon" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
