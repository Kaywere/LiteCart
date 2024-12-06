import React, { useEffect, useState } from "react";
import "../styles/InventoryManagement.css";

function InventoryManagement() {
  // State to hold the fetched items
  const [items, setItems] = useState([]);

  // Fetch items from the API on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://decryptic.online/php2/getItems.php");
        const data = await response.json();
        setItems(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="inventory-management">
      <h1 className="inventory-title">Inventory Management</h1>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item 2Name</th>
              <th>Purchase Price</th> {/* Added Purchase Price */}
              <th>Stock</th>
              <th>Retail Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render table rows dynamically based on the fetched items */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>  
                <td>{item.name}</td>
                <td>${item.purchase_price}</td> {/* Display Purchase Price */}
                <td>{item.stock}</td>
                <td>${item.retail_price}</td> {/* Display Retail Price */}
               
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="add-item-btn">Add New Item</button>
    </div>
  );
}

export default InventoryManagement;
