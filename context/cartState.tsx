import { createContext, ReactNode, useState } from 'react';

type CartContext = {
  cartOpen: boolean;
  openCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
};

export const LocalStateContext = createContext<CartContext>(null);
const LocalStateProvider = LocalStateContext.Provider;

export default function CartStateProvider({ children }: { children: ReactNode }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}
