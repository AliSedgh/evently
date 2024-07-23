import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useUpdateSearchParams = (key: string, value: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (!value || value === "All") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`, { scroll: false });
    }, 500);

    return () => {
      clearInterval(timeOut);
    };
  }, [value]);
};

export default useUpdateSearchParams;
