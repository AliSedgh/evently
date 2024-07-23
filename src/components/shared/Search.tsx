"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { InputAdornment, TextField } from "@mui/material";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  useUpdateSearchParams("query", query);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50">
      <TextField
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Image
                src="/assets/icons/search.svg"
                alt="search"
                width={24}
                height={24}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
