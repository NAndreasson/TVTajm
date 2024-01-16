import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

export function SearchForm() {
  const { searchString, setSearchString } = useSearch();
  const [searchInputValue, setSearchInputValue] = useState(searchString);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchString(searchInputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative flex">
        <input
          type="search"
          data-testid="search-input"
          aria-label="Search for a TV show"
          placeholder="Search"
          className="block w-full bg-white border-l border-t border-b border-gray-400 px-3 py-2 rounded-l-full text-black "
          value={searchInputValue}
          onChange={(event) => setSearchInputValue(event.target.value)}
        />
        <button
          type="submit"
          aria-label="Submit search query"
          className="text-black bg-white border-r border-t border-b border-gray-400 rounded-r-full px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="w-6 h-6"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
