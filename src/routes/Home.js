import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const allUsersQuery = gql`
    {
      allUsers {
        id
        email
      }
    }
`;

function Home() {
    const [channelId, setChannelId] = useState('');
    const { loading, error, data } = useQuery(allUsersQuery);
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p>Error :(</p>;
    };
    
    const selectChannel = (e) => {
        if (e.target.id) {
            console.log(e.target.id);
            setChannelId({ id: e.target.id });
            
        }
    };

    return (
        <div className="Home">
            <Navbar />

            <div className="Workspace">
                <Sidebar selectChannel={selectChannel} />
                <Chat channelId={channelId} />
            </div>
        </div>
    );
}


export default Home;
