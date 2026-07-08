/**
 * Skeleton Loading Components
 * Provides content placeholder animations while data loads.
 * Improves perceived performance and prevents layout shift.
 */

/** Skeleton card placeholder */
export function SkeletonCard({ height = 120 }: { height?: number }) {
  return (
    <div className="card" aria-hidden="true">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      <div className="skeleton" style={{ height, marginTop: 'var(--space-3)' }} />
    </div>
  );
}

/** Skeleton summary card row */
export function SkeletonSummaryCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid-4" aria-label="Loading..." role="status">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="summary-card" aria-hidden="true">
          <div className="skeleton skeleton-circle" style={{ width: 48, height: 48, marginBottom: 'var(--space-3)' }} />
          <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          <div className="skeleton" style={{ height: 28, width: '80%', marginTop: 'var(--space-2)' }} />
        </div>
      ))}
      <span className="sr-only">Loading financial data...</span>
    </div>
  );
}

/** Skeleton transaction list */
export function SkeletonTransactions({ count = 5 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="transaction-item">
          <div className="skeleton skeleton-circle" style={{ width: 42, height: 42 }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton skeleton-text" style={{ width: '70%' }} />
            <div className="skeleton skeleton-text" style={{ width: '40%', height: 12 }} />
          </div>
          <div className="skeleton" style={{ width: 80, height: 20 }} />
        </div>
      ))}
    </div>
  );
}

/** Skeleton chart placeholder */
export function SkeletonChart() {
  return (
    <div className="card" aria-hidden="true">
      <div className="skeleton skeleton-title" />
      <div className="skeleton" style={{ height: 250, marginTop: 'var(--space-4)' }} />
    </div>
  );
}
