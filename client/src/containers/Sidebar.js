import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_CHANNELS_QUERY } from '../graphql/quereis';
import MainOptions from '../components/MainOptions';
import AddChannelModal from '../components/AddChannelModal';
import AddPeopleModal from '../components/AddPeopleModal';
import { Popup } from 'semantic-ui-react';
import {
    ArrowDropDownRounded,
    ArrowDropUpRounded,
    ArrowRightRounded,
    BookmarkBorder,
    Create,
    ExpandMoreRounded,
    MoreVert
} from '@material-ui/icons';
import styles from '../styles/Sidebar.module.scss';
import { useHistory } from 'react-router';


function Sidebar({ teamChannels, selectChannel }) {
    const { name: teamName, id: teamId, admin } = teamChannels.getTeam;
    const [expandMainOptions, setExpandMainOptions] = useState(false);
    const [expandChannels, setexpandChannels] = useState(true);
    const { data: channels, refetch } = useQuery(ALL_CHANNELS_QUERY, {
        variables: {
            teamId: Number(teamId)
        },
        fetchPolicy: 'network-only'
    });

    const history = useHistory();
    const collapseHandle = (e) => {
        const currTarget = e.currentTarget.id;
        if (expandMainOptions && currTarget === "main_collapse") {
            setExpandMainOptions(false);
        } else if (!expandMainOptions && currTarget === "main_collapse") {
            setExpandMainOptions(true);
        }
        if (expandChannels && currTarget === "channels_collapse") {
            setexpandChannels(false);
        } else if (!expandChannels && currTarget === "channels_collapse") {
            setexpandChannels(true);
        }
    };

    const selectTeam = () => {
        history.push({
            pathname: '/team-select',
            state: { refetch: true }
        });
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <h2>{teamName || ":TEAM:"}</h2>
                        <Popup
                            trigger={<div><ExpandMoreRounded onClick={selectTeam} /></div>}
                            content={teamName}
                            position='bottom right'
                            style={{
                                borderRadius: '10px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                            inverted
                            size='mini'
                        />
                        <div className={styles.new_message}>
                            <Create />
                        </div>
                    </div>
                </div>
                {expandMainOptions ?
                    (<div className="main_options_list">
                        <MainOptions />
                        <div id='main_collapse' className={styles.main_collapse} onClick={collapseHandle}>
                            <ArrowDropUpRounded />
                        Hide
                    </div>
                    </div>)
                    :
                    (<div className={styles.main_options_list}>
                        <div id="saved-items">
                            <BookmarkBorder />
                        Saved items
                    </div>
                        <div id='main_collapse' className={styles.main_collapse} onClick={collapseHandle}>
                            <MoreVert />
                        More
                        </div>
                    </div>)
                }
                {expandChannels && channels ?
                    (<div className={styles.channels_container}>
                        <div id="channels_collapse" className={styles.channels_collapse} onClick={collapseHandle}>
                            <ArrowDropDownRounded />
                            Channels
                        </div>

                        <div className={styles.channels_list}>
                            {channels.allChannels?.map(x => {
                                return (
                                    <div
                                        key={x.channelKey}
                                        id={x.channelKey}
                                        value={x.topic}
                                        onClick={selectChannel}
                                    >
                                        <i>#</i> <span>{x.name}</span>
                                    </div>
                                );
                            })}
                            <div className={styles.add_channel_button}>
                                <AddChannelModal teamId={teamId} admin={admin} refetch={refetch} />
                            </div>
                        </div>
                    </div>)
                    :
                    (<div className={styles.channels_container}>
                        <div id="channels_collapse" className={styles.channels_collapse} onClick={collapseHandle}>
                            <ArrowRightRounded />
                        Channels
                    </div>
                    </div>)
                }
                <div className={styles.members_list}>Team Members</div>
                <div className={styles.add_member}>
                    <AddPeopleModal
                        teamId={teamId}
                        admin={admin}
                        key="invite-people-modal"
                        refetch={refetch}
                    />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
