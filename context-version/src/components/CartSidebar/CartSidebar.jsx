import CartSummary from "../CartSummary/CartSummary";

function CartSidebar() {
  return (
    <aside className="sidebar">
      <h3>Cart</h3>

      <CartSummary />
    </aside>
  );
}

export default CartSidebar;