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
mutation($teamId:Int!,$name:String!,$topic:String){
    createChannel(teamId:$teamId,name:$name,topic:$topic){
        ok
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

export {
    REGISTER_MUTATION,
    LOGIN_MUTATION,
    CREATE_CHANNEL_MUTATION,
    CREAT_TEAM_MUTATION,

}