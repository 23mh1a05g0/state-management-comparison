import { useDispatch }
from "react-redux";

import { addToCart }
from "../../slices/cartSlice";

import useRenderCount
from "../../hooks/useRenderCount";

function ProductCard({
  product,
}) {

  const dispatch =
    useDispatch();

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
          dispatch(
            addToCart(product)
          )
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