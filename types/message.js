export default `
    type Message {
      id: ID!
      msgKey: String!
      text: String!
      user: User!
      channel: Channel!
      createdAt: String!
    }

    
    type Mutation {
      createMessage(channelId: String!, text: String!): Boolean!
    }
`;