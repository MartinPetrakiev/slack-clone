import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from '../styles/TeamSelect.module.scss';

const GET_ALL_TEAMS_QUERY = gql`
    {
         allTeams{
            id
            name
            channels{
              id
              name
            }
          }

    }
`;


function TeamSelect(props) {
    const { loading, error, data } = useQuery(GET_ALL_TEAMS_QUERY);
    if(loading) return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Icon loading name='spinner' size="big" />
            </div>
        </div>
    );
    
    if (error) {
        console.log(error);
    };


    const selectTeam = (e) => {
        props.history.push("client", {teamId: e.target.parentNode.id})
    }

    return (
        <div className={styles.container}>
            {data.allTeams?.map(x => (
                <div key={x.id} id={x.id} className={styles.item}>
                    <div className={styles.content}>
                        {x.name}
                    </div>
                    <Button onClick={selectTeam}>Select</Button>
                </div>
            ))}
        </div>
    );
}

export default TeamSelect;
