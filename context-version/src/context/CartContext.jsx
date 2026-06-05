import {
  createContext,
  useReducer,
} from "react";

export const CartContext =
  createContext();

const initialState = {
  items: [],
  isOpen: true,
};

function cartReducer(
  state,
  action
) {
  switch (action.type) {

    case "ADD_TO_CART":

      return {
        ...state,

        items: [
          ...state.items,
          action.payload,
        ],
      };

    default:
      return state;
  }
}

export function CartProvider({
  children,
}) {

  const [state, dispatch] =
    useReducer(
      cartReducer,
      initialState
    );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}