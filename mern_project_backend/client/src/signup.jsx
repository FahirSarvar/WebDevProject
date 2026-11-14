import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./api.js";

export default function Signup() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(values).then((data) => {
      if (data.error) setError(data.error);
      else navigate("/signin");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <input name="name" placeholder="Name" value={values.name} onChange={handleChange} /><br />
      <input name="email" placeholder="Email" value={values.email} onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} /><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}