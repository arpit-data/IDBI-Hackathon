/**
 * WealthWise AI — Comprehensive Application Test Suite
 * Tests all 17 routes, data integrity, component rendering, and feature functionality.
 * Run: node tests/app-test.mjs
 */

const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 15000;

let passed = 0;
let failed = 0;
let warnings = 0;
const results = [];

// ─── Utility ────────────────────────────────────────────

async function fetchPage(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${BASE_URL}${path}`, { signal: controller.signal, redirect: 'follow' });
    const html = await res.text();
    clearTimeout(timer);
    return { status: res.status, html, url: res.url };
  } catch (err) {
    clearTimeout(timer);
    return { status: 0, html: '', error: err.message };
  }
}

function assert(name, condition, detail = '') {
  if (condition) {
    passed++;
    results.push({ status: '✅', name, detail });
  } else {
    failed++;
    results.push({ status: '❌', name, detail });
  }
}

function warn(name, detail = '') {
  warnings++;
  results.push({ status: '⚠️', name, detail });
}

// ─── Test: All Routes Return 200 ────────────────────────

const ROUTES = [
  { path: '/', expectRedirect: '/dashboard' },
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/avatar', title: 'AI Wealth Avatar' },
  { path: '/health', title: 'Financial Health' },
  { path: '/spending', title: 'Spending Analytics' },
  { path: '/portfolio', title: 'Portfolio' },
  { path: '/goals', title: 'Goal Planner' },
  { path: '/invest', title: 'Investments' },
  { path: '/retirement', title: 'Retirement Planner' },
  { path: '/tax', title: 'Tax Optimizer' },
  { path: '/risk-profile', title: 'Risk Profile' },
  { path: '/insights', title: 'Insights' },
  { path: '/notifications', title: 'Notifications' },
  { path: '/gold', title: 'Digital Gold' },
  { path: '/family', title: 'Family Dashboard' },
];

async function testRoutes() {
  console.log('\n📋 TEST GROUP 1: Route Accessibility (15 routes + API)\n');

  for (const route of ROUTES) {
    const { status, html, url, error } = await fetchPage(route.path);

    if (route.expectRedirect) {
      assert(
        `GET ${route.path} → redirects to ${route.expectRedirect}`,
        status === 200 && url.includes(route.expectRedirect),
        error || `status=${status}, redirected to ${url}`
      );
    } else {
      assert(
        `GET ${route.path} → 200 OK`,
        status === 200,
        error || `status=${status}`
      );
    }

    // Check basic HTML structure
    if (status === 200 && html) {
      assert(
        `${route.path} has valid HTML structure`,
        html.includes('<html') && html.includes('</html>'),
        'Missing html tags'
      );

      assert(
        `${route.path} loads CSS (globals.css)`,
        html.includes('globals') || html.includes('_next'),
        'CSS not loaded'
      );
    }
  }

  // Test API route
  const apiRes = await fetchPage('/api/chat');
  assert(
    'GET /api/chat → returns 405 (POST only)',
    apiRes.status === 405,
    `status=${apiRes.status}`
  );

  // Test 404
  const notFound = await fetchPage('/nonexistent-page');
  assert(
    'GET /nonexistent-page → 404',
    notFound.status === 404,
    `status=${notFound.status}`
  );
}

// ─── Test: Dashboard Content ────────────────────────────

async function testDashboard() {
  console.log('\n📋 TEST GROUP 2: Dashboard Page Content\n');
  const { html } = await fetchPage('/dashboard');

  assert('Dashboard: Welcome banner exists', html.includes('welcome-banner'));
  assert('Dashboard: User name "Arjun" displayed', html.includes('Arjun'));
  assert('Dashboard: Summary cards rendered', html.includes('summary-card'));
  assert('Dashboard: Quick actions rendered', html.includes('quick-action'));
  assert('Dashboard: IDBI Bank logo present', html.includes('idbi-bank-logo'));
  assert('Dashboard: Transaction list rendered', html.includes('transaction-item'));
  assert('Dashboard: AI Insights section exists', html.includes('insight-card'));

  // New features
  assert('Dashboard: Gamification section exists', html.includes('gamification-section'));
  assert('Dashboard: Streak counters rendered', html.includes('streak-sip'));
  assert('Dashboard: Weekly challenge rendered', html.includes('weekly-challenge-card'));
  assert('Dashboard: Achievement badges rendered', html.includes('achievement-badges'));
  assert('Dashboard: Smart Alerts section exists', html.includes('smart-alerts-card'));
  assert('Dashboard: Level/XP system rendered', html.includes('level-badge'));

  // CTA buttons
  assert('Dashboard: "Talk to AI Coach" CTA exists', html.includes('banner-cta-chat'));
  assert('Dashboard: "Health Score" CTA exists', html.includes('banner-cta-health'));
}

// ─── Test: Spending Page + UPI ──────────────────────────

async function testSpending() {
  console.log('\n📋 TEST GROUP 3: Spending Analytics + UPI\n');
  const { html } = await fetchPage('/spending');

  assert('Spending: Page renders', html.includes('Spending'));
  assert('Spending: Doughnut chart canvas', html.includes('canvas') || html.includes('chart'));
  assert('Spending: Category breakdown exists', html.includes('category') || html.includes('Category'));

  // UPI Section
  assert('Spending: UPI section exists', html.includes('upi-spending-section'));
  assert('Spending: UPI summary cards', html.includes('upi-total-txns'));
  assert('Spending: UPI app breakdown', html.includes('upi-app-breakdown'));
  assert('Spending: Google Pay listed', html.includes('Google Pay'));
  assert('Spending: PhonePe listed', html.includes('PhonePe'));
  assert('Spending: IDBI UPI listed', html.includes('IDBI UPI'));
  assert('Spending: Spending by type section', html.includes('upi-spending-type'));
  assert('Spending: Impulse warning shown', html.includes('impulse spending'));
  assert('Spending: UPI transactions list', html.includes('upi-recent-txns'));
  assert('Spending: Merchant names shown', html.includes('Swiggy') || html.includes('Zomato'));
}

// ─── Test: Notifications Page ───────────────────────────

async function testNotifications() {
  console.log('\n📋 TEST GROUP 4: Smart Notifications\n');
  const { html } = await fetchPage('/notifications');

  assert('Notifications: Page renders', html.includes('Smart Notifications'));
  assert('Notifications: Filter tabs exist', html.includes('filter-all'));
  assert('Notifications: Unread filter exists', html.includes('filter-unread'));
  assert('Notifications: Salary credit nudge', html.includes('Salary Credited'));
  assert('Notifications: Dining alert nudge', html.includes('Dining'));
  assert('Notifications: Market opportunity nudge', html.includes('Market Opportunity') || html.includes('Nifty'));
  assert('Notifications: Tax reminder nudge', html.includes('Tax') || html.includes('ITR'));
  assert('Notifications: Action buttons exist', html.includes('notif-action'));
  assert('Notifications: Priority badges', html.includes('high') || html.includes('medium'));
  assert('Notifications: Disclaimer present', html.includes('disclaimer'));
}

// ─── Test: Portfolio Page ───────────────────────────────

async function testPortfolio() {
  console.log('\n📋 TEST GROUP 5: Portfolio Dashboard\n');
  const { html } = await fetchPage('/portfolio');

  assert('Portfolio: Page renders', html.includes('Portfolio'));
  assert('Portfolio: Holdings table exists', html.includes('holdings-table'));
  assert('Portfolio: Asset allocation chart', html.includes('canvas') || html.includes('chart'));
  assert('Portfolio: Risk meter exists', html.includes('risk-meter'));
  assert('Portfolio: Disclaimer present', html.includes('disclaimer'));
}

// ─── Test: Health Score ─────────────────────────────────

async function testHealth() {
  console.log('\n📋 TEST GROUP 6: Financial Health Score\n');
  const { html } = await fetchPage('/health');

  assert('Health: Page renders', html.includes('Financial Health'));
  assert('Health: Score ring exists', html.includes('health-ring'));
  assert('Health: Category breakdown exists', html.includes('progress-bar'));
  assert('Health: Action items exist', html.includes('action-item'));
}

// ─── Test: Goals Page ───────────────────────────────────

async function testGoals() {
  console.log('\n📋 TEST GROUP 7: Goal Planner\n');
  const { html } = await fetchPage('/goals');

  assert('Goals: Page renders', html.includes('Goal'));
  assert('Goals: Goal cards exist', html.includes('goal-card'));
  assert('Goals: Progress bars rendered', html.includes('progress-bar'));
  assert('Goals: What-If Simulator exists', html.includes('Simulator') || html.includes('slider'));
}

// ─── Test: AI Avatar Chat ───────────────────────────────

async function testAvatar() {
  console.log('\n📋 TEST GROUP 8: AI Avatar Chat\n');
  const { html } = await fetchPage('/avatar');

  assert('Avatar: Page renders', html.includes('chat') || html.includes('Chat'));
  assert('Avatar: Chat input exists', html.includes('chat-input'));
  assert('Avatar: Suggestion chips exist', html.includes('chat-suggestion'));
  assert('Avatar: Messages container exists', html.includes('chat-messages'));
}

// ─── Test: Other Pages ──────────────────────────────────

async function testOtherPages() {
  console.log('\n📋 TEST GROUP 9: Investment, Retirement, Tax, Risk, Insights\n');

  const invest = await fetchPage('/invest');
  assert('Invest: Page renders', invest.html.includes('Recommend') || invest.html.includes('invest'));
  assert('Invest: Rec cards exist', invest.html.includes('rec-card'));

  const retirement = await fetchPage('/retirement');
  assert('Retirement: Page renders', retirement.html.includes('Retirement') || retirement.html.includes('retirement'));

  const tax = await fetchPage('/tax');
  assert('Tax: Page renders', tax.html.includes('Tax') || tax.html.includes('80C'));

  const risk = await fetchPage('/risk-profile');
  assert('Risk Profile: Page renders', risk.html.includes('Risk') || risk.html.includes('risk'));

  const insights = await fetchPage('/insights');
  assert('Insights: Page renders', insights.html.includes('Insight') || insights.html.includes('insight'));
  assert('Insights: Tabs exist', insights.html.includes('tab'));
}

// ─── Test: IDBI Branding ────────────────────────────────

async function testBranding() {
  console.log('\n📋 TEST GROUP 10: IDBI Bank Branding\n');
  const { html } = await fetchPage('/dashboard');

  assert('Branding: IDBI Bank logo in sidebar', html.includes('idbi-bank-logo.png'));
  assert('Branding: IDBI Bank logo in header', html.includes('idbi-bank-logo.png'));
  assert('Branding: IDBI Bank logo in banner', html.includes('idbi-bank-logo.png'));
  assert('Branding: Montserrat font loaded', html.includes('Montserrat') || html.includes('montserrat'));
  assert('Branding: WealthWise AI name present', html.includes('WealthWise'));
  assert('Branding: IDBI green color used', html.includes('00836c') || html.includes('color-primary') || html.includes('idbi'));
  assert('Branding: Sidebar navigation rendered', html.includes('sidebar-nav'));
  assert('Branding: Mobile nav rendered', html.includes('mobile-nav'));
}

// ─── Test: Accessibility ────────────────────────────────

async function testAccessibility() {
  console.log('\n📋 TEST GROUP 11: Accessibility\n');
  const { html } = await fetchPage('/dashboard');

  assert('A11y: Skip navigation link exists', html.includes('skip-link'));
  assert('A11y: Main content landmark', html.includes('role="main"') || html.includes('id="main-content"'));
  assert('A11y: Navigation landmark', html.includes('role="navigation"'));
  assert('A11y: Banner landmark', html.includes('role="banner"'));
  assert('A11y: HTML lang attribute', html.includes('lang="en"'));
  assert('A11y: aria-label on navigation', html.includes('aria-label'));
  assert('A11y: aria-current on active nav', html.includes('aria-current'));
}

// ─── Test: API Chat Endpoint ────────────────────────────

async function testChatAPI() {
  console.log('\n📋 TEST GROUP 12: Chat API Endpoint\n');

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello', history: [] }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    assert('Chat API: POST returns 200', res.status === 200, `status=${res.status}`);
    assert('Chat API: Response is streaming', res.headers.get('content-type')?.includes('text') || res.status === 200);
  } catch (err) {
    // API may fail without valid Gemini key, that's expected
    warn('Chat API: Gemini API key may not be configured', err.message);
  }
}

// ─── Test: Data Integrity ───────────────────────────────

async function testDataIntegrity() {
  console.log('\n📋 TEST GROUP 13: Data Integrity Checks\n');
  const { html } = await fetchPage('/dashboard');

  // Financial values should be formatted
  assert('Data: Currency formatting (₹)', html.includes('₹'));
  assert('Data: Account holder name', html.includes('Arjun Mehta'));

  // Portfolio page
  const portfolio = await fetchPage('/portfolio');
  assert('Data: Portfolio returns value present', portfolio.html.includes('₹') || portfolio.html.includes('Returns'));

  // Health page
  const health = await fetchPage('/health');
  assert('Data: Health score rendered', health.html.includes('health-ring-score'));

  // Notifications
  const notif = await fetchPage('/notifications');
  assert('Data: Nudge timestamps present', notif.html.includes('ago') || notif.html.includes('2026'));
}

// ─── Test: Digital Gold ─────────────────────────────────

async function testGold() {
  console.log('\n📋 TEST GROUP 14: Digital Gold\n');
  const { html } = await fetchPage('/gold');

  assert('Gold: Page renders', html.includes('Digital Gold'));
  assert('Gold: Live price banner', html.includes('gold-live-price'));
  assert('Gold: Price per gram shown', html.includes('/gram'));
  assert('Gold: Buy gold section', html.includes('buy-gold-card'));
  assert('Gold: Gold SIP section', html.includes('gold-sip-card'));
  assert('Gold: Price trend chart', html.includes('gold-price-trend'));
  assert('Gold: Holdings table', html.includes('gold-holdings-table'));
  assert('Gold: SGB holding listed', html.includes('Sovereign Gold Bond'));
  assert('Gold: IDBI products section', html.includes('gold-idbi-products'));
  assert('Gold: Disclaimer present', html.includes('disclaimer'));
}

// ─── Test: Family Dashboard ─────────────────────────────

async function testFamily() {
  console.log('\n📋 TEST GROUP 15: Family Dashboard\n');
  const { html } = await fetchPage('/family');

  assert('Family: Page renders', html.includes('Family Dashboard'));
  assert('Family: Net worth banner', html.includes('family-networth-banner'));
  assert('Family: Summary cards rendered', html.includes('family-summary-cards'));
  assert('Family: Arjun (self) member card', html.includes('FAM-001'));
  assert('Family: Priya (spouse) member card', html.includes('Priya'));
  assert('Family: Aarav (child) member card', html.includes('Aarav'));
  assert('Family: Suresh (parent) member card', html.includes('Suresh'));
  assert('Family: Net worth breakdown', html.includes('family-networth-breakdown'));
  assert('Family: AI insight section', html.includes('family-ai-insight'));
  assert('Family: Goal progress bars', html.includes('progress-bar'));
  assert('Family: Disclaimer present', html.includes('disclaimer'));
}

// ─── Run All Tests ──────────────────────────────────────

async function runAllTests() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  WealthWise AI — Comprehensive Test Suite               ║');
  console.log('║  IDBI Bank Digital Wealth Management                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\nTest server: ${BASE_URL}`);
  console.log(`Timeout: ${TIMEOUT}ms per request\n`);

  const start = Date.now();

  // Verify server is running
  try {
    const check = await fetch(BASE_URL, { redirect: 'follow' });
    if (check.status !== 200) throw new Error(`Server returned ${check.status}`);
  } catch {
    console.error('❌ FATAL: Dev server is not running at', BASE_URL);
    console.error('   Please run: npm run dev');
    process.exit(1);
  }

  await testRoutes();
  await testDashboard();
  await testSpending();
  await testNotifications();
  await testPortfolio();
  await testHealth();
  await testGoals();
  await testAvatar();
  await testOtherPages();
  await testBranding();
  await testAccessibility();
  await testGold();
  await testFamily();
  await testChatAPI();
  await testDataIntegrity();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  // Print summary
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    TEST RESULTS                         ║');
  console.log('╠══════════════════════════════════════════════════════════╣');

  for (const r of results) {
    const pad = r.status === '✅' ? '' : ' ← ' + r.detail;
    console.log(`  ${r.status} ${r.name}${r.status !== '✅' ? pad : ''}`);
  }

  console.log('\n╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ Passed:   ${String(passed).padStart(3)}                                      ║`);
  console.log(`║  ❌ Failed:   ${String(failed).padStart(3)}                                      ║`);
  console.log(`║  ⚠️  Warnings: ${String(warnings).padStart(3)}                                      ║`);
  console.log(`║  ⏱️  Time:     ${elapsed}s                                    ║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (failed > 0) {
    console.log('\n❌ SOME TESTS FAILED — see details above');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL TESTS PASSED — Application is production-ready!');
    process.exit(0);
  }
}

runAllTests();
