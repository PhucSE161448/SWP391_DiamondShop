import React from 'react';
import './PolicyPage.css';

const PolicyPage = () => {
    return (
        <div className="container">
            <h1>Customer Information Privacy Policy</h1>

            <h2>1. Purpose and Scope of Information Collection</h2>
            <p>We collect customer information to:</p>
            <ul>
                <li>Process orders and provide services requested by customers.</li>
                <li>Send information about new products, services, or promotional programs.</li>
                <li>Support customers when issues arise.</li>
            </ul>

            <h2>2. Scope of Information Use</h2>
            <p>Customer information will be used internally within the company to:</p>
            <ul>
                <li>Contact and confirm with customers for order processing and delivery upon customer request.</li>
                <li>Provide information related to products.</li>
                <li>Process orders and provide services, information through our website.</li>
            </ul>

            <h2>3. Information Storage Duration</h2>
            <p>Customer personal information will be stored until the customer requests to cancel it or logs in and performs cancellation. Otherwise, customer personal information will be kept confidential on our server.</p>

            <h2>6. Commitment to Customer Personal Information Security</h2>
            <p>We commit to keeping customer personal information confidential by all possible means. We will not share customer information with third parties without customer consent except where required by law.</p>
        </div>
    );
};

export default PolicyPage;
