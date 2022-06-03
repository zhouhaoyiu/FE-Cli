import execa from 'execa';

// npx husky add .husky/pre-commit 'npm run lint-staged

execa("npx", ["husky", "add", ".husky/pre-commit", "'npm run build'"]);
