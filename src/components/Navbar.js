import React from 'react';
import UserMenuModal from './UserMenuModal';
import { Input, Modal, Popup } from 'semantic-ui-react';
import { Search } from '@material-ui/icons';
import styles from '../component-styles/Navbar.module.scss';

function Navbar() {
    const popupStyle = {
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: '600'
    };
    return (
        <div className={styles.container}>
            <div className={styles.nav_left}>
                <Modal
                    className={styles.nav_search}
                    trigger={<button name="search">Search<Search /></button>}
                    header='Search channels'
                    content={
                        <div>
                            <Input fluid placeholder='# e.g. budget-talks ...' name='search' />
                        </div>
                    }
                    actions={[{ key: 'search', content: 'Search', positive: true, }]}
                />
            </div>

            <div className={styles.nav_right}>
                <Popup
                    trigger={<div><UserMenuModal /></div>}
                    content='Martin Petrakiev'
                    position='bottom right'
                    style={popupStyle}
                    inverted
                    size='mini'
                />
            </div>
        </div >
    );
}

export default Navbar;
