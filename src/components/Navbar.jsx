import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#1e3a8a",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      {/* Brand */}
      <h1
        style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/customer")}
      >
        ShopIn
      </h1>

      {/* Profile Dropdown */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Profile
        </button>

        {open && (
          <div style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            background: "#fff",
            color: "#000",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            minWidth: "120px",
          }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "transparent",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
