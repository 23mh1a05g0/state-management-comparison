import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductListPage() {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductListPage;