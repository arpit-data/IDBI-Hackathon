/**
 * Data Consent Banner Component
 * GDPR/RBI compliant data consent mechanism.
 * Users must consent before AI processes their financial data.
 */
'use client';

import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import { DATA_CONSENT_TEXT } from '@/lib/utils/constants';

const CONSENT_KEY = 'wealthwise_data_consent';

/** Data Consent Banner */
export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      accepted: false,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Data consent" id="consent-banner">
      <button
        className="btn btn-ghost btn-icon"
        onClick={handleDecline}
        aria-label="Close consent banner"
        style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }}
      >
        <X size={16} />
      </button>
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 'var(--radius-lg)',
          background: 'var(--color-primary-50)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Shield size={20} color="var(--color-primary)" />
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
            Data Privacy & AI Consent
          </p>
          <p className="consent-banner-text" style={{ marginBottom: 'var(--space-3)' }}>
            {DATA_CONSENT_TEXT}
          </p>
          <div className="consent-banner-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleDecline} id="consent-decline">
              Decline
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAccept} id="consent-accept">
              I Consent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
