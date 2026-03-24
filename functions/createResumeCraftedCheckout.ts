import Stripe from "npm:stripe@14.0.0";

const PRICES = {
  pro_monthly: { amount: 999, name: "ResumeCrafted Pro", description: "Unlimited resumes, 50+ premium templates, AI writing assistant, ATS checker, cover letter builder.", interval: "month" },
  pro_annual: { amount: 7900, name: "ResumeCrafted Pro Annual", description: "Unlimited resumes, 50+ premium templates, AI writing assistant, ATS checker — save 34% vs monthly.", interval: "year" },
  single: { amount: 499, name: "ResumeCrafted Single Download", description: "One-time resume download. All premium templates, clean PDF, no watermark, no subscription needed." },
};

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

    const body = await req.json().catch(() => ({}));
    const plan = body.plan || "pro_monthly";
    const successUrl = body.success_url || "https://antonio-app-264b69b7.base44.app/ResumeCrafted?payment=success";
    const cancelUrl = body.cancel_url || "https://antonio-app-264b69b7.base44.app/ResumeCrafted?payment=cancelled";

    const priceInfo = PRICES[plan];
    if (!priceInfo) {
      return Response.json({ error: "Invalid plan. Use: pro_monthly, pro_annual, single" }, { status: 400 });
    }

    const product = await stripe.products.create({
      name: priceInfo.name,
      description: priceInfo.description,
    });

    let price;
    if (priceInfo.interval) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceInfo.amount,
        currency: "usd",
        recurring: { interval: priceInfo.interval },
      });
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceInfo.amount,
        currency: "usd",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      mode: priceInfo.interval ? "subscription" : "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { plan, app: "resumecrafted" },
    });

    return Response.json({ url: session.url, session_id: session.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
