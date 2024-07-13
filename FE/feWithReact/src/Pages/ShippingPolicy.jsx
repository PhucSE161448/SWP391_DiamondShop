// src/Pages/ShippingPolicy.jsx
import React from 'react';
import './ShippingPolicy.css';

const ShippingPolicy = () => {
    return (
        <div className="policy-container">
            <h1>Shipping Policy</h1>
            
            <section>
                <h2>1. Introduction</h2>
                <p>We are committed to delivering your order accurately, in good condition, and on time. Please read our shipping policy to understand how we handle shipping and delivery.</p>
            </section>

            <section>
                <h2>2. Shipping Charges</h2>
                <p>Shipping charges are calculated based on the weight of the items and the destination. The charges will be displayed during the checkout process before you complete your order.</p>
            </section>

            <section>
                <h2>3. Shipping Methods and Delivery Times</h2>
                <p>We offer a variety of shipping methods to meet your needs. Delivery times are estimated based on the shipping method you choose:</p>
                <ul>
                    <li>Standard Shipping: 5-7 business days</li>
                    <li>Expedited Shipping: 2-3 business days</li>
                    <li>Overnight Shipping: 1 business day</li>
                </ul>
            </section>

            <section>
                <h2>4. Order Processing Time</h2>
                <p>Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
            </section>

            <section>
                <h2>5. International Shipping</h2>
                <p>We currently do not offer international shipping. We only ship within the domestic region.</p>
            </section>

            <section>
                <h2>6. Tracking Your Order</h2>
                <p>Once your order has been shipped, you will receive an email with the tracking information. You can also track your order in your account on our website.</p>
            </section>

            <section>
                <h2>7. Contact Us</h2>
                <p>If you have any questions about our shipping policy or need assistance with your order, please contact us at support@example.com or call us at (123) 456-7890.</p>
            </section>
        </div>
    );
};

export default ShippingPolicy;
