"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type TProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryClient: React.FC<TProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClient;
