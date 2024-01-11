import { TvMazeShow } from "../../api/tvMaze";

type Props = Pick<TvMazeShow, "premiered" | "ended"> & { className?: string };

export function Dates({ className, premiered, ended }: Props) {
  if (!premiered) {
    return null;
  }

  return (
    <div className={`text-gray-500 ${className}`}>
      {premiered} - {ended || "Ongoing"}
    </div>
  );
}
