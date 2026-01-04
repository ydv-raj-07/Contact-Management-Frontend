import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Contacts from "./Contacts";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [mode, setMode] = useState("login"); // login | register

  // 1️⃣ Agar user logged in hai
  if (loggedIn) {
    return <Contacts />;
  }

  // 2️⃣ Agar user logged in nahi hai
  return mode === "login" ? (
    <Login
      onLogin={() => setLoggedIn(true)}
      goToRegister={() => setMode("register")}
    />
  ) : (
    <Register
      onRegisterSuccess={() => setLoggedIn(true)}
    />
  );
}

export default App;
