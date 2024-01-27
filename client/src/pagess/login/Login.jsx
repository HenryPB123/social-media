import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/home");

      // const response = await login(inputs);
      // setData(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandaeodio illo molestias necessitatibus veniam explicabo
            minima temporibus nostrum quaerat.
          </p>
          <span>Don't you have an account</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            {error && <h4>{error}</h4>}
            {/*{data && <h4>{data}</h4>}*/}

            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
