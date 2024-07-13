// src/Pages/RefundPolicy.jsx
import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
    return (
        <div className="policy-container">
            <h1>Refund Policy</h1>
            
            <section>
                <h2>1. Introduction</h2>
                <p>We strive to ensure you are satisfied with your purchase. If you are not completely happy with your order, we are here to help.</p>
            </section>

            <section>
                <h2>2. Returns</h2>
                <p>You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and you need to have the receipt or proof of purchase.</p>
            </section>

            <section>
                <h2>3. Refunds</h2>
                <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
            </section>

            <section>
                <h2>4. Shipping</h2>
                <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
            </section>

            <section>
                <h2>5. Contact Us</h2>
                <p>If you have any questions on how to return your item to us, contact us at support@example.com or call us at (123) 456-7890.</p>
            </section>
        </div>
    );
};

export default RefundPolicy;
