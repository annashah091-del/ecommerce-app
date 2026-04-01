import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cartItems } = useContext(CartContext);

  // Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=50")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const categoryObjects = data.map((cat) => {
          // cat may be string or object
          if (typeof cat === "string") {
            return { slug: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) };
          } else {
            return { slug: cat.slug, name: cat.name };
          }
        });
        setCategories(categoryObjects);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Header & Cart Count */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>My Store</h1>
        <Link to="/cart" style={{ fontWeight: "bold", textDecoration: "none" }}>
          Cart ({cartItems.length})
        </Link>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "5px", border: "1px solid #ccc", flex: "1", minWidth: "200px" }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "10px 15px", borderRadius: "5px", border: "1px solid #ccc", minWidth: "150px" }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{product.title}</h3>
                <p style={{ fontWeight: "bold", color: "#1a73e8", marginBottom: "10px" }}>${product.price}</p>
              </div>
            </Link>
            <button
              onClick={() => {
                addToCart({ ...product, quantity: 1 });
                alert(`${product.title} added to cart`);
              }}
              style={{
                margin: "0 15px 15px 15px",
                padding: "10px",
                background: "#1a73e8",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}