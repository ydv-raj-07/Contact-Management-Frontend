import { useState } from "react";
import API from "./api";

export default function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // token save
      localStorage.setItem("token", res.data.data.token);

      // parent ko batao ki login ho gaya
      onLogin();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {/* REGISTER LINK */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <div
          style={{
            height: "1px",
            background: "#374151",
            marginBottom: "12px",
            opacity: 0.5,
          }}
        />

        <p style={{ fontSize: "14px", color: "#9ca3af" }}>
          Don’t have an account?{" "}
          <span
            style={{
              color: "#6366f1",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={goToRegister}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
