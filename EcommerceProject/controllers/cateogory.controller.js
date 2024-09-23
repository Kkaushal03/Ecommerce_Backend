/**
 * controller for creating a category
 * POST localhost:8888/ecomm/api/v1/categories
 *    {
         "name":"Household",
         "description": "This will have all the household name"
           }
 */
//I)  Create a new Category
const category_model = require("../models/category.model")

  exports.createNewCategory = async(req,res)=>{
    //Read the req body

    //create the category object
    const cat_data = {
        name:req.body.name,
        description: req.body.description
    }
    try{
    //Insert into Mongodb
  const category= await category_model.create(cat_data)
  return res.status(201).send(category)
}
  catch(err){
    console.log("Error while creating the category ",err)
    res.status(500).send({
        message:"Error while creating the category"
    })
  }
}

//II) fetch all the categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await category_model.find();
        return res.status(200).send(categories);
    } catch (err) {
        console.log("Error while fetching the categories", err);
        res.status(500).send({
            message: "Error while fetching the categories"
        });
    }
};
// 2b. Fetch a specific category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await category_model.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(200).send(category);
    } catch (err) {
        console.log("Error while fetching the category", err);
        res.status(500).send({
            message: "Error while fetching the category"
        });
    }
};
// 3. Update a category by ID
exports.updateCategory = async (req, res) => {
    const updatedData = {
        name: req.body.name,
        description: req.body.description
    };
    try {
        const category = await category_model.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(200).send(category);
    } catch (err) {
        console.log("Error while updating the category", err);
        res.status(500).send({
            message: "Error while updating the category"
        });
    }
};
// 4. Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await category_model.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }
        return res.status(200).send({
            message: "Category deleted successfully"
        });
    } catch (err) {
        console.log("Error while deleting the category", err);
        res.status(500).send({
            message: "Error while deleting the category"
        });
    }
};