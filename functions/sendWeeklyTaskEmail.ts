export default async function sendWeeklyTaskEmail(req: Request) {
  const email = new URL(req.url).searchParams.get('email') || 'anthonykittles@outlook.com';
  
  const emailBody = `Subject: Weekly Operations Task List – May 11, 2026

Hi Anthony,

Here's your weekly operations rundown for eDecades and King Xcel Innovations:

═══════════════════════════════════════════════════════════════

📋 TASKS FOR ANTONIO (AI Agent)

1. Monitor eDecades DNS Propagation
   Status: Ongoing since May 10 nameserver switch
   Action: Check propagation status across global DNS servers
   Frequency: Daily until 100% propagated
   Link: https://www.whatsmydns.net (query: edecades.com)

2. Daily Social Media Auto-Posts
   Platforms: LinkedIn, Pinterest, TikTok
   Time: 9:00 AM, 3:00 PM, 9:00 PM Central
   Status: Active automation running 3x daily

3. Directory Listing Verification
   Target: Maintain presence on 19 business directories
   Frequency: Weekly check (Sunday 10:00 AM Central)
   Status: Automated weekly reminder active

4. AI Content Generation
   Task: Generate decade-specific nostalgia content
   Tools: LLM-powered SocialMediaHub
   Frequency: Continuous (fed into daily posts)

═══════════════════════════════════════════════════════════════

📋 TASKS FOR ANTHONY (You)

1. Stripe Account Status Follow-up
   Current: Account acct_1T4XQARonfiMrfdu under review
   Action: Monitor email for Stripe updates
   Note: Restrictions lifted once landing pages are verified

2. CheapMedz Affiliate Outreach
   Status: Ready to send (draft completed)
   Targets: GoodRx, Blink Health, Mark Cuban Cost Plus Drugs, Amazon Pharmacy, RxSpark
   Action: Review and approve outreach emails before sending

3. eDecades Content Review
   Check: User submissions, community posts, forum activity
   Admin Panel: https://antonio-major-help-app.base44.app/AdminPanel

4. King Xcel Portfolio Status Check
   Projects to review:
   • eDecades (Vercel deployment) – Live
   • CourseGek (pricing tiers active) – Active
   • ResumeCrafted (checkout integration) – Active
   • WheelMath (pie-math-quest.base44.app) – Active
   • CheapMedz (affiliate setup) – Ready for launch

═══════════════════════════════════════════════════════════════

⚡ KEY METRICS & LINKS

eDecades Production: https://edecades.com
Admin Dashboard: https://antonio-major-help-app.base44.app/AdminPanel
Ops Tracker: https://antonio-major-help-app.base44.app/eDecadesDailyTracker
GitHub (eDecades): https://github.com/Mecko1293/edecades

═══════════════════════════════════════════════════════════════

Next check: Monday, May 18, 2026 at 8:00 AM Central

Questions? Reply to this email or hit up the admin dashboard.

— Antonio
Your AI Agent
King Xcel Innovations`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${Deno.env.get('RESEND_API_KEY')}\`
      },
      body: JSON.stringify({
        from: 'noreply@edecades.com',
        to: email,
        subject: 'Weekly Operations Task List – May 11, 2026',
        html: emailBody.replace(/\n/g, '<br/>')
      })
    });

    const result = await response.json();
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
