const product_controller = require("../controllers/product.controller")
const { validateProductData, verifyToken, isAdmin } = require("../middlewares/auth.mw");
module.exports = (app) => {
    // Create a new product
    app.post("/ecomm/api/v1/products", [verifyToken, isAdmin, validateProductData],product_controller.createProduct);

    // Fetch all products
    app.get("/ecomm/api/v1/products", product_controller.getAllProducts);

    // Fetch a specific product by ID
    app.get("/ecomm/api/v1/products/:id", product_controller.getProductById);

    // Update a product by ID
    app.put("/ecomm/api/v1/products/:id", [verifyToken, isAdmin, validateProductData],product_controller.updateProduct);

    // Delete a product by ID
    app.delete("/ecomm/api/v1/products/:id", [verifyToken, isAdmin, validateProductData],product_controller.deleteProduct);
};
