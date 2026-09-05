import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

    setCartItems((currentItems) => {

      const existingProduct = currentItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {

        return currentItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1
        }
      ];

    });
  };


  const removeFromCart = (id) => {

    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== id)
    );

  };


  const increaseQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  };


  const decreaseQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  };

  const clearCart = () => {
    setCartItems([]);
  };


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;