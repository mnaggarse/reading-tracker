import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import AddButton from "./AddButton.jsx";

const Nav = () => {
  const navigate = useNavigate();
  const { session, signout } = UserAuth();
  const username = session.user.user_metadata.username;

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
        <Dropdown>
          <DropdownTrigger>
            <Avatar name={username} className="cursor-pointer"></Avatar>
          </DropdownTrigger>

          <DropdownMenu variant="light" color="danger">
            <DropdownItem
              key="logout"
              startContent={<LogOut className="text-red-500" />}
              onPress={handleSignOut}
            >
              <p className="font-bold text-red-500">Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarBrand>

      <NavbarContent justify="end">
        <AddButton />
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
