import { gql } from '@apollo/client';

const NEW_CHANNEL_MESSAGE_SUBSCRIPTION = gql`
subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }

`;

export {
    NEW_CHANNEL_MESSAGE_SUBSCRIPTION
};