import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import Logout from "./pages/Logout.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
}

export default App;
