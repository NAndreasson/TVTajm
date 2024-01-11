function TVMazeCredit() {
  return (
    <div className="text-center text-sm">
      Powered by the{" "}
      <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
        TVMaze API
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="mx-auto px-4">
        <TVMazeCredit />
      </div>
    </footer>
  );
}
