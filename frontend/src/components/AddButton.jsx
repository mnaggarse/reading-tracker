import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Edit, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="opacity-20 hover:opacity-100 fixed bottom-10 right-8 z-50"
          color="primary"
          radius="full"
          size="lg"
        >
          <Plus size={30} />
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        <DropdownItem
          key="manual"
          startContent={<Edit />}
          onPress={() => navigate("/add")}
        >
          Add manually
        </DropdownItem>

        <DropdownItem
          key="search"
          startContent={<Search />}
          onPress={() => navigate("/search")}
        >
          Search for a book
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddButton;
