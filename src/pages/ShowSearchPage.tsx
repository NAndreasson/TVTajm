import { useQuery } from "react-query";
import { ShowSearchResponseList, searchShows } from "../api/tvMaze";
import { Layout } from "../layouts/Layout";
import { useSearch } from "../hooks/useSearch";
import { Helmet } from "react-helmet-async";
import {
  ShowListItem,
  ShowListItemSkeleton,
} from "../components/ShowsList/ShowListItem";
import { DelayedLoader } from "../components/DelayedLoader";
import { PageError } from "../components/PageError";

function NoResults({ searchString }: { searchString: string }) {
  return <p>No results for "{searchString}"</p>;
}

interface ShowsListProps {
  searchString: string;
  showList: ShowSearchResponseList;
}

function ShowsList(props: ShowsListProps) {
  const { searchString, showList } = props;

  const hasNoResults = showList.length === 0;
  if (hasNoResults) {
    return <NoResults searchString={searchString} />;
  }

  return (
    <ul className="divide-y divide-slate-400/20">
      {showList.map(({ show }) => (
        <ShowListItem key={show.id} show={show} />
      ))}
    </ul>
  );
}

export function ShowSearchPage() {
  const { searchString } = useSearch();

  const query = useSearchShows(searchString);

  return (
    <Layout>
      <Helmet>
        <title>Shows</title>
      </Helmet>
      <div>
        <h1 className="text-3xl mb-2">Shows</h1>
        {query.isLoading && (
          <DelayedLoader>
            <ul>
              <ShowListItemSkeleton />
              <ShowListItemSkeleton />
              <ShowListItemSkeleton />
            </ul>
          </DelayedLoader>
        )}
        {query.isError && (
          <PageError
            title="Error loading shows"
            description="Please try again later"
          />
        )}
        {query.isSuccess && (
          <ShowsList searchString={searchString} showList={query.data} />
        )}
      </div>
    </Layout>
  );
}

function useSearchShows(searchString: string) {
  return useQuery(["shows", searchString], () => searchShows(searchString));
}
