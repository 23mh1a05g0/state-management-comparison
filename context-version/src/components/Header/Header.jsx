import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

function Header() {
  const { state: userState } =
    useContext(UserContext);

  const { state: cartState } =
    useContext(CartContext);

  return (
    <header className="header">
      <h2>Shopping Cart</h2>

      <p>
        User: {userState.name}
      </p>

      <p>
        Items: {cartState.items.length}
      </p>
    </header>
  );
}

export default Header;