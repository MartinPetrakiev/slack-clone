export default `
    type Team {
      id: ID!
      teamKey: String
      name: String!
      owner: User!
      members: [User!]
      channels: [Channel!]
      admin: Boolean!
     }

     type CreateTeamResponse {
      ok: Boolean!
      team: Team
      errors: [Error!]
    }

    type Query {
        inviteTeams: [Team!]!
        getTeam(teamKey: String!): Team!
    }

    type VoidResponse {
      ok: Boolean!
      errors: [Error!]
    }

     type Mutation {
       createTeam(name: String!): CreateTeamResponse!
       addTeamMember(email: String!, teamId: Int! admin: Boolean!): VoidResponse!
     }
`;