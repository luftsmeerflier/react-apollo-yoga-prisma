const Query = {
  // parent GraphQl query
  // args passed to this Query
  // ctx: context, headers, cookies
  // info: details pertaining to the query
  async missions (parent, args, ctx, info) {
    // // dummy data, to illustrate that calling Prisma server is not required
    // return [{title: 'Catch a wild Pikachu'}, {title: 'Scale the Eiffel tower'}]
    const missions = await ctx.db.query.missions();
    return missions;
  },
  me (parent, args, ctx, info) {
    console.log(`me query`)
    if (!ctx.request.userid) {
      console.log('no userid sent along')
      return null;
    }
    console.log('return ctx query')
    return ctx.db.query.user({
      where: { id: ctx.request.userid },
    }, info);
  },
};
module.exports = Query

// an example Query for use in Playground

// query allMissions {
//   missions {
//     title
//   }
// }
