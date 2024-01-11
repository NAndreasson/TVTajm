import { TvMazeShow } from "../../api/tvMaze";
import { Link } from "react-router-dom";
import { Genres } from "../Show/Genres";
import { Dates } from "../Show/Dates";

export function ShowListItemSkeleton() {
  return (
    <li className="py-4 flex" data-testid="show-list-item-skeleton">
      {/* Placeholder for image */}
      <div className="w-36 bg-gray-200 animate-pulse">
        <div className="h-24"></div>
      </div>

      <div className="p-4 flex-grow">
        {/* Placeholder for title */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>

        {/* Placeholder for premiered and ended dates */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

        {/* Placeholder for genres */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

        {/* Placeholder for summary */}
        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </li>
  );
}

interface ShowListItemProps {
  show: TvMazeShow;
}

export function ShowListItem(props: ShowListItemProps) {
  const { show } = props;

  return (
    <li className="py-4 flex" data-testid="show-list-item">
      {/* if there's an image, use the medium version, fixed size */}
      <Link data-testid="show-thumbnail-link" to={`/shows/${show.id}`}>
        <div className="w-24 md:w-36 flex-shrink-0">
          {show.image && <img src={show.image.medium} alt={show.name} />}
          {/* create some kind of placeholder if missing image */}
          {!show.image && (
            <div className="bg-gray-200 w-full h-full">
              <div className="text-center">Missing image</div>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h1 className="text-2xl">
          <Link data-testid="show-link" to={`/shows/${show.id}`}>
            {show.name}
          </Link>
        </h1>
        <Dates premiered={show.premiered} ended={show.ended} />
        <Genres genres={show.genres} />
      </div>
    </li>
  );
}
