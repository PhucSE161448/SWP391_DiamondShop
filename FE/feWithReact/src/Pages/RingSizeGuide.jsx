// src/Pages/RingSizeGuide.jsx
import React from 'react';
import './RingSizeGuide.css';

const RingSizeGuide = () => {
    return (
        <div className="container">
            <h1>Guide to Measure Your Ring Size</h1>

            <h2>Step 1: Prepare Materials</h2>
            <ul>
                <li>A ring that fits your finger well.</li>
                <li>A ruler or measuring tape.</li>
                <li>A piece of paper and a pen.</li>
            </ul>

            <h2>Step 2: Measure the Inner Diameter</h2>
            <p>Place the ring on the ruler and measure the inner diameter of the ring (in mm). Make sure to measure from the inner edges to get the most accurate size.</p>

            <h2>Step 3: Use the Measurement to Find Your Ring Size</h2>
            <p>Use the following chart to find your ring size based on the inner diameter:</p>
            <table>
                <thead>
                    <tr>
                        <th>Diameter (mm)</th>
                        <th>Ring Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>14.0</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>14.4</td>
                        <td>3.5</td>
                    </tr>
                    <tr>
                        <td>14.8</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>15.2</td>
                        <td>4.5</td>
                    </tr>
                    <tr>
                        <td>15.6</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>16.0</td>
                        <td>5.5</td>
                    </tr>
                    <tr>
                        <td>16.5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>16.9</td>
                        <td>6.5</td>
                    </tr>
                    <tr>
                        <td>17.3</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>17.7</td>
                        <td>7.5</td>
                    </tr>
                    <tr>
                        <td>18.1</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>18.5</td>
                        <td>8.5</td>
                    </tr>
                    <tr>
                        <td>19.0</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>19.4</td>
                        <td>9.5</td>
                    </tr>
                    <tr>
                        <td>19.8</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>20.2</td>
                        <td>10.5</td>
                    </tr>
                    <tr>
                        <td>20.6</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>21.0</td>
                        <td>11.5</td>
                    </tr>
                    <tr>
                        <td>21.4</td>
                        <td>12</td>
                    </tr>
                </tbody>
            </table>

            <h2>Tips for Accurate Measurement</h2>
            <ul>
                <li>Measure your finger at the end of the day when it is largest.</li>
                <li>Measure the finger on which you will wear the ring.</li>
                <li>Measure the finger 3 to 4 times to ensure accuracy.</li>
            </ul>
        </div>
    );
};

export default RingSizeGuide;
