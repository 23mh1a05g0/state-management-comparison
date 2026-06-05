import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import useRenderCount from "../../hooks/useRenderCount";

function ProductListPage() {
  const renderCount = useRenderCount();

  return (
    <>
      <h3>
        Products
      </h3>

      <small data-testid="render-count">
        Render Count: {renderCount}
      </small>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}

export default ProductListPage;