import React from "react";
import "../styles/POS.css";

function POS() {
  return (
    <div className="pos">
      <h1 className="pos-title">Point of Sale</h1>
      <div className="pos-container">
        <div className="pos-form">
          <h2>Add Item to Cart</h2>
          <form>
            <div className="form-group">
              <label htmlFor="item-name">Item Name</label>
              <input type="text" id="item-name" placeholder="Enter item name" />
            </div>
            <div className="form-group">
              <label htmlFor="item-price">Price</label>
              <input type="number" id="item-price" placeholder="Enter price" />
            </div>
            <div className="form-group">
              <label htmlFor="item-quantity">Quantity</label>
              <input type="number" id="item-quantity" placeholder="Enter quantity" />
            </div>
            <button type="submit" className="add-to-cart-btn">Add to Cart</button>
          </form>
        </div>
        <div className="cart">
          <h2>Cart</h2>
          <ul>
            <li>
              <span>Placeholder Item</span>
              <span>2 x $10.00</span>
            </li>
            <li>
              <span>Placeholder Item 2</span>
              <span>1 x $15.00</span>
            </li>
          </ul>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default POS;
