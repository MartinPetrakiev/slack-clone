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
        errors: [Error!]
      }

    type Query {
        allChannels(teamId: String!): [Channel!]!
        getChannel(channelKey: String!): Channel!
    }
    type Mutation {
        createChannel(teamId: Int!, name: String!, topic: String, public: Boolean=false): ChannelResponse!
    }

`;