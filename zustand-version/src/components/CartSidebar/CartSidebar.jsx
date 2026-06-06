import CartItem from "../CartItem/CartItem";
import useRenderCount from "../../hooks/useRenderCount";
import useAppStore from "../../store/useAppStore";

function CartSidebar() {
  const items =
    useAppStore(
      (state) => state.cart.items
    );

  const renderCount =
    useRenderCount();

  return (
    <aside className="sidebar">
      <h3>🛒 Cart Items</h3>

      <small data-testid="render-count">
        Render Count: {renderCount}
      </small>

      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
          />
        ))
      )}

      <div className="total-box">
        Total Items: {items.length}
      </div>
    </aside>
  );
}

export default CartSidebar;