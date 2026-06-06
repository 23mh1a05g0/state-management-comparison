import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import useRenderCount from "../../hooks/useRenderCount";

function ProductCard({ product }) {
  const { dispatch } =
    useContext(CartContext);

  const renderCount =
    useRenderCount();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">
        <h3>{product.name}</h3>

        <p>₹{product.price}</p>

        <button onClick={addToCart}>
          Add To Cart
        </button>

        <small data-testid="render-count">
          Render Count: {renderCount}
        </small>
      </div>
    </div>
  );
}

export default ProductCard;