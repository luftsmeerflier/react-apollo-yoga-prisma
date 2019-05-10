const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  // parent GraphQl query
  // args passed to this Query by the user
  // ctx: context, headers, cookies
  // info: details pertaining to the query coming from front end

  async createMission (parent, args, ctx, info) {
    console.log(`Create Mission server side`)
    // TODO check if user is logged in
    // create a dog
    console.log(args)
    const mission = await ctx.db.mutation.createMission({
      data: {
        ...args,
        postedBy: {
          connect: { id: args.postedBy },
        },
      },
    }, info);

    return mission
  },

  async signup (parent, args, ctx, info) {
    console.log(`Signup Mutation.js server side`)
    // lowercase their email
    args.email = args.email.toLowerCase().trim();
    console.dir(args)
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database (createUser function comes from generated/prisma.graphql)
    try {
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            password,
            permissions: { set: ['USER'] },
          },
        },
        info
      );
      // create the JWT token for them
      const token = jwt.sign({ userid: user.id }, process.env.APP_SECRET);
      // We set the jwt as a cookie on the response
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week cookie
      });
      // Finalllllly we return the user to the browser
      return user;
    } catch (error) {
      console.error(error)
      return error;
    }
  },


  async signin (parent, { email, password }, ctx, info) {
    console.log(`signin mutation on ${email}`)
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    console.dir(user)
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userid: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },

  signout (parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { success: true, message: 'Pax Romana' };
  },

}
module.exports = Mutations

// an example Mutation in playground

// mutation createMission {
// 	createMission(title:"Visit the fair") {
//     title
//   }
// }
