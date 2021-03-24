import React from 'react';
import {
    AlternateEmail,
    Apps,
    BookmarkBorder,
    FileCopy,
    FormatListBulletedRounded,
    PeopleAltOutlined,
    SubjectRounded
} from '@material-ui/icons';
import styles from '../component-styles/MainOptions.module.scss';

function MainOptions() {
    return (
            <div className={styles.main_options}>
                <div>
                    <SubjectRounded />
                    Threads
                </div>
                <div>
                    <BookmarkBorder />
                    Saved items
                </div>
                <div>
                    <AlternateEmail />
                    Mentions & reactions
                </div>
                <div>
                    <FormatListBulletedRounded />
                    Channel browser
                </div>
                <div>
                    <FileCopy />
                    File browser
                </div>
                <div>
                    <PeopleAltOutlined />
                    People & user groups
                </div>
                <div>
                    <Apps />
                    Apps
                </div>
            </div>
    );
}

export default MainOptions;
