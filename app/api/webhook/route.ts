import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import UserSubscription from "@/models/userSubscription"; // Import the UserSubscription model

import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);
    const id = userId


    const body = await req.body();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 400})   
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", {status: 400})
        }

        try {
            await UserSubscription.create({
                id: id,
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            });
        } catch (error) {
            console.error("Error creating user subscription:", error);
            return new NextResponse("Error creating user subscription", { status: 500 });
        }
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        try {
            await UserSubscription.updateOne({
                stripeSubscriptionId: subscription.id,
            }, {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            });
        } catch (error) {
            console.error("Error updating user subscription:", error);
            return new NextResponse("Error updating user subscription", { status: 500 });
        }
    }
    
    return new NextResponse(null, { status: 200 });
}
