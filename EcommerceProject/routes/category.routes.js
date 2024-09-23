/**
 * POST localhost:8888/ecomm/api/v1/categories
 */

category_controller= require("../controllers/cateogory.controller")
auth_mw = require("../middlewares/auth.mw")
module.exports =(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.createNewCategory)
 // Fetch all categories
    app.get("/ecomm/api/v1/categories", category_controller.getAllCategories);
// Fetch a specific category by ID
    app.get("/ecomm/api/v1/categories/:id", category_controller.getCategoryById);
// Update a category by ID
app.put("/ecomm/api/v1/categories/:id", category_controller.updateCategory);

// Delete a category by ID
app.delete("/ecomm/api/v1/categories/:id", category_controller.deleteCategory);

}

