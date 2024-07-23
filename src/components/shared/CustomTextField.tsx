import { TextField } from "@mui/material";
import React from "react";
import {
  ControllerRenderProps,
  FieldValue,
  FieldValues,
} from "react-hook-form";

interface IProps<T extends FieldValues> extends ControllerRenderProps<T> {}

function CustomTextField<T extends FieldValues>(props: IProps<T>) {
  return <TextField placeholder="URL" {...props} className="w-full" />;
}

export default CustomTextField;
