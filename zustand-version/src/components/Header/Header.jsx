import useRenderCount from "../../hooks/useRenderCount";
import useAppStore from "../../store/useAppStore";

function Header() {
  const user = useAppStore(
    (state) => state.user
  );

  const cartCount = useAppStore(
    (state) => state.cart.items.length
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