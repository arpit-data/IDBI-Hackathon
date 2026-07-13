# 🏛️ WealthWise AI — AI-Powered Digital Wealth Management

**An Avatar-Based Digital Wealth Advisory & Financial Health Platform custom-built for IDBI Bank.**

Designed to address the fragmentation and inaccessibility of wealth management services in India, **WealthWise AI** integrates seamlessly into IDBI Bank's mobile ecosystem. By analyzing customer transaction behaviors, UPI spending patterns, and investment habits, it provides hyper-personalized, regulatory-compliant (SEBI/RBI), and highly actionable financial guidance through an immersive conversational avatar.

---

## 🚀 Live Demo & Development Status
* **Local Server:** `http://localhost:3000`
* **Technology Stack:** Next.js 14+ (App Router), React 19, TypeScript, Chart.js, Lucide Icons, Vanilla CSS
* **Design System:** Harmonies of IDBI Green (`#00836c`), Signature Accent Orange (`#f47920`), Montserrat typography, and elegant dark/light contrast cards.

---

## 🌟 Key Features Built for India-Scale Adoption

### 1. 🤖 AI Wealth Avatar (Gemini-Powered)
* **Immersive Conversational Interface:** Speech-ready AI assistant that answers financial questions.
* **Context-Aware Recommendations:** Reads the user's spending habits, health score, and risk profile to answer questions dynamically.
* **SEBI & RBI Compliance Guardrails:** Automatically blocks requests about speculative day trading, crypto, or direct stock recommendations, redirecting users to secure, diversified banking options.

### 2. 👨‍👩‍👧‍👦 Family Financial Dashboard
* **Consolidated Family Wealth:** Connect spouse, children, and parent accounts to view a unified family net worth.
* **Joint Goal Tracking:** Track long-term family goals like child education funds (e.g. Aarav's College Fund in 2041) or family medical reserves.
* **Member Breakdown:** Visual stacked bars showing each member's contributions and asset distribution.

### 3. 📱 UPI Spending Analytics & Nudge Engine
* **UPI Auto-Categorization:** Real-time analysis of payments across GPay, PhonePe, Paytm, and IDBI UPI.
* **Impulse Spending Detector:** Categorizes purchases into *Essential*, *Recurring*, and *Impulse* transactions.
* **Behavioral Warnings:** Prompts smart alerts if impulse shopping exceeds 25% of monthly income.

### 4. 🏆 Gamification & SIP Streaks
* **Streaks & XP Levels:** Promotes healthy financial behaviors with gamified streaks (e.g., 🔥 6-month SIP Streak, 💰 4-month Savings Streak).
* **Achievement Badges:** Unlock rewards like "SIP Warrior", "Tax Saver", or "Budget Boss" to drive daily active engagement.
* **Weekly Savings Challenges:** Actionable tasks like saving ₹2,000 extra this week with real-time tracker bars.

### 5. ❤️ Financial Health Score
* **Algorithmic Scoring:** Calculates a real-time health score (0–100) based on 5 metrics: Savings Rate, Debt-to-Income, Emergency Fund, Diversification, and Budget Discipline.
* **Targeted Action Items:** Highlights immediate tasks needed to improve the score (e.g., "Build Emergency Fund to ₹3L").

### 6. 📈 Portfolio, Tax Optimizer, & Retirement Planner
* **Asset Allocation:** interactive doughnut charts powered by Chart.js representing Equity, Debt, Gold, and Cash.
* **Tax Optimizer:** Tailored guidance for Indian tax deductions (Section 80C, 80D, 80CCD).
* **Risk Profiling Wizard:** 7-question interactive assessment defining the user's investment style.

---

## 📁 Repository Structure

```
wealthwise-app/
├── public/                 # Static assets (including official IDBI Bank logos)
├── src/
│   ├── app/                # Next.js App Router (17 active routes)
│   │   ├── dashboard/      # Main client dashboard
│   │   ├── avatar/         # AI Chat Avatar
│   │   ├── health/         # Financial Health score calculator
│   │   ├── family/         # Family Net Worth & Joint Goals
│   │   ├── gold/           # Digital Gold & SGB tracker
│   │   ├── spending/       # UPI Spending Analytics
│   │   └── ...             # Portfolio, Goals, Tax, Risk Profiling pages
│   ├── components/         # Layout & Shared UI components
│   └── lib/
│       ├── ai/             # Gemini API connection and system prompts
│       ├── data/           # Synthetic customer financial data
│       └── utils/          # Calculations & formatting helpers
└── tests/                  # Custom 125-assertion validation test suite
```

---

## 🛠️ Getting Started

### Prerequisites
* Node.js (v18.x or later)
* npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arpit-data/IDBI-Hackathon.git
   cd IDBI-Hackathon/wealthwise-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
- **Live Web App (Vercel Cloud):** [https://wealthwise-app-pink.vercel.app](https://wealthwise-app-pink.vercel.app)
- **Live Web App (Cloud Run):** [https://wealthwise-app-968067906878.asia-south1.run.app](https://wealthwise-app-968067906878.asia-south1.run.app)

4. Run the production build verification:
   ```bash
   npm run build
   ```

---

## 🧪 Automated Testing

We have built a comprehensive, 125-assertion automated test suite to ensure application stability, route accessibility, data integrity, and branding compliance.

To run the test suite:
```bash
node tests/app-test.mjs
```

### Test Scope:
* **Route Accessibility:** Verifies all 17 pages load with a 200 OK status.
* **Branding Compliance:** Checks for IDBI logos, Montserrat typography, and primary color system application.
* **A11y (Accessibility):** Confirms landmarks, skip-links, and ARIA labels.
* **API Validation:** Tests streaming chat endpoint behavior.
* **Data Integrity:** Ensures financial formats, health score rings, and calculations are accurate.
