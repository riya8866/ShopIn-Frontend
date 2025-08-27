import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();

      // Automatically log in the registered user
      localStorage.setItem("user", JSON.stringify({
        role: "CUSTOMER",
        userId: data.id,
        email: data.email,
      }));

      alert("Registration successful!");
      navigate("/customer"); // redirect directly to customer portal
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#f9fafb" }}>
      <div style={{ background:"#fff", padding:"40px", borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)", width:"400px" }}>
        <h2 style={{ marginBottom:"20px", color:"#1e3a8a", textAlign:"center" }}>Register</h2>
        <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          
         <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  required
  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} style={{ padding:"10px", borderRadius:"6px", border:"1px solid #ccc" }} />
          <button type="submit" disabled={loading} style={{ padding:"12px", background: loading ? "#9ca3af" : "#3b82f6", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" }}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
