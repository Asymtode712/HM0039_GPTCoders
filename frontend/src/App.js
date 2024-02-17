import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import Homepage from "./pages/homepage/homepage";
import LoginPage from "./pages/login/login"
import LoginContext from "./context/context";
import { PrivateRoute } from "./components/router/PrivateRouter";

function App() {
  const { login } = useContext(LoginContext);
  useEffect(() => {
    async function isUser() {
      try {
        const user = await axios.get(
          process.env.REACT_APP_API_LINK + "/isUser",
          {
            withCredentials: true,
          }
        );
        if (user) {
          console.log("Yes");
          login();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    isUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/login"
          element={
            <PrivateRoute>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
              <Homepage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
