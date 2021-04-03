export default `
    type Channel {
        id: ID!
        channelKey: String!
        name: String!
        topic: String
        public: Boolean!
        messages: [Message!]!
        members: [User!]!
    }

    type ChannelResponse {
        ok: Boolean!
        channel: Channel
        errors: [Error!]
      }

    type Query {
        allChannels(teamId: Int!): [Channel!]!
        getChannel(channelKey: String!): Channel!
    }

    type Mutation {
        createChannel(teamId: Int!, name: String!, topic: String,admin: Boolean!, public: Boolean): ChannelResponse!
        addTopic(channelId: Int!, topic: String!): ChannelResponse!
    }

`;