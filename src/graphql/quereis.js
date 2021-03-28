import { gql } from '@apollo/client';

const GET_ALL_TEAMS_QUERY = gql`
    {
         allTeams{
            id
            teamKey
            name
          }

    }
`;

const GET_TEAM_QUERY = gql`
query($teamKey:String!){
    getTeam(teamKey:$teamKey) {
    id
    name
    channels{
        id
      channelKey
      topic
    }
  }

}
`;

const ALL_CHANNELS_QUERY = gql`
query($teamId:String!){
    allChannels(teamId:$teamId) {
      id
      channelKey
      name
    }
  }
`;

const GET_CHANNEL_MESSAGES_QUERY = gql`
query($channelKey:String!){
    getChannel(channelKey:$channelKey) {
         name
         topic
         messages{
            id
            msgKey
            text
            createdAt
            user{
              id
              userKey
              username
            }
          }
    }
  }
`;


export {
  GET_ALL_TEAMS_QUERY,
  GET_TEAM_QUERY,
  ALL_CHANNELS_QUERY,
  GET_CHANNEL_MESSAGES_QUERY
};