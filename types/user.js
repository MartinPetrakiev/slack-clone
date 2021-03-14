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
      
      type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
      }

      type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload
      }
`;

//crud
//create
//update
//delete