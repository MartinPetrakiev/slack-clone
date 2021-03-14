import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
        <div>
            {data.allUsers.map(user => (
                <h1 key={user.id}>{user.email}</h1>
            ))}
        </div>
    );
}


export default Home;
