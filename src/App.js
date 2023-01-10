import { Outlet } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./components/context/AuthContext";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}

export default App;
