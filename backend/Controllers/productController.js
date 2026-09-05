const Product = require("../Models/products");

// get with Search, Filter & Sort
const getProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;
        let query = {};

        // Search by product name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter by category (if passed)
        if (category && category !== "all") {
            query.category = { $regex: new RegExp(`^${category}$`, "i") };
        }

        // Sorting options
        let sortOptions = {};
        if (sort === "price-low") sortOptions.price = 1;
        else if (sort === "price-high") sortOptions.price = -1;
        else if (sort === "name-asc") sortOptions.name = 1;

        const products = await Product.find(query).sort(sortOptions);
        res.json(products);
    } catch (error) {
        res.json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};

// get a single product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.json({
            message: "Failed to fetch product",
            error: error.message
        });
    }
};

// create
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.json({
            message: "Failed to create product",
            error: error.message
        });
    }
};

// update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};

// delete a product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};