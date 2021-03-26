export default `
    type Channel {
        id: ID!
        name: String!
        topic: String
        public: Boolean!
        messages: [Message!]!
        members: [User!]!
    }

    type ChannelResponse {
        ok: Boolean!
        channelData: Channel
        errors: [Error!]
      }
    type Query {
        allChannels: [Channel!]!
    }
    type Mutation {
        createChannel(teamId: Int!, name: String!, topic: String, public: Boolean=false): ChannelResponse!
    }

`;