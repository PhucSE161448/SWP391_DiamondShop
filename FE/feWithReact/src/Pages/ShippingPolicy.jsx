import React from "react";

const ShippingPolicy = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#fefefe",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    fontFamily: "'Georgia', serif",
    color: "#333",
    position: "relative",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "30px",
    fontSize: "2.5em",
    borderBottom: "2px solid #2c3e50",
    paddingBottom: "10px",
    position: "relative",
  };

  const subheadingStyle = {
    color: "#2980b9",
    marginTop: "30px",
    fontSize: "1.5em",
  };

  const paragraphStyle = {
    lineHeight: "1.8",
    color: "#7f8c8d",
    marginTop: "15px",
  };

  const sectionStyle = {
    marginBottom: "30px",
    padding: "15px 0",
    borderBottom: "1px solid #ecf0f1",
  };

  const ulStyle = {
    marginTop: "10px",
    paddingLeft: "20px",
    lineHeight: "1.8",
    color: "#7f8c8d",
  };

  const imageStyle = {
    width: "50px",
    height: "50px",
    position: "absolute",
    right: "20px",
    top: "20px",
  };
  const backgroundStyle = {
    backgroundImage:
      'url("https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&amp;t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c")',
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    padding: "40px 0",
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Shipping Policy</h1>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            We are committed to delivering your order accurately, in good
            condition, and on time. Please read our shipping policy to
            understand how we handle shipping and delivery.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>2. Shipping Charges</h2>
          <p style={paragraphStyle}>
            Shipping charges are calculated based on the weight of the items and
            the destination. The charges will be displayed during the checkout
            process before you complete your order.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>
            3. Shipping Methods and Delivery Times
          </h2>
          <p style={paragraphStyle}>
            We offer a variety of shipping methods to meet your needs. Delivery
            times are estimated based on the shipping method you choose:
          </p>
          <ul style={ulStyle}>
            <li>Standard Shipping: 5-7 business days</li>
            <li>Expedited Shipping: 2-3 business days</li>
            <li>Overnight Shipping: 1 business day</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>4. Order Processing Time</h2>
          <p style={paragraphStyle}>
            Orders are processed within 1-2 business days. Orders placed on
            weekends or holidays will be processed on the next business day.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>5. International Shipping</h2>
          <p style={paragraphStyle}>
            We currently do not offer international shipping. We only ship
            within the domestic region.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>6. Tracking Your Order</h2>
          <p style={paragraphStyle}>
            Once your order has been shipped, you will receive an email with the
            tracking information. You can also track your order in your account
            on our website.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>7. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions about our shipping policy or need
            assistance with your order, please contact us at support@example.com
            or call us at (123) 456-7890.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
