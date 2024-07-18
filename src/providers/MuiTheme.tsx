"use client";
import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material";
import React, { PropsWithChildren } from "react";
type TProps = PropsWithChildren;

const MuiTheme: React.FC<TProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
