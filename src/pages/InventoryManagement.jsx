import React from "react";
import "../styles/InventoryManagement.css";

function InventoryManagement() {
  return (
    <div className="inventory-management">
      <h1 className="inventory-title">Inventory Management</h1>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Placeholder Item</td>
              <td>$10.00</td>
              <td>100</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Placeholder Item 2</td>
              <td>$15.00</td>
              <td>50</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="add-item-btn">Add New Item</button>
    </div>
  );
}

export default InventoryManagement;
