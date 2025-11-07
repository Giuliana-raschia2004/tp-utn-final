import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './db.js'
import { productRoute } from "./src/routes/productRoute.js";
import { categoryRoute } from "./src/routes/categoryRoute.js";
import { userRoute } from "./src/routes/userRoute.js";

//Cargo las variables del archivo .env
dotenv.config();

//Creo la app express
const app = express()

//Configuro CORS
app.use(cors({
    origin: '*',
    methods: ["GET","POST","PUT","PATCH","DELETE"]

}))

//Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended:true }))

//Conexión a la bd 
connectDB()

//Conexión de rutas
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
console.log("Rutas registradas:");



//Puerto del servidor
const PORT = process.env.PORT || 4000;

//Levantamos el servidor 
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})

