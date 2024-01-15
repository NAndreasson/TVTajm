import { TvMazeShow } from "../../api/tvMazeSchemas";
import { ShowLink } from "../ShowLink";
import { Genres } from "../Show/Genres";
import { Dates } from "../Show/Dates";
import { ImageContainer, ShowImage } from "../ShowImage";

export function ShowListItemSkeleton() {
  return (
    <li className="py-4 flex" data-testid="show-list-item-skeleton">
      {/* Placeholder for image */}
      <ImageContainer className="bg-gray-200 animate-pulse">
        <div className="w-full h-full"></div>
      </ImageContainer>

      <div className="p-4 flex-grow">
        {/* Placeholder for title */}
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>

        {/* Placeholder for premiered and ended dates */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

        {/* Placeholder for genres */}
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
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
      <ShowLink testId="show-thumbnail-link" id={show.id}>
        <ShowImage name={show.name} image={show.image} />
      </ShowLink>
      <div className="p-4">
        <h1 className="text-xl md:text-2xl">
          <ShowLink testId="show-link" id={show.id}>
            {show.name}
          </ShowLink>
        </h1>
        <Dates premiered={show.premiered} ended={show.ended} />
        <Genres genres={show.genres} className="mt-2" />
      </div>
    </li>
  );
}
