import React from 'react';

const PolicyPage = () => {
    const containerStyle = {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        fontFamily: "'Georgia', serif",
        color: '#333',
        backdropFilter: 'blur(5px)'
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '2.5em',
        borderBottom: '2px solid #2c3e50',
        paddingBottom: '10px',
        position: 'relative'
    };

    const subheadingStyle = {
        color: '#2980b9',
        marginTop: '30px',
        fontSize: '1.5em'
    };

    const paragraphStyle = {
        lineHeight: '1.8',
        color: '#7f8c8d',
        marginTop: '15px'
    };

    const sectionStyle = {
        marginBottom: '30px',
        padding: '15px 0',
        borderBottom: '1px solid #ecf0f1'
    };

    const backgroundStyle = {
        backgroundImage: 'url("https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&amp;t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        padding: '40px 0'
    };

    return (
        <div style={backgroundStyle}>
            <div style={containerStyle}>
                <h1 style={headingStyle}>Customer Information Privacy Policy</h1>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>1. Purpose and Scope of Information Collection</h2>
                    <p style={paragraphStyle}>We collect customer information to:</p>
                    <ul style={paragraphStyle}>
                        <li>Process orders and provide services requested by customers.</li>
                        <li>Send information about new products, services, or promotional programs.</li>
                        <li>Support customers when issues arise.</li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>2. Scope of Information Use</h2>
                    <p style={paragraphStyle}>Customer information will be used internally within the company to:</p>
                    <ul style={paragraphStyle}>
                        <li>Contact and confirm with customers for order processing and delivery upon customer request.</li>
                        <li>Provide information related to products.</li>
                        <li>Process orders and provide services, information through our website.</li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>3. Information Storage Duration</h2>
                    <p style={paragraphStyle}>Customer personal information will be stored until the customer requests to cancel it or logs in and performs cancellation. Otherwise, customer personal information will be kept confidential on our server.</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>4. Address of the Information Collection and Management Unit</h2>
                    <p style={paragraphStyle}>ABC Co., Ltd</p>
                    <p style={paragraphStyle}>Lot E2a-7, Road D1, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>
                    <p style={paragraphStyle}>Email: contact@abc.com</p>
                    <p style={paragraphStyle}>Phone: 0123 456 789</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>5. Means and Tools for Users to Access and Edit Their Personal Data</h2>
                    <p style={paragraphStyle}>Customers have the right to request us to update, adjust, or cancel their personal information by:</p>
                    <ul style={paragraphStyle}>
                        <li>Emailing to contact@abc.com</li>
                        <li>Calling the phone number 0123 456 789</li>
                        <li>Accessing their personal account on our website.</li>
                    </ul>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>6. Commitment to Customer Personal Information Security</h2>
                    <p style={paragraphStyle}>We commit to keeping customer personal information confidential by all possible means. We will not share customer information with third parties without customer consent except where required by law.</p>
                </section>
            </div>
        </div>
    );
};

export default PolicyPage;
