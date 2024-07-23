// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import useFetchCategories from "@/hooks/useFetchCategories";
import { Item } from "@radix-ui/react-select";
import { IEvent } from "@/lib/database/models/event.model";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  event?: IEvent;
};

const Dropdown = ({ value, onChangeHandler, event }: DropdownProps) => {
  const { categories, setCategories } = useFetchCategories();
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category: any) => {
      setCategories((prevState) => [...prevState, category]);
      setNewCategory("");
      setOpen(false);
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">category</InputLabel>
      <Select
        sx={{ minWidth: 120 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Category"
        onChange={onChangeHandler}
      >
        {categories.length > 0 &&
          categories.map((category) => (
            <MenuItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </MenuItem>
          ))}
        <>
          <Typography
            className="ml-5 text-violet-500 font-semibold cursor-pointer"
            onClick={handleClickOpen}
          >
            Add New Category
          </Typography>
          <Dialog
            fullWidth
            className="min-w-80"
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                handleAddCategory();
                handleClose();
              },
            }}
          >
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
              <TextField
                type="text"
                label="Category name"
                className="w-full"
                variant="filled"
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Typography onClick={handleClose}>Cancel</Typography>
              <Button type="button" onClick={handleAddCategory}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </Select>
    </FormControl>
  );
};

export default Dropdown;
