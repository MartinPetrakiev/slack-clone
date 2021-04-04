import { useQuery } from '@apollo/client';
import { GET_USER_TEAMS_QUERY } from '../graphql/quereis';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styles from '../styles/TeamSelect.module.scss';
import decode from 'jwt-decode';

function TeamSelect(props) {
    let userId = '';
    try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        userId = user.id;
    } catch (error) { }
    const { loading, data, refetch } = useQuery(GET_USER_TEAMS_QUERY,{
        variables: {
            id: userId
        }
    });
    if (loading) return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <Icon loading name='spinner' size="big" />
            </div>
        </div>
    );
    
    if(props.location.state?.refetch) {
        refetch();
    } 

    const selectTeam = (e) => {
        const teamKey = e.target.parentNode.id;
        props.history.push({
            pathname: `/client/${teamKey}`,
            state: { teamKey }
        });
    };
    const createTeam = () => {
        props.history.push("/create-team");
    };
    return (
        <div className={styles.container}>
            {data?.getUser?.teams.length ?
                (data.getUser?.teams.map(x => (
                    <div key={x.teamKey} id={x.teamKey} className={styles.item}>
                        <div className={styles.content}>
                            {x.name}
                        </div>
                        <Button onClick={selectTeam}>Select</Button>
                    </div>
                )))
                :
                (
                    <div className={styles.no_teams}>
                        No teams yet...
                    </div>
                )
            }
            <div className={styles.create_button}>
                <Button onClick={createTeam}>Create a team</Button>
            </div>
        </div>
    );
}

export default TeamSelect;
