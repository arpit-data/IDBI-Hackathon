/**
 * Root Layout
 * Provides the application shell with sidebar, header, and mobile navigation.
 */

import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import ConsentBanner from '@/components/shared/ConsentBanner';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WealthWise AI | IDBI Bank — AI-Powered Wealth Companion',
  description:
    'Transform your banking experience with WealthWise AI — IDBI Bank\'s intelligent financial coach that analyzes your spending, investments, and goals to deliver personalized wealth guidance.',
  keywords: ['IDBI Bank', 'AI Wealth Management', 'Financial Health', 'SIP', 'Investment'],
  authors: [{ name: 'IDBI Bank WealthWise Team' }],
};

/**
 * Root layout wrapping all pages with navigation and structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        {/* Accessibility: Skip Navigation Link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="app-layout">
          <Sidebar />
          <Header />
          <main id="main-content" className="main-content" role="main">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <MobileNav />
          <ConsentBanner />
        </div>
      </body>
    </html>
  );
}
