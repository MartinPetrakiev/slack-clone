import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Badge } from '@material-ui/core';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px #3F0E40`,
        '&::after': {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}))(Badge);

function UserMenuModal({ history }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const openProfile = () => {

    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push('/login');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar
                    variant="rounded"
                    style={{
                        width: "28px",
                        height: "28px",
                    }}
                    alt=""
                    // src={user?.photoURL}
                    onClick={handleClick}
                />
            </StyledBadge>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={openProfile}>Profile</MenuItem>
                <MenuItem onClick={logout} >Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default UserMenuModal;