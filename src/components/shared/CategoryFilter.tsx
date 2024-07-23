"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetchCategories from "@/hooks/useFetchCategories";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { getAllCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const { categories } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  useUpdateSearchParams("category", selectedCategory);
  return (
    <Select
      value={selectedCategory}
      onValueChange={(value: string) => setSelectedCategory(value)}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
