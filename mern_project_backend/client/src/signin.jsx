import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "./api.js";
import { setAuth } from "./auth.js";

export default function Signin() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(values).then((data) => {
      if (data.error) setError(data.error);
      else {
        setAuth(data);
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <input name="email" placeholder="Email" value={values.email} onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} /><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}