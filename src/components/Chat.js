import { InfoOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styles from '../component-styles/Chat.module.scss';

function Chat() {
    const [channelDetails, setChannelDetails] = useState(false);

    const showDetails = () => {
        !channelDetails ? setChannelDetails(true) : setChannelDetails(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.header_left}>
                    <h4><strong># Channel 1</strong></h4>
                </div>
                <div className={styles.header_right}>
                    <div onClick={showDetails}>
                        <InfoOutlined />
                        </div>
                </div>
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quod, repudiandae quam ad quaerat mollitia eum, ratione aperiam, iusto facilis aliquid debitis tempore eos totam perferendis optio dolor ut!
                Inventore veritatis molestiae vero debitis necessitatibus, explicabo expedita ut, illum dignissimos quo perspiciatis, quibusdam nostrum omnis alias numquam molestias. Sequi exercitationem alias qui quidem incidunt. Laborum consectetur repellat inventore a.
                Quam numquam aperiam aliquid corrupti placeat ea repellendus assumenda quo, ullam quod illum illo iste nisi culpa molestiae aut earum qui soluta omnis saepe unde. Impedit assumenda qui quisquam blanditiis.
                Earum est libero cupiditate odio officia officiis suscipit dicta inventore beatae molestias? Suscipit reprehenderit, perferendis deserunt hic dolor commodi, ipsa sunt inventore repudiandae debitis alias dolores ex necessitatibus? Expedita, amet.
                Nihil unde voluptates voluptate quis culpa minus dolor neque esse accusantium deserunt omnis, dolorum qui nobis itaque praesentium earum sequi sed optio illum eveniet similique. Reiciendis illum deserunt deleniti reprehenderit.
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quod, repudiandae quam ad quaerat mollitia eum, ratione aperiam, iusto facilis aliquid debitis tempore eos totam perferendis optio dolor ut!
                Inventore veritatis molestiae vero debitis necessitatibus, explicabo expedita ut, illum dignissimos quo perspiciatis, quibusdam nostrum omnis alias numquam molestias. Sequi exercitationem alias qui quidem incidunt. Laborum consectetur repellat inventore a.
                Quam numquam aperiam aliquid corrupti placeat ea repellendus assumenda quo, ullam quod illum illo iste nisi culpa molestiae aut earum qui soluta omnis saepe unde. Impedit assumenda qui quisquam blanditiis.
                Earum est libero cupiditate odio officia officiis suscipit dicta inventore beatae molestias? Suscipit reprehenderit, perferendis deserunt hic dolor commodi, ipsa sunt inventore repudiandae debitis alias dolores ex necessitatibus? Expedita, amet.
                Nihil unde voluptates voluptate quis culpa minus dolor neque esse accusantium deserunt omnis, dolorum qui nobis itaque praesentium earum sequi sed optio illum eveniet similique. Reiciendis illum deserunt deleniti reprehenderit.
            </div>            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quod, repudiandae quam ad quaerat mollitia eum, ratione aperiam, iusto facilis aliquid debitis tempore eos totam perferendis optio dolor ut!
                Inventore veritatis molestiae vero debitis necessitatibus, explicabo expedita ut, illum dignissimos quo perspiciatis, quibusdam nostrum omnis alias numquam molestias. Sequi exercitationem alias qui quidem incidunt. Laborum consectetur repellat inventore a.
                Quam numquam aperiam aliquid corrupti placeat ea repellendus assumenda quo, ullam quod illum illo iste nisi culpa molestiae aut earum qui soluta omnis saepe unde. Impedit assumenda qui quisquam blanditiis.
                Earum est libero cupiditate odio officia officiis suscipit dicta inventore beatae molestias? Suscipit reprehenderit, perferendis deserunt hic dolor commodi, ipsa sunt inventore repudiandae debitis alias dolores ex necessitatibus? Expedita, amet.
                Nihil unde voluptates voluptate quis culpa minus dolor neque esse accusantium deserunt omnis, dolorum qui nobis itaque praesentium earum sequi sed optio illum eveniet similique. Reiciendis illum deserunt deleniti reprehenderit.
            </div>            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quod, repudiandae quam ad quaerat mollitia eum, ratione aperiam, iusto facilis aliquid debitis tempore eos totam perferendis optio dolor ut!
                Inventore veritatis molestiae vero debitis necessitatibus, explicabo expedita ut, illum dignissimos quo perspiciatis, quibusdam nostrum omnis alias numquam molestias. Sequi exercitationem alias qui quidem incidunt. Laborum consectetur repellat inventore a.
                Quam numquam aperiam aliquid corrupti placeat ea repellendus assumenda quo, ullam quod illum illo iste nisi culpa molestiae aut earum qui soluta omnis saepe unde. Impedit assumenda qui quisquam blanditiis.
                Earum est libero cupiditate odio officia officiis suscipit dicta inventore beatae molestias? Suscipit reprehenderit, perferendis deserunt hic dolor commodi, ipsa sunt inventore repudiandae debitis alias dolores ex necessitatibus? Expedita, amet.
                Nihil unde voluptates voluptate quis culpa minus dolor neque esse accusantium deserunt omnis, dolorum qui nobis itaque praesentium earum sequi sed optio illum eveniet similique. Reiciendis illum deserunt deleniti reprehenderit.
            </div>            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quod, repudiandae quam ad quaerat mollitia eum, ratione aperiam, iusto facilis aliquid debitis tempore eos totam perferendis optio dolor ut!
                Inventore veritatis molestiae vero debitis necessitatibus, explicabo expedita ut, illum dignissimos quo perspiciatis, quibusdam nostrum omnis alias numquam molestias. Sequi exercitationem alias qui quidem incidunt. Laborum consectetur repellat inventore a.
                Quam numquam aperiam aliquid corrupti placeat ea repellendus assumenda quo, ullam quod illum illo iste nisi culpa molestiae aut earum qui soluta omnis saepe unde. Impedit assumenda qui quisquam blanditiis.
                Earum est libero cupiditate odio officia officiis suscipit dicta inventore beatae molestias? Suscipit reprehenderit, perferendis deserunt hic dolor commodi, ipsa sunt inventore repudiandae debitis alias dolores ex necessitatibus? Expedita, amet.
                Nihil unde voluptates voluptate quis culpa minus dolor neque esse accusantium deserunt omnis, dolorum qui nobis itaque praesentium earum sequi sed optio illum eveniet similique. Reiciendis illum deserunt deleniti reprehenderit.
            </div>
            {/* <ChatInput
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                    /> */}
        </div>
    );
}

export default Chat;
