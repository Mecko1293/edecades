import { createClientFromRequest } from "https://cdn.base44.com/base44-deno-sdk.js";

export default async function handler(req: Request): Promise<Response> {
  const base44 = createClientFromRequest(req);
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

  const emails = [
    {
      to: "ada@goodrx.com",
      subject: "API Partnership Inquiry — CheapMedz Prescription Price Comparison Platform",
      body: `Hi GoodRx Partnerships Team,

My name is Anthony D. Kittles Sr., founder of CheapMedz (CheapMedz.com) — a prescription price comparison platform currently in development under King Xcel Innovations, a U.S.-based digital technology company based in Irving, Texas.

CheapMedz is being built to help uninsured and underinsured Americans compare medication prices and find savings at pharmacies near them — a mission very aligned with GoodRx's.

I'm reaching out to explore an API partnership that would allow CheapMedz to surface GoodRx discount pricing data and coupon codes directly within our platform. In return, GoodRx would earn exposure to our user base and we would earn a referral commission per redemption.

I've reviewed your developer/API program and believe CheapMedz is an ideal publisher partner. We're actively building our platform, our domain (CheapMedz.com) is registered, and our concept page is live.

Would you be open to a brief call to discuss partnership terms?

Best regards,
Anthony D. Kittles Sr.
Founder, King Xcel Innovations | CheapMedz.com
📧 kingxcelinnovations@gmail.com
🌐 https://antonio-app-264b69b7.base44.app/CheapMedz`
    },
    {
      to: "mark@costplusdrugs.com",
      subject: "Affiliate Partnership — CheapMedz + Cost Plus Drugs",
      body: `Hi Mark,

My name is Anthony D. Kittles Sr., founder of CheapMedz (CheapMedz.com) — a prescription price comparison platform I'm building under King Xcel Innovations, based in Irving, Texas.

CheapMedz helps Americans find the lowest prescription prices near them. Cost Plus Drugs is one of the most important stories in affordable healthcare right now, and I want to make sure every CheapMedz user knows about your pricing.

I'm looking to feature Cost Plus Drugs as a top-tier partner in our comparison results. When users search a medication, Cost Plus Drugs would appear prominently with your transparent pricing — and we'd drive referral traffic your way through an affiliate arrangement.

This is a win-win: more Americans discover your platform, and CheapMedz earns a small referral commission per transaction.

Would love to connect and explore this.

Anthony D. Kittles Sr.
Founder, King Xcel Innovations | CheapMedz.com
📧 kingxcelinnovations@gmail.com
🌐 https://antonio-app-264b69b7.base44.app/CheapMedz`
    },
    {
      to: "partners@rxspark.com",
      subject: "Affiliate Partner Application — CheapMedz.com",
      body: `Hi RxSpark Partnerships Team,

My name is Anthony D. Kittles Sr., founder of CheapMedz (CheapMedz.com), a prescription price comparison and savings platform being developed under King Xcel Innovations in Irving, Texas.

I came across your Affiliate Partner Program and I'm very interested in applying. CheapMedz users are exactly your target audience — people actively looking to save on prescriptions. Featuring RxSpark discount cards within our platform would provide immediate value to our users and drive consistent qualified traffic to RxSpark.

I've begun the application process at rxspark.com/become-a-partner/organization and am reaching out directly to introduce ourselves. I'd love to discuss co-branded discount cards and integration details.

Our concept page is live at the link below. We'd be proud to feature the RxSpark logo and branding on our cards.

Best regards,
Anthony D. Kittles Sr.
Founder, King Xcel Innovations | CheapMedz.com
📧 kingxcelinnovations@gmail.com
🌐 https://antonio-app-264b69b7.base44.app/CheapMedz`
    },
    {
      to: "partnerships@blinkhealth.com",
      subject: "Affiliate Partnership — CheapMedz Price Comparison Platform",
      body: `Hi Blink Health Partnerships Team,

I'm Anthony D. Kittles Sr., founder of CheapMedz (CheapMedz.com), a prescription medication price comparison platform launching under King Xcel Innovations.

Our platform is designed to help Americans compare drug prices across pharmacies — and Blink Health's model of negotiated prescription prices is exactly the kind of solution our users need. I'd love to feature Blink Health as a featured partner and drive qualified traffic your way through affiliate links embedded in our price comparison results.

I've noted that Blink Health has an affiliate program through FlexOffers offering 5–10% commission. I'm applying through that channel as well, but wanted to reach out directly to discuss a more integrated partnership — potentially featuring Blink Health prominently in our search results and comparison pages.

Would you be open to discussing a direct partnership arrangement?

Best,
Anthony D. Kittles Sr.
Founder, King Xcel Innovations | CheapMedz.com
📧 kingxcelinnovations@gmail.com
🌐 https://antonio-app-264b69b7.base44.app/CheapMedz`
    },
    {
      to: "press@costplusdrugs.com",
      subject: "Affiliate Partnership Inquiry — CheapMedz + Cost Plus Drugs",
      body: `Hi Cost Plus Drugs Team,

My name is Anthony D. Kittles Sr., founder of CheapMedz (CheapMedz.com) — a prescription price comparison platform being built under King Xcel Innovations in Irving, Texas.

CheapMedz helps Americans find the lowest prescription prices near them. Cost Plus Drugs is one of the most impactful stories in affordable healthcare today, and we want to make sure every CheapMedz user knows about your transparent pricing.

We'd love to feature Cost Plus Drugs as a top-tier partner in our comparison results and explore an affiliate arrangement that drives qualified referral traffic your way.

Would you be open to connecting about a partnership?

Best regards,
Anthony D. Kittles Sr.
Founder, King Xcel Innovations | CheapMedz.com
📧 kingxcelinnovations@gmail.com
🌐 https://antonio-app-264b69b7.base44.app/CheapMedz`
    }
  ];

  const results = [];

  for (const email of emails) {
    const messageParts = [
      `From: King Xcel Innovations <kingxcelinnovations@gmail.com>`,
      `To: ${email.to}`,
      `Subject: ${email.subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      email.body
    ];
    const rawMessage = messageParts.join('\n');
    const encodedMessage = btoa(unescape(encodeURIComponent(rawMessage)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw: encodedMessage })
    });

    const data = await res.json();
    results.push({ to: email.to, status: res.ok ? 'sent' : 'failed', detail: data });
  }

  return Response.json({ results });
}
