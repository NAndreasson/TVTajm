import { TvMazeShow } from "../api/tvMazeSchemas";

export const ImageContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`w-24 md:w-36 aspect-[210/295] ${props.className ?? ""}`}>
    {props.children}
  </div>
);

const MissingImagePlaceholder = () => (
  <div className="bg-gray-200 w-full h-full">
    <div className="flex flex-col justify-center h-full text-center">
      Missing image
    </div>
  </div>
);

interface ShowThumbnailProps extends Pick<TvMazeShow, "name" | "image"> {
  className?: string;
}

export function ShowImage(props: ShowThumbnailProps) {
  const { image, name, className = "" } = props;

  return (
    <ImageContainer className={`flex-shrink-0 ${className}`}>
      {image && (
        <img src={image.medium} alt={`Image for ${name}`} className="w-full" />
      )}
      {!image && <MissingImagePlaceholder />}
    </ImageContainer>
  );
}
