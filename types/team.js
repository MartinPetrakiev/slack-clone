export default `
    type Team {
      id: ID!
      name: String!
      owner: User!
      members: [User!]
      channels: [Channel!]
     }

     type CreateTeamResponse {
      ok: Boolean!
      errors: [Error!]
    }

    type Query {
        allTeams: [Team!]!
        getTeam(id: String!): Team!
    }


     type Mutation {
       createTeam(name: String!): CreateTeamResponse!
     }
`;