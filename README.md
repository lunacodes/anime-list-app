# Anime List App

This app is an in-progress exercise, in order for me to further my React, Node, and MongoDB knowledge. I plan to implement Typescript later on, as well.

Demo: [My Light Novels (Heroku App)](https://my-light-anime.herokuapp.com/)

## Running the App

You'll need to have a MongoDB and Atlas URI set up. See [MongoDB - MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial) and [MongoDB - Get Started With Atlas](https://docs.atlas.mongodb.com/getting-started/)

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

Add documentation with Swagger

### Client

- Write tests
- Set Logout redirect to go the previous page, via React Router
- Tidy up messages and redirects for user login & registration
- Add ability for user to add anime to their profile
- Only display search bar on specific pages
- Add custom page class to `<body>` or `main` tag
- Fix: storing user info in local storage causes anime list not to reflect updates. Need to make fetch to db on User profile page

### Server

- Add ability for user to modify user details
- Tests needed for:
  - Anime add, update, and delete
- Sort anime before entry in DB: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values (alternately, sort them client-side)

## Future Implementation

- Convert to TypeScript
  -Use Redis for auth: https://javascript.plainenglish.io/how-redis-can-make-authentication-10x-easoer-for-your-users-cd8c0601d38
