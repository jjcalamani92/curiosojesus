import { useQuery } from "@tanstack/react-query";
import { Category } from "../interfaces/category";
// import { getCategories } from "app/[page]/page";

export const useGetCategories0ByParentId = (parentId: string, categories: Category[]) => {
  return useQuery<Category[]>({
    queryKey: [ `get-categories-0`, parentId],
    // queryFn: () => getCategories(parentId),
    queryFn: async () => {
      const data = await fetch(`https://criscms.vercel.app/api/portfolio/categories0/parentId/${parentId}`, {mode: 'no-cors', cache: 'no-store'})
      return data.json()
    },
    initialData: categories
  });
};