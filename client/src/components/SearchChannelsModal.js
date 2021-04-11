import React, { useReducer } from 'react';
import { Button, Form, Header, Modal, Icon } from 'semantic-ui-react';
import { Search } from '@material-ui/icons';
import reducer from './modalReducer';
import { FIND_CHANNELS_QUERY } from '../graphql/quereis';
import { useLazyQuery } from '@apollo/client';

function SearchChannelsModal({ teamId, selectChannel }) {
    const [state, dispatch] = useReducer(reducer, {
        open: false
    });
    const [findChannels, { error, loading, data }] = useLazyQuery(FIND_CHANNELS_QUERY);
    const searchChannel = (e) => {
        findChannels({ variables: { name: e.target.search.value, teamId: Number(teamId) } });
        if (error) {
            console.log([error]);
        }
    };
    const select = (e) => {
        selectChannel(e);
        dispatch({ type: 'CLOSE_MODAL' });
    };

    return (
        <Modal
            as={Form}
            open={state.open}
            onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            trigger={<button name="search">Search<Search /></button>}
            onSubmit={e => searchChannel(e)}
            size="tiny"
        >
            <Header icon="search" content="Search channel" as="h2" />
            <Modal.Content>
                <Form.Input type="text" placeholder="# e.g. budget-talks ..." name="search" />
                <Modal.Description>
                    {loading ? (<Icon loading name='spinner' size="big" />) : null}
                    {error ? (<div>No channels found</div>) : null}
                    {data && data?.findChannels.length ?
                        (<div>
                            Select:
                            <div >
                                {data.findChannels.map(channel => (
                                    <li
                                        key={channel.id}
                                        id={channel.channelKey}
                                        onClick={select}
                                    >
                                        {channel.name}
                                    </li>
                                ))}
                            </div>
                        </div>)
                        :
                        (<div>No channels found</div>)
                    }
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button type="button" onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="red" icon="times" content="Close" />
                <Button type="submit" color="green" icon="search" content="Search" value="search" />
            </Modal.Actions>
        </Modal>
    );
}

export default SearchChannelsModal;
