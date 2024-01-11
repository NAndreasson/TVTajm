import { Link } from "react-router-dom";
import { SearchForm } from "../components/Search";
import { name } from "../config.json";

export function SiteHeader() {
  return (
    <header className="bg-gray-900 text-white py-8">
      <div className="max-w-3xl gap-4 flex mx-auto px-4 flex-col md:flex-row justify-between">
        <h1 className="text-2xl font-bold text-center">
          <Link to="/">{name}</Link>
        </h1>
        <SearchForm />
      </div>
    </header>
  );
}
