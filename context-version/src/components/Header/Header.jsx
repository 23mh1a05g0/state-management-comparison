import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import useRenderCount from "../../hooks/useRenderCount";

function Header() {
  const { state: userState } =
    useContext(UserContext);

  const { state: cartState } =
    useContext(CartContext);

  const renderCount =
    useRenderCount();

  return (
    <header className="header">
      <h2>Shopping Cart</h2>

      <p>
        User: {userState.name}
      </p>

      <p>
        Items: {cartState.items.length}
      </p>

      <small data-testid="render-count">
        Render Count: {renderCount}
      </small>
    </header>
  );
}

export default Header;