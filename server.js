const stripe = require("stripe")(
  "sk_test_51GlLGnL1APTgfm61VnjMaSQGcQjq7H5nj1n3gp8suYD8IRTktqNBjQfi5SdDG4w8R8F3fWGEODvaQp3eNQDoO2sR00NBKmuHiU"
);
const express = require("express");
const app = express();
app.use(express.static("."));
const YOUR_DOMAIN = "http://localhost:5501";
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hook Razor",
            images: [
              "https://kennycastaneda.github.io/hookrazor/images/hook_banner.jpeg",
            ],
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});
app.listen(5501, () => console.log("Running on port 5501"));
