import React, { useRef, useEffect } from "react";
import "../styles/CustomAlert.css";

function CustomAlert({ message, onConfirm, onCancel }) {
  const alertRef = useRef(null);

  
  const handleClickOutside = (event) => {
    if (alertRef.current && !alertRef.current.contains(event.target)) {
      onCancel(); 
    }
  };

  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert" ref={alertRef}>
        <p>{message}</p>
        <div className="custom-alert-actions">
          <button onClick={onConfirm} className="confirm-btn">Yes</button>
          <button onClick={onCancel} className="cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
