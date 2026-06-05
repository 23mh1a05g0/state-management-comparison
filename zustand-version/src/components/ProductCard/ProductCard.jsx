import useRenderCount from "../../hooks/useRenderCount";
import useAppStore from "../../store/useAppStore";

function ProductCard({ product }) {
  const addToCart =
    useAppStore(
      (state) => state.addToCart
    );

  const renderCount =
    useRenderCount();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button
        onClick={() =>
          addToCart(product)
        }
      >
        Add To Cart
      </button>

      <small data-testid="render-count">
        Render Count:
        {" "}
        {renderCount}
      </small>
    </div>
  );
}

export default ProductCard;