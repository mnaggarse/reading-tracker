import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Edit, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddButton() {
  const navigate = useNavigate();

  const navigateToAddPage = () => {
    navigate("/add");
  };

  const navigateToSearchPage = () => {
    navigate("/search");
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="fixed bottom-20 right-8 z-50"
          color="primary"
          radius="full"
          size="lg"
        >
          <Plus size={30} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownItem
          key="manual"
          startContent={<Edit />}
          onPress={navigateToAddPage}
        >
          Add manually
        </DropdownItem>
        <DropdownItem
          key="search"
          startContent={<Search />}
          onPress={navigateToSearchPage}
        >
          Search for a book
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
