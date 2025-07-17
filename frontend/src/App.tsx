import { Route, Routes } from "react-router-dom";

import AddBookPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<AddBookPage />} path="/add" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
