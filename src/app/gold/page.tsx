/**
 * Digital Gold Page
 * Buy, sell, and track digital gold, SGBs, and Gold ETFs.
 * India's #1 investment preference made accessible digitally.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowRight, Gem, ShieldCheck } from 'lucide-react';
import { goldData, goldHoldings } from '@/lib/data/syntheticData';
import { formatCurrency } from '@/lib/utils/formatters';

export default function GoldPage() {
  const [buyAmount, setBuyAmount] = useState(1000);
  const gramsForAmount = (buyAmount / goldData.livePrice).toFixed(4);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <Gem size={28} style={{ verticalAlign: 'text-bottom', marginRight: 'var(--space-2)', color: '#f0ad4e' }} />
          Digital Gold
        </h1>
        <p className="page-description">Buy, sell, and track digital gold — backed by 99.9% pure gold via MMTC-PAMP</p>
      </div>

      {/* Live Gold Price Banner */}
      <div className="card card-accent" id="gold-live-price" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white', marginBottom: 'var(--space-6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>Live Gold Price (24K)</p>
            <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              ₹{goldData.livePrice.toLocaleString('en-IN')}<span style={{ fontSize: 'var(--text-sm)', opacity: 0.6 }}>/gram</span>
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <span style={{ color: '#22c55e', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={14} /> +{goldData.priceChange24h}% (24h)
              </span>
              <span style={{ color: '#22c55e', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={14} /> +{goldData.priceChangeWeek}% (7d)
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'var(--text-xs)', opacity: 0.6 }}>Your Gold Holdings</p>
            <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{goldData.totalGrams}g</p>
            <p style={{ fontSize: 'var(--text-sm)', color: '#22c55e' }}>{formatCurrency(goldData.totalCurrentValue)}</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4 stagger" id="gold-summary-cards">
        <div className="summary-card" id="gold-invested">
          <div className="summary-card-label">Total Invested</div>
          <div className="summary-card-value">{formatCurrency(goldData.totalInvested, false)}</div>
        </div>
        <div className="summary-card" id="gold-current">
          <div className="summary-card-label">Current Value</div>
          <div className="summary-card-value">{formatCurrency(goldData.totalCurrentValue, false)}</div>
        </div>
        <div className="summary-card" id="gold-returns">
          <div className="summary-card-label">Total Returns</div>
          <div className="summary-card-value" style={{ color: 'var(--color-success)' }}>+{formatCurrency(goldData.totalReturns, false)}</div>
          <span className="summary-card-change positive">+{goldData.totalReturnsPercent}%</span>
        </div>
        <div className="summary-card" id="gold-grams">
          <div className="summary-card-label">Total Gold</div>
          <div className="summary-card-value">{goldData.totalGrams}g</div>
          <span className="summary-card-change positive">≈ {(goldData.totalGrams / 10).toFixed(1)} tola</span>
        </div>
      </div>

      {/* Two column: Buy Gold + Gold SIP */}
      <div className="grid-2" style={{ marginTop: 'var(--space-6)' }}>
        {/* Buy Gold */}
        <div className="card" id="buy-gold-card">
          <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: 24, marginRight: 'var(--space-2)' }}>🪙</span> Buy Digital Gold
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
            Buy 24K pure gold starting from just ₹100. Stored securely in MMTC-PAMP vaults.
          </p>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-2)', display: 'block' }}>
              Amount (₹)
            </label>
            <input
              type="range"
              className="slider"
              min={100}
              max={50000}
              step={100}
              value={buyAmount}
              onChange={(e) => setBuyAmount(Number(e.target.value))}
              id="gold-buy-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {formatCurrency(buyAmount, false)}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                ≈ {gramsForAmount}g
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {[500, 1000, 2000, 5000].map((amt) => (
              <button
                key={amt}
                className={`btn btn-sm ${buyAmount === amt ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setBuyAmount(amt)}
                id={`gold-quick-${amt}`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <button
            className="btn btn-accent"
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
            onClick={() => alert(`🪙 Buying ${gramsForAmount}g of digital gold for ${formatCurrency(buyAmount)}!\n\nIn production, this connects to IDBI Bank's secure payment gateway.`)}
            id="gold-buy-btn"
          >
            Buy Gold — {gramsForAmount}g <ArrowRight size={16} />
          </button>
        </div>

        {/* Gold SIP */}
        <div className="card" id="gold-sip-card">
          <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: 24, marginRight: 'var(--space-2)' }}>📅</span> Gold SIP
          </h3>
          <div style={{
            padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
            background: 'var(--color-primary-50)', marginBottom: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Status</span>
              <span className="badge badge-success">● Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Monthly Amount</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(goldData.goldSIP.monthlyAmount, false)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Months Completed</span>
              <span style={{ fontWeight: 600 }}>{goldData.goldSIP.totalMonths}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Gold Accumulated</span>
              <span style={{ fontWeight: 600 }}>{goldData.goldSIP.gramsAccumulated}g</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Total Invested</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(goldData.goldSIP.monthlyAmount * goldData.goldSIP.totalMonths, false)}</span>
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
            💡 Gold SIP helps you average out price fluctuations. Your next SIP is on July 10.
          </p>
          <button
            className="btn btn-secondary"
            style={{ width: '100%' }}
            onClick={() => alert('⚙️ Manage your Gold SIP\n\nIn production, this opens SIP management settings.')}
            id="gold-manage-sip"
          >
            Manage Gold SIP
          </button>
        </div>
      </div>

      {/* Gold Price Trend */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }} id="gold-price-trend">
        <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>📈 Price Trend (2026)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-2)', height: 180 }}>
          {goldData.priceHistory.map((item, i) => {
            const maxPrice = Math.max(...goldData.priceHistory.map(p => p.price));
            const minPrice = Math.min(...goldData.priceHistory.map(p => p.price));
            const heightPct = ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
            const isLatest = i === goldData.priceHistory.length - 1;
            return (
              <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: isLatest ? 700 : 400, color: isLatest ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                <div style={{
                  width: '100%', maxWidth: 48,
                  height: `${Math.max(heightPct, 15)}%`,
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                  background: isLatest
                    ? 'linear-gradient(180deg, #f0ad4e 0%, #f47920 100%)'
                    : 'linear-gradient(180deg, #e8e0d0 0%, #d4c5a0 100%)',
                  transition: 'height 500ms ease',
                }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: isLatest ? 600 : 400 }}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gold Holdings Table */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }} id="gold-holdings-table">
        <div className="card-header">
          <h3 className="card-title">Your Gold Holdings</h3>
          <span className="badge badge-info">{goldHoldings.length} holdings</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="holdings-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Holding</th>
                <th>Type</th>
                <th>Grams</th>
                <th>Invested</th>
                <th>Current</th>
                <th>Returns</th>
              </tr>
            </thead>
            <tbody>
              {goldHoldings.map((h) => {
                const returns = h.currentValue - h.investedAmount;
                const returnsPct = ((returns / h.investedAmount) * 100).toFixed(1);
                const typeLabel: Record<string, string> = { sgb: 'SGB', digital_gold: 'Digital', gold_etf: 'ETF' };
                const typeBadge: Record<string, string> = { sgb: 'badge-success', digital_gold: 'badge-accent', gold_etf: 'badge-info' };
                return (
                  <tr key={h.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{h.name}</div>
                      {h.maturityDate && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Matures: {h.maturityDate}</div>}
                      {h.interestRate && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>+{h.interestRate}% annual interest</div>}
                    </td>
                    <td><span className={`badge ${typeBadge[h.type]}`}>{typeLabel[h.type]}</span></td>
                    <td style={{ fontWeight: 600 }}>{h.grams}g</td>
                    <td>{formatCurrency(h.investedAmount, false)}</td>
                    <td>{formatCurrency(h.currentValue, false)}</td>
                    <td style={{ color: returns >= 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
                      {returns >= 0 ? '+' : ''}{formatCurrency(returns, false)} ({returnsPct}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Gold + IDBI Products */}
      <div className="grid-2" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card" id="why-gold">
          <h3 className="card-title" style={{ marginBottom: 'var(--space-3)' }}>💡 Why Digital Gold?</h3>
          {[
            { label: 'No storage hassle — secure vault storage by MMTC-PAMP', icon: '🔐' },
            { label: 'Start from ₹100 — no minimum weight required', icon: '💰' },
            { label: 'Tax-free LTCG after 3 years (20% with indexation)', icon: '📋' },
            { label: 'SGB gives 2.5% annual interest + gold appreciation', icon: '📈' },
            { label: 'Instant buy/sell — 24/7 liquidity via IDBI Bank', icon: '⚡' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="card" id="gold-idbi-products">
          <h3 className="card-title" style={{ marginBottom: 'var(--space-3)' }}>
            <ShieldCheck size={18} style={{ color: 'var(--color-primary)', marginRight: 'var(--space-1)' }} />
            IDBI Gold Products
          </h3>
          {[
            { name: 'IDBI Digital Gold', desc: 'Buy 24K gold digitally, stored by MMTC-PAMP', cta: 'Buy Now' },
            { name: 'Sovereign Gold Bond', desc: 'Govt-backed, 2.5% interest + gold returns', cta: 'Apply' },
            { name: 'IDBI Gold ETF', desc: 'Trade gold like stocks on NSE/BSE', cta: 'Invest' },
            { name: 'Gold Savings Plan', desc: 'Monthly SIP in gold from ₹500/month', cta: 'Start SIP' },
          ].map((prod, i) => (
            <div key={i} style={{
              padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface-alt)', marginBottom: 'var(--space-2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{prod.name}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{prod.desc}</p>
              </div>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => alert(`${prod.name}\n\nIn production, this redirects to IDBI Bank's ${prod.name} page.`)}
                id={`gold-product-${i}`}
              >
                {prod.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-6)' }}>
        ⚠️ Gold prices are indicative and may vary at the time of actual transaction. Digital gold is not a regulated product under SEBI.
        Sovereign Gold Bonds are issued by the Government of India. Past performance does not guarantee future returns.
        Consult your IDBI Bank advisor before investing.
      </div>
    </div>
  );
}
