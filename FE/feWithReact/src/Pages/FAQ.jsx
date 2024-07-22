import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy on all items. Please ensure that the items are in their original condition."
        },
        {
            question: "How do I track my order?",
            answer: "Once your order has been shipped, we will send you an email with the tracking information. You can also track your order in your account on our website."
        },
        {
            question: "Do you offer gift wrapping?",
            answer: "Yes, we offer gift wrapping for a small fee. You can select this option at checkout."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers."
        },
        {
            question: "How do I contact customer service?",
            answer: "You can contact our customer service team via email at support@example.com or call us at (123) 456-7890."
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const containerStyle = {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fefefe',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        fontFamily: "'Georgia', serif",
        color: '#333'
    };

    const headingStyle = {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '2.5em',
        borderBottom: '2px solid #2c3e50',
        paddingBottom: '10px'
    };

    const questionStyle = {
        cursor: 'pointer',
        color: '#2980b9',
        marginTop: '20px',
        fontSize: '1.2em',
        paddingBottom: '10px',
        borderBottom: '1px solid #ecf0f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'color 0.3s ease'
    };

    const answerStyle = {
        marginTop: '10px',
        paddingLeft: '20px',
        lineHeight: '1.8',
        color: '#7f8c8d'
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
                <h1 style={headingStyle}>Frequently Asked Questions</h1>
                <div>
                    {questions.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div
                                style={questionStyle}
                                onClick={() => toggleAnswer(index)}
                            >
                                {item.question}
                                {activeIndex === index ? (
                                    <FaChevronUp style={{ transition: 'transform 0.3s ease' }} />
                                ) : (
                                    <FaChevronDown style={{ transition: 'transform 0.3s ease' }} />
                                )}
                            </div>
                            {activeIndex === index && (
                                <div style={answerStyle}>
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
