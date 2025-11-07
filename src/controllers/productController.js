import { createProductService, getProductsService, updateProductService, deleteProductService } from "../services/productService.js";

export const createProduct = async (req, res) => {
    try {
        const data = req.body
        const result = await createProductService(data)
        res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 409){
            return res.status(409).json({error: error.message})
        }
        return res.status(500).json({message:"Internal several error", error: error.message})
    }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const result = await updateProductService(productId, data);
    return res.status(201).json({ result });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await deleteProductService(productId);
    return res.status(200).json({ result });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};