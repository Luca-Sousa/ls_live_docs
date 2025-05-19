import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PencilLineIcon, ViewIcon } from "lucide-react";

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="view" className="shad-select-item">
          <span className="flex items-center gap-1">
            <ViewIcon size={20} />
            Exibir
          </span>
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          <span className="flex items-center gap-1">
            <PencilLineIcon size={20} />
            Editar
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
