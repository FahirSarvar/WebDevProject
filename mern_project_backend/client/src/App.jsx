import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Items from "./items.jsx";
import Signup from "./signup.jsx";
import Signin from "./signin.jsx";
import { signout } from "./api.js";
import { getAuth, clearAuth } from "./auth.js";

function Menu() {
  const navigate = useNavigate();
  useLocation(); // makes the menu refresh when the page changes
  const auth = getAuth();

  return (
    <nav>
      <Link to="/">Items</Link>{" | "}
      {!auth && (
        <>
          <Link to="/signup">Sign up</Link>{" | "}
          <Link to="/signin">Sign in</Link>
        </>
      )}
      {auth && (
        <>
          <span>Hi, {auth.user.name} </span>
          <button onClick={() => { signout(); clearAuth(); navigate("/"); }}>Sign out</button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <hr />
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}