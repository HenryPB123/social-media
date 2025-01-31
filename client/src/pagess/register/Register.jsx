import { Link, useNavigate } from "react-router-dom";
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

  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    const areFieldsEmpty = Object.values(inputs).some(
      (input) => input.length === 0
    );
    if (areFieldsEmpty) {
      setNotification("You need to fill all the fields.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8800/api/auth/register`,
        inputs
      );
      console.log("DATATATA", response.data);

      setNotification(response.data);
      setInputs({
        username: "",
        email: "",
        password: "",
        name: "",
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setNotification(error.response.data);
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
          <Link to="/">
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
              value={inputs.username}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
            />{" "}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
            />
            <button onClick={handleRegister}>Register</button>
          </form>
          {notification && <h4>{notification}</h4>}
        </div>
      </div>
    </div>
  );
};

export default Register;
