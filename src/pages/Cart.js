import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0)
    return <p style={{ padding: "20px", textAlign: "center" }}>Your cart is empty</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Cart Items</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="cart-item"
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px", marginRight: "20px" }}
          />
          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              padding: "8px 15px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3 style={{ textAlign: "right", marginTop: "20px" }}>
        Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
      </h3>
    </div>
  );
}