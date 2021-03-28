import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../containers/Navbar';
import Sidebar from '../containers/Sidebar';
import Chat from '../containers/Chat';
import { useHistory, useParams } from 'react-router';

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


function Home(props) {
    const [channelKey, setChannelKey] = useState('');
    const { teamKey } = useParams();
    const history = useHistory();
    const { loading, error, data } = useQuery(GET_TEAM_QUERY, {
        variables: {
            teamKey: teamKey
        }
    });

    useEffect(() => {
        const firstChannelKey = data?.getTeam.channels[0]?.channelKey;
        if(firstChannelKey) {
            const params = new URLSearchParams();
            params.append('channel', firstChannelKey);
            history.push({search: params.toString()});
        }
        setChannelKey({ channelKey: firstChannelKey });
    }, [data, history]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log([error]);
        return <p>Error :(</p>;
    };


    const selectChannel = (e) => {
        const params = new URLSearchParams();
        if (e.target.id) {
            params.append('channel', e.target.id);
            history.push({search: params.toString()});
            setChannelKey({ channelKey: e.target.id });
        }
        if (e.target.parentNode.id) {
            params.append('channel', e.target.parentNode.id);
            history.push({search: params.toString()});
            setChannelKey({ channelKey: e.target.parentNode.id });
        }
    };

    return (
        <div className="Home">
            <Navbar history={props.history} />
            <div className="Workspace">
                <Sidebar selectChannel={selectChannel} teamChannels={data} history={props.history} />
                <Chat channelKey={channelKey.channelKey} />
            </div>
        </div>
    );
}


export default Home;
