import React, { useState } from 'react';
import MainOptions from './MainOptions';
import {
    ArrowDropDownRounded,
    ArrowDropUpRounded,
    ArrowRightRounded,
    BookmarkBorder,
    Create,
    ExpandMoreRounded,
    MoreVert
} from '@material-ui/icons';
import AddChannelModal from './AddChannelModal';
import { loadCalendar } from '../googleCalendar';
import styles from '../component-styles/Sidebar.module.scss';

function Sidebar({ selectChannel }) {
    const [expandMainOptions, setExpandMainOptions] = useState(false);
    const [expandChannels, setexpandChannels] = useState(false);

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
    const channels = [
        {
            id: 1,
            name: 'random'
        },
        {
            id: 2,
            name: 'general'
        },
        {
            id: 3,
            name: 'training'
        }
    ];



    return (
        <div className={styles.container}>
            <div>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <h2>:Team Name:</h2>
                        <ExpandMoreRounded />
                    </div>
                    <div className={styles.new_message}>
                        <Create />
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
                {expandChannels ?
                    (<div className={styles.channels_container}>
                        <div id="channels_collapse" className={styles.channels_collapse} onClick={collapseHandle}>
                            <ArrowDropDownRounded />
                            Channels
                        </div>

                        <div className={styles.channels_list}>
                            {channels?.map(x => {
                                return (
                                    <div
                                        key={x.id}
                                        id={x.id}
                                        onClick={selectChannel}
                                    >
                                        <i>#</i> {x.name}
                                    </div>
                                )
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
