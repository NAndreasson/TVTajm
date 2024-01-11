import { TvMazeShow as ShowType } from "../api/tvMaze";
import { Genres } from "./Show/Genres";
import { Dates } from "./Show/Dates";
import { SanitizedShowSummary } from "./SanitizedShowSummary";

export function ShowSkeleton() {
  return (
    <div data-testid="show-loading-skeleton">
      <div className="bg-white p-8 animate-pulse">
        {/* Placeholder for image */}
        <div className="bg-gray-200 w-[210px] h-[295px] max-w-full mx-auto mb-4"></div>

        {/* Placeholder for show name */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>

        {/* Placeholder for premiered and ended dates */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>

        {/* Placeholder for genres */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>

        {/* Placeholder for summary */}
        <div className="bg-gray-200 h-24 rounded mb-4"></div>
      </div>
    </div>
  );
}

interface ShowDetailsProps {
  show: ShowType;
}

export function ShowDetails({ show }: ShowDetailsProps) {
  return (
    <div className="bg-white p-8">
      {show.image && (
        <img
          src={show.image.medium}
          alt={`Cover image for ${show.name}`}
          className="max-w-full mx-auto mb-4"
        />
      )}
      <h1 data-testid="show-heading" className="text-2xl font-bold mb-2">
        {show.name}
      </h1>
      <Dates premiered={show.premiered} ended={show.ended} className="mb-2" />
      <Genres genres={show.genres} className="mb-2" />
      <div data-testid="show-summary">
        <SanitizedShowSummary summary={show.summary} />
      </div>
    </div>
  );
}
