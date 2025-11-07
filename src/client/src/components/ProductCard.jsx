import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  if (!product) return null; 

  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} className="product-img" />
      )}
      <h3>{product.name}</h3>
      <p className="category">{product.category?.name || "Sin categoría"}</p>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>

      <div className="product-actions">
        <button className="edit-btn" onClick={onEdit}>
          ✏️ Editar
        </button>
        <button className="delete-btn" onClick={onDelete}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

