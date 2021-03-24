import React from 'react';
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
    const { loading, error, data } = useQuery(allUsersQuery);
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        return <p>Error :(</p>;
    };

    return (
        <div className="Home">
            <Navbar />
            <Sidebar />
            <Chat />
        </div>
    );
}


export default Home;
