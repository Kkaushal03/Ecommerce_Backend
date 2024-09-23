const product_model = require("../models/product.model")

//1. Create a product
exports.createProduct = async (req, res) => {
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId, // Assuming category already exists
        availableItems: req.body.availableItems
    };

    try {
        const product = await product_model.create(productData);
        return res.status(201).send(product);
    } catch (err) {
        console.log("Error while creating the product", err);
        res.status(500).send({
            message: "Error while creating the product"
        });
    }
};
// 2. Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await product_model.find().populate("categoryId"); // Populate category details
        return res.status(200).send(products);
    } catch (err) {
        console.log("Error while fetching products", err);
        res.status(500).send({
            message: "Error while fetching products"
        });
    }
};
// 2b. Fetch a specific product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await product_model.findById(req.params.id).populate("categoryId");
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send(product);
    } catch (err) {
        console.log("Error while fetching the product", err);
        res.status(500).send({
            message: "Error while fetching the product"
        });
    }
};
// 3. Update a product by ID
exports.updateProduct = async (req, res) => {
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        availableItems: req.body.availableItems
    };

    try {
        const product = await product_model.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send(product);
    } catch (err) {
        console.log("Error while updating the product", err);
        res.status(500).send({
            message: "Error while updating the product"
        });
    }
};
// 4. Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await product_model.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        return res.status(200).send({
            message: "Product deleted successfully"
        });
    } catch (err) {
        console.log("Error while deleting the product", err);
        res.status(500).send({
            message: "Error while deleting the product"
        });
    }
};
