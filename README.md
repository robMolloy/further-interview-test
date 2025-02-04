# further-interview-test

## getting started

- install deps: `npm i`
- run dev server: `npm run dev` opens at http://localhost:3000

## assumptions

- As the sign up date does not have a corresponding time it is assumed to be the correct, ie no conversion required
- GMT is always assumed

## user input

- tsconfig.json - add "noUncheckedIndexedAccess": true to show relevant errors if user could add data
- Use zod to validate user input

## misc

- Haven't used a defensive approach - would be good to show you how I do it with more time
- opt for composability over inheritance
