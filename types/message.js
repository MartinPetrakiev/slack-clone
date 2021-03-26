export default `
    type Message {
      id: ID!
      text: String!
      user: User!
      channel: Channel!
    }

    type Query {
      getChannelMessages(channelId: String!): [Message!]!
    }
    
    type Mutation {
      createMessage(channelId: String!, text: String!): Boolean!
    }
`;