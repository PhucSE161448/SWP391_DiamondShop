// src/Pages/PolicyPage.jsx
import React from 'react';
import './PolicyPage.css';

const PolicyPage = () => {
    return (
        <div className="policy-container">
            <h1>Personal Data Processing Policy</h1>
            
            <section>
                <h2>1. Introduction</h2>
                <p>We value your privacy and are committed to protecting your personal data. This policy outlines how we handle and process your personal information.</p>
            </section>

            <section>
                <h2>2. Data Collection</h2>
                <p>We collect personal data that you provide to us directly, such as when you create an account, make a purchase, or contact our support team.</p>
            </section>

            <section>
                <h2>3. Data Usage</h2>
                <p>Your personal data is used to provide and improve our services, process transactions, and communicate with you. We may also use your data for marketing purposes with your consent.</p>
            </section>

            <section>
                <h2>4. Data Sharing</h2>
                <p>We do not share your personal data with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>
            </section>

            <section>
                <h2>5. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure.</p>
            </section>

            <section>
                <h2>6. Your Rights</h2>
                <p>You have the right to access, rectify, or delete your personal data. You can also object to or restrict the processing of your data and request data portability.</p>
            </section>

            <section>
                <h2>7. Contact Us</h2>
                <p>If you have any questions or concerns about our data processing practices, please contact us at privacy@example.com.</p>
            </section>
        </div>
    );
};

export default PolicyPage;
