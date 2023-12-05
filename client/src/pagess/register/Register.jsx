import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setInputs((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const clean = () => {
    if (data != null) {
      setTimeout(() => {
        setData(null);
      }, 500);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8800/api/auth/register`,
        inputs
      );

      setData(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Pet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandaeodio illo molestias necessitatibus veniam explicabo
            minima temporibus nostrum quaerat.
          </p>
          <span>Do you have an account</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && <h4>{error}</h4>}
            {data && <h4>{data}</h4>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
