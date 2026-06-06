import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import useRenderCount from "../../hooks/useRenderCount";

function CartSidebar() {
  const { state } =
    useContext(CartContext);

  const renderCount =
    useRenderCount();

  return (
    <aside className="sidebar">
      <h3>🛒 Cart Items</h3>

      <small data-testid="render-count">
        Render Count: {renderCount}
      </small>

      {state.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        state.items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
          />
        ))
      )}

      <div className="total-box">
        Total Items: {state.items.length}
      </div>
    </aside>
  );
}

export default CartSidebar;