# TVtajm

A simple single page React app that lets users search and view details about TV shows, using the TV-maze API.

Live at: <https://tvtajm.nandreasson.se>.

## Tech stack:

The app was built using the following technologies:

- **Core:**: TypeScript & React
- **Other:**
  - react-router: A routing library for React applications.
  - Tailwind: A utility-first CSS framework.
  - Interweave: To safely render HTML from the TV-maze API.
  - Zod: For validating API responses.
- **Testing:**
  - Vitest with react-testing-library: Used for testing smaller units of code, React hooks and components.
  - Playwright: For E2E tests, higher level focus, testing the user's journey through the app.
- **API:**
  - [TV-Maze API](https://www.tvmaze.com/api): An API for accessing TV show information.

## Getting Started

To run this app locally, please ensure that you have Node.js and npm installed. The app was developed using Node.js v20.10.0 and npm v10.2.3.

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

To run the Vitest tests:

```bash
npm run test
```

To run the Playwright tests

```bash
# Headless
npx run test:e2e
# UI
npx run test:e2e -- --ui
```

You might have to run `npx playwright install && npx playwright install-deps` to install playwright dependencies.

## Development Containers

This project includes a devcontainer configuration for Visual Studio Code. To use it, make sure you have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. Then, open the project in Visual Studio Code and click on the "Open a Remote Window" button in the bottom left corner. Select "Reopen in Container" to start the development environment inside a container.
