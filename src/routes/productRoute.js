import express from 'express'
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productController.js'

export const productRoute = express.Router()

//Crear producto
productRoute.post("/create", createProduct)

// Obtener todos los productos
productRoute.get("/", getProducts);

// Actualizar producto
productRoute.patch("/update/:id", updateProduct)

// Eliminar producto
productRoute.delete("/delete/:id", deleteProduct)