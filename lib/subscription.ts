import { auth } from "@clerk/nextjs";
import UserSubscription from "@/models/userSubscription"; // Import the UserSubscription model
// import { connectToDB } from "@/lib/mongodb"; // Import the connectToDB function


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    // Connect to MongoDB
    // await connectToDB();

    const { userId } = auth();

    if (!userId) {
        return false;
    }

    try {
        const userSubscription = await UserSubscription.findOne({ userId });

        if (!userSubscription) {
            return false;
        }

        const isValid =
            userSubscription.stripePriceId &&
            userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

        return isValid;
    } catch (error) {
        console.error("Error checking subscription:", error);
        return false;
    }
}