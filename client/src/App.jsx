import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pagess/home/Home";
import Login from "./pagess/login/Login";
import Profile from "./pagess/profile/Profile";
import Register from "./pagess/register/Register";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const currentUser = true;

  const { darkMode } = useContext(DarkModeContext);

  console.log(darkMode);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div
          style={{
            display: "flex",
          }}
        >
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>

          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
