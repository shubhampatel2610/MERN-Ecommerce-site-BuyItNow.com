import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItems = localStorage.getItem("cartItems");
    if (existingCartItems) {
      setCart(JSON.parse(existingCartItems));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const UseCart = () => useContext(CartContext);

export { UseCart, CartProvider };
