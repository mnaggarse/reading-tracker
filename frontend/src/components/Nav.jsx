import { Avatar, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { Settings } from "lucide-react";

export default function Nav() {
  return (
    <Navbar className="bg-white border-b border-gray-200">
      <NavbarBrand>
        <Avatar className="cursor-pointer" name="MA" />
      </NavbarBrand>

      <NavbarContent justify="end">
        <Settings className="cursor-pointer" />
      </NavbarContent>
    </Navbar>
  );
}
