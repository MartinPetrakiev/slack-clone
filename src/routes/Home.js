import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

// const ALL_USERS_QUERY = gql`
//     {
//       allUsers {
//         id
//         email
//       }
//     }
// `;

const GET_TEAM_QUERY = gql`
    {
    	getTeam(id:"1"){
        id
        name
        channels{
          id
          name
        }
      }
    },
`;


function Home(props) {
    const [channelId, setChannelId] = useState('');

    const { loading, error, data } = useQuery(GET_TEAM_QUERY);
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p>Error :(</p>;
    };

    const selectChannel = (e) => {
        if (e.target.id) {
            setChannelId({ id: e.target.id });
        }
    };

    return (
        <div className="Home">
            <Navbar />
            <div className="Workspace">
                <Sidebar selectChannel={selectChannel} team={data} history={props.history} />
                <Chat channelId={channelId} data={data} />
            </div>
        </div>
    );
}


export default Home;
