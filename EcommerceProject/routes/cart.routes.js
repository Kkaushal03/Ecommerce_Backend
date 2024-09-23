// routes/cart.routes.js

const cart_controller = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/auth.mw");

module.exports = (app) => {
    // Add an item to the cart
    app.post("/ecomm/api/v1/cart", verifyToken, cart_controller.addToCart);

    // Get the cart for a user
    app.get("/ecomm/api/v1/cart/:userId", verifyToken, cart_controller.getCart);

    // Update the cart item quantity
    app.put("/ecomm/api/v1/cart", verifyToken, cart_controller.updateCart);

    // Remove an item from the cart
    app.delete("/ecomm/api/v1/cart", verifyToken, cart_controller.removeFromCart);

    // Clear the entire cart
    app.delete("/ecomm/api/v1/cart/clear", verifyToken, cart_controller.clearCart);
};
