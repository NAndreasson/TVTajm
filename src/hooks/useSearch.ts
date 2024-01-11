import { useNavigate, useSearchParams } from "react-router-dom";

const SEARCH_PARAM = "search";

export function useSearch() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const searchString = searchParams.get(SEARCH_PARAM) ?? "";

  return {
    searchString,
    setSearchString: (newSearchString: string) => {
      nav({
        pathname: "/shows",
        search: newSearchString ? `?${SEARCH_PARAM}=${newSearchString}` : "",
      });
    },
  };
}
