import React from 'react';

const PolicyPage = () => {
  return (
    <div className="container" style={{
      padding: '20px',
    }}>
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

      <h2>4. Address of the Information Collection and Management Unit</h2>
      <p>ABC Co., Ltd</p>
      <p>Lot E2a-7, Road D1, Long Thanh My, Thu Duc City, Ho Chi Minh Cityy</p>
      <p>Email: contact@abc.com</p>
      <p>Phone: 0123 456 789</p>

      <h2>5. Means and Tools for Users to Access and Edit Their Personal Data</h2>
      <p>Customers have the right to request us to update, adjust, or cancel their personal information by:</p>
      <ul>
        <li>Emailing to contact@abc.com</li>
        <li>Calling the phone number 0123 456 789</li>
        <li>Accessing their personal account on our website.</li>
      </ul>

      <h2>6. Commitment to Customer Personal Information Security</h2>
      <p>We commit to keeping customer personal information confidential by all possible means. We will not share customer information with third parties without customer consent except where required by law.</p>
    </div>
  );
};

export default PolicyPage;
