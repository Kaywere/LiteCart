import React, { useState } from "react";
import "../styles/POS.css";

function POS() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="pos">
      <div className="pos-container">
        {/* Left Checkout Frame */}
        <div className="checkout-frame">
          <div className="checkout-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with dynamically generated rows */}
                <tr>
                  <td>Example Item</td>
                  <td>2</td>
                  <td>$10.00</td>
                  <td>$20.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="checkout-summary">
            <h2>Grand Total: ${grandTotal}</h2>
            <div className="discount-buttons">
              <button>Discount %</button>
              <button>Discount $</button>
            </div>
          </div>
          <div className="payment-methods">
            <button onClick={() => handlePaymentMethod("cash")}>Cash</button>
            <button onClick={() => handlePaymentMethod("card")}>Card</button>
            {paymentMethod && (
              <div className="payment-input">
                <label>Enter Amount</label>
                <input
                  type="text"
                  value={grandTotal}
                  readOnly
                  placeholder="Enter amount"
                />
              </div>
            )}
          </div>
          <button className={`pay-button ${paymentMethod ? "" : "disabled"}`}>
            Pay
          </button>
        </div>

        {/* Right Product Frame */}
        <div className="product-frame">
          <div className="product-actions">
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
            <button>Button 4</button>
          </div>
          <div className="product-list">
            <input
              type="text"
              className="product-search"
              placeholder="Search for a product..."
            />
            <div className="product-grid">
              {/* Replace with dynamically generated cards */}
              <div className="product-card">
                <h3>Product 1</h3>
                <p>Price: $10</p>
              </div>
              <div className="product-card">
                <h3>Product 2</h3>
                <p>Price: $15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POS;
