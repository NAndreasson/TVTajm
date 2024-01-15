import { useParams } from "react-router-dom";
import { FetchError, getShow } from "../api/tvMaze";
import invariant from "tiny-invariant";
import { useQuery } from "react-query";
import { Layout } from "../layouts/Layout";
import { PageError } from "../components/PageError";
import { ShowDetails, ShowSkeleton } from "../components/Show";
import { Helmet } from "react-helmet-async";
import { DelayedLoader } from "../components/DelayedLoader";

export function ShowPage() {
  const { id } = useParams();
  // Should only happen if this component is rendered outside of a <Route> with
  // the :id param
  invariant(typeof id === "string", "Missing Show ID");

  const query = useGetShow(id);

  return (
    <Layout>
      {query.isLoading && <ShowLoader />}
      {query.isError && <ShowFetchError error={query.error} />}
      {query.isSuccess && (
        <>
          <Helmet>
            <title>{query.data.name}</title>
          </Helmet>
          <ShowDetails show={query.data} />
        </>
      )}
    </Layout>
  );
}

function useGetShow(id: string) {
  return useQuery({
    queryKey: ["show", id],
    queryFn: () => getShow(id),
    // Don't retry on error, future work might include configuring so that we retry if no internet connection
    retry: false,
  });
}

function ShowLoader() {
  return (
    <DelayedLoader>
      <ShowSkeleton />
    </DelayedLoader>
  );
}

interface ShowErrorProps {
  error: unknown;
}

function ShowFetchError({ error }: ShowErrorProps) {
  if (is404Error(error)) {
    return <PageError title="404" description="Show not found" />;
  }
  // Could be a network error, Zod validation error, or something else
  return <PageError title="Error" description="Something went wrong" />;
}

function is404Error(error: unknown) {
  return error instanceof FetchError && error.statusCode === 404;
}
