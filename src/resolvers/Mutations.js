const Mutations = {
  createMission(parent, args, ctx, info) {
    // create a dog
    console.dir(args)
  }
}
module.exports = Mutations

// an example Mutation in playground

// mutation createMission {
// 	createMission(title:"Visit the fair") {
//     title
//   }
// }
