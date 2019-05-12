const Query = {
  // parent GraphQl query
  // args passed to this Query
  // ctx: context, headers, cookies
  // info: details pertaining to the query
  async missions (parent, args, ctx, info) {
    const missions = await ctx.db.query.missions();
    return missions;
  },
  async activeMissions (parent, args, ctx, info) {
    console.log(args)
    const missions = await ctx.db.query.missions({where: { activeUser: {id: ctx.request.userid} }});
    return missions;
  },
  async messages (parent, args, ctx, info) {
    const messages = await ctx.db.query.messages({where: { to: {id: ctx.request.userid} }});
    return messages;
  },
  async sentMessages (parent, args, ctx, info) {
    const sent = await ctx.db.query.messages({where: { from: {id: ctx.request.userid} }});
    return sent;
  },
  async payments (parent, args, ctx, info) {
    const payments = await ctx.db.query.payments({where: { payTo: {id: ctx.request.userid} }});
    return payments;
  },
  async paid (parent, args, ctx, info) {
    const paid = await ctx.db.query.payments({where: { Payee: {id: ctx.request.userid} }});
    return paid;
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
