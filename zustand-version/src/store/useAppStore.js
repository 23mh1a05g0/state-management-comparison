import { create } from "zustand";

const useAppStore = create((set) => ({
  cart: {
    items: [],
    isOpen: true,
  },

  user: {
    name: "Vali",
    isLoggedIn: true,
  },

  ui: {
    theme: "light",
    notification: null,
  },

  addToCart: (product) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: [
          ...state.cart.items,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
      },
    })),
}));

export default useAppStore;