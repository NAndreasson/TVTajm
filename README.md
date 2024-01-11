# TVtajm

A simple React app that lets users search and view details about TV shows, using the TV-maze API.

Live at: <https://tvtajm.nandreasson.se>.

## Tech stack:

The app was built using the following technologies:

- **Core:**
  - TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.
  - React: A JavaScript library for building user interfaces.
- **Other:**
  - react-router: A routing library for React applications.
  - Tailwind: A utility-first CSS framework for rapidly building custom user interfaces.
  - Interweave: To safely render HTML from the TV-maze API.
  - Zod: For validating API responses.
- **Testing:**
  - Vitest with react-testing-library: A testing library for React applications.
  - Playwright: A Node.js library for automating browser actions.
- **API:**
  - [TV-Maze API](https://www.tvmaze.com/api): An API for accessing TV show information.

## Getting Started

To run this app locally, you need to have node and npm installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/NAndreasson/TVTajm.git
   ```

2. Enter the directory:

   ```bash
   cd TVTajm
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Alternatively, you could provide a custom port (e.g. 6000) with:

   ```bash
   npm run dev -- --port 6000
   ```

   Take note of the port used in the terminal output.

5. Open your browser and navigate to `http://localhost:5173` (or the selected port).

## Running Tests

This app includes tests written in Vitest and Playwright.

The Vitest tests are lower level, a mix of unit and integration style tests, while the Playwright tests are higher level, testing the user's journey through out the app.

Run Vitest tests:

```bash
npm run test
```

Run Playwright tests

```bash
# Headless
npx run test:e2e
# UI
npx run test:e2e -- --ui
```

You might have to run `npx playwright install && npx playwright install-deps` to install playwright dependencies.

## Development Containers

This project includes a devcontainer configuration for Visual Studio Code. To use it, make sure you have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. Then, open the project in Visual Studio Code and click on the "Open a Remote Window" button in the bottom left corner. Select "Reopen in Container" to start the development environment inside a container.
