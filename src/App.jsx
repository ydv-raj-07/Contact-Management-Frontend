import { useState } from "react";
import Login from "./Login";
import Contacts from "./Contacts";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return loggedIn ? (
    <Contacts />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
