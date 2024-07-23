import { styled } from "@mui/material";
import React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${theme.palette.secondary.main};
  border: 1px solid ${theme.palette.secondary.main};
  // box-shadow: 0px 2px 2px ${theme.palette.primary.main};

  &:hover {
     border-color:${theme.palette.primary.main};
   box-shadow: 0 2px 4px 0 rgba(98, 76, 245, 0.4);

  };

  &:focus {
    border: 1px solid ${theme.palette.primary.main};
   box-shadow: 0 2px 4px 0 rgba(98, 76, 245, 0.4);

  };

  &:focus-visible {
    outline: 0;
  }
`
);

interface IProps<T extends FieldValues> extends ControllerRenderProps<T> {
  minRows: number;
  placeholder: string;
}

function CustomTextArea<T extends FieldValues>({
  minRows,
  placeholder,
  ...restProps
}: IProps<T>) {
  return (
    <Textarea
      sx={{ width: "100%" }}
      className="w-full"
      minRows={minRows}
      placeholder={placeholder}
      {...restProps}
    />
  );
}

export default CustomTextArea;
