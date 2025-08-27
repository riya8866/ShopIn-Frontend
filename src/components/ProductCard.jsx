import { FaStar } from "react-icons/fa";

export default function ProductCard({ product, onEdit, onDelete }) {
  const { image, name, description, price, rating } = product;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          marginBottom: "12px",
        }}
      />

      <h3 style={{ margin: "8px 0", fontWeight: "600" }}>{name}</h3>
      <p style={{ marginBottom: "8px", color: "#4b5563" }}>{description}</p>

      <p style={{ color: "#2563eb", fontWeight: "bold" }}>₹{price}</p>

      <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            color={i < rating ? "#fbbf24" : "#d1d5db"}
            style={{ marginRight: "2px" }}
          />
        ))}
        <span style={{ marginLeft: "6px", fontSize: "14px", color: "#374151" }}>
          {rating}/5
        </span>
      </div>

      {/* Admin buttons */}
      {onEdit && onDelete && (
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button
            onClick={() => onEdit(product)}
            style={{
              padding: "6px 12px",
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            style={{
              padding: "6px 12px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
