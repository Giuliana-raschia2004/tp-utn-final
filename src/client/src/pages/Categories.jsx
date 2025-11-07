import { useEffect, useState } from "react";
import "./Categories.css";
import ProductCard from "../components/ProductCard";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para CRUD de categorías
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  // Estados para CRUD de productos
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("http://localhost:4000/api/categories"),
        fetch("http://localhost:4000/api/products"),
      ]);
      const catData = await catRes.json();
      const prodData = await prodRes.json();

      setCategories(catData.categories || []);
      setProducts(prodData || []);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar datos: " + err.message);
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const getProductsByCategory = (categoryId) =>
    products.filter((p) => p.category?._id === categoryId);

  // ----- CRUD Categorías -----
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return alert("Ingrese un nombre de categoría");
    try {
      const res = await fetch("http://localhost:4000/api/categories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!res.ok) throw new Error("Error al crear la categoría");
      setNewCategoryName("");
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editCategoryName.trim()) return alert("Ingrese un nuevo nombre");
    try {
      const res = await fetch(`http://localhost:4000/api/categories/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCategoryName }),
      });
      if (!res.ok) throw new Error("Error al actualizar la categoría");
      setEditCategoryId(null);
      setEditCategoryName("");
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta categoría?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/categories/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar la categoría");
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // ----- CRUD Productos -----
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/products/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (id) => {
    if (!editProductData.name.trim()) return alert("Ingrese un nombre de producto");
    try {
      const res = await fetch(`http://localhost:4000/api/products/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProductData),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Error al actualizar producto");

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...editProductData } : p))
      );
      setEditingProductId(null);
      setEditProductData({ name: "", price: "", description: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h2>Categorías</h2>
        <div className="create-category">
          <input
            type="text"
            placeholder="Nueva categoría..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className="add-btn" onClick={handleCreateCategory}>
            +
          </button>
        </div>
      </div>

      <div className="categories-container">
        {categories.map((cat) => (
          <div key={cat._id} className="category-item">
            {editCategoryId === cat._id ? (
              <>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="Nuevo nombre"
                />
                <button className="save-btn" onClick={() => handleUpdateCategory(cat._id)}>
                  💾
                </button>
                <button className="cancel-btn" onClick={() => setEditCategoryId(null)}>
                  ❌
                </button>
              </>
            ) : (
              <>
                <button
                  className={`category-button ${
                    selectedCategory === cat._id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat._id)}
                >
                  {cat.name}
                </button>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditCategoryId(cat._id);
                      setEditCategoryName(cat.name);
                    }}
                  >
                    ✏️
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteCategory(cat._id)}>
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="products-container">
          {getProductsByCategory(selectedCategory).length > 0 ? (
            getProductsByCategory(selectedCategory).map((prod) => (
              <div key={prod._id}>
                {editingProductId === prod._id ? (
                  <div className="product-card edit-inline">
                    <input
                      type="text"
                      name="name"
                      value={editProductData.name}
                      onChange={handleEditProductChange}
                    />
                    <input
                      type="number"
                      name="price"
                      value={editProductData.price}
                      onChange={handleEditProductChange}
                    />
                    <textarea
                      name="description"
                      value={editProductData.description}
                      onChange={handleEditProductChange}
                    />
                    <button onClick={() => handleUpdateProduct(prod._id)}>💾</button>
                    <button onClick={() => setEditingProductId(null)}>❌</button>
                  </div>
                ) : (
                  <ProductCard
                    product={prod}
                    onEdit={() => {
                      setEditingProductId(prod._id);
                      setEditProductData({
                        name: prod.name,
                        price: prod.price,
                        description: prod.description,
                      });
                    }}
                    onDelete={() => handleDeleteProduct(prod._id)}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="no-products">No hay productos en esta categoría</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;


