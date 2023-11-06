# Your Dictionary App (frontend part)

Welcome to the frontend repository of Your Dictionary App, a language-learning tool designed to facilitate English language acquisition. This repository contains the source code and related resources for the app's user interface.

## Project Overview

Key Features:

- Word Bank: Users can save new words and their translations, along with contextual usage examples and phrases, creating a personalized word bank for efficient learning.
- Pronunciation: Access precise and clear word pronunciations, aiding users in mastering accurate English pronunciation.
- Interactive Learning: Engage in an immersive language-learning experience with a built-in testing feature that incorporates the words stored in your word bank.

## Tech Stack of frontend implementation:

- Framework: React
- Build Tool: Vite
- Language: TypeScript
- Routing: React Router
- State and cache Management: Redux Query
- UI Framework: Tailwind CSS

## Getting Started

To set up and run the frontend locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install project dependencies by running: npm install.
4. Set the %VITE_BASE_URL% environment variable to the URL of your server. You can configure this value in your environment settings or by creating a .env file.
5. Start the development server by running: **`npm run dev`**.

The app should now be accessible at `http://127.0.0.1:5173/your-dictionary-client/` in your web browser.

## Available Scripts

In this project, you can run the following scripts:
- **`npm run dev`**: This script runs the project in a development mood.
- **`npm run build`**: This script compiles TypeScript using `tsc` and then uses Vite to build the frontend. It prepares the project for deployment.
- **`npm run lint`**: Use this script to run ESLint on your project files. It checks TypeScript and TypeScript/React files for code quality and style issues. 
- **`npm run preview`**: Run this script to start a Vite preview server. This can be useful for testing the production build locally before deployment.
- **`npm run prepare`**: This script is used for Husky, a Git hooks manager, to enforce code quality before commits.
