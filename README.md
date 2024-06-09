# fundy-tickets-nextjs

## Description

This project is a Next.js application designed for Fundy Tickets. It utilizes Firebase Firestore for data storage and management.

## Installation

Before proceeding, ensure you have Node.js and npm installed on your machine.

And don't forget to install dependencies:

```sh
npm install
```

## Git Flow

.
To maintain code consistency and manage changes effectively, follow these guidelines:

1. **Issue Tracking**: Before making any changes, create or assign yourself to an issue in the project's issue tracker.

2. **Branching Strategy**: Create a new branch for each feature or bug fix. Name your branch descriptively based on the feature or issue it addresses.

   ```sh
   git checkout -b feature/new-feature develop
   ```

3. **Code Changes**: Implement your changes in the new branch, following the project's coding standards and guidelines.

4. **Pull Requests**: Once your changes are ready for review, open a pull request against the develop branch. Provide a clear description of the changes made and reference any related issues.

5. **Code Review**: Wait for code review feedback from your team members. Address any comments or suggestions raised during the review process. After approval, merge your pull request into the develop branch.

Note: Make sure to follow the pull request checklist. :)

## Available Scripts

In the project directory, you can run the following npm scripts:

Runs the Next.js development server.

```sh
npm run dev
```

Builds the Next.js application for production.

```sh
npm run build
```

Starts the Next.js production server.

```sh
npm start
```

### ESLint

Lints the project files using ESLint.

```sh
npm run lint
```

### Formatting

Checks the formatting of project files using Prettier.

```sh
npm run format:check
```

Formats the project files using Prettier.

```sh
npm run format
```

If you are using vscode then there is automatic formatting too.

## License

[MIT](https://opensource.org/licenses/MIT)
