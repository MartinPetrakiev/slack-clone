import React, { useReducer, useState } from 'react';
import { EventRounded } from '@material-ui/icons';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { Menu, MenuItem } from '@material-ui/core';
import reducer from './modalReducer';
import { loadCalendar } from '../googleCalendar';

function CalendarMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div onClick={handleClick}><EventRounded /></div>
            <Menu
                id="calendar-menu"
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
                <MenuItem onClick={() => window.open('https://calendar.google.com/')}>Open Calendar</MenuItem>
                <MenuItem onClick={() => handleClose()}><CreateCalednarEvent /></MenuItem>
            </Menu>

        </div>

    );
}

function CreateCalednarEvent({ open }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false,
    });
    const addEvent = async (e) => {
        e.preventDefault();
        const startTime = new Date(e.target.startTime.value);
        const endTime = new Date(e.target.endTime.value);
        const event = {
            'summary': e.target.summary.value,
            'location': e.target.location.value,
            'description': e.target.description.value,
            'start': {
                'dateTime': startTime,
                'timeZone': 'Europe/Sofia'
            },
            'end': {
                'dateTime': endTime,
                'timeZone': 'Europe/Sofia'
            },
        };
        loadCalendar(event);
    };

    return (
        <Modal
            as={Form}
            open={state.open}
            onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            trigger={<span>Schedule an event</span>}
            onSubmit={e => addEvent(e)}
            size="tiny"
        >
            <Header icon="calendar" content="Schedule your event in Google Calendar " as="h2" />
            <Modal.Content>
                <Form.Input required={true} label="Event" type="text" placeholder="Summary..." name="summary" />
                <Form.Input required={true} label="Location" type="text" placeholder="e.g. Sofia" name="location" />
                <Form.TextArea type="textarea" placeholder="Description..." name="description" />
                <Form.Input required={true} label="Start of event" type="datetime-local" placeholder="Start time" name="startTime" />
                <Form.Input required={true} label="End of event" type="datetime-local" placeholder="End time" name="endTime" />
            </Modal.Content>
            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" content="Close" />
                <Button type="submit" color="green" content="Create Event" value="create" />
            </Modal.Actions>
        </Modal>
    );
}

export default CalendarMenu;