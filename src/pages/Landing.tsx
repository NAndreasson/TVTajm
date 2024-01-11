import { SearchForm } from "../components/Search";
import { name } from "../config.json";
import { Footer } from "../layouts/Footer";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="max-w-3xl flex-grow py-8 px-4 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export function Landing() {
  return (
    <BaseLayout>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-center font-bold text-4xl">{name}</h1>
        <SearchForm />
        <p className="text-center">
          Your favorite TV-shows a few keystrokes away.
        </p>
      </div>
    </BaseLayout>
  );
}
