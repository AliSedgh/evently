import { getAllCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { useEffect, useState } from "react";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);
  return { categories, setCategories };
};

export default useFetchCategories;
