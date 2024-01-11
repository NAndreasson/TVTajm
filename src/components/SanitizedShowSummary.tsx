import { Interweave } from "interweave";
import { TvMazeShow } from "../api/tvMaze";

interface Props {
  summary: TvMazeShow["summary"];
}

export function SanitizedShowSummary({ summary }: Props) {
  if (!summary) {
    return null;
  }

  return <Interweave noWrap allowList={["p", "b"]} content={summary} />;
}
