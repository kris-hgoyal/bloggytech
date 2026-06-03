const Category = require("../../models/Categories/Category");
const asyncHandler = require("express-async-handler");


// create new category
// route POST /api/v1/categories
// access private (admin only)
exports.createCategory = asyncHandler(async (req, res , next) => {
    const { name } = req.body;
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    // Create new category
    const newCategory = await Category.create({ name:name, author: req?.userAuth?._id });
    res.status(201).json({ 
        status: "success",
        message: "Category created successfully",
        newCategory,
    });
}
);


// get all the category
// route GET /api/v1/categories
// access public
exports.getAllCategories = asyncHandler(async (req, res , next) => {
    const categories = await Category.find({}).populate(
        {
            path:"posts",
            model:"Post",
        }
    );
    res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully",
        categories,
    });
});


// delete single category
// route DELETE /api/v1/categories/:id
// access private (admin only)
exports.deleteCategory = asyncHandler(async (req, res , next) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error("Category not found");
    }
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
    });
});



// update single category
// route PUT /api/v1/categories/:id
// access private (admin only)
exports.updateCategory = asyncHandler(async (req, res , next) => {
    const categoryId = req.params.id;
    const name = req.body.name;
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error("Category not found");
    }
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name : name }, { new: true , runValidators: true });
    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        updatedCategory,
    });
});