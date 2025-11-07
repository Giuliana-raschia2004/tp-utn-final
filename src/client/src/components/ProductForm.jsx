import { useEffect, useState } from "react";
import "./ProductForm.css";

export const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    highlighted: false,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  //Traigo las categorías
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar categorías");
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setLoading(false);
      });
  }, []);

  //Manejo cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //Envio el producto al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error al crear producto");
        setMessage("✅ Producto creado correctamente");
        // Reseteo el formulario
        setForm({
          productName: "",
          price: "",
          description: "",
          category: "",
          highlighted: false
        });
      })
      .catch((err) => {
        setMessage("❌ " + err.message);
      });
  };

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <div className="product-form-container">
      <h2>Crear Producto</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="productName"
          placeholder="Nombre del producto"
          value={form.productName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            name="highlighted"
            checked={form.highlighted}
            onChange={handleChange}
          />
          Producto destacado
        </label>

        <button type="submit">Crear producto</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ProductForm;
