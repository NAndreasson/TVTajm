import React from "react";

interface PageErrorProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
  title: string; // possibly use React.ReactNode instead
  description: string;
}

export function PageError(props: PageErrorProps) {
  const { className } = props;
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <p className="text-xl">{props.description}</p>
    </div>
  );
}
