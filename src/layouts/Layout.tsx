import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
