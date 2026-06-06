import { useSelector } from "react-redux";
import useRenderCount from "../../hooks/useRenderCount";

function Header() {
  const user = useSelector(
    (state) => state.user
  );

  const cartCount = useSelector(
    (state) =>
      state.cart.items.length
  );

  const renderCount =
    useRenderCount();

  return (
    <header className="header">
      <h2>🛒 Shopping Cart</h2>

      <p>
        User: {user.name}
      </p>

      <p>
        Items: {cartCount}
      </p>

      <small data-testid="render-count">
        Render Count: {renderCount}
      </small>
    </header>
  );
}

export default Header;