# Anime List App

An app to keep track of anime one has watched, or plans to watched. Inspired by [MyAnimeList](myanimelist.net/).

Demo: [My Light Novels (Heroku App)](https://my-light-anime.herokuapp.com/)

## Running the App

You'll need to have a MongoDB and Atlas URI (or local version) set up. See [MongoDB - MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial) and [MongoDB - Get Started With Atlas](https://docs.atlas.mongodb.com/getting-started/)

**Running the App**

1. Rename `.env.sample` to `.env`
2. Fill in your `ATLAS_URI` in `.env` (you can get this via MongoDB's website)
3. Run `npm run setup` then `npm run dev` from the root directory.
4. In a 2nd terminal window, `cd client` then `npm start`. Alternately, you can combine steps 3 & 4 by running `npm run startLocal` instead of `npm run dev`

**Building the App**

In the root directory, `npm run build` then `npm start`

## Tech Stack

The current tech stack for this app is as follows:

- MERN Stack (MongoDB, Express, React, NodeJs)
- Mongoose
- [Kitsu API](https://kitsu.docs.apiary.io/)

## To-Do

- Add documentation with Swagger

### Client

- Add tests
- Set Logout redirect to go the previous page, instead of displaying login form
- Tidy up login behavior, via Context, Memo, and Router
- Only display search bar on relevant
- Add page-specific utility class to `<body>` or `main` tag
- Fix: User's anime list not updating after adding or deleting an anime.
  - Reason: User data in local storage is only refreshed after login/logout

### Server

- Add routes & functions for modifying user details
- Tests needed for:
  - User Anime: add, update, and delete
  - User Details: add, edit
- Sort user's anime array after add/delete, prior to sending them back to the Database

## Future Implementation

- Convert to TypeScript
- Optional: Use Redis for auth: https://javascript.plainenglish.io/how-redis-can-make-authentication-10x-easoer-for-your-users-cd8c0601d38
