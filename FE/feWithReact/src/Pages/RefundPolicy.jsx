import React from 'react';

const RefundPolicy = () => {
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
                <h1 style={headingStyle}>Refund Policy</h1>
                
                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>1. Introduction</h2>
                    <p style={paragraphStyle}>We strive to ensure you are satisfied with your purchase. If you are not completely happy with your order, we are here to help.</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>2. Returns</h2>
                    <p style={paragraphStyle}>You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and you need to have the receipt or proof of purchase.</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>3. Refunds</h2>
                    <p style={paragraphStyle}>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>4. Shipping</h2>
                    <p style={paragraphStyle}>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                </section>

                <section style={sectionStyle}>
                    <h2 style={subheadingStyle}>5. Contact Us</h2>
                    <p style={paragraphStyle}>If you have any questions on how to return your item to us, contact us at support@example.com or call us at (123) 456-7890.</p>
                </section>
            </div>
        </div>
    );
};

export default RefundPolicy;
