import React, { useEffect, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Badge } from '@material-ui/core';
import { useHistory } from 'react-router';
import { GET_USER_QUERY } from '../graphql/quereis';
import { useLazyQuery } from '@apollo/client';

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

function UserMenuModal({userId}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [getUserData, { data }] = useLazyQuery(GET_USER_QUERY, {
        variables: {
            id: userId
        }
    });
    const [userData, setUserData] = useState({
        id: '',
        userKey: '',
        username: '',
        email: '',
        teams: '',
    });
    const history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        getUserData();
        if (data && data.hasOwnProperty('getUser')) {
            const { getUser } = data;
            setUserData((oldState) => ({
                ...oldState,
                ...getUser
            }));

        }
    }, [anchorEl, data, getUserData]);
    
    const openProfile = () => {
        history.push({
            pathname: `/profile/${userData.userKey}`,
            state: { ...userData, prevPath: history.location.pathname }
        });
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