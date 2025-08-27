import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    rating: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    rating: 0,
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin || !admin.id) navigate("/admin-login");
    else setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;
    fetchProducts();
  }, [authChecked]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: product.rating,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      setAddFormData({ name: "", description: "", price: "", image: "", rating: 0 });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const res = await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  if (!authChecked) return null;

  // common input style
  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  };

  const buttonHover = {
    backgroundColor: "#1e40af",
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", position: "relative" }}>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2 style={{ textAlign: "center", color: "#1e3a8a", marginBottom: "20px" }}>
          Admin Dashboard
        </h2>

        {/* Add Product Form */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          
        <form
          onSubmit={handleAddSubmit}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "40px",
            width: "400px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            justifyContent: "center"
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#1e3a8a" }}>Add New Product</h3>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={addFormData.name}
            onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Description"
            value={addFormData.description}
            onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="number"
            placeholder="Price"
            value={addFormData.price}
            onChange={(e) => setAddFormData({ ...addFormData, price: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Image URL"
            value={addFormData.image}
            onChange={(e) => setAddFormData({ ...addFormData, image: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="number"
            placeholder="Rating "
            value={addFormData.rating}
            onChange={(e) => setAddFormData({ ...addFormData, rating: e.target.value })}
            min="0"
            max="5"
            required
          />
          <button
            type="submit"
            style={{ ...buttonStyle }}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Add Product
          </button>
        </form>
         </div>

        {/* Product List */}
        <h3 style={{ marginBottom: "20px", color: "#1e3a8a" }}>Available Products</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal Edit Form */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleEditSubmit}
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "8px",
              width: "450px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#1e3a8a" }}>Edit Product</h3>
            <input
              style={inputStyle}
              type="text"
              placeholder="Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              required
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Description"
              value={editFormData.description}
              onChange={(e) =>
                setEditFormData({ ...editFormData, description: e.target.value })
              }
              required
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Price"
              value={editFormData.price}
              onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
              required
            />
            <input
              style={inputStyle}
              type="text"
              placeholder="Image URL/Base64"
              value={editFormData.image}
              onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
              required
            />
            <input
              style={inputStyle}
              type="number"
              placeholder="Rating (0-5)"
              value={editFormData.rating}
              onChange={(e) => setEditFormData({ ...editFormData, rating: e.target.value })}
              min="0"
              max="5"
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Update
              </button>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: "#f87171",
                  fontWeight: "600",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f87171")}
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
