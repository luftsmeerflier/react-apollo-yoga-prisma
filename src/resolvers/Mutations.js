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
        // syntax below creates the relation between the Mission and the User who posted it
        postedBy: {
          connect: { id: args.postedBy },
        },
      },
    }, info);

    return mission
  },

  async sendMessage (parent, args, ctx, info) {
    console.log(`send message server side`)
    // TODO check if user is logged in
    // create a dog
    console.log(args)
    const message = await ctx.db.mutation.sendMessage({
      data: {
        ...args,
        // syntax below creates the relation between the Mission and the User who posted it
        from: {
          connect: { id: args.from },
        },
        to: {
          connect: { id: args.to },
        },
      },
    }, info);

    return message
  },

  async signup (parent, args, ctx, info) {
    args.email = args.email.toLowerCase().trim();
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database, sign a token, set token to cookies
    try {
      const user = await ctx.db.mutation.createUser({
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      }, info);
      const token = jwt.sign({ userid: user.id }, process.env.APP_SECRET);
      ctx.response.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 * 4});
      return user;
    } catch (error) {
      console.error(error)
      return error;
    }
  },


  async signin (parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) throw new Error(`No such user found for email ${email}`);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid Password!');
    const token = jwt.sign({ userid: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 * 4 });
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
