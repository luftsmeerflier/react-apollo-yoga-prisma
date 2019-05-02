#### Scaffolding for a React - Apollo Client - Yoga - Prisma Web Application

#### Concepts

- GraphQl is a query language, a way to interface with any API that enables developers to request only the data they need and group queries that would otherwise hit multiple databases or tables in a single call by aggregating CRUD functionality into a single endpoint.
- Our GraphQl endpoint is setup, deployed, documented and organized by Prisma: a GraphQl database as a server type service.
- To interface with our GraphQl endpoint, we use Yoga, which is just a modified Express server bundling Apollo Server to interact with GraphQl endpoints and empowered by the library `prisma-binding` for specifically working with Prisma.
- Pulling data from the front end is handled by the Apollo Client (interacts with the Yoga server via Queries and Mutations, akin to the "Controller" in MVC) and React will be used as the view language to express the data in visual language.

###### Get Started [setup Prisma back end with a basic Yoga Server]

1. Create an account on prisma.io
2. install the primsa cli globally `npm i -g prisma`
3. clone this repo, move `datamodel.graphql` out of this folder and then run `prisma init`
4. follow the prompts to use a demo server
5. replace the generated datamodel with the one from this repo (your Prisma server playground URL will be in `prisma.yml` and should be moved to your local .env (see step 8))
6. `yarn` to install dependencies
7. Boilerplate code: src/
    1. `generated/prisma.graphql` is our schema pulled down from the server via the post deploy hook in `prisma.yml`. This introspects our database and returns a graphql spec.
    2. `createServer` starts the yoga server that in turn connects to the remote prisma instance via config info in `db.js`
    3. `resolvers/` is where we will write our queries and mutations on the back end for use by the Apollo client
    4. `schema.graphql` us yet another schema and its purpose is as yet unclear

8. to start, you will need to an a `.env` to the root directory. This file should have at least:
  1. FRONTEND_URL=localhost:7777
  2. PRISMA_ENDPOINT=`<refer to prisma.yml or take note when initing your prisma server!>`
  3. PRISMA_SECRET=*
  4. APP_SECRET=*
  5. PORT=4444

where * means make it up!

###### Add the Apollo client [Front end]

1.
