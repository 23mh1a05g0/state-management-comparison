import Header from "./components/Header/Header";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import CartSidebar from "./components/CartSidebar/CartSidebar";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="products-section">
          <ProductListPage />
        </section>

        <CartSidebar />
      </main>
    </div>
  );
}

export default App;