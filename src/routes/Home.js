import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../containers/Navbar';
import Sidebar from '../containers/Sidebar';
import Chat from '../containers/Chat';

// const ALL_USERS_QUERY = gql`
//     {
//       allUsers {
//         id
//         email
//       }
//     }
// `;

const GET_TEAM_QUERY = gql`
query($teamKey:String!){
    getTeam(teamKey:$teamKey) {
    id
    name
    channels{
      channelKey
      topic
    }
  }

}
`;


function Home(props) {
    const [channelKey, setChannelKey] = useState('');
    const { loading, error, data } = useQuery(GET_TEAM_QUERY, {
        variables: {
            teamKey: props.location.state.teamKey
        }
    });
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log([error]);
        return <p>Error :(</p>;
    };

    const selectChannel = (e) => {
        if (e.target.id) {
            setChannelKey({ channelKey: e.target.id });
        }
        if(e.target.parentNode.id) {
            setChannelKey({ channelKey: e.target.parentNode.id });
        }
    };

    return (
        <div className="Home">
            <Navbar history={props.history}/>
            <div className="Workspace">
                <Sidebar selectChannel={selectChannel} team={data} history={props.history} />
                <Chat channelKey={channelKey.channelKey} />
            </div>
        </div>
    );
}


export default Home;
