"use client"

import React, { useState } from 'react'
// import GooglePayButton from '@google-pay/button-react'

const Payment = () => {
        const [amount, setAmount] = useState(null)

        const initializeRazorpay = () => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";

                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };

                document.body.appendChild(script);
                });
            };



        const makePayment = async () => {
            console.log("here...");
            const res = await initializeRazorpay();

            if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
            }

            // Make API call to the serverless API
            const data = await fetch(`/api/razorpay`,
            { 
                method: "POST" ,
                body: JSON.stringify({amount})
            }).then((t) =>
                t.json()
            );
            console.log(data);
            var options = {
            key: process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
            name: "Sumit Kumar Sharma",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Thankyou for your test donation",
            image: "/assets/logo.svg",
            handler: function (response) {
                // Validate payment at server - using webhooks is a better idea.
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);

                alert("Payment successful")
            },
            prefill: {
                name: "Sumit Kumar Sharma",
                email: "sumitkumarsharma372@gmail.com",
                contact: "8927229158",
            },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };

  return (
    <div className='flex my-10 flex-col gap-3 mx-auto w-[95%] max-w-lg'>
        <label>
            <p className='text-center font-kanit text-2xl my-3'>Amount</p>
            <input style={{color: 'white'}} autoFocus={true} type='number' min={0} className='form_input bg-secondary border-b-[2px] border-gray-50 outline-none font-poppins font-bold text-5xl text-gray-50 text-center'
                value= {amount}
                onChange={(e) => setAmount(e.target.value)}
            />
        </label>
        <button className='p-2 bg-purple text-gray-50 w-[90%] rounded-md'
            onClick={makePayment}
        >
            Pay Securey with Razorpay
        </button>
    </div>
  )
}

export default Payment