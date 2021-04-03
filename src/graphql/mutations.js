import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
      }
`;

const LOGIN_MUTATION = gql`
    mutation($email:String!, $password:String!) {
        login( email: $email, password: $password){
          ok
          token
          refreshToken,
          errors {
            path
            message
          }
        }
      }
`;

const CREATE_CHANNEL_MUTATION = gql`
mutation($teamId:Int!,$name:String!,$topic:String,$admin:Boolean!){
    createChannel(teamId:$teamId,name:$name,topic:$topic,admin:$admin){
        ok
        errors {
          path
          message
        }
    }
  }
`;

const CREAT_TEAM_MUTATION = gql`
    mutation($name:String!) {
        createTeam( name: $name){
          ok
          errors {
            path
            message
          }
        }
      }
`;

const ADD_TEAM_MEMBER_MUTATION = gql`
  mutation($email: String!, $teamId: Int!, $admin: Boolean!) {
    addTeamMember(email: $email, teamId: $teamId, admin: $admin) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

const ADD_CHANNEL_TOPIC_MUTATION = gql`
mutation($channelId: Int!, $topic: String!){
  addTopic(channelId: $channelId, topic:$topic) {
    ok
    errors {
      path
      message
    }
  }
}
`;

const ADD_USER_TITLE_MUTATION = gql`
mutation($title: String!){
  addTopic(title: $title) {
    ok
    errors {
      path
      message
    }
  }
}
`;

export {
  ADD_TEAM_MEMBER_MUTATION,
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  CREATE_CHANNEL_MUTATION,
  CREAT_TEAM_MUTATION,
  CREATE_MESSAGE_MUTATION,
  ADD_CHANNEL_TOPIC_MUTATION,
  ADD_USER_TITLE_MUTATION
};