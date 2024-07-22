import React from "react";

const CustomerPolicy = () => {
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
        <h1 style={headingStyle}>Personal Data Processing Policy</h1>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            We value your privacy and are committed to protecting your personal
            data. This policy outlines how we handle and process your personal
            information.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>2. Data Collection</h2>
          <p style={paragraphStyle}>
            We collect personal data that you provide to us directly, such as
            when you create an account, make a purchase, or contact our support
            team.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>3. Data Usage</h2>
          <p style={paragraphStyle}>
            Your personal data is used to provide and improve our services,
            process transactions, and communicate with you. We may also use your
            data for marketing purposes with your consent.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>4. Data Sharing</h2>
          <p style={paragraphStyle}>
            We do not share your personal data with third parties except as
            necessary to provide our services, comply with the law, or protect
            our rights.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>5. Data Security</h2>
          <p style={paragraphStyle}>
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, use, or
            disclosure.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>6. Your Rights</h2>
          <p style={paragraphStyle}>
            You have the right to access, rectify, or delete your personal data.
            You can also object to or restrict the processing of your data and
            request data portability.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={subheadingStyle}>7. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions or concerns about our data processing
            practices, please contact us at privacy@example.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CustomerPolicy;
