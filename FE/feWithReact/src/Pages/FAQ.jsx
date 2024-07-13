// src/Pages/FAQ.jsx
import React, { useState } from 'react';
import './FAQ.css';

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

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <div className="faq-list">
                {questions.map((item, index) => (
                    <div key={index} className="faq-item">
                        <div className="faq-question" onClick={() => toggleAnswer(index)}>
                            {item.question}
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
