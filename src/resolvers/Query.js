const Query = {
  // parent GraphQl query
  // args passed to this Query
  // ctx: context, headers, cookies
  // info: details pertaining to the query
  missions(parent, args, ctx, info) {
    // dummy data, will eventually pull from the db itself
    return [{title: 'Catch a wild Pikachu'}, {title: 'Scale the Eiffel tower'}]
  }
}
module.exports = Query

// an example Query for use in Playground

// query allMissions {
//   missions {
//     title
//   }
// }
