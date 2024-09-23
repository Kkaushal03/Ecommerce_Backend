

const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Add an item to the cart 
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Find the cart by userId
        let cart = await Cart.findOne({ userId });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        if (!cart) {
            // Create a new cart if none exists for the user
            cart = new Cart({
                userId,
                items: [{ productId, quantity }],
                totalPrice: product.price * quantity
            });
        } else {
            // If cart exists, check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            
            if (itemIndex > -1) {
                // Update quantity if product exists
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new product to the cart
                cart.items.push({ productId, quantity });
            }
            // Update total price
            cart.totalPrice += product.price * quantity;
        }

        await cart.save();
        return res.status(201).send(cart);
    } catch (err) {
        console.log("Error adding to cart", err);
        res.status(500).send({ message: "Error adding to cart" });
    }
};

// Get Cart by userId (Read)
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        return res.status(200).send(cart);
    } catch (err) {
        console.log("Error fetching cart", err);
        res.status(500).send({ message: "Error fetching cart" });
    }
};

// Update item quantity in cart (Update)
exports.updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            return res.status(200).send(cart);
        } else {
            return res.status(404).send({ message: "Product not found in cart" });
        }
    } catch (err) {
        console.log("Error updating cart", err);
        res.status(500).send({ message: "Error updating cart" });
    }
};

// Remove item from cart (Delete)
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => !item.productId.equals(productId));

        if (cart.items.length === 0) {
            cart.totalPrice = 0;
        }

        await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        console.log("Error removing from cart", err);
        res.status(500).send({ message: "Error removing from cart" });
    }
};

// Clear the entire cart
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        return res.status(200).send({ message: "Cart cleared" });
    } catch (err) {
        console.log("Error clearing cart", err);
        res.status(500).send({ message: "Error clearing cart" });
    }
};
