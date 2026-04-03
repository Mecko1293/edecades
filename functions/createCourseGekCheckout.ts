import Stripe from "npm:stripe@14.0.0";

const PRICES = {
  single: { amount: 499, name: "CourseGek - Single Question Answer", description: "Get a full expert answer to one homework question. Step-by-step. 100% satisfaction guaranteed." },
  bundle: { amount: 1299, name: "CourseGek - 3-Question Bundle", description: "Get expert answers to 3 homework questions. Save vs. buying individually. Any subject covered." },
  pro_monthly: { amount: 1499, name: "CourseGek Student Pro", description: "Unlimited question posts, priority matching, faster responses.", interval: "month" },
  tutor_monthly: { amount: 1999, name: "CourseGek Tutor/Expert Plan", description: "List unlimited subjects, receive unlimited student bids, featured placement.", interval: "month" },
};

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

    const body = await req.json().catch(() => ({}));
    const plan = body.plan || "single";
    const successUrl = body.success_url || "https://antonio-major-help-app.base44.app/CourseGek?payment=success";
    const cancelUrl = body.cancel_url || "https://antonio-major-help-app.base44.app/CourseGek?payment=cancelled";

    const priceInfo = PRICES[plan];
    if (!priceInfo) {
      return Response.json({ error: "Invalid plan. Use: single, bundle, pro_monthly, tutor_monthly" }, { status: 400 });
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
      metadata: { plan, app: "coursegek" },
    });

    return Response.json({ url: session.url, session_id: session.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
