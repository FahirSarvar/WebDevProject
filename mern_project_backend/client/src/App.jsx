import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Tasks from "./tasks.jsx";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";
import { getAuth, clearAuth } from "./auth.js";
import { signout } from "./api.js";

function Menu() {
  const navigate = useNavigate();
  useLocation(); // makes the menu refresh when the page changes
  const auth = getAuth();

  return (
    <nav>
      <Link to="/">Tasks</Link>{" | "}
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
      <h1>WebStars Task Management System</h1>
      <Menu />
      <hr />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
