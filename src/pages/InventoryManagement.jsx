import React, { useEffect, useState } from "react";
import "../styles/InventoryManagement.css";
import CustomAlert from "../components/CustomAlert";


function InventoryManagement() {
  // State to hold the fetched items
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isMultiDelete, setIsMultiDelete] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    
    name: "",
    purchase_price: "",
    retail_price: "",
    stock: "",
  });
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    purchase_price: "",
    retail_price: "",
    stock: "",
  });

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = async (closeForm = false) => {
    try {
      const formDataSerialized = new URLSearchParams(formData).toString();
  
      const response = await fetch("https://decryptic.online/php2/addItem.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataSerialized,
      });
  
      if (response.ok) {
        const newItem = await response.json();
        setItems((prevItems) => [...prevItems, newItem]); // Add the new item directly to the state
  
        console.log("Item added successfully:", newItem);
  
        // Clear the form fields
        setFormData({
          name: "",
          purchase_price: "",
          retail_price: "",
          stock: "",
        });
  
        // Optionally close the form
        if (closeForm) {
          setShowForm(false);
        }
      } else {
        console.error("Failed to add item. Response:", response);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  // Handle edit button click
  const handleEdit = (item) => {
    setEditFormData(item);
    setEditFormVisible(true);
  };

  // Handle form input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle form submission
  const handleEditSubmit = async () => {
    try {
      const response = await fetch("https://decryptic.online/php2/editItem.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        setEditFormVisible(false);
      } else {
        console.error("Failed to update item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Close edit form
  const closeEditForm = () => {
    setEditFormVisible(false);
  };

  
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    if (isMultiDelete) {
      // Multi-delete logic
      try {
        const response = await fetch("https://decryptic.online/php2/deleteItems.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedItems }),
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setItems((prevItems) => prevItems.filter((item) => !selectedItems.includes(item.id)));
            setSelectedItems([]); // Clear selected items after deletion
          }
        }
      } catch (error) {
        console.error("Error deleting items:", error);
      }
    } else {
      // Single delete logic (existing)
      try {
        const response = await fetch("https://decryptic.online/php2/deleteItem.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: deleteId }),
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
          }
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  
    setShowAlert(false); // Hide alert
    setDeleteId(null); // Reset single delete ID
    setIsMultiDelete(false); // Reset multi-delete flag
  };
  
  // Updated cancelDelete
  const cancelDelete = () => {
    setShowAlert(false); // Hide alert
    setDeleteId(null); // Reset single delete ID
    setIsMultiDelete(false); // Reset multi-delete flag
  };


  // Handle individual checkbox change
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };
  
  // Handle "Select All" checkbox change
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allItemIds = items.map((item) => item.id);
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
  };
  
  
  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      setIsMultiDelete(true); // Mark this as a multi-delete operation
      setShowAlert(true); // Show the alert
    } else {
      console.warn("No items selected for deletion.");
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };


  return (
    <div className="inventory-management">
      <h1 className="inventory-title">Inventory Management</h1>
      <div className="inventory-table1">
      </div>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
            <th>
        <input className="checkmark"
          type="checkbox"
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      </th>
             
              <th>Item Name</th>
              <th>Purchase Price</th>
              <th>Stock</th>
              <th>Retail Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
                    <tr key={item.id}>
                    <td>
                      <input 
                      className="checkmark"
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                      />
                    </td>
                <td>{item.name}</td>
                <td>{item.purchase_price}SR</td>
                <td>{item.stock}</td>
                <td>{item.retail_price}SR</td>
                <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAlert && (
        <CustomAlert
          message="Are you sure you want to delete this item?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      </div>
      
      <button className="add-item-btn" onClick={() => setShowForm(true)}>
        Add New Item
      </button>
      <button
  className="delete-selected-btn"
  onClick={handleDeleteSelected}
  disabled={selectedItems.length === 0} // Disable if no items selected
>
  Delete Selected
</button>

      {showForm && (
          <div
          className="overlay"
          onClick={(e) => {
            // Close the form if the user clicks outside the form container
            if (e.target.classList.contains("overlay")) {
              setShowForm(false);
              setFormData({ name: "", purchase_price: "", retail_price: "", stock: "" });

            }
          }}
        >
          
<div className="form-container">
  <button className="close-btn"     onClick={() => {
      setFormData({ name: "", purchase_price: "", retail_price: "", stock: "" });
      setShowForm(false);
    }}
  >
    X
  </button>
  <h2>Add New Item</h2>
  <form>
    <div className="form-group">
      <label htmlFor="name">Item Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="purchase_price">Purchase Price</label>
      <input
        type="number"
        id="purchase_price"
        name="purchase_price"
        value={formData.purchase_price}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="retail_price">Retail Price</label>
      <input
        type="number"
        id="retail_price"
        name="retail_price"
        value={formData.retail_price}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="stock">Stock</label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-actions">
      <button
        type="button"
        onClick={() => handleAddItem(true)}
        className="add-close-btn"
        disabled={!isFormValid()} // Disable the button if form is invalid
      >
        Add Item and Close
      </button>
      <button
        type="button"
        onClick={() => handleAddItem(false)}
        className="add-btn"
        disabled={!isFormValid()} // Disable the button if form is invalid
      >
        Add Item and Don’t Close
      </button>
    </div>
  </form>
</div>
        </div>
      )}

{editFormVisible && (
        <div className="overlay" onClick={closeEditForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeEditForm}>
              X
            </button>
            <h2>Edit Item</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchase_price">Purchase Price</label>
                <input
                  type="number"
                  id="purchase_price"
                  name="purchase_price"
                  value={editFormData.purchase_price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="retail_price">Retail Price</label>
                <input
                  type="number"
                  id="retail_price"
                  name="retail_price"
                  value={editFormData.retail_price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={editFormData.stock}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleEditSubmit} className="save-btn">
                  Save Changes
                </button>
                <button type="button" onClick={closeEditForm} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




    </div>
  );
}

export default InventoryManagement;
