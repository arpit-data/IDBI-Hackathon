/**
 * Chat API Route
 * Streaming endpoint for AI Wealth Avatar conversations.
 * Uses Gemini API with financial context injection and guardrails.
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateStreamingResponse, generateChatResponse } from '@/lib/ai/gemini';
import { buildSystemPrompt } from '@/lib/ai/prompts';
import { validateAIResponse, validateUserInput } from '@/lib/ai/guardrails';
import { sanitizeChatMessage, maskPII } from '@/lib/utils/sanitizer';
import {
  sampleUser,
  monthlySummaries,
  samplePortfolio,
  sampleGoals,
  sampleAccount,
} from '@/lib/data/syntheticData';
import { calculateHealthScore } from '@/lib/engines/healthScore';

/** Simple in-memory rate limiter */
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60000;

/**
 * POST /api/chat
 * Accepts a user message and returns an AI-generated response.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message, history = [] } = body;

    // Validate input
    const validation = validateUserInput(message);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 400 }
      );
    }

    // Sanitize message
    const sanitizedMessage = sanitizeChatMessage(message);
    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: 'Invalid message content.' },
        { status: 400 }
      );
    }

    // Log sanitized request (mask PII)
    console.log(`[Chat API] User query: ${maskPII(sanitizedMessage)}`);

    // Build system prompt with user's financial context
    const healthScore = calculateHealthScore(
      sampleUser,
      monthlySummaries,
      samplePortfolio,
      sampleAccount.balance
    );

    const systemPrompt = buildSystemPrompt(
      sampleUser,
      monthlySummaries,
      samplePortfolio,
      sampleGoals,
      healthScore.overall,
      sampleAccount.balance
    );

    // Format conversation history
    const formattedHistory = history
      .slice(-10) // Keep last 10 messages for context
      .map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      }));

    // Check if streaming is supported (has Gemini API key)
    const hasApiKey = !!process.env.GEMINI_API_KEY;

    if (hasApiKey) {
      // Try streaming response
      try {
        const stream = await generateStreamingResponse(
          systemPrompt,
          sanitizedMessage,
          formattedHistory
        );

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache',
          },
        });
      } catch {
        // Fall back to non-streaming
        const response = await generateChatResponse(
          systemPrompt,
          sanitizedMessage,
          formattedHistory
        );

        const validated = validateAIResponse(response);

        return NextResponse.json({
          message: validated.content,
          meta: {
            confidence: 0.85,
            hasDisclaimers: validated.isModified,
            topics: [],
            suggestHumanAdvisor: validated.suggestHumanAdvisor,
          },
        });
      }
    } else {
      // No API key — return a helpful fallback response
      const fallbackResponse = generateFallbackResponse(sanitizedMessage);
      return NextResponse.json({
        message: fallbackResponse,
        meta: {
          confidence: 0.9,
          hasDisclaimers: true,
          topics: [],
          suggestHumanAdvisor: false,
        },
      });
    }
  } catch (error) {
    console.error('[Chat API] Error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}

/** Checks and updates rate limit for a client */
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(clientId);

  if (!entry || now > entry.resetTime) {
    rateLimiter.set(clientId, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Generates intelligent fallback responses when Gemini API is unavailable.
 * Uses pattern matching on the user's message to provide relevant demo responses.
 */
function generateFallbackResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('spend') || lowerMsg.includes('expense') || lowerMsg.includes('money go')) {
    return `Great question, Arjun! Let me break down your spending for this month:

**June 2026 Spending Breakdown:**
- 🏠 **Rent**: ₹18,000 (26.2%) — Fixed cost
- 🏦 **EMI**: ₹8,500 (12.4%) — Education loan
- 🍽️ **Dining**: ₹6,070 (8.9%) — ⚠️ Up 52% from last month
- 🛒 **Groceries**: ₹6,250 (9.1%)
- 🛍️ **Shopping**: ₹4,599 (6.7%)
- 🚗 **Transport**: ₹3,390 (4.9%)
- 💡 **Utilities**: ₹2,699 (3.9%)

**Key Insight**: Your dining spending spiked significantly this month. If you can bring it back to your 3-month average of ₹4,000, you could save an extra ₹2,070/month — that's ₹24,840 per year!

**Action Step**: Consider setting a weekly dining budget of ₹1,000 through IDBI Bank's spending alerts feature.

---
*This is AI-generated guidance for informational purposes only.*`;
  }

  if (lowerMsg.includes('invest') || lowerMsg.includes('sip') || lowerMsg.includes('mutual fund')) {
    return `Based on your **moderate risk profile** and financial goals, here are my recommendations:

**Current SIPs** (Great discipline! 6-month streak 🎯):
- IDBI Nifty 50 Index Fund: ₹10,000/month
- IDBI Flexi Cap Fund: ₹5,000/month

**Suggested Actions**:
1. **Increase SIP by ₹5,000** → Your home-buying goal reaches target 8 months earlier
2. **Consider IDBI Tax Saver ELSS** → Save up to ₹46,800 in taxes under Section 80C
3. **Add a Debt Fund allocation** → Park your emergency fund in IDBI Short Duration Fund for better returns than savings account (6-8% vs 3.5%)

**Projected Growth** (at 12% annual returns):
- 5 years: ₹12.4 Lakhs
- 10 years: ₹34.8 Lakhs
- 20 years: ₹1.5 Crores

Your portfolio is well-balanced with a diversification score of 72/100. Adding some international equity exposure could improve it to 85+.

---
*This is AI-generated guidance. Past performance does not guarantee future returns.*`;
  }

  if (lowerMsg.includes('health') || lowerMsg.includes('score') || lowerMsg.includes('financial health')) {
    return `Your **Financial Health Score** is **82/100** — that's **Good**! 🟢

Here's the breakdown:

| Category | Score | Status |
|----------|-------|--------|
| 💰 Savings Rate | 75/100 | Good — 27.8% |
| 🏦 Debt Management | 80/100 | Good — Low DTI |
| 🛡️ Emergency Fund | 55/100 | ⚠️ Needs Work |
| 📊 Diversification | 72/100 | Average |
| 📋 Spending Discipline | 64/100 | Average |

**Top 3 Actions to Improve Your Score:**
1. **Build emergency fund to ₹3L** (+12 points) — You're at ₹1.87L, need ₹1.13L more
2. **Reduce discretionary spending** (+5 points) — Set a monthly budget for dining & shopping
3. **Diversify portfolio** (+6 points) — Add international equity or gold allocation

Your score has improved by **3 points** over the last month. Keep up the discipline! 💪

---
*This is AI-generated guidance for informational purposes only.*`;
  }

  if (lowerMsg.includes('home') || lowerMsg.includes('house') || lowerMsg.includes('property')) {
    return `Let's review your **Home Buying Goal**! 🏠

**Current Status:**
- Target Amount: ₹50,00,000 (down payment)
- Saved So Far: ₹4,40,400 (8.8%)
- Target Date: June 2031 (5 years away)
- Monthly Contribution: ₹15,000
- Status: **On Track** ✅

**Projection at Current Pace:**
At 12% expected returns with ₹15,000/month SIP, you'll accumulate approximately **₹14.7 Lakhs** in 5 years from SIPs alone, plus your existing corpus growth.

**To Accelerate:**
- Increase SIP by ₹5,000/month → Reach goal **8 months earlier**
- Increase SIP by ₹10,000/month → Reach goal **14 months earlier**

**Home Loan Readiness:**
- Credit Score: 762 (Good for home loan approval)
- DTI Ratio: 8.9% (Well within the 40% limit)
- Estimated EMI capacity: ₹35,000/month
- Eligible loan amount: ~₹40-45 Lakhs at 8.5% interest

You're in a solid position for home ownership! Consider IDBI Bank's home loan offerings for competitive rates.

---
*This is AI-generated guidance for informational purposes only.*`;
  }

  if (lowerMsg.includes('save') || lowerMsg.includes('saving') || lowerMsg.includes('budget')) {
    return `Let me help you optimize your savings, Arjun! 💰

**Current Savings Profile:**
- Monthly Income: ₹95,000
- Monthly Expenses: ₹68,587
- Monthly Savings: ₹26,413 (27.8%)
- Savings Account Balance: ₹1,87,432

**Quick Wins to Save More:**
1. 🍽️ **Reduce dining out** — Save ₹2,000/month by cooking more on weekends
2. 📱 **Audit subscriptions** — You pay ₹1,127/month for 3 subscriptions. Are all active?
3. 🛍️ **Set shopping budget** — Limit to ₹3,000/month (saves ₹1,599/month avg)
4. 🚗 **Optimize transport** — Use metro/public transport 2x/week to save ₹1,000/month

**Total Potential Monthly Savings: ₹4,599 extra**

That's ₹55,188 more per year, or **₹3.5 Lakhs in 5 years** if invested at 12%!

Would you like me to set up a smart budget plan with automated alerts through IDBI Bank?

---
*This is AI-generated guidance for informational purposes only.*`;
  }

  // Default response
  return `Thanks for your question, Arjun! As your WealthWise AI Coach, I'm here to help with:

📊 **Spending Analysis** — Understand where your money goes
💰 **Savings Optimization** — Find ways to save more
📈 **Investment Guidance** — Personalized investment recommendations
🎯 **Goal Planning** — Track and plan your financial goals
❤️ **Health Score** — Understand your financial wellness
🏠 **Loan Readiness** — Check your eligibility for home/car loans

**Quick Financial Snapshot:**
- Health Score: 82/100 (Good)
- Savings Rate: 27.8%
- Portfolio Value: ₹11.74 Lakhs (+15.2%)

Try asking me something specific like:
- "Where does my money go?"
- "How can I save more?"
- "Am I on track for my goals?"

---
*This is AI-generated guidance for informational purposes only.*`;
}
