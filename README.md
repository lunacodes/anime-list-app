# My Light Novel App

This app is an in-progress exercise, in order for me to further my React, Typescript, and Node knowledge. I had previously been working on a [webtoons version](https://github.com/lunacodes/my-webtoon-list-app), but decided to start over from a clean slate.

Demo version coming soon.

To run the app locally:

1. Run `npm run setup` from the root directory
2. Run `npm start` from the root directory

To do this manually:

1. Run `npm install` in the root directory, then `npm run dev` (or `npm run startServer`). The server will now be running on localhost:3001
2. In a separate terminal window, `cd client`, `npm install`, `npm start`. The app will now be running on localhost:3000

## Tech Stack

The current tech stack for this app is as follows:

- NodeJs
- React
- Express
- MongoDB
- Mongoose
- Typescript
- [Kitsu API](https://kitsu.docs.apiary.io/)

## To-Do

### Client

- Generate dynamic pgs for each novel
- Add search functionality
- Create User Profile area
- Add user authentication
- Write tests
- eslint: props validation

### Server

- Add search functionality
- Refine typing
- Write tests
- Allow `/fetch` route to handle query params from client
