export default `
    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
      }

      type AuthPayload {
        token: String
        user: User
      }

      type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
      }
      
      type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
      }

      type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse
      }
`;

//crud
//create
//update
//delete