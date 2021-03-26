import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import MainOptions from '../containers/MainOptions';
import AddChannelModal from '../containers/AddChannelModal';
import { loadCalendar } from '../googleCalendar';
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

const ALL_CHANNELS_QUERY = gql`
{
	allChannels{
    id
    name
    topic
  }
}
`;

function Sidebar({ team, selectChannel, history}) {
    const { name: teamName } = team.getTeam;
    const [expandMainOptions, setExpandMainOptions] = useState(false);
    const [expandChannels, setexpandChannels] = useState(false);

    const { data: channels } = useQuery(ALL_CHANNELS_QUERY);
    
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
        history.push('/team-select');
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <h2>{teamName || ":TEAM:"}</h2>
                        <ExpandMoreRounded onClick={selectTeam} />
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
                                        key={`channel-${x.id}`}
                                        id={x.id}
                                        // teamName={x.teamName}
                                        // username={x.username}
                                        topic={x.topic}
                                        onClick={selectChannel}
                                    >
                                        <i>#</i> {x.name}
                                    </div>
                                );
                            })}
                            <div className={styles.add_channel_button}>
                                <AddChannelModal />
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
                <button onClick={loadCalendar}>Calendar</button>
            </div>
        </div>
    );
}

export default Sidebar;
