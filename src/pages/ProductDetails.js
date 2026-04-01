import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          gap: "30px",
          maxWidth: "900px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "10px" }}
        />
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h2 style={{ marginBottom: "15px" }}>{product.title}</h2>
          <p style={{ marginBottom: "20px", lineHeight: 1.5 }}>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "20px", color: "#1a73e8" }}>${product.price}</p>

          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <label style={{ marginRight: "10px" }}>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "60px", padding: "5px" }}
            />
          </div>

          <button
            onClick={() => {
              addToCart({ ...product, quantity });
              alert(`${product.title} added to cart`);
            }}
            style={{
              padding: "12px 20px",
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
      </div>
    </div>
  );
}