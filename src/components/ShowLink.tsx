import React from "react";
import { Link } from "react-router-dom";
import { TvMazeShow } from "../api/tvMaze";

interface ShowLinkProps {
  testId: string;
  id: TvMazeShow["id"];
  children: React.ReactNode;
}

export function ShowLink(props: ShowLinkProps) {
  const { testId, id, children } = props;
  return (
    <Link data-testid={testId} to={`/shows/${id}`}>
      {children}
    </Link>
  );
}
