import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import "../styles/POS.css";
import CustomAlert from "../components/CustomAlert";
function POS() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]); 
  const [mostPickedItems, setMostPickedItems] = useState(
    JSON.parse(Cookies.get("mostPickedItems") || "[]")
  );
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [discountType, setDiscountType] = useState(null); 
  const [discountValue, setDiscountValue] = useState("");
  const dropdownRef = useRef(null);
  const [latestInvoiceId, setLatestInvoiceId] = useState(null);
  const [todaySales, setTodaySales] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [todaysInvoices, setTodaysInvoices] = useState([]);
  const [showInvoices, setShowInvoices] = useState(false);

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const calculateGrandTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const processSale = async () => {
    try {
      // Create invoice
      const invoiceFormData = new FormData();
      invoiceFormData.append("payment_method", paymentMethod);
      invoiceFormData.append("total", grandTotal);
  
      const invoiceResponse = await fetch("https://decryptic.online/php2/addInvoice.php", {
        method: "POST",
        body: invoiceFormData,
      });
  
      if (!invoiceResponse.ok) {
        throw new Error("Failed to create invoice");
      }
  
      const { invoice_id } = await invoiceResponse.json();
  
      // Add invoice items
      const itemsResponse = await fetch("https://decryptic.online/php2/addInvoiceItems.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_id,
          items: checkoutItems,
        }),
      });
  
      if (!itemsResponse.ok) {
        throw new Error("Failed to add invoice items");
      }
  
      printInvoice(invoice_id);
  
      setCheckoutItems([]);
      setGrandTotal(0);
      setPaymentMethod(null);
  
      console.log("Sale processed successfully!");
    } catch (error) {
      console.error("Error processing sale:", error);
      alert("Failed to process sale.");
    }
  };
  

  useEffect(() => {
    const fetchAndValidateMostPickedItems = async () => {
      try {
        const response = await fetch("https://decryptic.online/php2/getItems.php");
        if (!response.ok) {
          throw new Error("Failed to fetch items from the database");
        }
  
        const itemsFromDB = await response.json();
  
        const validItems = mostPickedItems.filter((pickedItem) =>
          itemsFromDB.some((dbItem) => dbItem.id === pickedItem.id)
        );
  
        validItems.sort((a, b) => b.count - a.count);
  
        setMostPickedItems(validItems);
  
        Cookies.set("mostPickedItems", JSON.stringify(validItems), {
          expires: 7,
        });
      } catch (error) {
        console.error("Error fetching or validating most picked items:", error);
      }
    };
  
    fetchAndValidateMostPickedItems();
  }, []); 
  
  

const printInvoice = (latestInvoiceId) => {
 
  window.open(
    `https://decryptic.online/php2/getInvoice.php?invoice_id=${latestInvoiceId}`,
    "_blank",
    "width=380,height=600,scrollbars=yes,resizable=no"
  );
};
const fetchTodaySales = async () => {
  try {
    const response = await fetch("https://decryptic.online/php2/getTodaySales.php");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.total_sales !== undefined) {
      setAlertMessage(`Total Sales Today: $${parseFloat(data.total_sales).toFixed(2)}`);
      setShowAlert(true);
    } else {
      throw new Error("Invalid data format received");
    }
  } catch (error) {
    console.error("Error fetching today's sales:", error.message);
    setAlertMessage("Failed to fetch today's sales. Please try again.");
    setShowAlert(true);
  }
};

const fetchTodayInvoices = async () => {
  try {
    const response = await fetch("https://decryptic.online/php2/getTodayInvoices.php");
    if (!response.ok) {
      throw new Error("Failed to fetch today's invoices");
    }
    const data = await response.json();
    setTodaysInvoices(data);
    setShowInvoices(true);
  } catch (error) {
    console.error("Error fetching today's invoices:", error.message);
    setAlertMessage("Failed to fetch today's invoices. Please try again.");
    setShowAlert(true);
  }
};

  const removeFromCheckout = (id) => {
    const updatedCheckoutItems = checkoutItems.filter((item) => item.id !== id);
    setCheckoutItems(updatedCheckoutItems);
    setGrandTotal(calculateGrandTotal(updatedCheckoutItems));
  };
  useEffect(() => {


    
    const fetchFilteredItems = async () => {
      try {
        const response = await fetch(
          `https://decryptic.online/php2/searchItems.php?query=${searchQuery}`
        );
        const data = await response.json();
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching filtered items:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchFilteredItems();
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery]);

  const fetchInitialItems = async () => {
    try {
      const response = await fetch(
        `https://decryptic.online/php2/getItems.php?limit=20`
      );
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.error("Error fetching initial items:", error);
    }
  };

  const handleDiscountApply = () => {
    let discount = parseFloat(discountValue);
    if (discountType === "percentage") {
      if (discount >= 0 && discount <= 99.99) {
        const discountedTotal = grandTotal - (grandTotal * discount) / 100;
        setGrandTotal(discountedTotal);
      }
    } else if (discountType === "value") {
      if (discount >= 0 && discount <= grandTotal) {
        setGrandTotal(grandTotal - discount);
      }
    }
    setShowDiscountForm(false); 
    setDiscountValue(""); 
  };


  const handleItemSelect = (item) => {
    addToCheckout(item);
    setFilteredItems([]);
    setSearchQuery("");
  };

  const handleCardClick = (item) => {
    addToCheckout(item);
  };

  const addToCheckout = (item) => {
    const existingItem = checkoutItems.find((checkoutItem) => checkoutItem.id === item.id);
  
    let updatedCheckoutItems;
    if (existingItem) {
      updatedCheckoutItems = checkoutItems.map((checkoutItem) =>
        checkoutItem.id === item.id
          ? { ...checkoutItem, quantity: checkoutItem.quantity + 1 }
          : checkoutItem
      );
    } else {
      updatedCheckoutItems = [
        ...checkoutItems,
        { ...item, quantity: 1, price: item.retail_price },
      ];
    }
  
    setCheckoutItems(updatedCheckoutItems);
    setGrandTotal(calculateGrandTotal(updatedCheckoutItems));

   
    const updatedMostPickedItems = [...mostPickedItems];
    const existingIndex = updatedMostPickedItems.findIndex(
      (pickedItem) => pickedItem.id === item.id
    );

    if (existingIndex > -1) {
      updatedMostPickedItems[existingIndex].count += 1;
    } else {
      updatedMostPickedItems.push({ ...item, count: 1 });
    }

    updatedMostPickedItems.sort((a, b) => b.count - a.count);
    setMostPickedItems(updatedMostPickedItems);
    Cookies.set("mostPickedItems", JSON.stringify(updatedMostPickedItems), {
      expires: 7,
    });
  };

  const handleClickOutside = (e) => {

    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredItems([]);
      setSearchQuery("");
    }


  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCheckoutItems = checkoutItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCheckoutItems(updatedCheckoutItems);
    setGrandTotal(calculateGrandTotal(updatedCheckoutItems));
  };

  const handlePaymentAndPrint = async () => {
    await processSale(); 
    
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
                  <th>Action</th> {/* New column for the "X" button */}
                </tr>
              </thead>
              <tbody>
  {checkoutItems.map((item) => (
    <tr key={item.id}>
<td title={item.name}>{item.name}</td>
<td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          min="1"
          className="qty-input"
        />
      </td>
      <td>{item.price}SR</td>
      <td>{(item.quantity * item.price).toFixed(2)}SR</td>
      <td>
        <button
          className="remove-btn"
          onClick={() => removeFromCheckout(item.id)}
        >
          X
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
          <div className="checkout-summary">
            <h2>Grand Total: SR{grandTotal.toFixed(2)}</h2>
            <div className="discount-buttons">
              <button
                onClick={() => {
                  setDiscountType("percentage");
                  setShowDiscountForm(true);
                }}
              >
                Discount %
              </button>
              <button
                onClick={() => {
                  setDiscountType("value");
                  setShowDiscountForm(true);
                }}
              >
                Discount SR
              </button>
            </div>

        {/* Discount Form */}
        {showDiscountForm && (
          <div className="discount-form-overlay" >
            <div className="discount-form">
              <h2>
                Apply {discountType === "percentage" ? "Percentage" : "Value"} Discount
              </h2>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={`Enter ${
                  discountType === "percentage" ? "percentage" : "value"
                }`}
                min="0"
                max={discountType === "percentage" ? "99.99" : grandTotal}
                step="0.01"
              />
              <div className="discount-form-actions">
                <button className="ok-btn" onClick={handleDiscountApply}>
                  OK
                </button>
                <button
                  className="close-btn1"
                  onClick={() => {
                    setShowDiscountForm(false);
                    setDiscountValue("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
          </div>
          <div className="payment-methods">
            <button onClick={() => handlePaymentMethod("cash")}>Cash</button>
            <button onClick={() => handlePaymentMethod("card")}>Card</button>
           
          </div>
        <button
          className={`pay-button ${paymentMethod && checkoutItems.length? "" : "disabled"}`}
          onClick={handlePaymentAndPrint}
  
          disabled={!paymentMethod && checkoutItems.length === 0}
          
        >
          Pay {paymentMethod}
        </button>

        </div>

        {/* Right Product Frame */}
        <div className="product-frame">
          <div className="product-actions">
          <button onClick={fetchTodaySales}>Fetch Today's Sales</button>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onConfirm={() => setShowAlert(false)} 
          onCancel={() => setShowAlert(false)} 
        />
      )}
             <button onClick={fetchTodayInvoices}>Fetch Today's Invoices</button>

{showAlert && (
  <CustomAlert
    message={alertMessage}
    onClose={() => setShowAlert(false)}
  />
)}

{showInvoices && (
  <div className="custom-modal-overlay">  
     
    <div className="custom-modal-content">
      <div className="header">
    <h2>Today's Invoices</h2>
    <button
          className="close-btn2"
          onClick={() => setShowInvoices(false)}
        >
          X
        </button>
 </div>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todaysInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.total}SR</td>
              <td>{invoice.payment_method}</td>
              <td>
                <button onClick={() => printInvoice(invoice.id)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="close-btn3" onClick={() => setShowInvoices(false)}>
        Close
      </button>
    </div>
  </div>
)}

          </div>
          <div className="product-list">
            <div className="search-container">
              <input
                type="text"
                className="product-search"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="dropdown-arrow" onClick={fetchInitialItems}>
                ▼
              </button>
            </div>
            {filteredItems.length > 0 && (
              <div className="search-dropdown" ref={dropdownRef}>
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="dropdown-item"
                    onClick={() => handleItemSelect(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
            <div className="product-grid">
              {mostPickedItems.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => {handleCardClick(item);updateMostPickedItems(item);}}
                >
                  <h3>{item.name}</h3>
                  <p>Price: {item.retail_price}SR</p>
                  <p>Stock: {item.stock}</p>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POS;
