import {
  LandingPage,
  Home,
  Archive,
  Trash,
  Login,
} from "./pages/index";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context";

function App() {
  const {token} = useAuth();
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/trash" element={token ? <Trash /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/archive" element={token ? <Archive /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/home" element={token ? <Home /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
