import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { BookPlus, Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" className="font-bold">
          Add book
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        <DropdownItem
          key="manual"
          startContent={<BookPlus />}
          onPress={() => navigate("/add")}
        >
          <p className="font-bold">Add manually</p>
        </DropdownItem>

        <DropdownItem
          key="search"
          startContent={<Search />}
          onPress={() => navigate("/search")}
        >
          <p className="font-bold">Search for a book</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddButton;
