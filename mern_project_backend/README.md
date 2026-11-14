 COMP229 Project Part 1 - Part B (Backend)

Express + Node + MongoDB (Mongoose) backend in MVC structure, with JWT
authentication and authorization.

Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values
   (your MongoDB Atlas connection string with database name in it,
   and a JWT secret). Never commit `.env`.
3. Run the server:
   npm run dev
   
   You should see `Server started on port 3000.` and`Connected to the database!`.

Folder structure (MVC)

```
config/config.js            configuration variables
server.js                   starts the server + connects to MongoDB
server/express.js           Express app, middleware, routes mounted
server/models/              user.model.js, item.model.js
server/controllers/         user, auth, item controllers
server/routes/              user, auth, item routes
server/helpers/             dbErrorHandler.js


## API endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/users | no | create user (sign up) |
| GET | /api/users | no | list users |
| GET | /api/users/:userId | signed in | read one user |
| PUT | /api/users/:userId | signed in + same user | update user |
| DELETE | /api/users/:userId | signed in + same user | delete user |
| POST | /auth/signin | no | sign in, returns JWT |
| GET | /auth/signout | no | sign out |
| POST | /api/items | signed in | create item (owner = signed-in user) |
| GET | /api/items | no | list items |
| GET | /api/items/:itemId | no | read one item |
| PUT | /api/items/:itemId | signed in + owner | update item |
| DELETE | /api/items/:itemId | signed in + owner | delete item |

Protected routes need the header: `Authorization: Bearer <token>`
