import { Hono } from "hono"
import { handle } from "hono/vercel"
import { cors } from "hono/cors"
import { StripeLineItemType, LineItemType } from "@/schemas"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export const runtime = "edge"

const app = new Hono().basePath("/api")

app.use(cors())

/**
 *	POST REQUEST FOR STRIPE
 */
app.post("/checkout", async (c) => {
    /** Our data will look like [{ id, price },{ id, price }] */
    const body = await c.req.json()

    const origin = c.req.header("origin")

    const items = body.items

    let lineItems: StripeLineItemType[] = []

    /** Reformats the data in the way stripe wants */
    items.forEach((item: LineItemType) => {
        lineItems.push({
            price: item.id, // stripe uses price for id
            quantity: item.quantity,
        })
    })

    /** Send the data to stripe */
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/?success`,
        cancel_url: `${origin}/?cancel`,
        allow_promotion_codes: true,
    })

    /** Returns the url */
    return c.json(session.url)
})

export const POST = handle(app)
