import Razorpay from "razorpay";
import shortid from "shortid";

export const POST = async (req) => {

    const { amount: payAmount } = await req.json();
    console.log(payAmount);
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = payAmount;
    const currency = "INR";
    const options = {
        amount: (amount * 100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        return new Response(JSON.stringify({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }), {status: 200})
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(err), {status: 500})
    }
}