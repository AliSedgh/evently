"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#624cf5", // رنگ اصلی
      light: "#63a4ff", // رنگ روشن
      dark: "#004ba0", // رنگ تیره
      contrastText: "#fff", // رنگ متن برای رنگ اصلی
    },
    secondary: {
      main: "#f6f6f6", // رنگ ثانویه
      light: "#ff5c8d", // رنگ روشن
      dark: "#9a0036", // رنگ تیره
      contrastText: "#000", // رنگ متن برای رنگ ثانویه
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: "box-shadow 5s ease-in-out",
          borderRadius: "30px",
          "& .MuiOutlinedInput-input": {
            backgroundColor: theme.palette.secondary.main, // استفاده از رنگ کاستوم
            borderRadius: "inherit", // ارث‌بری از borderRadius ریشه
            paddingLeft: "16px", // اضافه کردن فاصله از چپ
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.primary.main}`, // استفاده از رنگ اصلی برای بوردر در حالت فوکس
            boxShadow: " 0 2px 4px 0 rgba(98, 76, 245, 0.4)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            boxShadow: " 0 2px 4px 0 rgba(98, 76, 245, 0.4)",
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});

export default theme;
