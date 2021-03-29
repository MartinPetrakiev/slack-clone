export default `
    type Team {
      id: ID!
      teamKey: String!
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
        getTeam(teamKey: String!): Team!
    }

    type VoidResponse {
      ok: Boolean!
      errors: [Error!]
    }

     type Mutation {
       createTeam(name: String!): CreateTeamResponse!
       addTeamMember(email: String!, teamId: Int!): VoidResponse!
     }
`;