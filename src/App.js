import { Outlet } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./components/context/AuthContext";
import TotalCartContextProvider from "./components/context/TotalCartContext";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <AuthContextProvider>
      <TotalCartContextProvider>
        <div className="App">
          <Navbar />
          <Outlet />
        </div>
      </TotalCartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
