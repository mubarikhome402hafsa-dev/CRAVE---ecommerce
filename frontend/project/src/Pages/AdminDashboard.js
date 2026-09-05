import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for tabs and data
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form & Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "cakes",
    image: ""
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const orderRes = await fetch("http://localhost:5000/api/orders", {
          headers: { "Authorization": `Bearer ${user.token}` }
        });
        if (orderRes.ok) setOrders(await orderRes.json());

        const productRes = await fetch("http://localhost:5000/api/products");
        if (productRes.ok) setProducts(await productRes.json());
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  // Order Delivery Handler
  const handleDeliver = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      if (response.ok) {
        setOrders(orders.map((order) => order._id === orderId ? { ...order, isDelivered: true } : order));
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Open modal for Creating a new product
  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setFormData({ name: "", description: "", price: "", category: "cakes", image: "" });
    setShowModal(true);
  };

  // Open modal for Editing an existing product
  const handleOpenEditModal = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "cakes",
      image: product.image || ""
    });
    setShowModal(true);
  };

  // Delete Product Handler
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${user.token}` }
        });
        if (response.ok) {
          setProducts(products.filter((p) => p._id !== productId));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle Form Submit (Create or Update)
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const url = editingProductId
      ? `http://localhost:5000/api/products/${editingProductId}`
      : "http://localhost:5000/api/products";
    const method = editingProductId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ ...formData, price: Number(formData.price) })
      });

      if (response.ok) {
        const savedProduct = await response.json();
        if (editingProductId) {
          setProducts(products.map((p) => (p._id === editingProductId ? savedProduct : p)));
        } else {
          setProducts([...products, savedProduct]);
        }
        setShowModal(false);
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold" style={{ color: "#2C1D11" }}>Admin Dashboard</h2>
      </div>

      {/* TABS */}
      <ul className="nav nav-pills justify-content-center mb-4">
        <li className="nav-item me-2">
          <button 
            className={`nav-link fw-bold ${activeTab === "orders" ? "active" : "text-dark bg-light"}`}
            style={activeTab === "orders" ? { backgroundColor: "#B89B72" } : {}}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link fw-bold ${activeTab === "products" ? "active" : "text-dark bg-light"}`}
            style={activeTab === "products" ? { backgroundColor: "#B89B72" } : {}}
            onClick={() => setActiveTab("products")}
          >
            Manage Products
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "#B89B72" }} role="status"></div>
        </div>
      ) : (
        <>
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 text-muted small">ORDER ID</th>
                    <th className="py-3 text-muted small">CUSTOMER</th>
                    <th className="py-3 text-muted small">TOTAL</th>
                    <th className="py-3 text-muted small">STATUS</th>
                    <th className="py-3 text-muted small text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="fw-bold">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                      <td>{order.user ? order.user.name : "Unknown"}</td>
                      <td>Rs. {order.totalPrice.toLocaleString()}.00</td>
                      <td>
                        <span className={`badge ${order.isDelivered ? 'bg-success' : 'bg-warning text-dark'} px-2 py-1 rounded-pill`}>
                          {order.isDelivered ? "Delivered" : "Processing"}
                        </span>
                      </td>
                      <td className="text-center">
                        {!order.isDelivered ? (
                          <button 
                            className="btn btn-sm text-white fw-bold px-3" 
                            style={{ backgroundColor: "#2C1D11" }}
                            onClick={() => handleDeliver(order._id)}
                          >
                            Deliver
                          </button>
                        ) : (
                          <button className="btn btn-sm btn-outline-secondary px-3" disabled>Completed</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="shadow-sm rounded bg-white">
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="fw-bold mb-0" style={{ color: "#2C1D11" }}>Product Catalog</h5>
                <button 
                  className="btn text-white fw-bold" 
                  style={{ backgroundColor: "#2C1D11" }}
                  onClick={handleOpenCreateModal}
                >
                  + Add New Product
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 text-muted small">IMAGE FILENAME</th>
                      <th className="py-3 text-muted small">NAME</th>
                      <th className="py-3 text-muted small">CATEGORY</th>
                      <th className="py-3 text-muted small">PRICE</th>
                      <th className="py-3 text-muted small text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td><small className="text-muted">{product.image}</small></td>
                        <td className="fw-bold">{product.name}</td>
                        <td className="text-capitalize">{product.category}</td>
                        <td>Rs. {product.price?.toLocaleString()}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-dark me-2"
                            onClick={() => handleOpenEditModal(product)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" style={{ color: "#2C1D11" }}>
                  {editingProductId ? "Edit Product" : "Add New Product"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitProduct}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Product Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="2" 
                      required 
                      value={formData.description} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">Price (Rs.)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required 
                        value={formData.price} 
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold">Category</label>
                      <select 
                        className="form-select text-capitalize" 
                        value={formData.category} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="cakes">Cakes</option>
                        <option value="cookies">Cookies</option>
                        <option value="shakes">Shakes</option>
                        <option value="refreshers">Refreshers</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Image Filename</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. nutella.jpg" 
                      required 
                      value={formData.image} 
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn text-white fw-bold" style={{ backgroundColor: "#2C1D11" }}>
                    {editingProductId ? "Save Changes" : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;