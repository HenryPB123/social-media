import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
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
    e.preventDefault(); //!pendeinte

    if (
      inputs.username.length === 0 ||
      inputs.email.length === 0 ||
      inputs.name.length === 0 ||
      inputs.password.length === 0
    ) {
      setNotification("You need fill all the fields");
    } else {
      try {
        // if (response.data === "User has been created!") {
        //   console.log("target", e.target.username);
        // }

        const response = await axios.post(
          `http://localhost:8800/api/auth/register`,
          inputs
        );

        setNotification(response.data);
        setInputs({
          username: "",
          email: "",
          name: "",
          password: "",
        });
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        setNotification(error.response.data);
      }
    }
  };
  // console.log("response", response);

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
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
            />
            {notification && <h4>{notification}</h4>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
