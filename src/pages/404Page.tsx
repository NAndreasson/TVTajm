import { PageError } from "../components/PageError";
import { Layout } from "../layouts/Layout";

// Generate a 404page, use the Layout component, and display a PageError component with a title of "404" and a description of "Page not found"
export function NotFoundPage() {
  return (
    <Layout>
      <PageError title="404" description="Page not found" />
    </Layout>
  );
}
