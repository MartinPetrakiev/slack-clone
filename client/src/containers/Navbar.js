import React from 'react';
import UserMenuModal from '../components/UserMenuModal';
import CalendarMenu from '../components/GoogleCalendarModal';
import SearchChannelsModal from '../components/SearchChannelsModal';
import { Popup } from 'semantic-ui-react';
import styles from '../styles/Navbar.module.scss';
import decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import { GET_TEAM_ADMIN_QUERY } from '../graphql/quereis';

function Navbar({ teamKey, teamId, selectChannel }) {
    const { data } = useQuery(GET_TEAM_ADMIN_QUERY, {
        variables: {
            teamKey: teamKey
        }
    });
    let username = '';
    let userId = '';
    try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        username = user.username;
        userId = user.id;
    } catch (error) { }
    return (
        <div className={styles.container}>
            <div className={styles.nav_left}>
                <div className={styles.nav_search}>
                    <SearchChannelsModal teamId={teamId} selectChannel={selectChannel} />
                </div>
                <div className={styles.calendar_button}>
                    <CalendarMenu />
                </div>
            </div>

            <div className={styles.nav_right}>
                <Popup
                    trigger={<div><UserMenuModal userId={userId} teamData={data.getTeam} /></div>}
                    content={username}
                    position='bottom right'
                    style={{
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}
                    inverted
                    size='mini'
                />
            </div>
        </div >
    );
};

export default Navbar;
