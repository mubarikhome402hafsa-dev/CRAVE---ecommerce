const mongoose = require("mongoose");
const Product = require("./Models/products");

const products = [
    // ==================== CAKES ====================

    {
        name: "Pistachio Cake",
        category: "cake",
        description: "A soft and delicious pistachio cake with a rich nutty flavor.",
        price: 950,
        image: "pistachio-cake.jpg",
        available: true,
        featured: true
    },

    {
        name: "Ferrero Rocher Cake",
        category: "cake",
        description: "A luxurious chocolate cake inspired by the classic Ferrero Rocher.",
        price: 1200,
        image: "ferrero-rocher.jpg",
        available: true,
        featured: true
    },

    {
        name: "All Chocolate Dreamcake",
        category: "cake",
        description: "A rich and indulgent chocolate cake made for true chocolate lovers.",
        price: 1100,
        image: "all-chocolate-dreamcake.jpg",
        available: true,
        featured: true
    },

    {
        name: "Belgian Malt Cake",
        category: "cake",
        description: "A creamy Belgian malt cake with a smooth and delicious chocolate flavor.",
        price: 1150,
        image: "belgian-malt.jpg",
        available: true,
        featured: false
    },

    {
        name: "Nutella Cake",
        category: "cake",
        description: "A soft cake layered with rich and creamy Nutella goodness.",
        price: 1050,
        image: "nutella.jpg",
        available: true,
        featured: false
    },

    {
        name: "Raffaello Cake",
        category: "cake",
        description: "A delicate coconut cake inspired by the classic Raffaello treat.",
        price: 1150,
        image: "raffaello.jpg",
        available: true,
        featured: false
    },


    // ==================== COOKIES ====================

    {
        name: "Midnight Cookie",
        category: "cookie",
        description: "A rich, dark and gooey chocolate cookie perfect for chocolate lovers.",
        price: 350,
        image: "midnight-cookie.png",
        available: true,
        featured: true
    },

    {
        name: "Chocolate Hazelnut Cookie",
        category: "cookie",
        description: "A soft chocolate cookie packed with delicious hazelnut flavor.",
        price: 350,
        image: "chocolate-hazelnut.png",
        available: true,
        featured: true
    },

    {
        name: "Double Chocolate Cookie",
        category: "cookie",
        description: "A decadent double chocolate cookie with a rich chocolate center.",
        price: 350,
        image: "double-chocolate.png",
        available: true,
        featured: true
    },

    {
        name: "Red Velvet Cookie",
        category: "cookie",
        description: "A soft red velvet cookie with a deliciously creamy flavor.",
        price: 350,
        image: "red-velvet.png",
        available: true,
        featured: false
    },

    {
        name: "Classic Chocolate Chip Cookie",
        category: "cookie",
        description: "A classic soft-baked cookie loaded with chocolate chips.",
        price: 300,
        image: "classic-chocolatechip.png",
        available: true,
        featured: false
    },

    {
        name: "Kunafa Cookie",
        category: "cookie",
        description: "A unique cookie combining the rich flavors of chocolate and kunafa.",
        price: 400,
        image: "kunafa-cookie.png",
        available: true,
        featured: false
    },


    // ==================== DRINKS ====================

    {
        name: "Strawberry Watermelon Refresher",
        category: "drink",
        description: "A refreshing blend of sweet strawberry and juicy watermelon.",
        price: 450,
        image: "strawberry-watermelon.jpg",
        available: true,
        featured: true
    },

    {
        name: "Mango Pineapple Refresher",
        category: "drink",
        description: "A tropical and refreshing combination of mango and pineapple.",
        price: 450,
        image: "mango-pineapple-refresher.jpg",
        available: true,
        featured: true
    },

    {
        name: "Kiwi Apple Refresher",
        category: "drink",
        description: "A refreshing fruity drink combining the flavors of kiwi and apple.",
        price: 450,
        image: "kiwi-apple-refresher.jpg",
        available: true,
        featured: false
    },

    {
        name: "Cookies N Cream Shake",
        category: "drink",
        description: "A creamy milkshake loaded with delicious cookies and cream flavor.",
        price: 550,
        image: "cookies-n-cream-shake.jpg",
        available: true,
        featured: true
    },

    {
        name: "Lotus Shake",
        category: "drink",
        description: "A rich and creamy shake blended with the irresistible flavor of Lotus biscuits.",
        price: 550,
        image: "lotus-shake.jpg",
        available: true,
        featured: false
    },

    {
        name: "Strawberry Shake",
        category: "drink",
        description: "A creamy and refreshing strawberry milkshake made with sweet strawberries.",
        price: 500,
        image: "strawberry-shake.jpg",
        available: true,
        featured: false
    }
];


const seedDatabase = async () => {
    try {

        // Connect to MongoDB
        await mongoose.connect("mongodb://127.0.0.1:27017/CRAVE");

        console.log("MongoDB connected successfully");

        // Remove existing products to prevent duplicates
        await Product.deleteMany({});

        console.log("Existing products removed");

        // Insert all products
        await Product.insertMany(products);

        console.log(`${products.length} products inserted successfully`);

        // Close database connection
        await mongoose.connection.close();

        console.log("Database seeding completed successfully");

    } catch (error) {

        console.error("Database seeding failed:", error);

        await mongoose.connection.close();

        process.exit(1);
    }
};


seedDatabase();