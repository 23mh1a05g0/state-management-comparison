import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartSidebar() {
  const { state } = useContext(CartContext);

  return (
    <aside className="sidebar">
      <h3>Cart Items</h3>

      {state.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        state.items.map((item, index) => (
          <div
            key={index}
            className="cart-item"
          >
            <h4>{item.name}</h4>

            <p>₹{item.price}</p>

            <p>
              Quantity: {item.quantity}
            </p>
          </div>
        ))
      )}

      <hr />

      <h4>
        Total Items: {state.items.length}
      </h4>
    </aside>
  );
}

export default CartSidebar;