import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
