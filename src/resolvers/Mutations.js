const Mutations = {
  // parent GraphQl query
  // args passed to this Query by the user
  // ctx: context, headers, cookies
  // info: details pertaining to the query coming from front end

  async createMission(parent, args, ctx, info) {
    // TODO check if user is logged in
    // create a dog
    console.dir(args)
    const mission = await ctx.db.mutation.createMission({
      data: {
        ...args
      },
    }, info);

    return mission
  }
}
module.exports = Mutations

// an example Mutation in playground

// mutation createMission {
// 	createMission(title:"Visit the fair") {
//     title
//   }
// }
