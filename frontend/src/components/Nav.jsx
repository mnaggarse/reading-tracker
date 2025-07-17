import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Nav = () => {
  const navigate = useNavigate();
  const { session, signout } = UserAuth();
  const name = session.user.user_metadata.username;

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err) {
      console.error("Sign out error:", err);
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <Navbar className="bg-white border-b border-gray-200">
      <NavbarBrand>
        <h1 className="text-lg font-bold">Welcome, {name}</h1>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Button variant="faded" color="danger" onPress={handleSignOut} className="font-semibold">
          Sign out
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
