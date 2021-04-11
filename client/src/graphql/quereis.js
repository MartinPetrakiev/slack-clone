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
query($teamKey: String!){
    getTeam(teamKey: $teamKey) {
    id
    name
    admin
    channels{
        id
      channelKey
      topic
    }
    members {
      userKey
      email
    }
  }

}
`;

const GET_TEAM_ADMIN_QUERY = gql`
query($teamKey: String!){
  getTeam(teamKey: $teamKey) {
  name
  admin
}

}
`;

const ALL_CHANNELS_QUERY = gql`
query($teamId:Int!){
    allChannels(teamId:$teamId) {
      id
      channelKey
      name
    }
  }
`;

const GET_CHANNEL_QUERY = gql`
query($channelKey:String!){
    getChannel(channelKey:$channelKey) {
        id
         name
         topic
    }
  }
`;

const GET_CHANNEL_MESSAGES_QUERY = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      msgKey
      text
      user {
        username
      }
      createdAt
    }
  }
`;

const GET_USER_QUERY = gql`
  query($id: Int!) {
    getUser(id: $id) {
      id
      userKey
      username
      email
      title
      teams {
        teamKey
        name
      }
    }
  }
`;


const GET_USER_TEAMS_QUERY = gql`
  query($id: Int!) {
    getUser(id: $id) {
      teams {
        id
        teamKey
        name
      }
    }
  }
`;

const FIND_CHANNELS_QUERY = gql`
query($name:String!, $teamId: Int!){
  findChannels(name:$name, teamId:$teamId) {
      id
      channelKey
       name
       topic
  }
}
`;


export {
  GET_ALL_TEAMS_QUERY,
  GET_TEAM_QUERY,
  ALL_CHANNELS_QUERY,
  GET_CHANNEL_QUERY,
  GET_CHANNEL_MESSAGES_QUERY,
  GET_USER_QUERY,
  GET_USER_TEAMS_QUERY,
  GET_TEAM_ADMIN_QUERY,
  FIND_CHANNELS_QUERY
};