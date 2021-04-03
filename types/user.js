export default `
    type User {
        id: ID!
        userKey: String!
        username: String!
        email: String!
        title: String
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

      type LoginResponse {
        ok: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
      }
      type UpdateUserResponse {
        ok: Boolean!
        title: String!
        errors: [Error!]
      }

      type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
      }

      type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
        addTitle(title: String!): UpdateUserResponse!
      }
`;

//crud
//create
//update
//delete