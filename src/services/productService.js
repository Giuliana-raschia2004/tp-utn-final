import Product from '../models/productModel.js'

export const createProductService = async (data) => {
    const productName = data.productName

    const exists = await Product.findOne({ name: productName })
    if(exists){
        const error = (`There is already a product with the name ${productName} and it must be unique`)
        error.statusCode = 409
        throw error
    }

    // Creo el nuevo producto (ya con la categoría que viene del front)
    const newProduct = new Product({
        name: productName,         
        price: data.price,
        description: data.description,
        highlighted: data.highlighted || false,
        status: data.status,
        category: data.category    //el ObjectId de la categoría elegida
    })

    const productSaved = await newProduct.save()

    const populatedProduct = await productSaved.populate("category", "name")

    return { productSaved: populatedProduct }
}

export const getProductsService = async () => {
  return await Product.find().populate("category", "name")
};

export const updateProductService = async (productId, data) => {
    const exist = await Product.findById(productId)
    if(!exist){
        const error = new Error(`Product with id ${productId} doesn't exist`)
        error.statusCode = 400
        throw error
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true }).populate("category", "name")
    return { updatedProduct }
}

export const deleteProductService = async (productId) => {
    const exist = await Product.findById(productId)
    if(!exist){
        const error = new Error(`Product with id ${productId} doesn't exist`)
        error.statusCode = 400
        throw error
    }

    await Product.deleteOne({ _id: productId })
    return { message: "Product deleted successfully" }
}