interface Props {
  className?: string;
  genres: string[];
}

export function Genres(props: Props) {
  const { genres, className } = props;

  const hasNoGenres = genres.length === 0;
  if (hasNoGenres) {
    return null;
  }

  return (
    <div className={`text-gray-500 ${className}`}>
      Genres: {genres.join(", ")}
    </div>
  );
}
