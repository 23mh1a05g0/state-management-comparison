import useRenderCount from "../../hooks/useRenderCount";

function CartItem({ item }) {
  const renderCount =
    useRenderCount();

  return (
    <div className="cart-item">
      <h4>{item.name}</h4>

      <p>₹{item.price}</p>

      <p>
        Quantity:
        {" "}
        {item.quantity}
      </p>

      <small data-testid="render-count">
        Render Count:
        {" "}
        {renderCount}
      </small>
    </div>
  );
}

export default CartItem;